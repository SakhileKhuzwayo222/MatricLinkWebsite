// js/login.js
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      showNotification('Logging you in...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    });

    function showNotification(message) {
      const note = document.createElement('div');
      note.className = 'notification';
      note.textContent = message;
      document.body.appendChild(note);
      setTimeout(() => {
        note.style.opacity = '0';
        setTimeout(() => note.remove(), 500);
      }, 3000);
    }
