document.addEventListener('DOMContentLoaded', () => {
    // Story Data
    const stories = [
        { name: 'David S.', img: 'testimony.jpg', type: 'image' },
        { name: 'Success Story', img: 'Achievements.jpg', type: 'image' },
        { name: 'Clinical Info', img: 'Roadmap.jpg', type: 'image' },
        { name: 'Dr. Jane', img: 'avatar.png', type: 'image' },
        { name: 'Protocol A', img: 'Reishi.jpeg', type: 'image' },
        { name: 'Protocol B', img: 'revive.jpg', type: 'image' },
        { name: 'Community', img: 'community-hero.png', type: 'image' },
        { name: 'Trending', img: 'social-buzz.png', type: 'image' }
    ];

    console.log("Social JS Initializing...");
    const storyBars = document.querySelectorAll('.Kedi-story-bar');
    if (storyBars.length > 0) {
        console.log(`Found ${storyBars.length} story bar containers`);
        storyBars.forEach(storyBar => {
            stories.forEach(story => {
                const item = document.createElement('div');
                item.className = 'story-item';
                item.innerHTML = `
                    <div class="story-circle">
                        <img src="${story.img}" alt="${story.name}">
                    </div>
                    <div class="story-name">${story.name}</div>
                `;
                item.onclick = () => openStory(story);
                storyBar.appendChild(item);
            });
        });
    } else {
        console.warn("No .Kedi-story-bar-container found");
    }

    // Success Grid Data
    const successItems = [
        { title: 'Arthritis Relief', img: '7 layer sanitary pad.jpg' },
        { title: 'Immune Boost', img: 'reishi.jpg' },
        { title: 'Vitality', img: 'revive.jpg' },
        { title: 'Digestive Health', img: 'colon tea.jpg' },
        { title: 'Liver Care', img: 'Cardibetter.jpg' },
        { title: 'Blood Sugar Support', img: 'lycovite.jpg' },
        { title: 'Prostate Health', img: 'Prosclick prostate.jpg' },
        { title: 'Kidney Support', img: 'Achievements.jpg' },
        { title: 'Respiratory Care', img: 'Reishi.jpeg' },
        { title: 'Joint Mobility', img: 'revive.jpg' },
        { title: 'Heart Health', img: 'Cardibetter.jpg' },
        { title: 'Energy Support', img: 'lycovite.jpg' },
        { title: 'Immune Boost', img: 'reishi.jpg' },
        { title: 'Vitality', img: 'Revive.jpeg' },
        { title: 'Digestive Health', img: 'colon tea.jpg' },
        { title: 'Liver Care', img: 'Cardibetter.jpg' },
        { title: 'Blood Sugar Support', img: 'lycovite.jpg' },
        { title: 'Prostate Health', img: 'Prostate.jpg' },
        { title: 'Kidney Support', img: 'Achievements.jpg' },
        { title: 'Respiratory Care', img: 'Reishi.jpeg' },
        { title: 'Joint Mobility', img: 'revive.jpg' },
        { title: 'Heart Health', img: 'Cardibetter.jpg' },
        { title: 'Energy Support', img: 'lycovite.jpg' },
        { title: 'Immune Boost', img: 'reishi.jpg' },
        { title: 'Vitality', img: 'Revive.jpeg' },
        { title: 'Digestive Health', img: 'colon tea.jpg' },
        { title: 'Liver Care', img: 'Cardibetter.jpg' },

    ];

    // 4x4 Pagination for Community Buzz (Success Grid)
    const SUCCESS_ITEMS_PER_PAGE = 16;
    let currentSuccessPage = 1;

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function generateMockSuccessItems(count) {
        const pool = [
            { title: 'Arthritis Relief', img: '7 layer sanitary pad.jpg', likes: 843 },
            { title: 'Metabolic Balance', img: 'Gumcare.jpg', likes: 512 },
            { title: 'Immune Defense', img: 'Achievements.jpg', likes: 1204 },
            { title: 'Vitality Restored', img: 'Cardibetter.jpg', likes: 677 },
            { title: 'Digestive Health', img: 'Roadmap.jpg', likes: 398 },
            { title: 'Heart Vitality', img: 'lycovite.jpg', likes: 921 },
            { title: 'Energy Boost', img: 'Achievements.jpg', likes: 445 },
            { title: 'Skin Restoration', img: 'reishi.jpg', likes: 763 },
            { title: 'Joint Mobility', img: 'revive.jpg', likes: 532 },
            { title: 'Sleep Harmony', img: 'colon tea.jpg', likes: 289 },
            { title: 'Prostate Support', img: 'Cardibetter.jpg', likes: 614 },
            { title: 'Kidney Care', img: 'Reishi.jpeg', likes: 487 },
            { title: 'Blood Sugar Control', img: 'lycovite.jpg', likes: 1102 },
            { title: 'Liver Detox', img: 'Achievements.jpg', likes: 334 },
            { title: 'Respiratory Care', img: 'Reishi.jpeg', likes: 578 },
            { title: 'Foundation Protocol', img: 'Roadmap.jpg', likes: 892 },
            { title: 'Colon Cleanse', img: 'colon tea.jpg', likes: 441 },
            { title: 'Cardiovascular Health', img: 'Cardibetter.jpg', likes: 756 },
            { title: 'Hormonal Balance', img: '7 layer sanitary pad.jpg', likes: 623 },
            { title: 'Weight Management', img: 'Gumcare.jpg', likes: 1387 },
            { title: 'Bone Density', img: 'lycovite.jpg', likes: 219 },
            { title: 'Nerve Support', img: 'revive.jpg', likes: 348 },
            { title: 'Eye Health', img: 'Achievements.jpg', likes: 492 },
            { title: 'Hair & Skin Glow', img: 'Gumcare.jpg', likes: 1056 },
            { title: 'Anti-Ageing Protocol', img: 'reishi.jpg', likes: 874 },
            { title: 'Stress Relief', img: 'revive.jpg', likes: 667 },
            { title: 'Gut Microbiome Reset', img: 'colon tea.jpg', likes: 329 },
        ];
        const items = [];
        while (items.length < count) {
            items.push(...pool.map(p => ({ ...p })));
        }
        return shuffle(items.slice(0, count));
    }

    const allSuccessItems = generateMockSuccessItems(1000);

    function renderSuccessGrid(page) {
        const grid = document.getElementById('success-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const start = (page - 1) * SUCCESS_ITEMS_PER_PAGE;
        const end = start + SUCCESS_ITEMS_PER_PAGE;
        const pageItems = allSuccessItems.slice(start, end);

        pageItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'grid-item';
            
            // Add 5 star rating
            let stars = '';
            for (let i = 0; i < 5; i++) {
                stars += getStarSVG(true);
            }

            div.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="grid-overlay">
                    <div class="grid-overlay-content">
                        <div class="mb-1" style="display:flex; gap:2px; color:#f59e0b;">
                            ${stars}
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="margin-bottom:4px;display:block"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke-linecap="round"></line></svg>
                        <span>${item.title}</span>
                        <div class="grid-stats mt-2">
                            ${getHeartSVG()} ${item.likes.toLocaleString()}
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(div);
        });

        setupSuccessPagination(page);
    }

    function setupSuccessPagination(activePage) {
        const container = document.getElementById('community-pagination');
        if (!container) return;

        container.innerHTML = '';
        const totalPages = Math.ceil(allSuccessItems.length / SUCCESS_ITEMS_PER_PAGE);
        const maxVisible = 5;

        let start = Math.max(1, activePage - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);
        if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

        const prev = document.createElement('button');
        prev.className = `page-btn ${activePage === 1 ? 'disabled' : ''}`;
        prev.innerHTML = '&#8592;';
        prev.onclick = () => { if (activePage > 1) { currentSuccessPage--; renderSuccessGrid(currentSuccessPage); scrollToGrid('success-grid'); } };
        container.appendChild(prev);

        for (let i = start; i <= end; i++) {
            const btn = document.createElement('button');
            btn.className = `page-btn ${i === activePage ? 'active' : ''}`;
            btn.innerText = i;
            btn.onclick = () => { currentSuccessPage = i; renderSuccessGrid(i); scrollToGrid('success-grid'); };
            container.appendChild(btn);
        }

        const next = document.createElement('button');
        next.className = `page-btn ${activePage === totalPages ? 'disabled' : ''}`;
        next.innerHTML = '&#8594;';
        next.onclick = () => { if (activePage < totalPages) { currentSuccessPage++; renderSuccessGrid(currentSuccessPage); scrollToGrid('success-grid'); } };
        container.appendChild(next);
    }

    function scrollToGrid(id) {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
    }

    console.log("Rendering Success Grid...");
    renderSuccessGrid(currentSuccessPage);

    // 4x4 Pagination System for Patient Experiences
    const ITEMS_PER_PAGE = 16;
    let currentSocialPage = 1;

    function generateMockPosts(count) {
        const pool = [
            { user: 'Dr. Ade', platform: 'instagram', img: 'Reishi.png', comment: 'Protocol showing amazing results! #ClinicalSuccess', rating: 5 },
            { user: 'Sarah J.', platform: 'twitter', img: 'DIAWELL.png', comment: '3 weeks on this and I feel transformed. #KediCares', rating: 5 },
            { user: 'Mike T.', platform: 'facebook', img: 'Revive.png', comment: 'Energy levels are at an all-time high. ⚡', rating: 4 },
            { user: 'LagosDoc', platform: 'instagram', img: 'testimony.jpg', comment: "Best clinical guidance I've received. ✨", rating: 5 },
            { user: 'FitLife_NG', platform: 'twitter', img: 'colon tea.jpg', comment: 'Natural and effective. Highly recommend.', rating: 4 },
            { user: 'Health_First', platform: 'facebook', img: 'Reishi.png', comment: 'My metabolic health has never been better.', rating: 5 },
            { user: 'Grace_A', platform: 'instagram', img: 'DIAWELL.png', comment: 'Safe and scientifically backed. Love it!', rating: 5 },
            { user: 'Daniel_K', platform: 'twitter', img: 'Revive.png', comment: 'Great results in such a short time.', rating: 4 },
            { user: 'Kedi_Labs', platform: 'facebook', img: 'Achievements.jpg', comment: 'Verified by our in-house clinical team. Remarkable efficacy.', rating: 5 },
            { user: 'BioLab_NG', platform: 'instagram', img: 'Cardibetter.jpg', comment: 'Blood pressure normalised in 6 weeks. #KediWorks', rating: 5 },
            { user: 'Nurse_Amaka', platform: 'facebook', img: 'lycovite.jpg', comment: 'Recommending this to all my patients now.', rating: 5 },
            { user: 'Dr. Chukwu', platform: 'twitter', img: 'Reishi.png', comment: 'Immune protocol is solid. Evidence-backed. 👍', rating: 5 },
            { user: 'AuraFan_01', platform: 'instagram', img: 'revive.jpg', comment: 'Sleeping better than I have in years! 😴', rating: 4 },
            { user: 'Victor_O', platform: 'facebook', img: 'Roadmap.jpg', comment: 'The Pi payment option is brilliant. So convenient.', rating: 4 },
            { user: 'Mama_Bisi', platform: 'instagram', img: 'colon tea.jpg', comment: 'Colon cleanse protocol changed my digestion completely.', rating: 5 },
            { user: 'Dr. Emeka', platform: 'twitter', img: 'DIAWELL.png', comment: 'Diawell is now part of my T2D management protocol.', rating: 5 },
            { user: 'Wellness_NG', platform: 'facebook', img: 'Achievements.jpg', comment: 'Finally a brand that walks the talk. 💯', rating: 5 },
            { user: 'FaithH_', platform: 'instagram', img: 'Gumcare.jpg', comment: 'Gum health improved massively in 2 weeks!', rating: 4 },
            { user: 'ClinicalNg', platform: 'twitter', img: 'lycovite.jpg', comment: 'Lycovite antioxidant load is exceptional. Clinical grade.', rating: 5 },
            { user: 'Tunde_Fit', platform: 'facebook', img: 'Revive.png', comment: 'Re-Vive is real. Stamina and energy through the roof.', rating: 5 },
        ];
        const posts = [];
        while (posts.length < count) {
            posts.push(...pool.map(p => ({ ...p, likes: Math.floor(Math.random() * 400) + 50, comments: Math.floor(Math.random() * 80) + 5 })));
        }
        return shuffle(posts.slice(0, count));
    }

    const allSocialPosts = generateMockPosts(1000);

    
    function getPlatformSVG(platform) {
        if (platform === 'instagram') {
            return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#e1306c" stroke-width="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#e1306c" stroke-width="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#e1306c" stroke-width="2" stroke-linecap="round"/></svg>`;
        } else if (platform === 'twitter') {
            return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="#1DA1F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        } else {
            return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#4267B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        }
    }
    function getHeartSVG() {
        return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    }
    function getCommentSVG() {
        return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
    }
    function getStarSVG(filled) {
        return filled
            ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b" stroke="#d97706" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
            : `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }
    function getWhatsAppSVG() {
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
    }
    function getFBShareSVG() {
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`;
    }
    function getInstagramShareSVG() {
        return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;
    }
    function getLinkedInShareSVG() {
        return `<svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`;
    }
    function getTwitterShareSVG() {
        return `<svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`;
    }

    function renderSocialPosts(page) {
        const postsGrid = document.getElementById('dynamic-social-feed-grid');
        if (!postsGrid) return;

        postsGrid.innerHTML = '';
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const pageItems = allSocialPosts.slice(start, end);

        pageItems.forEach(post => {
            const card = document.createElement('div');
            card.className = 'social-post-card';
            let stars = ''; for (let i = 0; i < 5; i++) { stars += getStarSVG(i < post.rating); }

            card.innerHTML = `
                <div class="post-card-header">
                    <div class="user-info">
                        <div class="user-avatar-small">${post.user.charAt(0)}</div>
                        <span class="user-name-small">${post.user}</span>
                    </div>
                    ${getPlatformSVG(post.platform)}
                </div>
                <div class="post-card-img-wrap">
                    <img src="${post.img}" alt="">
                </div>
                <div class="post-card-body">
                    <div class="post-card-rating mb-1" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px;">
                        <div>${stars}</div>
                        <span style="font-size: 9px; background: #ecfdf5; color: #10b981; padding: 2px 6px; border-radius: 30px; font-weight: 700; display: inline-flex; align-items: center; gap: 3px; border: 1px solid #a7f3d0;"><i class="fas fa-check-circle"></i> Verified Review</span>
                    </div>
                    <p class="post-card-comment">"${post.comment}"</p>
                    <div class="post-card-footer mt-2 ul_li_between" style="flex-wrap: wrap; gap: 10px;">
                        <div class="post-stats">
                            <span>${getHeartSVG()} ${post.likes.toLocaleString()}</span>
                            <span class="ml-2">${getCommentSVG()} ${post.comments}</span>
                        </div>
                        <div class="post-share-actions" style="display: flex; align-items: center; gap: 4px;">
                            <button onclick="sharePost('${post.user.replace(/'/g, "\\'")}', '${post.comment.replace(/'/g, "\\'")}', 'whatsapp')" class="share-btn whatsapp" style="border: none; background: #25d366; color: #fff; width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; cursor: pointer; transition: all 0.2s;" title="Share on WhatsApp">${getWhatsAppSVG()}</button>
                            <button onclick="sharePost('${post.user.replace(/'/g, "\\'")}', '${post.comment.replace(/'/g, "\\'")}', 'facebook')" class="share-btn facebook" style="border: none; background: #1877f2; color: #fff; width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; cursor: pointer; transition: all 0.2s;" title="Share on Facebook">${getFBShareSVG()}</button>
                            <button onclick="sharePost('${post.user.replace(/'/g, "\\'")}', '${post.comment.replace(/'/g, "\\'")}', 'twitter')" class="share-btn twitter" style="border: none; background: #0f1419; color: #fff; width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; cursor: pointer; transition: all 0.2s;" title="Share on Twitter / X">${getTwitterShareSVG()}</button>
                            <button onclick="sharePost('${post.user.replace(/'/g, "\\'")}', '${post.comment.replace(/'/g, "\\'")}', 'linkedin')" class="share-btn linkedin" style="border: none; background: #0077b5; color: #fff; width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; cursor: pointer; transition: all 0.2s;" title="Share on LinkedIn">${getLinkedInShareSVG()}</button>
                            <button onclick="sharePost('${post.user.replace(/'/g, "\\'")}', '${post.comment.replace(/'/g, "\\'")}', 'instagram')" class="share-btn instagram" style="border: none; background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045); color: #fff; width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; cursor: pointer; transition: all 0.2s;" title="Share on Instagram">${getInstagramShareSVG()}</button>
                        </div>
                    </div>
                </div>
            `;
            postsGrid.appendChild(card);
        });

        setupPagination(page);
    }

    function setupPagination(activePage) {
        const paginationContainer = document.getElementById('social-pagination-controls');
        if (!paginationContainer) return;

        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(allSocialPosts.length / ITEMS_PER_PAGE);
        const maxVisiblePages = 5;

        let startPage = Math.max(1, activePage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.className = `page-btn ${activePage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '&#8592;';
        prevBtn.onclick = () => { if (activePage > 1) { currentSocialPage--; renderSocialPosts(currentSocialPage); window.scrollTo({ top: document.getElementById('dynamic-social-feed-grid').offsetTop - 100, behavior: 'smooth' }); } };
        paginationContainer.appendChild(prevBtn);

        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.className = `page-btn ${i === activePage ? 'active' : ''}`;
            btn.innerText = i;
            btn.onclick = () => {
                currentSocialPage = i;
                renderSocialPosts(i);
                window.scrollTo({ top: document.getElementById('dynamic-social-feed-grid').offsetTop - 100, behavior: 'smooth' });
            };
            paginationContainer.appendChild(btn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = `page-btn ${activePage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = '&#8594;';
        nextBtn.onclick = () => { if (activePage < totalPages) { currentSocialPage++; renderSocialPosts(currentSocialPage); window.scrollTo({ top: document.getElementById('dynamic-social-feed-grid').offsetTop - 100, behavior: 'smooth' }); } };
        paginationContainer.appendChild(nextBtn);
    }

    console.log("Rendering Patient Experience Social Posts...");
    renderSocialPosts(currentSocialPage);

    // Global Sharing Function
    window.sharePost = (user, comment, platform) => {
        // Use production URL for sharing as social platforms do not support local file:// links
        const baseUrl = "https://Kedicares.clinical/home-3.html";
        const text = encodeURIComponent(`Check out this clinical success story from Kedi Cares! ${user}: "${comment}"`);
        let shareUrl = "";

        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${text}%20${encodeURIComponent(baseUrl)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseUrl)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(baseUrl)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(baseUrl)}`;
                break;
            case 'instagram':
                navigator.clipboard.writeText(baseUrl);
                alert('Testimony link copied for Instagram sharing!');
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    // Modal Logic (Global for stories)
    const modal = document.getElementById('story-modal');
    const modalContent = document.getElementById('modal-media-content');

    window.openStory = (story) => {
        if (!modal || !modalContent) return;
        modal.classList.add('active');
        if (story.type === 'image') {
            modalContent.innerHTML = `<img src="${story.img}" alt="${story.name}">`;
        } else {
            modalContent.innerHTML = `<video src="${story.video}" autoplay controls></video>`;
        }
    };

    window.closeStory = () => {
        if (!modal || !modalContent) return;
        modal.classList.remove('active');
        modalContent.innerHTML = '';
    };
});
