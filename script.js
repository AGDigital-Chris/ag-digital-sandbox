// GitHub Pages Showcase - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Add scroll effects
    initScrollEffects();
    
    // Initialize project animations
    initProjectAnimations();
    
    // Add typing effect to hero code block
    initTypingEffect();
    
    // Initialize mobile menu
    initMobileMenu();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects for header and sections
function initScrollEffects() {
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    
    // Header background on scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe project cards and sections
    const projectCards = document.querySelectorAll('.project-card');
    const aboutSection = document.querySelector('.about-text');
    // const contactSection = document.querySelector('.contact');
    
    [...projectCards, aboutSection].forEach(el => {
        if (el) observer.observe(el);
    });
}

// Project card hover effects and animations
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover effect for project cards
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect for demo buttons
        const demoButtons = card.querySelectorAll('.btn-primary');
        demoButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Typing effect for hero code block
function initTypingEffect() {
    const codeBlock = document.querySelector('.code-block');
    if (!codeBlock) return;
    
    const codeLines = codeBlock.querySelectorAll('.code-line');
    let currentLine = 0;
    
    function typeNextLine() {
        if (currentLine >= codeLines.length) {
            // Reset after all lines are typed
            setTimeout(() => {
                currentLine = 0;
                codeLines.forEach(line => {
                    line.style.opacity = '0.3';
                });
                typeNextLine();
            }, 2000);
            return;
        }
        
        const line = codeLines[currentLine];
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
        
        // Animate the line appearing
        line.style.transition = 'all 0.5s ease';
        line.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            line.style.transform = 'translateX(0)';
            currentLine++;
            setTimeout(typeNextLine, 800);
        }, 50);
    }
    
    // Initialize with all lines hidden
    codeLines.forEach(line => {
        line.style.opacity = '0.3';
        line.style.transform = 'translateX(20px)';
    });
    
    // Start typing effect after a delay
    setTimeout(typeNextLine, 1000);
}

// Mobile menu functionality
function initMobileMenu() {
    // Create mobile menu button
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Create mobile menu button
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--primary-color);
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    nav.appendChild(mobileMenuButton);
    
    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-open');
        this.innerHTML = navLinks.classList.contains('mobile-open') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (!isMobile()) {
            navLinks.classList.remove('mobile-open');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Add mobile styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-button {
                display: block !important;
            }
            
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .nav-links.mobile-open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-links li {
                margin: 0.5rem 0;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
}

// Utility function for smooth animations
function animateValue(element, start, end, duration, suffix = '') {
    const startTimestamp = performance.now();
    
    function step(timestamp) {
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

// Add parallax effect to hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (!hero || !heroVisual) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Initialize parallax on load
window.addEventListener('load', initParallaxEffect);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded styles
    const loadedStyles = document.createElement('style');
    loadedStyles.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadedStyles);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileButton = document.querySelector('.mobile-menu-button');
        
        if (navLinks && navLinks.classList.contains('mobile-open')) {
            navLinks.classList.remove('mobile-open');
            if (mobileButton) {
                mobileButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    }
});

// Add error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Initialize all safe elements
document.addEventListener('DOMContentLoaded', function() {
    // Check if all required elements exist
    const requiredElements = [
        '.header',
        '.nav',
        '.nav-links',
        '.hero',
        '.projects',
        '.about'
    ];
    
    const missingElements = requiredElements.filter(selector => 
        !safeQuerySelector(selector)
    );
    
    if (missingElements.length > 0) {
        console.warn('Some required elements are missing:', missingElements);
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
