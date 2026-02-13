# Security Policy

## Overview

This is a fully client-side application. **No backend exists**. All API calls happen directly from the user's browser to OpenRouter.

## API Key Security

### Storage
- API keys are stored in browser `localStorage`
- Keys **never** leave the user's device except when making API calls to OpenRouter
- No telemetry, analytics, or third-party tracking

### Risks
⚠️ **Client-side applications cannot fully protect API keys.**

Anyone with access to the user's browser can:
- View the key in localStorage
- Intercept the key via DevTools
- Extract the key from memory

### Mitigation Recommendations

For **users**:
1. **Set spending limits** on your OpenRouter account
2. **Use disposable keys** for testing/demos
3. **Rotate keys regularly** if using in shared environments
4. **Never share your device** while the app is open
5. **Clear localStorage** when done: `localStorage.clear()`

For **developers** deploying this:
1. Add clear warnings about API key security
2. Consider implementing a backend proxy (breaks zero-backend design)
3. Rate limit on OpenRouter side
4. Monitor usage via OpenRouter dashboard

## Content Safety

### Built-in Filters
The app includes regex-based safety filters for:
- Self-harm language
- Explicit sexual content
- Hate speech patterns

### Limitations
- Filters are basic and can be bypassed
- Not suitable for production use with untrusted users
- LLM-level safety depends on the chosen model

### Recommendations
For production deployment:
1. Use OpenRouter's moderation features
2. Choose models with strong safety guarantees (Claude, GPT-4)
3. Add server-side content filtering if handling public input

## Data Privacy

### What We Store
- API key (localStorage only)
- User preferences (temperature, model selection)
- **Nothing else**

### What We Don't Store
- Translation history
- Input/output text
- User analytics
- Cookies (none set)

### Data Retention
All data is cleared when:
- User clears browser data
- User switches browsers/devices
- localStorage is manually cleared

## Reporting Vulnerabilities

Found a security issue? Please report responsibly:

1. **Do not** open a public issue
2. Email details to the maintainer
3. Include: reproduction steps, impact assessment, suggested fix

## Known Limitations

### Browser Security
- XSS: Mitigated by CSP headers (if hosting supports)
- MITM: Use HTTPS-only deployment
- Key extraction: Cannot be prevented in client-side apps

### API Security
- Rate limiting: Handled by OpenRouter
- Cost abuse: User responsibility via spending limits
- Model access: Controlled by OpenRouter permissions

## Secure Deployment Checklist

- [ ] Deploy over HTTPS only
- [ ] Set security headers (see vercel.json/netlify.toml)
- [ ] Recommend users set spending limits
- [ ] Display API key warning prominently
- [ ] No server-side API key storage
- [ ] No logging/analytics that could leak keys

## Compliance

### GDPR
- No personal data collected by this application
- API keys not considered personal data (user-generated secrets)
- OpenRouter has own privacy policy

### CCPA
- No sale of personal information
- No collection of personal information

## Updates

This security policy may be updated as new vulnerabilities are discovered or best practices evolve.

Last updated: February 2026
