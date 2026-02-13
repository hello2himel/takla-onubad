# 🚀 Quick Start Guide

Get the Takla Bangla converter running in **under 2 minutes**.

## Step 1: Get OpenRouter API Key (1 minute)

1. Go to https://openrouter.ai/
2. Click "Sign Up" (or "Log In" if you have an account)
3. Navigate to "Keys" section
4. Click "Create Key"
5. Copy the key (starts with `sk-or-v1-...`)
6. Add credits: Settings → Credits → Add $5 (enough for thousands of translations)

## Step 2: Run the App (30 seconds)

### Option A: Open Directly (Easiest)
Just double-click `index.html` in your file browser. Most modern browsers will run it.

### Option B: Local Server (Recommended for testing)

**Python (if installed):**
```bash
cd takla-bangla
python -m http.server 8000
```
Then open: http://localhost:8000

**Node.js (if installed):**
```bash
cd takla-bangla
npx serve .
```
Then open: http://localhost:3000

**PHP (if installed):**
```bash
cd takla-bangla
php -S localhost:8000
```
Then open: http://localhost:8000

## Step 3: Connect & Test (30 seconds)

1. A modal will appear asking for your API key
2. Paste your OpenRouter key
3. Click "Test Connection" (wait 2-3 seconds)
4. If successful, click "Save & Continue"
5. Done! You're in.

## Step 4: Try It Out

**Test input:**
```
ami tore onk vlobashi
kemon acho tumi
ajke khub valo lagche
```

Click "Translate →" and watch the magic happen!

## Common Issues

### "Invalid API Key"
- Make sure you copied the entire key
- Check you added credits to your OpenRouter account
- Try generating a new key

### Nothing happens when I click Translate
- Open browser console (F12) and check for errors
- Make sure you have internet connection
- Try a different model from Advanced Settings

### Modal won't close
- Test your key first (button should turn green)
- Only then can you save

## Next Steps

- **Deploy it**: See `DEPLOYMENT.md` for hosting options
- **Customize it**: Edit `app.js` to change the system prompt
- **Style it**: Modify `styles.css` for your brand
- **Share it**: Deploy on Vercel/Netlify and send the link

## Cost Expectations

- Short message (50 chars): ~$0.0001
- Paragraph (500 chars): ~$0.001  
- Long text (5000 chars): ~$0.01

$5 credit = approximately 5,000 translations of average length.

## Security Reminder

⚠️ Your API key is stored only on your device (in browser localStorage). Never share screenshots with your key visible!

## Need Help?

1. Check `README.md` for detailed docs
2. Check `DEPLOYMENT.md` for hosting help
3. Check `SECURITY.md` for security info
4. Open browser console (F12) to see errors

---

**That's it!** You now have a production-ready Bangla translation tool running on your machine.

Enjoy! 🎉
