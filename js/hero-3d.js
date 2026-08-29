/* ============================================================
   AETHERFOLIO — BESPOKE 3D CELESTIAL ARMILLARY ORBITAL SCULPTURE
   Kinetic Sweeping Chrome Ribbons, Nested Orbits & Floating Spheres
   Handcrafted 60 FPS Three.js Architecture (v20260829_orbit_v3)
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
        const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 16.5);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        renderer.setPixelRatio(dpr);
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.35;

        // Group container for master depth and mouse parallax (20% larger scale)
        const masterGroup = new THREE.Group();
        masterGroup.position.z = -1.5; // Sit distinctly behind the typography layer
        masterGroup.scale.set(1.2, 1.2, 1.2); // 20% bigger
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
        // PROCEDURAL STUDIO ENVIRONMENT REFLECTION CUBEMAP
        // ============================================================
        try {
            const pmremGen = new THREE.PMREMGenerator(renderer);
            pmremGen.compileEquirectangularShader();
            
            const envScene = new THREE.Scene();
            const envSphere = new THREE.Mesh(
                new THREE.SphereGeometry(10, 16, 16),
                new THREE.MeshBasicMaterial({ color: 0x142232, side: THREE.BackSide })
            );
            envScene.add(envSphere);

            // Reflection strip highlights
            const strip1 = new THREE.Mesh(
                new THREE.PlaneGeometry(16, 6),
                new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
            );
            strip1.position.set(6, 8, 6);
            strip1.lookAt(0, 0, 0);
            envScene.add(strip1);

            const strip2 = new THREE.Mesh(
                new THREE.PlaneGeometry(14, 4),
                new THREE.MeshBasicMaterial({ color: 0xffd5b8, side: THREE.DoubleSide })
            );
            strip2.position.set(-8, -4, 5);
            strip2.lookAt(0, 0, 0);
            envScene.add(strip2);

            scene.environment = pmremGen.fromScene(envScene).texture;
        } catch (e) {
            console.warn('PMREM fallback');
        }

        // ============================================================
        // STUDIO LIGHTING SETUP
        // ============================================================
        const ambientLight = new THREE.AmbientLight(0x18283c, 2.2);
        scene.add(ambientLight);

        // Key light: Warm Rose-Gold specular highlight (top right)
        const keyLight = new THREE.DirectionalLight(0xffecd6, 4.5);
        keyLight.position.set(10, 12, 12);
        scene.add(keyLight);

        // Fill light: Cool Cyan/Steel rim highlight (top left)
        const fillLight = new THREE.DirectionalLight(0xa5f0ea, 3.8);
        fillLight.position.set(-12, 8, 10);
        scene.add(fillLight);

        // Backlight: Deep electric blue edge separation
        const backLight = new THREE.DirectionalLight(0x4070a8, 4.0);
        backLight.position.set(0, -8, -10);
        scene.add(backLight);

        // Orbiting point lights for dazzling specular glints
        const glint1 = new THREE.PointLight(0xffffff, 3.5, 30);
        scene.add(glint1);

        const glint2 = new THREE.PointLight(0xffb4a5, 3.0, 30);
        scene.add(glint2);

        // ============================================================
        // METALLIC MATERIALS (CHROME, ROSE-GOLD, COPPER, GUNMETAL)
        // (Sleek dark obsidian & gold metals with soft atmospheric transparency)
        // ============================================================
        const chromeMaterial = new THREE.MeshStandardMaterial({
            color: 0xc8d5e4,
            metalness: 0.98,
            roughness: 0.12,
            envMapIntensity: 2.2,
            transparent: true,
            opacity: 0.88,
            side: THREE.DoubleSide
        });

        const darkChromeMaterial = new THREE.MeshStandardMaterial({
            color: 0x586880,
            metalness: 0.96,
            roughness: 0.16,
            envMapIntensity: 1.8,
            transparent: true,
            opacity: 0.85,
            side: THREE.DoubleSide
        });

        const roseGoldMaterial = new THREE.MeshStandardMaterial({
            color: 0xd98c6c,
            metalness: 0.94,
            roughness: 0.18,
            envMapIntensity: 2.0,
            transparent: true,
            opacity: 0.88,
            side: THREE.DoubleSide
        });

        const brightGoldMaterial = new THREE.MeshStandardMaterial({
            color: 0xe8ad6e,
            metalness: 0.95,
            roughness: 0.14,
            envMapIntensity: 2.4,
            transparent: true,
            opacity: 0.90,
            side: THREE.DoubleSide
        });

        const darkBronzeMaterial = new THREE.MeshStandardMaterial({
            color: 0x7a4e32,
            metalness: 0.90,
            roughness: 0.22,
            envMapIntensity: 1.6,
            transparent: true,
            opacity: 0.92
        });

        // ============================================================
        // 1. WIDE SWEEPING METALLIC RIBBONS (EXTRUDED FLAT 3D BANDS)
        // ============================================================
        
        // Rectangular cross-section profile for flat, wide ribbon geometry
        const ribbonShapeWide = new THREE.Shape();
        ribbonShapeWide.moveTo(-0.38, -0.04);
        ribbonShapeWide.lineTo(0.38, -0.04);
        ribbonShapeWide.lineTo(0.38, 0.04);
        ribbonShapeWide.lineTo(-0.38, 0.04);
        ribbonShapeWide.closePath();

        const ribbonShapeMedium = new THREE.Shape();
        ribbonShapeMedium.moveTo(-0.24, -0.03);
        ribbonShapeMedium.lineTo(0.24, -0.03);
        ribbonShapeMedium.lineTo(0.24, 0.03);
        ribbonShapeMedium.lineTo(-0.24, 0.03);
        ribbonShapeMedium.closePath();

        // Ribbon A: Large Outer Sweeping Chrome Loop (Behind text)
        const ribbonCurvePointsA = [
            new THREE.Vector3(-6.2, -2.2, 0.5),
            new THREE.Vector3(-6.5, 0.5, 0.0),
            new THREE.Vector3(-5.0, 3.4, -0.8),
            new THREE.Vector3(-2.2, 4.6, -1.8),
            new THREE.Vector3(1.2, 4.2, -2.4),
            new THREE.Vector3(4.8, 2.8, -1.2),
            new THREE.Vector3(6.5, 0.2, 0.0),
            new THREE.Vector3(5.2, -2.6, 0.4),
            new THREE.Vector3(1.8, -3.8, -0.8),
            new THREE.Vector3(-2.5, -3.6, -1.8),
            new THREE.Vector3(-5.4, -2.8, -0.4)
        ];
        const curveA = new THREE.CatmullRomCurve3(ribbonCurvePointsA, true);
        const extrudeSettingsA = {
            steps: 240,
            extrudePath: curveA,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 2
        };
        const ribbonGeoA = new THREE.ExtrudeGeometry(ribbonShapeWide, extrudeSettingsA);
        const ribbonMeshA = new THREE.Mesh(ribbonGeoA, chromeMaterial);
        ribbonGroup.add(ribbonMeshA);

        // Ribbon B: Outer Rose-Gold Sweeping Loop
        const ribbonCurvePointsB = [
            new THREE.Vector3(-4.8, -3.2, -1.2),
            new THREE.Vector3(-6.8, -1.0, -0.6),
            new THREE.Vector3(-5.8, 2.0, 0.4),
            new THREE.Vector3(-2.8, 3.8, 0.8),
            new THREE.Vector3(1.6, 3.6, 0.2),
            new THREE.Vector3(5.6, 1.8, -1.4),
            new THREE.Vector3(6.8, -1.2, -2.0),
            new THREE.Vector3(4.2, -3.4, -1.2),
            new THREE.Vector3(0.0, -4.2, 0.2),
            new THREE.Vector3(-3.2, -3.8, -0.2)
        ];
        const curveB = new THREE.CatmullRomCurve3(ribbonCurvePointsB, true);
        const extrudeSettingsB = {
            steps: 240,
            extrudePath: curveB,
            bevelEnabled: true,
            bevelThickness: 0.015,
            bevelSize: 0.015,
            bevelSegments: 2
        };
        const ribbonGeoB = new THREE.ExtrudeGeometry(ribbonShapeMedium, extrudeSettingsB);
        const ribbonMeshB = new THREE.Mesh(ribbonGeoB, roseGoldMaterial);
        ribbonGroup.add(ribbonMeshB);

        // ============================================================
        // 2. NESTED CELESTIAL ORBIT RINGS (ARMILLARY GYROSCOPE)
        // ============================================================
        
        // Large diagonal rose-gold ring
        const orbitGeo1 = new THREE.TorusGeometry(5.2, 0.07, 16, 120);
        const orbit1 = new THREE.Mesh(orbitGeo1, brightGoldMaterial);
        orbit1.rotation.set(THREE.MathUtils.degToRad(65), THREE.MathUtils.degToRad(35), 0);
        goldOrbitGroup.add(orbit1);

        // Steep inclined thin gold ring
        const orbitGeo2 = new THREE.TorusGeometry(5.8, 0.05, 16, 120);
        const orbit2 = new THREE.Mesh(orbitGeo2, roseGoldMaterial);
        orbit2.rotation.set(THREE.MathUtils.degToRad(-45), THREE.MathUtils.degToRad(70), THREE.MathUtils.degToRad(20));
        goldOrbitGroup.add(orbit2);

        // Outer wide elliptical chrome ring
        const orbitGeo3 = new THREE.TorusGeometry(6.6, 0.08, 16, 140);
        const orbit3 = new THREE.Mesh(orbitGeo3, darkChromeMaterial);
        orbit3.rotation.set(THREE.MathUtils.degToRad(25), THREE.MathUtils.degToRad(-55), THREE.MathUtils.degToRad(40));
        goldOrbitGroup.add(orbit3);

        // Inner armillary core ring
        const orbitGeo4 = new THREE.TorusGeometry(3.4, 0.05, 16, 100);
        const orbit4 = new THREE.Mesh(orbitGeo4, brightGoldMaterial);
        orbit4.rotation.set(THREE.MathUtils.degToRad(80), THREE.MathUtils.degToRad(-20), THREE.MathUtils.degToRad(15));
        innerCoreGroup.add(orbit4);

        // ============================================================
        // 3. CENTRAL METALLIC SPHERE & SUSPENDED CELESTIAL BEADS
        // ============================================================
        
        // Main Core Bronze Sphere (Nestled center right)
        const coreSphereGeo = new THREE.SphereGeometry(1.35, 48, 48);
        const coreSphere = new THREE.Mesh(coreSphereGeo, darkBronzeMaterial);
        coreSphere.position.set(1.4, 0.3, -1.0);
        innerCoreGroup.add(coreSphere);

        // Secondary Chrome Planet (Lower Right)
        const chromeSphereGeo1 = new THREE.SphereGeometry(0.68, 36, 36);
        const chromeSphere1 = new THREE.Mesh(chromeSphereGeo1, chromeMaterial);
        chromeSphere1.position.set(3.8, -0.8, 0.4);
        goldOrbitGroup.add(chromeSphere1);

        // Small Bronze Bead (Far Left)
        const beadGeo1 = new THREE.SphereGeometry(0.30, 24, 24);
        const bead1 = new THREE.Mesh(beadGeo1, roseGoldMaterial);
        bead1.position.set(-5.0, -0.6, 0.2);
        ribbonGroup.add(bead1);

        // Medium Rose-Gold Bead (Upper Left)
        const beadGeo2 = new THREE.SphereGeometry(0.38, 24, 24);
        const bead2 = new THREE.Mesh(beadGeo2, brightGoldMaterial);
        bead2.position.set(-3.0, 2.6, -0.2);
        ribbonGroup.add(bead2);

        // Small Chrome Bead (Far Right Orbit)
        const beadGeo3 = new THREE.SphereGeometry(0.32, 24, 24);
        const bead3 = new THREE.Mesh(beadGeo3, darkChromeMaterial);
        bead3.position.set(5.2, -1.8, -0.8);
        goldOrbitGroup.add(bead3);

        // Tiny Satellite Bead (Top Right)
        const beadGeo4 = new THREE.SphereGeometry(0.22, 20, 20);
        const bead4 = new THREE.Mesh(beadGeo4, roseGoldMaterial);
        bead4.position.set(2.4, 2.8, -1.4);
        innerCoreGroup.add(bead4);

        // ============================================================
        // 4. CALIPER AXIS SPINDLES & VERTICAL NEEDLE RODS
        // ============================================================
        const rodGeo1 = new THREE.CylinderGeometry(0.018, 0.018, 7.5, 12);
        const rod1 = new THREE.Mesh(rodGeo1, brightGoldMaterial);
        rod1.position.set(3.8, 0.6, 0.2);
        rod1.rotation.z = THREE.MathUtils.degToRad(-4);
        innerCoreGroup.add(rod1);

        const rodGeo2 = new THREE.CylinderGeometry(0.016, 0.016, 6.8, 12);
        const rod2 = new THREE.Mesh(rodGeo2, roseGoldMaterial);
        rod2.position.set(-3.0, 0.8, -0.4);
        rod2.rotation.z = THREE.MathUtils.degToRad(6);
        ribbonGroup.add(rod2);

        // ============================================================
        // 5. INNER CONSTELLATION LATTICE & CONNECTOR NODES
        // ============================================================
        const latticePoints = [
            new THREE.Vector3(0.5, 1.2, -0.2),
            new THREE.Vector3(1.8, 0.8, -1.0),
            new THREE.Vector3(2.4, -0.6, 0.2),
            new THREE.Vector3(0.8, -1.4, -0.4),
            new THREE.Vector3(-0.6, -0.4, 0.4),
            new THREE.Vector3(-1.2, 1.0, -0.6)
        ];

        const lineMat = new THREE.LineBasicMaterial({
            color: 0xf5ba78,
            transparent: true,
            opacity: 0.38
        });

        for (let i = 0; i < latticePoints.length; i++) {
            const nodeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), brightGoldMaterial);
            nodeMesh.position.copy(latticePoints[i]);
            innerCoreGroup.add(nodeMesh);

            const nextPoint = latticePoints[(i + 1) % latticePoints.length];
            const lineGeo = new THREE.BufferGeometry().setFromPoints([latticePoints[i], nextPoint]);
            const lineMesh = new THREE.Line(lineGeo, lineMat);
            innerCoreGroup.add(lineMesh);
        }

        const crossGeo = new THREE.BufferGeometry().setFromPoints([latticePoints[0], latticePoints[3]]);
        innerCoreGroup.add(new THREE.Line(crossGeo, lineMat));

        // ============================================================
        // 6. AMBIENT PARTICLES & CELESTIAL DUST
        // ============================================================
        const starCount = 80;
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
            size: 0.08,
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
            
            if (width < 640) {
                camera.position.z = 21;
            } else if (width < 1024) {
                camera.position.z = 18.5;
            } else {
                camera.position.z = 16.5;
            }
            
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', onResize, { passive: true });
        onResize();

        // Passive Viewport Observer
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                isVisible = entries[0].isIntersecting;
            }, { threshold: 0.05 });
            observer.observe(canvas);
        }

        // ============================================================
        // 60 FPS FLUID KINETIC RENDER LOOP (Active Dynamic Motion)
        // ============================================================
        let clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            if (!isVisible) return;

            const elapsedTime = clock.getElapsedTime();

            // Smooth spring lerp for mouse parallax
            mouseX += (targetX - mouseX) * 0.06;
            mouseY += (targetY - mouseY) * 0.06;

            // Master parallax tilt with gentle celestial drift
            masterGroup.rotation.y = mouseX * 0.35 + Math.sin(elapsedTime * 0.25) * 0.12;
            masterGroup.rotation.x = -mouseY * 0.25 + Math.cos(elapsedTime * 0.20) * 0.08;

            // 1. Sweeping chrome ribbon active fluid rotation
            ribbonGroup.rotation.y = elapsedTime * 0.16;
            ribbonGroup.rotation.z = Math.sin(elapsedTime * 0.22) * 0.14;
            ribbonGroup.position.y = Math.sin(elapsedTime * 0.35) * 0.15;

            // 2. Gold orbital armillary rings rotating at counter-angles
            goldOrbitGroup.rotation.x = Math.sin(elapsedTime * 0.18) * 0.22;
            goldOrbitGroup.rotation.y = -elapsedTime * 0.12;
            goldOrbitGroup.rotation.z = Math.cos(elapsedTime * 0.15) * 0.10;

            // 3. Central core gently breathing and rotating
            innerCoreGroup.rotation.y = elapsedTime * 0.09;
            innerCoreGroup.rotation.x = Math.cos(elapsedTime * 0.14) * 0.08;
            innerCoreGroup.position.y = Math.sin(elapsedTime * 0.5) * 0.20;

            // 4. Ambient star dust drifting
            starGroup.rotation.y = -elapsedTime * 0.04;

            // 5. Orbiting specular point lights casting moving glints
            glint1.position.x = Math.cos(elapsedTime * 0.8) * 6;
            glint1.position.y = Math.sin(elapsedTime * 0.6) * 5;
            glint1.position.z = Math.sin(elapsedTime * 0.8) * 4 + 5;
            glint1.intensity = 3.0 + Math.sin(elapsedTime * 2.5) * 1.2;

            glint2.position.x = Math.sin(-elapsedTime * 0.7) * 7;
            glint2.position.y = Math.cos(-elapsedTime * 0.5) * 4;
            glint2.position.z = Math.cos(elapsedTime * 0.7) * 4 + 4;
            glint2.intensity = 2.5 + Math.cos(elapsedTime * 2.2) * 1.0;

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
