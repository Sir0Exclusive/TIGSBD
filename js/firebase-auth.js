// Firebase Authentication Module (Compat SDK)
// Include this script after firebase-config.js and Firebase compat SDK scripts

// Firebase Auth State
let currentUser = null;

// Initialize Firebase and setup auth listener
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
function loginUser(email, password, callback) {
  if (typeof firebase === 'undefined' || !firebase.auth) {
    alert('Firebase not initialized');
    return;
  }
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      console.log('Login successful:', userCredential.user.email);
      currentUser = userCredential.user;
      updateAuthUI();
      if (callback) callback(null, userCredential.user);
      else window.location.href = 'account.html';
    })
    .catch(function(error) {
      console.error('Login error:', error);
      if (callback) callback(error);
      else alert('Login error: ' + error.message);
    });
}

// Register new user with user data
function registerUser(name, email, phone, password, confirmPassword, callback) {
  if (typeof firebase === 'undefined' || !firebase.auth) {
    alert('Firebase not initialized');
    return;
  }

  if (password !== confirmPassword) {
    const error = new Error('Passwords do not match');
    if (callback) callback(error);
    else alert(error.message);
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      currentUser = userCredential.user;
      // Save user data to database
      return firebase.database().ref('users/' + userCredential.user.uid).set({
        name: name,
        email: email,
        phone: phone,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        role: 'customer'
      });
    })
    .then(function() {
      console.log('Registration successful');
      updateAuthUI();
      if (callback) callback(null, currentUser);
      else window.location.href = 'account.html';
    })
    .catch(function(error) {
      console.error('Registration error:', error);
      if (callback) callback(error);
      else alert('Registration error: ' + error.message);
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
      window.location.href = 'index.html';
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

// Get user data from database
function getUserData(userId, callback) {
  firebase.database().ref('users/' + userId).once('value')
    .then(function(snapshot) {
      callback(null, snapshot.val());
    })
    .catch(function(error) {
      callback(error);
    });
}
