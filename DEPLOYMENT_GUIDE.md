# 🚀 GitHub Pages Deployment Guide for TIGS BD

This guide will help you deploy your TIGS BD e-commerce site to GitHub Pages with your custom domain.

## 📋 What You Have

- **67 Total HTML Pages**: 29 customer pages + 38 admin pages
- **Complete Static Site**: All pages are static HTML with Tailwind CSS
- **Mobile Responsive**: Works on all devices
- **Custom Domain Ready**: Pre-configured for www.tigsbd.com

## 🎯 Deployment Options

### Option 1: Basic GitHub Pages (Free)

**URL**: `https://YOUR_USERNAME.github.io/tigsbd/`

1. **Create GitHub Repository**
   ```bash
   cd "d:\TIGS BD\github-pages-export"
   git init
   git add .
   git commit -m "Initial commit - TIGS BD e-commerce site"
   git branch -M main
   ```

2. **Create Repository on GitHub**
   - Go to https://github.com/new
   - Repository name: `tigsbd`
   - Public or Private (your choice)
   - Don't initialize with README
   - Click "Create repository"

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/tigsbd.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click `Settings` → `Pages` (left sidebar)
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
   - Click `Save`
   - Wait 2-3 minutes for deployment

5. **Visit Your Site**
   - URL will be: `https://YOUR_USERNAME.github.io/tigsbd/`

---

### Option 2: Custom Domain (Recommended - www.tigsbd.com)

**URL**: `https://www.tigsbd.com`

#### Step 1: Configure DNS at Your Domain Provider

Go to your domain registrar (where you bought tigsbd.com) and add these DNS records:

**For www.tigsbd.com:**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 3600
```

**For apex domain (tigsbd.com):**
```
Type: A
Name: @
Value: 185.199.108.153
```
```
Type: A
Name: @
Value: 185.199.109.153
```
```
Type: A
Name: @
Value: 185.199.110.153
```
```
Type: A
Name: @
Value: 185.199.111.153
```

#### Step 2: Configure GitHub Repository

1. **Follow Option 1 steps 1-3** to push code to GitHub

2. **Configure Custom Domain**
   - Go to Settings → Pages
   - Under "Custom domain", enter: `www.tigsbd.com`
   - Click `Save`
   - Check "Enforce HTTPS" (after DNS propagates)

3. **Verify CNAME File**
   - The CNAME file in your repo should contain: `www.tigsbd.com`
   - This is already created for you

#### Step 3: Wait for DNS Propagation

- DNS changes take 1-48 hours (usually 1-4 hours)
- Check status: https://www.whatsmydns.net/#CNAME/www.tigsbd.com
- Once propagated, visit https://www.tigsbd.com

---

## 📁 File Structure

```
github-pages-export/
├── index.html              (Landing page with redirect)
├── CNAME                   (Custom domain configuration)
├── README.md              (Documentation)
├── DEPLOYMENT_GUIDE.md    (This file)
│
├── Customer Pages (29 files)
│   ├── home-landing.html
│   ├── login.html
│   ├── register.html
│   ├── products.html
│   ├── product.html
│   ├── cart.html
│   ├── checkout.html
│   ├── dashboard.html
│   └── ... (and more)
│
├── admin/                 (Admin panel - 38 pages)
│   ├── login.html
│   ├── dashboard.html
│   ├── products.html
│   ├── orders.html
│   └── ... (and more)
│
├── css/
│   └── app-8813b74f.css  (Tailwind CSS)
│
├── js/
├── images/
└── uploads/
```

## 🔧 Post-Deployment Configuration

### 1. Update Navigation Links

If you deployed to a subdirectory (e.g., `/tigsbd/`), update links:

**Before**: `href="products.html"`  
**After**: `href="/tigsbd/products.html"`

You can use search & replace in all HTML files.

### 2. Test All Pages

Visit each section:
- ✅ Homepage: https://www.tigsbd.com (or your GitHub Pages URL)
- ✅ Products: /products.html
- ✅ Cart: /cart.html
- ✅ Checkout: /checkout.html
- ✅ Dashboard: /dashboard.html
- ✅ Admin: /admin/login.html

### 3. Mobile Testing

Test on different devices:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

### 4. SSL/HTTPS

- GitHub Pages provides free SSL
- Check "Enforce HTTPS" in Settings → Pages
- All traffic will be encrypted

---

## ⚠️ Important Notes

### Static Site Limitations

Remember, this is a **static HTML site**. The following features won't work without a backend:

- ❌ Form submissions (login, register, checkout)
- ❌ Database operations (products, orders)
- ❌ Payment processing
- ❌ File uploads
- ❌ User authentication
- ❌ Real-time inventory

### Demo vs Production

**Current Site**: Demo/Portfolio showcase  
**For Production**: You need:
1. Backend server (Laravel app)
2. Database (MySQL/PostgreSQL)
3. Payment gateway integration
4. Email service
5. Cloud storage for images

---

## 🔄 Updating Your Site

To update your site after changes:

```bash
cd "d:\TIGS BD\github-pages-export"

# Make your changes to HTML files

git add .
git commit -m "Update: describe your changes"
git push origin main

# Site will auto-rebuild in 1-3 minutes
```

---

## 🌐 Recommended Hybrid Architecture

For a **fully functional e-commerce site**:

### Setup 1: Static Frontend + Dynamic Backend

```
Customer Site:   https://www.tigsbd.com       (GitHub Pages - Static)
Admin Panel:     https://admin.tigsbd.com     (Server - Laravel)
API:             https://api.tigsbd.com       (Server - Laravel API)
```

**Benefits**:
- Fast customer-facing site (CDN-backed)
- Secure admin panel (server-based)
- Scalable architecture

### Setup 2: Full Server Deployment

Deploy everything to a server:
- Shared hosting (e.g., Hostinger, Namecheap)
- VPS (e.g., DigitalOcean, Linode)
- Cloud (e.g., AWS, Google Cloud)

**Recommended**: Hostinger Premium (BDT 300/month)
- Supports Laravel
- Free SSL
- 100GB storage
- Easy cPanel

---

## 📧 DNS Configuration Examples

### Namecheap
1. Login → Domain List → Manage
2. Advanced DNS
3. Add CNAME: `www` → `YOUR_USERNAME.github.io.`
4. Add A records for apex (4 records above)

### Hostinger
1. Login → Domains → DNS/NS
2. Add CNAME: `www` → `YOUR_USERNAME.github.io.`
3. Add A records for apex

### GoDaddy
1. Login → My Products → DNS
2. Add CNAME: `www` → `YOUR_USERNAME.github.io.`
3. Add A records for apex

---

## ✅ Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Custom domain added (if applicable)
- [ ] DNS records configured
- [ ] DNS propagated (check whatsmydns.net)
- [ ] HTTPS enabled
- [ ] All pages tested
- [ ] Mobile responsiveness verified
- [ ] Navigation links working
- [ ] Forms styled (even if non-functional)

---

## 🆘 Troubleshooting

### Site not loading
- Wait 2-3 minutes after enabling GitHub Pages
- Clear browser cache (Ctrl+Shift+R)
- Check repository is public or GitHub Pro

### Custom domain not working
- Verify DNS records (use whatsmydns.net)
- Wait 24-48 hours for propagation
- Check CNAME file exists in repo
- Ensure domain is added in GitHub Settings

### CSS not loading
- Check file paths in HTML
- Ensure css/app-8813b74f.css exists
- Verify GitHub Pages base path

### 404 Errors
- Check file names match exactly (case-sensitive)
- Ensure index.html exists in root
- Verify GitHub Pages source is set to `root`

---

## 📞 Support

For deployment issues:
- GitHub Pages Docs: https://docs.github.com/pages
- DNS Checker: https://www.whatsmydns.net
- SSL Status: https://www.ssllabs.com/ssltest/

For code issues:
- Contact development team
- Check README.md

---

## 🎉 Congratulations!

Your TIGS BD e-commerce site is now live on the internet!

**Next Steps**:
1. Share your site URL with others
2. Test on multiple devices
3. Consider backend integration for full functionality
4. Set up analytics (Google Analytics)
5. Add SEO meta tags
6. Submit to search engines

---

**Deployment Guide Version**: 1.0  
**Last Updated**: February 2, 2026  
**Tested On**: GitHub Pages, Custom Domain