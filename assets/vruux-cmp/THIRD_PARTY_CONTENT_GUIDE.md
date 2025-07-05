# Third-Party Content Management Guide
## YouTube Videos, External Blogs, Images & More

**Document Created:** January 2025  
**Purpose:** Handle third-party content with GDPR compliance and GTM integration  
**Implementation:** Google Tag Manager + Consent Mode 2.0

---

## 📋 **Overview**

This guide covers how to properly handle third-party content like YouTube videos, external blogs, images from other sites, and other embedded content while maintaining GDPR compliance and proper analytics tracking.

---

## 🎥 **YouTube Videos**

### **1. Privacy-Enhanced YouTube Embeds**

**Use privacy-enhanced YouTube URLs:**
```html
<!-- Instead of: -->
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>

<!-- Use: -->
<iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" 
        title="Video Title"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
```

### **2. Consent-Based YouTube Loading**

**Create GTM Tag for YouTube:**
```html
<!-- GTM Custom HTML Tag -->
<script>
(function() {
    // Check if consent is given
    if ({{Consent - Analytics}} === 'granted') {
        // Load YouTube iframe
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/{{YouTube Video ID}}';
        iframe.title = '{{Video Title}}';
        iframe.loading = 'lazy';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowfullscreen = true;
        
        // Replace placeholder
        var placeholder = document.getElementById('youtube-placeholder-{{YouTube Video ID}}');
        if (placeholder) {
            placeholder.parentNode.replaceChild(iframe, placeholder);
        }
    }
})();
</script>
```

### **3. YouTube Placeholder (No Consent)**

**HTML for consent-required videos:**
```html
<div id="youtube-placeholder-{{VIDEO_ID}}" class="youtube-placeholder">
    <div class="placeholder-content">
        <div class="placeholder-icon">▶️</div>
        <h3>Video Content</h3>
        <p>This video requires your consent to load. Please accept analytics cookies to view.</p>
        <button onclick="loadYouTubeVideo('{{VIDEO_ID}}')" class="btn btn-primary">
            Accept & Watch Video
        </button>
    </div>
</div>
```

### **4. YouTube Tracking in GTM**

**Create YouTube Event Tag:**
- **Tag Type**: Google Analytics: GA4 Event
- **Event Name**: video_start
- **Parameters**:
  - `video_title`: `{{DLV - Video Title}}`
  - `video_provider`: `youtube`
  - `video_id`: `{{DLV - Video ID}}`
- **Trigger**: Custom Event - `youtube_video_start`

---

## 📰 **External Blogs & Articles**

### **1. External Blog Embeds**

**For embedded blog content:**
```html
<!-- External blog embed with consent check -->
<div class="external-blog-container" data-blog-url="{{BLOG_URL}}">
    <div class="blog-placeholder" id="blog-placeholder-{{BLOG_ID}}">
        <h3>External Blog Content</h3>
        <p>This content is from an external source and requires your consent to load.</p>
        <button onclick="loadExternalBlog('{{BLOG_ID}}')" class="btn btn-secondary">
            Load External Content
        </button>
    </div>
    <div class="blog-content" id="blog-content-{{BLOG_ID}}" style="display: none;">
        <!-- Content will be loaded here -->
    </div>
</div>
```

### **2. External Blog Loading Function**

**JavaScript for loading external content:**
```javascript
function loadExternalBlog(blogId) {
    // Check consent
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
    
    // Load content
    var placeholder = document.getElementById('blog-placeholder-' + blogId);
    var content = document.getElementById('blog-content-' + blogId);
    
    if (placeholder && content) {
        // Show loading state
        placeholder.innerHTML = '<div class="loading">Loading content...</div>';
        
        // Load external content (example)
        fetch('/api/external-blog/' + blogId)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
                content.style.display = 'block';
                placeholder.style.display = 'none';
                
                // Track blog load
                if (window.VRUUX_GTM) {
                    window.VRUUX_GTM.trackEvent('external_blog_load', {
                        'blog_id': blogId,
                        'blog_source': 'external'
                    });
                }
            })
            .catch(error => {
                placeholder.innerHTML = '<div class="error">Unable to load content</div>';
            });
    }
}
```

### **3. External Blog Tracking**

**GTM Event for external blog loads:**
- **Event Name**: external_blog_load
- **Parameters**:
  - `blog_id`: Blog identifier
  - `blog_source`: Source platform
  - `blog_category`: Content category

---

## 🖼️ **External Images**

### **1. Consent-Based Image Loading**

**For images from external sources:**
```html
<!-- External image with consent check -->
<div class="external-image-container">
    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage placeholder%3C/text%3E%3C/svg%3E"
         alt="Image placeholder"
         class="image-placeholder"
         data-external-src="{{EXTERNAL_IMAGE_URL}}"
         data-image-title="{{IMAGE_TITLE}}"
         onclick="loadExternalImage(this)">
    
    <div class="image-overlay">
        <p>Click to load external image</p>
    </div>
</div>
```

### **2. External Image Loading Function**

**JavaScript for loading external images:**
```javascript
function loadExternalImage(imgElement) {
    // Check consent
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
    
    var externalSrc = imgElement.getAttribute('data-external-src');
    var imageTitle = imgElement.getAttribute('data-image-title');
    
    if (externalSrc) {
        // Show loading state
        imgElement.style.opacity = '0.5';
        
        // Load image
        var newImg = new Image();
        newImg.onload = function() {
            imgElement.src = externalSrc;
            imgElement.alt = imageTitle;
            imgElement.style.opacity = '1';
            imgElement.classList.remove('image-placeholder');
            
            // Track image load
            if (window.VRUUX_GTM) {
                window.VRUUX_GTM.trackEvent('external_image_load', {
                    'image_source': new URL(externalSrc).hostname,
                    'image_title': imageTitle
                });
            }
        };
        newImg.onerror = function() {
            imgElement.style.opacity = '1';
            imgElement.alt = 'Image failed to load';
        };
        newImg.src = externalSrc;
    }
}
```

### **3. Image Tracking in GTM**

**Create image load event:**
- **Event Name**: external_image_load
- **Parameters**:
  - `image_source`: Image hostname
  - `image_title`: Image title/description
  - `image_category`: Image category

---

## 🔗 **Social Media Embeds**

### **1. Social Media Platform Handling**

**For Twitter, Facebook, Instagram, etc.:**
```html
<!-- Social media embed with consent -->
<div class="social-embed-container" data-platform="{{PLATFORM}}" data-post-id="{{POST_ID}}">
    <div class="social-placeholder" id="social-placeholder-{{PLATFORM}}-{{POST_ID}}">
        <div class="platform-icon">{{PLATFORM_ICON}}</div>
        <h4>{{PLATFORM}} Content</h4>
        <p>This {{PLATFORM}} content requires your consent to load.</p>
        <button onclick="loadSocialEmbed('{{PLATFORM}}', '{{POST_ID}}')" class="btn btn-primary">
            Load {{PLATFORM}} Content
        </button>
    </div>
    <div class="social-content" id="social-content-{{PLATFORM}}-{{POST_ID}}" style="display: none;">
        <!-- Social media content will be loaded here -->
    </div>
</div>
```

### **2. Social Media Loading Function**

**JavaScript for social media embeds:**
```javascript
function loadSocialEmbed(platform, postId) {
    // Check consent
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted'
        });
    }
    
    var placeholder = document.getElementById('social-placeholder-' + platform + '-' + postId);
    var content = document.getElementById('social-content-' + platform + '-' + postId);
    
    if (placeholder && content) {
        // Platform-specific loading
        switch(platform.toLowerCase()) {
            case 'twitter':
                loadTwitterEmbed(postId, content);
                break;
            case 'facebook':
                loadFacebookEmbed(postId, content);
                break;
            case 'instagram':
                loadInstagramEmbed(postId, content);
                break;
            default:
                console.log('Unsupported platform:', platform);
        }
        
        // Hide placeholder
        placeholder.style.display = 'none';
        
        // Track social embed load
        if (window.VRUUX_GTM) {
            window.VRUUX_GTM.trackEvent('social_embed_load', {
                'platform': platform,
                'post_id': postId
            });
        }
    }
}

function loadTwitterEmbed(postId, container) {
    // Twitter embed loading
    var script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charset = 'utf-8';
    document.head.appendChild(script);
    
    container.innerHTML = '<blockquote class="twitter-tweet" data-theme="light"><a href="https://twitter.com/x/status/' + postId + '"></a></blockquote>';
}

function loadFacebookEmbed(postId, container) {
    // Facebook embed loading
    container.innerHTML = '<div class="fb-post" data-href="https://www.facebook.com/' + postId + '"></div>';
    
    // Load Facebook SDK
    if (!document.getElementById('facebook-jssdk')) {
        var script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
        document.head.appendChild(script);
    }
}
```

---

## 📊 **GTM Configuration**

### **1. Create Third-Party Content Variables**

**In GTM, create these variables:**
- **Variable Name**: `Consent - Analytics`
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `consent.analytics_storage`

- **Variable Name**: `Consent - Marketing`
- **Variable Type**: Data Layer Variable
- **Data Layer Variable Name**: `consent.ad_storage`

### **2. Create Third-Party Content Triggers**

**Consent-based triggers:**
- **Trigger Name**: Consent - Analytics Granted
- **Trigger Type**: Custom Event
- **Event Name**: consent_update
- **Condition**: `{{Consent - Analytics}}` equals `granted`

### **3. Create Third-Party Content Tags**

**YouTube Video Tag:**
- **Tag Type**: Custom HTML
- **HTML**: YouTube loading script
- **Trigger**: Consent - Analytics Granted

**External Blog Tag:**
- **Tag Type**: Custom HTML
- **HTML**: Blog loading script
- **Trigger**: Consent - Analytics Granted

**External Image Tag:**
- **Tag Type**: Custom HTML
- **HTML**: Image loading script
- **Trigger**: Consent - Analytics Granted

---

## 🎯 **Tracking Events**

### **1. Video Tracking**
```javascript
// Track video interactions
window.VRUUX_GTM.trackEvent('video_interaction', {
    'video_provider': 'youtube',
    'video_id': 'dQw4w9WgXcQ',
    'interaction_type': 'play|pause|complete'
});
```

### **2. External Content Tracking**
```javascript
// Track external content loads
window.VRUUX_GTM.trackEvent('external_content_load', {
    'content_type': 'blog|image|video',
    'content_source': 'external_domain.com',
    'content_id': 'unique_id'
});
```

### **3. Social Media Tracking**
```javascript
// Track social media interactions
window.VRUUX_GTM.trackEvent('social_interaction', {
    'platform': 'twitter|facebook|instagram',
    'post_id': 'post_identifier',
    'interaction_type': 'view|like|share'
});
```

---

## 🔒 **Privacy & Compliance**

### **1. GDPR Compliance**
- **Consent-based loading** - All third-party content requires consent
- **Privacy-enhanced URLs** - Use YouTube-nocookie, etc.
- **Data minimization** - Only load what's necessary
- **User control** - Easy consent withdrawal

### **2. Privacy Settings**
```javascript
// Privacy-focused settings for third-party content
const privacySettings = {
    youtube: {
        usePrivacyEnhanced: true,
        disableRelatedVideos: true,
        hideVideoInfo: false
    },
    images: {
        lazyLoad: true,
        blurHash: true,
        progressiveLoad: true
    },
    social: {
        disableTracking: true,
        privacyMode: true
    }
};
```

### **3. Data Protection**
- **Local storage** - Store consent preferences locally
- **No cross-site tracking** - Respect user privacy
- **Transparent disclosure** - Clear privacy notices
- **User rights** - Easy data access and deletion

---

## 📋 **Implementation Checklist**

- [ ] Replace standard YouTube embeds with privacy-enhanced URLs
- [ ] Implement consent-based loading for all third-party content
- [ ] Create GTM tags for YouTube, external blogs, and images
- [ ] Set up tracking events for third-party content interactions
- [ ] Test consent-based loading functionality
- [ ] Verify GDPR compliance
- [ ] Update privacy policy to mention third-party content handling
- [ ] Test tracking in GTM preview mode

---

## 🚀 **Benefits**

1. **GDPR Compliant** - Respects user consent for all third-party content
2. **Better Performance** - Lazy loading and conditional loading
3. **Enhanced Privacy** - Privacy-focused settings and data protection
4. **Professional Tracking** - Comprehensive analytics for third-party content
5. **User Control** - Easy consent management and content control
6. **Future-Proof** - Scalable solution for new third-party platforms

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Status:** Ready for Implementation 