// ================================
// NAVBAR TOGGLE - MOBILE MENU
// ================================

// Get DOM elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu when hamburger is clicked
hamburger.addEventListener('click', () => {
    // Toggle the 'active' class on both hamburger and nav menu
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    // Check if the click is outside both the hamburger and nav menu
    if (!e.target.closest('.navbar-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ================================
// SMOOTH SCROLLING
// ================================

// Add smooth scrolling behavior to all nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Scroll to the target element smoothly
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// SCROLL ANIMATIONS
// ================================

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class when element comes into view
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards, hobby cards, activity cards, and project cards
const animatedElements = document.querySelectorAll(
    '.skill-card, .hobby-card, .activity-card, .project-card'
);

animatedElements.forEach(element => {
    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Observe the element
    observer.observe(element);
});

// ================================
// NAVBAR SCROLL EFFECT
// ================================

// Change navbar style on scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add slight shadow on scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ================================
// ACTIVE NAV LINK ON SCROLL
// ================================

// Highlight the active nav link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.style.color = '';
            });
            
            // Add highlight to current section's link
            const activeLink = document.querySelector(
                `a[href="#${section.id}"]`
            );
            if (activeLink) {
                activeLink.style.color = 'var(--accent-color)';
            }
        }
    });
});

// ================================
// PROJECT BUTTON INTERACTIONS
// ================================

// Add click handlers for project buttons
const projectButtons = document.querySelectorAll('.project-btn');

projectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create a simple alert for now
        const projectTitle = button.parentElement.querySelector('h3').textContent;
        
        // You can replace this with a modal or redirect to project details page
        console.log(`Clicked on project: ${projectTitle}`);
        
        // Optional: Show a simple notification
        showNotification(`${projectTitle} - Coming Soon!`);
    });
});

// ================================
// UTILITY: NOTIFICATION FUNCTION
// ================================

/**
 * Display a temporary notification message
 * @param {string} message - The message to display
 * @param {number} duration - How long to show the notification (ms)
 */
function showNotification(message, duration = 2000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        font-weight: 500;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after duration
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ================================
// SCROLL TO TOP BUTTON (Optional)
// ================================

/**
 * Create and manage a "back to top" button
 * Uncomment to enable this feature
 */

// Create the back-to-top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--accent-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 999;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
    transition: all 0.3s ease;
`;

document.body.appendChild(backToTopButton);

// Show/hide back-to-top button on scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
        backToTopButton.style.alignItems = 'center';
        backToTopButton.style.justifyContent = 'center';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Scroll to top when button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effects for back-to-top button
backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'scale(1.1)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'scale(1)';
});

// ================================
// PAGE LOAD ANIMATION
// ================================

/**
 * Animate elements on page load
 */
window.addEventListener('load', () => {
    // Fade in the hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease';
    }
});

// ================================
// ACTIVE STATE CHANGES ON CLICK
// ================================

/**
 * Handle button and interactive element states
 */
document.addEventListener('click', (e) => {
    // Add click effect to buttons
    if (e.target.matches('button')) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            animation: rippleEffect 0.6s ease-out;
        `;
        
        // Position ripple at click point (if button has relative positioning)
        e.target.style.position = 'relative';
        e.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// ================================
// CONSOLE MESSAGE
// ================================

// Display a welcome message in the console
console.log(
    '%c Welcome to Kamruzzaman\'s Portfolio! ',
    'background: #ff6b6b; color: white; font-size: 16px; padding: 10px; border-radius: 5px;'
);
console.log(
    '%c Feel free to explore and check out the projects! 🚀 ',
    'background: #2d2d2d; color: #ff6b6b; font-size: 12px; padding: 8px;'
);
