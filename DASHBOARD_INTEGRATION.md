# Dashboard Integration Guide

## Overview

The VRUUX CMP Dashboard Handler automatically manages dashboard embeds with flexible consent requirements based on their purpose and importance. This system ensures GDPR compliance while maintaining website functionality.

## Dashboard Categories

### 1. Necessary Dashboards (Always Allowed)
These dashboards are essential for website functionality and are always displayed without requiring consent:

- **Zoho Analytics** - Business intelligence and analytics platform
- **Grafana** - Monitoring and observability platform  
- **Metabase** - Business intelligence and analytics
- **Kibana** - Data visualization and search platform

**Use Case**: Core business dashboards that users need to see to understand your services or data insights.

### 2. Analytics Dashboards (Consent Required)
These dashboards provide enhanced analytics and require user consent:

- **Google Looker Studio** - Data visualization and reporting
- **Power BI** - Microsoft business analytics platform
- **Tableau** - Data visualization and business intelligence
- **Amazon QuickSight** - Cloud-based business intelligence

**Use Case**: Advanced analytics dashboards that enhance user experience but aren't essential for basic functionality.

### 3. Optional Dashboards (Consent Required)
Custom dashboards that provide enhanced features:

- **Custom Dashboards** - Any other dashboard platform
- **Third-party Analytics** - Specialized analytics tools

**Use Case**: Premium features or specialized dashboards that provide additional value.

## Implementation

### Automatic Detection

The system automatically detects dashboard embeds using:

1. **URL Patterns**:
   ```html
   <!-- Zoho Analytics -->
   <iframe src="https://analytics.zoho.com/..."></iframe>
   
   <!-- Google Looker Studio -->
   <iframe src="https://lookerstudio.google.com/..."></iframe>
   
   <!-- Power BI -->
   <iframe src="https://app.powerbi.com/..."></iframe>
   ```

2. **CSS Classes**:
   ```html
   <div class="zoho-analytics">
       <iframe src="..."></iframe>
   </div>
   
   <div class="google-looker">
       <iframe src="..."></iframe>
   </div>
   ```

3. **Data Attributes**:
   ```html
   <iframe src="..." data-dashboard-type="zohoAnalytics"></iframe>
   <iframe src="..." data-dashboard-type="googleLookerStudio"></iframe>
   ```

### Manual Configuration

For custom dashboards or specific requirements:

```html
<!-- Force necessary category -->
<iframe src="..." data-dashboard-type="zohoAnalytics" data-consent-category="necessary"></iframe>

<!-- Force analytics category -->
<iframe src="..." data-dashboard-type="customDashboard" data-consent-category="analytics"></iframe>

<!-- Custom fallback message -->
<iframe src="..." data-dashboard-type="powerbi" data-fallback-message="This dashboard shows our business performance metrics."></iframe>
```

## User Experience

### For Necessary Dashboards
- Always displayed immediately
- No consent banner or placeholder
- Users can interact immediately

### For Analytics/Optional Dashboards
- Initially hidden with a placeholder
- Placeholder shows dashboard information and consent request
- Users can:
  - Click "Manage Cookie Preferences" to update consent
  - Click "Learn More" for detailed information
  - See why consent is needed

### Placeholder Design
The placeholder includes:
- Dashboard platform icon and name
- Description of what the dashboard shows
- Clear call-to-action buttons
- Information about consent requirements

## Configuration

### Basic Configuration
```javascript
// In assets/vruux-cmp/config.js
window.VRUUX_CMP_CONFIG = {
    dashboards: {
        enabled: true,
        platforms: {
            zohoAnalytics: {
                enabled: true,
                category: 'necessary',
                consentRequired: false
            },
            googleLookerStudio: {
                enabled: true,
                category: 'analytics',
                consentRequired: true
            }
        }
    }
};
```

### Advanced Configuration
```javascript
window.VRUUX_CMP_CONFIG = {
    dashboards: {
        enabled: true,
        
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
        },
        
        // Data retention
        dataRetention: {
            dashboardLoads: 90,
            userPreferences: 365,
            analytics: 90
        }
    }
};
```

## Best Practices

### 1. Categorize Dashboards Appropriately
- **Necessary**: Only for dashboards essential to website functionality
- **Analytics**: For dashboards that enhance experience but aren't critical
- **Optional**: For premium or specialized features

### 2. Use Descriptive Fallback Messages
```html
<iframe src="..." data-fallback-message="This dashboard shows real-time sales performance and customer insights."></iframe>
```

### 3. Consider Performance
- Use `loading="lazy"` for non-critical dashboards
- Implement proper error handling
- Cache dashboard configurations

### 4. Monitor Usage
The system automatically tracks:
- Dashboard load events
- Consent decisions
- User interactions
- Performance metrics

## Analytics Integration

### Google Analytics Events
```javascript
// Dashboard load event
gtag('event', 'dashboard_load', {
    'dashboard_platform': 'Zoho Analytics',
    'dashboard_category': 'necessary',
    'consent_given': true
});
```

### Data Export
```javascript
// Export dashboard usage data
window.VRUUX_DashboardHandler.exportData();
```

## Troubleshooting

### Dashboard Not Loading
1. Check if the platform is enabled in configuration
2. Verify the iframe URL matches detection patterns
3. Ensure proper consent is given for analytics dashboards

### Consent Issues
1. Check browser console for errors
2. Verify cookie consent preferences
3. Test with different consent states

### Performance Issues
1. Enable lazy loading for non-critical dashboards
2. Use proper iframe sizing
3. Implement loading states

## Examples

### Zoho Analytics Dashboard (Necessary)
```html
<div class="dashboard-container">
    <h2>Business Performance Dashboard</h2>
    <iframe 
        src="https://analytics.zoho.com/embed/..."
        width="100%" 
        height="600"
        frameborder="0">
    </iframe>
</div>
```

### Google Looker Studio Dashboard (Analytics)
```html
<div class="dashboard-container">
    <h2>Advanced Analytics Dashboard</h2>
    <iframe 
        src="https://lookerstudio.google.com/embed/..."
        width="100%" 
        height="600"
        frameborder="0"
        data-dashboard-type="googleLookerStudio">
    </iframe>
</div>
```

### Custom Dashboard with Configuration
```html
<div class="dashboard-container">
    <h2>Custom Performance Metrics</h2>
    <iframe 
        src="https://your-custom-dashboard.com/..."
        width="100%" 
        height="600"
        frameborder="0"
        data-dashboard-type="customDashboard"
        data-consent-category="analytics"
        data-fallback-message="This dashboard provides detailed performance metrics and insights.">
    </iframe>
</div>
```

## Migration from Other Systems

### From Manual Consent Management
1. Remove manual consent checks
2. Add appropriate data attributes
3. Update configuration
4. Test with different consent states

### From Other CMP Systems
1. Export existing consent data
2. Map dashboard categories
3. Update iframe attributes
4. Test functionality

## Support

For issues or questions:
1. Check browser console for errors
2. Review configuration settings
3. Test with different dashboard types
4. Verify consent preferences

The dashboard handler is designed to be fully automatic and GDPR-compliant while providing flexibility for different dashboard types and user preferences. 