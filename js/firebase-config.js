// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNSh-1AcxmgrQ88xjI699szU8VM6u0_pA",
  authDomain: "tigsbd-9a4b1.firebaseapp.com",
  databaseURL: "https://tigsbd-9a4b1-default-rtdb.firebaseio.com",
  projectId: "tigsbd-9a4b1",
  storageBucket: "tigsbd-9a4b1.firebasestorage.app",
  messagingSenderId: "719135875143",
  appId: "1:719135875143:web:0e3ccdfc93e73ac3d89162",
  measurementId: "G-2Q0NHSG4JM"
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = firebaseConfig;
}
