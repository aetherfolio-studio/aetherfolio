/* ============================================================
   AETHERFOLIO — BESPOKE 3D ORGANIC LIQUID MORPHING BLOB ENGINE
   Custom GLSL Simplex Noise Vertex Displacement & Fresnel Shader
   60 FPS High-Performance Viewport Lifecycle
   ============================================================ */

(function () {
    'use strict';

    function initHeroBlob() {
        const canvas = document.getElementById('hero-3d-canvas');
        if (!canvas) return;

        if (typeof THREE === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.async = true;
            script.onload = () => setupBlobScene(canvas);
            document.head.appendChild(script);
        } else {
            setupBlobScene(canvas);
        }
    }

    function setupBlobScene(canvas) {
        const container = canvas.parentElement;
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 14);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        renderer.setPixelRatio(dpr);
        renderer.setSize(container.clientWidth, container.clientHeight);

        // ============================================================
        // GLSL SIMPLEX 3D NOISE & FRESNEL LIQUID SHADER
        // ============================================================
        const vertexShader = 
            uniform float u_time;
            uniform float u_speed;
            uniform float u_frequency;
            uniform float u_amplitude;
            uniform vec2 u_mouse;
            uniform float u_mouse_intensity;

            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec3 vViewPosition;
            varying float vDisplacement;

            // Simplex 3D noise functions
            vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
            vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

            float snoise(vec3 v){
                const vec2  C = vec2(1.0/6.0, 1.0/3.0);
                const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

                vec3 i  = floor(v + dot(v, C.yyy));
                vec3 x0 = v - i + dot(i, C.xxx);

                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min( g.xyz, l.zxy );
                vec3 i2 = max( g.xyz, l.zxy );

                vec3 x1 = x0 - i1 + 1.0 * C.xxx;
                vec3 x2 = x0 - i2 + 2.0 * C.xxx;
                vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

                i = mod(i, 289.0);
                vec4 p = permute( permute( permute(
                            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                        + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                        + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

                float n_ = 0.142857142857;
                vec3  ns = n_ * D.wyz - D.xzx;

                vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_ );

                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);

                vec4 b0 = vec4( x.xy, y.xy );
                vec4 b1 = vec4( x.zw, y.zw );

                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));

                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

                vec3 p0 = vec3(a0.xy,h.x);
                vec3 p1 = vec3(a0.zw,h.y);
                vec3 p2 = vec3(a1.xy,h.z);
                vec3 p3 = vec3(a1.zw,h.w);

                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;

                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
            }

            void main() {
                vUv = uv;
                vNormal = normal;

                // Multi-frequency harmonic organic displacement
                vec3 pos = position;
                float t = u_time * u_speed;
                
                float noise1 = snoise(normal * u_frequency + vec3(t * 0.8, t * 0.6, t * 0.4));
                float noise2 = snoise(normal * (u_frequency * 2.2) - vec3(t * 0.5, t * 0.7, t * 0.6)) * 0.45;
                float noise3 = snoise(normal * (u_frequency * 4.0) + vec3(t * 0.3, t * 0.4, t * 0.5)) * 0.2;
                
                // Cursor interactive deformation pull
                vec3 mouseDir = vec3(u_mouse.x, u_mouse.y, 0.5);
                float mouseDist = length(pos - mouseDir * 3.5);
                float mouseInfluence = smoothstep(6.0, 0.0, mouseDist) * u_mouse_intensity;

                float displacement = (noise1 + noise2 + noise3) * u_amplitude + mouseInfluence * 0.4;
                vDisplacement = displacement;

                vec3 newPosition = position + normal * displacement;
                vPosition = newPosition;

                vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
                vViewPosition = -mvPosition.xyz;

                gl_Position = projectionMatrix * mvPosition;
            }
        ;

        const fragmentShader = 
            uniform float u_time;
            uniform vec3 u_color_deep;
            uniform vec3 u_color_mid;
            uniform vec3 u_color_fresnel_coral;
            uniform vec3 u_color_fresnel_cyan;
            uniform vec3 u_color_highlight;

            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec3 vViewPosition;
            varying float vDisplacement;

            void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDir = normalize(vViewPosition);

                // Optical Fresnel rim falloff
                float fresnel = dot(normal, viewDir);
                fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
                float fresnelFactor = pow(fresnel, 2.8);

                // Specular highlight from key light
                vec3 lightDir = normalize(vec3(1.2, 1.8, 1.5));
                vec3 halfDir = normalize(lightDir + viewDir);
                float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);

                // Dual chromatic iridescence along Fresnel rim
                float chromaticPhase = dot(normal, vec3(0.7, 0.5, 0.0)) * 0.5 + 0.5;
                vec3 rimColor = mix(u_color_fresnel_coral, u_color_fresnel_cyan, chromaticPhase);

                // Depth shading based on noise displacement peaks & valleys
                float dispFactor = clamp(vDisplacement * 0.6 + 0.5, 0.0, 1.0);
                vec3 baseBody = mix(u_color_deep, u_color_mid, dispFactor);

                // Combine layers
                vec3 finalColor = baseBody;
                finalColor += rimColor * fresnelFactor * 1.6;
                finalColor += u_color_highlight * spec * 0.75;

                // Subtle alpha falloff for atmospheric elegance
                float alpha = clamp(0.75 + fresnelFactor * 0.25, 0.0, 0.95);

                gl_FragColor = vec4(finalColor, alpha);
            }
        ;

        // ============================================================
        // 3D BLOB MESH SETUP (High-Detail Sphere Geometry)
        // ============================================================
        const geometry = new THREE.IcosahedronGeometry(4.0, 32);

        const uniforms = {
            u_time: { value: 0.0 },
            u_speed: { value: 0.35 },
            u_frequency: { value: 0.85 },
            u_amplitude: { value: 0.68 },
            u_mouse: { value: new THREE.Vector2(0, 0) },
            u_mouse_intensity: { value: 0.0 },
            // Aether Palette
            u_color_deep: { value: new THREE.Color(0x001428) },       // Midnight Slate
            u_color_mid: { value: new THREE.Color(0x062847) },        // Deep Steel Navy
            u_color_fresnel_coral: { value: new THREE.Color(0xffb4a5) }, // Electric Coral
            u_color_fresnel_cyan: { value: new THREE.Color(0x5dd9cf) },  // Electric Cyan
            u_color_highlight: { value: new THREE.Color(0xd0e4ff) }     // Starlight Specular
        };

        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: uniforms,
            transparent: true,
            depthWrite: false,
            blending: THREE.NormalBlending
        });

        const blobMesh = new THREE.Mesh(geometry, material);
        scene.add(blobMesh);

        // Surrounding delicate orbital ring halo
        const haloGeom = new THREE.RingGeometry(5.2, 5.24, 120);
        const haloMat = new THREE.MeshBasicMaterial({
            color: 0xffb4a5,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide
        });
        const halo = new THREE.Mesh(haloGeom, haloMat);
        halo.rotation.x = Math.PI * 0.35;
        halo.rotation.y = Math.PI * 0.15;
        scene.add(halo);

        // Secondary counter-tilted halo
        const haloGeom2 = new THREE.RingGeometry(6.4, 6.43, 120);
        const haloMat2 = new THREE.MeshBasicMaterial({
            color: 0x5dd9cf,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const halo2 = new THREE.Mesh(haloGeom2, haloMat2);
        halo2.rotation.x = -Math.PI * 0.4;
        halo2.rotation.y = -Math.PI * 0.2;
        scene.add(halo2);

        // ============================================================
        // MOUSE INTERACTION & RESIZE
        // ============================================================
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let mouseMoving = false;
        let mouseTimer = null;
        let isVisible = true;
        let rafId = null;

        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            mouseX = (e.clientX - cx) / (rect.width / 2);
            mouseY = (e.clientY - cy) / (rect.height / 2);

            mouseMoving = true;
            clearTimeout(mouseTimer);
            mouseTimer = setTimeout(() => { mouseMoving = false; }, 400);
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

        // Viewport Observer (0% GPU when scrolled away)
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

        // ============================================================
        // RENDER LOOP
        // ============================================================
        let clock = 0;

        function animate() {
            if (!isVisible) {
                rafId = null;
                return;
            }

            clock += 0.012;
            uniforms.u_time.value = clock;

            // Parallax lerp
            targetX += (mouseX - targetX) * 0.04;
            targetY += (mouseY - targetY) * 0.04;

            uniforms.u_mouse.value.set(targetX, targetY);
            uniforms.u_mouse_intensity.value = mouseMoving ? 0.35 : 0.1;

            // Subtle rotational drift
            blobMesh.rotation.y = clock * 0.12 + targetX * 0.3;
            blobMesh.rotation.x = clock * 0.08 + targetY * 0.3;

            halo.rotation.z = clock * 0.05;
            halo2.rotation.z = -clock * 0.035;

            renderer.render(scene, camera);
            rafId = requestAnimationFrame(animate);
        }

        rafId = requestAnimationFrame(animate);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroBlob);
    } else {
        initHeroBlob();
    }
})();
