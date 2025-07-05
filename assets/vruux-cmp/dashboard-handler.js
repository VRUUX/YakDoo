/**
 * VRUUX CMP Dashboard Handler
 * Manages dashboard embeds with flexible consent requirements
 * Handles different dashboard types based on their purpose and importance
 */

(function() {
    'use strict';

    // Dashboard configuration
    const dashboardConfig = {
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
        }
    };

    // Check if user has given consent for a specific category
    function hasConsent(category) {
        const preferences = window.YakDooCookieConsent?.getPreferences();
        if (!preferences) return false;
        
        if (category === 'necessary') return true; // Always allowed
        return preferences[category] || false;
    }

    // Get dashboard platform info
    function getDashboardInfo(element) {
        const src = element.src || '';
        const className = element.className || '';
        const dataAttr = element.getAttribute('data-dashboard-type');
        
        // Check by source URL
        if (src.includes('analytics.zoho.com')) return dashboardConfig.platforms.zohoAnalytics;
        if (src.includes('lookerstudio.google.com')) return dashboardConfig.platforms.googleLookerStudio;
        if (src.includes('app.powerbi.com')) return dashboardConfig.platforms.powerbi;
        if (src.includes('public.tableau.com')) return dashboardConfig.platforms.tableau;
        if (src.includes('grafana.com')) return dashboardConfig.platforms.grafana;
        if (src.includes('metabase.com')) return dashboardConfig.platforms.metabase;
        if (src.includes('kibana')) return dashboardConfig.platforms.kibana;
        if (src.includes('quicksight.aws.amazon.com')) return dashboardConfig.platforms.quicksight;
        
        // Check by class name
        if (className.includes('zoho-analytics')) return dashboardConfig.platforms.zohoAnalytics;
        if (className.includes('google-looker')) return dashboardConfig.platforms.googleLookerStudio;
        if (className.includes('powerbi')) return dashboardConfig.platforms.powerbi;
        if (className.includes('tableau')) return dashboardConfig.platforms.tableau;
        if (className.includes('grafana')) return dashboardConfig.platforms.grafana;
        if (className.includes('metabase')) return dashboardConfig.platforms.metabase;
        if (className.includes('kibana')) return dashboardConfig.platforms.kibana;
        if (className.includes('quicksight')) return dashboardConfig.platforms.quicksight;
        
        // Check by data attribute
        if (dataAttr) {
            return dashboardConfig.platforms[dataAttr] || dashboardConfig.platforms.googleLookerStudio;
        }
        
        return null;
    }

    // Create dashboard placeholder
    function createDashboardPlaceholder(dashboard, element) {
        const placeholder = document.createElement('div');
        placeholder.className = 'dashboard-placeholder';
        placeholder.setAttribute('data-dashboard-id', element.id || `dashboard-${Date.now()}`);
        placeholder.style.cssText = `
            padding: 30px 20px;
            text-align: center;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 2px dashed #dee2e6;
            border-radius: 12px;
            margin: 20px 0;
            position: relative;
            overflow: hidden;
        `;

        const platformInfo = getDashboardInfo(element);
        const dashboardName = platformInfo ? platformInfo.name : 'Dashboard';
        const dashboardDesc = platformInfo ? platformInfo.description : 'Data visualization';
        const fallbackMsg = platformInfo ? platformInfo.fallbackMessage : 'This dashboard provides important insights.';

        placeholder.innerHTML = `
            <div style="margin-bottom: 20px;">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="#ff6600">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
            </div>
            
            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 22px; font-weight: 600;">
                ${dashboardName}
            </h3>
            
            <p style="margin: 0 0 15px 0; color: #666; font-size: 16px; line-height: 1.5;">
                ${dashboardDesc}
            </p>
            
            <p style="margin: 0 0 25px 0; color: #888; font-size: 14px; line-height: 1.6;">
                ${fallbackMsg}
            </p>
            
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                ${dashboard.category === 'necessary' ? `
                    <button onclick="window.VRUUX_DashboardHandler.loadDashboard('${placeholder.getAttribute('data-dashboard-id')}')" style="
                        background: #ff6600;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 500;
                    ">
                        Load Dashboard
                    </button>
                ` : `
                    <button onclick="window.YakDooCookieConsent.showModal()" style="
                        background: #ff6600;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight: 500;
                    ">
                        Manage Cookie Preferences
                    </button>
                    
                    <button onclick="window.VRUUX_DashboardHandler.showDashboardInfo('${dashboardName}')" style="
                        background: transparent;
                        color: #ff6600;
                        border: 1px solid #ff6600;
                        padding: 12px 24px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 16px;
                    ">
                        Learn More
                    </button>
                `}
            </div>
            
            ${dashboard.category !== 'necessary' ? `
                <p style="margin: 20px 0 0 0; font-size: 12px; color: #999;">
                    This dashboard requires your consent to display. 
                    <a href="#" onclick="window.VRUUX_DashboardHandler.showConsentInfo(); return false;" style="color: #ff6600;">
                        Why is consent needed?
                    </a>
                </p>
            ` : ''}
        `;

        return placeholder;
    }

    // Handle dashboard iframes
    function handleDashboardIframes() {
        const dashboardIframes = document.querySelectorAll(`
            iframe[src*="analytics.zoho.com"],
            iframe[src*="lookerstudio.google.com"],
            iframe[src*="app.powerbi.com"],
            iframe[src*="public.tableau.com"],
            iframe[src*="grafana.com"],
            iframe[src*="metabase.com"],
            iframe[src*="kibana"],
            iframe[src*="quicksight.aws.amazon.com"],
            .zoho-analytics,
            .google-looker,
            .powerbi,
            .tableau,
            .grafana,
            .metabase,
            .kibana,
            .quicksight,
            [data-dashboard-type]
        `);

        dashboardIframes.forEach(iframe => {
            // Skip if already processed
            if (iframe.hasAttribute('data-gdpr-processed')) return;
            
            const platformInfo = getDashboardInfo(iframe);
            if (!platformInfo) return;

            // Mark as processed
            iframe.setAttribute('data-gdpr-processed', 'true');
            iframe.setAttribute('data-dashboard-category', platformInfo.category);

            if (platformInfo.consentRequired && !hasConsent(platformInfo.category)) {
                // Hide dashboard if consent not given
                iframe.style.display = 'none';
                iframe.setAttribute('data-consent-required', platformInfo.category);

                // Create placeholder
                const placeholder = createDashboardPlaceholder(platformInfo, iframe);
                iframe.parentNode.insertBefore(placeholder, iframe);
            } else {
                // Show dashboard (necessary or consent given)
                iframe.style.display = '';
                iframe.setAttribute('data-gdpr-tracked', 'true');
                
                // Add loading attribute for performance
                if (dashboardConfig.performance.lazyLoad) {
                    iframe.setAttribute('loading', 'lazy');
                }
            }
        });
    }

    // Load dashboard manually
    function loadDashboard(dashboardId) {
        const placeholder = document.querySelector(`[data-dashboard-id="${dashboardId}"]`);
        if (!placeholder) return;

        const iframe = placeholder.nextElementSibling;
        if (!iframe || !iframe.hasAttribute('data-consent-required')) return;

        // Show the dashboard
        iframe.style.display = '';
        iframe.removeAttribute('data-consent-required');
        iframe.setAttribute('data-gdpr-tracked', 'true');

        // Remove placeholder
        placeholder.remove();

        // Track dashboard load
        trackDashboardLoad(iframe);
    }

    // Track dashboard load
    function trackDashboardLoad(iframe) {
        const platformInfo = getDashboardInfo(iframe);
        if (!platformInfo) return;

        if (hasConsent('analytics') && window.gtag) {
            gtag('event', 'dashboard_load', {
                'dashboard_platform': platformInfo.name,
                'dashboard_category': platformInfo.category,
                'consent_given': true
            });
        }

        // Store locally for data export
        const loadData = {
            platform: platformInfo.name,
            category: platformInfo.category,
            timestamp: new Date().toISOString(),
            url: iframe.src
        };

        const loadKey = `dashboard_load_${Date.now()}`;
        localStorage.setItem(loadKey, JSON.stringify(loadData));

        console.log('Dashboard loaded:', loadData);
    }

    // Show dashboard information
    function showDashboardInfo(dashboardName) {
        const info = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 15px 35px rgba(0,0,0,0.2);
                max-width: 500px;
                z-index: 10001;
            ">
                <h3 style="margin: 0 0 20px 0; color: #333;">${dashboardName} Dashboard</h3>
                <p style="margin: 0 0 15px 0; color: #666; line-height: 1.6;">
                    This dashboard provides valuable insights and analytics to enhance your experience on our website.
                </p>
                <p style="margin: 0 0 15px 0; color: #666; line-height: 1.6;">
                    To display this dashboard, we need your consent for analytics cookies, which help us:
                </p>
                <ul style="margin: 0 0 20px 0; color: #666; line-height: 1.6;">
                    <li>Provide personalized insights</li>
                    <li>Improve dashboard performance</li>
                    <li>Track usage patterns for optimization</li>
                    <li>Ensure secure data transmission</li>
                </ul>
                <p style="margin: 0 0 20px 0; color: #666; line-height: 1.6;">
                    Your data is protected and we never share personal information with third parties 
                    without your explicit consent.
                </p>
                <button onclick="this.parentElement.remove()" style="
                    background: #ff6600;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                ">
                    Close
                </button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', info);
    }

    // Show consent information
    function showConsentInfo() {
        const info = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 15px 35px rgba(0,0,0,0.2);
                max-width: 500px;
                z-index: 10001;
            ">
                <h3 style="margin: 0 0 20px 0; color: #333;">Why is Consent Needed?</h3>
                <p style="margin: 0 0 15px 0; color: #666; line-height: 1.6;">
                    Dashboard embeds may use cookies and tracking technologies to:
                </p>
                <ul style="margin: 0 0 20px 0; color: #666; line-height: 1.6;">
                    <li>Load dashboard content efficiently</li>
                    <li>Remember your preferences and settings</li>
                    <li>Provide personalized data visualizations</li>
                    <li>Track usage for performance optimization</li>
                    <li>Ensure secure data transmission</li>
                </ul>
                <p style="margin: 0 0 20px 0; color: #666; line-height: 1.6;">
                    <strong>Essential dashboards</strong> (like Zoho Analytics) are always available as they're 
                    necessary for website functionality.
                </p>
                <p style="margin: 0 0 20px 0; color: #666; line-height: 1.6;">
                    <strong>Optional dashboards</strong> require your consent to provide enhanced features 
                    and analytics capabilities.
                </p>
                <button onclick="this.parentElement.remove()" style="
                    background: #ff6600;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                ">
                    Close
                </button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', info);
    }

    // Export dashboard data
    function exportDashboardData() {
        const dashboardData = {
            dashboardLoads: [],
            timestamp: new Date().toISOString()
        };

        // Collect all dashboard data from localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('dashboard_load_')) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    dashboardData.dashboardLoads.push(data);
                } catch (e) {
                    console.warn('Failed to parse dashboard data:', key);
                }
            }
        }

        // Create download
        const dataStr = JSON.stringify(dashboardData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `dashboard_data_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    // Initialize dashboard handling
    function initDashboardHandler() {
        if (!dashboardConfig.enabled) return;

        // Handle existing dashboard iframes
        handleDashboardIframes();

        // Watch for dynamically added dashboard content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    handleDashboardIframes();
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Listen for consent changes
        setInterval(() => {
            const preferences = window.YakDooCookieConsent?.getPreferences();
            if (preferences) {
                const dashboardPlaceholders = document.querySelectorAll('.dashboard-placeholder');
                const hiddenIframes = document.querySelectorAll('[data-consent-required]');

                // Show dashboards when consent given
                if (preferences.analytics) {
                    hiddenIframes.forEach(iframe => {
                        const category = iframe.getAttribute('data-consent-required');
                        if (category === 'analytics') {
                            iframe.style.display = '';
                            iframe.removeAttribute('data-consent-required');
                            iframe.setAttribute('data-gdpr-tracked', 'true');
                            trackDashboardLoad(iframe);
                        }
                    });

                    // Remove placeholders for analytics dashboards
                    dashboardPlaceholders.forEach(placeholder => {
                        const iframe = placeholder.nextElementSibling;
                        if (iframe && iframe.getAttribute('data-consent-required') === 'analytics') {
                            placeholder.remove();
                        }
                    });
                }
            }
        }, 2000);
    }

    // Public API
    window.VRUUX_DashboardHandler = {
        config: dashboardConfig,
        init: initDashboardHandler,
        loadDashboard: loadDashboard,
        trackDashboardLoad: trackDashboardLoad,
        showDashboardInfo: showDashboardInfo,
        showConsentInfo: showConsentInfo,
        exportData: exportDashboardData,
        hasConsent: hasConsent,
        getDashboardInfo: getDashboardInfo
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDashboardHandler);
    } else {
        initDashboardHandler();
    }

})(); 