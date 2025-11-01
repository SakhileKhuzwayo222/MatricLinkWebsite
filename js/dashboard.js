// js/dashboard.js
        // Dashboard JavaScript Functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Animate progress bars on page load
            animateProgressBars();
            
            // Add click handlers to sidebar navigation
            const sidebarLinks = document.querySelectorAll('.sidebar-link');
            sidebarLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Remove active class from all links
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    // Show loading state
                    showLoading('Loading...');
                    
                    // Simulate page navigation
                    setTimeout(() => {
                        hideLoading();
                        showNotification(`Navigating to ${this.textContent.trim()}`, 'info');
                    }, 1000);
                });
            });

            // User avatar click handler
            const userAvatar = document.querySelector('.user-avatar');
            if (userAvatar) {
                userAvatar.addEventListener('click', function() {
                    showNotification('Opening user profile menu', 'info');
                    // In a real app, this would open a dropdown menu
                });
            }

            // Initialize any dashboard-specific data
            loadDashboardData();

            // Add animation delays to cards
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        });

        // Function to animate progress bars
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
        }

        // Function to continue application
        function continueApplication(institution) {
            showLoading(`Loading ${institution} application...`);
            
            setTimeout(() => {
                hideLoading();
                showNotification(`Opening ${institution} application form`, 'success');
                // In a real app, this would navigate to the application page
            }, 1500);
        }

        // Function to upload documents
        function uploadDocuments(institution) {
            showNotification(`Opening document upload for ${institution}`, 'info');
            
            // Simulate file upload process
            setTimeout(() => {
                showNotification('Document upload interface loaded', 'success');
            }, 1000);
        }

        // Function to review offer
        function reviewOffer(institution) {
            showLoading(`Loading ${institution} offer details...`);
            
            setTimeout(() => {
                hideLoading();
                showNotification(`Showing ${institution} conditional offer`, 'success');
            }, 1500);
        }

        // Function to load dashboard data
        function loadDashboardData() {
            // Check if user has submitted results
            const hasResults = localStorage.getItem('matricLinkResults');
            const resultsStatus = document.querySelector('.status-badge.status-complete');
            
            if (hasResults && resultsStatus) {
                resultsStatus.textContent = 'Submitted';
                resultsStatus.className = 'status-badge status-complete';
            } else if (resultsStatus) {
                resultsStatus.textContent = 'Pending';
                resultsStatus.className = 'status-badge status-pending';
            }

            // Load application progress from localStorage
            const applications = JSON.parse(localStorage.getItem('matricLinkApplications') || '[]');
            const courseMatches = document.querySelector('.status-badge.status-in-progress');
            
            if (courseMatches) {
                courseMatches.textContent = `${applications.length} Recommended`;
            }
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

        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.feature-card, .course-card, .btn');
        interactiveElements.forEach(element => {
            element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
  