/**
 * VRUUX CMP Configuration
 * Customize your GDPR cookie consent settings here
 */

window.VRUUX_CMP_CONFIG = {
    // Google Analytics ID
    gaId: 'G-D92G25M5GQ',
    
    // Microsoft Clarity ID (replace with your actual ID)
    clarityId: 'YOUR_CLARITY_ID',
    
    // Cookie consent settings
    cookie: {
        name: 'yakdoo_cookie_consent',
        expiryDays: 365
    },
    
    // Banner settings
    banner: {
        text: 'We use cookies to enhance your experience and analyze site usage. By clicking "Accept All", you consent to our use of cookies for analytics and site optimization. You can customize your preferences or learn more in our <a href="privacypolicy.html">Privacy Policy</a>.',
        acceptAllText: 'Accept All',
        acceptNecessaryText: 'Necessary Only',
        customizeText: 'Customize',
        closeText: 'Close'
    },
    
    // Cookie categories
    categories: {
        necessary: {
            title: 'Necessary Cookies',
            description: 'These cookies are essential for the website to function properly. They cannot be disabled.',
            required: true
        },
        analytics: {
            title: 'Analytics Cookies',
            description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
            required: false
        },
        marketing: {
            title: 'Marketing Cookies',
            description: 'These cookies are used to track visitors across websites to display relevant advertisements.',
            required: false
        }
    },
    
    // Colors (matches your orange theme)
    colors: {
        primary: '#ff6600',
        secondary: '#ffffff',
        text: '#000000',
        background: '#ffffff',
        border: '#e0e0e0'
    },
    
    // GTM settings
    gtm: {
        enabled: true,
        containerId: 'GTM-XXXXXXX' // Replace with your GTM container ID
    },
    
    // Third-party resources (managed through GTM)
    thirdParty: {
        note: 'Third-party resources are now managed through GTM for better control and consent management'
    },
    
    // Form handling (managed through GTM)
    forms: {
        note: 'Form tracking and consent management are now handled through GTM for better integration'
    },
    
    // E-commerce (managed through GTM)
    ecommerce: {
        note: 'E-commerce tracking is now managed through GTM for better integration with GA4'
    },
    
    // Dashboard tracking (managed through GTM)
    dashboards: {
        note: 'Dashboard tracking is now managed through GTM for better integration with analytics'
    },
    
    // Analytics settings (managed through GTM)
    analytics: {
        note: 'All analytics are now managed through GTM for better integration and consent management'
    }
}; 