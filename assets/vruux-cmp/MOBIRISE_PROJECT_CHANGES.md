# Mobirise Project Changes Guide
## Preserving Our Implementation & Preventing Duplication

**Document Created:** January 2025  
**Purpose:** Guide for updating Mobirise project to preserve our GTM implementation  
**Current Implementation:** Google Tag Manager + Consent Mode 2.0

---

## 🚨 **Critical Changes Required in Mobirise**

### **1. Disable Mobirise's Built-in Cookie Alert**

**LOCATION:** Project Settings → Cookies Alert

**ACTION:** **DISABLE** Mobirise's cookie alert system

**WHY:** Our custom GDPR consent system will handle this

**Steps:**
1. Open Mobirise
2. Go to **Project Settings** (gear icon)
3. Find **Cookies Alert** section
4. **Uncheck** "Enable Cookies Alert"
5. Or set `cookiesAlertType` to `"0"` in project settings

---

### **2. Remove Mobirise's Google Analytics**

**LOCATION:** Project Settings → Google Analytics

**ACTION:** **REMOVE** Mobirise's Google Analytics code

**WHY:** Our GTM implementation handles analytics better

**Steps:**
1. Open Mobirise
2. Go to **Project Settings** (gear icon)
3. Find **Google Analytics** section
4. **Clear** the analytics code field
5. Or delete the `google-analytics` setting from project.mobirise

---

### **3. Disable Mobirise's GDPR Notice**

**LOCATION:** Project Settings → GDPR

**ACTION:** **DISABLE** Mobirise's GDPR notice

**WHY:** Our custom consent system provides better GDPR compliance

**Steps:**
1. Open Mobirise
2. Go to **Project Settings** (gear icon)
3. Find **GDPR** section
4. **Uncheck** "Enable GDPR Notice"
5. Or remove the `gdpr` section from project.mobirise

---

## 📋 **Mobirise Project Settings to Update**

### **Current Settings (Remove/Disable):**

```json
// REMOVE these from project.mobirise
"cookiesAlert": {
  "customDialogSelector": false,
  "colorText": "#000000",
  "colorBg": "#ff9900",
  "colorButton": "#ffffff",
  "rejectColor": "#ff4552",
  "colorLink": "#424a4d",
  "underlineLink": true,
  "opacityOverlay": "0",
  "bgOpacity": "100",
  "text": "We use cookies to give you the best experience...",
  "textButton": "ACCEPT",
  "rejectText": "REJECT"
},
"cookiesAlertType": "2",
"gdpr": {
  "colorText": "#000000",
  "colorLink": "#149dcc",
  "underlineLink": false,
  "text": "By continuing you agree to our Privacy Policy."
},
"google-analytics": "<!-- Google tag (gtag.js) -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-D92G25M5GQ\"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'G-D92G25M5GQ');\n</script>"
```

### **Updated Settings (Keep/Add):**

```json
// KEEP these settings
"settings": {
  "currentPage": "privacypolicy.html",
  "theme": {
    // ... existing theme settings
  },
  "path": "@PROJECT_PATH@",
  "name": "YakDoo",
  "versionFirst": "6.0.6",
  "siteFonts": [
    // ... existing fonts
  ],
  "publishChangesOnly": false,
  // REMOVE: cookiesAlert, cookiesAlertType, gdpr, google-analytics
  "sitemapSwitcher": false,
  "siteUrl": false,
  "sitemapSwitcherAuto": "on",
  "imageResize": true,
  "usedWebp": true,
  "favicon": false,
  "mbrsiteDomain": "zncwbazcng",
  "robotsSwitcher": false,
  "uniqCompNum": 33,
  "versionPublish": "6.1.0",
  "screenshot": "screenshot.png",
  "robotsText": "User-agent: *\r\nDisallow: /cgi-bin\r\n",
  "publishEditFolder": true
}
```

---

## 🔧 **Manual Project.mobirise Updates**

### **If Mobirise UI Doesn't Allow Changes:**

**Edit project.mobirise directly:**

1. **Remove Cookie Alert Settings:**
   ```json
   // DELETE these lines from project.mobirise
   "cookiesAlert": { ... },
   "cookiesAlertType": "2",
   ```

2. **Remove GDPR Settings:**
   ```json
   // DELETE these lines from project.mobirise
   "gdpr": { ... },
   ```

3. **Remove Google Analytics:**
   ```json
   // DELETE these lines from project.mobirise
   "google-analytics": "...",
   ```

---

## 📄 **HTML Files Already Updated**

### **✅ Our Implementation is Already in Place:**

All HTML files already include our GTM implementation:

```html
<!-- This is already in all HTML files -->
<script src="assets/vruux-cmp/gtm-simple.js"></script>
```

**Files Updated:**
- ✅ `index.html`
- ✅ `contact.html`
- ✅ `blog.html`
- ✅ `faqs.html`
- ✅ `privacypolicy.html`

---

## 🎯 **What Happens If You Don't Make These Changes**

### **❌ Problems You'll Face:**

1. **Duplicate Cookie Banners**
   - Mobirise's cookie alert + Our custom consent banner
   - Users will see two different cookie notices

2. **Duplicate Analytics**
   - Mobirise's Google Analytics + Our GTM analytics
   - Double tracking, inaccurate data

3. **Conflicting GDPR Notices**
   - Mobirise's GDPR notice + Our custom consent system
   - Confusing user experience

4. **Performance Issues**
   - Multiple analytics scripts loading
   - Slower page load times

5. **GDPR Compliance Issues**
   - Multiple consent mechanisms
   - Potential legal compliance problems

---

## ✅ **What You Get After Making Changes**

### **🎯 Clean Implementation:**

1. **Single Cookie Banner** - Our custom GDPR-compliant consent system
2. **Single Analytics** - GTM with Google Analytics 4 + Microsoft Clarity
3. **Professional Management** - GTM interface for all tracking
4. **Better Performance** - Optimized loading and resources
5. **GDPR Compliant** - Proper consent management

### **📊 Benefits:**

- **No Duplication** - Single source of truth for analytics
- **Better Control** - GTM interface for management
- **Professional Tools** - Debugging and testing capabilities
- **Future-Proof** - Industry-standard implementation
- **Compliance** - Proper GDPR consent handling

---

## 🔄 **Step-by-Step Process**

### **1. Open Mobirise Project**
1. Launch Mobirise
2. Open your YakDoo project

### **2. Disable Cookie Alert**
1. Go to **Project Settings** (gear icon)
2. Find **Cookies Alert** section
3. **Uncheck** "Enable Cookies Alert"
4. Click **Save**

### **3. Remove Google Analytics**
1. Go to **Project Settings** (gear icon)
2. Find **Google Analytics** section
3. **Clear** the analytics code field
4. Click **Save**

### **4. Disable GDPR Notice**
1. Go to **Project Settings** (gear icon)
2. Find **GDPR** section
3. **Uncheck** "Enable GDPR Notice"
4. Click **Save**

### **5. Verify Changes**
1. Preview your site
2. Check that only our custom consent banner appears
3. Verify no duplicate analytics are loading
4. Test consent functionality

---

## 🚨 **Important Notes**

### **⚠️ Before Publishing:**

1. **Test Thoroughly** - Make sure everything works
2. **Check Console** - No JavaScript errors
3. **Verify Analytics** - GTM is tracking correctly
4. **Test Consent** - Banner works properly
5. **Mobile Testing** - Works on all devices

### **📝 Backup Strategy:**

1. **Backup Current Project** - Save a copy before changes
2. **Version Control** - Use Git for tracking changes
3. **Test Environment** - Test changes before production
4. **Rollback Plan** - Know how to revert if needed

---

## 🎯 **Final Checklist**

- [ ] Disable Mobirise's Cookie Alert
- [ ] Remove Mobirise's Google Analytics
- [ ] Disable Mobirise's GDPR Notice
- [ ] Verify our GTM implementation works
- [ ] Test consent banner functionality
- [ ] Check for no duplicate scripts
- [ ] Verify analytics tracking
- [ ] Test on mobile devices
- [ ] Backup project before publishing

---

## 📞 **Support**

If you encounter issues:

1. **Check Console** - Look for JavaScript errors
2. **Verify File Paths** - Ensure assets/vruux-cmp/ files exist
3. **Test Step by Step** - Make changes one at a time
4. **Refer to Documentation** - Check README.md for implementation details

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Status:** Ready for Implementation 