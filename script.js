// Enhanced Mobile Navigation Toggle with Animations
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    let isMenuOpen = false;

    // Toggle mobile menu with animation
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;

        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open', isMenuOpen);

        // Animate menu items
        if (isMenuOpen) {
            navLinks.forEach((link, index) => {
                link.style.animation = `slideInRight 0.3s ease-out ${index * 0.1}s both`;
            });
        }

        // Update ARIA attributes for accessibility
        navToggle.setAttribute('aria-expanded', isMenuOpen);
        navMenu.setAttribute('aria-hidden', !isMenuOpen);
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (isMenuOpen && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            closeMenu();
        }
    });

    // Close menu function
    function closeMenu() {
        isMenuOpen = false;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', false);
        navMenu.setAttribute('aria-hidden', true);
    }

    // Enhanced keyboard navigation
    navToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;

        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced Navbar Scroll Effects with Throttling
let isScrolling = false;

function updateNavbar() {
    const navbar = document.getElementById('navbar');
    const scrolled = window.scrollY > 50;

    navbar.classList.toggle('scrolled', scrolled);

    // Update navbar background and shadow smoothly
    if (scrolled) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.12)';
        navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
        navbar.style.backdropFilter = 'blur(15px) saturate(180%)';
    }

    isScrolling = false;
}

window.addEventListener('scroll', function() {
    if (!isScrolling) {
        requestAnimationFrame(updateNavbar);
        isScrolling = true;
    }
}, { passive: true });

// Enhanced Prayer Form Submission with Better UX
function initPrayerForm(form) {
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const prayerText = formData.get('prayer');
        const name = formData.get('name') || 'Anonymous';
        const email = formData.get('email');
        const shareWithChain = formData.get('share');

        // Enhanced validation
        if (!prayerText.trim()) {
            showNotification('Please enter your prayer request.', 'error');
            this.querySelector('[name="prayer"]').focus();
            return;
        }

        if (prayerText.trim().length < 10) {
            showNotification('Please provide more details in your prayer request.', 'warning');
            return;
        }

        // Email validation if provided
        if (email && !isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            this.querySelector('[name="email"]').focus();
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show enhanced loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        // Simulate form submission with realistic timing
        setTimeout(() => {
            showPrayerSuccessModal();
            this.reset();

            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');

            // Add success animation to form
            this.classList.add('submitted');
            setTimeout(() => this.classList.remove('submitted'), 2000);

        }, 1200 + Math.random() * 800); // Variable timing for realism
    });
}

// Initialize prayer forms on page load
document.addEventListener('DOMContentLoaded', function() {
    const prayerForms = document.querySelectorAll('#prayer-form, .prayer-form');
    prayerForms.forEach(form => initPrayerForm(form));
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Prayer Success Modal
function showPrayerSuccessModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'prayer-modal-overlay';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-labelledby', 'modal-title');

    // Create modal content
    modalOverlay.innerHTML = `
        <div class="prayer-modal">
            <button class="modal-close" aria-label="Close modal">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2 id="modal-title">Prayer Request Received</h2>
            <p>Thank you for sharing your prayer needs with us. Our prayer team will lift you up in prayer.</p>
            <p class="modal-verse">"The prayer of a righteous person is powerful and effective."<br><em>- James 5:16</em></p>
            <button class="btn btn-primary modal-btn">Close</button>
        </div>
    `;

    // Styles for modal
    const style = document.createElement('style');
    style.textContent = `
        .prayer-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            padding: 1rem;
            opacity: 0;
            animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }

        .prayer-modal {
            background: white;
            border-radius: 20px;
            padding: 3rem 2.5rem;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
            position: relative;
            transform: scale(0.9) translateY(20px);
            animation: modalSlideIn 0.4s ease-out 0.1s forwards;
        }

        @keyframes modalSlideIn {
            to {
                transform: scale(1) translateY(0);
            }
        }

        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #666;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
        }

        .modal-close:hover {
            background: rgba(228, 0, 43, 0.1);
            color: #e4002b;
            transform: rotate(90deg);
        }

        .modal-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            animation: iconPop 0.6s ease-out 0.3s both;
        }

        @keyframes iconPop {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }

        .modal-icon i {
            font-size: 2.5rem;
            color: white;
        }

        .prayer-modal h2 {
            color: var(--brand-deep-purple, #3c1053);
            margin-bottom: 1rem;
            font-size: 1.75rem;
            animation: fadeInUp 0.5s ease-out 0.4s both;
        }

        .prayer-modal > p {
            color: #666;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            animation: fadeInUp 0.5s ease-out 0.5s both;
        }

        .modal-verse {
            background: linear-gradient(135deg, rgba(228, 0, 43, 0.05) 0%, rgba(212, 175, 55, 0.05) 100%);
            padding: 1.25rem;
            border-radius: 12px;
            border-left: 4px solid #e4002b;
            font-style: italic;
            color: #555;
            margin: 1.5rem 0 !important;
            animation: fadeInUp 0.5s ease-out 0.6s both !important;
        }

        .modal-verse em {
            display: block;
            margin-top: 0.5rem;
            font-size: 0.9rem;
            color: #888;
        }

        .modal-btn {
            margin-top: 1rem;
            min-width: 150px;
            animation: fadeInUp 0.5s ease-out 0.7s both;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(15px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 480px) {
            .prayer-modal {
                padding: 2rem 1.5rem;
            }

            .prayer-modal h2 {
                font-size: 1.5rem;
            }

            .modal-icon {
                width: 70px;
                height: 70px;
            }

            .modal-icon i {
                font-size: 2rem;
            }
        }
    `;

    // Add style if not already present
    if (!document.getElementById('prayer-modal-styles')) {
        style.id = 'prayer-modal-styles';
        document.head.appendChild(style);
    }

    // Add modal to page
    document.body.appendChild(modalOverlay);

    // Focus trap for accessibility
    const modalCloseBtn = modalOverlay.querySelector('.modal-close');
    const modalBtn = modalOverlay.querySelector('.modal-btn');

    setTimeout(() => modalCloseBtn.focus(), 400);

    // Close modal function
    function closeModal() {
        modalOverlay.style.opacity = '0';
        const modal = modalOverlay.querySelector('.prayer-modal');
        modal.style.transform = 'scale(0.9) translateY(20px)';

        setTimeout(() => {
            if (modalOverlay.parentNode) {
                modalOverlay.remove();
            }
        }, 300);
    }

    // Event listeners
    modalCloseBtn.addEventListener('click', closeModal);
    modalBtn.addEventListener('click', closeModal);

    // Close on overlay click
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close on Escape key
    function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    }

    document.addEventListener('keydown', handleEscape);

    // Tab trap for accessibility
    modalOverlay.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = [modalCloseBtn, modalBtn];
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// Enhanced Notification System with Better UX
function showNotification(message, type = 'info') {
    // Remove existing notifications of the same type
    const existingNotifications = document.querySelectorAll(`.notification-${type}`);
    existingNotifications.forEach(notification => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Enhanced notification with icons
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };

    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="${icons[type]}"></i>
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Enhanced styles with better design
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 420px;
        min-width: 300px;
        opacity: 0;
        transform: translateX(100%) scale(0.95);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;

    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;

    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        font-size: 1.25rem;
        opacity: 0.9;
    `;

    const message_el = notification.querySelector('.notification-message');
    message_el.style.cssText = `
        flex: 1;
        font-weight: 500;
        line-height: 1.4;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        opacity: 0.8;
    `;

    closeBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        this.style.opacity = '1';
    });

    closeBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
        this.style.opacity = '0.8';
    });

    document.body.appendChild(notification);

    // Animate in with better easing
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0) scale(1)';
    }, 10);

    // Close functionality with keyboard support
    function closeNotification() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%) scale(0.95)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }

    closeBtn.addEventListener('click', closeNotification);
    closeBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeNotification();
        }
    });

    // Auto remove with longer duration for success messages
    const duration = type === 'success' ? 6000 : type === 'error' ? 8000 : 5000;
    setTimeout(() => {
        if (document.body.contains(notification)) {
            closeNotification();
        }
    }, duration);

    // Return notification element for further manipulation if needed
    return notification;
}

// Enhanced Intersection Observer for Advanced Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '100px 0px 100px 0px'
};

const animationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const animationType = element.dataset.animation || 'fade-in-up';
            const delay = element.dataset.delay || 0;

            setTimeout(() => {
                element.classList.add('animate');
                element.classList.add(animationType);

                // Add stagger effect for grouped elements
                if (element.classList.contains('connect-card') ||
                    element.classList.contains('resource-card') ||
                    element.classList.contains('value-item')) {
                    const siblings = element.parentElement.children;
                    Array.from(siblings).forEach((sibling, index) => {
                        if (sibling !== element) {
                            setTimeout(() => {
                                sibling.classList.add('animate');
                            }, index * 100);
                        }
                    });
                }
            }, delay);

            // Unobserve after animation to improve performance
            animationObserver.unobserve(element);
        }
    });
}, observerOptions);

// Section Header Animation Observer
const headerObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            headerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '150px 0px 150px 0px' });

// Initialize animations on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Add animate-on-scroll class to elements
    const animateElements = document.querySelectorAll('.connect-card, .serve-card, .resource-card, .value-item, .service-card, .about-text, .about-image');
    animateElements.forEach((element, index) => {
        element.classList.add('animate-on-scroll');
        element.dataset.delay = index * 100;
        animationObserver.observe(element);
    });

    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        headerObserver.observe(header);
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loading');
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// Form Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');

    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value.trim()) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Contact Information Click-to-Call/Email
document.addEventListener('DOMContentLoaded', function() {
    // Make phone numbers clickable
    const phoneNumbers = document.querySelectorAll('p:contains("(207)")');
    phoneNumbers.forEach(p => {
        if (p.textContent.includes('(207)')) {
            p.style.cursor = 'pointer';
            p.addEventListener('click', function() {
                window.location.href = 'tel:+12075550123';
            });
        }
    });

    // Make email addresses clickable
    const emailElements = document.querySelectorAll('p:contains("@")');
    emailElements.forEach(p => {
        if (p.textContent.includes('@')) {
            p.style.cursor = 'pointer';
            p.addEventListener('click', function() {
                window.location.href = 'mailto:info@umcminot.org';
            });
        }
    });
});

// Social Media Link Tracking
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track social media clicks (replace with actual analytics)
            console.log('Social media clicked:', this.getAttribute('aria-label'));
        });
    });
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });
});

// This is now handled in the main initialization section above

// Enhanced Accessibility and User Experience
document.addEventListener('DOMContentLoaded', function() {
    // Add skip to main content link with enhanced styling
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.setAttribute('tabindex', '1');

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Enhanced keyboard navigation with proper focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu on Escape
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');

            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
                navToggle.focus();
            }

            // Close notifications on Escape
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            });
        }
    });

    // Enhance form accessibility
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // Add proper labels if missing
            if (!input.getAttribute('aria-label') && !input.closest('label')) {
                const placeholder = input.getAttribute('placeholder');
                if (placeholder) {
                    input.setAttribute('aria-label', placeholder);
                }
            }

            // Enhanced focus management
            input.addEventListener('focus', function() {
                this.closest('.form-row, .prayer-form')?.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                this.closest('.form-row, .prayer-form')?.classList.remove('focused');
            });
        });
    });

    // Improve button accessibility
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            const icon = button.querySelector('i');
            if (icon) {
                const iconClass = icon.className;
                if (iconClass.includes('menu')) button.setAttribute('aria-label', 'Toggle navigation menu');
                if (iconClass.includes('close')) button.setAttribute('aria-label', 'Close');
            }
        }
    });

    // Add loading states for better UX
    const asyncButtons = document.querySelectorAll('[data-async]');
    asyncButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.classList.add('loading');
                this.disabled = true;

                // Re-enable after 2 seconds (adjust as needed)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 2000);
            }
        });
    });
});

// Event Calendar Placeholder (for future implementation)
function loadEvents() {
    // Placeholder for event calendar integration
    const events = [
        {
            title: "Sunday Worship Service",
            date: "Every Sunday",
            time: "10:00 AM",
            recurring: true
        },
        {
            title: "Youth Group",
            date: "Every Wednesday",
            time: "6:30 PM",
            recurring: true
        },
        {
            title: "Community Dinner",
            date: "First Saturday",
            time: "5:00 PM",
            recurring: true
        }
    ];

    return events;
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send to error tracking service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send to error tracking service
});

// Performance Monitoring and Error Handling
function initPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('LCP:', entry.startTime);
            }
        }).observe({entryTypes: ['largest-contentful-paint']});

        // First Input Delay
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
        }).observe({entryTypes: ['first-input']});

        // Cumulative Layout Shift
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    console.log('CLS:', entry.value);
                }
            }
        }).observe({entryTypes: ['layout-shift']});
    }
}

// Optimize scroll performance with passive listeners
function addPassiveScrollListeners() {
    const scrollElements = document.querySelectorAll('[data-scroll]');
    scrollElements.forEach(element => {
        element.addEventListener('scroll', function() {
            // Scroll logic here
        }, { passive: true });
    });
}

// Touch gesture support for mobile
function initTouchGestures() {
    const cards = document.querySelectorAll('.connect-card, .serve-card, .resource-card');

    cards.forEach(card => {
        let startY = 0;
        let startTime = 0;

        card.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
            startTime = Date.now();
            this.classList.add('mobile-touch');
        }, { passive: true });

        card.addEventListener('touchend', function(e) {
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();
            const deltaY = Math.abs(endY - startY);
            const deltaTime = endTime - startTime;

            // Quick tap detection
            if (deltaY < 10 && deltaTime < 200) {
                const link = this.querySelector('a, .btn');
                if (link) {
                    link.click();
                }
            }

            this.classList.remove('mobile-touch');
        }, { passive: true });
    });
}

// Parallax scrolling for hero section
function initParallaxScrolling() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    // Use requestAnimationFrame for smooth animations
    let ticking = false;

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// Enhanced Image Carousel with Touch Support
class ChurchCarousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.slides = container.querySelectorAll('.carousel-slide');
        this.indicators = container.querySelectorAll('.carousel-indicator');
        this.prevBtn = container.querySelector('.carousel-btn-prev');
        this.nextBtn = container.querySelector('.carousel-btn-next');

        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;

        // Touch gesture properties
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        this.threshold = 50;

        this.init();
    }

    init() {
        this.addEventListeners();
        this.startAutoPlay();
        this.updateSlidePosition();
    }

    addEventListeners() {
        // Button controls
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Indicator controls
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Touch events
        this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
        this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

        // Mouse events for desktop drag
        this.track.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.track.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.track.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        this.track.addEventListener('mouseleave', (e) => this.handleMouseUp(e));

        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());

        // Visibility API for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else {
                this.startAutoPlay();
            }
        });
    }

    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.isDragging = true;
        this.pauseAutoPlay();
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;
        this.currentX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        if (!this.isDragging) return;

        const deltaX = this.currentX - this.startX;

        if (Math.abs(deltaX) > this.threshold) {
            if (deltaX > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        }

        this.isDragging = false;
        this.startAutoPlay();
    }

    handleMouseDown(e) {
        e.preventDefault();
        this.startX = e.clientX;
        this.isDragging = true;
        this.track.style.cursor = 'grabbing';
        this.pauseAutoPlay();
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        this.currentX = e.clientX;
    }

    handleMouseUp(e) {
        if (!this.isDragging) return;

        const deltaX = this.currentX - this.startX;

        if (Math.abs(deltaX) > this.threshold) {
            if (deltaX > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        }

        this.isDragging = false;
        this.track.style.cursor = 'grab';
        this.startAutoPlay();
    }

    handleKeydown(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case ' ':
            case 'Spacebar':
                e.preventDefault();
                this.toggleAutoPlay();
                break;
        }
    }

    prevSlide() {
        if (this.isAnimating) return;
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlidePosition();
    }

    nextSlide() {
        if (this.isAnimating) return;
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlidePosition();
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        this.currentSlide = index;
        this.updateSlidePosition();
    }

    updateSlidePosition() {
        this.isAnimating = true;

        const translateX = -this.currentSlide * (100 / this.totalSlides);
        this.track.style.transform = `translateX(${translateX}%)`;

        // Update slide states
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        // Reset animation flag
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    startAutoPlay() {
        this.pauseAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    toggleAutoPlay() {
        if (this.autoPlayInterval) {
            this.pauseAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        initParallaxScrolling();
    }

    initPerformanceMonitoring();
    addPassiveScrollListeners();
    initTouchGestures();

    // Add body class for JavaScript-enabled styling
    document.body.classList.add('js-enabled');

    // Initialize Church Carousel
    const carouselContainer = document.getElementById('church-carousel');
    if (carouselContainer) {
        new ChurchCarousel(carouselContainer.parentElement);
    }

    console.log('🎉 UMC Minot enhanced website loaded successfully!');
    console.log('✨ Features: Enhanced animations, accessibility, performance monitoring, image carousel');
});

// Service Worker registration with error handling
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('✅ ServiceWorker registration successful:', registration.scope);
            })
            .catch(function(err) {
                console.log('❌ ServiceWorker registration failed:', err);
            });
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        isValidEmail,
        initPerformanceMonitoring,
        initTouchGestures
    };
}