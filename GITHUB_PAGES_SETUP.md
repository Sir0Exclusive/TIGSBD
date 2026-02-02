# GitHub Pages Deployment Guide - TIGSBD

Complete step-by-step instructions to deploy your TIGSBD website to GitHub Pages with your custom domain.

---

## 📋 Prerequisites

Before starting, you'll need:
- A GitHub account (free at [github.com](https://github.com))
- Git installed on your computer
- Your domain name
- About 10 minutes of your time

---

## 🚀 Deployment Steps

### Step 1: Prepare Your GitHub Account

1. **Log in to GitHub** → https://github.com/login
2. **Create a new repository**:
   - Go to https://github.com/new
   - Repository name options:
     - **Option A (GitHub Pages with username)**: `your-username.github.io`
     - **Option B (Custom domain)**: Any name like `tigsbd`, `store`, etc.
   - Description: "TIGSBD - E-Commerce Static Site"
   - **Select: Public** (required for free GitHub Pages)
   - Click **Create repository**

### Step 2: Upload Your Files

#### Method 1: Using Git (Recommended)

```bash
# Navigate to the github-pages-export folder
cd "d:\TIGS BD\github-pages-export"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: TIGSBD static website"

# Rename branch to main (if needed)
git branch -M main

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git push -u origin main
```

#### Method 2: Using GitHub Web Interface (Easier)

1. Go to your repository on GitHub
2. Click **Add file** → **Upload files**
3. Drag and drop all files from `github-pages-export` folder
4. Click **Commit changes**

### Step 3: Enable GitHub Pages

1. Go to your repository
2. Click **Settings** (top menu)
3. Left sidebar → Click **Pages**
4. Under "Build and deployment":
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` / `master`
   - **Folder**: Select `/ (root)`
5. Click **Save**

Your site is now live at:
- If you used `username.github.io`: https://username.github.io
- If you used custom repo: https://username.github.io/repo-name

✅ **Test it** by visiting the URL above!

---

## 🌐 Connecting Your Custom Domain

### Step 1: Update the CNAME File

1. In your repository, find the `CNAME` file
2. Click the pencil icon to edit
3. Replace `yourdomain.com` with your actual domain
4. Click **Commit changes**

Example:
```
yourdomain.com
```

### Step 2: Configure DNS Records

Go to your domain provider (GoDaddy, Namecheap, etc.) and update DNS:

**Option A: Using CNAME Record** (Easiest)
```
Subdomain: www
Type: CNAME
Value: your-username.github.io
TTL: 3600
```

**Option B: Using A Records** (For root domain)
```
Type: A
Values:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
TTL: 3600
```

### Step 3: Verify in GitHub

1. Go back to repository **Settings > Pages**
2. Under "Custom domain", enter your domain: `yourdomain.com`
3. ✅ Check "Enforce HTTPS"
4. GitHub will verify and enable SSL automatically (wait 5-10 minutes)

Your site is now live at: **https://yourdomain.com** 🎉

---

## 📝 Customizing Your Site

### Update Product Data

Edit `products.html` and modify the products array:

```javascript
const products = [
    { 
        id: 1, 
        name: 'Your Product Name', 
        price: 1000, 
        discount: 25,
        category: 'Electronics' 
    },
    // Add more products here
];
```

### Update Navigation Links

In all HTML files, update:
- Company name
- Logo text
- Navigation links
- Footer information
- Contact details

### Update Colors & Styling

The site uses Tailwind CSS classes. To change colors:
- Primary color (blue): `from-primary-600` class
- Secondary color (amber): `from-amber-400` class
- Accent colors: `from-red-500`, `from-green-400`, etc.

### Update Contact Information

Find and replace in all files:
- `support@tigsbd.com` → your email
- `+880-1X-XXXXX` → your phone
- Business hours
- Social media links

---

## 🔄 Making Updates

Every time you want to update your website:

```bash
# Navigate to folder
cd "d:\TIGS BD\github-pages-export"

# Make your changes to HTML files

# Stage changes
git add .

# Commit
git commit -m "Update: [describe what changed]"

# Push to GitHub
git push origin main
```

Your changes will be live in a few seconds! ⚡

---

## 🐛 Troubleshooting

### Site Shows 404

**Problem**: Your domain works but shows "Page not found"
- ✅ Make sure `index.html` is in the root directory
- ✅ Check that branch is set to `main` in Settings > Pages
- ✅ Wait 5 minutes for GitHub to rebuild
- ✅ Clear browser cache (Ctrl+Shift+Delete)

### Custom Domain Not Working

**Problem**: Your domain doesn't work or shows GitHub's default site
- ✅ Verify CNAME file contains your domain
- ✅ Wait 15-30 minutes for DNS to propagate
- ✅ Check DNS records at your domain provider
- ✅ Use [nslookup](https://mxtoolbox.com) to verify DNS

### HTTPS Not Working

**Problem**: Site shows "Not Secure"
- ✅ Go to Settings > Pages
- ✅ Uncheck and recheck "Enforce HTTPS"
- ✅ Wait 5-10 minutes for certificate
- ✅ Clear browser cache

### Missing Images/Styles

**Problem**: Site looks broken, images missing
- ✅ Verify all files were uploaded (check on GitHub)
- ✅ Check file paths are correct
- ✅ CSS file path should be: `assets/app-8813b74f.css`
- ✅ JS file path should be: `assets/app-3f22cd7c.js`

---

## 📊 Monitoring Your Site

### Check Build Status

1. Go to repository → **Actions**
2. You'll see deployment history
3. Green checkmark = Success ✅
4. Red X = Failed ❌ (click to see error)

### View Analytics

GitHub Pages doesn't include built-in analytics. Add one:

**Option 1: Google Analytics**
```html
<!-- Add to all HTML files, before </body> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

**Option 2: Simple Analytics**
- Sign up at [simpleanalytics.com](https://simpleanalytics.com)
- Get your domain ID
- Add tracking code to all pages

---

## 🎯 Next Steps

After deployment, consider:

1. **Add Contact Form** - Use Formspree or Basin
2. **Search Engine Optimization** - Add meta tags, sitemap.xml
3. **Analytics** - Add Google Analytics or Plausible
4. **Newsletter** - Integrate Mailchimp
5. **Dynamic Products** - Use headless CMS like Sanity or Strapi

---

## 💡 Pro Tips

- 🔒 Always use HTTPS
- 📱 Test on mobile devices
- 🚀 Minimize large files (images, videos)
- 📊 Monitor page load time
- 🔄 Keep content updated regularly
- 🎨 Maintain consistent branding

---

## ❓ FAQ

**Q: Can I use GitHub Pages for free?**
A: Yes! GitHub Pages is completely free for public repositories.

**Q: Do I need to pay for the domain?**
A: Domains cost money (typically $10-15/year). You can buy from:
- GoDaddy, Namecheap, Google Domains, etc.
- Use a free domain from Freenom (not recommended for business)

**Q: Can I add shopping cart functionality?**
A: Yes! Use:
- Snipcart for e-commerce
- Shopify + GitHub integration
- Custom backend API

**Q: How fast will my site load?**
A: GitHub Pages is very fast (usually <500ms).
- First load depends on internet speed
- Cached pages load instantly

**Q: Can I use a subdomain like shop.yourdomain.com?**
A: Yes! Just update the CNAME file:
```
shop.yourdomain.com
```

---

## 📞 Support Resources

- GitHub Pages Docs: https://docs.github.com/en/pages
- GitHub Community: https://github.community
- Domain Provider Support: Contact your registrar
- Check GitHub Status: https://www.githubstatus.com

---

## ✨ Deployment Checklist

Before going live, verify:

- [ ] All files uploaded to GitHub
- [ ] CNAME file updated with your domain
- [ ] DNS records configured at domain provider
- [ ] Settings > Pages configured correctly
- [ ] GitHub Pages shows "Your site is live"
- [ ] Custom domain is set in Settings > Pages
- [ ] HTTPS is enforced
- [ ] Site loads on your domain (https://yourdomain.com)
- [ ] All links work correctly
- [ ] Mobile responsive (test on phone)
- [ ] Images load properly
- [ ] Contact info is up to date

---

**Congratulations! Your TIGSBD website is now live on GitHub Pages! 🎉**

For questions or issues, refer to the GitHub Pages documentation or contact your domain provider's support.

**Last Updated**: February 2, 2026
**Version**: 1.0.0
