/**
 * VRUUX CMP - GTM Simple Implementation
 * Easy-to-use Google Tag Manager setup with Consent Mode 2
 * Much simpler than custom solution
 */

(function() {
    'use strict';

    // Simple configuration
    const gtmConfig = {
        // Your GTM container ID
        gtmId: window.VRUUX_CMP_CONFIG?.gtmId || 'GTM-XXXXXXX',
        
        // Your GA4 measurement ID
        ga4Id: window.VRUUX_CMP_CONFIG?.gaId || 'G-D92G25M5GQ',
        
        // Consent settings
        consent: {
            default: {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
            }
        }
    };

    // Initialize GTM
    function initGTM() {
        // Create GTM script
        const gtmScript = document.createElement('script');
        gtmScript.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmConfig.gtmId}');
        `;
        
        // Create GA4 script
        const ga4Script = document.createElement('script');
        ga4Script.async = true;
        ga4Script.src = `https://www.googletagmanager.com/gtag/js?id=${gtmConfig.ga4Id}`;
        
        // Create GA4 initialization
        const ga4Init = document.createElement('script');
        ga4Init.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtmConfig.ga4Id}');
            
            // Initialize consent mode
            gtag('consent', 'default', ${JSON.stringify(gtmConfig.consent.default)});
        `;

        // Inject scripts
        document.head.appendChild(gtmScript);
        document.head.appendChild(ga4Script);
        document.head.appendChild(ga4Init);
        
        // Add GTM noscript fallback
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `
            <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmConfig.gtmId}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `;
        document.body.insertBefore(noscript, document.body.firstChild);
    }

    // Update consent
    function updateConsent(preferences) {
        if (typeof gtag === 'undefined') return;
        
        gtag('consent', 'update', {
            'analytics_storage': preferences.analytics ? 'granted' : 'denied',
            'ad_storage': preferences.marketing ? 'granted' : 'denied',
            'ad_user_data': preferences.marketing ? 'granted' : 'denied',
            'ad_personalization': preferences.marketing ? 'granted' : 'denied'
        });
        
        // Send page view if analytics consent given
        if (preferences.analytics) {
            gtag('config', gtmConfig.ga4Id, {
                'send_page_view': true
            });
        }
        
        // Trigger Clarity loading if analytics consent given
        if (preferences.analytics && gtmConfig.clarityId !== 'YOUR_CLARITY_ID') {
            window.dataLayer.push({
                'event': 'consent_update',
                'consent': {
                    'analytics_storage': 'granted'
                }
            });
        }
    }

    // Track dashboard load
    function trackDashboardLoad(dashboardInfo) {
        if (typeof gtag === 'undefined') return;
        
        gtag('event', 'dashboard_load', {
            'dashboard_platform': dashboardInfo.platform,
            'dashboard_category': dashboardInfo.category,
            'consent_given': dashboardInfo.consentGiven
        });
    }

    // Track custom events
    function trackEvent(eventName, parameters = {}) {
        if (typeof gtag === 'undefined') return;
        
        gtag('event', eventName, parameters);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGTM);
    } else {
        initGTM();
    }

    // Public API
    window.VRUUX_GTM = {
        config: gtmConfig,
        updateConsent: updateConsent,
        trackDashboardLoad: trackDashboardLoad,
        trackEvent: trackEvent
    };

})(); 