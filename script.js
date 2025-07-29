
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️ Light Mode';
    }

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️ Light Mode';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.textContent = '🌙 Dark Mode';
            localStorage.setItem('darkMode', null);
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Update active nav link based on visible section
                const sectionId = entry.target.id;
                const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (correspondingNavLink) {
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Quiz functionality
    const quizSubmit = document.getElementById('quiz-submit');
    if (quizSubmit) {
        quizSubmit.addEventListener('click', function() {
            const form = document.getElementById('quiz-form');
            const result = document.getElementById('quiz-result');
            
            if (form && result) {
                const formData = new FormData(form);
                let score = 0;
                let totalQuestions = 0;
                
                // Count selected symptoms (this is a basic implementation)
                for (let [key, value] of formData.entries()) {
                    if (value === 'yes') {
                        score++;
                    }
                    totalQuestions++;
                }
                
                let resultText = '';
                if (score === 0) {
                    resultText = '✅ Great! You don\'t seem to have common thyroid symptoms. Continue monitoring your health.';
                } else if (score <= 2) {
                    resultText = '⚠️ You have some symptoms that could be thyroid-related. Consider discussing with your healthcare provider.';
                } else {
                    resultText = '🚨 You have several symptoms that may indicate a thyroid issue. Please consult with a healthcare professional for proper evaluation.';
                }
                
                result.innerHTML = resultText;
                result.style.color = score <= 2 ? '#28a745' : '#dc3545';
            }
        });
    }

    // Add symptom click interactions
    const symptoms = document.querySelectorAll('.symptom');
    symptoms.forEach(symptom => {
        symptom.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
});
