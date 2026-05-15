document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Sidebar Toggle ---
  const sidebar = document.getElementById('sidebar');
  const openBtn = document.getElementById('openSidebar');
  const closeBtn = document.getElementById('closeSidebar');

  openBtn.addEventListener('click', () => {
    sidebar.classList.add('show');
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('show');
  });

  // --- Chart.js Configuration ---
  const ctx = document.getElementById('growthChart');

  if (ctx) {
    // Creating a smooth gradient for the area chart
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(18, 179, 255, 0.4)'); // Primary blue, low opacity
    gradient.addColorStop(1, 'rgba(18, 179, 255, 0.0)'); // Fades to transparent

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
          tension: 0.4 // This makes the line curved/smooth
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }, // Hide default legend for cleaner look
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
            grid: {
              color: '#F0F0F0',
              drawBorder: false,
            },
            ticks: {
              font: { family: 'Nunito Sans' },
              color: '#999'
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              font: { family: 'Nunito Sans' },
              color: '#999'
            }
          }
        }
      }
    });
  }

  // --- Optional: Basic Logout Trigger ---
  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // In a real app, call Firebase auth.signOut() here
      window.location.href = 'login.html';
    });
  }
});