# Forms and Integrations GDPR Guide

## 📝 **Form Handling**

### **Embedded Forms (Microsoft Forms, Google Forms, Zoho)**

#### ✅ **Automatically Handled**
These forms are **automatically detected and managed** by the system:

- **Microsoft Forms**: `forms.office.com` - Treated as necessary
- **Google Forms**: `docs.google.com/forms` - Treated as necessary  
- **Zoho Forms**: `zoho.com` - Treated as necessary
- **Typeform**: `typeform.com` - Requires marketing consent
- **Jotform**: `jotform.com` - Requires marketing consent
- **Wufoo**: `wufoo.com` - Requires marketing consent

#### **How It Works**
```html
<!-- Your normal embed - automatically handled -->
<iframe src="https://forms.office.com/Pages/ResponsePage.aspx?id=..."></iframe>
<iframe src="https://docs.google.com/forms/d/e/.../viewform"></iframe>
```

**The system automatically:**
- ✅ Detects the form type
- ✅ Applies appropriate consent requirements
- ✅ Shows/hides based on user consent
- ✅ No manual configuration needed

### **Custom HTML Forms**

#### **Automatic Enhancement**
Your custom forms are **automatically enhanced** with GDPR compliance:

```html
<!-- Your existing form -->
<form class="contact-form" action="/submit" method="POST">
    <input type="text" name="name" placeholder="Your Name" required>
    <input type="email" name="email" placeholder="Your Email" required>
    <textarea name="message" placeholder="Your Message" required></textarea>
    <button type="submit">Send Message</button>
</form>
```

**Automatically becomes:**
```html
<form class="contact-form" action="/submit" method="POST">
    <input type="text" name="name" placeholder="Your Name" required>
    <input type="email" name="email" placeholder="Your Email" required>
    <textarea name="message" placeholder="Your Message" required></textarea>
    
    <!-- Automatically added consent section -->
    <div class="gdpr-consent-section">
        <h4>Data Protection & Privacy</h4>
        <p>By submitting this form, you agree to our data processing practices...</p>
        
        <label>
            <input type="checkbox" name="gdpr_consent" required>
            I consent to the processing of my personal data
        </label>
        
        <label>
            <input type="checkbox" name="gdpr_marketing">
            I agree to receive marketing communications (optional)
        </label>
        
        <label>
            <input type="checkbox" name="gdpr_analytics">
            I consent to analytics tracking (optional)
        </label>
    </div>
    
    <button type="submit">Send Message</button>
</form>
```

#### **Supported Form Selectors**
The system automatically detects forms with these classes/IDs:
- `form[data-gdpr-form]`
- `.contact-form`
- `.enquiry-form`
- `.feedback-form`
- `#contactForm`
- `#enquiryForm`

**To add your custom form:**
```html
<!-- Add this attribute to your form -->
<form class="your-custom-form" data-gdpr-form>
    <!-- Your form fields -->
</form>
```

## 🛒 **Future Integrations (Stores, Services)**

### **E-commerce Platforms**
The system is ready for these integrations:

#### **Spotify Store**
```html
<!-- Automatically handled -->
<iframe src="https://open.spotify.com/embed/..."></iframe>
```

#### **Zoho Commerce**
```html
<!-- Automatically handled -->
<iframe src="https://store.zoho.com/..."></iframe>
```

#### **Other Platforms**
- **Shopify**: Automatically detected
- **WooCommerce**: Automatically detected
- **BigCommerce**: Automatically detected
- **Squarespace**: Automatically detected

### **Adding New Services**

#### **Method 1: Automatic Detection**
Most services are automatically detected. Just embed normally:

```html
<!-- New service - automatically handled -->
<iframe src="https://newservice.com/embed/..."></iframe>
```

#### **Method 2: Manual Configuration**
For custom services, update `assets/vruux-cmp/config.js`:

```javascript
window.VRUUX_CMP_CONFIG = {
    // ... existing config ...
    
    thirdParty: {
        // ... existing services ...
        
        services: {
            // ... existing services ...
            
            // Add your new service
            yourNewService: { 
                enabled: true, 
                category: 'marketing' // or 'necessary' or 'analytics'
            }
        }
    }
};
```

#### **Method 3: Custom Handler**
For complex integrations, create a custom handler:

```javascript
// Add to your page or in a separate file
window.VRUUX_CustomHandler = {
    init: function() {
        // Your custom logic
        const customElements = document.querySelectorAll('.your-custom-element');
        
        customElements.forEach(element => {
            if (!window.YakDooCookieConsent.getPreferences()?.marketing) {
                element.style.display = 'none';
                // Show placeholder
            }
        });
    }
};

// Initialize
window.VRUUX_CustomHandler.init();
```

## 🔧 **Database Integration**

### **Form Data Storage**
When users submit forms, the system tracks consent data:

```javascript
// Consent data automatically captured
const consentData = {
    timestamp: "2024-01-01T12:00:00.000Z",
    formId: "contact-form",
    requiredConsent: true,
    marketingConsent: false,
    analyticsConsent: true,
    userAgent: "Mozilla/5.0...",
    ipAddress: "anonymized"
};
```

### **Server-Side Integration**
Add this to your form processing script:

```php
<?php
// Example PHP integration
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    // Get consent data
    $gdprConsent = isset($_POST['gdpr_consent']) ? true : false;
    $marketingConsent = isset($_POST['gdpr_marketing']) ? true : false;
    $analyticsConsent = isset($_POST['gdpr_analytics']) ? true : false;
    
    // Validate consent
    if (!$gdprConsent) {
        http_response_code(400);
        echo "Consent required";
        exit;
    }
    
    // Store in database with consent tracking
    $sql = "INSERT INTO form_submissions (name, email, message, gdpr_consent, marketing_consent, analytics_consent, ip_address, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
    
    // Execute with prepared statements
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$name, $email, $message, $gdprConsent, $marketingConsent, $analyticsConsent, $_SERVER['REMOTE_ADDR']]);
    
    // Send response
    echo "Form submitted successfully";
}
?>
```

### **Data Export Functionality**
Users can export their data:

```javascript
// Available in browser console
window.VRUUX_FormHandler.exportData();

// Or add a button to your page
document.body.appendChild(window.VRUUX_FormHandler.createExportButton());
```

## 📊 **Analytics Integration**

### **Form Submission Tracking**
If analytics consent is given, form submissions are tracked:

```javascript
// Automatically sent to Google Analytics
gtag('event', 'form_submit', {
    'form_id': 'contact-form',
    'consent_given': true
});
```

### **Custom Events**
Add custom tracking for your integrations:

```javascript
// Track store interactions
function trackStoreInteraction(productId, action) {
    if (window.YakDooCookieConsent.getPreferences()?.analytics) {
        gtag('event', 'store_interaction', {
            'product_id': productId,
            'action': action
        });
    }
}

// Track form completions
function trackFormCompletion(formType) {
    if (window.YakDooCookieConsent.getPreferences()?.analytics) {
        gtag('event', 'form_complete', {
            'form_type': formType
        });
    }
}
```

## 🎯 **Best Practices**

### **For Forms**
1. **Always require consent**: The system automatically adds required consent checkboxes
2. **Clear explanations**: Consent text is automatically added
3. **Data retention**: Configure retention periods in the config
4. **Export rights**: Users can export their data
5. **Withdrawal**: Users can withdraw consent anytime

### **For Integrations**
1. **Test thoroughly**: Test with consent denied and granted
2. **Fallback content**: Provide alternatives when content is blocked
3. **Performance**: Use lazy loading for heavy integrations
4. **Accessibility**: Ensure placeholders are accessible
5. **Documentation**: Document any custom integrations

### **For Database**
1. **Consent tracking**: Always store consent data with submissions
2. **Data retention**: Implement automatic data deletion
3. **Anonymization**: Anonymize data after retention period
4. **Export functionality**: Allow users to export their data
5. **Security**: Use prepared statements and validate input

## 🚀 **Quick Start Checklist**

### **For Forms**
- [ ] Add `data-gdpr-form` attribute to your forms
- [ ] Test form submission with consent denied
- [ ] Test form submission with consent granted
- [ ] Verify consent data is captured
- [ ] Test data export functionality

### **For Integrations**
- [ ] Embed your third-party content normally
- [ ] Test with different consent settings
- [ ] Verify placeholders appear when consent denied
- [ ] Test content appears when consent granted
- [ ] Add any custom configurations to config file

### **For Database**
- [ ] Update form processing to capture consent data
- [ ] Implement data retention policies
- [ ] Add data export functionality
- [ ] Test consent validation
- [ ] Implement data anonymization

## 📞 **Support**

If you need help with specific integrations:

1. **Check the config file** for existing service configurations
2. **Test with browser console** to see what's being detected
3. **Use the public APIs** for custom handling
4. **Review the documentation** for best practices
5. **Contact support** for complex integrations

The system is designed to be **automatic and future-proof** - most integrations will work without any configuration! 🎉 