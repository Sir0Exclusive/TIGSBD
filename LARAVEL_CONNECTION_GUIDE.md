# Laravel Backend Connection Guide

## Setup Complete ✅

Your static GitHub Pages website is now configured to connect with your Laravel backend!

## Current Setup

- **Frontend**: https://www.tigsbd.com (GitHub Pages)
- **Backend**: Laravel (d:\TIGS BD)
- **Public Login**: /login.html → Laravel `/customer/login`
- **Admin Login**: /admin/login.html → Laravel `/admin/login`

## Start Laravel Backend

### Option 1: Local Development (http://localhost:8000)

```bash
cd "d:\TIGS BD"
php artisan serve
```

Then update API URL in both files:
- `js/laravel-api.js` → Line 4: `const API_BASE_URL = 'http://localhost:8000';`
- `js/laravel-admin-api.js` → Line 4: `const ADMIN_API_BASE_URL = 'http://localhost:8000';`

### Option 2: Ngrok Tunnel (Public Access)

1. Start Laravel:
```bash
cd "d:\TIGS BD"
php artisan serve
```

2. In another terminal, start ngrok:
```bash
ngrok http 8000
```

3. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)

4. Update API URLs in:
   - `d:\TIGS BD\github-pages-export\js\laravel-api.js`
   - `d:\TIGS BD\github-pages-export\js\laravel-admin-api.js`

```javascript
const API_BASE_URL = 'https://abc123.ngrok.io'; // Your ngrok URL
```

5. Commit and push:
```bash
cd "d:\TIGS BD\github-pages-export"
git add .
git commit -m "Update API URLs to ngrok"
git push origin main
```

## Enable CORS in Laravel

Add to `config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie', 'customer/*', 'admin/*'],
'allowed_origins' => ['https://www.tigsbd.com', 'http://localhost:*'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

## API Endpoints Required

The frontend expects these Laravel endpoints:

### Public Customer APIs:
- `POST /customer/login` - Login
- `POST /customer/register` - Register
- `POST /customer/logout` - Logout
- `GET /api/products` - Get all products
- `GET /product/{id}` - Get single product
- `GET /api/search?q={query}` - Search products
- `POST /cart/add/{id}` - Add to cart
- `GET /cart` - Get cart items
- `POST /cart/remove/{id}` - Remove from cart
- `POST /checkout` - Create order
- `GET /customer/dashboard/orders` - Get user orders

### Admin APIs:
- `POST /admin/login` - Admin login
- `GET /admin/dashboard/stats` - Dashboard stats
- `GET /admin/products` - Get all products
- `POST /admin/products` - Create product
- `PUT /admin/products/{id}` - Update product
- `DELETE /admin/products/{id}` - Delete product
- `GET /admin/orders` - Get all orders
- `GET /admin/orders/{id}` - Get single order
- `PUT /admin/orders/{id}/status` - Update order status
- `GET /admin/customers` - Get all customers
- `GET /admin/customers/{id}` - Get customer details
- `GET /admin/customers/{id}/orders` - Get customer orders

## Testing

1. Start Laravel backend
2. Visit https://www.tigsbd.com
3. Click "Register" to create account
4. Login with credentials
5. Test adding products to cart
6. For admin: https://www.tigsbd.com/admin/login.html

## Files Created

- **js/laravel-api.js** - Customer API integration (products, cart, orders)
- **js/laravel-admin-api.js** - Admin API integration (dashboard, products, orders)
- **login.html** - Uses Laravel customer authentication
- **register.html** - Uses Laravel customer registration
- **admin/login.html** - Uses Laravel admin authentication
- **admin/dashboard.html** - Connected to Laravel stats API
- **admin/products.html** - Connected to Laravel products API

## Next Steps

1. Start your Laravel backend (locally or with ngrok)
2. Update API URLs in JS files with your backend URL
3. Test customer registration and login
4. Test admin login
5. Deploy to production server when ready

Your website is now fully connected to Laravel! 🎉
