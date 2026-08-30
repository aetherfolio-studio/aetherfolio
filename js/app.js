/* ============================================================
   AETHER v3.0 Main Application Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initMobileSidebar();
    initScrollReveal();
    initActiveTab();
    initProjectModal();
    initProjectFilter();
    initAboutTilt();
    initFAQ();
    initContactForm();
    initCardTilt();
    fillContactConfig();
    initInstantNav();
});

/* ============================================================
   INSTANT HOVER PRELOADER (Sub-50ms Instant Page Switches)
   ============================================================ */
function initInstantNav() {
    const prefetched = new Set();
    const preload = (href) => {
        if (!href) return;
        const cleanHref = href.split('#')[0].split('?')[0];
        if (!cleanHref || prefetched.has(cleanHref) || cleanHref.startsWith('http') || cleanHref.startsWith('mailto:') || cleanHref.startsWith('tel:')) return;
        prefetched.add(cleanHref);
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = cleanHref;
        document.head.appendChild(link);
    };

    // Preload navigation links immediately
    document.querySelectorAll('.nav-link-underline, .nav-tab, .mobile-sidebar a, header a').forEach(a => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('http')) {
            preload(href);
        }
    });

    // Hover-based dynamic preloading for all other content links
    document.addEventListener('mouseover', (e) => {
        const a = e.target.closest('a');
        if (a && a.getAttribute('href')) {
            preload(a.getAttribute('href'));
        }
    }, { passive: true });

    document.addEventListener('touchstart', (e) => {
        const a = e.target.closest('a');
        if (a && a.getAttribute('href')) {
            preload(a.getAttribute('href'));
        }
    }, { passive: true });
}

/* ============================================================
   THEME LOGIC (Light/Dark)
   ============================================================ */
function initTheme() {
    const savedTheme = localStorage.getItem('aether-theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    const toggleBtns = document.querySelectorAll('.theme-toggle');
    const inPageBtn = document.getElementById('inPageThemeToggle');

    const switchTheme = () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        
        if (next === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('aether-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('aether-theme', 'dark');
        }
        
        updateIcons(next);
    };

    const updateIcons = (theme) => {
        toggleBtns.forEach(btn => {
            btn.innerHTML = theme === 'light' ? '<i class="ph-bold ph-sun"></i>' : '<i class="ph-bold ph-moon"></i>';
        });
    };

    updateIcons(savedTheme);

    toggleBtns.forEach(btn => btn.addEventListener('click', switchTheme));
    if (inPageBtn) inPageBtn.addEventListener('click', switchTheme);
}

/* ============================================================
   CANVAS PARTICLE BACKGROUND
   Animated starfield + flowing connection lines
   ============================================================ */
function initCanvas() {
    const canvas = document.getElementById('aether-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 200;

    const particles = new THREE.BufferGeometry();
    const particleCount = 800;
    
    const positions = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 800;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0x5E6AD2,
        size: 1.5,
        transparent: true,
        opacity: 0.5
    });
    
    const particleSystem = new THREE.Points(particles, material);
    scene.add(particleSystem);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    function animate() {
        requestAnimationFrame(animate);
        targetX = mouseX * 0.05;
        targetY = mouseY * 0.05;
        
        particleSystem.rotation.y += 0.0003;
        particleSystem.rotation.x += 0.0001;
        
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
    const nav = document.getElementById('masterHeader') || document.querySelector('.navbar') || document.querySelector('header');
    if (!nav) return;
    const onScroll = () => {
        if (window.scrollY > 30) {
            nav.classList.add('bg-[#001428]/95', 'shadow-lg', 'border-white/[0.08]');
            nav.classList.remove('bg-[#001428]/80', 'border-white/[0.04]');
        } else {
            nav.classList.remove('bg-[#001428]/95', 'shadow-lg', 'border-white/[0.08]');
            nav.classList.add('bg-[#001428]/80', 'border-white/[0.04]');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ============================================================
   ACTIVE TAB & NAVIGATION STATE
   ============================================================ */
function initActiveTab() {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    const cleanPath = path.replace('.html', '');

    const links = document.querySelectorAll('.nav-link-underline, .nav-tab, .mobile-sidebar a');
    links.forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase().replace('.html', '').replace(/\/$/, '') || '/';
        const isMatch = (href === cleanPath) || 
                        (cleanPath === '' && (href === '/' || href === 'index')) ||
                        (cleanPath.startsWith('/work') && href.startsWith('/work')) ||
                        (cleanPath.startsWith('/journal') && href.startsWith('/journal')) ||
                        (cleanPath.startsWith('/services') && href.startsWith('/services'));

        if (isMatch) {
            link.classList.add('text-primary', 'active');
            link.classList.remove('text-on-surface-variant');
            link.setAttribute('aria-current', 'page');
        } else if (link.getAttribute('data-path') !== 'brand') {
            link.removeAttribute('aria-current');
        }
    });
}

/* ============================================================
   MOBILE SIDEBAR
   ============================================================ */
function initMobileSidebar() {
    const btns    = document.querySelectorAll('.menu-btn');
    const sidebar = document.querySelector('.mobile-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (!btns.length || !sidebar) return;

    const openSidebar = () => {
        sidebar.classList.add('open');
        overlay?.classList.add('visible');
        document.body.style.overflow = 'hidden';
        btns.forEach(b => b.classList.add('open'));
    };

    const closeSidebar = () => {
        sidebar.classList.remove('open');
        overlay?.classList.remove('visible');
        document.body.style.overflow = '';
        btns.forEach(b => b.classList.remove('open'));
    };

    btns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
        });
    });
    overlay?.addEventListener('click', closeSidebar);
    sidebar.querySelectorAll('a, button').forEach(el => el.addEventListener('click', closeSidebar));
}

/* ============================================================
   SCROLL REVEAL (Intersection Observer)
   ============================================================ */
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('active');
                e.target.classList.add('visible'); // keep visible just in case
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
}

/* ============================================================
   PROJECT MODAL
   ============================================================ */
const PROJECT_DATA = {
    kairo: {
        tag: 'Healthcare OS / Next.js',
        pill: 'pill-orange',
        title: 'Kairo Hospital OS',
        desc: 'Comprehensive intelligent hospital operating system featuring interactive 3D digital twins, real-time surgical suite orchestration, floor bed matrices, and ambient clinical intelligence.',
        tech: ['Next.js 15', 'React 19', 'TypeScript', 'TailwindCSS v4', 'Canvas 2D'],
        link: 'https://kairo-hospital.vercel.app'
    },
    vanguard: {
        tag: 'WebGL / Architecture',
        pill: 'pill-blue',
        title: 'Vanguard OS',
        desc: 'Ultra-high performance interface architecture with hardware-accelerated GLSL shader pipelines and bespoke reactive UI components.',
        tech: ['WebGL', 'GLSL', 'TypeScript', 'TailwindCSS']
    },
    prism: {
        tag: 'Realtime Graphics',
        pill: 'pill-purple',
        title: 'Prism Studio',
        desc: 'Next-generation real-time 3D refraction and caustics rendering suite engineered with WebGL & GLSL.',
        tech: ['Three.js', 'WebGL', 'GLSL', 'Web Audio']
    },
    neural: {
        tag: 'AI Platform',
        pill: 'pill-emerald',
        title: 'Neural Flow',
        desc: 'Autonomous intelligence workflow orchestrator featuring node-based visual pipelines and instant model inference telemetry.',
        tech: ['React', 'Next.js', 'Python', 'TailwindCSS']
    },
    chronos: {
        tag: 'Systems Architecture',
        pill: 'pill-amber',
        title: 'Chronos Interface',
        desc: 'Ultra-low latency algorithmic telemetry and streaming visualization engine built for mission-critical operations.',
        tech: ['WebSockets', 'Canvas 2D', 'React', 'Node.js']
    }
};

function initProjectModal() {
    const cards   = document.querySelectorAll('[data-project]');
    const modal   = document.querySelector('.modal-overlay');
    const body    = document.querySelector('.modal-body');
    const closeEl = document.querySelector('.modal-close');
    if (!modal || !cards.length) return;

    const openModal = (id) => {
        const d = PROJECT_DATA[id];
        if (!d) return;
        const techHtml = d.tech.map(t => `<span class="tech-chip">${t}</span>`).join('');
        body.innerHTML = `
            <span class="pill ${d.pill}">${d.tag}</span>
            <h2>${d.title}</h2>
            <p class="modal-desc">${d.desc}</p>
            <div class="modal-tech">${techHtml}</div>
            <div class="modal-actions">
                <a href="#" class="btn btn-primary">Launch Demo</a>
            </div>`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    cards.forEach(c => c.addEventListener('click', () => openModal(c.dataset.project)));
    closeEl?.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ============================================================
   PROJECT FILTER
   ============================================================ */
function initProjectFilter() {
    const btns  = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    if (!btns.length || !cards.length) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            cards.forEach(c => {
                const show = f === 'all' || c.dataset.category === f;
                if (show) {
                    c.style.display = '';
                    // Force reflow before restoring opacity so transition fires
                    void c.offsetWidth;
                    c.style.opacity   = '1';
                    c.style.transform = '';
                } else {
                    c.style.opacity   = '0';
                    c.style.transform = 'scale(0.92)';
                    setTimeout(() => { c.style.display = 'none'; }, 360);
                }
            });
        });
    });
}

/* ============================================================
   ABOUT IMAGE
   ============================================================ */
function initAboutTilt() {
    const scene = document.querySelector('.about-img-scene');
    if (!scene) return;
    const wrap = scene.closest('.about-img-wrap') || scene.parentElement;

    wrap.addEventListener('mousemove', e => {
        const rect = scene.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width  / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const maxRot = 8;
        scene.style.transform = `perspective(1200px) rotateY(${dx * maxRot * -1}deg) rotateX(${dy * maxRot * 0.6}deg)`;
    });

    wrap.addEventListener('mouseleave', () => {
        scene.style.transform = 'perspective(1200px) rotateY(-10deg) rotateX(4deg)';
    });
}

/* ============================================================
   PARALLAX FLOATING IMAGES
   ============================================================ */
function initParallaxFloats() {
    const imgs = document.querySelectorAll('.floating-img');
    if (!imgs.length) return;

    // Smooth lerp values per image
    const state = Array.from({ length: imgs.length }, () => ({ x: 0, y: 0, tx: 0, ty: 0 }));
    let rawX = 0, rawY = 0;

    document.addEventListener('mousemove', e => {
        rawX = (e.clientX / window.innerWidth  - 0.5) * 2;
        rawY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    const strengths = [14, -10, 18];
    const strengthsY = [8, -12, 10];

    let animRunning = true;

    const tick = () => {
        if (!animRunning) return;
        imgs.forEach((img, i) => {
            const s = state[i];
            s.tx = rawX * (strengths[i]  || 10);
            s.ty = rawY * (strengthsY[i] || 7);
            // Lerp for smooth following
            s.x += (s.tx - s.x) * 0.06;
            s.y += (s.ty - s.y) * 0.06;
            // The CSS animation handles base 3D transforms; we add a translate on top
            // We override the animation and add our own combined transform
            img.style.animationPlayState = 'paused';
            const baseY = [40, 0, 0][i] || 0;
            const bases = [
                `perspective(1200px) rotateY(18deg) rotateX(-6deg) rotateZ(-2deg)`,
                `perspective(1200px) rotateY(-15deg) rotateX(-8deg) rotateZ(3deg)`,
                `perspective(1200px) rotateY(-20deg) rotateX(10deg) rotateZ(-4deg)`,
            ];
            img.style.transform = `${bases[i]} translate(${s.x}px, ${s.y}px)`;
        });
        requestAnimationFrame(tick);
    };

    tick();
    document.addEventListener('visibilitychange', () => {
        animRunning = !document.hidden;
        if (animRunning) tick();
    });
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-q');
        if (!q) return;
        q.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            // Toggle clicked
            if (!isOpen) item.classList.add('open');
        });
    });
}


/* ============================================================
   CONTACT FORM HANDLER & CLIPBOARD COPY
   ============================================================ */
function initContactForm() {
    const form = document.getElementById('studioContactForm') || document.getElementById('contactForm');
    const copyBtn = document.getElementById('copyEmailBtn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const email = 'aether.getyourownsite@gmail.com';
            try {
                await navigator.clipboard.writeText(email);
                const confirm = document.getElementById('copyConfirm');
                const copyIcon = document.getElementById('copyIcon');
                if (confirm) {
                    confirm.classList.remove('hidden');
                    if (copyIcon) copyIcon.textContent = 'check';
                    setTimeout(() => {
                        confirm.classList.add('hidden');
                        if (copyIcon) copyIcon.textContent = 'content_copy';
                    }, 3000);
                }
            } catch (err) {
                window.location.href = 'mailto:' + email;
            }
        });
    }

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = form.querySelector('#clientName') || form.querySelector('#name');
        const emailInput = form.querySelector('#clientEmail') || form.querySelector('#email');
        const scopeInput = form.querySelector('#projectScope') || form.querySelector('#details') || form.querySelector('#message');
        const projectType = form.querySelector('input[name="projectType"]:checked')?.value || 'Custom Web Application';
        const submitBtn = form.querySelector('#submitBtn') || form.querySelector('button[type="submit"]');
        const banner = document.getElementById('formStatusBanner');
        
        // Reset errors
        form.querySelectorAll('.error-msg').forEach(el => el.classList.add('hidden'));
        if (banner) banner.classList.add('hidden');

        let hasError = false;
        if (!nameInput?.value.trim()) {
            document.getElementById('nameError')?.classList.remove('hidden');
            hasError = true;
        }
        if (!emailInput?.value.trim() || !emailInput.value.includes('@')) {
            document.getElementById('emailError')?.classList.remove('hidden');
            hasError = true;
        }
        if (!scopeInput?.value.trim()) {
            document.getElementById('scopeError')?.classList.remove('hidden');
            hasError = true;
        }

        if (hasError) return;

        const originalHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending Inquiry...</span><span class="material-symbols-outlined text-[16px]">sync</span>`;

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    access_key: '67ea35a4-ffc6-4f76-a69a-a52bfa05ac95',
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    "Project Category": projectType,
                    message: scopeInput.value.trim(),
                    subject: `New Project Inquiry from ${nameInput.value.trim()}`
                })
            });

            const data = await res.json();
            if (data.success) {
                if (banner) {
                    banner.className = 'p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-body-md text-sm';
                    banner.innerHTML = `<strong>Inquiry Received!</strong> Thank you ${nameInput.value.trim()}. I have received your requirements and will personally reply with an architectural review within 24 hours.`;
                    banner.classList.remove('hidden');
                }
                form.reset();
                submitBtn.innerHTML = `<span>Inquiry Sent</span><span class="material-symbols-outlined text-[16px]">check_circle</span>`;
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (err) {
            console.error('Submission error:', err);
            if (banner) {
                banner.className = 'p-6 rounded-2xl bg-primary/10 border border-primary/30 text-primary font-body-md text-sm';
                banner.innerHTML = `<strong>Network Notice:</strong> Unable to dispatch directly. Please send your inquiry directly to <a href="mailto:aether.getyourownsite@gmail.com" class="underline font-semibold">aether.getyourownsite@gmail.com</a>.`;
                banner.classList.remove('hidden');
            }
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;
        }
    });
}

/* ============================================================
   FILL CONTACT PAGE CONFIG VALUES
   ============================================================ */
function fillContactConfig() {
    if (typeof AETHER_CONFIG === 'undefined') return;

    const emailLink  = document.getElementById('contact-email-link');
    const responseEl = document.getElementById('contact-response-time');
    const locationEl = document.getElementById('contact-location');

    if (emailLink && AETHER_CONFIG.your_email) {
        emailLink.textContent = AETHER_CONFIG.your_email;
        emailLink.href        = 'mailto:' + AETHER_CONFIG.your_email;
    }
    if (responseEl && AETHER_CONFIG.response_time) {
        responseEl.textContent = AETHER_CONFIG.response_time;
    }
    if (locationEl && AETHER_CONFIG.location) {
        locationEl.textContent = AETHER_CONFIG.location;
    }
}

/* ============================================================
   SPINNER KEYFRAME (injected once)
   ============================================================ */
(function injectSpinnerStyle() {
    if (document.getElementById('aether-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'aether-keyframes';
    style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
})();

/* ============================================================
   BACKGROUND SCROLL PARALLAX (SHAPES CLOSING IN)
   ============================================================ */
function initScrollParallax() {
    const bgLeft = document.getElementById('parallax-left');
    const bgRight = document.getElementById('parallax-right');
    if (!bgLeft || !bgRight) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Downward parallax
        const translateY = scrolled * 0.4;
        
        // Horizontal closing in (shapes coming together)
        // Adjust the multiplier to control how fast they close in
        const moveX = scrolled * 0.3;

        // bgLeft.style.transform = `translate(${moveX}px, ${translateY}px)`;
        // bgRight.style.transform = `translate(-${moveX}px, ${translateY}px)`;
        
    }, { passive: true });
}


/* ============================================================
   3D CARD TILT ANIMATION
   ============================================================ */
function initCardTilt() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation (max 10 degrees)
            const xRotation = -10 + (20 * y / rect.height);
            const yRotation = 10 - (20 * x / rect.width);
            
            // Apply 3D transform
            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)`;
            setTimeout(() => {
                card.style.transform = '';
            }, 400);
        });
    });
}
