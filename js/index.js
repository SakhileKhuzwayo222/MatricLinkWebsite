// js/index.js
        // Main JavaScript for Matric Link Homepage
        document.addEventListener('DOMContentLoaded', function() {
            // Animate stats counter
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Demo signup functionality
            const signupBtn = document.querySelector('.btn-primary[href="signup.html"]');
            
            if (signupBtn && typeof showNotification === 'function') {
                signupBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showNotification('Redirecting to signup page...', 'info');
            
                    const delay = 1000; // 1 second delay
                    setTimeout(() => {
                        showNotification('Demo: Redirecting now!', 'success');
                        window.location.href = 'signup.html'; // Actually redirects
                    }, delay);
                });
            }

            // Function to animate counter
            function animateCounter(element, target) {
                let current = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current) + '+';
                    }
                }, 20);
            }

            // Function to show notifications
            function showNotification(message, type = 'info') {
                // Remove existing notifications
                const existingNotifications = document.querySelectorAll('.notification');
                existingNotifications.forEach(notification => notification.remove());

                // Create notification element
                const notification = document.createElement('div');
                notification.className = `notification notification-${type}`;
                notification.innerHTML = `
                    <span>${message}</span>
                    <button onclick="this.parentElement.remove()">&times;</button>
                `;

                document.body.appendChild(notification);

                // Auto remove after 5 seconds
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 5000);
            }

            // Add hover effects to interactive elements
            const interactiveElements = document.querySelectorAll('.feature-card, .step, .stat-card');
            interactiveElements.forEach(element => {
                element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
        });
