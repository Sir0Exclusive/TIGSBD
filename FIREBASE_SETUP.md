# Firebase Setup Guide

## Quick Start

Your Firebase integration is now live at **www.tigsbd.com**. Follow these steps to complete the setup:

## 1. Set Firebase Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/project/tigsbd-9a4b1)
2. Click **Realtime Database** → **Rules** tab
3. Replace the existing rules with this:

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": false,
      ".indexOn": ["category", "status"]
    },
    "carts": {
      "$uid": {
        ".read": "auth.uid === $uid",
        ".write": "auth.uid === $uid",
        ".validate": "newData.hasChildren(['quantity']) || newData.val() === null"
      }
    },
    "orders": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$orderId": {
        ".validate": "newData.hasChildren(['userId', 'items', 'total', 'createdAt'])",
        "userId": {
          ".validate": "newData.val() === auth.uid"
        },
        "status": {
          ".validate": "newData.val() in ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']"
        }
      }
    },
    "users": {
      "$uid": {
        ".read": "auth.uid === $uid",
        ".write": "auth.uid === $uid",
        "email": {
          ".validate": "newData.val() === auth.token.email"
        }
      }
    },
    "loyaltyPoints": {
      "$uid": {
        ".read": "auth.uid === $uid",
        ".write": false,
        "points": {
          ".validate": "newData.isNumber()"
        }
      }
    }
  }
}
```

4. Click **Publish**

## 2. Enable Email/Password Authentication

1. Go to **Authentication** → **Sign-in method**
2. Click **Email/Password**
3. Toggle **Enable** on
4. Click **Save**

## 3. Test the Website

- Visit **https://www.tigsbd.com**
- Click **Login** to test existing users
- Click **Register** to create a new account
- After login, you'll see the **Account Dashboard**

## 4. Files Created

### Frontend Files:
- `js/firebase-config.js` - Firebase configuration
- `js/firebase-auth.js` - Authentication module
- `js/firebase-db.js` - Database operations module
- `login.html` - Updated with Firebase login form
- `register.html` - Updated with Firebase register form
- `account.html` - New user account dashboard
- `firebase-rules.json` - Security rules (for reference)

### Database Structure:

```
/products
  /{productId}
    /id
    /name
    /price
    /category
    /description
    /image
    /stock
    /status

/carts
  /{userId}
    /{productId}
      /quantity
      /addedAt

/orders
  /{orderId}
    /userId
    /items
    /total
    /status (pending|confirmed|shipped|delivered|cancelled)
    /createdAt

/users
  /{userId}
    /email
    /profile

/loyaltyPoints
  /{userId}
    /points
```

## 5. Next Steps

### Add Products to Database:
1. Go to Firebase Console → Realtime Database → Data
2. Click **+** next to "products"
3. Add a new product:

```json
{
  "id": "product-1",
  "name": "Premium Sarong",
  "price": 1500,
  "category": "sarong",
  "description": "Traditional premium quality sarong",
  "stock": 100,
  "status": "active"
}
```

### Admin Panel (Coming Soon):
- Create admin.html for adding/managing products
- Only allow admins to edit products and orders

## 6. Firebase Free Tier Limits

- **Read/Write Operations**: 100 concurrent connections
- **Storage**: 1 GB
- **Database**: 100 MB
- For production, consider upgrading to **Blaze Plan** (pay-as-you-go)

## 7. Troubleshooting

### Issue: Can't create account
- Check email/password are valid
- Ensure Email authentication is enabled in Firebase Console

### Issue: Cart not saving
- Check browser console for errors
- Verify security rules are correct
- Check user is authenticated

### Issue: Products not loading
- Add products to `/products` in Firebase Console
- Check database rules allow `.read: true`

## Contact & Support

For issues, contact: **arfibd2003@gmail.com**

Live Website: **https://www.tigsbd.com**
GitHub Repo: **https://github.com/Sir0Exclusive/TIGSBD**
