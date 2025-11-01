// js/course-recommendations.js
        // Course Recommendations JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Load user data and generate recommendations
            loadUserResults();
            initializeCourseInteractions();
            
            // Add animation to course cards
            animateCourseCards();
        });

        // Load user results and display recommendations
        function loadUserResults() {
            const savedResults = localStorage.getItem('matricLinkResults');
            if (savedResults) {
                const results = JSON.parse(savedResults);
                updateRecommendationStats(results);
            } else {
                // Show message if no results submitted
                showNotification('Please submit your matric results first', 'warning');
                setTimeout(() => {
                    window.location.href = 'results-submission.html';
                }, 3000);
            }
        }

        // Update recommendation statistics
        function updateRecommendationStats(results) {
            // Update stats based on user results
            const mathMark = results.subjects.find(s => s.name.includes('Mathematics'))?.mark || 0;
            const mathElement = document.querySelector('.feature-card:nth-child(2) p:last-child');
            if (mathElement) {
                mathElement.textContent = `Mathematics: ${mathMark}%`;
            }
        }

        // Initialize course card interactions
        function initializeCourseInteractions() {
            const courseCards = document.querySelectorAll('.course-card');
            
            courseCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    if (!e.target.closest('.btn')) {
                        // Show course details when card is clicked (except buttons)
                        const courseTitle = this.querySelector('.course-title').textContent;
                        showCoursePreview(courseTitle);
                    }
                });
            });
        }

        // Animate course cards on load
        function animateCourseCards() {
            const courseCards = document.querySelectorAll('.course-card');
            courseCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        }

        // View course details
        function viewCourseDetails(courseId) {
            showLoading('Loading course details...');
            
            setTimeout(() => {
                hideLoading();
                const courses = {
                    1: 'Computer Science - University of Cape Town',
                    2: 'Electrical Engineering - Wits University',
                    3: 'Business Science - University of Pretoria',
                    4: 'Information Technology - Cape Peninsula University of Technology',
                    5: 'Data Science - Stellenbosch University'
                };
                
                showNotification(`Opening details for ${courses[courseId]}`, 'info');
                // In a real app, this would open a modal or navigate to details page
            }, 1500);
        }

        // Start application process
        function startApplication(courseId) {
            showLoading('Starting application process...');
            
            setTimeout(() => {
                hideLoading();
                const courses = {
                    1: 'Computer Science',
                    2: 'Electrical Engineering',
                    3: 'Business Science',
                    4: 'Information Technology',
                    5: 'Data Science'
                };
                
                // Save application to localStorage
                const applications = JSON.parse(localStorage.getItem('matricLinkApplications') || '[]');
                const newApplication = {
                    id: Date.now(),
                    courseId: courseId,
                    courseName: courses[courseId],
                    status: 'in_progress',
                    startDate: new Date().toISOString(),
                    progress: 10
                };
                
                applications.push(newApplication);
                localStorage.setItem('matricLinkApplications', JSON.stringify(applications));
                
                showNotification(`Application started for ${courses[courseId]}!`, 'success');
                
                // Redirect to dashboard after delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            }, 2000);
        }

        // Show course preview
        function showCoursePreview(courseTitle) {
            // This would typically show a modal with more details
            showNotification(`Preview: ${courseTitle} - More details coming soon!`, 'info');
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
        const interactiveElements = document.querySelectorAll('.course-card, .feature-card, .btn');
        interactiveElements.forEach(element => {
            element.style.transition = 'all 0.3s ease';
        });
 