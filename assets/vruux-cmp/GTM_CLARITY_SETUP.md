# Microsoft Clarity GTM Setup Guide

## 🎯 **Recommendation: Use GTM for Clarity**

**GTM is the better choice** for managing Microsoft Clarity because:

1. **Privacy Compliance** - Respects user consent
2. **Centralized Management** - All analytics in one place
3. **Professional Tools** - Better debugging and testing
4. **Consistent Workflow** - Same interface as other tags

## 🚀 **Step-by-Step GTM Setup**

### **Step 1: Create Clarity Tag**

1. **Go to GTM** → Tags → New
2. **Tag Configuration**:
   - **Tag Type**: Custom HTML
   - **Tag Name**: Microsoft Clarity
   - **HTML Code**:
   ```html
   <script type="text/javascript">
   (function(c,l,a,r,i,t,y){
       c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
       t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
       y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
   })(window, document, "clarity", "script", "{{Clarity ID}}");
   </script>
   ```

### **Step 2: Create Clarity ID Variable**

1. **Go to GTM** → Variables → New
2. **Variable Configuration**:
   - **Variable Type**: Constant
   - **Variable Name**: Clarity ID
   - **Value**: Your Clarity ID (e.g., `k8q7x2m9p1`)

### **Step 3: Create Consent Trigger**

1. **Go to GTM** → Triggers → New
2. **Trigger Configuration**:
   - **Trigger Type**: Custom Event
   - **Event Name**: consent_update
   - **This trigger fires on**: All Custom Events
   - **Add condition**:
     - **Variable**: `{{Consent - Analytics}}`
     - **Operator**: equals
     - **Value**: granted

### **Step 4: Create Consent Variable**

1. **Go to GTM** → Variables → New
2. **Variable Configuration**:
   - **Variable Type**: Data Layer Variable
   - **Variable Name**: Consent - Analytics
   - **Data Layer Variable Name**: consent.analytics_storage
   - **Default Value**: denied

### **Step 5: Assign Trigger to Tag**

1. **In Clarity Tag** → Triggering
2. **Choose a trigger**: Select the consent trigger you created
3. **Save the tag**

## 🔧 **Enhanced Configuration**

### **Advanced Clarity Settings**

```html
<!-- Enhanced Clarity Tag with Settings -->
<script type="text/javascript">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "{{Clarity ID}}");

// Clarity settings
clarity("set", "anonymizeIP", true);
clarity("set", "disableTelemetry", false);
clarity("set", "sessionReplay", true);
clarity("set", "heatmaps", true);
</script>
```

### **Privacy-Focused Settings**

```html
<!-- Privacy-Enhanced Clarity Tag -->
<script type="text/javascript">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "{{Clarity ID}}");

// Privacy settings
clarity("set", "anonymizeIP", true);
clarity("set", "disableTelemetry", false);
clarity("set", "sessionReplay", true);
clarity("set", "heatmaps", true);
clarity("set", "privacyMode", true);
clarity("set", "maskTextInputs", true);
clarity("set", "maskUserInput", true);
</script>
```

## 📊 **Testing and Debugging**

### **GTM Preview Mode**

1. **Enable Preview Mode** in GTM
2. **Visit your website**
3. **Check if Clarity loads** when consent is given
4. **Verify in browser console**:
   ```javascript
   // Check if Clarity is loaded
   console.log('Clarity loaded:', typeof clarity !== 'undefined');
   
   // Check Clarity settings
   console.log('Clarity settings:', clarity);
   ```

### **Consent Testing**

```javascript
// Test consent update
window.dataLayer.push({
    'event': 'consent_update',
    'consent': {
        'analytics_storage': 'granted'
    }
});

// Check if Clarity loads
setTimeout(() => {
    console.log('Clarity after consent:', typeof clarity !== 'undefined');
}, 1000);
```

## 🎯 **Configuration Options**

### **Update Your Config**

```javascript
// In assets/vruux-cmp/config.js
window.VRUUX_CMP_CONFIG = {
    // GTM container ID
    gtmId: 'GTM-XXXXXXX',
    
    // GA4 measurement ID
    gaId: 'G-D92G25M5GQ',
    
    // Microsoft Clarity ID
    clarityId: 'YOUR_CLARITY_ID',
    
    // Clarity settings
    clarity: {
        anonymizeIP: true,
        sessionReplay: true,
        heatmaps: true,
        privacyMode: true,
        maskTextInputs: true
    }
};
```

### **Enhanced GTM Script**

The updated `gtm-simple.js` now includes Clarity management:

```javascript
// Clarity is automatically managed through GTM
// No additional code needed in your HTML
```

## 🔒 **Privacy and Compliance**

### **GDPR Compliance**

- **Consent-based loading** - Only loads when user consents
- **Privacy settings** - IP anonymization and data masking
- **User control** - Can be disabled through consent preferences
- **Data protection** - Respects user privacy choices

### **Privacy Settings**

```javascript
// Automatic privacy settings in GTM
clarity("set", "anonymizeIP", true);
clarity("set", "privacyMode", true);
clarity("set", "maskTextInputs", true);
clarity("set", "maskUserInput", true);
```

## 📈 **Performance Optimization**

### **Conditional Loading**

- **Only loads when needed** - Respects user consent
- **Async loading** - Doesn't block page rendering
- **Resource optimization** - Better performance
- **Monitoring** - Track loading times in GTM

### **Best Practices**

1. **Use consent triggers** - Only load when analytics consent given
2. **Enable privacy settings** - Protect user data
3. **Monitor performance** - Track tag loading times
4. **Test thoroughly** - Use GTM preview mode
5. **Document settings** - Keep track of configurations

## 🚀 **Quick Implementation**

### **1. Update Configuration**
```javascript
window.VRUUX_CMP_CONFIG = {
    gtmId: 'GTM-XXXXXXX',
    gaId: 'G-D92G25M5GQ',
    clarityId: 'YOUR_CLARITY_ID'
};
```

### **2. Create GTM Tags**
- GA4 Configuration Tag
- Microsoft Clarity Tag
- Consent-based triggers

### **3. Test and Deploy**
- Use GTM preview mode
- Test consent scenarios
- Deploy when ready

## 📋 **Comparison Summary**

| Feature | GTM Management | Direct Script |
|---------|---------------|---------------|
| **Privacy Compliance** | ✅ Full GDPR compliance | ❌ No consent control |
| **Management** | ✅ Visual interface | ❌ Manual code editing |
| **Debugging** | ✅ Professional tools | ❌ Console logs only |
| **Performance** | ✅ Conditional loading | ❌ Always loads |
| **Testing** | ✅ Preview mode | ❌ Manual testing |
| **Maintenance** | ✅ Easy updates | ❌ Code changes required |

## 🎯 **Final Recommendation**

**Use GTM for Microsoft Clarity** because:

1. **Better privacy compliance** - respects user consent
2. **Professional management** - visual interface and tools
3. **Consistent workflow** - same as other analytics
4. **Future-proof** - easy to update and maintain
5. **Performance optimized** - conditional loading

The slight delay from GTM is negligible compared to the benefits of proper consent management and professional tools. 