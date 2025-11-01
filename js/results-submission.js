
// js/results-submission.js
        // Results Submission JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('resultsForm');
            const submitBtn = form.querySelector('button[type="submit"]');
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    // Clear error state when user starts typing
                    if (this.classList.contains('error')) {
                        this.classList.remove('error');
                        const errorMessage = this.nextElementSibling;
                        if (errorMessage && errorMessage.classList.contains('error-message')) {
                            errorMessage.style.display = 'none';
                        }
                    }
                });
            });
            
            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    submitResults();
                }
            });
            
            // Auto-save functionality
            let saveTimeout;
            form.addEventListener('input', function() {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(autoSaveForm, 2000);
            });
            
            // Load saved data if exists
            loadSavedData();

            // Add animation delays to subject cards
            const subjectCards = document.querySelectorAll('.subject-card');
            subjectCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            });
        });

        // Field validation function
        function validateField(field) {
            const value = field.value.trim();
            const isRequired = field.hasAttribute('data-required');
            const errorMessage = field.nextElementSibling;
            
            // Clear previous error state
            field.classList.remove('error', 'success');
            
            if (isRequired && !value) {
                field.classList.add('error');
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.style.display = 'block';
                }
                return false;
            }
            
            // Validate number fields
            if (field.type === 'number' && value) {
                const numValue = parseInt(value);
                if (isNaN(numValue) || numValue < 0 || numValue > 100) {
                    field.classList.add('error');
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.style.display = 'block';
                    }
                    return false;
                }
            }
            
            // If valid, add success state
            if (value && field.type !== 'checkbox' && field.type !== 'radio') {
                field.classList.add('success');
            }
            
            return true;
        }

        // Form validation function
        function validateForm() {
            const requiredFields = document.querySelectorAll('[data-required="true"]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            return isValid;
        }

        // Submit results function
        function submitResults() {
            showLoading('Analyzing your results and generating recommendations...');
            
            // Collect form data
            const formData = new FormData(document.getElementById('resultsForm'));
            const results = {
                subjects: [],
                interests: [],
                preferences: {}
            };
            
            // Process subject data
            const subjectCards = document.querySelectorAll('.subject-card');
            subjectCards.forEach(card => {
                const subjectName = card.querySelector('.subject-name').textContent;
                const markInput = card.querySelector('input[type="number"]');
                const levelSelect = card.querySelector('select');
                
                if (markInput && markInput.value) {
                    results.subjects.push({
                        name: subjectName,
                        mark: parseInt(markInput.value),
                        level: levelSelect ? levelSelect.value : null
                    });
                }
            });
            
            // Process interests
            const interestSelect = document.querySelector('select[multiple]');
            if (interestSelect) {
                results.interests = Array.from(interestSelect.selectedOptions).map(option => option.value);
            }
            
            // Process preferences
            const preferenceCheckboxes = document.querySelectorAll('input[name="institution_type"]:checked');
            results.preferences.institutionTypes = Array.from(preferenceCheckboxes).map(checkbox => checkbox.value);
            
            // Save to localStorage
            localStorage.setItem('matricLinkResults', JSON.stringify(results));
            
            // Simulate API call
            setTimeout(() => {
                hideLoading();
                showNotification('Results submitted successfully! Generating course recommendations...', 'success');
                
                // Redirect to recommendations page after delay
                setTimeout(() => {
                    window.location.href = 'course-recommendations.html';
                }, 2000);
            }, 3000);
        }

        // Auto-save function
        function autoSaveForm() {
            const formData = new FormData(document.getElementById('resultsForm'));
            const formState = {};
            
            formData.forEach((value, key) => {
                formState[key] = value;
            });
            
            localStorage.setItem('matricLinkFormState', JSON.stringify(formState));
            showNotification('Progress saved automatically', 'info');
        }

        // Load saved data
        function loadSavedData() {
            const savedState = localStorage.getItem('matricLinkFormState');
            const savedResults = localStorage.getItem('matricLinkResults');
            
            if (savedState) {
                const formState = JSON.parse(savedState);
                Object.keys(formState).forEach(key => {
                    const field = document.querySelector(`[name="${key}"]`);
                    if (field) {
                        if (field.type === 'checkbox' || field.type === 'radio') {
                            field.checked = formState[key] === field.value;
                        } else {
                            field.value = formState[key];
                        }
                    }
                });
            }
            
            if (savedResults) {
                showNotification('Previous results found. You can update your marks.', 'info');
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

        // Add interactive effects
        const subjectCards = document.querySelectorAll('.subject-card');
        subjectCards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
        });
 