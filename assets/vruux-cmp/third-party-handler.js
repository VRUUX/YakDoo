/**
 * VRUUX CMP Third-Party Resource Handler
 * Automatically manages YouTube, social media, and other external content
 * Ensures GDPR compliance for all third-party resources
 */

(function() {
    'use strict';

    // Configuration for third-party resources
    const thirdPartyConfig = {
        // YouTube settings
        youtube: {
            enabled: true,
            category: 'marketing', // or 'analytics' based on your preference
            privacyEnhanced: true, // Use privacy-enhanced mode
            lazyLoad: true // Load only after consent
        },
        
        // Social media settings
        socialMedia: {
            facebook: { enabled: true, category: 'marketing' },
            twitter: { enabled: true, category: 'marketing' },
            instagram: { enabled: true, category: 'marketing' },
            linkedin: { enabled: true, category: 'marketing' }
        },
        
        // Other common third-party services
        services: {
            googleMaps: { enabled: true, category: 'necessary' },
            vimeo: { enabled: true, category: 'marketing' },
            spotify: { enabled: true, category: 'marketing' },
            calendly: { enabled: true, category: 'necessary' },
            
            // Form services
            forms: {
                microsoftForms: { enabled: true, category: 'necessary' },
                googleForms: { enabled: true, category: 'necessary' },
                zohoForms: { enabled: true, category: 'necessary' },
                typeform: { enabled: true, category: 'marketing' },
                jotform: { enabled: true, category: 'marketing' },
                wufoo: { enabled: true, category: 'marketing' }
            },
            
            // E-commerce platforms
            ecommerce: {
                shopify: { enabled: true, category: 'marketing' },
                zohoCommerce: { enabled: true, category: 'marketing' },
                woocommerce: { enabled: true, category: 'marketing' },
                bigcommerce: { enabled: true, category: 'marketing' },
                squarespace: { enabled: true, category: 'marketing' },
                wix: { enabled: true, category: 'marketing' },
                magento: { enabled: true, category: 'marketing' },
                prestashop: { enabled: true, category: 'marketing' },
                opencart: { enabled: true, category: 'marketing' },
                volusion: { enabled: true, category: 'marketing' }
            },
            
            // Dashboard platforms
            dashboards: {
                zohoAnalytics: { enabled: true, category: 'necessary', defaultConsent: true },
                googleLookerStudio: { enabled: true, category: 'analytics', defaultConsent: false },
                powerbi: { enabled: true, category: 'analytics', defaultConsent: false },
                tableau: { enabled: true, category: 'analytics', defaultConsent: false },
                grafana: { enabled: true, category: 'necessary', defaultConsent: true },
                metabase: { enabled: true, category: 'necessary', defaultConsent: true },
                kibana: { enabled: true, category: 'necessary', defaultConsent: true },
                quicksight: { enabled: true, category: 'analytics', defaultConsent: false }
            }
        }
    };

    // Check if consent is given for a specific category
    function hasConsent(category) {
        const preferences = window.YakDooCookieConsent?.getPreferences();
        return preferences && preferences[category];
    }

    // Replace YouTube iframes with privacy-enhanced versions
    function handleYouTubeEmbeds() {
        if (!thirdPartyConfig.youtube.enabled) return;
        
        const iframes = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');
        
        iframes.forEach(iframe => {
            const src = iframe.src;
            
            // Check if already privacy-enhanced
            if (src.includes('youtube-nocookie.com')) return;
            
            // Convert to privacy-enhanced version
            const enhancedSrc = src.replace('youtube.com', 'youtube-nocookie.com');
            
            // Add additional privacy parameters
            const url = new URL(enhancedSrc);
            url.searchParams.set('rel', '0'); // Don't show related videos
            url.searchParams.set('modestbranding', '1'); // Hide YouTube branding
            
            iframe.src = url.toString();
            
            // Add loading attribute for better performance
            iframe.setAttribute('loading', 'lazy');
        });
    }

    // Handle social media embeds
    function handleSocialMediaEmbeds() {
        Object.entries(thirdPartyConfig.socialMedia).forEach(([platform, config]) => {
            if (!config.enabled) return;
            
            const embeds = document.querySelectorAll(`[data-${platform}-embed], .${platform}-embed`);
            
            embeds.forEach(embed => {
                // Add consent check wrapper
                if (!hasConsent(config.category)) {
                    embed.style.display = 'none';
                    embed.setAttribute('data-consent-required', config.category);
                    
                    // Create placeholder
                    const placeholder = document.createElement('div');
                    placeholder.className = 'consent-placeholder';
                    placeholder.innerHTML = `
                        <div style="
                            padding: 20px;
                            text-align: center;
                            background: #f5f5f5;
                            border: 1px solid #ddd;
                            border-radius: 8px;
                            margin: 10px 0;
                        ">
                            <p style="margin: 0 0 10px 0; color: #666;">
                                This ${platform} content requires your consent to display.
                            </p>
                            <button onclick="window.YakDooCookieConsent.showModal()" style="
                                background: #ff6600;
                                color: white;
                                border: none;
                                padding: 8px 16px;
                                border-radius: 4px;
                                cursor: pointer;
                            ">
                                Manage Cookie Preferences
                            </button>
                        </div>
                    `;
                    
                    embed.parentNode.insertBefore(placeholder, embed);
                }
            });
        });
    }

    // Handle other third-party services
    function handleOtherServices() {
        Object.entries(thirdPartyConfig.services).forEach(([service, config]) => {
            if (!config.enabled) return;
            
            let selectors = [];
            
            switch(service) {
                case 'googleMaps':
                    selectors = ['iframe[src*="google.com/maps"], .google-maps'];
                    break;
                case 'vimeo':
                    selectors = ['iframe[src*="vimeo.com"], .vimeo-embed'];
                    break;
                case 'spotify':
                    selectors = ['iframe[src*="spotify.com"], .spotify-embed'];
                    break;
                case 'calendly':
                    selectors = ['iframe[src*="calendly.com"], .calendly-embed'];
                    break;
                case 'microsoftForms':
                    selectors = ['iframe[src*="forms.office.com"], .microsoft-forms'];
                    break;
                case 'googleForms':
                    selectors = ['iframe[src*="docs.google.com/forms"], .google-forms'];
                    break;
                case 'zohoForms':
                    selectors = ['iframe[src*="zoho.com"], .zoho-forms'];
                    break;
                case 'typeform':
                    selectors = ['iframe[src*="typeform.com"], .typeform'];
                    break;
                case 'jotform':
                    selectors = ['iframe[src*="jotform.com"], .jotform'];
                    break;
                case 'wufoo':
                    selectors = ['iframe[src*="wufoo.com"], .wufoo'];
                    break;
                // E-commerce platforms
                case 'shopify':
                    selectors = ['iframe[src*="shopify.com"], .shopify-store, [data-shopify]'];
                    break;
                case 'zohoCommerce':
                    selectors = ['iframe[src*="store.zoho.com"], .zoho-commerce, [data-zoho-commerce]'];
                    break;
                case 'woocommerce':
                    selectors = ['iframe[src*="woocommerce.com"], .woocommerce-store, [data-woocommerce]'];
                    break;
                case 'bigcommerce':
                    selectors = ['iframe[src*="bigcommerce.com"], .bigcommerce-store, [data-bigcommerce]'];
                    break;
                case 'squarespace':
                    selectors = ['iframe[src*="squarespace.com"], .squarespace-store, [data-squarespace]'];
                    break;
                case 'wix':
                    selectors = ['iframe[src*="wix.com"], .wix-store, [data-wix]'];
                    break;
                case 'magento':
                    selectors = ['iframe[src*="magento.com"], .magento-store, [data-magento]'];
                    break;
                case 'prestashop':
                    selectors = ['iframe[src*="prestashop.com"], .prestashop-store, [data-prestashop]'];
                    break;
                case 'opencart':
                    selectors = ['iframe[src*="opencart.com"], .opencart-store, [data-opencart]'];
                    break;
                case 'volusion':
                    selectors = ['iframe[src*="volusion.com"], .volusion-store, [data-volusion]'];
                    break;
                // Dashboard platforms
                case 'zohoAnalytics':
                    selectors = ['iframe[src*="analytics.zoho.com"], .zoho-analytics, [data-zoho-analytics]'];
                    break;
                case 'googleLookerStudio':
                    selectors = ['iframe[src*="lookerstudio.google.com"], .google-looker, [data-google-looker]'];
                    break;
                case 'powerbi':
                    selectors = ['iframe[src*="app.powerbi.com"], .powerbi, [data-powerbi]'];
                    break;
                case 'tableau':
                    selectors = ['iframe[src*="public.tableau.com"], .tableau, [data-tableau]'];
                    break;
                case 'grafana':
                    selectors = ['iframe[src*="grafana.com"], .grafana, [data-grafana]'];
                    break;
                case 'metabase':
                    selectors = ['iframe[src*="metabase.com"], .metabase, [data-metabase]'];
                    break;
                case 'kibana':
                    selectors = ['iframe[src*="kibana"], .kibana, [data-kibana]'];
                    break;
                case 'quicksight':
                    selectors = ['iframe[src*="quicksight.aws.amazon.com"], .quicksight, [data-quicksight]'];
                    break;
            }
            
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                
                elements.forEach(element => {
                    if (!hasConsent(config.category)) {
                        element.style.display = 'none';
                        element.setAttribute('data-consent-required', config.category);
                        
                        // Create placeholder for non-necessary services
                        if (config.category !== 'necessary') {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'consent-placeholder';
                            placeholder.innerHTML = `
                                <div style="
                                    padding: 20px;
                                    text-align: center;
                                    background: #f5f5f5;
                                    border: 1px solid #ddd;
                                    border-radius: 8px;
                                    margin: 10px 0;
                                ">
                                    <p style="margin: 0 0 10px 0; color: #666;">
                                        This ${service} content requires your consent to display.
                                    </p>
                                    <button onclick="window.YakDooCookieConsent.showModal()" style="
                                        background: #ff6600;
                                        color: white;
                                        border: none;
                                        padding: 8px 16px;
                                        border-radius: 4px;
                                        cursor: pointer;
                                    ">
                                        Manage Cookie Preferences
                                    </button>
                                </div>
                            `;
                            
                            element.parentNode.insertBefore(placeholder, element);
                        }
                    }
                });
            });
        });
    }

    // Show hidden content after consent
    function showConsentedContent(category) {
        const hiddenElements = document.querySelectorAll(`[data-consent-required="${category}"]`);
        const placeholders = document.querySelectorAll('.consent-placeholder');
        
        hiddenElements.forEach(element => {
            element.style.display = '';
            element.removeAttribute('data-consent-required');
        });
        
        placeholders.forEach(placeholder => {
            placeholder.remove();
        });
    }

    // Initialize third-party handling
    function initThirdPartyHandler() {
        // Handle existing content
        handleYouTubeEmbeds();
        handleSocialMediaEmbeds();
        handleOtherServices();
        
        // Watch for new content (for dynamically loaded content)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    handleYouTubeEmbeds();
                    handleSocialMediaEmbeds();
                    handleOtherServices();
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Listen for consent changes
    function listenForConsentChanges() {
        // Check for consent changes every 2 seconds (simple approach)
        setInterval(() => {
            const preferences = window.YakDooCookieConsent?.getPreferences();
            if (preferences) {
                Object.keys(preferences).forEach(category => {
                    if (preferences[category]) {
                        showConsentedContent(category);
                    }
                });
            }
        }, 2000);
    }

    // Public API
    window.VRUUX_ThirdPartyHandler = {
        config: thirdPartyConfig,
        init: initThirdPartyHandler,
        handleYouTube: handleYouTubeEmbeds,
        handleSocialMedia: handleSocialMediaEmbeds,
        handleServices: handleOtherServices,
        showContent: showConsentedContent
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initThirdPartyHandler();
            listenForConsentChanges();
        });
    } else {
        initThirdPartyHandler();
        listenForConsentChanges();
    }

})(); 