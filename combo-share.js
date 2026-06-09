/**
 * Aura Herbs - Enhanced Social Sharing System v2.0
 * Features:
 *  - Beautiful glassmorphic share modal with preview card
 *  - WhatsApp, Facebook, X/Twitter, LinkedIn, Telegram, Email, Copy Link
 *  - Web Share API (native mobile) support
 *  - Ripple animation on click
 *  - Dynamic OG meta update for combo protocol pages
 *  - Toast notifications
 *  - Handles both combo cards and general page sharing
 */

/* ─────────────────────────────────────────────
   SECTION 1: Enhanced openAuraHerbsShare modal
   ───────────────────────────────────────────── */
window.openAuraHerbsShare = function(shareTitle, shareDesc, shareUrl, shareImage) {
    // Ensure modal exists
    let modal = document.getElementById('auraherbs-share-modal');
    if (!modal) {
        modal = AuraShare._buildModal();
        document.body.appendChild(modal);
    }

    // Populate preview
    const previewImg = document.getElementById('aura-share-preview-img');
    const previewTitle = document.getElementById('aura-share-preview-title');
    const previewDesc = document.getElementById('aura-share-preview-desc');
    const previewUrl = document.getElementById('aura-share-preview-url');

    if (previewImg) {
        previewImg.src = shareImage || document.querySelector('meta[property="og:image"]')?.content || 'favicon.png';
        previewImg.style.display = shareImage ? 'block' : 'none';
    }
    if (previewTitle) previewTitle.textContent = shareTitle;
    if (previewDesc) previewDesc.textContent = (shareDesc || '').substring(0, 120) + ((shareDesc || '').length > 120 ? '…' : '');
    if (previewUrl) previewUrl.textContent = shareUrl.replace(/^https?:\/\//, '').substring(0, 50);

    // Build platform URLs
    const whatsappText = encodeURIComponent(`${shareTitle}\n${shareDesc}\n\n${shareUrl}`);
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedDesc = encodeURIComponent(shareDesc);
    const emailBody = encodeURIComponent(`${shareTitle}\n\n${shareDesc}\n\nRead more: ${shareUrl}`);

    const platforms = {
        'share-wa':       `https://api.whatsapp.com/send?text=${whatsappText}`,
        'share-fb':       `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        'share-tw':       `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        'share-li':       `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        'share-tg':       `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
        'share-email':    `mailto:?subject=${encodedTitle}&body=${emailBody}`,
    };

    Object.entries(platforms).forEach(([id, href]) => {
        const el = document.getElementById(id);
        if (el) { el.href = href; el.target = '_blank'; }
    });

    // Copy link button
    const copyBtn = document.getElementById('share-copy-link');
    if (copyBtn) {
        copyBtn.onclick = (e) => {
            AuraShare._ripple(e, copyBtn);
            AuraShare._copyToClipboard(shareUrl, copyBtn);
        };
    }

    // Native share button
    const nativeBtn = document.getElementById('share-native');
    if (nativeBtn) {
        if (navigator.share) {
            nativeBtn.style.display = 'flex';
            nativeBtn.onclick = async (e) => {
                AuraShare._ripple(e, nativeBtn);
                try {
                    await navigator.share({ title: shareTitle, text: shareDesc, url: shareUrl });
                } catch (err) { /* user cancelled */ }
            };
        } else {
            nativeBtn.style.display = 'none';
        }
    }

    // Add ripple to all link buttons
    modal.querySelectorAll('.aura-share-platform-btn').forEach(btn => {
        btn.addEventListener('click', (e) => AuraShare._ripple(e, btn), { once: true });
    });

    // Show modal with animation
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        const inner = modal.querySelector('.aura-share-modal-inner');
        if (inner) { inner.style.transform = 'translateY(0) scale(1)'; inner.style.opacity = '1'; }
    });

    // Dynamic OG update (best-effort for SPAs)
    AuraShare._updateOGMeta(shareTitle, shareDesc, shareUrl, shareImage);
};

/* ─────────────────────────────────────────────
   SECTION 2: AuraShare utility object
   ───────────────────────────────────────────── */
const AuraShare = {

    init() {
        // Delegate click on combo share buttons
        document.addEventListener('click', (e) => {
            const shareBtn = e.target.closest('.combo-share-btn');
            if (shareBtn) this.handleComboShare(e, shareBtn);

            // Close modal on overlay click
            if (e.target.id === 'auraherbs-share-modal') this.closeModal();
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });

        // Wire close button (if already in DOM)
        document.addEventListener('click', (e) => {
            if (e.target.id === 'aura-share-close-btn' || e.target.closest('#aura-share-close-btn')) {
                this.closeModal();
            }
        });
    },

    handleComboShare(e, btn) {
        e.preventDefault();
        const card = btn.closest('.combo-hover-item') || btn.closest('[data-combo-info]');
        if (!card) {
            // Fallback: share current page
            this.shareCurrentPage();
            return;
        }

        try {
            const info = JSON.parse(card.dataset.comboInfo);
            const currency = localStorage.getItem('kedi_currency') || 'NGN';
            const symbol = currency === 'NGN' ? '₦' : currency === 'PI' ? 'π' : '$';
            const price = (info.price || 0).toLocaleString();
            const imgSrc = card.querySelector('img')?.src || info.images?.[0] || '';

            const title = `Aura Herbs: ${info.title}`;
            const desc = `✅ Verified Clinical Protocol\n💊 ${info.title}\n💰 Price: ${symbol}${price}\n\n${info.benefits || ''}\n\n🌿 Natural. Effective. Trusted.`;
            const url = `${location.origin}${location.pathname}?combo=${encodeURIComponent(info.title)}`;

            window.openAuraHerbsShare(title, desc, url, imgSrc);
        } catch (err) {
            console.error('Share error:', err);
            this.shareCurrentPage();
        }
    },

    shareCurrentPage() {
        const title = document.title;
        const desc = document.querySelector('meta[name="description"]')?.content || 'Aura Herbs Clinical Wellness Platform';
        const url = location.href;
        const img = document.querySelector('meta[property="og:image"]')?.content || '';
        window.openAuraHerbsShare(title, desc, url, img);
    },

    closeModal() {
        const modal = document.getElementById('auraherbs-share-modal');
        if (!modal) return;
        const inner = modal.querySelector('.aura-share-modal-inner');
        modal.style.opacity = '0';
        if (inner) { inner.style.transform = 'translateY(20px) scale(0.96)'; inner.style.opacity = '0'; }
        setTimeout(() => { if (modal) modal.style.display = 'none'; }, 300);
    },

    _buildModal() {
        const modal = document.createElement('div');
        modal.id = 'auraherbs-share-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Share this content');
        modal.style.cssText = `
            display: none; opacity: 0; position: fixed; inset: 0; z-index: 99999;
            background: rgba(10,15,30,0.75); backdrop-filter: blur(12px);
            align-items: center; justify-content: center; padding: 16px;
            transition: opacity 0.3s ease;
        `;

        const platforms = [
            { id: 'share-wa',    label: 'WhatsApp',  icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.395 5.608L0 24l6.545-1.368A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 0 1-5.032-1.387l-.361-.214-3.882.812.823-3.782-.234-.375A9.793 9.793 0 0 1 2.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>`, color: '#25D366', bg: 'rgba(37,211,102,0.12)', border: 'rgba(37,211,102,0.3)' },
            { id: 'share-fb',    label: 'Facebook',  icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`, color: '#1877F2', bg: 'rgba(24,119,242,0.12)', border: 'rgba(24,119,242,0.3)' },
            { id: 'share-tw',    label: 'X / Twitter', icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`, color: '#1DA1F2', bg: 'rgba(29,161,242,0.12)', border: 'rgba(29,161,242,0.3)' },
            { id: 'share-li',    label: 'LinkedIn',  icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`, color: '#0077B5', bg: 'rgba(0,119,181,0.12)', border: 'rgba(0,119,181,0.3)' },
            { id: 'share-tg',    label: 'Telegram',  icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`, color: '#2AABEE', bg: 'rgba(42,171,238,0.12)', border: 'rgba(42,171,238,0.3)' },
            { id: 'share-email', label: 'Email',     icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' },
        ];

        const platformsHTML = platforms.map(p => `
            <a id="${p.id}" href="#" class="aura-share-platform-btn" target="_blank" rel="noopener" style="
                display: flex; flex-direction: column; align-items: center; gap: 8px;
                padding: 16px 12px; border-radius: 16px; text-decoration: none;
                background: ${p.bg}; border: 1.5px solid ${p.border};
                color: ${p.color}; transition: all 0.25s ease; cursor: pointer;
                position: relative; overflow: hidden;
                font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em;
                min-width: 72px;
            "
            onmouseover="this.style.transform='translateY(-4px) scale(1.04)';this.style.boxShadow='0 12px 32px ${p.color}33'"
            onmouseout="this.style.transform='translateY(0) scale(1)';this.style.boxShadow='none'">
                ${p.icon}
                <span>${p.label}</span>
            </a>
        `).join('');

        modal.innerHTML = `
            <div class="aura-share-modal-inner" style="
                background: linear-gradient(145deg, #0f1929 0%, #1a2a3a 100%);
                border: 1.5px solid rgba(255,255,255,0.1);
                border-radius: 28px; padding: 32px;
                width: 100%; max-width: 520px;
                box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05);
                transform: translateY(30px) scale(0.95); opacity: 0;
                transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
                position: relative; font-family: 'Inter','Outfit',sans-serif;
            ">
                <!-- Close Button -->
                <button id="aura-share-close-btn" aria-label="Close share dialog" style="
                    position: absolute; top: 16px; right: 16px;
                    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
                    color: #94a3b8; width: 36px; height: 36px; border-radius: 50%;
                    cursor: pointer; display: flex; align-items: center; justify-content: center;
                    font-size: 18px; transition: all 0.2s; line-height: 1;
                " onmouseover="this.style.background='rgba(255,255,255,0.15)';this.style.color='#fff'"
                   onmouseout="this.style.background='rgba(255,255,255,0.07)';this.style.color='#94a3b8'">✕</button>

                <!-- Header -->
                <div style="margin-bottom: 24px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px;">
                        <div style="width:40px;height:40px;background:linear-gradient(135deg,#10b981,#3b82f6);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🌿</div>
                        <div>
                            <h3 style="margin:0;font-size:1.2rem;font-weight:800;color:#fff;">Share This Protocol</h3>
                            <p style="margin:0;font-size:0.82rem;color:#64748b;">Spread the word about natural wellness</p>
                        </div>
                    </div>
                </div>

                <!-- Preview Card -->
                <div style="
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px; padding: 16px;
                    display: flex; gap: 14px; margin-bottom: 24px;
                    align-items: flex-start;
                ">
                    <img id="aura-share-preview-img" src="" alt="Preview" style="
                        width: 72px; height: 72px; border-radius: 12px;
                        object-fit: cover; flex-shrink: 0;
                        border: 1px solid rgba(255,255,255,0.08);
                    " onerror="this.style.display='none'">
                    <div style="flex: 1; min-width: 0;">
                        <div style="
                            font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
                            color: #10b981; text-transform: uppercase; margin-bottom: 4px;
                        ">Aura Herbs Clinical Protocol</div>
                        <div id="aura-share-preview-title" style="
                            font-weight: 700; font-size: 0.95rem; color: #e2e8f0;
                            line-height: 1.3; margin-bottom: 6px;
                            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                        "></div>
                        <div id="aura-share-preview-desc" style="
                            font-size: 0.8rem; color: #64748b; line-height: 1.4;
                            display: -webkit-box; -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical; overflow: hidden;
                        "></div>
                        <div id="aura-share-preview-url" style="
                            font-size: 0.72rem; color: #475569; margin-top: 8px;
                            font-family: monospace;
                        "></div>
                    </div>
                </div>

                <!-- Platform Grid -->
                <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 20px;">
                    ${platformsHTML}
                </div>

                <!-- Divider -->
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <div style="flex: 1; height: 1px; background: rgba(255,255,255,0.08);"></div>
                    <span style="color: #475569; font-size: 0.75rem; white-space: nowrap;">or copy link</span>
                    <div style="flex: 1; height: 1px; background: rgba(255,255,255,0.08);"></div>
                </div>

                <!-- Copy Link Row -->
                <div style="display: flex; gap: 10px; align-items: center;">
                    <div style="
                        flex: 1; background: rgba(255,255,255,0.05);
                        border: 1px solid rgba(255,255,255,0.1);
                        border-radius: 12px; padding: 12px 16px;
                        font-size: 0.82rem; color: #64748b;
                        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                        font-family: monospace;
                    " id="aura-share-url-display"></div>
                    <button id="share-copy-link" style="
                        background: linear-gradient(135deg, #10b981, #059669);
                        color: #fff; border: none; border-radius: 12px;
                        padding: 12px 20px; cursor: pointer; font-weight: 700;
                        font-size: 0.85rem; white-space: nowrap;
                        transition: all 0.2s; position: relative; overflow: hidden;
                        display: flex; align-items: center; gap: 6px; flex-shrink: 0;
                    " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy
                    </button>
                </div>

                <!-- Native Share -->
                <button id="share-native" style="
                    display: none; width: 100%; margin-top: 12px;
                    background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.12);
                    color: #cbd5e1; border-radius: 12px; padding: 13px 20px;
                    cursor: pointer; font-weight: 700; font-size: 0.88rem;
                    transition: all 0.2s; align-items: center; justify-content: center; gap: 8px;
                " onmouseover="this.style.background='rgba(255,255,255,0.1)'"
                   onmouseout="this.style.background='rgba(255,255,255,0.06)'">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    Share via Device
                </button>
            </div>

            <style>
                .aura-ripple {
                    position: absolute; border-radius: 50%; background: rgba(255,255,255,0.25);
                    transform: scale(0); animation: aura-ripple-anim 0.5s linear;
                    pointer-events: none;
                }
                @keyframes aura-ripple-anim { to { transform: scale(4); opacity: 0; } }
                @keyframes aura-share-toast-in  { from { bottom: -60px; opacity: 0; } to { bottom: 30px; opacity: 1; } }
                @keyframes aura-share-toast-out { from { bottom: 30px; opacity: 1; } to { bottom: -60px; opacity: 0; } }
            </style>
        `;

        return modal;
    },

    _updateOGMeta(title, desc, url, img) {
        const setMeta = (sel, val) => {
            let el = document.querySelector(sel);
            if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
            const attr = sel.includes('property') ? 'property' : 'name';
            el.setAttribute(attr, sel.match(/["']([^"']+)["']/)?.[1] || '');
            el.setAttribute('content', val);
        };
        if (title) setMeta('meta[property="og:title"]', title);
        if (desc) setMeta('meta[property="og:description"]', desc);
        if (url) setMeta('meta[property="og:url"]', url);
        if (img) setMeta('meta[property="og:image"]', img);
    },

    _ripple(e, el) {
        const r = document.createElement('span');
        r.className = 'aura-ripple';
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
        el.appendChild(r);
        r.addEventListener('animationend', () => r.remove());
    },

    _copyToClipboard(text, btn) {
        const orig = btn.innerHTML;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => this._onCopied(btn, orig));
        } else {
            const ta = document.createElement('textarea');
            ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); this._onCopied(btn, orig); } catch(e) {}
            document.body.removeChild(ta);
        }
        // Also update URL display
        const disp = document.getElementById('aura-share-url-display');
        if (disp) disp.textContent = text;
    },

    _onCopied(btn, orig) {
        btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
        btn.style.background = 'linear-gradient(135deg, #059669, #047857)';
        this._showToast('🔗 Link copied to clipboard!');
        setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        }, 2500);
    },

    _showToast(message) {
        const existing = document.getElementById('aura-share-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'aura-share-toast';
        toast.style.cssText = `
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
            background: linear-gradient(135deg, #10b981, #059669);
            color: #fff; padding: 13px 28px; border-radius: 50px;
            font-weight: 700; font-size: 0.9rem;
            box-shadow: 0 10px 30px rgba(16,185,129,0.45);
            z-index: 999999; white-space: nowrap;
            animation: aura-share-toast-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'aura-share-toast-out 0.4s ease-in forwards';
            setTimeout(() => toast.remove(), 400);
        }, 2800);
    }
};

document.addEventListener('DOMContentLoaded', () => AuraShare.init());
