/* ============================================================
   AETHERFOLIO — BESPOKE 3D CELESTIAL ARMILLARY ORBITAL SCULPTURE
   Precision Chrome Ribbons, Nested Rose-Gold Orbits & Suspended Beads
   Handcrafted 60 FPS Three.js Architecture
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
            script.onload = () => setupSculptureScene(canvas);
            document.head.appendChild(script);
        } else {
            setupSculptureScene(canvas);
        }
    }

    function setupSculptureScene(canvas) {
        const container = canvas.parentElement;
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 16);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        renderer.setPixelRatio(dpr);
        renderer.setSize(container.clientWidth, container.clientHeight);

        // Group container for mouse parallax
        const masterGroup = new THREE.Group();
        scene.add(masterGroup);

        // Subgroups for multi-axis independent celestial rotation
        const ribbonGroup = new THREE.Group();
        const goldOrbitGroup = new THREE.Group();
        const innerCoreGroup = new THREE.Group();
        const starGroup = new THREE.Group();

        masterGroup.add(ribbonGroup);
        masterGroup.add(goldOrbitGroup);
        masterGroup.add(innerCoreGroup);
        masterGroup.add(starGroup);

        // ============================================================
        // STUDIO LIGHTING SETUP
        // ============================================================
        const ambientLight = new THREE.AmbientLight(0x0c1626, 1.8);
        scene.add(ambientLight);

        // Key light: Warm Rose-Gold specular highlight (top right)
        const keyLight = new THREE.DirectionalLight(0xffd5b8, 3.2);
        keyLight.position.set(12, 10, 14);
        scene.add(keyLight);

        // Fill light: Cool Cyan/Steel rim highlight (top left)
        const fillLight = new THREE.DirectionalLight(0x7ee7df, 2.4);
        fillLight.position.set(-14, 8, 10);
        scene.add(fillLight);

        // Backlight: Deep electric blue edge separation
        const backLight = new THREE.DirectionalLight(0x28558a, 3.5);
        backLight.position.set(0, -10, -12);
        scene.add(backLight);

        // Point lights for dazzling specular glints on metallic curvature
        const glint1 = new THREE.PointLight(0xffe8d6, 2.2, 25);
        glint1.position.set(4, 5, 8);
        scene.add(glint1);

        const glint2 = new THREE.PointLight(0x5dd9cf, 1.8, 25);
        glint2.position.set(-6, -3, 6);
        scene.add(glint2);

        // ============================================================
        // METALLIC MATERIALS (CHROME, ROSE-GOLD, COPPER, GUNMETAL)
        // ============================================================
        const chromeMaterial = new THREE.MeshStandardMaterial({
            color: 0x98a8ba,
            metalness: 0.96,
            roughness: 0.14
        });

        const darkChromeMaterial = new THREE.MeshStandardMaterial({
            color: 0x48566a,
            metalness: 0.95,
            roughness: 0.18
        });

        const roseGoldMaterial = new THREE.MeshStandardMaterial({
            color: 0xd98f6e,
            metalness: 0.92,
            roughness: 0.22
        });

        const brightGoldMaterial = new THREE.MeshStandardMaterial({
            color: 0xe5aa68,
            metalness: 0.94,
            roughness: 0.16
        });

        const darkBronzeMaterial = new THREE.MeshStandardMaterial({
            color: 0x6e4e37,
            metalness: 0.88,
            roughness: 0.25
        });

        // ============================================================
        // 1. SWEEPING METALLIC RIBBONS (CUSTOM 3D CATMULL-ROM SPLINES)
        // ============================================================
        
        // Ribbon A: Large Outer Sweeping Chrome Loop (Figure-8 Orbital)
        const ribbonCurvePointsA = [];
        const numPointsA = 100;
        for (let i = 0; i <= numPointsA; i++) {
            const t = (i / numPointsA) * Math.PI * 2;
            const x = Math.sin(t) * 6.8 + Math.sin(t * 2) * 1.2;
            const y = Math.cos(t) * 4.2 + Math.sin(t * 3) * 0.8;
            const z = Math.sin(t * 2) * 3.6 + Math.cos(t) * 1.5;
            ribbonCurvePointsA.push(new THREE.Vector3(x, y, z));
        }
        const curveA = new THREE.CatmullRomCurve3(ribbonCurvePointsA, true);
        const tubeGeoA = new THREE.TubeGeometry(curveA, 200, 0.14, 20, true);
        const ribbonMeshA = new THREE.Mesh(tubeGeoA, chromeMaterial);
        ribbonGroup.add(ribbonMeshA);

        // Ribbon B: Outer Rose-Gold Sweeping Band
        const ribbonCurvePointsB = [];
        const numPointsB = 100;
        for (let i = 0; i <= numPointsB; i++) {
            const t = (i / numPointsB) * Math.PI * 2;
            const x = Math.cos(t) * 7.4 - Math.sin(t * 2) * 0.9;
            const y = Math.sin(t) * 3.8 - Math.cos(t * 2) * 1.1;
            const z = Math.sin(t) * 4.4 + Math.cos(t * 3) * 0.8;
            ribbonCurvePointsB.push(new THREE.Vector3(x, y, z));
        }
        const curveB = new THREE.CatmullRomCurve3(ribbonCurvePointsB, true);
        const tubeGeoB = new THREE.TubeGeometry(curveB, 200, 0.08, 16, true);
        const ribbonMeshB = new THREE.Mesh(tubeGeoB, roseGoldMaterial);
        ribbonGroup.add(ribbonMeshB);

        // ============================================================
        // 2. NESTED CELESTIAL ORBIT RINGS (ARMILLARY GYROSCOPE)
        // ============================================================
        
        // Large diagonal rose-gold ring
        const orbitGeo1 = new THREE.TorusGeometry(5.6, 0.045, 16, 120);
        const orbit1 = new THREE.Mesh(orbitGeo1, brightGoldMaterial);
        orbit1.rotation.set(THREE.MathUtils.degToRad(65), THREE.MathUtils.degToRad(35), 0);
        goldOrbitGroup.add(orbit1);

        // Steep inclined thin gold ring
        const orbitGeo2 = new THREE.TorusGeometry(6.2, 0.035, 16, 120);
        const orbit2 = new THREE.Mesh(orbitGeo2, roseGoldMaterial);
        orbit2.rotation.set(THREE.MathUtils.degToRad(-45), THREE.MathUtils.degToRad(70), THREE.MathUtils.degToRad(20));
        goldOrbitGroup.add(orbit2);

        // Outer wide elliptical chrome ring
        const orbitGeo3 = new THREE.TorusGeometry(7.0, 0.06, 16, 140);
        const orbit3 = new THREE.Mesh(orbitGeo3, darkChromeMaterial);
        orbit3.rotation.set(THREE.MathUtils.degToRad(25), THREE.MathUtils.degToRad(-55), THREE.MathUtils.degToRad(40));
        goldOrbitGroup.add(orbit3);

        // Inner armillary core ring
        const orbitGeo4 = new THREE.TorusGeometry(3.6, 0.04, 16, 100);
        const orbit4 = new THREE.Mesh(orbitGeo4, brightGoldMaterial);
        orbit4.rotation.set(THREE.MathUtils.degToRad(80), THREE.MathUtils.degToRad(-20), THREE.MathUtils.degToRad(15));
        innerCoreGroup.add(orbit4);

        // ============================================================
        // 3. CENTRAL METALLIC SPHERE & SUSPENDED CELESTIAL BEADS
        // ============================================================
        
        // Main Core Bronze / Gold Sphere (Nestled center right)
        const coreSphereGeo = new THREE.SphereGeometry(1.45, 48, 48);
        const coreSphere = new THREE.Mesh(coreSphereGeo, darkBronzeMaterial);
        coreSphere.position.set(1.4, 0.4, -0.6);
        innerCoreGroup.add(coreSphere);

        // Secondary Chrome Planet (Lower Right)
        const chromeSphereGeo1 = new THREE.SphereGeometry(0.65, 36, 36);
        const chromeSphere1 = new THREE.Mesh(chromeSphereGeo1, chromeMaterial);
        chromeSphere1.position.set(3.8, -0.8, 1.2);
        goldOrbitGroup.add(chromeSphere1);

        // Small Bronze Bead (Far Left)
        const beadGeo1 = new THREE.SphereGeometry(0.28, 24, 24);
        const bead1 = new THREE.Mesh(beadGeo1, roseGoldMaterial);
        bead1.position.set(-5.2, -0.6, 0.8);
        ribbonGroup.add(bead1);

        // Medium Rose-Gold Bead (Upper Left)
        const beadGeo2 = new THREE.SphereGeometry(0.38, 24, 24);
        const bead2 = new THREE.Mesh(beadGeo2, brightGoldMaterial);
        bead2.position.set(-3.2, 2.6, 0.4);
        ribbonGroup.add(bead2);

        // Small Chrome Bead (Far Right Orbit)
        const beadGeo3 = new THREE.SphereGeometry(0.32, 24, 24);
        const bead3 = new THREE.Mesh(beadGeo3, darkChromeMaterial);
        bead3.position.set(5.4, -1.8, -0.5);
        goldOrbitGroup.add(bead3);

        // Tiny Satellite Bead (Top Right)
        const beadGeo4 = new THREE.SphereGeometry(0.22, 20, 20);
        const bead4 = new THREE.Mesh(beadGeo4, roseGoldMaterial);
        bead4.position.set(2.4, 2.8, -1.0);
        innerCoreGroup.add(bead4);

        // ============================================================
        // 4. CALIPER AXIS SPINDLES & VERTICAL NEEDLE RODS
        // ============================================================
        const rodGeo1 = new THREE.CylinderGeometry(0.018, 0.018, 7.5, 12);
        const rod1 = new THREE.Mesh(rodGeo1, brightGoldMaterial);
        rod1.position.set(3.8, 0.6, 0.5);
        rod1.rotation.z = THREE.MathUtils.degToRad(-4);
        innerCoreGroup.add(rod1);

        const rodGeo2 = new THREE.CylinderGeometry(0.016, 0.016, 6.8, 12);
        const rod2 = new THREE.Mesh(rodGeo2, roseGoldMaterial);
        rod2.position.set(-3.2, 0.8, -0.2);
        rod2.rotation.z = THREE.MathUtils.degToRad(6);
        ribbonGroup.add(rod2);

        // ============================================================
        // 5. INNER CONSTELLATION LATTICE & CONNECTOR NODES
        // ============================================================
        const latticePoints = [
            new THREE.Vector3(0.5, 1.2, 0.2),
            new THREE.Vector3(1.8, 0.8, -0.8),
            new THREE.Vector3(2.4, -0.6, 0.6),
            new THREE.Vector3(0.8, -1.4, -0.2),
            new THREE.Vector3(-0.6, -0.4, 0.8),
            new THREE.Vector3(-1.2, 1.0, -0.4)
        ];

        const lineMat = new THREE.LineBasicMaterial({
            color: 0xe5aa68,
            transparent: true,
            opacity: 0.35
        });

        for (let i = 0; i < latticePoints.length; i++) {
            // Node Bead
            const nodeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), brightGoldMaterial);
            nodeMesh.position.copy(latticePoints[i]);
            innerCoreGroup.add(nodeMesh);

            // Connector lines
            const nextPoint = latticePoints[(i + 1) % latticePoints.length];
            const lineGeo = new THREE.BufferGeometry().setFromPoints([latticePoints[i], nextPoint]);
            const lineMesh = new THREE.Line(lineGeo, lineMat);
            innerCoreGroup.add(lineMesh);
        }

        // Cross lattice line
        const crossGeo = new THREE.BufferGeometry().setFromPoints([latticePoints[0], latticePoints[3]]);
        innerCoreGroup.add(new THREE.Line(crossGeo, lineMat));

        // ============================================================
        // 6. AMBIENT PARTICLES & CELESTIAL DUST
        // ============================================================
        const starCount = 75;
        const starGeo = new THREE.BufferGeometry();
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);

        const goldColor = new THREE.Color(0xffd5b8);
        const cyanColor = new THREE.Color(0x5dd9cf);

        for (let i = 0; i < starCount; i++) {
            const r = 4.0 + Math.random() * 6.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = (Math.random() - 0.5) * Math.PI;

            starPositions[i * 3] = r * Math.cos(phi) * Math.cos(theta);
            starPositions[i * 3 + 1] = r * Math.sin(phi) * 0.6;
            starPositions[i * 3 + 2] = r * Math.cos(phi) * Math.sin(theta);

            const chosenColor = Math.random() > 0.4 ? goldColor : cyanColor;
            starColors[i * 3] = chosenColor.r;
            starColors[i * 3 + 1] = chosenColor.g;
            starColors[i * 3 + 2] = chosenColor.b;
        }

        starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

        const starMat = new THREE.PointsMaterial({
            size: 0.07,
            vertexColors: true,
            transparent: true,
            opacity: 0.65
        });

        const starMesh = new THREE.Points(starGeo, starMat);
        starGroup.add(starMesh);

        // ============================================================
        // MOUSE PARALLAX & PHYSICS ENGINE
        // ============================================================
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let isVisible = true;

        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
                targetX *= 0.95;
                targetY *= 0.95;
                return;
            }
            targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // Responsive Resizing
        const onResize = () => {
            if (!container) return;
            const width = container.clientWidth;
            const height = container.clientHeight;
            camera.aspect = width / height;
            
            // Adjust camera distance based on mobile vs desktop
            if (width < 640) {
                camera.position.z = 21;
            } else if (width < 1024) {
                camera.position.z = 18;
            } else {
                camera.position.z = 16;
            }
            
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', onResize, { passive: true });
        onResize();

        // Passive Viewport Observer (Halts GPU cycles when scrolled away)
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                isVisible = entries[0].isIntersecting;
            }, { threshold: 0.05 });
            observer.observe(canvas);
        }

        // ============================================================
        // 60 FPS RENDER LOOP
        // ============================================================
        let clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            if (!isVisible) return;

            const elapsedTime = clock.getElapsedTime();

            // Smooth spring lerp for mouse parallax
            mouseX += (targetX - mouseX) * 0.05;
            mouseY += (targetY - mouseY) * 0.05;

            // Master parallax tilt
            masterGroup.rotation.y = mouseX * 0.35 + Math.sin(elapsedTime * 0.15) * 0.08;
            masterGroup.rotation.x = -mouseY * 0.25 + Math.cos(elapsedTime * 0.12) * 0.05;

            // Independent slow orbital rotations matching physical machinery
            ribbonGroup.rotation.y = elapsedTime * 0.06;
            ribbonGroup.rotation.z = Math.sin(elapsedTime * 0.08) * 0.06;

            goldOrbitGroup.rotation.x = Math.sin(elapsedTime * 0.07) * 0.08;
            goldOrbitGroup.rotation.y = -elapsedTime * 0.045;

            innerCoreGroup.rotation.y = elapsedTime * 0.035;
            innerCoreGroup.rotation.x = Math.cos(elapsedTime * 0.05) * 0.04;

            starGroup.rotation.y = -elapsedTime * 0.02;

            // Pulsing glint lights
            glint1.intensity = 2.0 + Math.sin(elapsedTime * 2.0) * 0.6;
            glint2.intensity = 1.6 + Math.cos(elapsedTime * 1.8) * 0.5;

            renderer.render(scene, camera);
        }

        animate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroSculpture);
    } else {
        initHeroSculpture();
    }
})();
