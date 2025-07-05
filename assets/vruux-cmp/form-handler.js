/**
 * VRUUX CMP Form Handler
 * Manages custom HTML forms and ensures GDPR compliance
 * Handles form data collection, consent tracking, and database storage
 */

(function() {
    'use strict';

    // Form configuration
    const formConfig = {
        // Consent tracking for form submissions
        trackConsent: true,
        
        // Required consent categories for form submission
        requiredConsent: ['necessary'], // Always required
        
        // Optional consent categories
        optionalConsent: ['analytics', 'marketing'],
        
        // Form data retention settings
        dataRetention: {
            days: 365, // How long to keep form data
            anonymize: true, // Anonymize data after retention period
            exportable: true // Allow users to export their data
        },
        
        // Custom form selectors
        formSelectors: [
            'form[data-gdpr-form]',
            '.contact-form',
            '.enquiry-form',
            '.feedback-form',
            '#contactForm',
            '#enquiryForm'
        ]
    };

    // Check if user has given required consent
    function hasRequiredConsent() {
        const preferences = window.YakDooCookieConsent?.getPreferences();
        if (!preferences) return false;
        
        return formConfig.requiredConsent.every(category => preferences[category]);
    }

    // Add consent checkbox to forms
    function addConsentCheckboxes() {
        const forms = document.querySelectorAll(formConfig.formSelectors.join(','));
        
        forms.forEach(form => {
            // Check if consent checkbox already exists
            if (form.querySelector('[name="gdpr_consent"]')) return;
            
            // Create consent section
            const consentSection = document.createElement('div');
            consentSection.className = 'gdpr-consent-section';
            consentSection.style.cssText = `
                margin: 20px 0;
                padding: 15px;
                background: #f9f9f9;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
            `;
            
            consentSection.innerHTML = `
                <h4 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">
                    Data Protection & Privacy
                </h4>
                <p style="margin: 0 0 15px 0; color: #666; font-size: 14px; line-height: 1.5;">
                    By submitting this form, you agree to our data processing practices as described in our 
                    <a href="privacypolicy.html" target="_blank" style="color: #ff6600;">Privacy Policy</a>.
                </p>
                
                <div style="margin-bottom: 10px;">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" name="gdpr_consent" required style="margin-right: 8px;">
                        <span style="font-size: 14px; color: #333;">
                            I consent to the processing of my personal data for the purpose of responding to my enquiry
                        </span>
                    </label>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" name="gdpr_marketing" style="margin-right: 8px;">
                        <span style="font-size: 14px; color: #333;">
                            I agree to receive marketing communications (optional)
                        </span>
                    </label>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" name="gdpr_analytics" style="margin-right: 8px;">
                        <span style="font-size: 14px; color: #333;">
                            I consent to analytics tracking to improve our services (optional)
                        </span>
                    </label>
                </div>
                
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #888;">
                    You can withdraw your consent at any time by contacting us or updating your 
                    <a href="#" onclick="window.YakDooCookieConsent.showModal(); return false;" style="color: #ff6600;">cookie preferences</a>.
                </p>
            `;
            
            // Insert before submit button
            const submitButton = form.querySelector('input[type="submit"], button[type="submit"], .submit-btn');
            if (submitButton) {
                submitButton.parentNode.insertBefore(consentSection, submitButton);
            } else {
                form.appendChild(consentSection);
            }
        });
    }

    // Validate form consent
    function validateFormConsent(form) {
        const requiredConsent = form.querySelector('[name="gdpr_consent"]');
        if (!requiredConsent || !requiredConsent.checked) {
            alert('Please consent to data processing to submit this form.');
            return false;
        }
        return true;
    }

    // Track form submission with consent data
    function trackFormSubmission(form, formData) {
        if (!formConfig.trackConsent) return;
        
        const consentData = {
            timestamp: new Date().toISOString(),
            formId: form.id || form.className || 'unknown',
            requiredConsent: form.querySelector('[name="gdpr_consent"]')?.checked || false,
            marketingConsent: form.querySelector('[name="gdpr_marketing"]')?.checked || false,
            analyticsConsent: form.querySelector('[name="gdpr_analytics"]')?.checked || false,
            userAgent: navigator.userAgent,
            ipAddress: 'anonymized' // You'll need to get this from your server
        };
        
        // Store consent data (you can modify this to send to your server)
        const consentKey = `form_consent_${Date.now()}`;
        localStorage.setItem(consentKey, JSON.stringify(consentData));
        
        // Send to analytics if consent given
        if (consentData.analyticsConsent && window.gtag) {
            gtag('event', 'form_submit', {
                'form_id': consentData.formId,
                'consent_given': true
            });
        }
        
        console.log('Form consent tracked:', consentData);
    }

    // Handle form submission
    function handleFormSubmission(event) {
        const form = event.target;
        
        // Validate consent
        if (!validateFormConsent(form)) {
            event.preventDefault();
            return false;
        }
        
        // Track submission
        const formData = new FormData(form);
        trackFormSubmission(form, formData);
        
        // Allow form to submit normally
        return true;
    }

    // Add form event listeners
    function addFormEventListeners() {
        const forms = document.querySelectorAll(formConfig.formSelectors.join(','));
        
        forms.forEach(form => {
            // Remove existing listeners to prevent duplicates
            form.removeEventListener('submit', handleFormSubmission);
            
            // Add new listener
            form.addEventListener('submit', handleFormSubmission);
        });
    }

    // Create data export functionality
    function createDataExport() {
        const exportButton = document.createElement('button');
        exportButton.textContent = 'Export My Data';
        exportButton.style.cssText = `
            background: #ff6600;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            margin: 10px 0;
        `;
        
        exportButton.onclick = function() {
            exportUserData();
        };
        
        return exportButton;
    }

    // Export user data
    function exportUserData() {
        if (!formConfig.dataRetention.exportable) {
            alert('Data export is not available.');
            return;
        }
        
        // Collect all user data from localStorage
        const userData = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('form_consent_') || key.startsWith('yakdoo_cookie_consent')) {
                try {
                    userData[key] = JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    userData[key] = localStorage.getItem(key);
                }
            }
        }
        
        // Create download
        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `user_data_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    // Initialize form handling
    function initFormHandler() {
        // Add consent checkboxes to forms
        addConsentCheckboxes();
        
        // Add event listeners
        addFormEventListeners();
        
        // Watch for dynamically added forms
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    addConsentCheckboxes();
                    addFormEventListeners();
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Public API
    window.VRUUX_FormHandler = {
        config: formConfig,
        init: initFormHandler,
        validateConsent: validateFormConsent,
        trackSubmission: trackFormSubmission,
        exportData: exportUserData,
        createExportButton: createDataExport
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFormHandler);
    } else {
        initFormHandler();
    }

})(); 