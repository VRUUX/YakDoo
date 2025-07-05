# E-commerce Store Integration Guide

## 🛒 **Supported E-commerce Platforms**

### **Automatically Supported**
The system automatically detects and manages these platforms:

#### **Major Platforms**
- ✅ **Shopify**: `shopify.com` - Full GDPR compliance
- ✅ **Zoho Commerce**: `store.zoho.com` - Full GDPR compliance
- ✅ **WooCommerce**: `woocommerce.com` - Full GDPR compliance
- ✅ **BigCommerce**: `bigcommerce.com` - Full GDPR compliance
- ✅ **Squarespace**: `squarespace.com` - Full GDPR compliance
- ✅ **Wix**: `wix.com` - Full GDPR compliance

#### **Other Platforms**
- ✅ **Magento**: `magento.com`
- ✅ **PrestaShop**: `prestashop.com`
- ✅ **OpenCart**: `opencart.com`
- ✅ **Volusion**: `volusion.com`

## 🚀 **How to Integrate E-commerce Stores**

### **Method 1: Simple Embed (Recommended)**
Just embed your store normally - the system handles everything automatically:

```html
<!-- Shopify Store -->
<iframe src="https://your-store.myshopify.com/..."></iframe>

<!-- Zoho Commerce -->
<iframe src="https://store.zoho.com/your-store/..."></iframe>

<!-- WooCommerce -->
<iframe src="https://your-store.com/shop/..."></iframe>

<!-- BigCommerce -->
<iframe src="https://your-store.mybigcommerce.com/..."></iframe>
```

**The system automatically:**
- ✅ Detects the platform type
- ✅ Applies GDPR consent requirements
- ✅ Shows/hides based on user consent
- ✅ Tracks purchases and analytics (with consent)
- ✅ Manages data retention

### **Method 2: Custom Store Elements**
Add data attributes for custom store elements:

```html
<!-- Custom Shopify section -->
<div class="shopify-store" data-shopify>
    <!-- Your custom store content -->
</div>

<!-- Custom Zoho Commerce section -->
<div class="zoho-commerce" data-zoho-commerce>
    <!-- Your custom store content -->
</div>
```

### **Method 3: Programmatic Integration**
For advanced integrations, use the JavaScript API:

```javascript
// Track a purchase
window.VRUUX_EcommerceHandler.trackPurchase({
    transactionId: 'TXN123',
    value: 99.99,
    currency: 'USD',
    items: [
        {
            item_id: 'PROD001',
            item_name: 'Product Name',
            price: 99.99,
            quantity: 1
        }
    ],
    platform: 'shopify'
});

// Track add to cart
window.VRUUX_EcommerceHandler.trackAddToCart({
    productId: 'PROD001',
    productName: 'Product Name',
    price: 99.99,
    quantity: 1,
    platform: 'shopify'
});

// Track product view
window.VRUUX_EcommerceHandler.trackProductView({
    productId: 'PROD001',
    productName: 'Product Name',
    category: 'Electronics',
    price: 99.99,
    platform: 'shopify'
});
```

## 🔒 **GDPR Compliance Features**

### **Consent-Based Store Display**
When users haven't given consent:

```
┌─────────────────────────────────────┐
│           🛒 Store Name             │
│                                     │
│ This store requires your consent to │
│ display and process transactions.   │
│                                     │
│ [Manage Cookie Preferences] [Learn] │
└─────────────────────────────────────┘
```

### **Purchase Tracking**
- ✅ **Consent required** before tracking purchases
- ✅ **Analytics integration** with Google Analytics
- ✅ **Data export** for user rights
- ✅ **Data retention** policies enforced

### **Cart Management**
- ✅ **Add to cart** events tracked (with consent)
- ✅ **Cart abandonment** tracking (with consent)
- ✅ **Product recommendations** (with consent)

## 📊 **Analytics Integration**

### **Automatic E-commerce Events**
The system automatically tracks these events (with consent):

```javascript
// Purchase event
gtag('event', 'purchase', {
    transaction_id: 'TXN123',
    value: 99.99,
    currency: 'USD',
    items: [...]
});

// Add to cart event
gtag('event', 'add_to_cart', {
    items: [{
        item_id: 'PROD001',
        item_name: 'Product Name',
        price: 99.99,
        quantity: 1
    }]
});

// View item event
gtag('event', 'view_item', {
    items: [{
        item_id: 'PROD001',
        item_name: 'Product Name',
        item_category: 'Electronics',
        price: 99.99
    }]
});
```

### **Custom E-commerce Tracking**
Add custom tracking for your specific needs:

```javascript
// Track store interactions
function trackStoreInteraction(action, data) {
    if (window.VRUUX_EcommerceHandler.hasOptionalConsent('analytics')) {
        gtag('event', 'store_interaction', {
            'action': action,
            'store_platform': data.platform,
            'product_id': data.productId
        });
    }
}

// Track customer support
function trackSupportRequest(supportType) {
    if (window.VRUUX_EcommerceHandler.hasOptionalConsent('analytics')) {
        gtag('event', 'support_request', {
            'support_type': supportType
        });
    }
}
```

## ⚙️ **Configuration Options**

### **Basic Configuration**
Edit `assets/vruux-cmp/config.js`:

```javascript
window.VRUUX_CMP_CONFIG = {
    // ... existing config ...
    
    ecommerce: {
        // Enable/disable e-commerce features
        enabled: true,
        
        // Tracking settings
        trackPurchases: true,
        trackCart: true,
        trackProductViews: true,
        
        // Platform settings
        platforms: {
            shopify: { enabled: true, category: 'marketing' },
            zohoCommerce: { enabled: true, category: 'marketing' },
            woocommerce: { enabled: true, category: 'marketing' }
        },
        
        // Currency and region
        currency: 'USD',
        region: 'US',
        
        // Data retention
        dataRetention: {
            purchaseHistory: 365, // days
            cartData: 30, // days
            productViews: 90 // days
        }
    }
};
```

### **Advanced Configuration**
For complex stores, customize the e-commerce handler:

```javascript
// Override default settings
window.VRUUX_EcommerceHandler.config.platforms.shopify = {
    enabled: true,
    category: 'marketing',
    trackingEvents: ['purchase', 'add_to_cart', 'view_item', 'begin_checkout'],
    consentRequired: true
};

// Add custom platform
window.VRUUX_EcommerceHandler.config.platforms.customStore = {
    enabled: true,
    category: 'marketing',
    trackingEvents: ['purchase', 'add_to_cart'],
    consentRequired: true
};
```

## 🔧 **Database Integration**

### **Purchase Data Storage**
When users make purchases, consent data is automatically captured:

```javascript
// Purchase data structure
const purchaseData = {
    transaction_id: 'TXN123',
    value: 99.99,
    currency: 'USD',
    items: [...],
    platform: 'shopify',
    timestamp: '2024-01-01T12:00:00.000Z',
    consent: {
        analytics: true,
        marketing: true,
        timestamp: '2024-01-01T11:55:00.000Z'
    }
};
```

### **Server-Side Processing**
Add this to your purchase processing script:

```php
<?php
// Example PHP integration for purchase processing
function processPurchase($purchaseData) {
    // Validate consent
    if (!isset($purchaseData['consent']['analytics']) || !$purchaseData['consent']['analytics']) {
        // Handle purchase without analytics tracking
        logPurchaseWithoutTracking($purchaseData);
    } else {
        // Process with full tracking
        processPurchaseWithTracking($purchaseData);
    }
    
    // Store consent data
    storeConsentData($purchaseData['consent']);
    
    // Send confirmation
    sendPurchaseConfirmation($purchaseData);
}
?>
```

## 📈 **Performance Optimization**

### **Lazy Loading**
Stores are automatically lazy-loaded for better performance:

```html
<!-- Store will only load after consent -->
<iframe src="https://your-store.myshopify.com/..." loading="lazy"></iframe>
```

### **Conditional Loading**
Stores only load when consent is given:

```javascript
// Check if store should load
if (window.VRUUX_EcommerceHandler.hasRequiredConsent()) {
    loadStore();
} else {
    showConsentPlaceholder();
}
```

## 🎯 **Best Practices**

### **For Store Integration**
1. **Test thoroughly**: Test with consent denied and granted
2. **Fallback content**: Provide store information when blocked
3. **Performance**: Use lazy loading for heavy stores
4. **Accessibility**: Ensure placeholders are accessible
5. **Documentation**: Document any custom integrations

### **For Purchase Tracking**
1. **Consent validation**: Always check consent before tracking
2. **Data minimization**: Only collect necessary data
3. **Data retention**: Implement automatic data deletion
4. **Export rights**: Allow users to export purchase data
5. **Security**: Use secure payment processing

### **For Analytics**
1. **Consent-aware**: Only track with explicit consent
2. **Data anonymization**: Anonymize data when possible
3. **Event tracking**: Track meaningful e-commerce events
4. **Conversion tracking**: Track conversions with consent
5. **Privacy-first**: Prioritize user privacy

## 🚀 **Quick Start Checklist**

### **For Store Integration**
- [ ] Embed your store normally (no changes needed)
- [ ] Test store display with consent denied
- [ ] Test store display with consent granted
- [ ] Verify purchase tracking works
- [ ] Test data export functionality

### **For Custom Integration**
- [ ] Add data attributes to custom store elements
- [ ] Implement custom tracking functions
- [ ] Test with different consent settings
- [ ] Verify analytics integration
- [ ] Document custom implementation

### **For Database Integration**
- [ ] Update purchase processing to capture consent
- [ ] Implement data retention policies
- [ ] Add data export functionality
- [ ] Test consent validation
- [ ] Implement data anonymization

## 📞 **Support**

If you need help with e-commerce integration:

1. **Check the config file** for platform settings
2. **Test with browser console** to see tracking events
3. **Use the public APIs** for custom handling
4. **Review the documentation** for best practices
5. **Contact support** for complex integrations

## 🎉 **Summary**

### **What's Automatic:**
- ✅ **All major platforms** (Shopify, Zoho, WooCommerce, etc.)
- ✅ **Consent management** (store display, tracking)
- ✅ **Purchase tracking** (with consent)
- ✅ **Analytics integration** (Google Analytics)
- ✅ **Data export** (user rights)
- ✅ **Performance optimization** (lazy loading)

### **What You Need to Do:**
- ✅ **Nothing for most stores** - they work automatically
- ✅ **Embed normally** - no special configuration needed
- ✅ **Test the system** to ensure it works
- ✅ **Optional**: Add custom tracking for specific needs

The e-commerce system is **completely automatic and GDPR-compliant**! Just embed your stores normally, and everything is handled automatically. 🚀 