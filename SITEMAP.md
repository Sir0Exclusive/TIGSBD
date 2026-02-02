# 🗺️ TIGS BD Site Map

Complete navigation structure for GitHub Pages deployment.

## 🏠 Main Entry Point

```
index.html (Landing Page)
    ↓
    Redirects to → home-landing.html
```

## 👥 Customer-Facing Pages (29 pages)

### 🔐 Authentication Flow
```
login.html ────────────→ dashboard.html
    ↓
forgot-password.html ──→ reset-requested.html
    ↓
new-password.html
    
register.html ─────────→ home-landing.html
```

### 🛍️ Shopping Flow
```
home-landing.html
    ↓
    ├─→ products.html / products-list.html (with filters)
    │       ↓
    │   product.html / product-detail.html
    │       ↓
    │   cart.html
    │       ↓
    │   checkout.html
    │       ↓
    │   order.html (confirmation)
    │       ↓
    │   receipt.html (printable)
    │
    ├─→ sarongo.html (special collection)
    │       ↓
    │   sarongo_product.html
    │
    └─→ wishlist.html / wishlist-enhanced.html
```

### 📊 Customer Dashboard
```
dashboard.html (overview)
    ├─→ dashboard-profile.html
    ├─→ dashboard-orders.html
    ├─→ dashboard-addresses.html
    └─→ dashboard-wishlist.html
```

### 📍 Address Management
```
addresses.html (list all addresses)
    ├─→ address-create.html
    └─→ address-edit.html
```

### 🔁 Password Reset
```
reset_password.html (alternative reset page)
forgot-password.html (main reset)
reset-requested.html (confirmation)
```

---

## 🔧 Admin Panel (38 pages)

### 🔐 Admin Entry
```
admin/login.html ────→ admin/dashboard.html
```

### 📦 Product Management
```
admin/products.html (list)
    ├─→ admin/create-product.html
    ├─→ admin/edit-product.html
    ├─→ admin/low-stock.html
    └─→ admin/categories.html
            ├─→ admin/category-create.html
            └─→ admin/category-edit.html
```

### 🛒 Order Management
```
admin/orders.html (list)
    └─→ admin/order-details.html
```

### 👤 Customer Management
```
admin/customers.html (list)
    └─→ admin/customer-details.html
```

### 🟧 Sarongo Collection
```
admin/sarongo.html (products)
    ├─→ admin/sarongo-create.html
    ├─→ admin/sarongo-edit.html
    ├─→ admin/sarongo-banners.html
    └─→ admin/sarongo-categories.html
            ├─→ admin/sarongo-category-create.html
            └─→ admin/sarongo-category-edit.html
```

### 🎟️ Promotions & Discounts
```
admin/coupons.html
    ├─→ admin/coupon-create.html
    └─→ admin/coupon-edit.html

admin/banners.html
```

### ⭐ Customer Engagement
```
admin/reviews.html

admin/loyalty.html
    └─→ admin/loyalty-customer.html

admin/returns.html
    └─→ admin/return-details.html
```

### 💳 Financial
```
admin/payments.html
```

### 🔧 System Management
```
admin/settings.html

admin/policies.html
    └─→ admin/policy-edit.html

admin/activity-logs.html

admin/restock-requests.html

admin/password-resets.html
    └─→ admin/password-reset-details.html

admin/email-generator.html (AI tool)
```

---

## 📊 Page Count Summary

| Section | Pages | Description |
|---------|-------|-------------|
| **Customer Auth** | 5 | Login, register, password reset |
| **Shopping** | 9 | Products, cart, checkout |
| **Sarongo** | 2 | Special collection pages |
| **Customer Dashboard** | 5 | Profile, orders, addresses |
| **Address CRUD** | 3 | Create, read, edit addresses |
| **Wishlist** | 2 | Regular & enhanced versions |
| **Misc Customer** | 3 | Landing, reset, receipt |
| **Admin Core** | 8 | Dashboard, products, orders, customers |
| **Admin Categories** | 3 | Category management |
| **Admin Coupons** | 3 | Coupon management |
| **Admin Sarongo** | 7 | Sarongo products & banners |
| **Admin Returns** | 2 | Return management |
| **Admin Reviews** | 1 | Review moderation |
| **Admin Policies** | 2 | Terms & policies |
| **Admin Loyalty** | 2 | Loyalty program |
| **Admin Resets** | 2 | Password reset approval |
| **Admin Payments** | 1 | Payment transactions |
| **Admin Banners** | 1 | Homepage banners |
| **Admin Inventory** | 4 | Stock, restock, logs, email AI |
| **Admin Settings** | 1 | System configuration |
| **TOTAL** | **67** | Complete static site |

---

## 🎨 Page Design Patterns

### Navigation Structure
```
All Customer Pages:
    ├─ Top Banner (amber gradient)
    ├─ Main Navigation (dark slate)
    ├─ Content Area (white cards)
    └─ Footer (dark slate)

All Admin Pages:
    ├─ Sidebar Navigation (collapsible)
    ├─ Top Header (white with notifications)
    └─ Content Area (white with charts/tables)
```

### Color Schemes
```
Customer Pages: Amber/Gold Gradient
    Primary: #fbbf24 → #f59e0b → #d97706
    Dark: #0f172a, #1e293b
    
Admin Pages: Slate Dark + Amber Accents
    Sidebar: #0f172a → #1e293b
    Accent: Amber badges & buttons
```

---

## 🔗 Navigation Links

### Customer Header Menu
- Home
- Products
- Sarongo Collection
- Cart
- Dashboard
- Login/Register

### Admin Sidebar Menu
- Dashboard
- Products
- Sarongo 🔴
- Banners
- Orders 🔴3
- Restock Requests 🟠5
- Password Resets 🟡2
- Customers
- Reviews ⭐
- Returns 📤
- Payments 💳
- Loyalty 🎁
- Coupons
- Categories
- Activity Logs
- Email Generator
- Policies
- Settings
- Logout

---

## 📱 Responsive Breakpoints

```
Mobile:    < 768px  (1 column layout)
Tablet:    768-1024px (2 column layout)
Desktop:   > 1024px (3-4 column layout)
```

All pages tested and optimized for all breakpoints!

---

## 🚀 Deployment Paths

### GitHub Pages (Default)
```
Base URL: https://YOUR_USERNAME.github.io/tigsbd/
Customer: /home-landing.html
Admin:    /admin/login.html
```

### Custom Domain
```
Base URL: https://www.tigsbd.com/
Customer: /home-landing.html
Admin:    /admin/login.html
```

---

**Site Map Version**: 1.0  
**Last Updated**: February 2, 2026  
**Total Pages**: 67 (29 customer + 38 admin)