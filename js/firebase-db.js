// Firebase Database Module (Compat SDK)
// Manages products, cart, and orders for customers

class FirebaseDB {
  constructor() {
    this.db = null;
    this.initialized = false;
  }

  // Initialize database connection
  init() {
    if (typeof firebase !== 'undefined' && firebase.database) {
      this.db = firebase.database();
      this.initialized = true;
      console.log('Firebase Database initialized');
    } else {
      console.error('Firebase not available');
    }
  }

  // Get all active products
  async getProducts() {
    if (!this.initialized) this.init();
    return new Promise((resolve, reject) => {
      this.db.ref('products').orderByChild('status').equalTo('active').once('value', function(snapshot) {
        const products = [];
        snapshot.forEach(function(childSnapshot) {
          products.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        resolve(products);
      }, reject);
    });
  }

  // Get single product by ID
  async getProduct(productId) {
    if (!this.initialized) this.init();
    return new Promise((resolve, reject) => {
      this.db.ref('products/' + productId).once('value', function(snapshot) {
        if (snapshot.exists()) {
          resolve({
            id: snapshot.key,
            ...snapshot.val()
          });
        } else {
          resolve(null);
        }
      }, reject);
    });
  }

  // Get user cart
  async getCart(userId) {
    if (!this.initialized) this.init();
    return new Promise((resolve, reject) => {
      this.db.ref('carts/' + userId).once('value', function(snapshot) {
        const items = [];
        snapshot.forEach(function(childSnapshot) {
          items.push({
            productId: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        resolve(items);
      }, reject);
    });
  }

  // Add item to cart
  async addToCart(userId, productId, quantity) {
    if (!this.initialized) this.init();
    try {
      await this.db.ref('carts/' + userId + '/' + productId).set({
        quantity: quantity,
        addedAt: firebase.database.ServerValue.TIMESTAMP
      });
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  // Update cart item quantity
  async updateCartItem(userId, productId, quantity) {
    if (!this.initialized) this.init();
    try {
      if (quantity <= 0) {
        await this.removeFromCart(userId, productId);
      } else {
        await this.db.ref('carts/' + userId + '/' + productId + '/quantity').set(quantity);
      }
      return true;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  }

  // Remove item from cart
  async removeFromCart(userId, productId) {
    if (!this.initialized) this.init();
    try {
      await this.db.ref('carts/' + userId + '/' + productId).remove();
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  // Clear entire cart
  async clearCart(userId) {
    if (!this.initialized) this.init();
    try {
      await this.db.ref('carts/' + userId).remove();
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }

  // Create order
  async createOrder(userId, orderData) {
    if (!this.initialized) this.init();
    try {
      const ref = this.db.ref('orders').push();
      await ref.set({
        ...orderData,
        userId: userId,
        orderId: ref.key,
        status: 'pending',
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
      
      // Clear cart after order
      await this.clearCart(userId);
      
      return ref.key;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Get user orders
  async getUserOrders(userId) {
    if (!this.initialized) this.init();
    return new Promise((resolve, reject) => {
      this.db.ref('orders').orderByChild('userId').equalTo(userId).once('value', function(snapshot) {
        const orders = [];
        snapshot.forEach(function(childSnapshot) {
          orders.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        // Sort by date descending
        orders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        resolve(orders);
      }, reject);
    });
  }

  // Get single order
  async getOrder(orderId) {
    if (!this.initialized) this.init();
    return new Promise((resolve, reject) => {
      this.db.ref('orders/' + orderId).once('value', function(snapshot) {
        if (snapshot.exists()) {
          resolve({
            id: snapshot.key,
            ...snapshot.val()
          });
        } else {
          resolve(null);
        }
      }, reject);
    });
  }
}

// Create global instance
const firebaseDB = new FirebaseDB();
      await this.db.ref('carts/' + userId + '/' + productId).remove();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  // Clear cart
  async clearCart(userId) {
    try {
      await this.db.ref('carts/' + userId).remove();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }

  // Create order
  async createOrder(userId, orderData) {
    try {
      const ref = this.db.ref('orders').push();
      await ref.set({
        userId: userId,
        ...orderData,
        id: ref.key,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        status: 'pending'
      });
      return ref.key;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Get user orders
  async getUserOrders(userId) {
    return new Promise((resolve, reject) => {
      this.db.ref('orders').orderByChild('userId').equalTo(userId).once('value', function(snapshot) {
        const data = snapshot.val();
        resolve(data || {});
      }, reject);
    });
  }
}

// Initialize database
const firebaseDB = new FirebaseDB();
