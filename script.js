// ============================================
// Navigation
// ============================================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// Scroll Effects (single listener)
// ============================================

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    // Navbar shadow
    if (navbar) {
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// ============================================
// Scroll Animations (IntersectionObserver)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Staggered card reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay for cards within grids
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = Array.from(parent.children);
                    const idx = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${idx * 0.08}s`;
                }
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    // Observe ALL elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-in-left, .slide-in-right, .scale-in, ' +
        '.project-card, .achievement-card, .company-card, .video-card, ' +
        '.post-card, .news-card, .resource-category, .publication-card, .social-card'
    );

    animatedElements.forEach(el => {
        // If it doesn't have any animation class, add fade-in
        if (!el.classList.contains('fade-in') &&
            !el.classList.contains('slide-in-left') &&
            !el.classList.contains('slide-in-right') &&
            !el.classList.contains('scale-in')) {
            el.classList.add('fade-in');
        }
        observer.observe(el);
    });

    // Page load fade-in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// ============================================
// Back to Top
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ============================================
// Video Modal
// ============================================

function openVideoModal(videoId, title) {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-modal-iframe');
    const modalTitle = document.getElementById('video-modal-title');
    if (!modal || !iframe) return;

    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    if (modalTitle) modalTitle.textContent = title;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal(event) {
    const modal = document.getElementById('video-modal');
    if (event && event.target !== modal &&
        !event.target.classList.contains('video-modal-close') &&
        event.target.textContent !== '×') {
        return;
    }
    const iframe = document.getElementById('video-modal-iframe');
    if (modal) modal.classList.remove('open');
    if (iframe) iframe.src = '';
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('video-modal');
        if (modal && modal.classList.contains('open')) {
            closeVideoModal({ target: modal });
        }
    }
});