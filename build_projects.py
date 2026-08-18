import re

def build_projects():
    # 1. Read index.html to extract the perfected shell (with correct cursor ID, light mode removed, etc)
    with open('index.html', 'r', encoding='utf-8') as f:
        base_html = f.read()

    # Extract Head
    head_match = re.search(r'<head>(.*?)</head>', base_html, re.DOTALL)
    head_content = head_match.group(1) if head_match else ''

    # Extract Header
    header_match = re.search(r'(<header class="fixed top-0.*?</header>)', base_html, re.DOTALL)
    header_content = header_match.group(1) if header_match else ''
    
    # In Header, change active class from Home (no tab) to Projects
    header_content = header_content.replace('aria-current="page" class="nav-link-underline font-nav-link transition-colors uppercase tracking-widest text-primary" data-path="process"', 'class="nav-link-underline font-nav-link text-nav-link text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest" data-path="process"')
    header_content = header_content.replace('class="nav-link-underline font-nav-link text-nav-link text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest" data-path="projects"', 'aria-current="page" class="nav-link-underline font-nav-link transition-colors uppercase tracking-widest text-primary" data-path="projects"')

    # Extract Footer & JS
    footer_match = re.search(r'(<footer class="w-full pt-section-gap.*</html>)', base_html, re.DOTALL)
    footer_content = footer_match.group(1) if footer_match else ''

    # 2. Read the new Stitch projects page
    with open('stitch_projects.html', 'r', encoding='utf-8') as f:
        stitch_html = f.read()

    # Extract the <main> block from Stitch HTML
    main_match = re.search(r'(<main.*?</main>)', stitch_html, re.DOTALL)
    if not main_match:
        print("Could not find main tag in stitch_projects.html")
        return
    
    main_content = main_match.group(1)
    
    # 3. Assemble the final HTML
    final_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
{head_content}
</head>
<body class="bg-background font-body-md text-on-background selection:bg-primary/30" id="mainBody">
{header_content}
{main_content}
{footer_content}
"""

    with open('projects.html', 'w', encoding='utf-8') as f:
        f.write(final_html)
    
    print("projects.html successfully built!")

if __name__ == "__main__":
    build_projects()
