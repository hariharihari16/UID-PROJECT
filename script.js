document.addEventListener('DOMContentLoaded', () => {
    try {
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        
        if (navbar) {
            let isScrolling = false;
            window.addEventListener('scroll', () => {
                if (!isScrolling) {
                    window.requestAnimationFrame(() => {
                        if (window.scrollY > 50) {
                            navbar.classList.add('scrolled');
                        } else {
                            navbar.classList.remove('scrolled');
                        }
                        isScrolling = false;
                    });
                    isScrolling = true;
                }
            });
        }

        // Scroll Animation Observer for all fade-in elements
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });

        // --- Authentication & Modal Logic ---
        const signinModal = document.getElementById('signin-modal');
        const navSigninBtn = document.getElementById('nav-signin-btn');
        const closeBtn = document.querySelector('.close-btn');
        const dashboardLinks = document.querySelectorAll('.dashboard-link');

        if (window.location.search.includes('login=true') && signinModal) {
            signinModal.classList.add('active');
        }

        const navProfileItem = document.getElementById('nav-profile-item');

        // Function to check auth state
        const updateAuthState = () => {
            if (!navSigninBtn) return;
            const user = localStorage.getItem('fitmob_user');
            if (user) {
                navSigninBtn.textContent = 'Sign Out';
                navSigninBtn.style.color = '#fff';
                navSigninBtn.style.borderColor = 'rgba(255,255,255,0.2)';
                if (navProfileItem) {
                    navProfileItem.style.display = 'block';
                    navProfileItem.querySelector('a').title = `Profile: ${user}`;
                }
            } else {
                navSigninBtn.textContent = 'Sign In';
                navSigninBtn.style.color = 'var(--accent-neon)';
                navSigninBtn.style.borderColor = 'var(--accent-neon)';
                if (navProfileItem) navProfileItem.style.display = 'none';
            }
        };

        updateAuthState(); // Check on load

        if (navSigninBtn && signinModal) {
            navSigninBtn.addEventListener('click', () => {
                if (localStorage.getItem('fitmob_user')) {
                    localStorage.removeItem('fitmob_user');
                    updateAuthState();
                    alert('You have successfully signed out.');
                } else {
                    signinModal.classList.add('active');
                }
            });
        }

        if (closeBtn && signinModal) {
            closeBtn.addEventListener('click', () => {
                signinModal.classList.remove('active');
            });
        }

        if (signinModal) {
            window.addEventListener('click', (e) => {
                if (e.target === signinModal) {
                    signinModal.classList.remove('active');
                }
            });
        }

        // --- Form & Registration Logic ---
        const authForm = document.getElementById('auth-form');
        const authUsername = document.getElementById('auth-username');
        const authPassword = document.getElementById('auth-password');
        const authSubmitBtn = document.getElementById('auth-submit-btn');
        const authError = document.getElementById('auth-error');
        const toggleAuthLink = document.getElementById('toggle-auth-link');
        const modalTitle = document.getElementById('modal-title');
        const modalSubtitle = document.getElementById('modal-subtitle');
        const formToggleSpan = document.getElementById('form-toggle-text');

        let isSignUp = false;

        if (toggleAuthLink && authForm && modalTitle && modalSubtitle && authSubmitBtn && formToggleSpan) {
            toggleAuthLink.addEventListener('click', (e) => {
                e.preventDefault();
                isSignUp = !isSignUp;
                if(authError) authError.style.display = 'none';
                authForm.reset();
                
                if (isSignUp) {
                    modalTitle.innerHTML = 'Create <span class="highlight">Account</span>';
                    modalSubtitle.textContent = 'Join FITMOB to start your journey.';
                    authSubmitBtn.textContent = 'Sign Up';
                    formToggleSpan.childNodes[0].textContent = 'Already have an account? ';
                    toggleAuthLink.textContent = 'Sign In';
                } else {
                    modalTitle.innerHTML = 'Welcome to FIT<span class="highlight">MOB</span>';
                    modalSubtitle.textContent = 'Sign in to access your personal dashboard.';
                    authSubmitBtn.textContent = 'Sign In';
                    formToggleSpan.childNodes[0].textContent = "Don't have an account? ";
                    toggleAuthLink.textContent = 'Create one';
                }
            });
        }

        if (authForm) {
            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = authUsername.value.trim();
                const password = authPassword.value;
                
                let usersDb = JSON.parse(localStorage.getItem('fitmob_db') || '{}');
                
                if (isSignUp) {
                    if (usersDb[username]) {
                        if(authError) {
                            authError.textContent = 'Username already exists! Please pick another.';
                            authError.style.display = 'block';
                        }
                        return;
                    }
                    usersDb[username] = password;
                    localStorage.setItem('fitmob_db', JSON.stringify(usersDb));
                    signIn(username); 
                } else {
                    if (usersDb[username] && usersDb[username] === password) {
                        signIn(username);
                    } else {
                        if(authError) {
                            authError.textContent = 'Invalid username or password!';
                            authError.style.display = 'block';
                        }
                    }
                }
            });
        }

        const signIn = (role) => {
            localStorage.setItem('fitmob_user', role);
            if(signinModal) signinModal.classList.remove('active');
            updateAuthState();
            
            if (window.pendingDashboardClick) {
                window.location.href = 'dashboard.html';
                window.pendingDashboardClick = false;
            } else {
                alert(`Welcome to FITMOB, ${role}!`);
            }
        };

        const guestBtn = document.getElementById('btn-guest');
        if (guestBtn) {
            guestBtn.addEventListener('click', () => signIn('Guest'));
        }

        if (dashboardLinks) {
            dashboardLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    if (!localStorage.getItem('fitmob_user')) {
                        e.preventDefault(); 
                        window.pendingDashboardClick = true; 
                        if(signinModal) signinModal.classList.add('active'); 
                    }
                });
            });
        }


        // 5. Theme Customization Logic
        const themeColors = {
            'Neon Green': '#22c55e',
            'Cyber Pink': '#ec4899',
            'Electric Blue': '#3b82f6',
            'Solar Orange': '#f97316',
            'Default Indigo': '#6366f1'
        };

        function applyTheme(colorCode) {
            document.documentElement.style.setProperty('--accent-neon', colorCode);
            document.documentElement.style.setProperty('--accent-neon-hover', colorCode); 
            localStorage.setItem('fitmob_theme', colorCode);
        }

        const savedTheme = localStorage.getItem('fitmob_theme');
        if (savedTheme) applyTheme(savedTheme);

        // Inject Theme Modal and Button
        const themeModalHTML = `
            <div id="theme-btn" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; background: var(--bg-card); border: 2px solid var(--accent-neon); width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--accent-neon); box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
                <i class="fas fa-palette fs-4"></i>
            </div>
            <div id="theme-modal" class="modal" style="z-index: 2000;">
                <div class="modal-content text-center" style="max-width: 400px;">
                    <span class="close-theme-btn close-btn">&times;</span>
                    <h2 class="mb-4">Select <span class="highlight">Theme</span></h2>
                    <div class="d-flex flex-wrap justify-content-center gap-3">
                        ${Object.entries(themeColors).map(([name, color]) => `
                            <button class="theme-option btn text-light" style="background: ${color}; width: 100%; padding: 10px; border-radius: 8px;">${name}</button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', themeModalHTML);

        const themeBtn = document.getElementById('theme-btn');
        const themeModal = document.getElementById('theme-modal');
        const closeThemeBtn = document.querySelector('.close-theme-btn');
        const themeOptions = document.querySelectorAll('.theme-option');

        if (themeBtn && themeModal) {
            themeBtn.addEventListener('click', () => {
                themeModal.style.display = 'flex';
                setTimeout(() => themeModal.classList.add('active'), 10);
            });

            closeThemeBtn.addEventListener('click', () => {
                themeModal.classList.remove('active');
                setTimeout(() => themeModal.style.display = 'none', 300);
            });

            themeOptions.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    applyTheme(e.target.style.background);
                    // Also update the button outline to match the new theme instantly
                    themeBtn.style.borderColor = e.target.style.background;
                    themeBtn.style.color = e.target.style.background;
                    
                    themeModal.classList.remove('active');
                    setTimeout(() => themeModal.style.display = 'none', 300);
                });
            });
            
            // Set initial button colors
            if(savedTheme) {
                themeBtn.style.borderColor = savedTheme;
                themeBtn.style.color = savedTheme;
            }
        }
        
    } catch (error) {
        alert("JavaScript Error: " + error.message);
        console.error(error);
    }
});
