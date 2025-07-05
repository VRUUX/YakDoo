/**
 * GDPR Compliant Cookie Consent Management
 * MIT License - Free to use
 * Handles Google Analytics and Microsoft Clarity tracking
 */

(function() {
    'use strict';

    // Cookie consent configuration - merge with external config
    const cookieConfig = {
        // Cookie settings
        cookieName: window.VRUUX_CMP_CONFIG?.cookie?.name || 'yakdoo_cookie_consent',
        cookieExpiryDays: window.VRUUX_CMP_CONFIG?.cookie?.expiryDays || 365,
        
        // Banner settings
        bannerText: window.VRUUX_CMP_CONFIG?.banner?.text || 'We use cookies to enhance your experience and analyze site usage. By clicking "Accept All", you consent to our use of cookies for analytics and site optimization. You can customize your preferences or learn more in our <a href="privacypolicy.html">Privacy Policy</a>.',
        acceptAllText: window.VRUUX_CMP_CONFIG?.banner?.acceptAllText || 'Accept All',
        acceptNecessaryText: window.VRUUX_CMP_CONFIG?.banner?.acceptNecessaryText || 'Necessary Only',
        customizeText: window.VRUUX_CMP_CONFIG?.banner?.customizeText || 'Customize',
        closeText: window.VRUUX_CMP_CONFIG?.banner?.closeText || 'Close',
        
        // Categories
        categories: window.VRUUX_CMP_CONFIG?.categories || {
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
        
        // Colors
        colors: window.VRUUX_CMP_CONFIG?.colors || {
            primary: '#ff6600',
            secondary: '#ffffff',
            text: '#000000',
            background: '#ffffff',
            border: '#e0e0e0'
        }
    };

    // Check if consent already exists
    function hasConsent() {
        return getCookie(cookieConfig.cookieName) !== null;
    }

    // Get cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Set cookie
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    // Get consent preferences
    function getConsentPreferences() {
        const consent = getCookie(cookieConfig.cookieName);
        if (!consent) return null;
        
        try {
            return JSON.parse(consent);
        } catch (e) {
            return null;
        }
    }

    // Save consent preferences
    function saveConsentPreferences(preferences) {
        setCookie(cookieConfig.cookieName, JSON.stringify(preferences), cookieConfig.cookieExpiryDays);
        
        // Update Google Analytics consent mode
        if (typeof window.updateGAConsent === 'function') {
            window.updateGAConsent(preferences);
        }
        
        // Initialize tracking based on new preferences
        initTracking();
    }

    // Initialize Google Analytics (only if consent given)
    function initGoogleAnalytics() {
        const preferences = getConsentPreferences();
        if (!preferences || !preferences.analytics) return;

        // Check if GA is blocked by ad blocker
        if (window.GA_BLOCKED) {
            console.warn('VRUUX CMP: Google Analytics blocked by ad blocker - skipping initialization');
            return;
        }

        // Update GA consent mode if available
        if (typeof window.updateGAConsent === 'function') {
            window.updateGAConsent(preferences);
        } else if (typeof gtag !== 'undefined') {
            // Fallback for direct gtag access
            gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': preferences.marketing ? 'granted' : 'denied'
            });
            
            // Send page view
            gtag('config', 'G-D92G25M5GQ', {
                'send_page_view': true
            });
        }
    }

    // Initialize Microsoft Clarity (only if consent given)
    function initMicrosoftClarity() {
        const preferences = getConsentPreferences();
        if (!preferences || !preferences.analytics) return;

        // Load Microsoft Clarity script if not already loaded
        if (!document.querySelector('script[src*="clarity.ms"]')) {
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", window.VRUUX_CMP?.config?.clarityId || "YOUR_CLARITY_ID"); // Replace with your Clarity ID
        }
    }

    // Create banner HTML
    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'gdpr-cookie-banner';
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: ${cookieConfig.colors.background};
            border-top: 2px solid ${cookieConfig.colors.border};
            padding: 20px;
            z-index: 9999;
            font-family: 'Fredoka', sans-serif;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
            transform: translateY(100%);
            transition: transform 0.3s ease-in-out;
        `;

        banner.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto;">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
                    <div style="flex: 1; min-width: 300px;">
                        <p style="margin: 0; color: ${cookieConfig.colors.text}; font-size: 14px; line-height: 1.5;">
                            ${cookieConfig.bannerText}
                        </p>
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button id="gdpr-accept-all" style="
                            background: ${cookieConfig.colors.primary};
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                        ">${cookieConfig.acceptAllText}</button>
                        <button id="gdpr-accept-necessary" style="
                            background: transparent;
                            color: ${cookieConfig.colors.text};
                            border: 1px solid ${cookieConfig.colors.border};
                            padding: 10px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 14px;
                        ">${cookieConfig.acceptNecessaryText}</button>
                        <button id="gdpr-customize" style="
                            background: transparent;
                            color: ${cookieConfig.colors.primary};
                            border: 1px solid ${cookieConfig.colors.primary};
                            padding: 10px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 14px;
                        ">${cookieConfig.customizeText}</button>
                    </div>
                </div>
            </div>
        `;

        return banner;
    }

    // Create modal HTML
    function createModal() {
        const modal = document.createElement('div');
        modal.id = 'gdpr-cookie-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;

        modal.innerHTML = `
            <div style="
                background: ${cookieConfig.colors.background};
                border-radius: 10px;
                padding: 30px;
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="margin: 0; color: ${cookieConfig.colors.text}; font-size: 24px;">Cookie Preferences</h3>
                    <button id="gdpr-modal-close" style="
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: ${cookieConfig.colors.text};
                    ">&times;</button>
                </div>
                
                <p style="color: ${cookieConfig.colors.text}; margin-bottom: 20px; line-height: 1.6;">
                    Manage your cookie preferences below. You can change these settings at any time.
                </p>
                
                <div id="gdpr-categories" style="margin-bottom: 30px;">
                    ${Object.entries(cookieConfig.categories).map(([key, category]) => `
                        <div style="
                            border: 1px solid ${cookieConfig.colors.border};
                            border-radius: 8px;
                            padding: 20px;
                            margin-bottom: 15px;
                        ">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <h4 style="margin: 0; color: ${cookieConfig.colors.text}; font-size: 18px;">${category.title}</h4>
                                <label style="display: flex; align-items: center; cursor: pointer;">
                                    <input type="checkbox" 
                                           id="gdpr-${key}" 
                                           ${category.required ? 'checked disabled' : ''}
                                           style="margin-right: 8px; transform: scale(1.2);">
                                    <span style="color: ${cookieConfig.colors.text}; font-size: 14px;">
                                        ${category.required ? 'Always Active' : 'Enable'}
                                    </span>
                                </label>
                            </div>
                            <p style="margin: 0; color: ${cookieConfig.colors.text}; font-size: 14px; line-height: 1.5; opacity: 0.8;">
                                ${category.description}
                            </p>
                        </div>
                    `).join('')}
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button id="gdpr-save-preferences" style="
                        background: ${cookieConfig.colors.primary};
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 500;
                    ">Save Preferences</button>
                </div>
            </div>
        `;

        return modal;
    }

    // Show banner
    function showBanner() {
        const banner = createBanner();
        document.body.appendChild(banner);
        
        // Animate in
        setTimeout(() => {
            banner.style.transform = 'translateY(0)';
        }, 100);

        // Event listeners
        document.getElementById('gdpr-accept-all').addEventListener('click', () => {
            acceptAll();
        });

        document.getElementById('gdpr-accept-necessary').addEventListener('click', () => {
            acceptNecessary();
        });

        document.getElementById('gdpr-customize').addEventListener('click', () => {
            showModal();
        });
    }

    // Show modal
    function showModal() {
        const modal = createModal();
        document.body.appendChild(modal);
        modal.style.display = 'flex';

        // Event listeners
        document.getElementById('gdpr-modal-close').addEventListener('click', () => {
            hideModal();
        });

        document.getElementById('gdpr-save-preferences').addEventListener('click', () => {
            savePreferences();
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    // Hide modal
    function hideModal() {
        const modal = document.getElementById('gdpr-cookie-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Accept all cookies
    function acceptAll() {
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        
        saveConsentPreferences(preferences);
        hideBanner();
        initTracking();
    }

    // Accept necessary cookies only
    function acceptNecessary() {
        const preferences = {
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        
        saveConsentPreferences(preferences);
        hideBanner();
    }

    // Save custom preferences
    function savePreferences() {
        const preferences = {
            necessary: true, // Always true
            analytics: document.getElementById('gdpr-analytics').checked,
            marketing: document.getElementById('gdpr-marketing').checked,
            timestamp: new Date().toISOString()
        };
        
        saveConsentPreferences(preferences);
        hideModal();
        hideBanner();
        
        if (preferences.analytics) {
            initTracking();
        }
    }

    // Hide banner
    function hideBanner() {
        const banner = document.getElementById('gdpr-cookie-banner');
        if (banner) {
            banner.style.transform = 'translateY(100%)';
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    // Initialize tracking (Google Analytics + Microsoft Clarity)
    function initTracking() {
        initGoogleAnalytics();
        initMicrosoftClarity();
    }

    // Initialize consent management
    function init() {
        // Check if consent already exists
        if (hasConsent()) {
            const preferences = getConsentPreferences();
            if (preferences && preferences.analytics) {
                initTracking();
            }
            return;
        }

        // Show banner for new visitors
        showBanner();
    }

    // Initialize Google Analytics with consent mode (before consent)
    function initGoogleAnalyticsConsentMode() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'wait_for_update': 500
            });
        }
    }

    // Public API
    window.YakDooCookieConsent = {
        init: init,
        showBanner: showBanner,
        showModal: showModal,
        getPreferences: getConsentPreferences,
        updatePreferences: saveConsentPreferences,
        reset: function() {
            document.cookie = `${cookieConfig.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            location.reload();
        }
    };

    // Initialize consent mode for Google Analytics
    initGoogleAnalyticsConsentMode();

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(); 