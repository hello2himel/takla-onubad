import os
import json
import logging
from typing import Dict, Optional
import aiohttp
from dotenv import load_dotenv
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    CallbackQueryHandler,
    ContextTypes,
    filters,
    ConversationHandler
)
from telegram.constants import ChatType, ParseMode

# Load environment variables
load_dotenv()

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Conversation states
WAITING_FOR_API_KEY, WAITING_FOR_MODEL = range(2)

# OpenRouter configuration
OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'
DEFAULT_MODEL = 'stepfun/step-3.5-flash:free'

# System prompt
SYSTEM_PROMPT = """Convert distorted phonetic Bangla (written in English letters) to proper Bengali script.

INPUT TYPES:
1. Takla Bhasha: Chaotic form with missing vowels (kmn→কেমন), merged words, slang, broken phonemes
2. Standard Romanized: Already readable (ami bhalo achi→আমি ভালো আছি)

RULES:
• Prioritize meaning over literal spelling
• Preserve slang/dialect (tore→তোরে NOT তোকে, korsi→করছি NOT করেছি)
• Keep emotional stretching (plzzz→প্লিজজজজ, bhaloooo→ভালোওও)
• Fix grammar only when needed for clarity
• Transliterate embedded English (reply→রিপ্লাই, meeting→মিটিং)
• Remove noise but preserve emphasis
• Use natural spoken Bangla, not formal/literary

OUTPUT:
Return ONLY the Bengali text. No explanations, quotes, or metadata.

Examples:
ami kmn asi → আমি কেমন আছি
ami tore onk vlobashi → আমি তোরে অনেক ভালোবাসি
plzzzzz asho akhn → প্লিজজজজ আসো এখন"""


# Database class (simple JSON-based storage)
class Database:
    def __init__(self, filename='bot_data.json'):
        self.filename = filename
        self.data = self.load()

    def load(self) -> Dict:
        """Load data from JSON file"""
        if os.path.exists(self.filename):
            try:
                with open(self.filename, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                logger.error(f"Error loading database: {e}")
                return {'groups': {}}
        return {'groups': {}}

    def save(self):
        """Save data to JSON file"""
        try:
            with open(self.filename, 'w', encoding='utf-8') as f:
                json.dump(self.data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            logger.error(f"Error saving database: {e}")

    def get_group(self, group_id: str) -> Optional[Dict]:
        """Get group settings"""
        return self.data['groups'].get(str(group_id))

    def set_group(self, group_id: str, settings: Dict):
        """Set group settings"""
        self.data['groups'][str(group_id)] = settings
        self.save()

    def update_group(self, group_id: str, **kwargs):
        """Update specific group settings"""
        group_id = str(group_id)
        if group_id not in self.data['groups']:
            self.data['groups'][group_id] = {
                'api_key': None,
                'model': DEFAULT_MODEL,
                'enabled': True,
                'admin_id': None
            }
        self.data['groups'][group_id].update(kwargs)
        self.save()


# Initialize database
db = Database()


# Helper functions
async def is_admin(update: Update, context: ContextTypes.DEFAULT_TYPE) -> bool:
    """Check if user is admin in the group"""
    try:
        chat_id = update.effective_chat.id
        user_id = update.effective_user.id

        # If it's a private chat, allow
        if update.effective_chat.type == ChatType.PRIVATE:
            return True

        member = await context.bot.get_chat_member(chat_id, user_id)
        return member.status in ['creator', 'administrator']
    except Exception as e:
        logger.error(f"Error checking admin status: {e}")
        return False


async def translate_text(text: str, api_key: str, model: str = DEFAULT_MODEL) -> str:
    """Translate text using OpenRouter API"""
    try:
        async with aiohttp.ClientSession() as session:
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {api_key}',
                'HTTP-Referer': 'https://github.com/hello2himel/takla-onubad',
                'X-Title': 'Takla Onubad Telegram Bot'
            }

            payload = {
                'model': model,
                'messages': [
                    {'role': 'system', 'content': SYSTEM_PROMPT},
                    {'role': 'user', 'content': text}
                ],
                'temperature': 0,
                'max_tokens': 2000
            }

            async with session.post(
                    f'{OPENROUTER_BASE_URL}/chat/completions',
                    headers=headers,
                    json=payload
            ) as response:
                if response.status != 200:
                    error_text = await response.text()
                    raise Exception(f"API Error {response.status}: {error_text}")

                data = await response.json()
                return data['choices'][0]['message']['content'].strip()

    except Exception as e:
        logger.error(f"Translation error: {e}")
        raise


# Command handlers
async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /start command"""
    user = update.effective_user
    chat_type = update.effective_chat.type

    if chat_type == ChatType.PRIVATE:
        # Private chat - minimal setup wizard
        welcome_text = f"""
🌟 *টাকলা অনুবাদ*

ইংরেজি অক্ষরের বাংলা → সঠিক বাংলা স্ক্রিপ্ট

*ব্যবহার:*
১. বট গ্রুপে যোগ করুন
২. যেকোনো মেসেজে reply করে `/takla` লিখুন

উদাহরণ: `ami valo asi` → আমি ভালো আছি
"""

        keyboard = [
            [InlineKeyboardButton("➕ গ্রুপে যোগ করুন", url=f"https://t.me/{context.bot.username}?startgroup=true")],
            [InlineKeyboardButton("⚙️ সেটআপ করুন", callback_data="setup")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)

        await update.message.reply_text(
            welcome_text,
            parse_mode=ParseMode.MARKDOWN,
            reply_markup=reply_markup,
            disable_web_page_preview=True
        )
    else:
        # Group chat - brief intro
        await update.message.reply_text(
            "👋 হ্যালো! যেকোনো মেসেজে reply করে `/takla` লিখুন\n\n"
            "⚙️ সেটআপ: অ্যাডমিন আমাকে DM করে `/setup` দিন",
            parse_mode=ParseMode.MARKDOWN
        )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /help command"""
    help_text = """
📖 *কমান্ড তালিকা*

*সবার জন্য:*
`/takla` - অনুবাদ করুন (reply করে)
`/settings` - সেটিংস দেখুন
`/models` - মডেল তালিকা

*অ্যাডমিন:*
`/setup` - API কী সেটআপ (DM এ)
`/setmodel` - মডেল পরিবর্তন
`/toggle` - চালু/বন্ধ

*উদাহরণ:*
মেসেজে reply করুন → `/takla` লিখুন
"""

    await update.message.reply_text(
        help_text,
        parse_mode=ParseMode.MARKDOWN
    )


async def setup_start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Start the setup wizard"""
    chat_type = update.effective_chat.type

    # Only allow in private chat
    if chat_type != ChatType.PRIVATE:
        await update.message.reply_text(
            "⚠️ সেটআপ শুধু DM এ করুন"
        )
        return ConversationHandler.END

    setup_text = """
⚙️ *গ্রুপ সেটআপ*

OpenRouter API কী দিন:
(পেতে: [openrouter.ai/keys](https://openrouter.ai/keys))

বাতিল: `/cancel`
"""

    await update.message.reply_text(
        setup_text,
        parse_mode=ParseMode.MARKDOWN,
        disable_web_page_preview=True
    )

    return WAITING_FOR_API_KEY


async def receive_api_key(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Receive and validate API key"""
    api_key = update.message.text.strip()

    # Basic validation
    if not api_key.startswith('sk-or-v1-'):
        await update.message.reply_text(
            "❌ অবৈধ API কী\n\nOpenRouter API কী `sk-or-v1-` দিয়ে শুরু হয়\n\nআবার চেষ্টা করুন বা `/cancel`"
        )
        return WAITING_FOR_API_KEY

    # Test the API key
    try:
        await update.message.reply_text("🔄 পরীক্ষা করা হচ্ছে...")

        # Test with a simple translation
        await translate_text("test", api_key, DEFAULT_MODEL)

        # Store in context for later use
        context.user_data['pending_api_key'] = api_key

        # Ask for group ID
        groups_text = """
✅ *API কী বৈধ!*

গ্রুপ আইডি পাঠান:

*গ্রুপ আইডি পেতে:*
গ্রুপে `/settings` কমান্ড দিন

উদাহরণ: `-1001234567890`

বাতিল: `/cancel`
"""

        await update.message.reply_text(
            groups_text,
            parse_mode=ParseMode.MARKDOWN
        )

        return WAITING_FOR_MODEL

    except Exception as e:
        error_msg = str(e)

        if '401' in error_msg or 'Unauthorized' in error_msg:
            await update.message.reply_text(
                "❌ *API কী অবৈধ!*\n\n"
                "সঠিক API কী দিন\n\n"
                "নতুন কী: [openrouter.ai/keys](https://openrouter.ai/keys)\n\n"
                "বাতিল: `/cancel`",
                parse_mode=ParseMode.MARKDOWN,
                disable_web_page_preview=True
            )
        elif '402' in error_msg:
            await update.message.reply_text(
                "✅ *API কী বৈধ* (ক্রেডিট নেই)\n\n"
                "ফ্রি মডেল ব্যবহার করতে ক্রেডিট লাগে না।\n\n"
                "গ্রুপ আইডি পাঠান:\n\n"
                "বাতিল: `/cancel`",
                parse_mode=ParseMode.MARKDOWN
            )
            context.user_data['pending_api_key'] = api_key
            return WAITING_FOR_MODEL
        else:
            await update.message.reply_text(
                f"❌ *ত্রুটি:* {error_msg}\n\nআবার চেষ্টা করুন বা `/cancel`",
                parse_mode=ParseMode.MARKDOWN
            )

        return WAITING_FOR_API_KEY


async def receive_group_id(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Receive group ID and complete setup"""
    group_input = update.message.text.strip()

    # Try to parse as group ID
    try:
        # Remove any non-numeric characters except the leading dash
        group_id = group_input
        if not group_id.startswith('-'):
            group_id = '-' + group_id.lstrip('-')

        group_id = int(group_id)

    except ValueError:
        await update.message.reply_text(
            "❌ অবৈধ গ্রুপ আইডি\n\n"
            "গ্রুপ আইডি হতে হবে সংখ্যা\nউদাহরণ: `-1001234567890`\n\n"
            "গ্রুপে `/settings` দিয়ে আইডি দেখুন\n\n"
            "বাতিল: `/cancel`"
        )
        return WAITING_FOR_MODEL

    # Get the pending API key
    api_key = context.user_data.get('pending_api_key')

    if not api_key:
        await update.message.reply_text(
            "❌ API কী পাওয়া যায়নি\n\nনতুন করে `/setup` দিন"
        )
        return ConversationHandler.END

    # Save to database
    db.update_group(
        group_id,
        api_key=api_key,
        model=DEFAULT_MODEL,
        enabled=True,
        admin_id=update.effective_user.id
    )

    # Clean up context
    context.user_data.clear()

    success_text = f"""
✅ *সেটআপ সম্পন্ন!*

গ্রুপ: `{group_id}`
মডেল: ফ্রি (Qwen 3 80B)

এখন গ্রুপে `/takla` ব্যবহার করুন!

নতুন গ্রুপ যোগ: `/setup`
"""

    await update.message.reply_text(
        success_text,
        parse_mode=ParseMode.MARKDOWN
    )

    return ConversationHandler.END


async def cancel_setup(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Cancel the setup process"""
    context.user_data.clear()
    await update.message.reply_text(
        "❌ সেটআপ বাতিল করা হয়েছে।\n\n"
        "নতুন করে শুরু করতে `/setup` দিন।"
    )
    return ConversationHandler.END


async def takla_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle /takla command"""
    chat_id = update.effective_chat.id
    message = update.message

    # Check if it's a reply
    if not message.reply_to_message:
        await message.reply_text(
            "⚠️ Reply করে `/takla` লিখুন",
            reply_to_message_id=message.message_id
        )
        return

    # Get group settings
    group_settings = db.get_group(str(chat_id))

    if not group_settings or not group_settings.get('api_key'):
        await message.reply_text(
            "⚠️ *API কী সেটআপ করা হয়নি*\n\nঅ্যাডমিন আমাকে DM করে `/setup` দিন",
            parse_mode=ParseMode.MARKDOWN,
            reply_to_message_id=message.message_id
        )
        return

    if not group_settings.get('enabled', True):
        return  # Bot is disabled

    # Get the replied message
    replied_message = message.reply_to_message

    # Get text to translate from the replied message
    text_to_translate = replied_message.text or replied_message.caption

    if not text_to_translate:
        await message.reply_text(
            "⚠️ টেক্সট পাওয়া যায়নি",
            reply_to_message_id=message.message_id
        )
        return

    # Get usernames
    original_author = replied_message.from_user
    requester = message.from_user

    # Format author name
    if original_author.username:
        author_name = f"@{original_author.username}"
    else:
        author_name = original_author.first_name or "Unknown"

    # Format requester name
    if requester.username:
        requester_name = f"@{requester.username}"
    else:
        requester_name = requester.first_name or "Unknown"

    try:
        # Send "translating..." message
        status_msg = await message.reply_text(
            "🔄 অনুবাদ করা হচ্ছে...",
            reply_to_message_id=message.message_id
        )

        # Send typing action
        await context.bot.send_chat_action(chat_id, 'typing')

        # Translate
        translated = await translate_text(
            text_to_translate,
            group_settings['api_key'],
            group_settings.get('model', DEFAULT_MODEL)
        )

        # Delete "translating..." message
        await status_msg.delete()

        # Create the translation response
        response_text = f"🔄 *অনুবাদ:*\n\n{translated}\n\n"
        response_text += f"━━━━━━━━━━━━━━━\n"
        response_text += f"📝 মূল: {author_name}\n"
        response_text += f"🔍 অনুরোধকারী: {requester_name}"

        # Send translation as reply to /takla command
        await message.reply_text(
            response_text,
            parse_mode=ParseMode.MARKDOWN,
            reply_to_message_id=message.message_id
        )

    except Exception as e:
        # Delete "translating..." message if it exists
        try:
            await status_msg.delete()
        except:
            pass

        error_msg = str(e)

        if '401' in error_msg:
            await message.reply_text(
                "❌ API কী অবৈধ",
                reply_to_message_id=message.message_id
            )
        elif '402' in error_msg:
            await message.reply_text(
                "❌ ক্রেডিট শেষ। ফ্রি মডেল ব্যবহার করুন",
                reply_to_message_id=message.message_id
            )
        else:
            await message.reply_text(
                f"❌ ত্রুটি: `{error_msg}`",
                parse_mode=ParseMode.MARKDOWN,
                reply_to_message_id=message.message_id
            )


async def settings_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show current settings"""
    chat_id = update.effective_chat.id
    chat_type = update.effective_chat.type

    if chat_type == ChatType.PRIVATE:
        await update.message.reply_text(
            "⚙️ *সেটিংস*\n\n"
            "গ্রুপের সেটিংস দেখতে গ্রুপে এই কমান্ড দিন।\n\n"
            "নতুন গ্রুপ সেটআপ করতে `/setup` দিন।",
            parse_mode=ParseMode.MARKDOWN
        )
        return

    group_settings = db.get_group(str(chat_id))

    if not group_settings:
        settings_text = f"""
⚙️ *গ্রুপ সেটিংস*

গ্রুপ আইডি: `{chat_id}`
স্ট্যাটাস: ❌ সেটআপ করা হয়নি

*সেটআপ করতে:*
অ্যাডমিন আমাকে DM করুন এবং `/setup` কমান্ড দিন।
"""
    else:
        api_key_masked = group_settings['api_key'][:12] + '...' if group_settings.get('api_key') else 'না'

        settings_text = f"""
⚙️ *গ্রুপ সেটিংস*

গ্রুপ আইডি: `{chat_id}`
API কী: `{api_key_masked}`
মডেল: `{group_settings.get('model', DEFAULT_MODEL)}`
স্ট্যাটাস: {'✅ চালু' if group_settings.get('enabled', True) else '❌ বন্ধ'}

*অ্যাডমিন কমান্ড:*
• `/setmodel` - মডেল পরিবর্তন করুন
• `/toggle` - চালু/বন্ধ করুন
• `/setup` - API কী পরিবর্তন করুন (DM এ)
"""

    await update.message.reply_text(
        settings_text,
        parse_mode=ParseMode.MARKDOWN
    )


async def setmodel_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Change the model"""
    chat_id = update.effective_chat.id
    chat_type = update.effective_chat.type

    # Check if admin
    if not await is_admin(update, context):
        await update.message.reply_text(
            "⚠️ এই কমান্ডটি শুধুমাত্র অ্যাডমিনরা ব্যবহার করতে পারবেন"
        )
        return

    if chat_type == ChatType.PRIVATE:
        await update.message.reply_text(
            "⚠️ এই কমান্ড গ্রুপে ব্যবহার করুন।"
        )
        return

    # Get model from command
    if context.args:
        model = ' '.join(context.args)
        db.update_group(chat_id, model=model)
        await update.message.reply_text(
            f"✅ মডেল পরিবর্তন করা হয়েছে: `{model}`",
            parse_mode=ParseMode.MARKDOWN
        )
    else:
        await update.message.reply_text(
            "⚠️ ব্যবহার: `/setmodel <model_id>`\n\n"
            "উদাহরণ: `/setmodel qwen/qwen3-next-80b-a3b-instruct:free`\n\n"
            "মডেল তালিকা দেখতে `/models` দিন।",
            parse_mode=ParseMode.MARKDOWN
        )


async def toggle_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Toggle bot on/off"""
    chat_id = update.effective_chat.id
    chat_type = update.effective_chat.type

    # Check if admin
    if not await is_admin(update, context):
        await update.message.reply_text(
            "⚠️ এই কমান্ডটি শুধুমাত্র অ্যাডমিনরা ব্যবহার করতে পারবেন"
        )
        return

    if chat_type == ChatType.PRIVATE:
        await update.message.reply_text(
            "⚠️ এই কমান্ড গ্রুপে ব্যবহার করুন।"
        )
        return

    group_settings = db.get_group(str(chat_id))

    if not group_settings:
        await update.message.reply_text(
            "⚠️ প্রথমে সেটআপ করুন। অ্যাডমিন আমাকে DM করে `/setup` দিন।"
        )
        return

    new_status = not group_settings.get('enabled', True)
    db.update_group(chat_id, enabled=new_status)

    await update.message.reply_text(
        f"{'✅ বট চালু করা হয়েছে' if new_status else '❌ বট বন্ধ করা হয়েছে'}"
    )


async def models_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show available models"""
    models_text = """
📋 *উপলব্ধ মডেল*

*ফ্রি মডেল (প্রস্তাবিত):*
• `qwen/qwen3-next-80b-a3b-instruct:free` ⭐
• `deepseek/deepseek-r1-0528:free`
• `stepfun/step-3.5-flash:free`

*পেইড মডেল:*
• `anthropic/claude-3.5-sonnet`
• `openai/gpt-4o`
• `google/gemini-2.0-flash-exp:free`

*মডেল সেট করতে:*
`/setmodel <model_id>`

*উদাহরণ:*
`/setmodel qwen/qwen3-next-80b-a3b-instruct:free`

আরও মডেল: [OpenRouter Models](https://openrouter.ai/models)
"""

    await update.message.reply_text(
        models_text,
        parse_mode=ParseMode.MARKDOWN,
        disable_web_page_preview=True
    )


async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle button callbacks"""
    query = update.callback_query
    await query.answer()

    if query.data == 'setup':
        # Create a fake update for setup
        update.message = query.message
        await setup_start(update, context)


# Error handler
async def error_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Log errors"""
    logger.error(f"Update {update} caused error {context.error}")


def main():
    """Start the bot"""
    # Get bot token from environment
    token = os.getenv('TELEGRAM_BOT_TOKEN')

    if not token:
        raise ValueError("TELEGRAM_BOT_TOKEN environment variable not set!")

    # Create application
    application = Application.builder().token(token).build()

    # Setup conversation handler for setup wizard
    setup_conv_handler = ConversationHandler(
        entry_points=[CommandHandler('setup', setup_start)],
        states={
            WAITING_FOR_API_KEY: [MessageHandler(filters.TEXT & ~filters.COMMAND, receive_api_key)],
            WAITING_FOR_MODEL: [MessageHandler(filters.TEXT & ~filters.COMMAND, receive_group_id)]
        },
        fallbacks=[CommandHandler('cancel', cancel_setup)]
    )

    # Add handlers
    application.add_handler(CommandHandler('start', start_command))
    application.add_handler(CommandHandler('help', help_command))
    application.add_handler(setup_conv_handler)
    application.add_handler(CommandHandler('takla', takla_command))
    application.add_handler(CommandHandler('settings', settings_command))
    application.add_handler(CommandHandler('setmodel', setmodel_command))
    application.add_handler(CommandHandler('toggle', toggle_command))
    application.add_handler(CommandHandler('models', models_command))
    application.add_handler(CallbackQueryHandler(button_callback))

    # Error handler
    application.add_error_handler(error_handler)

    # Set bot commands for the / menu
    async def post_init(application):
        """Set bot commands after initialization"""
        from telegram import BotCommand

        commands = [
            BotCommand("takla", "অনুবাদ করুন (reply করে)"),
            BotCommand("help", "সাহায্য"),
            BotCommand("settings", "সেটিংস দেখুন"),
            BotCommand("models", "মডেল তালিকা"),
            BotCommand("setup", "সেটআপ করুন (DM এ)"),
            BotCommand("setmodel", "মডেল পরিবর্তন (অ্যাডমিন)"),
            BotCommand("toggle", "চালু/বন্ধ (অ্যাডমিন)"),
        ]

        await application.bot.set_my_commands(commands)
        logger.info("✅ Bot commands set successfully")

    application.post_init = post_init

    # Start bot
    logger.info("🤖 Takla Onubad Bot started!")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    main()