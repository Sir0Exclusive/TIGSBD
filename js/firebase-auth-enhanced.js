// Enhanced Firebase Auth with error handling and loading states
// Updated version with better security and UX

let currentUser = null;
let isLoading = false;

// Initialize Firebase and setup auth listener
document.addEventListener('DOMContentLoaded', function() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged(function(user) {
      currentUser = user;
      updateAuthUI();
      if (user) {
        console.log('User logged in:', user.email);
        loadUserData(user.uid);
      }
    });
  }
});

// Show loading indicator
function showLoading(buttonId) {
  isLoading = true;
  const btn = document.getElementById(buttonId);
  if (btn) {
    btn.disabled = true;
    btn.dataset.originalText = btn.textContent;
    btn.innerHTML = '<span class="loading-spinner inline-block"></span> Loading...';
  }
}

// Hide loading indicator
function hideLoading(buttonId) {
  isLoading = false;
  const btn = document.getElementById(buttonId);
  if (btn && btn.dataset.originalText) {
    btn.disabled = false;
    btn.textContent = btn.dataset.originalText;
  }
}

// Show error message
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'fixed top-4 right-4 left-4 md:left-auto md:w-96 bg-red-50 border-l-4 border-red-500 text-red-900 p-4 rounded-lg shadow-lg z-50 animate-slide-in';
  errorDiv.innerHTML = `
    <div class="flex items-start">
      <svg class="w-5 h-5 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
      <div class="flex-1">
        <p class="font-medium">Error</p>
        <p class="text-sm mt-1">${escapeHtml(message)}</p>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-red-500 hover:text-red-700">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>
  `;
  document.body.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 5000);
}

// Show success message
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'fixed top-4 right-4 left-4 md:left-auto md:w-96 bg-green-50 border-l-4 border-green-500 text-green-900 p-4 rounded-lg shadow-lg z-50 animate-slide-in';
  successDiv.innerHTML = `
    <div class="flex items-start">
      <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <div class="flex-1">
        <p class="font-medium">Success</p>
        <p class="text-sm mt-1">${escapeHtml(message)}</p>
      </div>
    </div>
  `;
  document.body.appendChild(successDiv);
  setTimeout(() => successDiv.remove(), 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
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

// Input validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password && password.length >= 6;
}

function validatePhone(phone) {
  const re = /^01[3-9]\d{8}$/; // Bangladesh phone format
  return re.test(phone);
}

// Login with email and password
function loginUser(email, password, callback) {
  if (!validateEmail(email)) {
    showError('Please enter a valid email address');
    if (callback) callback(new Error('Invalid email'));
    return;
  }

  if (!validatePassword(password)) {
    showError('Password must be at least 6 characters');
    if (callback) callback(new Error('Invalid password'));
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      console.log('Login successful:', userCredential.user.email);
      currentUser = userCredential.user;
      updateAuthUI();
      showSuccess('Welcome back!');
      if (callback) callback(null, userCredential.user);
      else setTimeout(() => window.location.href = 'account.html', 1000);
    })
    .catch(function(error) {
      console.error('Login error:', error);
      let message = 'Login failed. Please try again.';
      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      } else if (error.code === 'auth/user-disabled') {
        message = 'This account has been disabled';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Too many failed attempts. Try again later';
      }
      showError(message);
      if (callback) callback(error);
    });
}

// Register new user with user data
function registerUser(name, email, phone, password, confirmPassword, callback) {
  // Validate inputs
  if (!name || name.trim().length < 2) {
    showError('Name must be at least 2 characters');
    if (callback) callback(new Error('Invalid name'));
    return;
  }

  if (!validateEmail(email)) {
    showError('Please enter a valid email address');
    if (callback) callback(new Error('Invalid email'));
    return;
  }

  if (!validatePhone(phone)) {
    showError('Please enter a valid Bangladesh phone number (01XXXXXXXXX)');
    if (callback) callback(new Error('Invalid phone'));
    return;
  }

  if (!validatePassword(password)) {
    showError('Password must be at least 6 characters');
    if (callback) callback(new Error('Invalid password'));
    return;
  }

  if (password !== confirmPassword) {
    showError('Passwords do not match');
    if (callback) callback(new Error('Passwords do not match'));
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      currentUser = userCredential.user;
      // Save user data to database
      return firebase.database().ref('users/' + userCredential.user.uid).set({
        name: escapeHtml(name.trim()),
        email: email,
        phone: phone,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        role: 'customer'
      });
    })
    .then(function() {
      console.log('Registration successful');
      updateAuthUI();
      showSuccess('Account created successfully!');
      if (callback) callback(null, currentUser);
      else setTimeout(() => window.location.href = 'account.html', 1000);
    })
    .catch(function(error) {
      console.error('Registration error:', error);
      let message = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already registered';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak. Use at least 6 characters';
      }
      showError(message);
      if (callback) callback(error);
    });
}

// Logout user
function logoutUser() {
  if (!firebase || !firebase.auth) return;

  firebase.auth().signOut()
    .then(function() {
      console.log('Logout successful');
      currentUser = null;
      updateAuthUI();
      showSuccess('Logged out successfully');
      setTimeout(() => window.location.href = 'index.html', 1000);
    })
    .catch(function(error) {
      showError('Logout failed: ' + error.message);
      console.error('Logout error:', error);
    });
}

// Get current user
function getCurrentUser() {
  return currentUser;
}

// Check if user is authenticated
function isUserAuthenticated() {
  return currentUser !== null;
}

// Load user data from database
function loadUserData(userId) {
  firebase.database().ref('users/' + userId).once('value')
    .then(function(snapshot) {
      const userData = snapshot.val();
      if (userData) {
        console.log('User data loaded:', userData);
        // Store in session for quick access
        sessionStorage.setItem('userData', JSON.stringify(userData));
      }
    })
    .catch(function(error) {
      console.error('Error loading user data:', error);
    });
}

// Get user data from session or database
async function getUserData(userId) {
  // Try session first
  const cached = sessionStorage.getItem('userData');
  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch from database
  try {
    const snapshot = await firebase.database().ref('users/' + userId).once('value');
    const userData = snapshot.val();
    if (userData) {
      sessionStorage.setItem('userData', JSON.stringify(userData));
    }
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}
