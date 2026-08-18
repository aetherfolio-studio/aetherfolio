import re

def build_index():
    # 1. Read process.html to extract the perfected shell
    with open('process.html', 'r', encoding='utf-8') as f:
        process_html = f.read()

    # Extract Head
    head_match = re.search(r'<head>(.*?)</head>', process_html, re.DOTALL)
    head_content = head_match.group(1) if head_match else ''

    # We need to change the active tab in the navbar.
    # In process.html, "Process" is active, we need to make "Home" active (if it exists) or just remove active from Process.
    # Wait, process.html has: <a aria-current="page" class="nav-link-underline font-nav-link transition-colors uppercase tracking-widest text-primary" data-path="process" href="process.html">Process</a>
    
    # Actually, the user's new Stitch HTML doesn't have a "Home" tab in the desktop navbar anyway, it just highlights "Projects" or nothing.
    # I'll just use process_html's header and swap the active state to index.
    
    # Extract Header
    header_match = re.search(r'(<header class="fixed top-0.*?</header>)', process_html, re.DOTALL)
    header_content = header_match.group(1) if header_match else ''
    
    # Remove active state from Process
    header_content = header_content.replace(
        '<a aria-current="page" class="nav-link-underline font-nav-link transition-colors uppercase tracking-widest text-primary" data-path="process" href="process.html">Process</a>',
        '<a class="nav-link-underline font-nav-link text-nav-link text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest" data-path="process" href="process.html">Process</a>'
    )
    # The desktop navbar doesn't have a Home link, the Logo is the Home link. So no other link needs "text-primary".

    # Extract Mobile Sidebar
    sidebar_match = re.search(r'(<!-- ======== MOBILE SIDEBAR ======== -->.*?<div class="sidebar-overlay"></div>)', process_html, re.DOTALL)
    sidebar_content = sidebar_match.group(1) if sidebar_match else ''
    
    # Swap active state in mobile sidebar
    sidebar_content = sidebar_content.replace('href="process.html" class="active"', 'href="process.html"')
    sidebar_content = sidebar_content.replace('href="index.html"', 'href="index.html" class="active"')

    # Extract Footer
    footer_match = re.search(r'(<footer class="w-full pt-section-gap pb-12 px-margin-edge bg-background">.*?</footer>)', process_html, re.DOTALL)
    footer_content = footer_match.group(1) if footer_match else ''

    # 2. Read the user's raw stitch HTML from a file (we will create it next)
    with open('stitch_raw.html', 'r', encoding='utf-8') as f:
        stitch_html = f.read()

    # The user's body content starts inside <main class="w-full pt-20"> and ends before </main>
    body_match = re.search(r'<main class="w-full pt-20">(.*?)</main>', stitch_html, re.DOTALL)
    body_content = body_match.group(1) if body_match else ''
    
    # Replace the low-res vanguard image with the high-res one
    body_content = body_content.replace(
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtEpj2k7-W20dmCp7ihC8nrL-utyWbgaab8C9Rwpv8heih6Fl_rxsmZFBNQAc513E9LQxcxaCDkdCKrF3RUIKmT9u5mithQvYlG4cZugtOs1gyjAsQ0ge75uxpzAyp3d1uZBtXoIUf7hRPQcjM7BclbGo47KbzjiZnAURPpOC57zWX1eED_96HVASdjYYcS8CCZxA1_Qear28v3XSk9nYZhbJsBIf1qSkE1AttCpj3X8xbJk34eHZa",
        "assets/vanguard.jpg"
    )
    
    # Ensure all href="#" are correctly linked (like the "Start a Project" button, "View Portfolio", "All Projects")
    # Actually "View Portfolio" can link to projects.html. "All Projects" to projects.html.
    body_content = body_content.replace('"#" class="group relative px-8 py-4', '"contact.html" class="group relative px-8 py-4')
    body_content = body_content.replace('"#" class="nav-link-underline font-label-caps', '"projects.html" class="nav-link-underline font-label-caps')

    # Construct the final HTML
    final_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
{head_content}
</head>
<body class="bg-background font-body-md text-on-background selection:bg-primary/30 relative" id="mainBody" style="opacity: 0; transition: opacity 0.4s ease;">
<div class="fixed inset-0 mouse-gradient"></div>

{header_content}

{sidebar_content}

<main class="w-full pt-20">
{body_content}
</main>

{footer_content}

<!-- Aetherfolio App Logic -->
<script src="app.js"></script>
</body>
</html>
"""

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(final_html)
    print("Successfully built index.html")

build_index()
