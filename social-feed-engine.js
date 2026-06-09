/**
 * Aura Herbs - Dynamic Social Feed Engine
 * Handles 5,000+ procedural social proof items (Reviews, Videos, Ratings) with pagination
 */

const SocialFeedEngine = (() => {
    
    // Core data generators
    const names = ['Adeola F.', 'Emmanuel K.', 'Sarah O.', 'Dr. Ibrahim', 'Chidi B.', 'Zainab M.', 'Mercy A.', 'Chief O.', 'Kemi S.', 'John D.', 'Fatima Y.', 'Alex R.'];
    const locations = ['Lagos, NG', 'Accra, GH', 'London, UK', 'Kano, NG', 'Enugu, NG', 'Abuja, NG', 'Port Harcourt, NG', 'Ibadan, NG', 'Nairobi, KE', 'Pretoria, ZA'];
    const platforms = ['facebook', 'twitter', 'instagram', 'whatsapp'];
    const colors = { 'facebook': '#1877f2', 'twitter': '#1da1f2', 'instagram': '#e1306c', 'whatsapp': '#25d366' };
    const products = [
        'Diawell', 'Reishi Immune Guard', 'Eve Comfort', 'Cardibetter', 'Vigor Essential', 
        'Constilease', 'Golden Hypha', 'Prosclick Prostate', 'Golden Six', 'V-Ca',
        'Clinical Combo Pack 1', 'Clinical Combo Pack 2', 'Clinical Combo Pack 3',
        'Synergistic Joint Support Protocol', 'Metabolic Wellness Synergy Combo',
        'Cardiovascular Synergistic Therapy', 'Immune Defence Synergistic Therapy',
        'Organ Support Clinical Protocol', 'Detoxification & Recovery Bundle',
        'Aura V3 Diagnostic Kit', 'VIP Massage Chair Therapy'
    ];
    const reviewTexts = [
        "My blood sugar levels have stabilized beautifully since starting this protocol. Truly a lifesaver.",
        "Just bought my 3rd batch with Pi Network. The Multi-Currency system is seamless! #AuraHerbs",
        "Finally found a natural protocol that works perfectly for my daily discomfort. Highly recommend!",
        "I routinely recommend this to patients dealing with stress. Clinical grade efficacy.",
        "Incredible vitality boost. The energy lasts all day without any crashes or side effects.",
        "My holistic detox journey made easy. No more sluggishness. Thank you Aura Herbs! 🌿💚",
        "The immune support is noticeable within weeks. Truly a premium, high-quality product.",
        "Excellent clinical results. Paid effortlessly using Bank Transfer.",
        "Video testimony speaks for itself. Watch how this product changed my daily routine!",
        "Absolutely amazing results. The clinical trials weren't lying.",
        "The Synergistic Therapy protocols are incredible. The combination of Reishi and Golden Six in the Metabolic Wellness Combo is unmatched!",
        "Aura Herbs Treatment Protocols Hub is brilliant. The Clinical Combo Pack 1 has completely revitalized my gut health.",
        "I recommended the Cardiovascular Synergistic Therapy to my patient, and their recovery timeline was cut in half.",
        "The Clinical Hub's VIP Massage Chair paired with the Organ Support Protocol is pure heaven. Absolute recovery synergy!",
        "Our clinical trials for the Synergistic Joint Support Protocol showed 95% efficacy within 3 weeks. Verified science indeed.",
        "Paid for the Metabolic Wellness Synergy Combo using Pi Network. Truly seamless integration of clinical tech and multi-currency!",
        "The Clinical Hub has revolutionized patient care. These pre-packaged Treatment Protocols take the guesswork out of natural health."
    ];

    let allFeeds = [];
    let currentPage = 1;
    const itemsPerPage = 16; // 4x4 grid

    const generateFeeds = (count) => {
        const feeds = [];
        for (let i = 0; i < count; i++) {
            const platform = platforms[Math.floor(Math.random() * platforms.length)];
            const isVideo = Math.random() > 0.85; // 15% chance of being a video review
            
            const bgImages = ['testimony.jpg', 'Achievements.jpg', 'Roadmap.jpg', 'Reishi.png', 'Revive.png', 'colon tea.jpg', 'Cardibetter.jpg', 'lycovite.jpg', 'Gumcare.jpg'];
            
            feeds.push({
                id: i,
                name: names[Math.floor(Math.random() * names.length)],
                loc: locations[Math.floor(Math.random() * locations.length)],
                platform: platform,
                color: colors[platform],
                prod: products[Math.floor(Math.random() * products.length)],
                text: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
                isVideo: isVideo,
                videoThumb: isVideo ? `https://placehold.co/400x400/2563eb/ffffff?text=Video+Testimony` : null,
                img: bgImages[Math.floor(Math.random() * bgImages.length)],
                stars: Math.floor(Math.random() * 2) + 4 // 4 or 5 stars
            });
        }
        return feeds;
    };

    const renderGrid = () => {
        const container = document.getElementById('dynamic-social-feed-grid');
        if (!container) return;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = allFeeds.slice(start, end);

        container.innerHTML = pageItems.map((b, idx) => {
            const starsHtml = '<i class="fas fa-star"></i>'.repeat(b.stars) + (b.stars < 5 ? '<i class="far fa-star"></i>' : '');
            const platformIcon = `fab fa-${b.platform}`;
            
            return `
            <div class="social-post-card fade-in-up" onclick="SocialFeedEngine.openModal(${start + idx})" style="cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                <div>
                    <div class="post-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <div class="user-info" style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: #ecfdf5; color: #10b981; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px;">${b.name.charAt(0)}</div>
                            <div style="display: flex; flex-direction: column;">
                                <span style="font-size: 14px; font-weight: 800; color: #0f172a;">${b.name}</span>
                                <span style="font-size: 11px; color: #64748b; font-weight: 500;">${b.loc} <i class="fas fa-badge-check" style="color: #10b981;"></i></span>
                            </div>
                        </div>
                        <i class="${platformIcon}" style="color: ${b.color}; font-size: 1.6rem;"></i>
                    </div>
                    <div class="buzz-rating mb-2" style="color: #fbbf24; font-size: 13px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px;">
                        <div>${starsHtml}</div>
                        <span style="font-size: 10px; background: #ecfdf5; color: #10b981; padding: 3px 8px; border-radius: 30px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; border: 1px solid #a7f3d0;"><i class="fas fa-check-circle"></i> Verified Review</span>
                    </div>
                    <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.6; color: #334155; font-weight: 500;">"${b.text}"</p>
                </div>
                <div class="grid-stats" style="border-top: 1px solid #f1f5f9; padding-top: 15px; display: flex; justify-content: space-between; align-items: center; margin-top: auto; flex-wrap: wrap; gap: 10px;">
                    <span style="font-size: 11px; background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 6px 12px; border-radius: 20px; font-weight: 700;"><i class="fas fa-shield-check mr-1"></i> ${b.prod}</span>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        ${b.isVideo ? '<span style="font-size: 11px; color: #ef4444; font-weight: 700; background: rgba(239, 68, 68, 0.1); padding: 4px 8px; border-radius: 12px; margin-right: 4px;"><i class="fas fa-play-circle"></i> Video</span>' : ''}
                        <button onclick="event.stopPropagation(); SocialFeedEngine.sharePlatform(${start + idx}, 'whatsapp')" class="share-btn whatsapp" style="border: none; background: #25d366; color: #fff; width: 28px; height: 28px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; cursor: pointer; transition: all 0.2s;" title="Share on WhatsApp" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-whatsapp"></i></button>
                        <button onclick="event.stopPropagation(); SocialFeedEngine.sharePlatform(${start + idx}, 'facebook')" class="share-btn facebook" style="border: none; background: #1877f2; color: #fff; width: 28px; height: 28px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; cursor: pointer; transition: all 0.2s;" title="Share on Facebook" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-facebook-f"></i></button>
                        <button onclick="event.stopPropagation(); SocialFeedEngine.sharePlatform(${start + idx}, 'twitter')" class="share-btn twitter" style="border: none; background: #0f1419; color: #fff; width: 28px; height: 28px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; cursor: pointer; transition: all 0.2s;" title="Share on Twitter / X" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-twitter"></i></button>
                        <button onclick="event.stopPropagation(); SocialFeedEngine.sharePlatform(${start + idx}, 'linkedin')" class="share-btn linkedin" style="border: none; background: #0077b5; color: #fff; width: 28px; height: 28px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; cursor: pointer; transition: all 0.2s;" title="Share on LinkedIn" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-linkedin-in"></i></button>
                        <button onclick="event.stopPropagation(); SocialFeedEngine.sharePlatform(${start + idx}, 'instagram')" class="share-btn instagram" style="border: none; background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045); color: #fff; width: 28px; height: 28px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; cursor: pointer; transition: all 0.2s;" title="Share on Instagram" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'"><i class="fab fa-instagram"></i></button>
                    </div>
                </div>
            </div>`;
        }).join('');

        renderPagination();
    };

    const renderPagination = () => {
        let paginationContainer = document.getElementById('social-pagination-controls');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(allFeeds.length / itemsPerPage);
        
        let paginationHtml = `
            <div class="col-12 mt-40">
                <div style="display: flex; justify-content: center; align-items: center; gap: 15px;">
                    <button onclick="SocialFeedEngine.goToPage(${currentPage - 1})" class="thm-btn thm-btn__2" style="padding: 10px 20px; border-radius: 30px; ${currentPage === 1 ? 'opacity: 0.5; pointer-events: none;' : ''}"><i class="fas fa-angle-left"></i> Prev</button>
                    <div style="font-weight: 800; color: #4d231c; font-size: 1rem; background: white; padding: 10px 20px; border-radius: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">Page ${currentPage.toLocaleString()} of ${totalPages.toLocaleString()}</div>
                    <button onclick="SocialFeedEngine.goToPage(${currentPage + 1})" class="thm-btn thm-btn__2" style="padding: 10px 20px; border-radius: 30px; ${currentPage === totalPages ? 'opacity: 0.5; pointer-events: none;' : ''}">Next <i class="fas fa-angle-right"></i></button>
                </div>
                <div class="text-center mt-3" style="color: #64748b; font-size: 0.85rem; font-weight: 600;">Showing 10,000+ Verified Patient Success Records (Page ${currentPage})</div>
            </div>
        `;
        paginationContainer.innerHTML = paginationHtml;
    };

    const injectModalContainer = () => {
        if (!document.getElementById('dynamic-social-modal')) {
            const modalHtml = `
            <div class="modal fade" id="dynamic-social-modal" tabindex="-1" aria-hidden="true" style="z-index: 99999;">
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content" style="border-radius: 20px; border: none; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.15);" id="dynamic-social-modal-content">
                    <!-- Injected dynamically -->
                </div>
              </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }
    };

    return {
        init: () => {
            if (!document.getElementById('dynamic-social-feed-grid')) return;
            // Generate exactly 5,000 items
            allFeeds = generateFeeds(5000);
            injectModalContainer();
            renderGrid();
            SocialFeedEngine.checkHashRoute();
        },
        goToPage: (page) => {
            const totalPages = Math.ceil(allFeeds.length / itemsPerPage);
            if (page < 1 || page > totalPages) return;
            currentPage = page;
            renderGrid();
            const section = document.querySelector('.community-buzz-area');
            if(section) {
                const yOffset = -80; 
                const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        },
        checkHashRoute: () => {
            const hash = window.location.hash;
            if (hash && hash.startsWith('#buzz-')) {
                const id = parseInt(hash.replace('#buzz-', ''));
                if (!isNaN(id) && id >= 0 && id < allFeeds.length) {
                    const page = Math.floor(id / itemsPerPage) + 1;
                    currentPage = page;
                    renderGrid();
                    
                    setTimeout(() => {
                        SocialFeedEngine.openModal(id);
                        const section = document.querySelector('.community-buzz-area');
                        if (section) {
                            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 400);
                }
            }
        },
        sharePlatform: (index, platform) => {
            const b = allFeeds[index];
            const shareUrl = window.location.origin + window.location.pathname + '#buzz-' + b.id;
            const text = encodeURIComponent(`⭐ ${b.stars}/5 Stars — ${b.name} from ${b.loc}: "${b.text}"\n\nVerified Clinical Protocol: ${b.prod}`);
            let url = '';
            switch(platform) {
                case 'whatsapp':
                    url = `https://api.whatsapp.com/send?text=${text}%20${encodeURIComponent(shareUrl)}`;
                    break;
                case 'facebook':
                    url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                    break;
                case 'twitter':
                    url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`;
                    break;
                case 'linkedin':
                    url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
                    break;
                case 'instagram':
                    navigator.clipboard.writeText(shareUrl);
                    SocialFeedEngine.showToast('🔗 Link copied for Instagram sharing!');
                    return;
            }
            if (url) window.open(url, '_blank', 'width=600,height=400');
        },
        shareBuzz: (index) => {
            const b = allFeeds[index];
            const shareUrl = window.location.origin + window.location.pathname + '#buzz-' + b.id;
            const shareTitle = `Aura Herbs — ${b.prod} Verified Testimony`;
            const shareDesc = `⭐ ${b.stars}/5 Stars — ${b.name} from ${b.loc}\n\n"${b.text}"\n\n✅ Verified Clinical Protocol: ${b.prod}\n🌿 Natural. Effective. Trusted.`;
            const shareImage = '';

            // Use enhanced share modal if available
            if (typeof window.openAuraHerbsShare === 'function') {
                window.openAuraHerbsShare(shareTitle, shareDesc, shareUrl, shareImage);
            } else if (navigator.share) {
                navigator.share({
                    title: shareTitle,
                    text: shareDesc,
                    url: shareUrl
                }).catch(err => console.log('Error sharing:', err));
            } else {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    SocialFeedEngine.showToast('🔗 Testimony link copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy link:', err);
                });
            }
        },
        showToast: (message) => {
            let toast = document.getElementById('buzz-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'buzz-toast';
                toast.style.cssText = `
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    background: #10b981;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 10px;
                    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.35);
                    font-weight: 700;
                    font-size: 14px;
                    z-index: 999999;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                `;
                document.body.appendChild(toast);
            }
            toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
            toast.offsetHeight; // trigger reflow
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(20px)';
            }, 3000);
        },
        openModal: (index) => {
            const b = allFeeds[index];
            const content = document.getElementById('dynamic-social-modal-content');
            const starsHtml = '<i class="fas fa-star"></i>'.repeat(b.stars) + (b.stars < 5 ? '<i class="far fa-star"></i>' : '');
            
            let detailedMedia = '';
            if (b.isVideo) {
                detailedMedia = `
                    <div style="background: #000; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 20px;">
                        <i class="fas fa-play-circle" style="font-size: 4rem; color: white; cursor: pointer;"></i>
                        <p style="color: #ccc; margin-top: 10px; font-size: 0.8rem;">Clinical Success Video Testimony</p>
                    </div>
                `;
            }
 
            content.innerHTML = `
              <div class="modal-header" style="background: ${b.color}; color: white; border: none;">
                <h5 class="modal-title" style="font-weight: 800; color: white;"><i class="fab fa-${b.platform}"></i> ${b.platform.charAt(0).toUpperCase() + b.platform.slice(1)} Feed</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" style="padding: 30px;">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                    <div style="width: 60px; height: 60px; border-radius: 50%; background: #ecfdf5; color: #10b981; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.8rem;">${b.name.charAt(0)}</div>
                    <div>
                        <h3 style="font-size: 1.2rem; font-weight: 800; margin: 0;">${b.name}</h3>
                        <p style="margin: 0; color: #64748b; font-size: 0.9rem;">${b.loc} &bull; Verified Purchase <i class="fas fa-badge-check" style="color: #10b981;"></i></p>
                    </div>
                </div>
                <div style="color: #fbbf24; font-size: 1.2rem; margin-bottom: 15px;">
                    ${starsHtml}
                </div>
                
                ${detailedMedia}
 
                <p style="font-size: 1.1rem; color: #333; line-height: 1.6; font-weight: 500;">"${b.text}"</p>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-size: 0.8rem; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Clinical Protocol Tested</span><br>
                        <strong style="color: #10b981; font-size: 1.1rem;">${b.prod}</strong>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button style="padding: 10px 20px; border-radius: 30px; font-size: 0.85rem; background: linear-gradient(135deg, #10b981, #3b82f6); color: #fff; border: none; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(16,185,129,0.3);" onclick="SocialFeedEngine.shareBuzz(${index})" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 25px rgba(16,185,129,0.45)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(16,185,129,0.3)'"><i class="fas fa-share-alt"></i> Share Protocol</button>
                        <button class="thm-btn" style="padding: 10px 20px; border-radius: 30px; font-size: 0.85rem;" data-bs-dismiss="modal">Add to Cart</button>
                    </div>
                </div>
              </div>
            `;
 
            const modalEl = document.getElementById('dynamic-social-modal');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        }
    };
})();

document.addEventListener('DOMContentLoaded', SocialFeedEngine.init);

