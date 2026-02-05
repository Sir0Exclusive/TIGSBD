// Firebase Database Module
// Manages products, cart, and orders

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
    }
  }

  // Get all products
  async getProducts() {
    return new Promise((resolve, reject) => {
      this.db.ref('products').once('value', function(snapshot) {
        const data = snapshot.val();
        resolve(data || {});
      }, reject);
    });
  }

  // Get single product by ID
  async getProduct(productId) {
    return new Promise((resolve, reject) => {
      this.db.ref('products/' + productId).once('value', function(snapshot) {
        const data = snapshot.val();
        resolve(data || null);
      }, reject);
    });
  }

  // Add product (admin only)
  async addProduct(productData) {
    try {
      const ref = this.db.ref('products').push();
      await ref.set({
        ...productData,
        id: ref.key,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
      return ref.key;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  // Update product (admin only)
  async updateProduct(productId, productData) {
    try {
      await this.db.ref('products/' + productId).update(productData);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  // Delete product (admin only)
  async deleteProduct(productId) {
    try {
      await this.db.ref('products/' + productId).remove();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Get user cart
  async getCart(userId) {
    return new Promise((resolve, reject) => {
      this.db.ref('carts/' + userId).once('value', function(snapshot) {
        const data = snapshot.val();
        resolve(data || {});
      }, reject);
    });
  }

  // Add item to cart
  async addToCart(userId, productId, quantity) {
    try {
      await this.db.ref('carts/' + userId + '/' + productId).set({
        quantity: quantity,
        addedAt: firebase.database.ServerValue.TIMESTAMP
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  // Remove item from cart
  async removeFromCart(userId, productId) {
    try {
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
