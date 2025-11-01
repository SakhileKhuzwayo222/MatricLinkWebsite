// js/profile.js
        // Profile Page JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize form interactions
            initializeFormInteractions();
            
            // Add animation to cards
            animateCards();
            
            // Load user data
            loadUserData();
        });

        // Initialize form interactions
        function initializeFormInteractions() {
            const forms = document.querySelectorAll('form');
            
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    handleFormSubmit(this);
                });
            });
            
            // Add focus effects to form controls
            const formControls = document.querySelectorAll('.form-control');
            formControls.forEach(control => {
                control.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                control.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                });
            });
        }

        // Handle form submission
        function handleFormSubmit(form) {
            showLoading('Saving changes...');
            
            setTimeout(() => {
                hideLoading();
                showNotification('Profile updated successfully!', 'success');
                
                // In a real app, we would send the data to a server
                const formData = new FormData(form);
                const formId = form.id;
                
                // Save to localStorage for demo purposes
                const profileData = JSON.parse(localStorage.getItem('matricLinkProfile') || '{}');
                profileData[formId] = Object.fromEntries(formData);
                localStorage.setItem('matricLinkProfile', JSON.stringify(profileData));
            }, 1500);
        }

        // Load user data
        function loadUserData() {
            const savedProfile = localStorage.getItem('matricLinkProfile');
            if (savedProfile) {
                const profileData = JSON.parse(savedProfile);
                // In a real app, we would populate the forms with saved data
            }
        }

        // Animate cards on load
        function animateCards() {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        }

        // Utility Functions
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

        function showLoading(message = 'Loading...') {
            // Create loading overlay
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = `
                <div class="loading-spinner"></div>
                <div class="loading-message">${message}</div>
            `;

            document.body.appendChild(loadingOverlay);
        }

        function hideLoading() {
            const loadingOverlay = document.querySelector('.loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.remove();
            }
        }

        // Add hover effects and animations
        const interactiveElements = document.querySelectorAll('.card, .feature-card, .btn, .interest-option');
        interactiveElements.forEach(element => {
            element.style.transition = 'all 0.3s ease';
        });
   