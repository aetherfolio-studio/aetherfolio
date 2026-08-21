/* ============================================================
   AETHER LIQUID GLSL PROJECT CARD SHADER ENGINE (v3.0.0)
   High-performance WebGL Fluid Refraction & Chromatic Aberration
   Zero External Dependencies | 60 FPS Viewport Lifecycle
   ============================================================ */

(function (window, document) {
    'use strict';

    // Vertex Shader Source (Standard NDC [-1, 1] Quad)
    const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

    // Fragment Shader Source (7 Uniforms, Aspect Cover, Liquid Wave & 0.015 RGB Aberration)
    const FRAGMENT_SHADER_SOURCE = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_texture;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_hover;
uniform vec2 u_resolution;
uniform vec2 u_image_res;
uniform float u_rgb_shift;

varying vec2 v_uv;

// Mathematical Cover Aspect Ratio UV Projection (Zero Distortion)
vec2 getCoverUV(vec2 uv, vec2 s, vec2 i) {
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    return rs < ri ? 
        vec2(uv.x * s.x / (s.y * ri) + (1.0 - s.x / (s.y * ri)) * 0.5, uv.y) : 
        vec2(uv.x, uv.y * s.y / (s.x / ri) + (1.0 - s.y / (s.x / ri)) * 0.5);
}

void main() {
    vec2 s = u_resolution;
    vec2 imgRes = u_image_res;
    
    // 1. Cover Aspect Ratio UV Coordinates
    vec2 coverUV = getCoverUV(v_uv, s, imgRes);
    
    // 2. Aspect-corrected circular distance to pointer
    vec2 aspectVec = vec2(s.x / s.y, 1.0);
    vec2 toMouse = (v_uv - u_mouse) * aspectVec;
    float dist = length(toMouse);
    
    // Normalized wave propagation direction vector in UV space
    vec2 dir = dist > 0.0001 ? (normalize(toMouse) / aspectVec) : vec2(0.0, 1.0);
    
    // 3. Dual-harmonic liquid wave refraction
    float wave1 = sin(dist * 24.0 - u_time * 4.0);
    float wave2 = sin(dist * 42.0 - u_time * 5.5) * 0.35;
    float wave = wave1 + wave2;
    
    // Exponential distance decay
    float decay = exp(-dist * 3.8);
    
    // Ambient fluid current
    float ambient = sin(v_uv.x * 5.0 + u_time * 1.0) * cos(v_uv.y * 5.0 + u_time * 0.8) * 0.06;
    
    // Combined displacement
    float displacementMag = (wave * decay * 0.03 + ambient * 0.01) * u_hover;
    vec2 displacement = dir * displacementMag;
    
    // 4. Chromatic Aberration (0.015 RGB Split along wave normal)
    float shift = u_rgb_shift * u_hover * (decay * 0.8 + 0.2);
    vec2 rOffset = dir * shift;
    vec2 bOffset = -dir * shift;
    
    vec2 uvR = clamp(coverUV + displacement + rOffset, 0.0, 1.0);
    vec2 uvG = clamp(coverUV + displacement, 0.0, 1.0);
    vec2 uvB = clamp(coverUV + displacement + bOffset, 0.0, 1.0);
    
    float r = texture2D(u_texture, uvR).r;
    float g = texture2D(u_texture, uvG).g;
    float b = texture2D(u_texture, uvB).b;
    float a = texture2D(u_texture, uvG).a;
    
    vec3 color = vec3(r, g, b);
    
    // 5. Specular liquid highlight along wave crests (warm coral sheen)
    float crest = max(0.0, wave * decay);
    float highlight = pow(crest, 3.0) * 0.25 * u_hover;
    vec3 specularColor = vec3(1.0, 0.85, 0.78);
    color += highlight * specularColor;
    
    // 6. Subtle edge vignette for dark aesthetic integration
    vec2 vigUV = v_uv * (1.0 - v_uv.yx);
    float vig = vigUV.x * vigUV.y * 15.0;
    vig = clamp(pow(vig, 0.2), 0.0, 1.0);
    color *= (vig * 0.15 + 0.85);
    
    gl_FragColor = vec4(color, a);
}
`;

    /**
     * Helper to compile a WebGL shader.
     */
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const info = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error(`[CardShaders] Shader compile failed: ${info}`);
        }
        return shader;
    }

    /**
     * Helper to link a WebGL program.
     */
    function createProgram(gl, vsSource, fsSource) {
        const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
        const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw new Error(`[CardShaders] Program link failed: ${info}`);
        }
        return program;
    }

    /**
     * CardShaderInstance
     * Manages WebGL context, shaders, textures, and RAF render loop for a single .glsl-card.
     */
    class CardShaderInstance {
        constructor(cardElement) {
            this.card = cardElement;
            this.imageUrl = this.card.dataset.projectImage || '';
            this.canvas = null;
            this.gl = null;
            this.program = null;
            this.quadBuffer = null;
            this.texture = null;
            this.uniforms = {};

            this.imageRes = [1920, 1080];
            this.imageLoaded = false;
            this.dpr = Math.min(window.devicePixelRatio || 1, 2);

            this.isHovered = false;
            this.isVisible = false;
            this.isTabVisible = !document.hidden;
            this.isContextLost = false;
            this.isDestroyed = false;

            this.targetHover = 0.0;
            this.hover = 0.0;
            this.targetMouse = [0.5, 0.5];
            this.mouse = [0.5, 0.5];

            this.startTime = performance.now();
            this.lastTime = performance.now();
            this.rafId = null;

            this._onMouseMove = this._onMouseMove.bind(this);
            this._onMouseEnter = this._onMouseEnter.bind(this);
            this._onMouseLeave = this._onMouseLeave.bind(this);
            this._onTouchMove = this._onTouchMove.bind(this);
            this._onTouchEnd = this._onTouchEnd.bind(this);
            this._onContextLost = this._onContextLost.bind(this);
            this._onContextRestored = this._onContextRestored.bind(this);
            this._onResize = this._onResize.bind(this);
            this._renderLoop = this._renderLoop.bind(this);

            this.init();
        }

        init() {
            try {
                this._setupCanvas();
                this._initGL();
                this._setupEventListeners();
                this._setupResizeObserver();
                this.loadImage(this.imageUrl);
            } catch (err) {
                console.warn('[CardShaders] Failed to initialize WebGL card shader:', err);
                this._handleFallback();
            }
        }

        _setupCanvas() {
            let canvas = this.card.querySelector('canvas.glsl-card-canvas');
            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.className = 'glsl-card-canvas absolute inset-0 w-full h-full pointer-events-none z-0';
                this.card.insertBefore(canvas, this.card.firstChild);
            }
            this.canvas = canvas;
        }

        _initGL() {
            if (!this.canvas) return;

            const gl = this.canvas.getContext('webgl', {
                alpha: true,
                depth: false,
                stencil: false,
                antialias: false,
                premultipliedAlpha: false,
                powerPreference: 'high-performance',
                preserveDrawingBuffer: false
            }) || this.canvas.getContext('experimental-webgl');

            if (!gl) {
                throw new Error('WebGL not supported');
            }
            this.gl = gl;

            // Compile shaders & create program
            this.program = createProgram(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
            gl.useProgram(this.program);

            // Cache uniform locations (all 7 required uniforms)
            this.uniforms = {
                u_texture: gl.getUniformLocation(this.program, 'u_texture'),
                u_time: gl.getUniformLocation(this.program, 'u_time'),
                u_mouse: gl.getUniformLocation(this.program, 'u_mouse'),
                u_hover: gl.getUniformLocation(this.program, 'u_hover'),
                u_resolution: gl.getUniformLocation(this.program, 'u_resolution'),
                u_image_res: gl.getUniformLocation(this.program, 'u_image_res'),
                u_rgb_shift: gl.getUniformLocation(this.program, 'u_rgb_shift')
            };

            // Setup fullscreen quad buffer [-1, 1]
            this.quadBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                -1.0, -1.0,
                 1.0, -1.0,
                -1.0,  1.0,
                 1.0,  1.0
            ]), gl.STATIC_DRAW);

            const posAttr = gl.getAttribLocation(this.program, 'a_position');
            gl.enableVertexAttribArray(posAttr);
            gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

            // Setup placeholder texture (1x1 dark slate pixel)
            this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([2, 11, 18, 255]));

            // Configure NPOT-safe texture parameters
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            this.resize();
        }

        loadImage(url) {
            if (!url) return;
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                if (this.isDestroyed || this.isContextLost || !this.gl) return;
                this.imageRes = [img.naturalWidth || 1920, img.naturalHeight || 1080];
                this.imageLoaded = true;

                const gl = this.gl;
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

                if (this.isVisible) {
                    this.draw(performance.now());
                }
            };
            img.onerror = () => {
                console.warn(`[CardShaders] Failed to load texture: ${url}. Retaining fallback.`);
                this._handleFallback();
            };
            img.src = url;
        }

        _setupEventListeners() {
            this.card.addEventListener('mousemove', this._onMouseMove, { passive: true });
            this.card.addEventListener('mouseenter', this._onMouseEnter, { passive: true });
            this.card.addEventListener('mouseleave', this._onMouseLeave, { passive: true });
            this.card.addEventListener('touchmove', this._onTouchMove, { passive: true });
            this.card.addEventListener('touchend', this._onTouchEnd, { passive: true });

            if (this.canvas) {
                this.canvas.addEventListener('webglcontextlost', this._onContextLost, false);
                this.canvas.addEventListener('webglcontextrestored', this._onContextRestored, false);
            }
        }

        _setupResizeObserver() {
            if (typeof ResizeObserver !== 'undefined') {
                this.resizeObserver = new ResizeObserver(() => this.resize());
                this.resizeObserver.observe(this.card);
            } else {
                window.addEventListener('resize', this._onResize, { passive: true });
            }
        }

        _onMouseMove(e) {
            const rect = this.card.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                const nx = (e.clientX - rect.left) / rect.width;
                const ny = 1.0 - ((e.clientY - rect.top) / rect.height);
                this.targetMouse[0] = Math.min(Math.max(nx, 0.0), 1.0);
                this.targetMouse[1] = Math.min(Math.max(ny, 0.0), 1.0);
            }
        }

        _onMouseEnter(e) {
            this.isHovered = true;
            this.targetHover = 1.0;
            this._onMouseMove(e);
            this.startLoop();
        }

        _onMouseLeave() {
            this.isHovered = false;
            this.targetHover = 0.0;
        }

        _onTouchMove(e) {
            if (e.touches && e.touches.length > 0) {
                const touch = e.touches[0];
                const rect = this.card.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    const nx = (touch.clientX - rect.left) / rect.width;
                    const ny = 1.0 - ((touch.clientY - rect.top) / rect.height);
                    this.targetMouse[0] = Math.min(Math.max(nx, 0.0), 1.0);
                    this.targetMouse[1] = Math.min(Math.max(ny, 0.0), 1.0);
                    this.targetHover = 1.0;
                    this.isHovered = true;
                    this.startLoop();
                }
            }
        }

        _onTouchEnd() {
            this.isHovered = false;
            this.targetHover = 0.0;
        }

        _onContextLost(e) {
            e.preventDefault();
            this.isContextLost = true;
            this.stopLoop();
            console.warn('[CardShaders] WebGL context lost.');
        }

        _onContextRestored() {
            console.info('[CardShaders] WebGL context restored.');
            this.isContextLost = false;
            try {
                this._initGL();
                this.loadImage(this.imageUrl);
                if (this.isVisible && (this.isHovered || this.hover > 0.0)) {
                    this.startLoop();
                }
            } catch (e) {
                console.error('[CardShaders] Failed to restore WebGL context:', e);
            }
        }

        _onResize() {
            this.resize();
        }

        resize() {
            if (!this.canvas || !this.gl || this.isContextLost) return;
            const rect = this.card.getBoundingClientRect();
            const w = Math.floor(rect.width * this.dpr);
            const h = Math.floor(rect.height * this.dpr);

            if (w > 0 && h > 0 && (this.canvas.width !== w || this.canvas.height !== h)) {
                this.canvas.width = w;
                this.canvas.height = h;
                this.gl.viewport(0, 0, w, h);
                if (this.isVisible) {
                    this.draw(performance.now());
                }
            }
        }

        setVisible(visible) {
            this.isVisible = visible;
            if (visible) {
                this.resize();
                if (this.isHovered || this.hover > 0.0) {
                    this.startLoop();
                } else {
                    this.draw(performance.now());
                }
            } else {
                this.stopLoop();
            }
        }

        setTabVisible(visible) {
            this.isTabVisible = visible;
            if (visible && this.isVisible && (this.isHovered || this.hover > 0.0)) {
                this.lastTime = performance.now();
                this.startLoop();
            } else if (!visible) {
                this.stopLoop();
            }
        }

        startLoop() {
            if (this.rafId !== null || !this.isVisible || !this.isTabVisible || this.isContextLost) return;
            this.lastTime = performance.now();
            this.rafId = requestAnimationFrame(this._renderLoop);
        }

        stopLoop() {
            if (this.rafId !== null) {
                cancelAnimationFrame(this.rafId);
                this.rafId = null;
            }
        }

        _renderLoop(now) {
            this.rafId = null;
            if (!this.isVisible || !this.isTabVisible || this.isContextLost || this.isDestroyed) return;

            const dt = Math.min((now - this.lastTime) * 0.001, 0.1);
            this.lastTime = now;

            // Frame-rate independent dual-exponential decay lerp
            const hoverFactor = 1.0 - Math.exp(-7.0 * dt);
            const mouseFactor = 1.0 - Math.exp(-8.0 * dt);

            this.hover += (this.targetHover - this.hover) * hoverFactor;
            this.mouse[0] += (this.targetMouse[0] - this.mouse[0]) * mouseFactor;
            this.mouse[1] += (this.targetMouse[1] - this.mouse[1]) * mouseFactor;

            // Sleep condition when idle
            if (!this.isHovered && this.hover < 0.0005) {
                this.hover = 0.0;
                this.draw(now);
                return; // Stop RAF loop to conserve 100% GPU/CPU
            }

            this.draw(now);
            this.rafId = requestAnimationFrame(this._renderLoop);
        }

        draw(now) {
            const gl = this.gl;
            if (!gl || this.isContextLost || this.canvas.width === 0 || this.canvas.height === 0) return;

            const elapsed = (now - this.startTime) * 0.001;

            gl.useProgram(this.program);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(this.uniforms.u_texture, 0);

            gl.uniform1f(this.uniforms.u_time, elapsed);
            gl.uniform2f(this.uniforms.u_mouse, this.mouse[0], this.mouse[1]);
            gl.uniform1f(this.uniforms.u_hover, this.hover);
            gl.uniform2f(this.uniforms.u_resolution, this.canvas.width, this.canvas.height);
            gl.uniform2f(this.uniforms.u_image_res, this.imageRes[0], this.imageRes[1]);
            gl.uniform1f(this.uniforms.u_rgb_shift, 0.015);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }

        _handleFallback() {
            this.card.classList.add('glsl-fallback');
            if (this.canvas) {
                this.canvas.style.display = 'none';
            }
        }

        destroy() {
            this.isDestroyed = true;
            this.stopLoop();

            this.card.removeEventListener('mousemove', this._onMouseMove);
            this.card.removeEventListener('mouseenter', this._onMouseEnter);
            this.card.removeEventListener('mouseleave', this._onMouseLeave);
            this.card.removeEventListener('touchmove', this._onTouchMove);
            this.card.removeEventListener('touchend', this._onTouchEnd);

            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
                this.resizeObserver = null;
            } else {
                window.removeEventListener('resize', this._onResize);
            }

            if (this.gl) {
                if (this.texture) this.gl.deleteTexture(this.texture);
                if (this.quadBuffer) this.gl.deleteBuffer(this.quadBuffer);
                if (this.program) this.gl.deleteProgram(this.program);
                this.gl = null;
            }
        }
    }

    /**
     * CardShaderManager (Singleton)
     * Manages all card shader instances with IntersectionObserver and Tab Visibility.
     */
    class CardShaderManager {
        constructor() {
            this.instances = new Map();
            this.observer = null;
            this._setupObserver();
            this._setupVisibilityListener();
        }

        _setupObserver() {
            if (typeof IntersectionObserver !== 'undefined') {
                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const instance = this.instances.get(entry.target);
                        if (instance) {
                            instance.setVisible(entry.isIntersecting);
                        }
                    });
                }, {
                    root: null,
                    rootMargin: '100px 0px 100px 0px',
                    threshold: 0.01
                });
            }
        }

        _setupVisibilityListener() {
            document.addEventListener('visibilitychange', () => {
                const isTabActive = !document.hidden;
                this.instances.forEach(instance => {
                    instance.setTabVisible(isTabActive);
                });
            });
        }

        register(cardEl) {
            if (!cardEl || this.instances.has(cardEl)) return;
            const instance = new CardShaderInstance(cardEl);
            this.instances.set(cardEl, instance);
            if (this.observer) {
                this.observer.observe(cardEl);
            } else {
                instance.setVisible(true);
            }
        }

        initAll() {
            const cards = document.querySelectorAll('.glsl-card, [data-project-image]');
            cards.forEach(card => this.register(card));
        }

        destroy() {
            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }
            this.instances.forEach(instance => instance.destroy());
            this.instances.clear();
        }
    }

    // Global Instance & Public APIs
    window.CardShaderInstance = CardShaderInstance;
    window.CardShaderManager = CardShaderManager;

    window.initCardShaders = function () {
        if (!window.__aetherCardShaderManager) {
            window.__aetherCardShaderManager = new CardShaderManager();
        }
        window.__aetherCardShaderManager.initAll();
        return window.__aetherCardShaderManager;
    };

    // Auto-bootstrap on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.initCardShaders());
    } else {
        window.initCardShaders();
    }

})(window, document);
