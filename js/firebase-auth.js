// Firebase Authentication Module
// Include this script after firebase-config.js and Firebase SDK scripts

// Firebase Auth State
let currentUser = null;

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged(function(user) {
      currentUser = user;
      updateAuthUI();
      if (user) {
        console.log('User logged in:', user.email);
      }
    });
  }
});

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

// Login with email and password
function loginUser(email, password) {
  if (typeof firebase === 'undefined' || !firebase.auth) {
    alert('Firebase not initialized');
    return;
  }
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result) {
      console.log('Login successful:', result.user.email);
      currentUser = result.user;
      updateAuthUI();
      window.location.href = '/account.html';
    })
    .catch(function(error) {
      alert('Login error: ' + error.message);
      console.error('Login error:', error);
    });
}

// Register new user
function registerUser(email, password, confirmPassword) {
  if (typeof firebase === 'undefined' || !firebase.auth) {
    alert('Firebase not initialized');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result) {
      console.log('Registration successful:', result.user.email);
      currentUser = result.user;
      updateAuthUI();
      window.location.href = '/account.html';
    })
    .catch(function(error) {
      alert('Registration error: ' + error.message);
      console.error('Registration error:', error);
    });
}

// Logout user
function logoutUser() {
  if (typeof firebase === 'undefined' || !firebase.auth) {
    return;
  }

  firebase.auth().signOut()
    .then(function() {
      console.log('Logout successful');
      currentUser = null;
      updateAuthUI();
      window.location.href = '/';
    })
    .catch(function(error) {
      alert('Logout error: ' + error.message);
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
