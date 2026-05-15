// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
// Optional: If you need Firestore later, import it here
// import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// TODO: Replace with your app's actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHpInezkpkR-5ipzKK6FriGt1v2SeH2W4",
  authDomain: "easymail-5219f.firebaseapp.com",
  projectId: "easymail-5219f",
  storageBucket: "easymail-5219f.firebasestorage.app",
  messagingSenderId: "482816926946",
  appId: "1:482816926946:web:4963439d2a853a9cf72abb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app); // For saving user details to Firestore later

// UI Elements
const signupForm = document.getElementById('signupForm');
const submitBtn = document.getElementById('submitBtn');
const errorMessage = document.getElementById('errorMessage');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop the page from reloading

    // Get input values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Loading State
    submitBtn.textContent = 'CREATING ACCOUNT...';
    submitBtn.disabled = true;
    errorMessage.style.display = 'none';

    try {
      // 1. Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update the user's display name
      await updateProfile(user, {
        displayName: fullName
      });

      // (Optional) 3. Save additional details to Firestore Database here

      // Success! Redirect to login or dashboard
      alert('Account created successfully! Welcome ' + fullName);
      window.location.href = 'dashboard.html'; // Or 'dashboard.html'

    } catch (error) {
      // Handle Errors
      console.error(error.code, error.message);
      errorMessage.style.display = 'block';
      
      // Make error messages user-friendly
      if(error.code === 'auth/email-already-in-use') {
        errorMessage.textContent = 'This email is already registered. Please log in.';
      } else if(error.code === 'auth/weak-password') {
        errorMessage.textContent = 'Password should be at least 6 characters.';
      } else {
        errorMessage.textContent = 'Failed to create account. Please try again.';
      }
    } finally {
      // Reset button state
      submitBtn.textContent = 'CREATE ACCOUNT';
      submitBtn.disabled = false;
    }
  });
}

// --- LOGIN LOGIC ---
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get input values
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Loading State
    loginBtn.textContent = 'LOGGING IN...';
    loginBtn.disabled = true;
    loginError.style.display = 'none';

    try {
      // Authenticate the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Success! 
      alert('Welcome back, ' + (user.displayName || 'User') + '!');
      window.location.href = 'dashboard.html'; // Redirect to your main landing page/dashboard

    } catch (error) {
      // Handle Errors
      console.error(error.code, error.message);
      loginError.style.display = 'block';
      
      // User-friendly error messages
      if(error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        loginError.textContent = 'Invalid email or password.';
      } else {
        loginError.textContent = 'Failed to log in. Please try again.';
      }
    } finally {
      // Reset button state
      loginBtn.textContent = 'LOG IN';
      loginBtn.disabled = false;
    }
  });
}