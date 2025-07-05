/**
 * VRUUX CMP E-commerce Handler
 * Manages e-commerce store integrations with GDPR compliance
 * Handles purchase tracking, cart management, and store analytics
 */

(function() {
    'use strict';

    // E-commerce configuration
    const ecommerceConfig = {
        // Enable e-commerce features
        enabled: true,
        
        // Required consent for store functionality
        requiredConsent: ['necessary'],
        
        // Optional consent for enhanced features
        optionalConsent: ['analytics', 'marketing'],
        
        // Purchase tracking settings
        trackPurchases: true,
        trackCart: true,
        trackProductViews: true,
        
        // Store platforms
        platforms: {
            shopify: {
                enabled: true,
                category: 'marketing',
                trackingEvents: ['purchase', 'add_to_cart', 'view_item'],
                consentRequired: true
            },
            zohoCommerce: {
                enabled: true,
                category: 'marketing',
                trackingEvents: ['purchase', 'add_to_cart', 'view_item'],
                consentRequired: true
            },
            woocommerce: {
                enabled: true,
                category: 'marketing',
                trackingEvents: ['purchase', 'add_to_cart', 'view_item'],
                consentRequired: true
            },
            bigcommerce: {
                enabled: true,
                category: 'marketing',
                trackingEvents: ['purchase', 'add_to_cart', 'view_item'],
                consentRequired: true
            }
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
    };

    // Check if user has given required consent
    function hasRequiredConsent() {
        const preferences = window.YakDooCookieConsent?.getPreferences();
        if (!preferences) return false;
        
        return ecommerceConfig.requiredConsent.every(category => preferences[category]);
    }

    // Check if user has given optional consent
    function hasOptionalConsent(category) {
        const preferences = window.YakDooCookieConsent?.getPreferences();
        return preferences && preferences[category];
    }

    // Track purchase event
    function trackPurchase(purchaseData) {
        if (!ecommerceConfig.trackPurchases || !hasOptionalConsent('analytics')) {
            return;
        }

        const eventData = {
            transaction_id: purchaseData.transactionId,
            value: purchaseData.value,
            currency: purchaseData.currency || ecommerceConfig.currency,
            items: purchaseData.items || [],
            platform: purchaseData.platform || 'unknown',
            timestamp: new Date().toISOString()
        };

        // Send to Google Analytics
        if (window.gtag) {
            gtag('event', 'purchase', {
                transaction_id: eventData.transaction_id,
                value: eventData.value,
                currency: eventData.currency,
                items: eventData.items
            });
        }

        // Store locally for data export
        const purchaseKey = `purchase_${eventData.transaction_id}`;
        localStorage.setItem(purchaseKey, JSON.stringify(eventData));

        console.log('Purchase tracked:', eventData);
    }

    // Track add to cart event
    function trackAddToCart(cartData) {
        if (!ecommerceConfig.trackCart || !hasOptionalConsent('analytics')) {
            return;
        }

        const eventData = {
            product_id: cartData.productId,
            product_name: cartData.productName,
            price: cartData.price,
            quantity: cartData.quantity,
            platform: cartData.platform || 'unknown',
            timestamp: new Date().toISOString()
        };

        // Send to Google Analytics
        if (window.gtag) {
            gtag('event', 'add_to_cart', {
                items: [{
                    item_id: eventData.product_id,
                    item_name: eventData.product_name,
                    price: eventData.price,
                    quantity: eventData.quantity
                }]
            });
        }

        // Store locally
        const cartKey = `cart_${Date.now()}`;
        localStorage.setItem(cartKey, JSON.stringify(eventData));

        console.log('Add to cart tracked:', eventData);
    }

    // Track product view
    function trackProductView(productData) {
        if (!ecommerceConfig.trackProductViews || !hasOptionalConsent('analytics')) {
            return;
        }

        const eventData = {
            product_id: productData.productId,
            product_name: productData.productName,
            category: productData.category,
            price: productData.price,
            platform: productData.platform || 'unknown',
            timestamp: new Date().toISOString()
        };

        // Send to Google Analytics
        if (window.gtag) {
            gtag('event', 'view_item', {
                items: [{
                    item_id: eventData.product_id,
                    item_name: eventData.product_name,
                    item_category: eventData.category,
                    price: eventData.price
                }]
            });
        }

        // Store locally
        const viewKey = `product_view_${Date.now()}`;
        localStorage.setItem(viewKey, JSON.stringify(eventData));

        console.log('Product view tracked:', eventData);
    }

    // Handle store iframe loading
    function handleStoreIframes() {
        const storeIframes = document.querySelectorAll(`
            iframe[src*="shopify.com"],
            iframe[src*="store.zoho.com"],
            iframe[src*="woocommerce.com"],
            iframe[src*="bigcommerce.com"],
            iframe[src*="squarespace.com"],
            iframe[src*="wix.com"],
            .shopify-store,
            .zoho-commerce,
            .woocommerce-store,
            .bigcommerce-store,
            .squarespace-store,
            .wix-store
        `);

        storeIframes.forEach(iframe => {
            if (!hasRequiredConsent()) {
                // Hide store if consent not given
                iframe.style.display = 'none';
                iframe.setAttribute('data-consent-required', 'marketing');

                // Create placeholder
                const placeholder = createStorePlaceholder(iframe);
                iframe.parentNode.insertBefore(placeholder, iframe);
            } else {
                // Add tracking attributes
                iframe.setAttribute('data-gdpr-tracked', 'true');
                
                // Add load event listener for tracking
                iframe.addEventListener('load', () => {
                    trackStoreLoad(iframe);
                });
            }
        });
    }

    // Create store placeholder
    function createStorePlaceholder(iframe) {
        const placeholder = document.createElement('div');
        placeholder.className = 'store-placeholder';
        placeholder.style.cssText = `
            padding: 40px 20px;
            text-align: center;
            background: #f9f9f9;
            border: 2px dashed #ddd;
            border-radius: 10px;
            margin: 20px 0;
        `;

        const platform = detectPlatform(iframe);
        
        placeholder.innerHTML = `
            <div style="margin-bottom: 20px;">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="#ff6600">
                    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
            </div>
            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 20px;">
                ${platform} Store
            </h3>
            <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.5;">
                This store requires your consent to display and process transactions.
            </p>
            <button onclick="window.YakDooCookieConsent.showModal()" style="
                background: #ff6600;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                margin: 0 10px;
            ">
                Manage Cookie Preferences
            </button>
            <button onclick="window.VRUUX_EcommerceHandler.showStoreInfo()" style="
                background: transparent;
                color: #ff6600;
                border: 1px solid #ff6600;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                margin: 0 10px;
            ">
                Learn More
            </button>
        `;

        return placeholder;
    }

    // Detect platform from iframe
    function detectPlatform(iframe) {
        const src = iframe.src || '';
        if (src.includes('shopify.com')) return 'Shopify';
        if (src.includes('store.zoho.com')) return 'Zoho Commerce';
        if (src.includes('woocommerce.com')) return 'WooCommerce';
        if (src.includes('bigcommerce.com')) return 'BigCommerce';
        if (src.includes('squarespace.com')) return 'Squarespace';
        if (src.includes('wix.com')) return 'Wix';
        return 'E-commerce';
    }

    // Track store load
    function trackStoreLoad(iframe) {
        const platform = detectPlatform(iframe);
        
        if (hasOptionalConsent('analytics') && window.gtag) {
            gtag('event', 'store_load', {
                'store_platform': platform,
                'store_url': iframe.src
            });
        }
    }

    // Show store information
    function showStoreInfo() {
        const info = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                max-width: 500px;
                z-index: 10001;
            ">
                <h3 style="margin: 0 0 20px 0; color: #333;">E-commerce Store Information</h3>
                <p style="margin: 0 0 15px 0; color: #666; line-height: 1.6;">
                    Our e-commerce store uses third-party platforms to process transactions securely. 
                    To provide you with the best shopping experience, we need your consent for:
                </p>
                <ul style="margin: 0 0 20px 0; color: #666; line-height: 1.6;">
                    <li>Secure payment processing</li>
                    <li>Order tracking and notifications</li>
                    <li>Customer support and account management</li>
                    <li>Analytics to improve our services</li>
                </ul>
                <p style="margin: 0 0 20px 0; color: #666; line-height: 1.6;">
                    Your data is protected and we never share personal information with third parties 
                    without your explicit consent.
                </p>
                <button onclick="this.parentElement.remove()" style="
                    background: #ff6600;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                ">
                    Close
                </button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', info);
    }

    // Export e-commerce data
    function exportEcommerceData() {
        const ecommerceData = {
            purchases: [],
            cartItems: [],
            productViews: [],
            timestamp: new Date().toISOString()
        };

        // Collect all e-commerce data from localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('purchase_') || key.startsWith('cart_') || key.startsWith('product_view_')) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (key.startsWith('purchase_')) {
                        ecommerceData.purchases.push(data);
                    } else if (key.startsWith('cart_')) {
                        ecommerceData.cartItems.push(data);
                    } else if (key.startsWith('product_view_')) {
                        ecommerceData.productViews.push(data);
                    }
                } catch (e) {
                    console.warn('Failed to parse e-commerce data:', key);
                }
            }
        }

        // Create download
        const dataStr = JSON.stringify(ecommerceData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `ecommerce_data_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    // Initialize e-commerce handling
    function initEcommerceHandler() {
        if (!ecommerceConfig.enabled) return;

        // Handle existing store iframes
        handleStoreIframes();

        // Watch for dynamically added store content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    handleStoreIframes();
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
                const storePlaceholders = document.querySelectorAll('.store-placeholder');
                const hiddenIframes = document.querySelectorAll('[data-consent-required="marketing"]');

                if (preferences.marketing) {
                    // Show stores when consent given
                    storePlaceholders.forEach(placeholder => placeholder.remove());
                    hiddenIframes.forEach(iframe => {
                        iframe.style.display = '';
                        iframe.removeAttribute('data-consent-required');
                        iframe.setAttribute('data-gdpr-tracked', 'true');
                    });
                }
            }
        }, 2000);
    }

    // Public API
    window.VRUUX_EcommerceHandler = {
        config: ecommerceConfig,
        init: initEcommerceHandler,
        trackPurchase: trackPurchase,
        trackAddToCart: trackAddToCart,
        trackProductView: trackProductView,
        exportData: exportEcommerceData,
        showStoreInfo: showStoreInfo,
        hasRequiredConsent: hasRequiredConsent,
        hasOptionalConsent: hasOptionalConsent
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEcommerceHandler);
    } else {
        initEcommerceHandler();
    }

})(); 