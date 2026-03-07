// Google Analytics 4 — Extended Configuration
// GA4 is initialized in index.html; this file adds custom event tracking.

(function () {
    // Guard: only run if gtag is available
    if (typeof gtag !== 'function') return;

    // Track outbound link clicks (GitHub, LinkedIn, PyPI, etc.)
    document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href]');
        if (!link) return;
        var href = link.getAttribute('href');
        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
            gtag('event', 'outbound_click', {
                event_category: 'outbound',
                event_label: href,
                transport_type: 'beacon'
            });
        }
    });

    // Track section views via IntersectionObserver
    var sections = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window && sections.length) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    gtag('event', 'section_view', {
                        event_category: 'engagement',
                        event_label: entry.target.getAttribute('id')
                    });
                }
            });
        }, { threshold: 0.4 });

        sections.forEach(function (s) { sectionObserver.observe(s); });
    }

    // Track video modal opens
    window._originalOpenVideoModal = window.openVideoModal;
    window.openVideoModal = function (videoId, title) {
        gtag('event', 'video_play', {
            event_category: 'videos',
            event_label: title,
            video_id: videoId
        });
        if (typeof window._originalOpenVideoModal === 'function') {
            window._originalOpenVideoModal(videoId, title);
        }
    };
})();
