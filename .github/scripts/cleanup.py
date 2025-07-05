import os
import re

def clean_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove Mobirise branding in footer and comments
    content = re.sub(r'<!--.*?Mobirise.*?-->', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<section[^>]*id="top-1"[^>]*>.*?</section>', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'>Mobirise v[\d\.]+<', '><', content)

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