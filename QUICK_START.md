# 🚀 Quick Start - Deploy in 5 Minutes

## Step-by-Step GitHub Pages Deployment

### 1️⃣ Open PowerShell in the export folder
```powershell
cd "d:\TIGS BD\github-pages-export"
```

### 2️⃣ Initialize Git (if not already done)
```powershell
git init
git add .
git commit -m "Initial commit - TIGS BD E-commerce"
git branch -M main
```

### 3️⃣ Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: **tigsbd**
3. Make it **Public**
4. **DON'T** initialize with README
5. Click **Create repository**

### 4️⃣ Push to GitHub
Replace `YOUR_USERNAME` with your GitHub username:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/tigsbd.git
git push -u origin main
```

### 5️⃣ Enable GitHub Pages
1. Go to your repository: `https://github.com/YOUR_USERNAME/tigsbd`
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source": Select **main** branch and **/ (root)** folder
4. Click **Save**
5. Wait 2-3 minutes

### 6️⃣ Visit Your Site! 🎉
Your site will be live at:
```
https://YOUR_USERNAME.github.io/tigsbd/
```

---

## 🌐 Custom Domain Setup (www.tigsbd.com)

### If you own tigsbd.com domain:

**Step 1: Configure DNS at your domain provider**

Add these records:
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

**Step 2: Configure in GitHub**
1. Go to Settings → Pages
2. Under "Custom domain", enter: `www.tigsbd.com`
3. Click Save
4. Check "Enforce HTTPS" (after DNS propagates)

**Step 3: Wait**
- DNS propagation: 1-48 hours (usually 1-4 hours)
- Check status: https://www.whatsmydns.net

Your site will be at: **https://www.tigsbd.com**

---

## ✅ What You Get

- 67 total pages (29 customer + 38 admin)
- Mobile responsive design
- Professional UI with Tailwind CSS
- Ready for portfolio/demo purposes

## ⚠️ Remember

This is a **static demo site**:
- Forms don't submit (no backend)
- Products are placeholders
- Login is cosmetic
- Great for showcasing design!

For full e-commerce functionality, deploy the Laravel backend to a server.

---

## 📚 Need More Help?

Read the full guides:
- [README.md](README.md) - Overview
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Detailed deployment

---

**Ready to deploy?** Just follow steps 1-6 above! 🚀