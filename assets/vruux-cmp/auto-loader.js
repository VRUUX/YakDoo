/**
 * VRUUX CMP Auto-Loader
 * Automatically injects GDPR cookie consent management into all pages
 * No manual script inclusion required - just include this file once
 */

(function() {
    'use strict';

    // Configuration - merge with external config if available
    const config = {
        // File paths (relative to root)
        cssPath: 'assets/vruux-cmp/gdpr-cookie-consent.css',
        jsPath: 'assets/vruux-cmp/gdpr-cookie-consent.js',
        thirdPartyPath: 'assets/vruux-cmp/third-party-handler.js',
        formHandlerPath: 'assets/vruux-cmp/form-handler.js',
        ecommerceHandlerPath: 'assets/vruux-cmp/ecommerce-handler.js',
        dashboardHandlerPath: 'assets/vruux-cmp/dashboard-handler.js',
        
        // Google Analytics ID
        gaId: window.VRUUX_CMP_CONFIG?.gaId || 'G-D92G25M5GQ',
        
        // Microsoft Clarity ID (replace with your actual ID)
        clarityId: window.VRUUX_CMP_CONFIG?.clarityId || 'YOUR_CLARITY_ID',
        
        // Auto-inject settings
        injectCSS: window.VRUUX_CMP_CONFIG?.autoInject?.css !== false,
        injectJS: window.VRUUX_CMP_CONFIG?.autoInject?.js !== false,
        injectGA: window.VRUUX_CMP_CONFIG?.autoInject?.ga !== false,
        injectThirdParty: window.VRUUX_CMP_CONFIG?.autoInject?.thirdParty !== false,
        injectFormHandler: window.VRUUX_CMP_CONFIG?.autoInject?.formHandler !== false,
        injectEcommerceHandler: window.VRUUX_CMP_CONFIG?.autoInject?.ecommerceHandler !== false,
        injectDashboardHandler: window.VRUUX_CMP_CONFIG?.autoInject?.dashboardHandler !== false
    };

    // Check if already loaded to prevent duplicates
    if (window.VRUUX_CMP_LOADED) {
        return;
    }
    window.VRUUX_CMP_LOADED = true;

    // Utility functions
    function loadCSS(href) {
        if (document.querySelector(`link[href="${href}"]`)) {
            return Promise.resolve(); // Already loaded
        }
        
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    function loadJS(src) {
        if (document.querySelector(`script[src="${src}"]`)) {
            return Promise.resolve(); // Already loaded
        }
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    function injectGoogleAnalytics() {
        // Check if GA is already loaded
        if (window.gtag || document.querySelector('script[src*="googletagmanager.com"]')) {
            return;
        }

        // Create GA script
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${config.gaId}`;
        
        // Create GA initialization script
        const gaInit = document.createElement('script');
        gaInit.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Initialize with consent mode (denied by default)
            gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'wait_for_update': 500
            });
            
            // Configure GA4 with privacy settings
            gtag('config', '${config.gaId}', {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=Lax;Secure',
                'send_page_view': false
            });
        `;

        // Inject GA scripts
        document.head.appendChild(gaScript);
        document.head.appendChild(gaInit);
    }

    function injectMicrosoftClarity() {
        // Check if Clarity is already loaded
        if (document.querySelector('script[src*="clarity.ms"]') || config.clarityId === 'YOUR_CLARITY_ID') {
            return;
        }

        // Create Clarity script
        const clarityScript = document.createElement('script');
        clarityScript.innerHTML = `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${config.clarityId}");
        `;

        document.head.appendChild(clarityScript);
    }

    // Main initialization function
    async function initializeCMP() {
        try {
            // Load CSS if enabled
            if (config.injectCSS) {
                await loadCSS(config.cssPath);
            }

            // Load JS if enabled
            if (config.injectJS) {
                await loadJS(config.jsPath);
            }

            // Inject Google Analytics if enabled
            if (config.injectGA) {
                injectGoogleAnalytics();
            }

            // Inject Microsoft Clarity
            injectMicrosoftClarity();

            // Load third-party handler if enabled
            if (config.injectThirdParty) {
                await loadJS(config.thirdPartyPath);
            }

            // Load form handler if enabled
            if (config.injectFormHandler) {
                await loadJS(config.formHandlerPath);
            }

            // Load e-commerce handler if enabled
            if (config.injectEcommerceHandler) {
                await loadJS(config.ecommerceHandlerPath);
            }

            // Load dashboard handler if enabled
            if (config.injectDashboardHandler) {
                await loadJS(config.dashboardHandlerPath);
            }

            console.log('VRUUX CMP Auto-Loader: GDPR consent system loaded successfully');
            
        } catch (error) {
            console.error('VRUUX CMP Auto-Loader: Error loading GDPR consent system:', error);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCMP);
    } else {
        initializeCMP();
    }

    // Public API for manual control
    window.VRUUX_CMP = {
        config: config,
        reload: initializeCMP,
        loadCSS: () => loadCSS(config.cssPath),
        loadJS: () => loadJS(config.jsPath),
        injectGA: injectGoogleAnalytics,
        injectClarity: injectMicrosoftClarity
    };

})(); 