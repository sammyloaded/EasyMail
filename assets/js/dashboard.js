// --- 1. FIREBASE IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// TODO: Paste your exact Firebase Config from auth.js here
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


// --- 2. UI LOGIC (Sidebar & Charts) ---
// Since this is a module, the DOM is already loaded. No wrapper needed!

// Sidebar Controls
const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('openSidebar');
const closeBtn = document.getElementById('closeSidebar');

if(openBtn && closeBtn) {
  openBtn.addEventListener('click', () => sidebar.classList.add('show'));
  closeBtn.addEventListener('click', () => sidebar.classList.remove('show'));
}

// Chart.js Configuration
const ctx = document.getElementById('growthChart');
if (ctx) {
  // Creating a smooth gradient for the area chart
  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(18, 179, 255, 0.4)'); 
  gradient.addColorStop(1, 'rgba(18, 179, 255, 0.0)'); 

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Jan 30'],
      datasets: [{
        label: 'Subscribers',
        data: [2100, 3200, 3900, 4800, 6100, 8400, 12450],
        borderColor: '#12B3FF',
        backgroundColor: gradient,
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#12B3FF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4 
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }, 
        tooltip: {
          backgroundColor: '#1A1A1A',
          padding: 12,
          titleFont: { family: 'Nunito Sans', size: 13 },
          bodyFont: { family: 'Nunito Sans', size: 14, weight: 'bold' },
          displayColors: false,
          callbacks: {
            label: function(context) {
              return context.parsed.y.toLocaleString() + ' Subscribers';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#F0F0F0', drawBorder: false },
          ticks: { font: { family: 'Nunito Sans' }, color: '#999' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Nunito Sans' }, color: '#999' }
        }
      }
    }
  });
}


// --- 3. FIREBASE AUTHENTICATION LOGIC ---

// Protect the route and fetch user name
const userNameDisplay = document.getElementById('userNameDisplay');

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in!
    const fullName = user.displayName || 'User';
    const firstName = fullName.split(' ')[0]; // Gets just the first name
    
    if(userNameDisplay) {
      userNameDisplay.textContent = firstName;
    }
  } else {
    // Kick them to login page if they try to view dashboard while logged out
    window.location.href = 'login.html';
  }
});

// Logout Button Logic
const logoutBtn = document.getElementById('logoutBtn');

if(logoutBtn) {
  logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      // Tell Firebase to destroy the session
      await signOut(auth);
      // Once signed out, the onAuthStateChanged listener above will automatically catch it and redirect!
    } catch (error) {
      console.error("Error signing out:", error);
    }
  });
}