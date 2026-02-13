// Configuration
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const STORAGE_KEY = 'takla_bangla_config';

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


// Safety Filter Patterns
const UNSAFE_PATTERNS = [
    /\b(kill|murder|suicide|harm)\s+(myself|yourself|themselves)\b/i,
    /\b(penis|vagina|fuck|shit|cunt|dick|pussy)\b/i,
    /\b(nazi|hitler|genocide|holocaust)\s+(good|great|awesome)\b/i,
];

// State Management
let config = {
    apiKey: '',
    model: 'anthropic/claude-3.5-sonnet',
    temperature: 0.2,
    streaming: true,
    safety: true
};

// DOM Elements
const elements = {
    setupModal: document.getElementById('setupModal'),
    mainApp: document.getElementById('mainApp'),
    apiKeyInput: document.getElementById('apiKey'),
    modelSelect: document.getElementById('modelSelect'),
    customModelInput: document.getElementById('customModel'),
    testKeyBtn: document.getElementById('testKeyBtn'),
    saveKeyBtn: document.getElementById('saveKeyBtn'),
    testStatus: document.getElementById('testStatus'),
    settingsBtn: document.getElementById('settingsBtn'),
    taklaBanglaInput: document.getElementById('taklaBanglaInput'),
    bengaliOutput: document.getElementById('bengaliOutput'),
    translateBtn: document.getElementById('translateBtn'),
    copyBtn: document.getElementById('copyBtn'),
    clearInputBtn: document.getElementById('clearInputBtn'),
    clearOutputBtn: document.getElementById('clearOutputBtn'),
    charCount: document.getElementById('charCount'),
    estimatedCost: document.getElementById('estimatedCost'),
    tempSlider: document.getElementById('tempSlider'),
    tempValue: document.getElementById('tempValue'),
    streamToggle: document.getElementById('streamToggle'),
    safetyToggle: document.getElementById('safetyToggle'),
    statusBar: document.getElementById('statusBar'),
    loadingIndicator: document.getElementById('loadingIndicator')
};

// Initialize App
function init() {
    loadConfig();
    setupEventListeners();
    
    if (config.apiKey) {
        elements.setupModal.style.display = 'none';
        elements.mainApp.style.display = 'block';
    }
}

// Config Management
function loadConfig() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            config = { ...config, ...JSON.parse(stored) };
            elements.tempSlider.value = config.temperature;
            elements.tempValue.textContent = config.temperature;
            elements.streamToggle.checked = config.streaming;
            elements.safetyToggle.checked = config.safety;
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
    // Model selection
    elements.modelSelect.addEventListener('change', (e) => {
        if (e.target.value === 'custom') {
            elements.customModelInput.style.display = 'block';
            elements.customModelInput.focus();
        } else {
            elements.customModelInput.style.display = 'none';
            config.model = e.target.value;
        }
    });

    elements.customModelInput.addEventListener('input', (e) => {
        config.model = e.target.value.trim();
    });

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

    // Copy functionality
    elements.copyBtn.addEventListener('click', copyOutput);

    // Clear buttons
    elements.clearInputBtn.addEventListener('click', () => {
        elements.taklaBanglaInput.value = '';
        updateCharCount();
        updateCostEstimate();
    });

    elements.clearOutputBtn.addEventListener('click', clearOutput);

    // Settings
    elements.settingsBtn.addEventListener('click', () => {
        elements.setupModal.style.display = 'flex';
        elements.apiKeyInput.value = config.apiKey;
    });

    // Advanced controls
    elements.tempSlider.addEventListener('input', (e) => {
        config.temperature = parseFloat(e.target.value);
        elements.tempValue.textContent = config.temperature;
        saveConfig();
    });

    elements.streamToggle.addEventListener('change', (e) => {
        config.streaming = e.target.checked;
        saveConfig();
    });

    elements.safetyToggle.addEventListener('change', (e) => {
        config.safety = e.target.checked;
        saveConfig();
    });

    // Enter to translate (Ctrl/Cmd + Enter)
    elements.taklaBanglaInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            translateText();
        }
    });
}

// API Key Management
async function testApiKey() {
    const apiKey = elements.apiKeyInput.value.trim();
    
    if (!apiKey) {
        showTestStatus('Please enter an API key', 'error');
        return;
    }

    elements.testKeyBtn.disabled = true;
    const originalHTML = elements.testKeyBtn.innerHTML;
    elements.testKeyBtn.innerHTML = '<i class="ri-loader-4-line" style="animation: spin 1s linear infinite;"></i>Testing';
    showTestStatus('Testing connection...', 'info');

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
            showTestStatus('❌ Invalid API key', 'error');
            elements.saveKeyBtn.disabled = true;
        } else if (response.status === 429) {
            showTestStatus('⚠️ Rate limited - but key is valid', 'success');
            elements.saveKeyBtn.disabled = false;
        } else if (response.ok) {
            showTestStatus('✅ Connection successful!', 'success');
            elements.saveKeyBtn.disabled = false;
        } else {
            const errorData = await response.json().catch(() => ({}));
            showTestStatus(`❌ Error: ${errorData.error?.message || 'Unknown error'}`, 'error');
            elements.saveKeyBtn.disabled = true;
        }
    } catch (error) {
        showTestStatus(`❌ Connection failed: ${error.message}`, 'error');
        elements.saveKeyBtn.disabled = true;
    } finally {
        elements.testKeyBtn.disabled = false;
        elements.testKeyBtn.innerHTML = originalHTML;
    }
}

function saveApiKey() {
    const apiKey = elements.apiKeyInput.value.trim();
    const modelValue = elements.modelSelect.value;
    
    config.apiKey = apiKey;
    config.model = modelValue === 'custom' ? elements.customModelInput.value.trim() : modelValue;
    
    saveConfig();
    
    elements.setupModal.style.display = 'none';
    elements.mainApp.style.display = 'block';
    
    showStatus('Settings saved successfully', 'success');
}

// Safety Filter
function checkSafety(text) {
    if (!config.safety) return { safe: true };
    
    for (const pattern of UNSAFE_PATTERNS) {
        if (pattern.test(text)) {
            return { 
                safe: false, 
                reason: 'Content contains potentially unsafe material' 
            };
        }
    }
    
    return { safe: true };
}

// Translation Logic
async function translateText() {
    const input = elements.taklaBanglaInput.value.trim();
    
    if (!input) {
        showStatus('Please enter some text to translate', 'error');
        return;
    }

    // Safety check
    const safetyCheck = checkSafety(input);
    if (!safetyCheck.safe) {
        elements.bengaliOutput.innerHTML = `<span style="color: var(--error);">⚠️ Translation blocked due to unsafe content.</span>`;
        elements.copyBtn.disabled = true;
        elements.clearOutputBtn.disabled = false;
        showStatus(safetyCheck.reason, 'error');
        return;
    }

    // Disable UI during translation
    elements.translateBtn.disabled = true;
    const originalHTML = elements.translateBtn.innerHTML;
    elements.translateBtn.innerHTML = '<i class="ri-loader-4-line" style="animation: spin 1s linear infinite;"></i><span>Translating</span>';
    elements.loadingIndicator.style.display = config.streaming ? 'none' : 'flex';
    clearOutput();

    try {
        if (config.streaming) {
            await translateWithStreaming(input);
        } else {
            await translateNonStreaming(input);
        }
        
        elements.copyBtn.disabled = false;
        elements.clearOutputBtn.disabled = false;
        showStatus('Translation complete!', 'success');
    } catch (error) {
        handleTranslationError(error);
    } finally {
        elements.translateBtn.disabled = false;
        elements.translateBtn.innerHTML = originalHTML;
        elements.loadingIndicator.style.display = 'none';
    }
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

async function translateNonStreaming(input) {
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
            stream: false
        })
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error('No content received from API');
    }

    elements.bengaliOutput.textContent = content;
}

function handleTranslationError(error) {
    let message = error.message;
    
    if (message.includes('401')) {
        message = 'Invalid API key. Please check your settings.';
    } else if (message.includes('429')) {
        message = 'Rate limit exceeded. Please wait and try again, or switch models.';
    } else if (message.includes('5')) {
        message = 'Provider error. Try switching to a different model.';
    }
    
    elements.bengaliOutput.innerHTML = `<span style="color: var(--error);">❌ ${message}</span>`;
    showStatus(message, 'error');
}

// UI Helpers
function updateCharCount() {
    const count = elements.taklaBanglaInput.value.length;
    elements.charCount.innerHTML = `<i class="ri-text"></i>${count} chars`;
}

function updateCostEstimate() {
    const chars = elements.taklaBanglaInput.value.length;
    const estimatedTokens = Math.ceil(chars / 4);
    const estimatedCost = (estimatedTokens / 1000000) * 3; // Rough estimate: $3 per 1M tokens
    
    if (estimatedTokens > 0) {
        elements.estimatedCost.innerHTML = `<i class="ri-money-dollar-circle-line"></i>~$${estimatedCost.toFixed(4)}`;
    } else {
        elements.estimatedCost.textContent = '';
    }
}

function copyOutput() {
    const text = elements.bengaliOutput.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showStatus('Copied to clipboard!', 'success');
        const originalHTML = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = '<i class="ri-check-line"></i>';
        setTimeout(() => {
            elements.copyBtn.innerHTML = originalHTML;
        }, 2000);
    }).catch(() => {
        showStatus('Failed to copy', 'error');
    });
}

function clearOutput() {
    elements.bengaliOutput.innerHTML = `
        <div class="placeholder-content">
            <i class="ri-quill-pen-line"></i>
            <p>Translation will appear here</p>
        </div>
    `;
    elements.copyBtn.disabled = true;
    elements.clearOutputBtn.disabled = true;
}

function showStatus(message, type = 'info') {
    elements.statusBar.textContent = message;
    elements.statusBar.className = `status-bar show ${type}`;
    
    setTimeout(() => {
        elements.statusBar.classList.remove('show');
    }, 3000);
}

function showTestStatus(message, type) {
    elements.testStatus.textContent = message;
    elements.testStatus.className = `status-message ${type}`;
}

// Initialize on load
init();
