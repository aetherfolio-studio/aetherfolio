// supabase-auth.js — Bulletproof Supabase Auth for Aether

(function() {
    'use strict';

    // ── Helpers ──────────────────────────────────────────────────
    function revealBody() {
        if (document.body) {
            document.body.style.opacity = '1';
        } else {
            // Body doesn't exist yet (script in <head>), wait for it
            document.addEventListener('DOMContentLoaded', function() {
                document.body.style.opacity = '1';
            });
        }
    }

    function getPath() {
        return window.location.pathname;
    }

    function isProtectedPage() {
        var p = getPath();
        return p.includes('settings');
    }

    function isAuthPage() {
        var p = getPath();
        return p.includes('login') || p.includes('signup');
    }

    function redirectToSignup() {
        window.location.href = 'signup.html';
    }

    // ── Safety net: reveal body after 1.5 seconds no matter what ──
    var safetyTimer = setTimeout(function() {
        console.warn('[Aether Auth] Safety timeout reached. Forcing page reveal.');
        revealBody();
    }, 1500);

    function clearSafety() {
        if (safetyTimer) {
            clearTimeout(safetyTimer);
            safetyTimer = null;
        }
    }

    // ── Initialize Supabase Client ──────────────────────────────
    var supabaseUrl, supabaseKey, sb;

    try {
        supabaseUrl = (typeof AETHER_CONFIG !== 'undefined' && AETHER_CONFIG.supabase_url)
            ? AETHER_CONFIG.supabase_url
            : null;
        supabaseKey = (typeof AETHER_CONFIG !== 'undefined' && AETHER_CONFIG.supabase_anon_key)
            ? AETHER_CONFIG.supabase_anon_key
            : null;
    } catch (e) {
        console.error('[Aether Auth] Failed to read config:', e);
        supabaseUrl = null;
        supabaseKey = null;
    }

    if (!supabaseUrl || !supabaseKey || supabaseUrl === 'YOUR_SUPABASE_URL') {
        console.warn('[Aether Auth] Supabase not configured. Auth disabled, revealing page.');
        revealBody();
        return; // Exit early, no auth
    }

    // The Supabase CDN v2 UMD exposes: window.supabase.createClient
    try {
        if (!window.supabase || typeof window.supabase.createClient !== 'function') {
            throw new Error('Supabase CDN library not loaded. window.supabase is: ' + typeof window.supabase);
        }
        sb = window.supabase.createClient(supabaseUrl, supabaseKey);
    } catch (e) {
        console.error('[Aether Auth] Failed to create Supabase client:', e);
        revealBody();
        return; // Exit early, show page anyway
    }

    // Expose for other scripts if needed
    window._aetherSupabase = sb;

    // ── DOMContentLoaded ────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function() {

        // 1. Auth state listener
        try {
            sb.auth.onAuthStateChange(function(event, session) {
                try {
                    var user = session ? session.user : null;

                    if (!user && isProtectedPage()) {
                        clearSafety();
                        redirectToSignup();
                        return;
                    }

                    if (user && isAuthPage()) {
                        window.location.href = 'settings.html';
                        return;
                    }

                    // Page is allowed — reveal it
                    clearSafety();
                    revealBody();

                    // Update navbar auth button
                    var navAuthBtn = document.getElementById('navAuthBtn');
                    if (navAuthBtn) {
                        if (user) {
                            navAuthBtn.textContent = 'Settings';
                            navAuthBtn.href = 'settings.html';
                        } else {
                            navAuthBtn.textContent = 'Log In';
                            navAuthBtn.href = 'login.html';
                        }
                    }

                    // Settings page logic
                    if (isProtectedPage() && user) {
                        var emailEl = document.getElementById('userEmail');
                        if (emailEl) emailEl.innerText = user.email;

                        sb.from('profiles')
                            .select('full_name')
                            .eq('id', user.id)
                            .single()
                            .then(function(result) {
                                var nameEl = document.getElementById('userDisplayName');
                                if (!nameEl) return;
                                if (result.data && result.data.full_name) {
                                    nameEl.innerText = result.data.full_name;
                                } else {
                                    nameEl.innerText = (user.user_metadata && user.user_metadata.full_name) || 'User';
                                }
                            })
                            .catch(function() {
                                var nameEl = document.getElementById('userDisplayName');
                                if (nameEl) nameEl.innerText = (user.user_metadata && user.user_metadata.full_name) || 'User';
                            });

                        // Sign Out button
                        var signoutBtn = document.getElementById('signoutBtn');
                        if (signoutBtn && !signoutBtn._aetherBound) {
                            signoutBtn._aetherBound = true;
                            signoutBtn.addEventListener('click', function() {
                                sb.auth.signOut().then(function() {
                                    window.location.href = 'index.html';
                                }).catch(function() {
                                    // Fallback if network drops during signout
                                    localStorage.clear();
                                    sessionStorage.clear();
                                    window.location.href = 'index.html';
                                });
                            });
                        }
                    }
                } catch (innerErr) {
                    console.error('[Aether Auth] Error in onAuthStateChange callback:', innerErr);
                    clearSafety();
                    revealBody();
                }
            });
        } catch (e) {
            console.error('[Aether Auth] Failed to attach onAuthStateChange:', e);
            clearSafety();
            revealBody();
        }

        // 2. Initial session check (fallback in case onAuthStateChange doesn't fire immediately)
        try {
            sb.auth.getSession().then(function(result) {
                var session = result.data ? result.data.session : null;
                if (!session && isProtectedPage()) {
                    clearSafety();
                    redirectToSignup();
                } else if (session && isAuthPage()) {
                    window.location.href = 'settings.html';
                } else {
                    clearSafety();
                    revealBody();
                }
            }).catch(function(e) {
                console.error('[Aether Auth] getSession failed:', e);
                clearSafety();
                if (isProtectedPage()) redirectToSignup();
                else revealBody();
            });
        } catch (e) {
            console.error('[Aether Auth] Failed to call getSession:', e);
            clearSafety();
            revealBody();
        }

        // 3. Login form
        var loginForm = document.getElementById('loginForm');
        if (loginForm) {
            var loginError = document.getElementById('authError');
            var loginBtn = document.getElementById('loginBtn');
            var loginBtnText = loginBtn ? loginBtn.textContent : 'Log In';

            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (loginError) loginError.style.display = 'none';
                if (loginBtn) { loginBtn.disabled = true; loginBtn.textContent = 'Signing in...'; }

                var email = document.getElementById('email').value;
                var password = document.getElementById('password').value;

                sb.auth.signInWithPassword({ email: email, password: password })
                    .then(function(result) {
                        if (result.error) throw result.error;
                        window.location.href = 'settings.html';
                    })
                    .catch(function(err) {
                        if (loginError) {
                            loginError.innerText = err.message || 'Login failed. Please try again.';
                            loginError.style.display = 'block';
                        }
                        if (loginBtn) { loginBtn.disabled = false; loginBtn.textContent = loginBtnText; }
                    });
            });
        }

        // 4. Signup form
        var signupForm = document.getElementById('signupForm');
        if (signupForm) {
            var signupError = document.getElementById('authError');
            var signupBtn = document.getElementById('signupBtn');
            var signupBtnText = signupBtn ? signupBtn.textContent : 'Create Account';

            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (signupError) signupError.style.display = 'none';
                if (signupBtn) { signupBtn.disabled = true; signupBtn.textContent = 'Creating account...'; }

                var fullname = (document.getElementById('fullname') || {}).value || '';
                var email = document.getElementById('email').value;
                var password = document.getElementById('password').value;

                sb.auth.signUp({
                    email: email,
                    password: password,
                    options: { data: { full_name: fullname } }
                })
                .then(function(result) {
                    if (result.error) throw result.error;

                    var data = result.data;

                    // Email already registered
                    if (data && data.user && data.user.identities && data.user.identities.length === 0) {
                        throw new Error('Email already registered. Try logging in.');
                    }

                    // Email confirmation required (no session returned)
                    if (!data.session) {
                        if (signupError) {
                            signupError.innerText = 'Check your email for the confirmation link!';
                            signupError.style.display = 'block';
                            signupError.style.color = '#34d399';
                        }
                        if (signupBtn) { signupBtn.disabled = false; signupBtn.textContent = signupBtnText; }
                        return;
                    }

                    window.location.href = 'settings.html';
                })
                .catch(function(err) {
                    if (signupError) {
                        signupError.innerText = err.message || 'Signup failed. Please try again.';
                        signupError.style.display = 'block';
                        signupError.style.color = '#f87171';
                    }
                    if (signupBtn) { signupBtn.disabled = false; signupBtn.textContent = signupBtnText; }
                });
            });
        }

        // 5. Password reset form (if exists)
        var resetForm = document.getElementById('resetForm');
        if (resetForm) {
            var resetError = document.getElementById('authError');
            var resetBtn = document.getElementById('resetBtn');
            var resetBtnText = resetBtn ? resetBtn.textContent : 'Send Reset Link';

            resetForm.addEventListener('submit', function(e) {
                e.preventDefault();
                if (resetError) resetError.style.display = 'none';
                if (resetBtn) { resetBtn.disabled = true; resetBtn.textContent = 'Sending...'; }

                var email = document.getElementById('email').value;

                sb.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin + '/login.html'
                })
                .then(function(result) {
                    if (result.error) throw result.error;
                    if (resetError) {
                        resetError.innerText = 'Password reset link sent. Check your email!';
                        resetError.style.display = 'block';
                        resetError.style.color = '#34d399';
                    }
                    if (resetBtn) { resetBtn.disabled = false; resetBtn.textContent = resetBtnText; }
                })
                .catch(function(err) {
                    if (resetError) {
                        resetError.innerText = err.message || 'Failed to send reset link.';
                        resetError.style.display = 'block';
                        resetError.style.color = '#f87171';
                    }
                    if (resetBtn) { resetBtn.disabled = false; resetBtn.textContent = resetBtnText; }
                });
            });
        }

        // 6. Google Sign-In button (if exists)
        var googleBtn = document.getElementById('googleSignInBtn');
        if (googleBtn) {
            googleBtn.addEventListener('click', function() {
                sb.auth.signInWithOAuth({
                    provider: 'google',
                    options: { redirectTo: window.location.origin + '/settings.html' }
                })
                .catch(function(err) {
                    console.error('[Aether Auth] Google sign-in failed:', err);
                });
            });
        }
    });
})();
