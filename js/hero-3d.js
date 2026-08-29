/* ============================================================
   AETHERFOLIO HERO 3D ENGINE
   High-Performance Interactive 3D Crystal & Orbital Particle Core
   Zero-Jank WebGL | Viewport Intersection Observer Lifecycle
   ============================================================ */

(function () {
    'use strict';

    function initHero3D() {
        const canvas = document.getElementById('hero-3d-canvas');
        if (!canvas) return;

        if (typeof THREE === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.async = true;
            script.onload = () => setupScene(canvas);
            document.head.appendChild(script);
        } else {
            setupScene(canvas);
        }
    }

    function setupScene(canvas) {
        const container = canvas.parentElement;
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 18;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });

        const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        renderer.setPixelRatio(dpr);
        renderer.setSize(container.clientWidth, container.clientHeight);

        // --- 1. Inner Crystalline Icosahedron ---
        const icoGeom = new THREE.IcosahedronGeometry(4.4, 0);
        const icoMat = new THREE.MeshBasicMaterial({
            color: 0x011326,
            wireframe: false,
            transparent: true,
            opacity: 0.88
        });
        const icoMesh = new THREE.Mesh(icoGeom, icoMat);
        scene.add(icoMesh);

        // --- 2. Glowing Electric Wireframe Edges ---
        const wireGeom = new THREE.WireframeGeometry(icoGeom);
        const wireMat = new THREE.LineBasicMaterial({
            color: 0xffb4a5,
            transparent: true,
            opacity: 0.65
        });
        const wireLines = new THREE.LineSegments(wireGeom, wireMat);
        icoMesh.add(wireLines);

        // --- 3. Outer Concentric Holographic Cage ---
        const cageGeom = new THREE.IcosahedronGeometry(6.4, 1);
        const cageWire = new THREE.WireframeGeometry(cageGeom);
        const cageMat = new THREE.LineBasicMaterial({
            color: 0x5dd9cf,
            transparent: true,
            opacity: 0.28
        });
        const cageLines = new THREE.LineSegments(cageWire, cageMat);
        scene.add(cageLines);

        // --- 4. Floating Orbital Star Dust Particles ---
        const particleCount = 120;
        const particleGeom = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const radius = 7.5 + Math.random() * 5.0;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }

        particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMat = new THREE.PointsMaterial({
            color: 0x89ceff,
            size: 0.2,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeom, particleMat);
        scene.add(particles);

        // --- 5. Mouse Parallax & Inertia ---
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let isVisible = true;
        let rafId = null;

        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            mouseX = (e.clientX - cx) / (rect.width / 2);
            mouseY = (e.clientY - cy) / (rect.height / 2);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // --- 6. Resize Handler ---
        const onResize = () => {
            if (!container || !canvas) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            if (w > 0 && h > 0) {
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            }
        };

        window.addEventListener('resize', onResize, { passive: true });

        // --- 7. Viewport Observer (Zero GPU waste when scrolled past hero) ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible && !rafId) {
                    rafId = requestAnimationFrame(animate);
                } else if (!isVisible && rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
            });
        }, { threshold: 0.05 });

        observer.observe(container);

        // --- 8. Render Loop ---
        let clock = 0;
        function animate() {
            if (!isVisible) {
                rafId = null;
                return;
            }

            clock += 0.01;

            // Smooth damping
            targetX += (mouseX * 0.8 - targetX) * 0.04;
            targetY += (mouseY * 0.8 - targetY) * 0.04;

            // Continuous rotation + mouse tilt
            icoMesh.rotation.y = clock * 0.35 + targetX;
            icoMesh.rotation.x = clock * 0.2 + targetY;
            icoMesh.position.y = Math.sin(clock * 1.2) * 0.35;

            cageLines.rotation.y = -clock * 0.2 - targetX * 0.5;
            cageLines.rotation.z = clock * 0.15;
            cageLines.position.y = Math.cos(clock * 1.0) * 0.25;

            particles.rotation.y = clock * 0.08;
            particles.rotation.x = -clock * 0.05;

            renderer.render(scene, camera);
            rafId = requestAnimationFrame(animate);
        }

        rafId = requestAnimationFrame(animate);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHero3D);
    } else {
        initHero3D();
    }
})();
