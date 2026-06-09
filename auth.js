/**
 * Aura Herbs Authentication System
 * Simple login/signup state management
 */

const AuraAuth = {
    // Shared user credentials (simulated backend)
    // In a real app, this would be a hash on a server
    credentials: {
        'admin@auraherbs.com': 'password123',
        'patient@aura.com': 'patient2026',
        'user': 'pass' // simple dev bypass
    },

    init() {
        this.checkAuthState();
        this.bindEvents();
    },

    checkAuthState() {
        const user = JSON.parse(localStorage.getItem('aura_user'));
        const isAuthPage = window.location.pathname.includes('account.html');
        
        if (user) {
            // User is signed in
            document.querySelectorAll('.login-sign-btn').forEach(btn => {
                // Determine style based on context (Tailwind or Standard)
                const isTailwind = btn.querySelector('.bg-emerald-600') || btn.classList.contains('bg-emerald-600');
                
                if (isTailwind) {
                    btn.innerHTML = `
                        <div class="flex items-center space-x-3 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100">
                            <i class="fas fa-user-md text-xs"></i>
                            <span class="text-[10px] font-black uppercase tracking-widest">${user.email.split('@')[0]}</span>
                            <button onclick="AuraAuth.logout()" class="ml-2 pl-2 border-l border-emerald-200 text-[9px] font-black uppercase text-slate-400 hover:text-red-500 transition">Logout</button>
                        </div>
                    `;
                } else {
                    btn.innerHTML = `
                        <div class="user-profile-nav ul_li" style="gap: 10px; background: rgba(16, 185, 129, 0.1); padding: 5px 15px; border-radius: 50px; border: 1px solid rgba(16, 185, 129, 0.2);">
                            <img src="img/icon/user.svg" style="width: 20px; filter: invert(53%) sepia(93%) saturate(452%) hue-rotate(114deg) brightness(96%) contrast(92%);">
                            <span style="font-size: 12px; font-weight: 700; color: #10b981;">${user.email.split('@')[0]}</span>
                            <button onclick="AuraAuth.logout()" style="background: none; border: none; color: #94a3b8; font-size: 10px; margin-left: 5px; cursor: pointer; border-left: 1px solid #cbd5e1; padding-left: 10px;">Logout</button>
                        </div>
                    `;
                }

                if (btn.tagName === 'A') {
                    btn.href = 'account.html';
                } else {
                    const anchor = btn.querySelector('a');
                    if (anchor) anchor.href = 'account.html';
                }
            });

            // Update standalone profile links to point to account dashboard
            document.querySelectorAll('.login-icon-link').forEach(link => {
                link.href = 'account.html';
            });
            
            // Unlock "Restrictive" areas
            document.body.classList.remove('patient-locked');
        } else {
            // Not signed in
            if (!isAuthPage && !window.location.pathname.includes('index.html')) {
                // If on a page that requires auth (like shop or cart)
                // We'll show a prompt or redirect if needed, but for now we just mark the state
            }
            document.body.classList.add('patient-locked');

            // Force all guest login buttons to point directly to auth.html
            document.querySelectorAll('.login-sign-btn').forEach(btn => {
                if (btn.tagName === 'A') {
                    btn.href = 'auth.html';
                } else {
                    const anchor = btn.querySelector('a');
                    if (anchor) anchor.href = 'auth.html';
                }
            });

            document.querySelectorAll('.login-icon-link').forEach(link => {
                link.href = 'auth.html';
            });
        }
    },

    login(email, password) {
        if (this.credentials[email] && this.credentials[email] === password) {
            const user = { email: email, loginTime: new Date().getTime() };
            localStorage.setItem('aura_user', JSON.stringify(user));
            
            if (window.showKediNotification) {
                window.showKediNotification(`Welcome back, ${email.split('@')[0]}!`, 'success');
            } else {
                alert('Login Successful!');
            }
            
            setTimeout(() => { if(window.location.pathname.includes("account.html"))
                window.location.href = 'index.html';
            }, 1000);
            return true;
        } else {
            alert('Invalid clinical credentials.');
            return false;
        }
    },

    signup(email, password) {
        // Simple signup - just adds to local credentials for the session
        this.credentials[email] = password;
        return this.login(email, password);
    },

    logout() {
        localStorage.removeItem('aura_user');
        localStorage.removeItem('kedi_user');
        localStorage.removeItem('kedi_user_session');
        localStorage.removeItem('kedi_token');
        
        if (window.AuraFirebase && window.AuraFirebase.auth) {
            window.AuraFirebase.signOut(window.AuraFirebase.auth).then(() => {
                window.location.reload();
            }).catch(err => {
                console.error("Firebase sign out failed", err);
                window.location.reload();
            });
        } else {
            window.location.reload();
        }
    },

    bindEvents() {
        // This will be used in account.html to handle the forms
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'aura-login-form') {
                e.preventDefault();
                const email = e.target.querySelector('input[type="email"]').value;
                const pass = e.target.querySelector('input[type="password"]').value;
                this.login(email, pass);
            }
            if (e.target.id === 'aura-signup-form') {
                e.preventDefault();
                const email = e.target.querySelector('input[type="email"]').value;
                const pass = e.target.querySelector('input[type="password"]').value;
                this.signup(email, pass);
            }
        });
        
        // Block shopping if not logged in
        document.addEventListener('click', (e) => {
            const isAddToCart = e.target.closest('.add-to-cart-btn') || e.target.closest('[onclick*="addToCart"]');
            if (isAddToCart && !localStorage.getItem('aura_user')) {
                e.preventDefault();
                e.stopPropagation();
                
                // Show login modal or alert
                if (window.showKediNotification) {
                    window.showKediNotification('Please Sign In to proceed with shopping.', 'warning');
                } else {
                    alert('Clinical Access Restricted: Please Sign In to shop.');
                }
                
                setTimeout(() => { if(window.location.pathname.includes("account.html"))
                    window.location.href = 'account.html';
                }, 1500);
            }
        }, true); // Use capture to block other listeners
    }
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => AuraAuth.init());
window.AuraAuth = AuraAuth;

