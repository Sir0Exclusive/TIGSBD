// Firebase Admin Module
// Admin-only functions for managing products, orders, and customers

let currentAdmin = null;

// Allowed admin emails (leave empty to allow any authenticated user)
const ADMIN_EMAIL_WHITELIST = ['NOG6DcJ7OnZa8BDXGiH4GXeR8nI2@tigsbd.com'];

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
function checkAdminStatus(user) {
  if (ADMIN_EMAIL_WHITELIST.length > 0 && !ADMIN_EMAIL_WHITELIST.includes(user.email)) {
    alert('Access denied: Admin only');
    firebase.auth().signOut();
    return;
  }

  console.log('Admin logged in:', user.email);
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
    const ref = firebase.database().ref('products').push();
    await ref.set({
      ...productData,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    });
    return ref.key;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

// Update product
async function updateAdminProduct(productId, productData) {
  try {
    await firebase.database().ref('products/' + productId).update({
      ...productData,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

// Delete product
async function deleteAdminProduct(productId) {
  try {
    await firebase.database().ref('products/' + productId).remove();
  } catch (error) {
    console.error('Error deleting product:', error);
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
