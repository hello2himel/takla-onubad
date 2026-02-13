# Deployment Guide

This app is a static site with **zero build step required**. Deploy anywhere that serves HTML files.

## Quick Deploy Options

### 1. Vercel (Recommended)

**One-click deploy:**
```bash
npx vercel --prod
```

**Via Git:**
1. Push to GitHub/GitLab
2. Import to [vercel.com/new](https://vercel.com/new)
3. Framework: None (Static)
4. Deploy

**Custom Domain:**
```bash
vercel domains add yourdomain.com
vercel alias your-deployment-url.vercel.app yourdomain.com
```

### 2. Netlify

**Drag & Drop:**
1. Visit [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire folder
3. Done!

**CLI Deploy:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

**Via Git:**
1. Push to GitHub
2. Import at [app.netlify.com](https://app.netlify.com)
3. Build settings: Leave blank
4. Publish directory: `/`
5. Deploy

### 3. Cloudflare Pages

**CLI Deploy:**
```bash
npx wrangler pages publish . --project-name takla-bangla
```

**Via Git:**
1. Push to GitHub
2. Connect at [dash.cloudflare.com/pages](https://dash.cloudflare.com/pages)
3. Framework: None
4. Build command: (leave empty)
5. Output directory: `/`

### 4. GitHub Pages

**Setup:**
1. Create repo: `github.com/username/takla-bangla`
2. Push all files
3. Settings → Pages
4. Source: Deploy from `main` branch
5. Folder: `/ (root)`
6. Save

**URL:** `https://username.github.io/takla-bangla/`

**Custom domain:**
- Add `CNAME` file with your domain
- Configure DNS: `CNAME` to `username.github.io`

### 5. AWS S3 + CloudFront

**S3 Setup:**
```bash
aws s3 mb s3://takla-bangla
aws s3 sync . s3://takla-bangla --exclude ".git/*"
aws s3 website s3://takla-bangla --index-document index.html
```

**Make Public:**
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::takla-bangla/*"
  }]
}
```

**CloudFront (optional but recommended):**
1. Create distribution
2. Origin: your S3 bucket
3. Enable HTTPS
4. Deploy

### 6. Firebase Hosting

**Setup:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

**firebase.json:**
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

**Deploy:**
```bash
firebase deploy --only hosting
```

### 7. Surge.sh

**Ultra-simple:**
```bash
npm install -g surge
cd takla-bangla
surge
```

Follow prompts. Done in 30 seconds.

### 8. Self-Hosted (VPS/Server)

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    root /var/www/takla-bangla;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Security headers
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "DENY";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache Configuration (.htaccess):**
```apache
# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "DENY"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"

# Cache control
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>
```

## Post-Deployment Checklist

- [ ] HTTPS enabled (mandatory)
- [ ] Security headers configured
- [ ] Test on mobile devices
- [ ] Verify API key warning displays
- [ ] Test OpenRouter connection
- [ ] Check browser console for errors
- [ ] Verify localStorage persistence
- [ ] Test streaming functionality

## Custom Domain Setup

### DNS Configuration

**For apex domain (example.com):**
```
A     @     <your-host-ip>
CNAME www   your-deployment.vercel.app
```

**For subdomain (app.example.com):**
```
CNAME app   your-deployment.vercel.app
```

### SSL/TLS

Most platforms (Vercel, Netlify, Cloudflare) provide **free automatic SSL**.

For self-hosted, use **Let's Encrypt**:
```bash
sudo certbot --nginx -d yourdomain.com
```

## Performance Optimization

### Enable Compression

**Nginx:**
```nginx
gzip on;
gzip_types text/css application/javascript;
gzip_min_length 1000;
```

**Cloudflare:**
Auto-enabled (if using Cloudflare)

### CDN Configuration

Most platforms have built-in CDN. For custom setup:

1. **Cloudflare**: Add site → Update nameservers
2. **AWS CloudFront**: Create distribution → Point to S3
3. **Fastly**: Similar to CloudFront

## Environment Variables

This app has **no environment variables** - it's purely client-side.

API keys are entered by users at runtime.

## Monitoring

### Recommended Tools

**Uptime:**
- [UptimeRobot](https://uptimerobot.com) (free)
- [Pingdom](https://pingdom.com)

**Analytics (Privacy-Respecting):**
- [Plausible](https://plausible.io)
- [Fathom](https://usefathom.com)

⚠️ **Do not use Google Analytics** - contradicts privacy goals.

## Troubleshooting

### CORS Errors
Not applicable - all API calls go directly to OpenRouter (CORS-enabled).

### Mixed Content Errors
Ensure your deployment uses HTTPS. OpenRouter requires HTTPS.

### 404 on Refresh
Add rewrite rule:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Fonts Not Loading
Google Fonts CDN is used - ensure not blocked by adblockers.

## Scaling

This app **needs no backend scaling** - it runs on the user's device.

Cost scales with:
- API usage (user pays via OpenRouter)
- Bandwidth (negligible for static files)

Typical costs: **$0-5/month** for hosting, zero for app itself.

## Updates & Maintenance

To update:
1. Edit files locally
2. Test locally (`python -m http.server`)
3. Push/deploy

**No database migrations. No server restarts. Just upload.**

## Security Hardening

### Content Security Policy (CSP)

**Meta tag in index.html:**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src https://fonts.gstatic.com; 
               connect-src https://openrouter.ai;">
```

**Or via headers (preferred):**
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src https://openrouter.ai;";
```

### Rate Limiting

Handled by OpenRouter. Set limits in your OpenRouter dashboard.

## Multi-Region Deployment

**Vercel/Netlify**: Automatic edge deployment

**Cloudflare Pages**: Global CDN included

**AWS**: Use CloudFront with S3 origins in multiple regions

## Backup Strategy

**Git is your backup.** No database to back up.

Optional:
1. Keep repo on GitHub
2. Set up automated S3 backups
3. Use version tagging (`git tag v1.0.0`)

## License Compliance

MIT License - freely deployable for commercial/personal use.

## Support

If deployment fails:
1. Check platform status page
2. Verify file permissions (for self-hosted)
3. Check browser console for errors
4. Test OpenRouter API directly

---

**Remember:** This is a static site. If it works locally, it works deployed. No magic. No hidden complexity.
