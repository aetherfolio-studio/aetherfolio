/* ============================================================
   AETHER CINEMATIC OS BOOTLOADER & SYNTHESIZER ENGINE (v4.0.9)
   Pure Web Audio API Synthesizer (Zero External Assets)
   Spline Paced Terminal Diagnostic Stream & Session Manager
   ============================================================ */

(function (window, document) {
    'use strict';

    const STATE_KEY = 'aether_bootloader_seen';
    const NOMINAL_DURATION = 2600; // 2.6 seconds total

    /* ============================================================
       1. WEB AUDIO API PROCEDURAL SYNTHESIZER (AetherBootSynth)
       ============================================================ */
    class AetherBootSynth {
        constructor() {
            this.ctx = null;
            this.masterGain = null;
            this.limiter = null;
            this.reverbNode = null;
            this.reverbGain = null;
            this.isUnlocked = false;

            this._initOnGesture = this._initOnGesture.bind(this);
            this._bindUserGestures();
        }

        /**
         * Lazy-initializes or returns the AudioContext singleton.
         */
        getContext() {
            if (!this.ctx) {
                const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtxClass) return null;
                this.ctx = new AudioCtxClass({ latencyHint: 'interactive' });
                this._setupMasterBus();
            }
            return this.ctx;
        }

        /**
         * Binds one-time user interaction listeners to unlock AudioContext.
         */
        _bindUserGestures() {
            const events = ['pointerdown', 'keydown', 'touchstart', 'click'];
            events.forEach(evt => {
                window.addEventListener(evt, this._initOnGesture, { capture: true, passive: true });
            });
        }

        async _initOnGesture() {
            await this.unlock();
            const events = ['pointerdown', 'keydown', 'touchstart', 'click'];
            events.forEach(evt => window.removeEventListener(evt, this._initOnGesture, { capture: true }));
        }

        /**
         * Safely unlocks or resumes the AudioContext.
         */
        async unlock() {
            try {
                const ctx = this.getContext();
                if (ctx && ctx.state === 'suspended') {
                    await ctx.resume();
                }
                if (ctx && ctx.state === 'running') {
                    this.isUnlocked = true;
                }
            } catch (err) {
                // Autoplay policy or user gesture restriction
            }
        }

        /**
         * Sets up Master Gain, Anti-Clipping DynamicsCompressor Limiter, and Procedural Reverb.
         */
        _setupMasterBus() {
            if (!this.ctx) return;

            // 1. Master Output Gain
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.80, this.ctx.currentTime);

            // 2. Anti-Clipping Dynamics Limiter (Transient containment)
            this.limiter = this.ctx.createDynamicsCompressor();
            this.limiter.threshold.setValueAtTime(-4.0, this.ctx.currentTime); // -4.0 dB
            this.limiter.knee.setValueAtTime(4.0, this.ctx.currentTime);        // 4.0 dB smooth knee
            this.limiter.ratio.setValueAtTime(16.0, this.ctx.currentTime);     // 16:1 Hard limiting
            this.limiter.attack.setValueAtTime(0.002, this.ctx.currentTime);   // 2ms fast attack
            this.limiter.release.setValueAtTime(0.12, this.ctx.currentTime);   // 120ms release

            // 3. Procedural Algorithmic Reverb (Impulse Response Synthesizer)
            this.reverbNode = this.ctx.createConvolver();
            this.reverbNode.buffer = this._generateImpulseResponse(1.8, 2.8);
            this.reverbGain = this.ctx.createGain();
            this.reverbGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

            // Connect Reverb Wet Bus
            this.reverbNode.connect(this.reverbGain);
            this.reverbGain.connect(this.masterGain);

            // Connect Master to Limiter and Destination
            this.masterGain.connect(this.limiter);
            this.limiter.connect(this.ctx.destination);
        }

        /**
         * Procedurally synthesizes a stereo impulse response buffer for ambient algorithmic reverb.
         * Zero external network assets required.
         */
        _generateImpulseResponse(durationSec, decayRate) {
            if (!this.ctx) return null;
            const sampleRate = this.ctx.sampleRate || 44100;
            const length = Math.floor(sampleRate * durationSec);
            const impulse = this.ctx.createBuffer(2, length, sampleRate);
            const left = impulse.getChannelData(0);
            const right = impulse.getChannelData(1);

            for (let i = 0; i < length; i++) {
                const progress = i / length;
                const envelope = Math.exp(-decayRate * progress);
                // High-frequency dampening simulation (air absorption)
                const damp = 1.0 - (progress * 0.4);
                left[i] = ((Math.random() * 2 - 1) * envelope * damp);
                right[i] = ((Math.random() * 2 - 1) * envelope * damp);
            }
            return impulse;
        }

        /**
         * Sound 1: High-Tech Terminal Diagnostic Pulse (1600Hz Micro-Blip)
         * @param {number} [customPitch] - Base frequency (defaults to ~1600Hz with random micro-jitter)
         */
        playDiagnosticPulse(customPitch) {
            const ctx = this.getContext();
            if (!ctx || ctx.state !== 'running') return;

            const now = ctx.currentTime;
            const baseFreq = customPitch || (1600 + (Math.random() * 70 - 35));

            // Primary Triangle Body Tone with micro-pitch ramp
            const osc = ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(baseFreq * 1.05, now);
            osc.frequency.exponentialRampToValueAtTime(Math.max(20, baseFreq * 0.95), now + 0.025);

            // Secondary Square Overtone (Digital Bite)
            const osc2 = ctx.createOscillator();
            osc2.type = 'square';
            osc2.frequency.setValueAtTime(baseFreq * 2.0, now);

            // Bandpass Filter (Q = 2.5)
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(baseFreq, now);
            filter.Q.setValueAtTime(2.5, now);

            // Pulse Gain Envelope (Fast snap attack, quick exponential decay)
            const gainNode = ctx.createGain();
            gainNode.gain.setValueAtTime(0.0001, now);
            gainNode.gain.exponentialRampToValueAtTime(0.15, now + 0.002);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

            const osc2Gain = ctx.createGain();
            osc2Gain.gain.setValueAtTime(0.02, now);

            // Routing
            osc.connect(gainNode);
            osc2.connect(osc2Gain);
            osc2Gain.connect(gainNode);
            gainNode.connect(filter);
            filter.connect(this.masterGain);

            // Playback & Automatic Node Disposal
            osc.start(now);
            osc2.start(now);
            osc.stop(now + 0.04);
            osc2.stop(now + 0.04);

            osc.onended = () => {
                try {
                    osc.disconnect();
                    osc2.disconnect();
                    osc2Gain.disconnect();
                    gainNode.disconnect();
                    filter.disconnect();
                } catch (e) {}
            };
        }

        /**
         * Sound 2: Sub-Bass Whoosh & Kinetic Frequency Sweep (90Hz -> 30Hz)
         */
        playSubBassWhoosh() {
            const ctx = this.getContext();
            if (!ctx || ctx.state !== 'running') return;

            const now = ctx.currentTime;

            // Sub-Bass Sine Wave Oscillator
            const subOsc = ctx.createOscillator();
            subOsc.type = 'sine';
            subOsc.frequency.setValueAtTime(90.0, now);
            subOsc.frequency.exponentialRampToValueAtTime(30.0, now + 0.65);

            // Sub-Harmonic Rumble Oscillator (Low triangle)
            const rumbleOsc = ctx.createOscillator();
            rumbleOsc.type = 'triangle';
            rumbleOsc.frequency.setValueAtTime(45.0, now);
            rumbleOsc.frequency.exponentialRampToValueAtTime(15.0, now + 0.65);

            // Dynamic Resonant Lowpass Filter (150Hz -> 40Hz, Q = 3.0)
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(150.0, now);
            filter.frequency.exponentialRampToValueAtTime(40.0, now + 0.70);
            filter.Q.setValueAtTime(3.0, now);

            // Amplitude Envelope (Click-free linear swell and exponential tail)
            const subGain = ctx.createGain();
            subGain.gain.setValueAtTime(0.0001, now);
            subGain.gain.linearRampToValueAtTime(0.38, now + 0.06);
            subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

            const rumbleGain = ctx.createGain();
            rumbleGain.gain.setValueAtTime(0.10, now);

            // Routing
            subOsc.connect(subGain);
            rumbleOsc.connect(rumbleGain);
            rumbleGain.connect(subGain);
            subGain.connect(filter);
            filter.connect(this.masterGain);

            // Playback & Automatic Node Disposal
            subOsc.start(now);
            rumbleOsc.start(now);
            subOsc.stop(now + 0.80);
            rumbleOsc.stop(now + 0.80);

            subOsc.onended = () => {
                try {
                    subOsc.disconnect();
                    rumbleOsc.disconnect();
                    rumbleGain.disconnect();
                    subGain.disconnect();
                    filter.disconnect();
                } catch (e) {}
            };
        }

        /**
         * Sound 3: Shimmering Dmaj9 Completion Chord Chime
         * Frequencies: D4 (293.66Hz), F#4 (369.99Hz), A4 (440.00Hz), C#5 (554.37Hz), E5 (659.25Hz)
         * Chorusing detune (+4.8 cents), stereo panning, highpass shimmer layer [D6, A6], and reverb send.
         */
        playCompletionChord() {
            const ctx = this.getContext();
            if (!ctx || ctx.state !== 'running') return;

            const now = ctx.currentTime;

            // Dmaj9 5-Voice Chord Definition
            const chordVoices = [
                { note: 'D4',  freq: 293.66, pan:  0.00, gain: 0.16 },
                { note: 'F#4', freq: 369.99, pan: -0.25, gain: 0.13 },
                { note: 'A4',  freq: 440.00, pan:  0.25, gain: 0.13 },
                { note: 'C#5', freq: 554.37, pan: -0.50, gain: 0.11 },
                { note: 'E5',  freq: 659.25, pan:  0.50, gain: 0.11 }
            ];

            chordVoices.forEach(voice => {
                // Voice Primary Tone (Sine)
                const oscPrimary = ctx.createOscillator();
                oscPrimary.type = 'sine';
                oscPrimary.frequency.setValueAtTime(voice.freq, now);

                // Voice Detune Shimmer (Triangle, +4.8 cents detune)
                const oscChorus = ctx.createOscillator();
                oscChorus.type = 'triangle';
                oscChorus.frequency.setValueAtTime(voice.freq * 1.0028, now);

                const chorusGain = ctx.createGain();
                chorusGain.gain.setValueAtTime(0.32, now);

                // Per-Voice Gain Envelope
                const voiceGain = ctx.createGain();
                voiceGain.gain.setValueAtTime(0.0001, now);
                voiceGain.gain.linearRampToValueAtTime(voice.gain, now + 0.035);
                voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

                // Stereo Panner (if supported)
                let panner = null;
                if (typeof ctx.createStereoPanner === 'function') {
                    panner = ctx.createStereoPanner();
                    panner.pan.setValueAtTime(voice.pan, now);
                }

                // Route Voice Nodes
                oscPrimary.connect(voiceGain);
                oscChorus.connect(chorusGain);
                chorusGain.connect(voiceGain);

                if (panner) {
                    voiceGain.connect(panner);
                    panner.connect(this.masterGain);
                    if (this.reverbNode) panner.connect(this.reverbNode);
                } else {
                    voiceGain.connect(this.masterGain);
                    if (this.reverbNode) voiceGain.connect(this.reverbNode);
                }

                // Playback & Automatic Node Disposal
                oscPrimary.start(now);
                oscChorus.start(now);
                oscPrimary.stop(now + 2.5);
                oscChorus.stop(now + 2.5);

                oscPrimary.onended = () => {
                    try {
                        oscPrimary.disconnect();
                        oscChorus.disconnect();
                        chorusGain.disconnect();
                        voiceGain.disconnect();
                        if (panner) panner.disconnect();
                    } catch (e) {}
                };
            });

            // Harmonized Upper Shimmer Layer (D6: 1174.66Hz, A6: 1760.00Hz)
            const shimmerFreqs = [1174.66, 1760.00];
            shimmerFreqs.forEach(freq => {
                const shimOsc = ctx.createOscillator();
                shimOsc.type = 'sine';
                shimOsc.frequency.setValueAtTime(freq, now);

                const shimFilter = ctx.createBiquadFilter();
                shimFilter.type = 'highpass';
                shimFilter.frequency.setValueAtTime(1100, now);

                const shimGain = ctx.createGain();
                shimGain.gain.setValueAtTime(0.0001, now);
                shimGain.gain.linearRampToValueAtTime(0.035, now + 0.02);
                shimGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

                shimOsc.connect(shimFilter);
                shimFilter.connect(shimGain);
                shimGain.connect(this.masterGain);
                if (this.reverbNode) shimGain.connect(this.reverbNode);

                shimOsc.start(now);
                shimOsc.stop(now + 1.7);

                shimOsc.onended = () => {
                    try {
                        shimOsc.disconnect();
                        shimFilter.disconnect();
                        shimGain.disconnect();
                    } catch (e) {}
                };
            });
        }

        /**
         * Clean teardown and node disposal.
         */
        destroy() {
            if (this.ctx && this.ctx.state !== 'closed') {
                this.ctx.close().catch(() => {});
            }
            this.ctx = null;
            this.masterGain = null;
            this.limiter = null;
            this.reverbNode = null;
            this.reverbGain = null;
            this.isUnlocked = false;
        }
    }

    /* ============================================================
       2. PACING KEYFRAMES & DIAGNOSTIC TELEMETRY LOGS
       ============================================================ */

    // Piecewise Spline Pacing Milestones: [time_ms, percent]
    const PACING_KEYFRAMES = [
        [0, 0],
        [260, 18],
        [580, 24],
        [1120, 62],
        [1580, 71],
        [2080, 91],
        [2420, 99],
        [2600, 100]
    ];

    // Cyberpunk Diagnostic Telemetry Logs mapped to portfolio engines
    const DIAGNOSTIC_LOGS = [
        { pct: 0,   tag: 'SYS_INIT',   text: 'AETHER_OS v4.0.9 (x86_64-quantum) INITIALIZING...', status: 'BOOT' },
        { pct: 18,  tag: 'MEM_ALLOC',  text: 'ALLOCATING WEAPONIZED GLSL MEMORY BUFFERS...',       status: 'OK' },
        { pct: 24,  tag: 'GPU_PIPE',   text: 'MOUNTING WEBGL2 RAY-REFRACTION PIPELINES...',        status: 'MOUNTED' },
        { pct: 62,  tag: 'FLUID_SIM',  text: 'CALIBRATING NAVIER-STOKES PRESSURE SOLVER (60 FPS)...', status: 'OPTIMAL' },
        { pct: 71,  tag: 'PHYSICS',    text: 'WARMING MATTER.JS 2D RIGID BODY ENGINE...',          status: 'BOUNDS_SET' },
        { pct: 91,  tag: 'AUDIO_CORE', text: 'INITIALIZING WEB AUDIO OSCILLATORS & REVERB BUS...', status: 'ARMED' },
        { pct: 99,  tag: 'NET_LINK',   text: 'SYNCHRONIZING SECURE CLIENT RUNTIME...',             status: 'CONNECTED' },
        { pct: 100, tag: 'READY',      text: 'BOOT_SEQUENCE_COMPLETE -> ENTERING AETHER',          status: 'ONLINE' }
    ];

    /* ============================================================
       3. BOOTLOADER ORCHESTRATION ENGINE (AetherBootloader)
       ============================================================ */
    class AetherBootloader {
        constructor(options = {}) {
            this.duration = options.duration || NOMINAL_DURATION;
            this.force = options.force || false;
            this.onComplete = options.onComplete || null;

            this.overlay = document.getElementById('aether-bootloader');
            this.progressBar = document.getElementById('bootloader-progress-bar');
            this.progressText = document.getElementById('bootloader-percentage') || document.getElementById('bootloader-progress-text');
            this.terminal = document.getElementById('bootloader-logs') || document.getElementById('bootloader-terminal');
            this.skipBtn = document.getElementById('bootloader-skip-btn');
            this.mainBody = document.getElementById('mainBody') || document.body;

            this.startTime = null;
            this.rafId = null;
            this.isCompleted = false;
            this.emittedLogs = new Set();
            this.synth = new AetherBootSynth();

            this._handleKeyDown = this._handleKeyDown.bind(this);
            this._handleClick = this._handleClick.bind(this);
            this._tick = this._tick.bind(this);
        }

        /**
         * Checks session storage safely.
         */
        hasBeenSeen() {
            try {
                return sessionStorage.getItem(STATE_KEY) === 'true';
            } catch (e) {
                return false;
            }
        }

        markSeen() {
            try {
                sessionStorage.setItem(STATE_KEY, 'true');
            } catch (e) {}
        }

        /**
         * Entry point initialization.
         */
        init() {
            if (!this.overlay) {
                this._revealMainUI();
                return;
            }

            // Zero-flicker fast path for return navigations
            if (this.hasBeenSeen() && !this.force) {
                this.overlay.style.display = 'none';
                this.overlay.setAttribute('aria-hidden', 'true');
                this._revealMainUI();
                window.dispatchEvent(new CustomEvent('aether:bootloader_complete', { detail: { skipped: true, fastPath: true } }));
                return;
            }

            // Check reduced motion
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.duration = 400;
            }

            this._bindEvents();
            this.overlay.style.display = 'flex';
            this.overlay.style.opacity = '1';

            // Sub-bass sweep at sequence kickoff
            if (this.synth) {
                this.synth.playSubBassWhoosh();
            }

            this.startTime = performance.now();
            this.rafId = requestAnimationFrame(this._tick);
        }

        _bindEvents() {
            window.addEventListener('keydown', this._handleKeyDown, { capture: true });
            this.overlay.addEventListener('pointerdown', this._handleClick);
            if (this.skipBtn) {
                this.skipBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.skip();
                });
            }
        }

        _unbindEvents() {
            window.removeEventListener('keydown', this._handleKeyDown, { capture: true });
            if (this.overlay) {
                this.overlay.removeEventListener('pointerdown', this._handleClick);
            }
        }

        _handleKeyDown(e) {
            if (e.key === 'Escape' || e.code === 'Escape') {
                e.preventDefault();
                this.skip();
            }
        }

        _handleClick(e) {
            // Clicking anywhere on the bootloader skips
            this.skip();
        }

        /**
         * Cubic Hermite spline interpolation across pacing keyframes.
         */
        _calculateProgress(elapsedMs) {
            const t = Math.min(Math.max(elapsedMs, 0), this.duration);
            const normTime = (t / this.duration) * NOMINAL_DURATION;

            // Find keyframe interval
            let i = 0;
            while (i < PACING_KEYFRAMES.length - 1 && PACING_KEYFRAMES[i + 1][0] < normTime) {
                i++;
            }

            if (i >= PACING_KEYFRAMES.length - 1) return 100;

            const [t0, p0] = PACING_KEYFRAMES[i];
            const [t1, p1] = PACING_KEYFRAMES[i + 1];

            const segmentProgress = (normTime - t0) / (t1 - t0);
            // Smoothstep Hermite easing: 3t^2 - 2t^3
            const eased = segmentProgress * segmentProgress * (3 - 2 * segmentProgress);
            return p0 + (p1 - p0) * eased;
        }

        _tick(currentTime) {
            if (this.isCompleted) return;

            const elapsed = currentTime - this.startTime;
            const progress = this._calculateProgress(elapsed);

            this._updateUI(progress, elapsed);
            this._checkDiagnosticLogs(progress, elapsed);

            if (elapsed >= this.duration || progress >= 100) {
                this._complete();
            } else {
                this.rafId = requestAnimationFrame(this._tick);
            }
        }

        _updateUI(progress, elapsed) {
            const pctInt = Math.min(100, Math.floor(progress));
            const paddedPct = `${pctInt}%`;

            if (this.progressBar) {
                this.progressBar.style.width = `${progress.toFixed(1)}%`;
            }
            if (this.progressText) {
                this.progressText.textContent = paddedPct;
            }
        }

        _checkDiagnosticLogs(progress, elapsed) {
            if (!this.terminal) return;

            DIAGNOSTIC_LOGS.forEach((log, idx) => {
                if (progress >= log.pct && !this.emittedLogs.has(idx)) {
                    this.emittedLogs.add(idx);
                    this._appendLogLine(log, elapsed);
                    if (this.synth) {
                        this.synth.playDiagnosticPulse();
                    }
                }
            });
        }

        _appendLogLine(log, elapsed) {
            if (!this.terminal) return;

            const timeStr = (elapsed / 1000).toFixed(3);
            const line = document.createElement('div');
            line.className = 'bootloader-log-line flex items-center justify-between text-xs font-mono py-0.5 tracking-wider';
            line.innerHTML = `
                <div class="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    <span class="text-on-surface-variant/40">[${timeStr}s]</span>
                    <span class="text-secondary font-bold">[${log.tag}]</span>
                    <span class="text-on-surface">${log.text}</span>
                </div>
                <span class="text-primary font-semibold ml-3 flex-shrink-0">[${log.status}]</span>
            `;

            this.terminal.appendChild(line);
            this.terminal.scrollTop = this.terminal.scrollHeight;
        }

        /**
         * User skip handler (ESC / Click).
         */
        skip() {
            if (this.isCompleted) return;

            if (this.synth) {
                this.synth.unlock().then(() => {
                    this.synth.playCompletionChord();
                }).catch(() => {});
            }

            if (this.terminal && !this.emittedLogs.has('skip')) {
                this.emittedLogs.add('skip');
                const line = document.createElement('div');
                line.className = 'bootloader-log-line flex items-center justify-between text-xs font-mono py-0.5 tracking-wider text-primary font-bold';
                line.innerHTML = `
                    <div class="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                        <span class="text-primary">[SYS_OVERRIDE] OPERATOR BYPASS TRIGGERED -> SYSTEM ARMED</span>
                    </div>
                    <span class="text-primary font-semibold ml-3 flex-shrink-0">[BYPASS]</span>
                `;
                this.terminal.appendChild(line);
                this.terminal.scrollTop = this.terminal.scrollHeight;
            }

            this._complete(true);
        }

        _complete(skipped = false) {
            if (this.isCompleted) return;
            this.isCompleted = true;

            if (this.rafId) {
                cancelAnimationFrame(this.rafId);
                this.rafId = null;
            }

            this._unbindEvents();
            this.markSeen();

            // Instant 100% UI update
            if (this.progressBar) this.progressBar.style.width = '100%';
            if (this.progressText) this.progressText.textContent = '100%';

            // Play resolution chime if not skipped (if skipped, played on skip trigger)
            if (!skipped && this.synth) {
                this.synth.playCompletionChord();
            }

            // Trigger Smooth Exit Reveal
            this._exitTransition(skipped);
        }

        _exitTransition(skipped) {
            if (!this.overlay) {
                this._revealMainUI();
                return;
            }

            this.overlay.classList.add('bootloader-exit');
            this.overlay.classList.add('bootloader-hidden');
            this.overlay.style.pointerEvents = 'none';

            this._revealMainUI();

            setTimeout(() => {
                if (this.overlay && this.overlay.parentNode) {
                    this.overlay.style.display = 'none';
                }
                if (typeof this.onComplete === 'function') {
                    this.onComplete({ skipped });
                }
                window.dispatchEvent(new CustomEvent('aether:bootloader_complete', { detail: { skipped } }));
            }, 750);
        }

        _revealMainUI() {
            if (this.mainBody) {
                this.mainBody.style.opacity = '1';
            }
        }
    }

    /* ============================================================
       4. GLOBAL EXPORTS & LIFECYCLE AUTO-BOOTSTRAP
       ============================================================ */
    window.AetherBootSynth = AetherBootSynth;
    window.AetherBootloader = AetherBootloader;

    window.initAetherBootloader = function (options) {
        if (!window.__aetherBootloaderInstance) {
            window.__aetherBootloaderInstance = new AetherBootloader(options);
        }
        window.__aetherBootloaderInstance.init();
        return window.__aetherBootloaderInstance;
    };

    window.skipAetherBootloader = function () {
        if (window.__aetherBootloaderInstance) {
            window.__aetherBootloaderInstance.skip();
        }
    };

    window.resetAetherBootloader = function () {
        try {
            sessionStorage.removeItem(STATE_KEY);
        } catch (e) {}
        window.location.reload();
    };

    // Auto-bootstrap on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.initAetherBootloader());
    } else {
        window.initAetherBootloader();
    }

})(window, document);
