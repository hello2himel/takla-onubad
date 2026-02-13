// Configuration
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const STORAGE_KEY = 'takla_bangla_config';

// Translations
const translations = {
    bn: {
        // Modal
        'modal.title': 'API সেটআপ',
        'modal.intro': 'আপনার OpenRouter API কী সংযুক্ত করুন।',
        'modal.guide': 'সেটআপ গাইড →',
        'modal.apiKeyLabel': 'OpenRouter API কী',
        'modal.modelLabel': 'মডেল',
        'modal.browseModels': 'মডেল দেখুন →',
        'modal.freeModels': 'ফ্রি মডেল',
        'modal.paidModels': 'পেইড মডেল',
        'modal.custom': 'কাস্টম',
        'modal.customModel': 'কাস্টম মডেল আইডি',
        'modal.rememberSettings': 'এই ডিভাইসে আমার সেটিংস মনে রাখুন',
        'modal.securityNote': 'আপনার API কী স্থানীয়ভাবে সংরক্ষণ করা হয় এবং কখনও আমাদের সার্ভারে পাঠানো হয় না।',
        'modal.securityInfo': 'নিরাপত্তা তথ্য →',
        'modal.testBtn': 'সংযোগ পরীক্ষা করুন',
        'modal.saveBtn': 'সংরক্ষণ করুন',
        
        // Badges
        'badge.free': 'ফ্রি',
        'badge.paid': 'পেইড',
        
        // About
        'about.title': 'টাকলা অনুবাদ সম্পর্কে',
        'about.whatIsTitle': 'টাকলা অনুবাদ কী?',
        'about.whatIsDesc': 'টাকলা অনুবাদ একটি ভাষাগত মেরামত ইঞ্জিন যা ইংরেজি অক্ষরে লেখা বিকৃত ফোনেটিক বাংলাকে সঠিক বাংলা লিপিতে রূপান্তরিত করে। এটি আধুনিক AI ভাষা মডেল ব্যবহার করে অভিপ্রায় বুঝতে এবং ব্যাকরণগতভাবে সঠিক পাঠ্য পুনর্গঠন করতে।',
        'about.howWorksTitle': 'এটি কীভাবে কাজ করে',
        'about.howWorksDesc': 'শুধু আপনার ফোনেটিক বাংলা টেক্সট টাইপ করুন বা পেস্ট করুন (যেমন "ami tore valo bashi") এবং AI এটিকে স্ট্যান্ডার্ড বাংলা স্ক্রিপ্টে রূপান্তরিত করবে (আমি তোকে ভালো বাসি)। টুলটি বানান বৈচিত্র্য, স্ল্যাং এবং এমনকি গুরুতর বিকৃতি পরিচালনা করে।',
        'about.privacyTitle': 'গোপনীয়তা ও নিরাপত্তা',
        'about.privacy1': 'কোন ব্যাকএন্ড সার্ভার নেই - সম্পূর্ণভাবে আপনার ব্রাউজারে চলে',
        'about.privacy2': 'API কী শুধুমাত্র আপনার ডিভাইসে স্থানীয়ভাবে সংরক্ষিত',
        'about.privacy3': 'কোন লগিং, ট্র্যাকিং বা ডেটা সংগ্রহ নেই',
        'about.privacy4': 'অনুবাদ সরাসরি OpenRouter এর মাধ্যমে প্রক্রিয়া করা হয়',
        'about.techTitle': 'প্রযুক্তি',
        'about.tech2': 'ক্লায়েন্ট-সাইড ইনফারেন্স (কোন সার্ভার নেই)',
        'about.tech3': 'স্ট্যাটিক হোস্টিং (যেকোনো জায়গায় স্থাপনযোগ্য)',
        'about.tech4': 'ওপেন সোর্স ও ব্যবহার করতে ফ্রি',
        'about.sourceTitle': 'সোর্স কোড',
        'about.sourceDesc': 'এই প্রকল্পটি ওপেন সোর্স এবং GitHub এ উপলব্ধ:',
        'about.viewSource': 'সোর্স কোড দেখুন →',
        
        // App
        'app.title': 'টাকলা অনুবাদ',
        
        // Menu
        'menu.about': 'সম্পর্কে',
        'menu.source': 'সোর্স কোড',
        'menu.donate': 'ডোনেট করুন',
        'menu.settings': 'সেটিংস',
        
        // Status
        'status.using': 'ব্যবহার করছেন:',
        'status.docs': 'OpenRouter ডকুমেন্টেশন',
        
        // Panel
        'panel.input': 'টাকলা (ফোনেটিক বাংলা)',
        'panel.inputPlaceholder': 'ইংরেজি অক্ষরে লেখা বিকৃত বাংলা টাইপ করুন বা পেস্ট করুন...',
        
        // Buttons
        'btn.clear': 'পরিষ্কার করুন',
        'btn.translate': 'অনুবাদ করুন',
        'btn.selectAll': 'সব নির্বাচন করুন',
        'btn.copy': 'কপি করুন',
        'btn.copied': 'কপি হয়েছে',
        
        // Messages
        'msg.emptyInput': 'অনুবাদ করার জন্য কিছু টেক্সট লিখুন',
        'msg.unsafeContent': 'অনিরাপদ কন্টেন্ট সনাক্ত করা হয়েছে',
        'msg.configSaved': 'কনফিগারেশন সংরক্ষিত হয়েছে',
        'msg.apiKeyMissing': 'অনুগ্রহ করে একটি API কী লিখুন। ',
        'msg.getKey': 'একটি কী পান →',
        'msg.testing': 'সংযোগ পরীক্ষা করা হচ্ছে...',
        'msg.invalidKey': 'অবৈধ API কী। ',
        'msg.errorDetails': 'ত্রুটি বিবরণ →',
        'msg.insufficientCredits': 'বৈধ কী, কিন্তু অপর্যাপ্ত ক্রেডিট। ',
        'msg.addCredits': 'ক্রেডিট যোগ করুন →',
        'msg.rateLimited': 'বৈধ কী, কিন্তু রেট সীমিত। ',
        'msg.details': 'বিবরণ →',
        'msg.connectionSuccess': '✓ সংযোগ সফল! আপনার API কী কাজ করছে।',
        'msg.unknownError': 'ত্রুটি: অজানা ত্রুটি। ',
        'msg.troubleshoot': 'সমস্যা সমাধান →',
        'msg.connectionFailed': 'সংযোগ ব্যর্থ: আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।',
        'msg.translationError': 'অনুবাদ ত্রুটি',
        'msg.providerError': 'প্রদানকারী ত্রুটি। একটি ভিন্ন মডেল চেষ্টা করুন। '
    },
    en: {
        // Modal
        'modal.title': 'API Configuration',
        'modal.intro': 'Connect your OpenRouter API key.',
        'modal.guide': 'Setup guide →',
        'modal.apiKeyLabel': 'OpenRouter API Key',
        'modal.modelLabel': 'Model',
        'modal.browseModels': 'Browse models →',
        'modal.freeModels': 'Free Models',
        'modal.paidModels': 'Paid Models',
        'modal.custom': 'Custom',
        'modal.customModel': 'Custom Model ID',
        'modal.rememberSettings': 'Remember my settings on this device',
        'modal.securityNote': 'Your API key is stored locally and never sent to our servers.',
        'modal.securityInfo': 'Security info →',
        'modal.testBtn': 'Test Connection',
        'modal.saveBtn': 'Save & Continue',
        
        // Badges
        'badge.free': 'Free',
        'badge.paid': 'Paid',
        
        // About
        'about.title': 'About Takla Onubad',
        'about.whatIsTitle': 'What is Takla Onubad?',
        'about.whatIsDesc': 'Takla Onubad is a linguistic repair engine that converts heavily distorted phonetic Bangla (often written in English letters) into proper Bengali script. It uses modern AI language models to understand intent and reconstruct grammatically correct text.',
        'about.howWorksTitle': 'How it Works',
        'about.howWorksDesc': 'Simply type or paste your phonetic Bangla text (like "ami tore valo bashi") and the AI will convert it to standard Bengali script (আমি তোকে ভালো বাসি). The tool handles spelling variations, slang, and even severe distortions.',
        'about.privacyTitle': 'Privacy & Security',
        'about.privacy1': 'No backend server - runs entirely in your browser',
        'about.privacy2': 'API keys stored locally on your device only',
        'about.privacy3': 'No logging, tracking, or data collection',
        'about.privacy4': 'Translations processed directly via OpenRouter',
        'about.techTitle': 'Technology',
        'about.tech2': 'Client-side inference (no server)',
        'about.tech3': 'Static hosting (deployable anywhere)',
        'about.tech4': 'Open source & free to use',
        'about.sourceTitle': 'Source Code',
        'about.sourceDesc': 'This project is open source and available on GitHub:',
        'about.viewSource': 'View Source Code →',
        
        // App
        'app.title': 'Takla Onubad',
        
        // Menu
        'menu.about': 'About',
        'menu.source': 'Source Code',
        'menu.donate': 'Donate',
        'menu.settings': 'Settings',
        
        // Status
        'status.using': 'Using:',
        'status.docs': 'OpenRouter Docs',
        
        // Panel
        'panel.input': 'Takla (Phonetic Bangla)',
        'panel.inputPlaceholder': 'Type or paste distorted Bangla written in English letters...',
        
        // Buttons
        'btn.clear': 'Clear',
        'btn.translate': 'Translate',
        'btn.selectAll': 'Select All',
        'btn.copy': 'Copy',
        'btn.copied': 'Copied',
        
        // Messages
        'msg.emptyInput': 'Please enter some text to translate',
        'msg.unsafeContent': 'Unsafe content detected',
        'msg.configSaved': 'Configuration saved',
        'msg.apiKeyMissing': 'Please enter an API key. ',
        'msg.getKey': 'Get a key →',
        'msg.testing': 'Testing connection...',
        'msg.invalidKey': 'Invalid API key. ',
        'msg.errorDetails': 'Error details →',
        'msg.insufficientCredits': 'Valid key, but insufficient credits. ',
        'msg.addCredits': 'Add credits →',
        'msg.rateLimited': 'Valid key, but rate limited. ',
        'msg.details': 'Details →',
        'msg.connectionSuccess': '✓ Connection successful! Your API key is working.',
        'msg.unknownError': 'Error: Unknown error. ',
        'msg.troubleshoot': 'Troubleshoot →',
        'msg.connectionFailed': 'Connection failed: Check your internet connection.',
        'msg.translationError': 'Translation error',
        'msg.providerError': 'Provider error. Try a different model. '
    }
};

// System Prompt (Verbatim from spec)
const SYSTEM_PROMPT = `You are an elite Bangla linguistic reconstruction engine designed to interpret high-noise Romanized Bangla and convert it into correct, natural Bengali script.

Your task is to reconstruct the user's intended Bangla meaning while preserving their original tone, informality, slang, dialect, and emotional expression.

You must accurately process TWO distinct input types.

--------------------------------------------------

TAKLA BHASHA (PRIMARY CASE)

Takla Bhasha is a chaotic and highly distorted form of Bangla written using English letters where readability is often severely degraded. It is NOT standard phonetic Bangla.

Common patterns include:
• Missing vowels (kmn, vl, krsi)
• Broken or inconsistent phoneme mapping
• Merged or truncated words
• Heavy slang usage
• Dialect-driven spellings
• English-Bangla hybrids
• Compressed grammar
• Repeated letters (plzzzzz, bhaloooo)
• Partial or malformed words

Meaning is frequently recoverable only through context.

Your PRIMARY objective is semantic reconstruction.

When spelling conflicts with probable intent, ALWAYS choose the intended meaning.

Never perform naive character-by-character transliteration.

--------------------------------------------------

STANDARD ROMANIZED BANGLA (SECONDARY CASE)

Some inputs will already be readable phonetic Bangla.

Examples:
ami bhalo achi
tumi ki korcho
ami kal jabo

In these cases:
• Convert accurately
• Interfere minimally
• Preserve informality
• Avoid stylistic upgrades

Over-correction is a critical failure.

--------------------------------------------------

CORE OPERATING RULES

MEANING OVERRIDES LETTERS  
Interpret the sentence first. Convert second.  
If literal transliteration produces unnatural Bangla, reconstruct the most probable natural sentence instead.

--------------------------------------------------

STRICT SLANG PRESERVATION (NON-NEGOTIABLE)

Slang, dialect, and conversational verb forms are intentional signals of voice and MUST be preserved.

Examples:
tore  → তোরে        (NOT তোকে)  
korsi → করছি        (NOT করেছি)  
gesos → গেছোস  
korbo → করবো  

Do NOT sanitize speech into formal Bangla.  
Do NOT upgrade conversational verbs into literary forms.

Target natural spoken Bangla.

--------------------------------------------------

EMPHASIS AND LETTER STRETCHING

Users often stretch letters to convey urgency, emotion, or tone. Preserve this whenever readability remains intact.

Examples:
plzzzzz → প্লিজজজজ  
bhaloooo → ভালোওও  
naaaaa → নাাআআ  

Only compress letters if the word becomes visually unreadable.

Emotional signal is part of meaning. Removing it is an error.

--------------------------------------------------

GRAMMAR POLICY

Correct grammar ONLY when failing to do so would cause confusion.

Otherwise allow:
• Spoken grammar  
• Informal conjugations  
• Conversational particles  
• Relaxed sentence structure  

Avoid literary Bangla unless the user clearly writes in a formal register.

Never impose academic tone.

--------------------------------------------------

DIALECT HANDLING

Preserve dialect when understandable to an average Bangla reader.

Convert only when comprehension would otherwise fail.

Do NOT standardize away regional personality.

--------------------------------------------------

MIXED ENGLISH + BANGLA

If English words are naturally embedded in Bangla speech, transliterate instead of translating.

Examples:
reply → রিপ্লাই  
meeting → মিটিং  
plan → প্ল্যান  
confirm → কনফার্ম  

Do NOT force pure Bangla vocabulary.  
Never translate proper nouns, brand names, or identities.

--------------------------------------------------

NOISE VS EMPHASIS

Remove corruption that blocks comprehension:
aaaami → আমি  
kkkothay → কোথায়  

But do NOT remove expressive stretching that communicates emotion.

You MUST distinguish noise from emphasis.

--------------------------------------------------

AMBIGUITY RESOLUTION

When multiple interpretations exist:
Choose the most statistically probable everyday spoken Bangla.

Do NOT output alternatives.  
Do NOT ask questions.  
Do NOT hedge.

Commit decisively.

--------------------------------------------------

ADAPTIVE CORRECTION STRENGTH

Heavily distorted Takla → aggressive reconstruction  
Readable phonetic Bangla → minimal interference  

Uniform behavior across both cases is a failure.

--------------------------------------------------

ABSOLUTE PROHIBITIONS

Never:
• Explain your reasoning  
• Provide multiple outputs  
• Include transliteration  
• Add commentary  
• Rewrite stylistically  
• Summarize  
• Inject new meaning  
• Translate into English  
• Output metadata  
• Use quotation marks  
• Output markdown  

--------------------------------------------------

OUTPUT CONSTRAINT (HARD RULE)

Return ONLY the final Bengali text.

No prefixes.  
No suffixes.  
No notes.

If the input contains multiple sentences, return them as natural Bengali sentences.

--------------------------------------------------

REFERENCE BEHAVIOR

Input: ami kmn asi  
Output: আমি কেমন আছি  

Input: ami tore onk vlobashi  
Output: আমি তোরে অনেক ভালোবাসি  

Input: plzzzzz asho akhn  
Output: প্লিজজজজ আসো এখন  

Input: tmi koi gesos  
Output: তুমি কই গেছোস  

Input: ami bhalo achi  
Output: আমি ভালো আছি  

--------------------------------------------------

Your function is reconstruction of the user's intended Bangla voice under conditions of spelling chaos.

Return only the corrected Bengali text.`;


// State Management
let config = {
    apiKey: '',
    model: 'stepfun/step-3.5-flash:free',
    temperature: 0,
    streaming: true,
    safety: false,
    language: 'bn'
};

// DOM Elements
const elements = {
    setupModal: document.getElementById('setupModal'),
    aboutModal: document.getElementById('aboutModal'),
    mainApp: document.getElementById('mainApp'),
    apiKeyInput: document.getElementById('apiKey'),
    modelSelectWrapper: document.getElementById('modelSelectWrapper'),
    selectedModelSpan: document.getElementById('selectedModel'),
    modelValue: document.getElementById('modelValue'),
    customModelInput: document.getElementById('customModel'),
    storeLocalCheckbox: document.getElementById('storeLocal'),
    testKeyBtn: document.getElementById('testKeyBtn'),
    saveKeyBtn: document.getElementById('saveKeyBtn'),
    testStatus: document.getElementById('testStatus'),
    langToggle: document.getElementById('langToggle'),
    currentLang: document.getElementById('currentLang'),
    themeToggle: document.getElementById('themeToggle'),
    menuToggle: document.getElementById('menuToggle'),
    mainMenu: document.getElementById('mainMenu'),
    aboutBtn: document.getElementById('aboutBtn'),
    closeAbout: document.getElementById('closeAbout'),
    settingsMenuBtn: document.getElementById('settingsMenuBtn'),
    modelStatusBar: document.getElementById('modelStatusBar'),
    currentModelSpan: document.getElementById('currentModel'),
    currentModelBadge: document.querySelector('.status-badge'),
    taklaBanglaInput: document.getElementById('taklaBanglaInput'),
    bengaliOutput: document.getElementById('bengaliOutput'),
    outputSpinner: document.getElementById('outputSpinner'),
    translateBtn: document.getElementById('translateBtn'),
    copyBtn: document.getElementById('copyBtn'),
    selectAllBtn: document.getElementById('selectAllBtn'),
    clearInputBtn: document.getElementById('clearInputBtn'),
    charCount: document.getElementById('charCount'),
    estimatedCost: document.getElementById('estimatedCost'),
    statusBar: document.getElementById('statusBar'),
    loadingIndicator: document.getElementById('loadingIndicator')
};

// Initialize App
function init() {
    loadConfig();
    initLanguage();
    initTheme();
    setupCustomDropdown();
    setupMenu();
    setupEventListeners();
    
    if (config.apiKey) {
        elements.setupModal.style.display = 'none';
        elements.mainApp.style.display = 'block';
        updateModelDisplay();
    }
}

// Language Management
function initLanguage() {
    const savedLang = config.language || 'bn';
    setLanguage(savedLang);
}

function setLanguage(lang) {
    config.language = lang;
    document.documentElement.lang = lang;
    document.title = lang === 'bn' ? 'টাকলা অনুবাদ' : 'Takla Onubad';
    
    // Update language button
    elements.currentLang.textContent = lang === 'bn' ? 'বাং' : 'Eng';
    
    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    
    // Update char count
    updateCharCount();
    
    saveConfig();
}

function toggleLanguage() {
    const newLang = config.language === 'bn' ? 'en' : 'bn';
    setLanguage(newLang);
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update icon
    const icon = elements.themeToggle.querySelector('.theme-icon');
    if (theme === 'dark') {
        // Show moon icon
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    } else {
        // Show sun icon
        icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    }
}

function updateModelDisplay() {
    const modelNames = {
        'qwen/qwen3-next-80b-a3b-instruct:free': 'Qwen 3 Next 80B',
        'deepseek/deepseek-r1-0528:free': 'DeepSeek R1',
        'stepfun/step-3.5-flash:free': 'Step 3.5 Flash',
        'anthropic/claude-3.5-sonnet': 'Claude 3.5 Sonnet',
        'openai/gpt-4o': 'GPT-4o',
        'google/gemini-2.0-flash-exp:free': 'Gemini 2.0 Flash'
    };
    
    const freeModels = ['qwen/qwen3-next-80b-a3b-instruct:free', 'deepseek/deepseek-r1-0528:free', 'stepfun/step-3.5-flash:free'];
    const displayName = modelNames[config.model] || config.model;
    const isFree = freeModels.includes(config.model);
    
    elements.currentModelSpan.textContent = displayName;
    
    // Update badge
    if (elements.currentModelBadge) {
        elements.currentModelBadge.textContent = isFree ? 'Free' : 'Paid';
        elements.currentModelBadge.className = isFree ? 'status-badge free' : 'status-badge paid';
    }
}

// Custom Dropdown Handler
function setupCustomDropdown() {
    const wrapper = elements.modelSelectWrapper;
    const trigger = wrapper.querySelector('.select-trigger');
    const options = wrapper.querySelectorAll('.option');
    
    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.classList.toggle('open');
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        // Only close if click is outside the wrapper
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });
    
    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const value = option.dataset.value;
            const name = option.querySelector('.option-name').textContent;
            
            // Remove previous selection
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            if (value === 'custom') {
                elements.selectedModelSpan.textContent = 'Custom Model';
                elements.customModelInput.style.display = 'block';
                elements.customModelInput.focus();
                elements.modelValue.value = 'custom';
            } else {
                const badges = option.querySelectorAll('.option-badge');
                let displayText = name;
                badges.forEach(badge => {
                    if (badge.classList.contains('free')) {
                        displayText += ' (Free)';
                    } else if (badge.classList.contains('paid')) {
                        displayText += ' (Paid)';
                    }
                    if (badge.classList.contains('recommended')) {
                        displayText += ' ★';
                    }
                });
                elements.selectedModelSpan.textContent = displayText;
                elements.customModelInput.style.display = 'none';
                elements.modelValue.value = value;
                config.model = value;
            }
            
            wrapper.classList.remove('open');
        });
    });
    
    // Handle custom model input
    elements.customModelInput.addEventListener('input', (e) => {
        config.model = e.target.value.trim();
    });
}

// Menu Handler
function setupMenu() {
    elements.menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.mainMenu.classList.toggle('show');
    });
    
    // Close menu on outside click
    document.addEventListener('click', () => {
        elements.mainMenu.classList.remove('show');
    });
    
    // Prevent menu from closing when clicking inside
    elements.mainMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // About modal
    elements.aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        elements.aboutModal.style.display = 'flex';
        elements.mainMenu.classList.remove('show');
    });
    
    elements.closeAbout.addEventListener('click', () => {
        elements.aboutModal.style.display = 'none';
    });
    
    // Close about modal on outside click
    elements.aboutModal.addEventListener('click', (e) => {
        if (e.target === elements.aboutModal) {
            elements.aboutModal.style.display = 'none';
        }
    });
    
    // Settings from menu
    elements.settingsMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openSettings();
        elements.mainMenu.classList.remove('show');
    });
}

function openSettings() {
    elements.setupModal.style.display = 'flex';
    elements.apiKeyInput.value = config.apiKey;
    
    // Set selected model in dropdown
    const currentValue = config.model;
    const options = elements.modelSelectWrapper.querySelectorAll('.option');
    let found = false;
    
    options.forEach(opt => {
        opt.classList.remove('selected');
        if (opt.dataset.value === currentValue) {
            opt.classList.add('selected');
            found = true;
        }
    });
    
    if (!found) {
        // Custom model
        const customOption = elements.modelSelectWrapper.querySelector('[data-value="custom"]');
        customOption.classList.add('selected');
        elements.selectedModelSpan.textContent = 'Custom Model';
        elements.customModelInput.value = config.model;
        elements.customModelInput.style.display = 'block';
        elements.modelValue.value = 'custom';
    }
}

// Config Management
function loadConfig() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            config = { ...config, ...JSON.parse(stored) };
        }
    } catch (e) {
        console.error('Failed to load config:', e);
    }
}

function saveConfig() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
        console.error('Failed to save config:', e);
        showStatus('Failed to save settings', 'error');
    }
}

// Event Listeners
function setupEventListeners() {
    // Language toggle
    if (elements.langToggle) {
        elements.langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Model status bar click
    if (elements.modelStatusBar) {
        elements.modelStatusBar.addEventListener('click', openSettings);
        elements.modelStatusBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openSettings();
            }
        });
    }
    
    // API Key testing
    elements.testKeyBtn.addEventListener('click', testApiKey);
    elements.saveKeyBtn.addEventListener('click', saveApiKey);

    // Main translation
    elements.translateBtn.addEventListener('click', translateText);
    
    // Input handling
    elements.taklaBanglaInput.addEventListener('input', (e) => {
        updateCharCount();
        updateCostEstimate();
    });

    // Copy and select all functionality
    elements.copyBtn.addEventListener('click', copyOutput);
    elements.selectAllBtn.addEventListener('click', selectAllOutput);

    // Clear button
    elements.clearInputBtn.addEventListener('click', () => {
        elements.taklaBanglaInput.value = '';
        updateCharCount();
        updateCostEstimate();
    });

    // Enter to translate (Ctrl/Cmd + Enter)
    elements.taklaBanglaInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            translateText();
        }
    });
    
    // Close modal on outside click
    elements.setupModal.addEventListener('click', (e) => {
        if (e.target === elements.setupModal) {
            // Only close if user has already saved config
            if (config.apiKey) {
                elements.setupModal.style.display = 'none';
            }
        }
    });
}

// API Key Management
async function testApiKey() {
    const apiKey = elements.apiKeyInput.value.trim();
    
    if (!apiKey) {
        showTestStatus(t('msg.apiKeyMissing') + '<a href="https://openrouter.ai/docs/quickstart" target="_blank" rel="noopener">' + t('msg.getKey') + '</a>', 'error');
        return;
    }

    elements.testKeyBtn.disabled = true;
    elements.testKeyBtn.textContent = config.language === 'bn' ? 'পরীক্ষা হচ্ছে...' : 'Testing...';
    showTestStatus(t('msg.testing'), 'info');

    try {
        const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: config.model,
                messages: [{ role: 'user', content: 'test' }],
                max_tokens: 5
            })
        });

        if (response.status === 401) {
            showTestStatus(t('msg.invalidKey') + '<a href="https://openrouter.ai/docs/quickstart" target="_blank" rel="noopener">' + t('msg.errorDetails') + '</a>', 'error');
            elements.saveKeyBtn.disabled = true;
        } else if (response.status === 402) {
            showTestStatus(t('msg.insufficientCredits') + '<a href="https://openrouter.ai/docs/quickstart" target="_blank" rel="noopener">' + t('msg.addCredits') + '</a>', 'success');
            elements.saveKeyBtn.disabled = false;
        } else if (response.status === 429) {
            showTestStatus(t('msg.rateLimited') + '<a href="https://openrouter.ai/docs/quickstart" target="_blank" rel="noopener">' + t('msg.details') + '</a>', 'success');
            elements.saveKeyBtn.disabled = false;
        } else if (response.ok) {
            showTestStatus(t('msg.connectionSuccess'), 'success');
            elements.saveKeyBtn.disabled = false;
        } else {
            const errorData = await response.json().catch(() => ({}));
            showTestStatus(t('msg.unknownError') + '<a href="https://openrouter.ai/docs/quickstart" target="_blank" rel="noopener">' + t('msg.troubleshoot') + '</a>', 'error');
            elements.saveKeyBtn.disabled = true;
        }
    } catch (error) {
        showTestStatus(t('msg.connectionFailed'), 'error');
        elements.saveKeyBtn.disabled = true;
    } finally {
        elements.testKeyBtn.disabled = false;
        elements.testKeyBtn.textContent = t('modal.testBtn');
    }
}

function saveApiKey() {
    const apiKey = elements.apiKeyInput.value.trim();
    const modelValue = elements.modelValue.value;
    const storeLocal = elements.storeLocalCheckbox.checked;
    
    config.apiKey = apiKey;
    config.model = modelValue === 'custom' ? elements.customModelInput.value.trim() : modelValue;
    
    if (storeLocal) {
        saveConfig();
    } else {
        // Only store in memory for this session
        localStorage.removeItem(STORAGE_KEY);
    }
    
    elements.setupModal.style.display = 'none';
    elements.mainApp.style.display = 'block';
    
    updateModelDisplay();
    showStatus(t('msg.configSaved'), 'success');
}

// Translation Logic
async function translateText() {
    const input = elements.taklaBanglaInput.value.trim();
    
    if (!input) {
        showStatus(t('msg.emptyInput'), 'error');
        return;
    }

    // Disable UI during translation
    elements.translateBtn.disabled = true;
    elements.translateBtn.textContent = config.language === 'bn' ? 'অনুবাদ হচ্ছে...' : 'Translating...';
    elements.taklaBanglaInput.disabled = true;
    
    // Show spinner in output
    elements.bengaliOutput.textContent = '';
    elements.outputSpinner.style.display = 'flex';
    elements.copyBtn.disabled = true;
    elements.selectAllBtn.disabled = true;

    try {
        await translateWithStreaming(input);
        
        elements.copyBtn.disabled = false;
        elements.selectAllBtn.disabled = false;
    } catch (error) {
        handleTranslationError(error);
    } finally {
        elements.translateBtn.disabled = false;
        elements.translateBtn.textContent = t('btn.translate');
        elements.taklaBanglaInput.disabled = false;
        elements.outputSpinner.style.display = 'none';
    }
}

// Translation helper
function t(key) {
    return translations[config.language][key] || key;
}

async function translateWithStreaming(input) {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
            model: config.model,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: input }
            ],
            temperature: config.temperature,
            stream: true
        })
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullText = '';

    elements.bengaliOutput.innerHTML = '';

    while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
            if (line.startsWith('data: ')) {
                const data = line.slice(6);
                
                if (data === '[DONE]') continue;
                
                try {
                    const parsed = JSON.parse(data);
                    const delta = parsed.choices?.[0]?.delta?.content;
                    
                    if (delta) {
                        fullText += delta;
                        elements.bengaliOutput.textContent = fullText;
                    }
                } catch (e) {
                    // Skip malformed JSON
                }
            }
        }
    }

    if (!fullText) {
        throw new Error('No content received from API');
    }
}

function handleTranslationError(error) {
    let message = t('msg.translationError');
    let link = '';
    
    if (error.message.includes('401')) {
        message = t('msg.invalidKey');
        link = '<a href="https://openrouter.ai/docs/quickstart" target="_blank" rel="noopener">' + t('msg.errorDetails') + '</a>';
    } else if (error.message.includes('429')) {
        message = t('msg.rateLimited');
        link = '<a href="https://openrouter.ai/docs/quickstart" target="_blank" rel="noopener">' + t('msg.details') + '</a>';
    } else if (error.message.includes('402')) {
        message = t('msg.insufficientCredits');
        link = '<a href="https://openrouter.ai/docs/quickstart" target="_blank" rel="noopener">' + t('msg.addCredits') + '</a>';
    } else if (error.message.includes('5')) {
        message = t('msg.providerError');
        link = '<a href="https://openrouter.ai/docs/quickstart" target="_blank" rel="noopener">' + t('msg.errorDetails') + '</a>';
    }
    
    elements.bengaliOutput.innerHTML = `<span style="color: var(--error);">${message}</span> ${link}`;
    showStatus(message, 'error');
}

// UI Helpers
function updateCharCount() {
    const count = elements.taklaBanglaInput.value.length;
    const suffix = config.language === 'bn' ? ' অক্ষর' : ' chars';
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    
    if (config.language === 'bn') {
        // Convert to Bengali numerals
        const bengaliCount = count.toString().split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
        elements.charCount.textContent = bengaliCount + suffix;
    } else {
        elements.charCount.textContent = count + suffix;
    }
}

function updateCostEstimate() {
    const chars = elements.taklaBanglaInput.value.length;
    const estimatedTokens = Math.ceil(chars / 4);
    const estimatedCost = (estimatedTokens / 1000000) * 3;
    
    if (estimatedTokens > 0) {
        elements.estimatedCost.textContent = `~$${estimatedCost.toFixed(4)}`;
    } else {
        elements.estimatedCost.textContent = '';
    }
}

function copyOutput() {
    const text = elements.bengaliOutput.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        elements.copyBtn.textContent = t('btn.copied');
        setTimeout(() => {
            elements.copyBtn.textContent = t('btn.copy');
        }, 1500);
    }).catch(() => {
        showStatus(t('msg.translationError'), 'error');
    });
}

function selectAllOutput() {
    const range = document.createRange();
    range.selectNodeContents(elements.bengaliOutput);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

function clearOutput() {
    elements.bengaliOutput.textContent = '';
    elements.copyBtn.disabled = true;
    elements.selectAllBtn.disabled = true;
}

function showStatus(message, type = 'info') {
    elements.statusBar.textContent = message;
    elements.statusBar.className = `toast show ${type}`;
    
    setTimeout(() => {
        elements.statusBar.classList.remove('show');
    }, 3000);
}

function showTestStatus(message, type) {
    elements.testStatus.innerHTML = message;
    elements.testStatus.className = `status ${type}`;
}

// Initialize on load
init();