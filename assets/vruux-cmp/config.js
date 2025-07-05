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
    
    // Auto-inject settings
    autoInject: {
        css: true,
        js: true,
        ga: true,
        clarity: true,
        thirdParty: true,
        formHandler: true,
        ecommerceHandler: true,
        dashboardHandler: true
    },
    
    // Third-party resource settings
    thirdParty: {
        youtube: {
            enabled: true,
            category: 'marketing', // or 'analytics'
            privacyEnhanced: true
        },
        socialMedia: {
            facebook: { enabled: true, category: 'marketing' },
            twitter: { enabled: true, category: 'marketing' },
            instagram: { enabled: true, category: 'marketing' },
            linkedin: { enabled: true, category: 'marketing' }
        },
        services: {
            googleMaps: { enabled: true, category: 'necessary' },
            vimeo: { enabled: true, category: 'marketing' },
            spotify: { enabled: true, category: 'marketing' },
            calendly: { enabled: true, category: 'necessary' }
        }
    },
    
    // Form handling settings
    forms: {
        // Consent tracking for form submissions
        trackConsent: true,
        
        // Required consent categories for form submission
        requiredConsent: ['necessary'],
        
        // Optional consent categories
        optionalConsent: ['analytics', 'marketing'],
        
        // Form data retention settings
        dataRetention: {
            days: 365,
            anonymize: true,
            exportable: true
        },
        
        // Custom form selectors (add your form classes/IDs here)
        formSelectors: [
            'form[data-gdpr-form]',
            '.contact-form',
            '.enquiry-form',
            '.feedback-form',
            '#contactForm',
            '#enquiryForm'
        ]
    },
    
    // E-commerce settings
    ecommerce: {
        // Enable e-commerce features
        enabled: true,
        
        // Purchase tracking settings
        trackPurchases: true,
        trackCart: true,
        trackProductViews: true,
        
        // Store platforms
        platforms: {
            shopify: { enabled: true, category: 'marketing' },
            zohoCommerce: { enabled: true, category: 'marketing' },
            woocommerce: { enabled: true, category: 'marketing' },
            bigcommerce: { enabled: true, category: 'marketing' },
            squarespace: { enabled: true, category: 'marketing' },
            wix: { enabled: true, category: 'marketing' }
        },
        
        // Currency and region settings
        currency: 'USD',
        region: 'US',
        
        // Data retention for e-commerce data
        dataRetention: {
            purchaseHistory: 365, // days
            cartData: 30, // days
            productViews: 90 // days
        }
    },
    
    // Dashboard settings
    dashboards: {
        // Enable dashboard features
        enabled: true,
        
        // Dashboard categories and their consent requirements
        categories: {
            necessary: {
                description: 'Essential dashboards for website functionality',
                consentRequired: false, // Always allowed
                examples: ['zohoAnalytics', 'grafana', 'metabase', 'kibana']
            },
            analytics: {
                description: 'Analytics and reporting dashboards',
                consentRequired: true,
                examples: ['googleLookerStudio', 'powerbi', 'tableau', 'quicksight']
            },
            optional: {
                description: 'Optional dashboards for enhanced experience',
                consentRequired: true,
                examples: ['customDashboards']
            }
        },
        
        // Dashboard platforms with their categories
        platforms: {
            zohoAnalytics: {
                enabled: true,
                category: 'necessary',
                name: 'Zoho Analytics',
                description: 'Business intelligence and analytics platform',
                consentRequired: false,
                fallbackMessage: 'This dashboard is essential for understanding our data insights.'
            },
            googleLookerStudio: {
                enabled: true,
                category: 'analytics',
                name: 'Google Looker Studio',
                description: 'Data visualization and reporting platform',
                consentRequired: true,
                fallbackMessage: 'This dashboard provides enhanced analytics and insights.'
            },
            powerbi: {
                enabled: true,
                category: 'analytics',
                name: 'Power BI',
                description: 'Microsoft business analytics platform',
                consentRequired: true,
                fallbackMessage: 'This dashboard offers advanced business intelligence features.'
            },
            tableau: {
                enabled: true,
                category: 'analytics',
                name: 'Tableau',
                description: 'Data visualization and business intelligence',
                consentRequired: true,
                fallbackMessage: 'This dashboard provides interactive data visualizations.'
            },
            grafana: {
                enabled: true,
                category: 'necessary',
                name: 'Grafana',
                description: 'Monitoring and observability platform',
                consentRequired: false,
                fallbackMessage: 'This dashboard is essential for system monitoring.'
            },
            metabase: {
                enabled: true,
                category: 'necessary',
                name: 'Metabase',
                description: 'Business intelligence and analytics',
                consentRequired: false,
                fallbackMessage: 'This dashboard is essential for business insights.'
            },
            kibana: {
                enabled: true,
                category: 'necessary',
                name: 'Kibana',
                description: 'Data visualization and search platform',
                consentRequired: false,
                fallbackMessage: 'This dashboard is essential for data exploration.'
            },
            quicksight: {
                enabled: true,
                category: 'analytics',
                name: 'Amazon QuickSight',
                description: 'Cloud-based business intelligence',
                consentRequired: true,
                fallbackMessage: 'This dashboard provides cloud-based analytics.'
            }
        },
        
        // Performance settings
        performance: {
            lazyLoad: true,
            preloadCritical: true,
            cacheDashboards: true
        },
        
        // User experience settings
        ux: {
            showLoadingPlaceholder: true,
            showConsentMessage: true,
            allowManualLoad: true
        },
        
        // Data retention for dashboard usage
        dataRetention: {
            dashboardLoads: 90, // days
            userPreferences: 365, // days
            analytics: 90 // days
        }
    }
}; 