# TIGSBD - Static GitHub Pages Export

This is a 100% static, GitHub Pages-ready version of the TIGSBD e-commerce website. No backend required!

## Features

✅ **Fully Static** - No server-side processing needed
✅ **Fast Loading** - Pre-optimized CSS and JS
✅ **Responsive Design** - Works on all devices
✅ **Search Functionality** - Client-side product search
✅ **Professional Design** - Beautiful modern UI
✅ **Easy Deployment** - One-click GitHub Pages setup

## Project Structure

```
github-pages-export/
├── index.html              # Homepage
├── products.html           # Products catalog
├── product.html            # Product detail page
├── assets/
│   ├── app-8813b74f.css   # Main stylesheet
│   └── app-3f22cd7c.js    # JavaScript
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD workflow
├── 404.html               # Custom 404 page
├── CNAME                  # Domain configuration
└── README.md              # This file
```

## How to Deploy to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository named `your-username.github.io`
3. (Optional) If using a custom domain, create a regular repo instead

### Step 2: Push the Files

```bash
cd github-pages-export
git init
git add .
git commit -m "Initial commit: TIGSBD static site"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### Step 3: Configure GitHub Pages

1. Go to your repository settings
2. Navigate to **Settings > Pages**
3. Under "Source", select `main` branch
4. Click **Save**

Your site will be live at: `https://your-username.github.io`

### Step 4: Connect Your Domain (Optional)

1. In **Settings > Pages**, add your domain name
2. Update your domain DNS settings:
   - **CNAME record**: Point to `your-username.github.io`
   - Or use **A records** as per GitHub's documentation

3. Edit the `CNAME` file in the root:
   ```
   yourdomain.com
   ```

4. GitHub will handle the SSL certificate automatically

## Customization

### Update Logo & Branding

Edit the text in all HTML files:
```html
<span class="chrome-logo-text">
    <span class="main-text">TIGS</span>
    <span class="sub-text">BD</span>
</span>
```

### Update Products

Edit `products.html` - modify the products array:
```javascript
const products = [
    { id: 1, name: 'Your Product', price: 1000, discount: 10, category: 'Category' },
    // Add more products
];
```

### Update Links & Navigation

Search and replace in all HTML files:
- Contact email
- Phone number
- Social media links
- Footer links

### Customize Colors

The site uses Tailwind CSS classes. Update color classes:
- `from-amber-400` → Your primary color
- `from-primary-600` → Your secondary color
- Modify the gradient backgrounds as needed

## Features Included

✨ **Homepage**
- Hero section with search
- Category showcase
- Featured products carousel
- Responsive layout

🛍️ **Products Page**
- Grid layout
- Live search/filter
- Product cards with discount badges
- Add to cart buttons

📱 **Product Details**
- Full product information
- Specifications section
- Reviews section
- Similar products

## Notes

⚠️ **Important:**
- This is a **static site** - features like cart, checkout, and login are not functional
- All product data is hardcoded in JavaScript - for dynamic content, consider using a headless CMS or API
- Images are placeholder - replace with actual product images in `images/` folder

## Converting to Dynamic

To add backend functionality:

1. **Option A: Headless CMS** - Use Strapi, Contentful, or Sanity
2. **Option B: API** - Connect to your Laravel API (e.g., `api.yoursite.com`)
3. **Option C: JAMstack** - Use Netlify Functions or AWS Lambda

## Performance Tips

- ✅ CSS and JS are already minified
- ✅ Images should be compressed (use TinyPNG)
- ✅ Use Lazy loading for images if you have many
- ✅ Leverage browser caching with proper headers

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers

## Need Help?

### GitHub Pages Documentation
https://docs.github.com/en/pages

### Troubleshooting
- Clear browser cache (Ctrl+Shift+Delete)
- Check GitHub Actions for build errors
- Verify CNAME file exists in root
- Ensure index.html is in the root directory

## License

© 2026 TIGSBD. All rights reserved.

## Quick Commands

```bash
# Deploy updates
git add .
git commit -m "Update content"
git push origin main

# Local testing (if you have a local server)
python -m http.server 8000
# Visit: http://localhost:8000

# Update CSS (if modifying Tailwind)
npm run build
```

---

**Last Updated:** February 2, 2026
**Version:** 1.0.0
