// Analytics Configuration File
// This file contains all analytics-related configuration and helper functions

const AnalyticsConfig = {
    // Google Analytics 4 Configuration
    GA4: {
        measurementId: 'G-D5H3C7Y2V0', // Your GA4 Measurement ID
        debugMode: false, // Set to true for development/testing
        anonymizeIp: true, // Anonymize IP addresses for GDPR compliance
        enableEnhancedEcommerce: false, // Set to true if you plan to add e-commerce features
        enableRemarketing: false, // Set to true if you plan to use remarketing
        enableDemographics: true, // Enable demographics and interests reporting
        enableAdPersonalization: false, // Set to true if you plan to use ad personalization
    },
    
    // Custom Events Configuration
    events: {
        // Page interaction events
        pageView: {
            enabled: true,
            trackScrollDepth: true,
            trackTimeOnPage: true,
            trackSectionViews: true
        },
        
        // User interaction events
        clicks: {
            enabled: true,
            trackExternalLinks: true,
            trackProjectClicks: true,
            trackSocialClicks: true,
            trackNavigationClicks: true,
            trackButtonClicks: true,
            trackContactInteractions: true
        },
        
        // Engagement events
        engagement: {
            enabled: true,
            trackScrollDepth: true,
            trackTimeOnPage: true,
            trackFormInteractions: false, // Set to true if you add forms
            trackVideoInteractions: false // Set to true if you add videos
        }
    },
    
    // Privacy and Compliance
    privacy: {
        respectDoNotTrack: true,
        anonymizeIp: true,
        enableConsentMode: false, // Set to true for GDPR compliance
        cookieConsent: {
            enabled: false, // Set to true if you need cookie consent
            bannerText: 'This website uses cookies to analyze traffic and improve your experience.',
            acceptText: 'Accept',
            declineText: 'Decline'
        }
    },
    
    // Performance monitoring
    performance: {
        enabled: true,
        trackPageLoadTime: true,
        trackResourceLoadTime: false,
        trackUserTiming: true
    }
};

// Analytics Helper Functions
const AnalyticsHelpers = {
    // Initialize analytics with configuration
    init: function() {
        if (typeof gtag === 'undefined') {
            console.warn('Google Analytics not loaded. Please check your GA4 configuration.');
            return;
        }
        
        // Configure GA4 with settings
        gtag('config', AnalyticsConfig.GA4.measurementId, {
            anonymize_ip: AnalyticsConfig.GA4.anonymizeIp,
            allow_google_signals: AnalyticsConfig.GA4.enableAdPersonalization,
            allow_ad_personalization_signals: AnalyticsConfig.GA4.enableAdPersonalization,
            debug_mode: AnalyticsConfig.GA4.debugMode
        });
        
        console.log('Analytics initialized with configuration:', AnalyticsConfig);
    },
    
    // Enhanced event tracking with configuration checks
    trackEvent: function(eventName, parameters = {}) {
        if (!AnalyticsConfig.events.clicks.enabled) return;
        
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...parameters,
                timestamp: new Date().toISOString(),
                user_agent: navigator.userAgent,
                screen_resolution: `${screen.width}x${screen.height}`,
                language: navigator.language
            });
        }
    },
    
    // Track page performance
    trackPagePerformance: function() {
        if (!AnalyticsConfig.performance.enabled) return;
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
                
                this.trackEvent('page_performance', {
                    page_load_time: Math.round(loadTime),
                    dom_content_loaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
                    first_paint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
                    first_contentful_paint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
                });
            }, 0);
        });
    },
    
    // Track user engagement metrics
    trackEngagement: function() {
        if (!AnalyticsConfig.events.engagement.enabled) return;
        
        let engagementStartTime = Date.now();
        let maxScrollDepth = 0;
        let isEngaged = false;
        
        // Track scroll depth
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScrollDepth) {
                maxScrollDepth = scrollPercent;
                
                // Track engagement milestones
                if (scrollPercent >= 25 && !isEngaged) {
                    isEngaged = true;
                    this.trackEvent('user_engaged', {
                        engagement_trigger: 'scroll_25_percent',
                        time_to_engagement: Math.round((Date.now() - engagementStartTime) / 1000)
                    });
                }
            }
        });
        
        // Track time on page
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - engagementStartTime) / 1000);
            this.trackEvent('session_end', {
                time_on_page: timeOnPage,
                max_scroll_depth: maxScrollDepth,
                was_engaged: isEngaged
            });
        });
    },
    
    // Track user behavior patterns
    trackUserBehavior: function() {
        // Track mouse movements (heatmap-like data)
        let mouseMovements = 0;
        let lastMouseEvent = Date.now();
        
        document.addEventListener('mousemove', () => {
            mouseMovements++;
            lastMouseEvent = Date.now();
        });
        
        // Track clicks
        document.addEventListener('click', (e) => {
            this.trackEvent('user_click', {
                element_type: e.target.tagName,
                element_class: e.target.className,
                element_id: e.target.id,
                mouse_movements: mouseMovements,
                time_since_last_mouse: Date.now() - lastMouseEvent
            });
        });
        
        // Track form interactions (if forms are added later)
        document.addEventListener('focus', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                this.trackEvent('form_interaction', {
                    interaction_type: 'focus',
                    element_type: e.target.type || e.target.tagName,
                    element_name: e.target.name || 'unnamed'
                });
            }
        });
    },
    
    // Track device and browser information
    trackDeviceInfo: function() {
        const deviceInfo = {
            user_agent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screen_resolution: `${screen.width}x${screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`,
            color_depth: screen.colorDepth,
            pixel_ratio: window.devicePixelRatio,
            connection_type: navigator.connection ? navigator.connection.effectiveType : 'unknown',
            cookie_enabled: navigator.cookieEnabled,
            do_not_track: navigator.doNotTrack
        };
        
        this.trackEvent('device_info', deviceInfo);
    },
    
    // Track custom business events
    trackBusinessEvent: function(eventType, data = {}) {
        const businessEvents = {
            project_view: 'User viewed a project',
            contact_initiated: 'User initiated contact',
            resource_download: 'User downloaded a resource',
            social_engagement: 'User engaged with social content',
            newsletter_signup: 'User signed up for newsletter',
            consultation_request: 'User requested consultation'
        };
        
        this.trackEvent('business_event', {
            event_type: eventType,
            event_description: businessEvents[eventType] || 'Custom business event',
            ...data
        });
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnalyticsConfig, AnalyticsHelpers };
} else {
    window.AnalyticsConfig = AnalyticsConfig;
    window.AnalyticsHelpers = AnalyticsHelpers;
} 