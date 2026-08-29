/* ============================================================
   AETHERFOLIO v3.0 — GPU WebGL Cursor Fluid Simulation Engine
   Milestone 2: Real-time Navier-Stokes Solver & Electric Dye Dispersion
   ============================================================ */

(function (window, document) {
    'use strict';

    // Global active singleton instance holder
    let activeInstance = null;

    const DEFAULT_CONFIG = {
        canvasId: 'aether-fluid-canvas',
        simResolution: 128,          // Optimized physics simulation FBO resolution
        dyeResolution: 512,          // Crisp visual dye texture FBO resolution
        densityDissipation: 0.88,    // Fluid decays gracefully
        velocityDissipation: 0.92,   // Momentum persistence
        pressureIterations: 8,       // 8 iterations for smooth physics with 60% less GPU overhead
        curlStrength: 20.0,          // Balanced turbulence
        splatRadius: 0.0028,         // Optimal impulse radius
        splatForce: 4500.0,          // Velocity force multiplier
        colorCycleSpeed: 0.15,       // Harmonic color cycling speed
        subSplatInterpolation: true, // Smooth pointer trajectory
        subSplatStepPixels: 15,      // Efficient interpolation step
        ambientBreathing: false,     // Disabled to allow 0% GPU idle sleep
        idleTimeoutMs: 1500,         // Time before entering sleep mode
        maxDpr: 1.25,                // Balanced resolution clamping
        respectReducedMotion: true   // Accessibility prefers-reduced-motion check
    };

    // Mandatory Palette Points
    // Electric Coral: #ffb4a5 -> [1.0, 0.70588, 0.64706]
    // Electric Cyan:  #5dd9cf -> [0.36471, 0.85098, 0.81176]
    // Cobalt Azure:   #89ceff -> [0.53725, 0.80784, 1.0]
    const PALETTE = [
        { name: 'Coral', rgb: [1.0, 0.70588, 0.64706] },
        { name: 'Cyan',  rgb: [0.36471, 0.85098, 0.81176] },
        { name: 'Azure', rgb: [0.53725, 0.80784, 1.0] }
    ];

    /* ------------------------------------------------------------
       GLSL Shader Sources
       ------------------------------------------------------------ */

    // Fullscreen Quad Vertex Shader with neighbor texel UV calculations
    const baseVertexShaderSource = `
        precision highp float;
        attribute vec2 a_position;
        varying vec2 v_uv;
        varying vec2 v_l;
        varying vec2 v_r;
        varying vec2 v_t;
        varying vec2 v_b;
        uniform vec2 u_texelSize;

        void main() {
            v_uv = a_position * 0.5 + 0.5;
            v_l = v_uv - vec2(u_texelSize.x, 0.0);
            v_r = v_uv + vec2(u_texelSize.x, 0.0);
            v_b = v_uv - vec2(0.0, u_texelSize.y);
            v_t = v_uv + vec2(0.0, u_texelSize.y);
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    // Clear Shader for FBO initialization / reset
    const clearShaderSource = `
        precision highp float;
        varying vec2 v_uv;
        uniform sampler2D u_texture;
        uniform float u_value;

        void main() {
            gl_FragColor = u_value * texture2D(u_texture, v_uv);
        }
    `;

    // Splat Shader: Gaussian impulse injection for velocity and dye
    const splatShaderSource = `
        precision highp float;
        varying vec2 v_uv;
        uniform sampler2D u_target;
        uniform vec2 u_point;
        uniform vec3 u_color;
        uniform float u_radius;
        uniform float u_aspect;

        void main() {
            vec2 p = v_uv - u_point;
            p.x *= u_aspect;
            float splat = exp(-dot(p, p) / u_radius);
            vec3 base = texture2D(u_target, v_uv).xyz;
            gl_FragColor = vec4(base + u_color * splat, 1.0);
        }
    `;

    // Semi-Lagrangian Advection Shader
    const advectionShaderSource = `
        precision highp float;
        varying vec2 v_uv;
        uniform sampler2D u_velocity;
        uniform sampler2D u_source;
        uniform vec2 u_texelSize;
        uniform float u_dt;
        uniform float u_dissipation;

        void main() {
            vec2 vel = texture2D(u_velocity, v_uv).xy;
            vec2 coord = v_uv - u_dt * vel * u_texelSize;
            vec4 result = texture2D(u_source, coord);
            gl_FragColor = u_dissipation * result;
        }
    `;

    // Divergence Shader: Discrete net volumetric flux
    const divergenceShaderSource = `
        precision highp float;
        varying vec2 v_uv;
        varying vec2 v_l;
        varying vec2 v_r;
        varying vec2 v_t;
        varying vec2 v_b;
        uniform sampler2D u_velocity;

        void main() {
            float L = texture2D(u_velocity, v_l).x;
            float R = texture2D(u_velocity, v_r).x;
            float B = texture2D(u_velocity, v_b).y;
            float T = texture2D(u_velocity, v_t).y;

            float div = 0.5 * ((R - L) + (T - B));
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
    `;

    // Curl (Vorticity) Calculation Shader
    const curlShaderSource = `
        precision highp float;
        varying vec2 v_uv;
        varying vec2 v_l;
        varying vec2 v_r;
        varying vec2 v_t;
        varying vec2 v_b;
        uniform sampler2D u_velocity;

        void main() {
            float L = texture2D(u_velocity, v_l).y;
            float R = texture2D(u_velocity, v_r).y;
            float B = texture2D(u_velocity, v_b).x;
            float T = texture2D(u_velocity, v_t).x;

            float curl = (R - L) - (T - B);
            gl_FragColor = vec4(0.5 * curl, 0.0, 0.0, 1.0);
        }
    `;

    // Vorticity Force Confinement Shader
    const vorticityShaderSource = `
        precision highp float;
        varying vec2 v_uv;
        varying vec2 v_l;
        varying vec2 v_r;
        varying vec2 v_t;
        varying vec2 v_b;
        uniform sampler2D u_velocity;
        uniform sampler2D u_curl;
        uniform float u_curlStrength;
        uniform float u_dt;

        void main() {
            float L = texture2D(u_curl, v_l).x;
            float R = texture2D(u_curl, v_r).x;
            float B = texture2D(u_curl, v_b).x;
            float T = texture2D(u_curl, v_t).x;
            float C = texture2D(u_curl, v_uv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            float len = length(force) + 0.00001;
            force = (force / len) * u_curlStrength * C * vec2(1.0, -1.0);

            vec2 vel = texture2D(u_velocity, v_uv).xy;
            gl_FragColor = vec4(vel + force * u_dt, 0.0, 1.0);
        }
    `;

    // Jacobi Poisson Pressure Relaxation Shader
    const jacobiShaderSource = `
        precision highp float;
        varying vec2 v_uv;
        varying vec2 v_l;
        varying vec2 v_r;
        varying vec2 v_t;
        varying vec2 v_b;
        uniform sampler2D u_pressure;
        uniform sampler2D u_divergence;

        void main() {
            float L = texture2D(u_pressure, v_l).x;
            float R = texture2D(u_pressure, v_r).x;
            float B = texture2D(u_pressure, v_b).x;
            float T = texture2D(u_pressure, v_t).x;
            float div = texture2D(u_divergence, v_uv).x;

            float p = (L + R + B + T - div) * 0.25;
            gl_FragColor = vec4(p, 0.0, 0.0, 1.0);
        }
    `;

    // Gradient Subtraction (Projection) Shader: Enforce div(u) = 0
    const gradientSubtractShaderSource = `
        precision highp float;
        varying vec2 v_uv;
        varying vec2 v_l;
        varying vec2 v_r;
        varying vec2 v_t;
        varying vec2 v_b;
        uniform sampler2D u_pressure;
        uniform sampler2D u_velocity;

        void main() {
            float L = texture2D(u_pressure, v_l).x;
            float R = texture2D(u_pressure, v_r).x;
            float B = texture2D(u_pressure, v_b).x;
            float T = texture2D(u_pressure, v_t).x;

            vec2 grad = 0.5 * vec2(R - L, T - B);
            vec2 vel = texture2D(u_velocity, v_uv).xy;

            gl_FragColor = vec4(vel - grad, 0.0, 1.0);
        }
    `;

    // Tone-mapped Display Shader
    const displayShaderSource = `
        precision highp float;
        varying vec2 v_uv;
        uniform sampler2D u_dye;

        void main() {
            vec3 c = texture2D(u_dye, v_uv).rgb;

            // Subtle tone mapping
            c = 1.0 - exp(-c * 0.9);

            // Compute alpha transparency - ultra-subtle max 25% opacity
            float intensity = max(c.r, max(c.g, c.b));
            float alpha = smoothstep(0.02, 0.8, intensity) * 0.25;

            gl_FragColor = vec4(c, alpha);
        }
    `;

    /* ------------------------------------------------------------
       Main Fluid Simulation Factory
       ------------------------------------------------------------ */

    function createFluidSimulator(customConfig) {
        const config = Object.assign({}, DEFAULT_CONFIG, customConfig);

        // 1. Accessibility Check: prefers-reduced-motion
        if (config.respectReducedMotion && typeof window.matchMedia === 'function') {
            const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (motionQuery.matches) {
                console.info('[AetherFluid] Reduced motion preferred. Fluid simulation disabled.');
                return null;
            }
        }

        // 2. DOM & Canvas Setup
        let canvas = document.getElementById(config.canvasId);
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = config.canvasId;
            canvas.className = 'fixed inset-0 w-full h-full pointer-events-none z-0';
            document.body.insertBefore(canvas, document.body.firstChild);
        }

        // 3. WebGL Context Creation
        const glParams = {
            alpha: true,
            depth: false,
            stencil: false,
            antialias: false,
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance'
        };

        let gl = canvas.getContext('webgl2', glParams);
        const isWebGL2 = Boolean(gl);

        if (!isWebGL2) {
            gl = canvas.getContext('webgl', glParams) || canvas.getContext('experimental-webgl', glParams);
        }

        if (!gl) {
            console.warn('[AetherFluid] WebGL not supported. Running with static aesthetic fallback.');
            canvas.style.display = 'none';
            return null;
        }

        // 4. Extension Probing & Texture Format Selection
        let internalFormat, format, type, filtering;

        if (isWebGL2) {
            gl.getExtension('EXT_color_buffer_float');
            const floatLinear = gl.getExtension('OES_texture_float_linear');
            internalFormat = gl.RGBA16F || gl.RGBA;
            format = gl.RGBA;
            type = gl.HALF_FLOAT;
            filtering = floatLinear ? gl.LINEAR : gl.NEAREST;
        } else {
            const halfFloatExt = gl.getExtension('OES_texture_half_float');
            const halfFloatLinearExt = gl.getExtension('OES_texture_half_float_linear');
            const colorBufferHalfFloat = gl.getExtension('EXT_color_buffer_half_float') || gl.getExtension('WEBGL_color_buffer_float');

            if (halfFloatExt && colorBufferHalfFloat) {
                internalFormat = gl.RGBA;
                format = gl.RGBA;
                type = halfFloatExt.HALF_FLOAT_OES;
                filtering = halfFloatLinearExt ? gl.LINEAR : gl.NEAREST;
            } else {
                internalFormat = gl.RGBA;
                format = gl.RGBA;
                type = gl.UNSIGNED_BYTE;
                filtering = gl.LINEAR;
            }
        }

        // 5. Shader Compilation & Program Linking Helper
        function createProgram(vertexSource, fragmentSource) {
            const vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vertexSource);
            gl.compileShader(vs);
            if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
                console.error('[AetherFluid] Vertex Shader Error:', gl.getShaderInfoLog(vs));
                gl.deleteShader(vs);
                return null;
            }

            const fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fragmentSource);
            gl.compileShader(fs);
            if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
                console.error('[AetherFluid] Fragment Shader Error:', gl.getShaderInfoLog(fs));
                gl.deleteShader(vs);
                gl.deleteShader(fs);
                return null;
            }

            const program = gl.createProgram();
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error('[AetherFluid] Program Link Error:', gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }

            const uniforms = {};
            const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < uniformCount; i++) {
                const info = gl.getActiveUniform(program, i);
                if (info) {
                    uniforms[info.name] = gl.getUniformLocation(program, info.name);
                }
            }

            return { program, uniforms };
        }

        // Compile all shader programs
        const splatProgram = createProgram(baseVertexShaderSource, splatShaderSource);
        const clearProgram = createProgram(baseVertexShaderSource, clearShaderSource);
        const advectionProgram = createProgram(baseVertexShaderSource, advectionShaderSource);
        const divergenceProgram = createProgram(baseVertexShaderSource, divergenceShaderSource);
        const curlProgram = createProgram(baseVertexShaderSource, curlShaderSource);
        const vorticityProgram = createProgram(baseVertexShaderSource, vorticityShaderSource);
        const jacobiProgram = createProgram(baseVertexShaderSource, jacobiShaderSource);
        const gradientSubtractProgram = createProgram(baseVertexShaderSource, gradientSubtractShaderSource);
        const displayProgram = createProgram(baseVertexShaderSource, displayShaderSource);

        // 6. Geometry Setup: Fullscreen Clip-Space Quad
        const quadBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1.0, -1.0,
                 1.0, -1.0,
                -1.0,  1.0,
                -1.0,  1.0,
                 1.0, -1.0,
                 1.0,  1.0
            ]),
            gl.STATIC_DRAW
        );

        function bindQuad(program) {
            const posLocation = gl.getAttribLocation(program.program, 'a_position');
            if (posLocation !== -1) {
                gl.enableVertexAttribArray(posLocation);
                gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);
            }
        }

        // 7. FBO & Double (Ping-Pong) Buffer Allocation
        function createFBO(width, height, internalFmt, fmt, tp, flt) {
            gl.activeTexture(gl.TEXTURE0);
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, flt);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, flt);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFmt, width, height, 0, fmt, tp, null);

            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            gl.viewport(0, 0, width, height);
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            return {
                fbo,
                texture,
                width,
                height,
                texelSizeX: 1.0 / width,
                texelSizeY: 1.0 / height,
                attach(unit) {
                    gl.activeTexture(gl.TEXTURE0 + unit);
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    return unit;
                }
            };
        }

        function createDoubleFBO(width, height, internalFmt, fmt, tp, flt) {
            let fbo1 = createFBO(width, height, internalFmt, fmt, tp, flt);
            let fbo2 = createFBO(width, height, internalFmt, fmt, tp, flt);

            return {
                width,
                height,
                texelSizeX: 1.0 / width,
                texelSizeY: 1.0 / height,
                get read() { return fbo1; },
                get write() { return fbo2; },
                swap() {
                    const temp = fbo1;
                    fbo1 = fbo2;
                    fbo2 = temp;
                }
            };
        }

        // Allocate Decoupled FBOs
        const simW = config.simResolution;
        const simH = config.simResolution;
        const dyeW = config.dyeResolution;
        const dyeH = config.dyeResolution;

        const velocity = createDoubleFBO(simW, simH, internalFormat, format, type, filtering);
        const dye = createDoubleFBO(dyeW, dyeH, internalFormat, format, type, filtering);
        const pressure = createDoubleFBO(simW, simH, internalFormat, format, type, filtering);
        const divergence = createFBO(simW, simH, internalFormat, format, type, filtering);
        const curl = createFBO(simW, simH, internalFormat, format, type, filtering);

        // 8. Dynamic Color Generation (3-Point Continuous Harmonic Cycling)
        function getCycleColor(phase) {
            const p = (phase % 1.0 + 1.0) % 1.0;
            const scaled = p * 3.0;
            const idx = Math.floor(scaled);
            const fract = scaled - idx;

            const c1 = PALETTE[idx % 3].rgb;
            const c2 = PALETTE[(idx + 1) % 3].rgb;

            return [
                c1[0] + (c2[0] - c1[0]) * fract,
                c1[1] + (c2[1] - c1[1]) * fract,
                c1[2] + (c2[2] - c1[2]) * fract
            ];
        }

        // 9. Splat Operation: Injects force and dye
        function splat(x, y, dx, dy, color) {
            const aspect = canvas.width / canvas.height;

            // Splat Velocity
            gl.useProgram(splatProgram.program);
            gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
            gl.viewport(0, 0, velocity.width, velocity.height);
            bindQuad(splatProgram);

            gl.uniform1i(splatProgram.uniforms.u_target, velocity.read.attach(0));
            gl.uniform1f(splatProgram.uniforms.u_aspect, aspect);
            gl.uniform2f(splatProgram.uniforms.u_point, x, y);
            gl.uniform3f(splatProgram.uniforms.u_color, dx, dy, 0.0);
            gl.uniform1f(splatProgram.uniforms.u_radius, config.splatRadius / aspect);
            gl.uniform2f(splatProgram.uniforms.u_texelSize, velocity.texelSizeX, velocity.texelSizeY);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            velocity.swap();

            // Splat Dye
            gl.bindFramebuffer(gl.FRAMEBUFFER, dye.write.fbo);
            gl.viewport(0, 0, dye.width, dye.height);
            bindQuad(splatProgram);

            gl.uniform1i(splatProgram.uniforms.u_target, dye.read.attach(0));
            gl.uniform1f(splatProgram.uniforms.u_aspect, aspect);
            gl.uniform2f(splatProgram.uniforms.u_point, x, y);
            gl.uniform3f(splatProgram.uniforms.u_color, color[0], color[1], color[2]);
            gl.uniform1f(splatProgram.uniforms.u_radius, config.splatRadius / aspect);
            gl.uniform2f(splatProgram.uniforms.u_texelSize, dye.texelSizeX, dye.texelSizeY);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            dye.swap();
        }

        // 10. Simulation State
        let isPaused = false;
        let isRunning = true;
        let isSleeping = false;
        let idleFrames = 0;
        let rafId = null;
        let lastTime = performance.now();
        let lastInteractionTime = performance.now();
        let colorPhase = 0.0;

        function wakeUp() {
            lastInteractionTime = performance.now();
            if (isSleeping) {
                isSleeping = false;
                idleFrames = 0;
                lastTime = performance.now();
                if (!rafId && !isPaused && isRunning) {
                    rafId = requestAnimationFrame(renderLoop);
                }
            }
        }

        const pointer = {
            x: 0,
            y: 0,
            prevX: 0,
            prevY: 0,
            deltaX: 0,
            deltaY: 0,
            hasMoved: false,
            down: false
        };

        // 11. Pointer Event Handlers
        function onPointerMove(e) {
            wakeUp();
            const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

            const normX = clientX / window.innerWidth;
            const normY = 1.0 - (clientY / window.innerHeight);

            if (!pointer.hasMoved) {
                pointer.prevX = normX;
                pointer.prevY = normY;
                pointer.hasMoved = true;
            }

            pointer.x = normX;
            pointer.y = normY;
            pointer.deltaX = normX - pointer.prevX;
            pointer.deltaY = normY - pointer.prevY;

            const distPx = Math.hypot(pointer.deltaX * window.innerWidth, pointer.deltaY * window.innerHeight);

            if (distPx > 0.5) {
                colorPhase += 0.015 + (distPx * 0.0004);
                const dyeColor = getCycleColor(colorPhase);

                // Energy modulation based on speed
                const speed = distPx / Math.max(1, 16.6);
                const energy = Math.min(1.0 + speed * 0.5, 2.0);
                const modulatedColor = [
                    dyeColor[0] * energy,
                    dyeColor[1] * energy,
                    dyeColor[2] * energy
                ];

                if (config.subSplatInterpolation && distPx > config.subSplatStepPixels) {
                    const steps = Math.max(1, Math.min(Math.floor(distPx / config.subSplatStepPixels), 16));
                    for (let i = 1; i <= steps; i++) {
                        const t = i / steps;
                        const ix = pointer.prevX + (pointer.x - pointer.prevX) * t;
                        const iy = pointer.prevY + (pointer.y - pointer.prevY) * t;
                        const forceFraction = 1.0 / steps;
                        splat(
                            ix,
                            iy,
                            pointer.deltaX * config.splatForce * forceFraction,
                            pointer.deltaY * config.splatForce * forceFraction,
                            modulatedColor
                        );
                    }
                } else {
                    splat(
                        pointer.x,
                        pointer.y,
                        pointer.deltaX * config.splatForce,
                        pointer.deltaY * config.splatForce,
                        modulatedColor
                    );
                }

                pointer.prevX = pointer.x;
                pointer.prevY = pointer.y;
            }
        }

        function onPointerDown(e) {
            pointer.down = true;
            onPointerMove(e);
        }

        function onPointerUp() {
            pointer.down = false;
        }

        // 12. Viewport & Canvas Resize
        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, config.maxDpr);
            const w = Math.floor(window.innerWidth * dpr);
            const h = Math.floor(window.innerHeight * dpr);

            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
                gl.viewport(0, 0, w, h);
            }
        }

        // 13. Core Simulation Render Step
        function renderLoop(currentTime) {
            if (isPaused || !isRunning) return;

            const idleDuration = currentTime - lastInteractionTime;
            if (!config.ambientBreathing && idleDuration > config.idleTimeoutMs) {
                idleFrames++;
                if (idleFrames > 60) {
                    // Enter GPU 0% sleep mode when fluid has dissipated
                    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                    gl.viewport(0, 0, canvas.width, canvas.height);
                    gl.clearColor(0.0, 0.0, 0.0, 0.0);
                    gl.clear(gl.COLOR_BUFFER_BIT);
                    isSleeping = true;
                    rafId = null;
                    return;
                }
            } else {
                idleFrames = 0;
            }

            const dt = Math.min((currentTime - lastTime) / 1000, 0.0333);
            lastTime = currentTime;

            // Ambient breathing check (idle stimulation)
            if (config.ambientBreathing && (currentTime - lastInteractionTime > config.idleTimeoutMs)) {
                const angle = currentTime * 0.0008;
                const ax = 0.5 + Math.sin(angle) * 0.25;
                const ay = 0.5 + Math.cos(angle * 1.2) * 0.2;
                const adx = Math.cos(angle) * 80.0;
                const ady = -Math.sin(angle * 1.2) * 80.0;
                const ambientColor = getCycleColor(currentTime * 0.00008);
                splat(ax, ay, adx, ady, [ambientColor[0] * 0.25, ambientColor[1] * 0.25, ambientColor[2] * 0.25]);
            }

            // Step 1: Advect Velocity
            gl.useProgram(advectionProgram.program);
            gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
            gl.viewport(0, 0, velocity.width, velocity.height);
            bindQuad(advectionProgram);

            gl.uniform2f(advectionProgram.uniforms.u_texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(advectionProgram.uniforms.u_velocity, velocity.read.attach(0));
            gl.uniform1i(advectionProgram.uniforms.u_source, velocity.read.attach(0));
            gl.uniform1f(advectionProgram.uniforms.u_dt, dt);
            gl.uniform1f(advectionProgram.uniforms.u_dissipation, config.velocityDissipation);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            velocity.swap();

            // Step 2: Advect Dye
            gl.useProgram(advectionProgram.program);
            gl.bindFramebuffer(gl.FRAMEBUFFER, dye.write.fbo);
            gl.viewport(0, 0, dye.width, dye.height);
            bindQuad(advectionProgram);

            gl.uniform2f(advectionProgram.uniforms.u_texelSize, dye.texelSizeX, dye.texelSizeY);
            gl.uniform1i(advectionProgram.uniforms.u_velocity, velocity.read.attach(0));
            gl.uniform1i(advectionProgram.uniforms.u_source, dye.read.attach(1));
            gl.uniform1f(advectionProgram.uniforms.u_dt, dt);
            gl.uniform1f(advectionProgram.uniforms.u_dissipation, config.densityDissipation);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            dye.swap();

            // Step 3: Compute Vorticity (Curl)
            gl.useProgram(curlProgram.program);
            gl.bindFramebuffer(gl.FRAMEBUFFER, curl.fbo);
            gl.viewport(0, 0, curl.width, curl.height);
            bindQuad(curlProgram);

            gl.uniform2f(curlProgram.uniforms.u_texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(curlProgram.uniforms.u_velocity, velocity.read.attach(0));
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            // Step 4: Apply Vorticity Confinement Force
            gl.useProgram(vorticityProgram.program);
            gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
            gl.viewport(0, 0, velocity.width, velocity.height);
            bindQuad(vorticityProgram);

            gl.uniform2f(vorticityProgram.uniforms.u_texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(vorticityProgram.uniforms.u_velocity, velocity.read.attach(0));
            gl.uniform1i(vorticityProgram.uniforms.u_curl, curl.attach(1));
            gl.uniform1f(vorticityProgram.uniforms.u_curlStrength, config.curlStrength);
            gl.uniform1f(vorticityProgram.uniforms.u_dt, dt);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            velocity.swap();

            // Step 5: Compute Divergence
            gl.useProgram(divergenceProgram.program);
            gl.bindFramebuffer(gl.FRAMEBUFFER, divergence.fbo);
            gl.viewport(0, 0, divergence.width, divergence.height);
            bindQuad(divergenceProgram);

            gl.uniform2f(divergenceProgram.uniforms.u_texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(divergenceProgram.uniforms.u_velocity, velocity.read.attach(0));
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            // Step 6: Clear Pressure Buffer
            gl.useProgram(clearProgram.program);
            gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.write.fbo);
            gl.viewport(0, 0, pressure.width, pressure.height);
            bindQuad(clearProgram);

            gl.uniform1i(clearProgram.uniforms.u_texture, pressure.read.attach(0));
            gl.uniform1f(clearProgram.uniforms.u_value, 0.8);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            pressure.swap();

            // Step 7: Jacobi Poisson Iteration (Pressure Solve)
            gl.useProgram(jacobiProgram.program);
            gl.viewport(0, 0, pressure.width, pressure.height);
            bindQuad(jacobiProgram);
            gl.uniform2f(jacobiProgram.uniforms.u_texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(jacobiProgram.uniforms.u_divergence, divergence.attach(1));

            for (let i = 0; i < config.pressureIterations; i++) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.write.fbo);
                gl.uniform1i(jacobiProgram.uniforms.u_pressure, pressure.read.attach(0));
                gl.drawArrays(gl.TRIANGLES, 0, 6);
                pressure.swap();
            }

            // Step 8: Gradient Subtraction (Projection)
            gl.useProgram(gradientSubtractProgram.program);
            gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
            gl.viewport(0, 0, velocity.width, velocity.height);
            bindQuad(gradientSubtractProgram);

            gl.uniform2f(gradientSubtractProgram.uniforms.u_texelSize, velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(gradientSubtractProgram.uniforms.u_pressure, pressure.read.attach(0));
            gl.uniform1i(gradientSubtractProgram.uniforms.u_velocity, velocity.read.attach(1));
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            velocity.swap();

            // Step 9: Tone-mapped Display Pass to Canvas Quad
            gl.useProgram(displayProgram.program);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            bindQuad(displayProgram);

            gl.uniform1i(displayProgram.uniforms.u_dye, dye.read.attach(0));
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            rafId = requestAnimationFrame(renderLoop);
        }

        // 14. Lifecycle Management
        function pause() {
            if (isPaused) return;
            isPaused = true;
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }

        function resume() {
            if (!isPaused || !isRunning) return;
            isPaused = false;
            // Crucial: reset lastTime to avoid massive dt jump on background resume
            lastTime = performance.now();
            rafId = requestAnimationFrame(renderLoop);
        }

        function onVisibilityChange() {
            if (document.hidden) {
                pause();
            } else {
                resume();
            }
        }

        function destroy() {
            pause();
            isRunning = false;

            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('touchmove', onPointerMove);
            window.removeEventListener('touchstart', onPointerDown);
            window.removeEventListener('touchend', onPointerUp);
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', onVisibilityChange);

            if (activeInstance === instance) {
                activeInstance = null;
            }
        }

        // 15. Attach Event Listeners
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerdown', onPointerDown, { passive: true });
        window.addEventListener('pointerup', onPointerUp, { passive: true });
        window.addEventListener('touchmove', onPointerMove, { passive: true });
        window.addEventListener('touchstart', onPointerDown, { passive: true });
        window.addEventListener('touchend', onPointerUp, { passive: true });
        window.addEventListener('resize', resize, { passive: true });
        document.addEventListener('visibilitychange', onVisibilityChange);

        // Initial setup and startup
        resize();
        rafId = requestAnimationFrame(renderLoop);

        const instance = {
            gl,
            canvas,
            get isPaused() { return isPaused; },
            get isRunning() { return isRunning; },
            config,
            splat,
            pause,
            resume,
            resize,
            destroy
        };

        activeInstance = instance;
        return instance;
    }

    /* ------------------------------------------------------------
       Window Global API Contract Export
       ------------------------------------------------------------ */

    window.initCursorFluidSim = function (config) {
        if (activeInstance) {
            activeInstance.destroy();
        }
        return createFluidSimulator(config);
    };

    window.pauseCursorFluidSim = function () {
        if (activeInstance) {
            activeInstance.pause();
        }
    };

    window.resumeCursorFluidSim = function () {
        if (activeInstance) {
            activeInstance.resume();
        }
    };

    window.getCursorFluidSimInstance = function () {
        return activeInstance;
    };

    window.destroyCursorFluidSim = function () {
        if (activeInstance) {
            activeInstance.destroy();
        }
    };

})(window, document);
