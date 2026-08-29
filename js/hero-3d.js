/* ============================================================
   AETHERFOLIO — BESPOKE 3D ARCHITECTURAL KINETIC SCULPTURE
   Celestial Armillary, Titanium Arches & Frosted Glass Diaphragms
   Engineered for Aetherfolio Hero · 60 FPS Viewport Lifecycle
   ============================================================ */

(function () {
    'use strict';

    function initHeroSculpture() {
        const canvas = document.getElementById('hero-3d-canvas');
        if (!canvas) return;

        if (typeof THREE === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.async = true;
            script.onload = () => setupSculpture(canvas);
            document.head.appendChild(script);
        } else {
            setupSculpture(canvas);
        }
    }

    function setupSculpture(canvas) {
        const container = canvas.parentElement;
        if (!container) return;

        // Scene, Camera & High-Performance WebGL Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(46, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 24);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        renderer.setPixelRatio(dpr);
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;

        // ============================================================
        // LIGHTING: Cinematic, Restrained & Directional
        // ============================================================
        const ambientLight = new THREE.AmbientLight(0x061524, 1.4);
        scene.add(ambientLight);

        // Key Light (Muted Steel / Cool White)
        const keyLight = new THREE.DirectionalLight(0xd0e4ff, 1.6);
        keyLight.position.set(18, 25, 20);
        scene.add(keyLight);

        // Rim Light (Warm Peach Accent Glint)
        const rimLight = new THREE.DirectionalLight(0xffb4a5, 1.1);
        rimLight.position.set(-22, -15, 12);
        scene.add(rimLight);

        // Deep Secondary Fill (Desaturated Teal)
        const tealFill = new THREE.DirectionalLight(0x386b72, 0.8);
        tealFill.position.set(0, -20, -10);
        scene.add(tealFill);

        // ============================================================
        // MATERIALS: Titanium, Muted Steel, Frosted Glass & Peach Nodes
        // ============================================================
        const titaniumMat = new THREE.MeshStandardMaterial({
            color: 0x0f2338,
            metalness: 0.88,
            roughness: 0.32,
            wireframe: false
        });

        const steelWireMat = new THREE.LineBasicMaterial({
            color: 0x3d5a73,
            transparent: true,
            opacity: 0.45,
            linewidth: 1
        });

        const tealWireMat = new THREE.LineBasicMaterial({
            color: 0x4a8b88,
            transparent: true,
            opacity: 0.35,
            linewidth: 1
        });

        const peachNodeMat = new THREE.MeshStandardMaterial({
            color: 0xffb4a5,
            metalness: 0.92,
            roughness: 0.22,
            emissive: 0x3a140e,
            emissiveIntensity: 0.4
        });

        const glassDiscMat = new THREE.MeshStandardMaterial({
            color: 0x0c253d,
            metalness: 0.2,
            roughness: 0.15,
            transparent: true,
            opacity: 0.22,
            side: THREE.DoubleSide
        });

        // Master Sculpture Root Group (Tilted for architectural asymmetry)
        const sculptureRoot = new THREE.Group();
        sculptureRoot.position.set(0, 0.5, 0);
        sculptureRoot.rotation.set(0.18, -0.22, 0.08);
        scene.add(sculptureRoot);

        // ============================================================
        // 1. PRIMARY ARCHITECTURAL CANTILEVER SWEEPS
        // ============================================================
        const archGroup = new THREE.Group();
        sculptureRoot.add(archGroup);

        // Outer Sweeping Elliptical Arch (extends toward viewport edges)
        const outerTorusGeom = new THREE.TorusGeometry(11.2, 0.12, 16, 120, Math.PI * 1.65);
        const outerArch = new THREE.Mesh(outerTorusGeom, titaniumMat);
        outerArch.rotation.set(Math.PI * 0.35, 0.4, 0.2);
        outerArch.scale.set(1.4, 0.95, 1.0);
        archGroup.add(outerArch);

        // Secondary Nested Ribbon Curve (Asymmetrical orbit)
        const innerTorusGeom = new THREE.TorusGeometry(8.4, 0.09, 16, 100, Math.PI * 1.8);
        const innerArch = new THREE.Mesh(innerTorusGeom, titaniumMat);
        innerArch.rotation.set(-Math.PI * 0.28, -0.3, 0.5);
        innerArch.scale.set(1.25, 0.85, 1.1);
        archGroup.add(innerArch);

        // Third Counter-Arch Ribbon
        const thirdTorusGeom = new THREE.TorusGeometry(9.6, 0.08, 16, 100, Math.PI * 1.4);
        const thirdArch = new THREE.Mesh(thirdTorusGeom, titaniumMat);
        thirdArch.rotation.set(0.8, -0.6, -0.4);
        thirdArch.scale.set(1.1, 1.3, 0.9);
        archGroup.add(thirdArch);

        // ============================================================
        // 2. CELESTIAL DATUM TRACKS & PRECISION RINGS
        // ============================================================
        const ringGroup = new THREE.Group();
        sculptureRoot.add(ringGroup);

        function createDatumRing(radius, segments, material, rotX, rotY, rotZ, scaleX = 1, scaleY = 1) {
            const curve = new THREE.EllipseCurve(0, 0, radius, radius * scaleY, 0, 2 * Math.PI, false, 0);
            const points = curve.getPoints(segments);
            const geom = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geom, material);
            line.rotation.set(rotX, rotY, rotZ);
            line.scale.set(scaleX, 1, 1);
            return line;
        }

        const ring1 = createDatumRing(13.5, 140, steelWireMat, 1.1, 0.3, -0.2, 1.3, 0.7);
        const ring2 = createDatumRing(10.5, 120, tealWireMat, -0.8, 0.7, 0.4, 1.1, 0.9);
        const ring3 = createDatumRing(7.2, 90, steelWireMat, 0.4, -0.9, 0.6, 1.2, 0.8);
        ringGroup.add(ring1);
        ringGroup.add(ring2);
        ringGroup.add(ring3);

        // Architectural Radial Spokes / Datum Latitudes
        const spokeGeom = new THREE.BufferGeometry();
        const spokePoints = [];
        const spokeCount = 14;
        for (let i = 0; i < spokeCount; i++) {
            const angle = (i / spokeCount) * Math.PI * 2;
            const r1 = 6.8;
            const r2 = 12.8;
            spokePoints.push(
                new THREE.Vector3(Math.cos(angle) * r1, Math.sin(angle) * r1 * 0.7, (Math.random() - 0.5) * 1.5),
                new THREE.Vector3(Math.cos(angle) * r2, Math.sin(angle) * r2 * 0.7, (Math.random() - 0.5) * 2.5)
            );
        }
        spokeGeom.setFromPoints(spokePoints);
        const spokes = new THREE.LineSegments(spokeGeom, steelWireMat);
        spokes.rotation.set(0.6, 0.3, -0.1);
        ringGroup.add(spokes);

        // ============================================================
        // 3. FLOATING FROSTED GLASS LENS & DIAPHRAGM DISCS
        // ============================================================
        const glassGroup = new THREE.Group();
        sculptureRoot.add(glassGroup);

        const discGeom1 = new THREE.RingGeometry(4.8, 8.2, 48);
        const glassDisc1 = new THREE.Mesh(discGeom1, glassDiscMat);
        glassDisc1.rotation.set(Math.PI * 0.4, -0.2, 0.1);
        glassDisc1.position.set(1.5, -0.5, -2.0);
        glassGroup.add(glassDisc1);

        const discGeom2 = new THREE.RingGeometry(3.2, 6.0, 40);
        const glassDisc2 = new THREE.Mesh(discGeom2, glassDiscMat);
        glassDisc2.rotation.set(-Math.PI * 0.3, 0.5, -0.3);
        glassDisc2.position.set(-2.0, 0.8, -1.0);
        glassGroup.add(glassDisc2);

        // ============================================================
        // 4. PRECISION NODES & RESTRAINED PEACH ACCENT HIGHLIGHTS
        // ============================================================
        const nodeGroup = new THREE.Group();
        sculptureRoot.add(nodeGroup);

        const nodeSphGeom = new THREE.SphereGeometry(0.18, 16, 16);
        const nodePositions = [
            [7.8, 3.2, 1.8],
            [-8.4, -2.6, 2.2],
            [10.2, -4.1, -1.5],
            [-6.5, 4.8, -2.0],
            [3.1, -6.8, 1.2],
            [-4.2, -5.2, -1.8],
            [0.5, 7.4, 0.8]
        ];

        nodePositions.forEach(pos => {
            const nodeMesh = new THREE.Mesh(nodeSphGeom, peachNodeMat);
            nodeMesh.position.set(pos[0], pos[1], pos[2]);
            nodeGroup.add(nodeMesh);

            // Tiny halo ring around select precision nodes
            const haloGeom = new THREE.RingGeometry(0.32, 0.38, 24);
            const halo = new THREE.Mesh(haloGeom, glassDiscMat);
            halo.position.set(pos[0], pos[1], pos[2]);
            halo.lookAt(0, 0, 24);
            nodeGroup.add(halo);
        });

        // ============================================================
        // 5. DEEP CELESTIAL AMBIENT PARTICLES (48 Subdued Particles)
        // ============================================================
        const particleCount = 48;
        const particleGeom = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3]     = (Math.random() - 0.5) * 36;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;
        }

        particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMat = new THREE.PointsMaterial({
            color: 0x89ceff,
            size: 0.12,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeom, particleMat);
        scene.add(particles);

        // ============================================================
        // 6. INTERACTIVE PARALLAX & LIFECYCLE
        // ============================================================
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

        // Intersection Observer (Zero GPU usage when scrolled away)
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

        // Accessibility prefers-reduced-motion check
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // ============================================================
        // 7. HYPNOTIC, MULTI-SPEED KINETIC ANIMATION LOOP
        // ============================================================
        let clock = 0;

        function animate() {
            if (!isVisible) {
                rafId = null;
                return;
            }

            const speedMultiplier = prefersReducedMotion ? 0.2 : 1.0;
            clock += 0.006 * speedMultiplier;

            // Smooth parallax lerp
            targetX += (mouseX * 0.35 - targetX) * 0.025;
            targetY += (mouseY * 0.25 - targetY) * 0.025;

            // Slow, deliberate multi-axis kinetic motion
            sculptureRoot.rotation.y = 0.08 + Math.sin(clock * 0.25) * 0.12 + targetX;
            sculptureRoot.rotation.x = 0.15 + Math.cos(clock * 0.2) * 0.08 + targetY;

            // Differential rotation speeds per layer
            archGroup.rotation.z = clock * 0.18;
            archGroup.rotation.y = Math.sin(clock * 0.15) * 0.1;

            ringGroup.rotation.z = -clock * 0.12;
            ringGroup.rotation.x = Math.cos(clock * 0.14) * 0.08;

            glassGroup.rotation.y = clock * 0.09;
            glassGroup.rotation.z = Math.sin(clock * 0.18) * 0.15;

            nodeGroup.rotation.z = clock * 0.18;

            particles.rotation.y = clock * 0.04;

            renderer.render(scene, camera);
            rafId = requestAnimationFrame(animate);
        }

        rafId = requestAnimationFrame(animate);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroSculpture);
    } else {
        initHeroSculpture();
    }
})();
