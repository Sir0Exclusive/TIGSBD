// Firebase Admin Module
// Admin-only functions for managing products, orders, and customers

let currentAdmin = null;

// Input validation helpers
const validators = {
  sanitizeString: (str) => String(str).trim().replace(/<[^>]*>/g, ''),
  validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  validatePrice: (price) => !isNaN(price) && parseFloat(price) >= 0,
  validateStock: (stock) => Number.isInteger(Number(stock)) && Number(stock) >= 0,
  validateRequired: (value) => value !== null && value !== undefined && String(value).trim() !== ''
};

// Check admin authentication on page load
document.addEventListener('DOMContentLoaded', function() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        currentAdmin = user;
        checkAdminStatus(user);
      } else {
        window.location.href = '/admin/login.html';
      }
    });
  }
});

// Check if user is admin
async function checkAdminStatus(user) {
  try {
    // Check database for admin flag
    const snapshot = await firebase.database().ref('admins/' + user.uid).once('value');
    const isAdmin = snapshot.val() === true;
    
    if (!isAdmin) {
      showError('Access denied: Admin privileges required');
      await firebase.auth().signOut();
      window.location.href = '/admin/login.html';
      return false;
    }
    
    console.log('Admin verified:', user.email);
    return true;
  } catch (error) {
    console.error('Admin check error:', error);
    showError('Error verifying admin status');
    return false;
  }
}

// Show error message
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50';
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 5000);
}

// Show success message
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50';
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  setTimeout(() => successDiv.remove(), 3000);
}

// Get current admin
function getCurrentAdmin() {
  return currentAdmin;
}

// Logout admin
function logoutAdmin() {
  if (typeof firebase === 'undefined' || !firebase.auth) {
    return;
  }

  firebase.auth().signOut()
    .then(function() {
      console.log('Admin logout successful');
      currentAdmin = null;
      window.location.href = '/admin/login.html';
    })
    .catch(function(error) {
      alert('Logout error: ' + error.message);
      console.error('Logout error:', error);
    });
}

// Get all products
async function getAdminProducts() {
  return new Promise((resolve, reject) => {
    firebase.database().ref('products').once('value', function(snapshot) {
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

// Add product
async function addAdminProduct(productData) {
  try {
    // Validate required fields
    if (!validators.validateRequired(productData.name)) {
      throw new Error('Product name is required');
    }
    if (!validators.validatePrice(productData.price)) {
      throw new Error('Valid price is required');
    }
    if (!validators.validateStock(productData.stock)) {
      throw new Error('Valid stock quantity is required');
    }
    if (!validators.validateRequired(productData.category)) {
      throw new Error('Category is required');
    }
    
    // Sanitize inputs
    const sanitizedData = {
      name: validators.sanitizeString(productData.name),
      description: validators.sanitizeString(productData.description || ''),
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
      category: validators.sanitizeString(productData.category),
      status: productData.status || 'active',
      image: productData.image || '',
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    };
    
    const ref = firebase.database().ref('products').push();
    await ref.set(sanitizedData);
    
    showSuccess('Product added successfully');
    return ref.key;
  } catch (error) {
    console.error('Error adding product:', error);
    showError(error.message || 'Failed to add product');
    throw error;
  }
}

// Update product
async function updateAdminProduct(productId, productData) {
  try {
    if (!productId) {
      throw new Error('Product ID is required');
    }
    
    // Sanitize and validate updated data
    const updates = {};
    if (productData.name) updates.name = validators.sanitizeString(productData.name);
    if (productData.description !== undefined) updates.description = validators.sanitizeString(productData.description);
    if (productData.price !== undefined) {
      if (!validators.validatePrice(productData.price)) throw new Error('Invalid price');
      updates.price = parseFloat(productData.price);
    }
    if (productData.stock !== undefined) {
      if (!validators.validateStock(productData.stock)) throw new Error('Invalid stock');
      updates.stock = parseInt(productData.stock);
    }
    if (productData.category) updates.category = validators.sanitizeString(productData.category);
    if (productData.status) updates.status = productData.status;
    if (productData.image !== undefined) updates.image = productData.image;
    
    updates.updatedAt = firebase.database.ServerValue.TIMESTAMP;
    
    await firebase.database().ref('products/' + productId).update(updates);
    showSuccess('Product updated successfully');
  } catch (error) {
    console.error('Error updating product:', error);
    showError(error.message || 'Failed to update product');
    throw error;
  }
}

// Delete product
async function deleteAdminProduct(productId) {
  try {
    if (!productId) {
      throw new Error('Product ID is required');
    }
    
    await firebase.database().ref('products/' + productId).remove();
    showSuccess('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
    showError('Failed to delete product');
    throw error;
  }
}

// Get all orders
async function getAdminOrders() {
  return new Promise((resolve, reject) => {
    firebase.database().ref('orders').once('value', function(snapshot) {
      const orders = [];
      snapshot.forEach(function(childSnapshot) {
        orders.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      resolve(orders.sort((a, b) => b.createdAt - a.createdAt));
    }, reject);
  });
}

// Get single order
async function getAdminOrder(orderId) {
  return new Promise((resolve, reject) => {
    firebase.database().ref('orders/' + orderId).once('value', function(snapshot) {
      resolve(snapshot.val());
    }, reject);
  });
}

// Update order status
async function updateOrderStatus(orderId, status) {
  try {
    await firebase.database().ref('orders/' + orderId).update({
      status: status,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

// Get all customers
async function getAdminCustomers() {
  return new Promise((resolve, reject) => {
    firebase.database().ref('users').once('value', function(snapshot) {
      const customers = [];
      snapshot.forEach(function(childSnapshot) {
        customers.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      resolve(customers);
    }, reject);
  });
}

// Get customer details
async function getAdminCustomerDetails(userId) {
  return new Promise((resolve, reject) => {
    firebase.database().ref('users/' + userId).once('value', function(snapshot) {
      resolve(snapshot.val());
    }, reject);
  });
}

// Get customer orders
async function getAdminCustomerOrders(userId) {
  return new Promise((resolve, reject) => {
    firebase.database().ref('orders')
      .orderByChild('userId')
      .equalTo(userId)
      .once('value', function(snapshot) {
        const orders = [];
        snapshot.forEach(function(childSnapshot) {
          orders.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        resolve(orders);
      }, reject);
  });
}

// Get dashboard stats
async function getAdminStats() {
  try {
    const orders = await getAdminOrders();
    const customers = await getAdminCustomers();
    const products = await getAdminProducts();
    
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalCustomers = customers.length;
    const totalProducts = products.length;
    
    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      totalCustomers,
      totalProducts
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return {};
  }
}
