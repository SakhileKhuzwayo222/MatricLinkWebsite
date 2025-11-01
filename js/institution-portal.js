// js/institution-portal.js
        // Institution Portals JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Load user data and generate institution recommendations
            loadUserResults();
            initializeInstitutionInteractions();
            
            // Add animation to institution cards
            animateInstitutionCards();
        });

        // Load user results and display recommendations
        function loadUserResults() {
            const savedResults = localStorage.getItem('matricLinkResults');
            if (savedResults) {
                const results = JSON.parse(savedResults);
                updateInstitutionStats(results);
            } else {
                // Show message if no results submitted
                showNotification('Please submit your matric results first', 'warning');
                setTimeout(() => {
                    window.location.href = 'results-submission.html';
                }, 3000);
            }
        }

        // Update institution statistics
        function updateInstitutionStats(results) {
            // Update stats based on user results
            const mathMark = results.subjects.find(s => s.name.includes('Mathematics'))?.mark || 0;
            // In a real app, we would update institution recommendations based on user results
        }

        // Initialize institution card interactions
        function initializeInstitutionInteractions() {
            const institutionCards = document.querySelectorAll('.institution-card');
            
            institutionCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    if (!e.target.closest('.btn')) {
                        // Show institution details when card is clicked (except buttons)
                        const institutionName = this.querySelector('h4').textContent;
                        showInstitutionPreview(institutionName);
                    }
                });
            });
        }

        // Animate institution cards on load
        function animateInstitutionCards() {
            const institutionCards = document.querySelectorAll('.institution-card');
            institutionCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        }

        // View institution details
                const matricLinkApp ={
                        
                            viewInstitution: function(institutionId) {
                                showLoading('Loading institution details...');
                                
                                setTimeout(() => {
                                    hideLoading();
                                    const institutions = {
                                        'uct': 'University of Cape Town',
                                        'wits': 'University of the Witwatersrand',
                                        'up': 'University of Pretoria',
                                        'uj': 'University of Johannesburg',
                                        'cput': 'Cape Peninsula University of Technology',
                                        'dut': 'Durban University of Technology',
                                        'nwu': 'North-West University'
                                    };
                                    
                                    showNotification(`Opening details for ${institutions[institutionId]}`, 'info');
                                    // In a real app, this would open a modal or navigate to details page
                                }, 1500);
                            },
                            
                            applyToInstitution: function(institutionId) {
                                showLoading('Starting application process...');
                                
                                setTimeout(() => {
                                    hideLoading();
                                    const institutions = {
                                        'uct': 'University of Cape Town',
                                        'wits': 'University of the Witwatersrand',
                                        'up': 'University of Pretoria'
                                    };
                                    
                                    // Save application to localStorage
                                    const applications = JSON.parse(localStorage.getItem('matricLinkApplications') || '[]');
                                    const newApplication = {
                                        id: Date.now(),
                                        institutionId: institutionId,
                                        institutionName: institutions[institutionId],
                                        status: 'in_progress',
                                        startDate: new Date().toISOString(),
                                        progress: 10
                                    };
                                    
                                    applications.push(newApplication);
                                    localStorage.setItem('matricLinkApplications', JSON.stringify(applications));
                                    
                                    showNotification(`Application started for ${institutions[institutionId]}!`, 'success');
                                    
                                    // Redirect to dashboard after delay
                                    setTimeout(() => {
                                        window.location.href = 'dashboard.html';
                                    }, 2000);
                                }, 2000);
                            }
                        };

        // Show institution preview
        function showInstitutionPreview(institutionName) {
            // This would typically show a modal with more details
            showNotification(`Preview: ${institutionName} - More details coming soon!`, 'info');
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
        const interactiveElements = document.querySelectorAll('.institution-card, .feature-card, .btn');
        interactiveElements.forEach(element => {
            element.style.transition = 'all 0.3s ease';
        });
 