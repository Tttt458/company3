document.addEventListener('DOMContentLoaded', function() {
    // Burger menu toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu.classList.contains('show') && !event.target.closest('nav') && !event.target.closest('.burger-menu')) {
            navMenu.classList.remove('show');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    
    function updateHeaderClass() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    
    // Initial check
    updateHeaderClass();
    
    // Add scroll event listener
    window.addEventListener('scroll', updateHeaderClass);

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };
    
    // Run on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Account page tabs
    const tabButtons = document.querySelectorAll('.account-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Create error message if doesn't exist
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMessage = document.createElement('p');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'Это поле обязательно для заполнения';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                        field.nextElementSibling.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // Image gallery (for Projects page)
    const projectItems = document.querySelectorAll('.project-item');
    
    if (projectItems.length > 0) {
        projectItems.forEach(item => {
            item.addEventListener('click', function() {
                const imageSrc = this.querySelector('img').getAttribute('src');
                const title = this.querySelector('h3').textContent;
                
                // Create modal
                const modal = document.createElement('div');
                modal.classList.add('gallery-modal');
                modal.innerHTML = `
                    <div class="gallery-modal-content">
                        <span class="close-modal">&times;</span>
                        <h3>${title}</h3>
                        <img src="${imageSrc}" alt="${title}">
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Close modal on click
                modal.querySelector('.close-modal').addEventListener('click', function() {
                    modal.remove();
                });
                
                // Close modal when clicking outside the content
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });
            });
        });
    }
});