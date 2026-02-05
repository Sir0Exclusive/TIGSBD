// Laravel Admin API Integration

// Admin API Base URL
const ADMIN_API_BASE_URL = 'http://localhost:8000'; // Change to your ngrok URL or production URL

let currentAdmin = null;
let adminToken = null;

// Initialize admin auth
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();
});

function checkAdminAuth() {
    adminToken = localStorage.getItem('admin_token');
    const adminData = localStorage.getItem('admin_data');
    
    if (adminToken && adminData) {
        currentAdmin = JSON.parse(adminData);
    } else {
        // Redirect to admin login if not on login page
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = '/admin/login.html';
        }
    }
}

// Make admin API request
async function adminApiRequest(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    
    if (adminToken) {
        defaultOptions.headers['Authorization'] = `Bearer ${adminToken}`;
    }
    
    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    
    const response = await fetch(`${ADMIN_API_BASE_URL}${endpoint}`, finalOptions);
    
    if (response.status === 401) {
        logoutAdmin();
        throw new Error('Authentication expired. Please login again.');
    }
    
    return response;
}

// Admin login
async function loginAdmin(email, password) {
    try {
        const response = await fetch(`${ADMIN_API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            adminToken = data.token;
            currentAdmin = data.admin;
            
            localStorage.setItem('admin_token', adminToken);
            localStorage.setItem('admin_data', JSON.stringify(currentAdmin));
            
            window.location.href = '/admin/dashboard.html';
        } else {
            alert('Login error: ' + (data.message || 'Invalid credentials'));
        }
    } catch (error) {
        alert('Login error: ' + error.message);
        console.error('Login error:', error);
    }
}

// Admin logout
function logoutAdmin() {
    adminToken = null;
    currentAdmin = null;
    
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    
    window.location.href = '/admin/login.html';
}

// Get current admin
function getCurrentAdmin() {
    return currentAdmin;
}

// Get all products (admin)
async function getAdminProducts() {
    try {
        const response = await adminApiRequest('/admin/products');
        const data = await response.json();
        return data.products || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Add product (admin)
async function addAdminProduct(productData) {
    try {
        const response = await adminApiRequest('/admin/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return data.product;
        } else {
            throw new Error(data.message || 'Failed to add product');
        }
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

// Update product (admin)
async function updateAdminProduct(productId, productData) {
    try {
        const response = await adminApiRequest(`/admin/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return data.product;
        } else {
            throw new Error(data.message || 'Failed to update product');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

// Delete product (admin)
async function deleteAdminProduct(productId) {
    try {
        const response = await adminApiRequest(`/admin/products/${productId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            return true;
        } else {
            throw new Error('Failed to delete product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

// Get all orders (admin)
async function getAdminOrders() {
    try {
        const response = await adminApiRequest('/admin/orders');
        const data = await response.json();
        return data.orders || [];
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

// Get single order (admin)
async function getAdminOrder(orderId) {
    try {
        const response = await adminApiRequest(`/admin/orders/${orderId}`);
        const data = await response.json();
        return data.order || null;
    } catch (error) {
        console.error('Error fetching order:', error);
        return null;
    }
}

// Update order status (admin)
async function updateOrderStatus(orderId, status) {
    try {
        const response = await adminApiRequest(`/admin/orders/${orderId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return data.order;
        } else {
            throw new Error(data.message || 'Failed to update order status');
        }
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
}

// Get all customers (admin)
async function getAdminCustomers() {
    try {
        const response = await adminApiRequest('/admin/customers');
        const data = await response.json();
        return data.customers || [];
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
}

// Get customer details (admin)
async function getAdminCustomerDetails(userId) {
    try {
        const response = await adminApiRequest(`/admin/customers/${userId}`);
        const data = await response.json();
        return data.customer || null;
    } catch (error) {
        console.error('Error fetching customer details:', error);
        return null;
    }
}

// Get customer orders (admin)
async function getAdminCustomerOrders(userId) {
    try {
        const response = await adminApiRequest(`/admin/customers/${userId}/orders`);
        const data = await response.json();
        return data.orders || [];
    } catch (error) {
        console.error('Error fetching customer orders:', error);
        return [];
    }
}

// Get dashboard stats (admin)
async function getAdminStats() {
    try {
        const response = await adminApiRequest('/admin/dashboard/stats');
        const data = await response.json();
        return data.stats || {};
    } catch (error) {
        console.error('Error fetching stats:', error);
        return {};
    }
}
