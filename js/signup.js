// js/signup.js
    const form = document.getElementById('signupForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const pass = document.getElementById('password').value;
      const confirm = document.getElementById('confirmPassword').value;

      if (pass !== confirm) {
        showNotification('Passwords do not match!');
        return;
      }

      showNotification('Creating your account...');
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
