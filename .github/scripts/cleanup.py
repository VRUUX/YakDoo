import os
import re

def clean_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove Mobirise branding in footer and comments
    content = re.sub(r'<!--.*?Mobirise.*?-->', '', content, flags=re.DOTALL | re.IGNORECASE)
    
    # Remove the specific Mobirise branding section - more targeted pattern
    # Only target sections that contain Mobirise links, not all display-7 sections
    mobirise_section_pattern = r'<section class="display-7"[^>]*>.*?<a[^>]*href="https://mobirise\.com[^"]*"[^>]*>.*?</a>.*?</section>'
    content = re.sub(mobirise_section_pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
    
    # Also remove any remaining Mobirise branding sections with different patterns
    additional_patterns = [
        r'<section[^>]*class="display-7"[^>]*>.*?<a[^>]*href="https://mobirise\.com[^"]*"[^>]*>.*?</a>.*?</section>',
        r'<section[^>]*>.*?<a[^>]*href="https://mobirise\.com[^"]*"[^>]*>.*?</a>.*?</section>'
    ]
    
    for pattern in additional_patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
    
    # Remove Mobirise version from meta generator
    content = re.sub(r'<meta name="generator" content="Mobirise v[\d\.]+, mobirise\.com">', '', content)
    
    # Remove Mobirise alt text from images
    content = re.sub(r'alt="Mobirise Website Builder"', 'alt=""', content)

    # Fix script tags
    content = re.sub(
        r'<script\s+type="text/plain"\s+data-src="([^"]+)"></script>',
        r'<script src="\1"></script>',
        content
    )

    # Remove .html from internal links (href="about.html" -> href="about")
    content = re.sub(
        r'href="([^"]+)\.html"',
        lambda m: f'href="{m.group(1)}"' if not m.group(1).startswith(('http', 'mailto:', 'tel:')) else m.group(0),
        content
    )

    # Add consent banner CSS and scripts if they're missing
    consent_css = '  <link rel="stylesheet" href="assets/web/assets/gdpr-plugin/gdpr-styles.css">\n'
    consent_scripts = '  <script src="assets/web/assets/cookies-alert-plugin/cookies-alert-core.js"></script>\n  <script src="assets/web/assets/cookies-alert-plugin/cookies-alert-script.js"></script>\n'
    
    # Add consent CSS if not present
    if 'gdpr-styles.css' not in content:
        content = re.sub(
            r'(<link rel="stylesheet" href="assets/theme/css/style.css">)',
            r'\1\n' + consent_css,
            content
        )
    
    # Add consent scripts if not present (before closing body tag)
    if 'cookies-alert-core.js' not in content:
        content = re.sub(
            r'(<script src="assets/theme/js/script.js"></script>)',
            r'\1\n' + consent_scripts,
            content
        )
    
    # Add consent banner HTML if not present
    if 'cookieData' not in content:
        consent_html = '''  <input name="cookieData" type="hidden" data-cookie-cookiesAlertType='2' data-cookie-customDialogSelector='null' data-cookie-colorText='#000000' data-cookie-colorBg='rgb(255, 153, 0)' data-cookie-opacityOverlay='0' data-cookie-bgOpacity='100' data-cookie-textButton='ACCEPT' data-cookie-rejectText='REJECT' data-cookie-colorButton='#ffffff' data-cookie-rejectColor='#ff4552' data-cookie-colorLink='#424a4d' data-cookie-underlineLink='true' data-cookie-text="We use cookies to give you the best experience as specified in the <a href='privacypolicy'>Privacy Policy</a>. Rejecting cookies may make some features unavailable.">'''
        content = re.sub(
            r'(<div id="scrollToTop" class="scrollToTop mbr-arrow-up">.*?</div>)',
            r'\1\n' + consent_html,
            content,
            flags=re.DOTALL
        )

    # Add CSS fix for footer z-index issue (more targeted)
    if '<style>' not in content:
        # Add style tag in head if it doesn't exist
        content = re.sub(
            r'</head>',
            r'  <style>\n    /* Fix footer visibility */\n    .footer2 { z-index: 10 !important; position: relative !important; }\n    section[class*="display-7"] a[href*="mobirise.com"] { display: none !important; }\n  </style>\n</head>',
            content
        )
    else:
        # Add CSS to existing style tag
        content = re.sub(
            r'<style>',
            r'<style>\n    /* Fix footer visibility */\n    .footer2 { z-index: 10 !important; position: relative !important; }\n    section[class*="display-7"] a[href*="mobirise.com"] { display: none !important; }',
            content
        )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def clean_js_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove Mobirise branding injection code
    content = re.sub(
        r'!function\(\)\{try\{.*?Mobirise\.com.*?document\.body\.childNodes\[0\]\)\}\}\(\);',
        '// Mobirise branding injection removed',
        content,
        flags=re.DOTALL
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.html'):
                clean_html_file(os.path.join(root, file))
            elif file.endswith('.js') and 'theme' in root:
                clean_js_file(os.path.join(root, file))

if __name__ == '__main__':
    main() 