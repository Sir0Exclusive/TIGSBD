// Laravel Backend API Integration
// Replace Firebase with Laravel Backend API calls

// API Base URL - Update this with your Laravel backend URL
const API_BASE_URL = 'http://localhost:8000'; // Change to your ngrok URL or production URL

// Authentication state
let currentUser = null;
let authToken = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});

// Check if user is authenticated
function checkAuthStatus() {
    authToken = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (authToken && userData) {
        currentUser = JSON.parse(userData);
        updateAuthUI();
    }
}

// Update UI based on auth state
function updateAuthUI() {
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const accountLink = document.getElementById('account-link');
    const logoutBtn = document.getElementById('logout-btn');

    if (currentUser) {
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (accountLink) accountLink.style.display = 'inline';
        if (logoutBtn) logoutBtn.style.display = 'inline';
    } else {
        if (loginLink) loginLink.style.display = 'inline';
        if (registerLink) registerLink.style.display = 'inline';
        if (accountLink) accountLink.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

// Make API request with authentication
async function apiRequest(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    
    if (authToken) {
        defaultOptions.headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, finalOptions);
    
    if (response.status === 401) {
        // Token expired or invalid
        logout();
        throw new Error('Authentication expired. Please login again.');
    }
    
    return response;
}

// Login with email and password
async function loginUser(email, password) {
    try {
        const response = await apiRequest('/customer/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            
            localStorage.setItem('auth_token', authToken);
            localStorage.setItem('user_data', JSON.stringify(currentUser));
            
            updateAuthUI();
            window.location.href = '/account.html';
        } else {
            alert('Login error: ' + (data.message || 'Invalid credentials'));
        }
    } catch (error) {
        alert('Login error: ' + error.message);
        console.error('Login error:', error);
    }
}

// Register new user
async function registerUser(name, email, phone, password, confirmPassword) {
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    try {
        const response = await apiRequest('/customer/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, phone, password, password_confirmation: confirmPassword })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            
            localStorage.setItem('auth_token', authToken);
            localStorage.setItem('user_data', JSON.stringify(currentUser));
            
            updateAuthUI();
            window.location.href = '/account.html';
        } else {
            alert('Registration error: ' + (data.message || 'Registration failed'));
        }
    } catch (error) {
        alert('Registration error: ' + error.message);
        console.error('Registration error:', error);
    }
}

// Logout user
function logoutUser() {
    authToken = null;
    currentUser = null;
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    updateAuthUI();
    window.location.href = '/';
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Check if user is authenticated
function isUserAuthenticated() {
    return currentUser !== null && authToken !== null;
}

// Get all products
async function getProducts() {
    try {
        const response = await apiRequest('/api/products');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Get single product
async function getProduct(productId) {
    try {
        const response = await apiRequest(`/product/${productId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Search products
async function searchProducts(query) {
    try {
        const response = await apiRequest(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching products:', error);
        return [];
    }
}

// Add to cart
async function addToCart(productId, quantity = 1) {
    if (!isUserAuthenticated()) {
        alert('Please login to add items to cart');
        window.location.href = '/login.html';
        return;
    }
    
    try {
        const response = await apiRequest(`/cart/add/${productId}`, {
            method: 'POST',
            body: JSON.stringify({ quantity })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Product added to cart!');
            return data;
        } else {
            alert('Error: ' + (data.message || 'Failed to add to cart'));
        }
    } catch (error) {
        alert('Error adding to cart: ' + error.message);
        console.error('Error:', error);
    }
}

// Get cart items
async function getCart() {
    if (!isUserAuthenticated()) {
        return [];
    }
    
    try {
        const response = await apiRequest('/cart');
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
}

// Remove from cart
async function removeFromCart(productId) {
    try {
        const response = await apiRequest(`/cart/remove/${productId}`, {
            method: 'POST'
        });
        
        if (response.ok) {
            alert('Item removed from cart');
            return true;
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
        return false;
    }
}

// Create order
async function createOrder(orderData) {
    try {
        const response = await apiRequest('/checkout', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Failed to create order');
        }
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

// Get user orders
async function getUserOrders() {
    if (!isUserAuthenticated()) {
        return [];
    }
    
    try {
        const response = await apiRequest('/customer/dashboard/orders');
        const data = await response.json();
        return data.orders || [];
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}
