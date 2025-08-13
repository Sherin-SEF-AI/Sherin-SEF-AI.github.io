// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
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

// Fade in animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Uncomment the following lines if you want a typing effect on the hero title
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 150);
// });

// Form validation (if you add a contact form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});



// Preloader (optional)
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});



// Analytics Tracking Functions
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

function trackPageView(pageTitle) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: pageTitle,
            page_location: window.location.href
        });
    }
}

// Track section views
function trackSectionView(sectionName) {
    trackEvent('section_view', {
        section_name: sectionName,
        page_location: window.location.href
    });
}

// Track external link clicks
function trackExternalLink(url, linkText) {
    trackEvent('external_link_click', {
        link_url: url,
        link_text: linkText,
        page_location: window.location.href
    });
}

// Track project clicks
function trackProjectClick(projectName, projectUrl) {
    trackEvent('project_click', {
        project_name: projectName,
        project_url: projectUrl,
        page_location: window.location.href
    });
}

// Track social media clicks
function trackSocialClick(platform, url) {
    trackEvent('social_click', {
        social_platform: platform,
        social_url: url,
        page_location: window.location.href
    });
}

// Track contact interactions
function trackContactInteraction(type, value) {
    trackEvent('contact_interaction', {
        interaction_type: type,
        interaction_value: value,
        page_location: window.location.href
    });
}

// Initialize analytics tracking
document.addEventListener('DOMContentLoaded', () => {
    // Track initial page view
    trackPageView(document.title);
    
    // Track section views on scroll
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.getAttribute('id');
                trackSectionView(sectionName);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Track external link clicks
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const url = link.href;
            const linkText = link.textContent.trim();
            
            // Don't track if it's the same domain
            if (!url.includes(window.location.hostname)) {
                trackExternalLink(url, linkText);
            }
        });
    });
    
    // Track project link clicks
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const projectCard = link.closest('.project-card');
            const projectTitle = projectCard.querySelector('.project-title').textContent;
            const projectUrl = link.href;
            trackProjectClick(projectTitle, projectUrl);
        });
    });
    
    // Track social media clicks
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = link.getAttribute('title') || 'unknown';
            const url = link.href;
            trackSocialClick(platform, url);
        });
    });
    
    // Track contact email clicks
    const contactEmail = document.querySelector('.contact-email a');
    if (contactEmail) {
        contactEmail.addEventListener('click', (e) => {
            trackContactInteraction('email_click', contactEmail.href);
        });
    }
    
    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const navText = link.textContent.trim();
            trackEvent('navigation_click', {
                nav_item: navText,
                nav_url: link.href,
                page_location: window.location.href
            });
        });
    });
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = button.textContent.trim();
            const buttonClass = button.className;
            trackEvent('button_click', {
                button_text: buttonText,
                button_class: buttonClass,
                page_location: window.location.href
            });
        });
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                trackEvent('scroll_depth', {
                    scroll_percentage: maxScroll,
                    page_location: window.location.href
                });
            }
        }
    });
    
    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', {
            time_seconds: timeOnPage,
            page_location: window.location.href
        });
    });
}); 