// Main JavaScript for Matric Link Desktop Application
class MatricLinkApp {
    constructor() {
        this.currentUser = null;
        this.recommendations = [];
        this.userApplications = [];
        this.userResults = null;
        this.init();
    }

    init() {
        this.initializeEventListeners();
        this.checkAuthentication();
        this.loadUserData();
        this.initializePageSpecificFeatures();
        this.initializeAnimations();
    }

    initializeEventListeners() {
        // Navigation active state
        this.handleNavigation();
        
        // Form submissions
        this.handleFormSubmissions();
        
        // Interactive elements
        this.initializeInteractiveComponents();
        
        // Search and filter functionality
        this.initializeSearchAndFilters();
    }

    handleNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Mobile menu toggle (if mobile menu exists)
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav');
        
        if (mobileMenuBtn && nav) {
            mobileMenuBtn.addEventListener('click', () => {
                nav.classList.toggle('show');
            });
        }
    }

    handleFormSubmissions() {
        // Results submission form
        const resultsForm = document.getElementById('resultsForm');
        if (resultsForm) {
            resultsForm.addEventListener('submit', (e) => this.handleResultsSubmission(e));
        }

        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        // Profile forms
        const profileForms = document.querySelectorAll('#personalInfoForm, #academicInfoForm, #careerPreferencesForm');
        profileForms.forEach(form => {
            if (form) {
                form.addEventListener('submit', (e) => this.handleProfileUpdate(e, form.id));
            }
        });
    }

    initializeInteractiveComponents() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Course card interactions
        document.querySelectorAll('.course-card .btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const courseCard = e.target.closest('.course-card');
                const courseTitle = courseCard.querySelector('.course-title')?.textContent;
                const institution = courseCard.querySelector('.course-institution')?.textContent;
                
                if (e.target.textContent.includes('Apply') || e.target.textContent.includes('Start Application')) {
                    this.startApplication(courseTitle, institution);
                } else if (e.target.textContent.includes('Details') || e.target.textContent.includes('View')) {
                    this.viewCourseDetails(courseTitle, institution);
                }
            });
        });

        // Institution card interactions
        document.querySelectorAll('.institution-card .btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const institutionCard = e.target.closest('.institution-card');
                const institutionName = institutionCard.querySelector('h4')?.textContent;
                
                if (e.target.textContent.includes('Apply')) {
                    this.applyToInstitution(institutionName);
                } else if (e.target.textContent.includes('View')) {
                    this.viewInstitution(institutionName);
                }
            });
        });

        // Progress bar animations
        this.animateProgressBars();
    }

    initializeSearchAndFilters() {
        // Institution search
        const institutionSearch = document.querySelector('input[placeholder*="institution"]');
        if (institutionSearch) {
            institutionSearch.addEventListener('input', (e) => {
                this.filterInstitutions(e.target.value);
            });
        }

        // Course search
        const courseSearch = document.querySelector('input[placeholder*="course"]');
        if (courseSearch) {
            courseSearch.addEventListener('input', (e) => {
                this.filterCourses(e.target.value);
            });
        }

        // Filter checkboxes
        document.querySelectorAll('input[type="checkbox"][name="institution_type"], input[type="checkbox"][name="interests"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.applyFilters();
            });
        });

        // Location filters
        const locationSelects = document.querySelectorAll('select');
        locationSelects.forEach(select => {
            select.addEventListener('change', () => {
                this.applyFilters();
            });
        });
    }

    initializePageSpecificFeatures() {
        const currentPage = window.location.pathname.split('/').pop();
        
        switch(currentPage) {
            case 'course-recommendations.html':
                this.initializeCourseRecommendations();
                break;
            case 'institution-portals.html':
                this.initializeInstitutionPortals();
                break;
            case 'profile.html':
                this.initializeProfilePage();
                break;
            case 'dashboard.html':
                this.initializeDashboard();
                break;
            case 'results-submission.html':
                this.initializeResultsSubmission();
                break;
            case 'index.html':
                this.initializeHomepage();
                break;
        }
    }

    initializeAnimations() {
        // Animate stats counter on homepage
        this.animateStats();
        
        // Add intersection observer for scroll animations
        this.initializeScrollAnimations();
    }

    // Authentication Methods
    async handleLogin(e) {
        if (e) e.preventDefault();
        
        const email = document.getElementById('email')?.value || 'demo@matriclink.com';
        const password = document.getElementById('password')?.value || 'password';
        const rememberMe = document.getElementById('rememberMe')?.checked;

        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }

        this.showLoading('Signing you in...');

        try {
            await this.simulateAPICall(1500);
            
            this.currentUser = {
                id: 1,
                name: 'John Student',
                email: email,
                avatar: 'JS'
            };
            
            localStorage.setItem('matricLinkUser', JSON.stringify(this.currentUser));
            if (rememberMe) {
                localStorage.setItem('matricLinkRemember', 'true');
            }
            
            this.showNotification('Login successful! Redirecting to dashboard...', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
            
        } catch (error) {
            this.showNotification('Login failed. Please check your credentials.', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async handleSignup(e) {
        if (e) e.preventDefault();
        
        const email = document.getElementById('email')?.value || 'demo@matriclink.com';
        const password = document.getElementById('password')?.value || 'password';
        const confirmPassword = document.getElementById('confirmPassword')?.value || 'password';
        const fullName = document.getElementById('fullName')?.value || 'John Student';

        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return;
        }

        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters long.', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match.', 'error');
            return;
        }

        this.showLoading('Creating your account...');

        try {
            await this.simulateAPICall(2000);
            
            this.currentUser = {
                id: Date.now(),
                name: fullName,
                email: email,
                avatar: fullName.split(' ').map(n => n[0]).join('')
            };
            
            localStorage.setItem('matricLinkUser', JSON.stringify(this.currentUser));
            
            this.showNotification('Account created successfully! Welcome to Matric Link.', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
            
        } catch (error) {
            this.showNotification('Signup failed. Please try again.', 'error');
        } finally {
            this.hideLoading();
        }
    }

    // Results Submission
    async handleResultsSubmission(e) {
        e.preventDefault();
        
        const results = this.processResultsFormData();

        if (!this.validateResults(results)) {
            this.showNotification('Please fill in all required fields with valid marks (0-100).', 'error');
            return;
        }

        this.showLoading('Analyzing your results and generating recommendations...');

        try {
            await this.simulateAPICall(2500);
            
            // Save results to localStorage
            this.userResults = results;
            localStorage.setItem('matricLinkResults', JSON.stringify(results));
            
            // Generate recommendations
            const recommendations = await this.generateRecommendations(results);
            this.recommendations = recommendations;
            localStorage.setItem('matricLinkRecommendations', JSON.stringify(recommendations));
            
            this.showNotification('Results submitted successfully! Check your course recommendations.', 'success');
            
            // Redirect to recommendations page
            setTimeout(() => {
                window.location.href = 'course-recommendations.html';
            }, 1500);
            
        } catch (error) {
            this.showNotification('Error processing your results. Please try again.', 'error');
            console.error('Results submission error:', error);
        } finally {
            this.hideLoading();
        }
    }

    processResultsFormData() {
        const results = {
            subjects: [],
            interests: [],
            preferences: {}
        };

        // Process subject data
        const subjectElements = document.querySelectorAll('.subject-card');
        subjectElements.forEach(subjectElement => {
            const subjectName = subjectElement.querySelector('.subject-name')?.textContent;
            const markInput = subjectElement.querySelector('input[type="number"]');
            const levelSelect = subjectElement.querySelector('select');
            
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
        const preferenceCheckboxes = document.querySelectorAll('input[type="checkbox"][name="institution_type"]');
        results.preferences.institutionTypes = Array.from(preferenceCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        return results;
    }

    validateResults(results) {
        if (results.subjects.length === 0) {
            return false;
        }

        // Check for required subjects
        const requiredSubjects = ['Mathematics', 'English'];
        const hasRequiredSubjects = requiredSubjects.every(subject => 
            results.subjects.some(s => s.name.includes(subject))
        );

        if (!hasRequiredSubjects) {
            this.showNotification('Please include Mathematics and English subjects.', 'warning');
            return false;
        }

        // Validate marks
        const validMarks = results.subjects.every(subject => 
            subject.mark >= 0 && subject.mark <= 100
        );

        if (!validMarks) {
            this.showNotification('Please ensure all marks are between 0 and 100.', 'warning');
            return false;
        }

        return true;
    }

    // Course Recommendations
    initializeCourseRecommendations() {
        const savedRecommendations = localStorage.getItem('matricLinkRecommendations');
        if (savedRecommendations) {
            this.recommendations = JSON.parse(savedRecommendations);
            this.displayRecommendations(this.recommendations);
        } else {
            // Load sample recommendations if none exist
            this.loadSampleRecommendations();
        }

        // Initialize recommendation filters
        this.initializeRecommendationFilters();
    }

    async generateRecommendations(userData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const recommendations = [
                    {
                        id: 1,
                        name: "Computer Science",
                        institution: "University of Cape Town",
                        requirements: {
                            mathematics: 70,
                            physical_science: 65,
                            english: 60
                        },
                        userScores: {
                            mathematics: userData.subjects.find(s => s.name.includes('Mathematics'))?.mark || 0,
                            physical_science: userData.subjects.find(s => s.name.includes('Physical Science'))?.mark || 0,
                            english: userData.subjects.find(s => s.name.includes('English'))?.mark || 0
                        },
                        matchScore: this.calculateMatchScore(userData, 'computer_science'),
                        description: "Focus on software development, algorithms, and computer systems.",
                        applicationDeadline: "2024-09-30",
                        requirementsMet: true,
                        duration: "3-4 years",
                        careerPaths: ["Software Developer", "Data Scientist", "Systems Analyst"],
                        admissionPoints: 40
                    },
                    {
                        id: 2,
                        name: "Electrical Engineering",
                        institution: "Wits University",
                        requirements: {
                            mathematics: 75,
                            physical_science: 70,
                            english: 60
                        },
                        userScores: {
                            mathematics: userData.subjects.find(s => s.name.includes('Mathematics'))?.mark || 0,
                            physical_science: userData.subjects.find(s => s.name.includes('Physical Science'))?.mark || 0,
                            english: userData.subjects.find(s => s.name.includes('English'))?.mark || 0
                        },
                        matchScore: this.calculateMatchScore(userData, 'electrical_engineering'),
                        description: "Design and develop electrical systems and electronic devices.",
                        applicationDeadline: "2024-10-15",
                        requirementsMet: true,
                        duration: "4 years",
                        careerPaths: ["Electrical Engineer", "Electronics Designer", "Power Systems Engineer"],
                        admissionPoints: 42
                    },
                    {
                        id: 3,
                        name: "Business Science",
                        institution: "University of Pretoria",
                        requirements: {
                            mathematics: 65,
                            english: 65
                        },
                        userScores: {
                            mathematics: userData.subjects.find(s => s.name.includes('Mathematics'))?.mark || 0,
                            english: userData.subjects.find(s => s.name.includes('English'))?.mark || 0
                        },
                        matchScore: this.calculateMatchScore(userData, 'business_science'),
                        description: "Combine business principles with analytical skills.",
                        applicationDeadline: "2024-09-28",
                        requirementsMet: true,
                        duration: "3-4 years",
                        careerPaths: ["Business Analyst", "Marketing Manager", "Financial Analyst"],
                        admissionPoints: 38
                    }
                ];
                resolve(recommendations);
            }, 2000);
        });
    }

    calculateMatchScore(userData, courseType) {
        // Simple match calculation for demo
        const baseScore = Math.floor(Math.random() * 20) + 75; // 75-95%
        return Math.min(baseScore, 95);
    }

    displayRecommendations(recommendations) {
        const resultsContainer = document.getElementById('recommendationResults');
        if (!resultsContainer) return;

        let html = `
            <div class="card">
                <div class="card-header">
                    <h3>Your Personalized Course Recommendations</h3>
                    <p>Based on your academic results and interests</p>
                </div>
                <div class="card-body">
                    <div class="courses-grid">
        `;

        recommendations.forEach(course => {
            const requirementsComparison = this.compareRequirements(course.requirements, course.userScores);
            
            html += `
                <div class="course-card">
                    <div class="course-header">
                        <h4 class="course-title">${course.name}</h4>
                        <p class="course-institution">${course.institution}</p>
                        <span class="status-badge ${course.matchScore >= 80 ? 'status-complete' : 'status-in-progress'}">${course.matchScore}% Match</span>
                    </div>
                    <div class="course-body">
                        <div class="course-requirements">
            `;

            // Display requirement comparisons
            Object.keys(requirementsComparison).forEach(subject => {
                const comp = requirementsComparison[subject];
                html += `
                    <div class="requirement-item">
                        <span>${this.formatSubjectName(subject)}:</span>
                        <span class="${comp.met ? 'highlight' : ''}">
                            ${comp.userScore}% ${comp.met ? '✓' : '✗'} (${comp.required}% required)
                        </span>
                    </div>
                `;
            });

            html += `
                        </div>
                        <p>${course.description}</p>
                        <div class="course-info">
                            <p><strong>Duration:</strong> ${course.duration}</p>
                            <p><strong>Career Paths:</strong> ${course.careerPaths.join(', ')}</p>
                            <p><strong>Application Deadline:</strong> ${course.applicationDeadline}</p>
                            <p><strong>Admission Points:</strong> ${course.admissionPoints}</p>
                        </div>
                        <div class="course-match">
                            <div class="match-score">${course.matchScore}% Match</div>
                            <small>Based on your academic profile and interests</small>
                        </div>
                        <div class="text-center mt-6">
                            <button class="btn btn-primary" onclick="matricLinkApp.viewCourseDetails(${course.id})">
                                View Full Details
                            </button>
                            <button class="btn btn-secondary" onclick="matricLinkApp.startApplication(${course.id})">
                                Start Application
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
            </div>
        `;

        resultsContainer.innerHTML = html;
    }

    compareRequirements(courseRequirements, userScores) {
        const comparison = {};
        Object.keys(courseRequirements).forEach(subject => {
            const required = courseRequirements[subject];
            const userScore = userScores[subject] || 0;
            comparison[subject] = {
                required,
                userScore,
                met: userScore >= required
            };
        });
        return comparison;
    }

    formatSubjectName(subject) {
        const names = {
            mathematics: 'Mathematics',
            physical_science: 'Physical Science',
            english: 'English'
        };
        return names[subject] || subject.replace('_', ' ').toUpperCase();
    }

    // Institution Portals
    initializeInstitutionPortals() {
        this.loadInstitutions();
        this.initializeInstitutionFilters();
    }

    loadInstitutions() {
        const institutions = [
            {
                id: 'uct',
                name: 'University of Cape Town',
                location: 'Cape Town, Western Cape',
                type: 'university',
                ranking: 1,
                applicationFee: 200,
                closingDate: '2024-09-30',
                courses: ['Computer Science', 'Electrical Engineering', 'Business Science']
            },
            {
                id: 'wits',
                name: 'University of the Witwatersrand',
                location: 'Johannesburg, Gauteng',
                type: 'university',
                ranking: 2,
                applicationFee: 200,
                closingDate: '2024-10-15',
                courses: ['Electrical Engineering', 'Mechanical Engineering']
            },
            {
                id: 'up',
                name: 'University of Pretoria',
                location: 'Pretoria, Gauteng',
                type: 'university',
                ranking: 3,
                applicationFee: 300,
                closingDate: '2024-09-28',
                courses: ['Business Science', 'Computer Science']
            }
        ];

        this.displayInstitutions(institutions);
    }

    displayInstitutions(institutions) {
        const container = document.querySelector('.institutions-grid');
        if (!container) return;

        let html = '';
        institutions.forEach(institution => {
            const matchingCourses = institution.courses.length;
            
            html += `
                <div class="institution-card" data-institution-type="${institution.type}" data-location="${institution.location}">
                    <div class="institution-logo">${institution.name.split(' ').map(word => word[0]).join('')}</div>
                    <h4>${institution.name}</h4>
                    <p class="highlight">${institution.location}</p>
                    <p>Ranked #${institution.ranking} in South Africa</p>
                    <div class="course-match">
                        <div class="match-score">${matchingCourses} Course${matchingCourses !== 1 ? 's' : ''}</div>
                        <small>Matching your profile</small>
                    </div>
                    <div class="institution-info mt-4">
                        <p><strong>Type:</strong> ${this.formatInstitutionType(institution.type)}</p>
                        <p><strong>Application Fee:</strong> R${institution.applicationFee}</p>
                        <p><strong>Closing Date:</strong> ${institution.closingDate}</p>
                    </div>
                    <div class="text-center mt-6">
                        <button class="btn btn-primary" onclick="matricLinkApp.viewInstitution('${institution.id}')">
                            View Institution
                        </button>
                        <button class="btn btn-secondary" onclick="matricLinkApp.applyToInstitution('${institution.id}')">
                            Apply Now
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    formatInstitutionType(type) {
        const types = {
            university: 'Traditional University',
            university_of_technology: 'University of Technology',
            college: 'TVET College',
            private: 'Private Institution'
        };
        return types[type] || type;
    }

    filterInstitutions(searchTerm) {
        const institutions = document.querySelectorAll('.institution-card');
        const term = searchTerm.toLowerCase();
        
        institutions.forEach(institution => {
            const name = institution.querySelector('h4').textContent.toLowerCase();
            const location = institution.querySelector('.highlight').textContent.toLowerCase();
            const isVisible = name.includes(term) || location.includes(term);
            institution.style.display = isVisible ? 'block' : 'none';
        });
    }

    // Profile Management
    initializeProfilePage() {
        this.loadUserProfile();
        this.initializeProfileForms();
    }

    loadUserProfile() {
        const savedUser = localStorage.getItem('matricLinkUser');
        const savedResults = localStorage.getItem('matricLinkResults');
        const savedApplications = localStorage.getItem('matricLinkApplications');

        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateProfileDisplay();
        }

        if (savedResults) {
            const results = JSON.parse(savedResults);
            this.updateAcademicDisplay(results);
        }

        if (savedApplications) {
            this.userApplications = JSON.parse(savedApplications);
            this.updateApplicationsDisplay();
        }
    }

    updateProfileDisplay() {
        if (!this.currentUser) return;

        // Update profile header
        const profileHeader = document.querySelector('.profile-header');
        if (profileHeader) {
            const avatar = profileHeader.querySelector('.user-avatar-large');
            const name = profileHeader.querySelector('.card-title');
            const info = profileHeader.querySelector('.profile-info p');

            if (avatar) avatar.textContent = this.currentUser.avatar;
            if (name) name.textContent = this.currentUser.name;
        }

        // Update form values
        this.populateProfileForms();
    }

    populateProfileForms() {
        // Personal information form
        const personalForm = document.getElementById('personalInfoForm');
        if (personalForm && this.currentUser) {
            const nameInput = personalForm.querySelector('input[type="text"]');
            const emailInput = personalForm.querySelector('input[type="email"]');
            
            if (nameInput) nameInput.value = this.currentUser.name;
            if (emailInput) emailInput.value = this.currentUser.email;
        }
    }

    async handleProfileUpdate(e, formId) {
        e.preventDefault();
        const formData = new FormData(e.target);

        this.showLoading('Updating your profile...');

        try {
            await this.simulateAPICall(1000);

            switch(formId) {
                case 'personalInfoForm':
                    this.updatePersonalInfo(formData);
                    break;
                case 'academicInfoForm':
                    this.updateAcademicInfo(formData);
                    break;
                case 'careerPreferencesForm':
                    this.updateCareerPreferences(formData);
                    break;
            }

            this.showNotification('Profile updated successfully!', 'success');
        } catch (error) {
            this.showNotification('Error updating profile. Please try again.', 'error');
        } finally {
            this.hideLoading();
        }
    }

    updatePersonalInfo(formData) {
        if (this.currentUser) {
            this.currentUser.name = formData.get('fullName') || this.currentUser.name;
            this.currentUser.email = formData.get('email') || this.currentUser.email;
            this.currentUser.phone = formData.get('phone') || this.currentUser.phone;
            
            localStorage.setItem('matricLinkUser', JSON.stringify(this.currentUser));
            this.updateProfileDisplay();
        }
    }

    // Dashboard
    initializeDashboard() {
        this.loadDashboardData();
        this.updateDashboardStats();
    }

    loadDashboardData() {
        const savedApplications = localStorage.getItem('matricLinkApplications');
        const savedRecommendations = localStorage.getItem('matricLinkRecommendations');

        if (savedApplications) {
            this.userApplications = JSON.parse(savedApplications);
            this.updateApplicationProgress();
        }

        if (savedRecommendations) {
            this.recommendations = JSON.parse(savedRecommendations);
        }
    }

    updateApplicationProgress() {
        const progressElements = document.querySelectorAll('.progress-fill');
        progressElements.forEach((element, index) => {
            const application = this.userApplications[index];
            if (application) {
                const progress = this.calculateApplicationProgress(application);
                element.style.width = `${progress}%`;
            }
        });
    }

    calculateApplicationProgress(application) {
        const statusWeights = {
            'not_started': 0,
            'in_progress': 50,
            'submitted': 80,
            'under_review': 90,
            'accepted': 100,
            'rejected': 100
        };
        return statusWeights[application.status] || 0;
    }

    updateDashboardStats() {
        const stats = {
            coursesApplied: this.userApplications.length,
            recommendations: this.recommendations.length,
            profileComplete: this.calculateProfileCompletion(),
            daysUntilDeadline: this.calculateDaysUntilDeadline()
        };

        // Update any dashboard stat elements
        const statElements = document.querySelectorAll('[data-stat]');
        statElements.forEach(element => {
            const stat = element.getAttribute('data-stat');
            if (stats[stat] !== undefined) {
                element.textContent = stats[stat];
            }
        });
    }

    // Application Management
    startApplication(courseId, courseName, institution) {
        const course = this.recommendations.find(c => c.id === courseId);
        if (!course) {
            // Create a demo application
            const application = {
                id: Date.now(),
                courseId: courseId,
                courseName: courseName || `Course ${courseId}`,
                institution: institution || 'Demo Institution',
                status: 'in_progress',
                startDate: new Date().toISOString(),
                progress: 30
            };

            if (!this.userApplications.find(app => app.courseId === courseId)) {
                this.userApplications.push(application);
                localStorage.setItem('matricLinkApplications', JSON.stringify(this.userApplications));
            }
        }

        this.showNotification(`Starting application for ${course?.name || courseName}`, 'success');
        
        // Simulate application process
        setTimeout(() => {
            this.showNotification('Application process started! Check your applications.', 'info');
        }, 1000);
    }

    viewCourseDetails(courseId) {
        const course = this.recommendations.find(c => c.id === courseId);
        if (course) {
            this.showNotification(`Showing details for ${course.name}`, 'info');
            // In a real app, this would open a modal or navigate to details page
        }
    }

    viewInstitution(institutionId) {
        this.showNotification(`Loading details for ${institutionId}`, 'info');
    }

    applyToInstitution(institutionId) {
        this.showNotification(`Starting application process for ${institutionId}`, 'success');
    }

    // Homepage Features
    initializeHomepage() {
        this.animateStats();
        this.initializeDemoLogin();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            this.animateCounter(stat, target);
        });
    }

    animateCounter(element, target) {
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

    initializeDemoLogin() {
        // Add demo login functionality for quick testing
        const demoLoginBtn = document.querySelector('.btn-primary');
        if (demoLoginBtn && window.location.pathname.includes('index.html')) {
            demoLoginBtn.addEventListener('click', (e) => {
                if (e.target.textContent.includes('Start Your Journey')) {
                    e.preventDefault();
                    this.handleSignup();
                }
            });
        }
    }

    initializeResultsSubmission() {
        // Pre-fill form if results exist
        const savedResults = localStorage.getItem('matricLinkResults');
        if (savedResults) {
            this.prefillResultsForm(JSON.parse(savedResults));
        }
    }

    prefillResultsForm(results) {
        results.subjects.forEach(subject => {
            const subjectElement = Array.from(document.querySelectorAll('.subject-card'))
                .find(card => card.querySelector('.subject-name').textContent.includes(subject.name));
            
            if (subjectElement) {
                const markInput = subjectElement.querySelector('input[type="number"]');
                if (markInput) {
                    markInput.value = subject.mark;
                }
            }
        });
    }

    initializeRecommendationFilters() {
        // Add filter functionality for course recommendations
        const filterElements = document.querySelectorAll('.institution-filter, .score-filter');
        filterElements.forEach(filter => {
            filter.addEventListener('change', () => this.applyRecommendationFilters());
        });
    }

    applyRecommendationFilters() {
        // Filter recommendations based on selected criteria
        const minScore = document.querySelector('.score-filter')?.value || 70;
        const filtered = this.recommendations.filter(course => 
            course.matchScore >= minScore
        );
        this.displayRecommendations(filtered);
    }

    initializeInstitutionFilters() {
        // Add filter functionality for institutions
        const typeFilters = document.querySelectorAll('input[name="institution_type"]');
        typeFilters.forEach(filter => {
            filter.addEventListener('change', () => this.applyInstitutionFilters());
        });
    }

    applyInstitutionFilters() {
        const selectedTypes = Array.from(document.querySelectorAll('input[name="institution_type"]:checked'))
            .map(checkbox => checkbox.value);
        
        const institutions = document.querySelectorAll('.institution-card');
        institutions.forEach(institution => {
            const type = institution.dataset.institutionType;
            const shouldShow = selectedTypes.length === 0 || selectedTypes.includes(type);
            institution.style.display = shouldShow ? 'block' : 'none';
        });
    }

    initializeScrollAnimations() {
        // Add intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements that should animate on scroll
        document.querySelectorAll('.feature-card, .course-card, .institution-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Utility Methods
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showNotification(message, type = 'info') {
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

    showLoading(message = 'Loading...') {
        // Create loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-message">${message}</div>
        `;

        document.body.appendChild(loadingOverlay);
    }

    hideLoading() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }

    simulateAPICall(duration = 1000) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    checkAuthentication() {
        const user = localStorage.getItem('matricLinkUser');
        const currentPage = window.location.pathname.split('/').pop();
        
        // Pages that require authentication
        const protectedPages = ['dashboard.html', 'profile.html', 'course-recommendations.html', 'institution-portals.html'];
        
        if (!user && protectedPages.includes(currentPage)) {
            // Redirect to login if not authenticated
            this.showNotification('Please log in to access this page.', 'warning');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            return;
        }

        if (user) {
            this.currentUser = JSON.parse(user);
            this.updateUserInterface();
        }
    }

    updateUserInterface() {
        // Update user avatar in header
        const userAvatar = document.querySelector('.user-avatar');
        if (userAvatar && this.currentUser) {
            userAvatar.textContent = this.currentUser.avatar;
        }

        // Update login/signup buttons to show user info
        const authButtons = document.querySelector('.user-nav');
        if (authButtons && this.currentUser) {
            authButtons.innerHTML = `
                <div class="user-avatar">${this.currentUser.avatar}</div>
            `;
        }
    }

    loadUserData() {
        // Load user data from localStorage
        const savedResults = localStorage.getItem('matricLinkResults');
        const savedRecommendations = localStorage.getItem('matricLinkRecommendations');
        const savedApplications = localStorage.getItem('matricLinkApplications');

        if (savedResults) {
            this.userResults = JSON.parse(savedResults);
        }

        if (savedRecommendations) {
            this.recommendations = JSON.parse(savedRecommendations);
        }

        if (savedApplications) {
            this.userApplications = JSON.parse(savedApplications);
        }
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width || '0%';
                    // Animate the progress bar
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
    }

    loadSampleRecommendations() {
        // Load sample data for demonstration
        this.recommendations = [
            {
                id: 1,
                name: "Computer Science",
                institution: "University of Cape Town",
                matchScore: 92,
                requirements: { mathematics: 70, physical_science: 65, english: 60 },
                userScores: { mathematics: 78, physical_science: 72, english: 82 },
                description: "Focus on software development, algorithms, and computer systems.",
                applicationDeadline: "2024-09-30",
                duration: "3-4 years",
                careerPaths: ["Software Developer", "Data Scientist", "Systems Analyst"],
                admissionPoints: 40
            },
            {
                id: 2,
                name: "Electrical Engineering",
                institution: "Wits University",
                matchScore: 88,
                requirements: { mathematics: 75, physical_science: 70, english: 60 },
                userScores: { mathematics: 78, physical_science: 72, english: 82 },
                description: "Design and develop electrical systems and electronic devices.",
                applicationDeadline: "2024-10-15",
                duration: "4 years",
                careerPaths: ["Electrical Engineer", "Electronics Designer", "Power Systems Engineer"],
                admissionPoints: 42
            }
        ];
        
        this.displayRecommendations(this.recommendations);
    }

    calculateProfileCompletion() {
        let completion = 0;
        if (this.currentUser) completion += 25;
        if (localStorage.getItem('matricLinkResults')) completion += 50;
        if (this.userApplications.length > 0) completion += 25;
        return completion;
    }

    calculateDaysUntilDeadline() {
        const now = new Date();
        const deadlines = this.recommendations.map(course => new Date(course.applicationDeadline));
        const futureDeadlines = deadlines.filter(deadline => deadline > now);
        
        if (futureDeadlines.length === 0) return 0;
        
        const nearestDeadline = futureDeadlines.reduce((nearest, current) => 
            current < nearest ? current : nearest
        );
        
        const diffTime = nearestDeadline - now;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    filterCourses(searchTerm) {
        const courses = document.querySelectorAll('.course-card');
        const term = searchTerm.toLowerCase();
        
        courses.forEach(course => {
            const name = course.querySelector('.course-title').textContent.toLowerCase();
            const institution = course.querySelector('.course-institution').textContent.toLowerCase();
            const isVisible = name.includes(term) || institution.includes(term);
            course.style.display = isVisible ? 'block' : 'none';
        });
    }

    applyFilters() {
        // Combined filter application
        this.filterCourses('');
        this.filterInstitutions('');
    }

    updateAcademicDisplay(results) {
        // Update academic information display on profile
        if (results && results.subjects) {
            const academicStats = document.querySelector('[data-stat="academic-average"]');
            if (academicStats) {
                const average = results.subjects.reduce((sum, subject) => sum + subject.mark, 0) / results.subjects.length;
                academicStats.textContent = `${Math.round(average)}%`;
            }
        }
    }

    updateApplicationsDisplay() {
        // Update applications display on profile and dashboard
        const applicationStats = document.querySelector('[data-stat="courses-applied"]');
        if (applicationStats) {
            applicationStats.textContent = this.userApplications.length;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.matricLinkApp = new MatricLinkApp();
});

// Utility functions
function formatPercentage(value) {
    return `${value}%`;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MatricLinkApp, formatPercentage, formatDate };
}