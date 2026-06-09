/**
 * Kedi Healthcare Community & Social Engine
 * Handles 10,000+ social feeds and dynamic community buzz
 */

/**
 * Kedi Community & Video Engine
 * Centralized logic for Social Proof, Protocol Buzz, and YouTube Video Gallery.
 * 
 * TO ADD VIDEO LINKS: Search for "COMMUNITY_VIDEOS" (around line 280)
 */

const KediCommunity = (() => {
    const names = ["John", "Mary", "Abubakar", "Chidi", "Sarah", "Olu", "Blessing", "Musa", "Nneka", "David", "Grace", "Ibrahim", "Tunde", "Amina", "Efe", "Zainab"];
    const surnames = ["S.", "A.", "O.", "K.", "M.", "B.", "E.", "T.", "N.", "I.", "G.", "U."];
    const locations = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Enugu", "Accra", "Nairobi", "Johannesburg", "London", "New York"];
    const protocols = ["Immune Guard", "Vitality Reset", "Cellular Detox", "Golden Six Protocol", "Cardio Restore", "Jointeez Relief", "Vigor Performance", "Pearl Beauty"];
    const products = ["Reishi", "Revive", "Golden Six", "Cardibetter", "Magilim", "Gastrifort", "Jointeez", "Vigor Essential", "Constilease", "Cordy Active", "Eye Beta"];
    const productImages = ["Reishi.png", "Revive.png", "Golden six.png", "Cardibetter222.png", "Magilim.png", "Gastrifort.png", "Constilease.png", "Cordy Active.png", "Eye Beta.png"];

    const reviews = [
        "Incredible results in just 2 weeks. My energy levels are through the roof!",
        "The best clinical protocol I've ever tried. Highly recommended for daily wellness.",
        "Smooth payment with Pi and fast delivery. Kedi is truly the future of healthcare.",
        "My clinical parameters have improved significantly. Thank you Kedi-J team!",
        "I was skeptical at first, but the results speak for themselves. 5 stars!",
        "Essential part of my morning routine now. Can't imagine life without it.",
        "Quality you can trust. The clinical depth of these protocols is unmatched."
    ];

    // Generate 10,000 Social Feeds procedurally
    const generateSocialFeeds = (count) => {
        const feeds = [];
        for (let i = 0; i < count; i++) {
            const name = names[Math.floor(Math.random() * names.length)];
            const surname = surnames[Math.floor(Math.random() * surnames.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const productIndex = Math.floor(Math.random() * products.length);
            const product = products[productIndex];
            const image = productImages[productIndex % productImages.length];
            const timeValue = Math.floor(Math.random() * 60) + 1;
            const timeUnit = Math.random() > 0.5 ? 'mins' : 'hours';
            const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
            const likes = Math.floor(Math.random() * 800) + 150;

            feeds.push({
                user: `${name} ${surname}`,
                location: location,
                product: product,
                content: `Just received my ${product} shipment in ${location}. Exceptional quality!`,
                review: reviews[Math.floor(Math.random() * reviews.length)],
                time: `${timeValue}${timeUnit} ago`,
                avatar: name[0] + surname[0],
                rating: rating,
                image: `img/product/${image}`,
                likes: likes
            });
        }
        return feeds;
    };

    // Generate 5,000 Buzz items
    const generateBuzzItems = (count) => {
        const buzz = [];
        for (let i = 0; i < count; i++) {
            const name = names[Math.floor(Math.random() * names.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const protocol = protocols[Math.floor(Math.random() * protocols.length)];
            const rating = Math.floor(Math.random() * 2) + 4;
            const image = productImages[Math.floor(Math.random() * productImages.length)];
            const likes = Math.floor(Math.random() * 1200) + 300;

            buzz.push({
                user: name,
                location: location,
                protocol: protocol,
                text: `New ${protocol} activated by ${name} in ${location}`,
                review: "Successfully completed the activation phase. Feeling renewed!",
                rating: rating,
                image: `img/product/${image}`,
                likes: likes
            });
        }
        return buzz;
    };

    // Load admin-curated entries first (set via admin-community.html)
    const _adminFeeds = JSON.parse(localStorage.getItem('kedi_admin_social') || '[]');
    const _adminBuzz = JSON.parse(localStorage.getItem('kedi_admin_buzz') || '[]');

    // Merge: admin entries at the front, auto-generated fill the rest
    const _autoFeeds = generateSocialFeeds(Math.max(0, 10000 - _adminFeeds.length));
    const _autoBuzz = generateBuzzItems(Math.max(0, 5000 - _adminBuzz.length));

    let allFeeds = [..._adminFeeds, ..._autoFeeds];
    let allBuzz = [..._adminBuzz, ..._autoBuzz];
    let currentPage = 1;
    const itemsPerPage = 8;

    const renderFeeds = (page) => {
        const container = document.getElementById('social-feed-container');
        if (!container) return;

        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(130px, 1fr))';
        container.style.gap = '15px';

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = allFeeds.slice(start, end);

        container.innerHTML = pageItems.map((item, index) => `
            <div class="social-proof-small-card" style="background: white; border-radius: 18px; border: 1px solid #eee; cursor: pointer; transition: 0.3s; overflow: hidden; text-align: center; padding-bottom: 12px; position: relative;" 
                 onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 20px rgba(0,0,0,0.08)'" 
                 onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
                 onclick="KediCommunity.openModal('social', ${start + index})">
                <div style="height: 100px; overflow: hidden; background: #fdf8f6;">
                    <img src="${item.image}" style="width: 100%; height: 100%; object-fit: contain; padding: 10px;">
                </div>
                <div style="padding: 10px 5px;">
                    <div style="color: #d4a017; font-size: 0.6rem; margin-bottom: 5px;">
                        ${Array(item.rating).fill('<i class="fas fa-star"></i>').join('')}
                    </div>
                    <h6 style="margin: 0; font-size: 0.65rem; font-weight: 800; color: #4d231c; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.user}</h6>
                    <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 8px; padding-top: 8px; border-top: 1px solid #f8f8f8;">
                        <span style="font-size: 0.6rem; color: #e74c3c; font-weight: 700;"><i class="fas fa-heart"></i> ${item.likes}</span>
                        <div style="display: flex; gap: 4px; opacity: 0.6;">
                            <i class="fab fa-facebook-f" style="font-size: 0.55rem; color: #3b5998;" onclick="event.stopPropagation(); KediCommunity.shareItem('facebook', 'social', ${start + index})"></i>
                            <i class="fab fa-whatsapp" style="font-size: 0.55rem; color: #25D366;" onclick="event.stopPropagation(); KediCommunity.shareItem('whatsapp', 'social', ${start + index})"></i>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        updatePaginationUI();
    };

    const updatePaginationUI = () => {
        const pagination = document.getElementById('social-pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(allFeeds.length / itemsPerPage);
        let html = '';

        html += `<button onclick="KediCommunity.goToPage(1)" class="btn btn-sm ${currentPage === 1 ? 'disabled' : ''}" style="color: #4d231c;"><i class="fas fa-angle-double-left"></i></button>`;
        html += `<button onclick="KediCommunity.goToPage(${currentPage - 1})" class="btn btn-sm ${currentPage === 1 ? 'disabled' : ''}" style="color: #4d231c;"><i class="fas fa-angle-left"></i></button>`;
        html += `<span style="padding: 0 10px; font-weight: 800; color: #d4a017; font-size: 0.7rem;">Page ${currentPage} of ${totalPages}</span>`;
        html += `<button onclick="KediCommunity.goToPage(${currentPage + 1})" class="btn btn-sm ${currentPage === totalPages ? 'disabled' : ''}" style="color: #4d231c;"><i class="fas fa-angle-right"></i></button>`;
        html += `<button onclick="KediCommunity.goToPage(${totalPages})" class="btn btn-sm ${currentPage === totalPages ? 'disabled' : ''}" style="color: #4d231c;"><i class="fas fa-angle-double-right"></i></button>`;

        pagination.innerHTML = html;
    };

    let buzzIndex = 0;
    const initBuzz = () => {
        const buzzContainer = document.getElementById('dynamic-buzz-container');
        if (!buzzContainer) return;

        buzzContainer.style.background = 'transparent';
        buzzContainer.style.border = 'none';
        buzzContainer.style.boxShadow = 'none';
        buzzContainer.style.padding = '0';
        buzzContainer.style.display = 'grid';
        buzzContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        buzzContainer.style.gap = '15px';
        buzzContainer.style.minHeight = '320px';

        const updateBuzzGrid = () => {
            buzzContainer.style.opacity = 0;
            setTimeout(() => {
                const items = [];
                for (let i = 0; i < 4; i++) {
                    items.push(allBuzz[(buzzIndex + i) % allBuzz.length]);
                }

                buzzContainer.innerHTML = items.map((item, i) => `
                    <div class="buzz-card" style="background: white; border-radius: 20px; border: 1px solid #eee; cursor: pointer; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.04); transition: 0.3s;" 
                         onmouseover="this.style.transform='scale(1.03)'" 
                         onmouseout="this.style.transform='scale(1)'"
                         onclick="KediCommunity.openModal('buzz', ${(buzzIndex + i) % allBuzz.length})">
                        <div style="height: 100px; background: #4d231c; display: flex; align-items: center; justify-content: center; position: relative;">
                            <img src="${item.image}" style="width: 75%; height: 75%; object-fit: contain; filter: drop-shadow(0 5px 10px rgba(0,0,0,0.2));">
                        </div>
                        <div style="padding: 12px; text-align: center;">
                            <div style="color: #d4a017; font-size: 0.6rem; margin-bottom: 3px;">
                                ${Array(item.rating).fill('<i class="fas fa-star"></i>').join('')}
                            </div>
                            <h5 style="margin: 0; font-size: 0.75rem; font-weight: 900; color: #4d231c; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.protocol}</h5>
                            <div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 6px;">
                                <span style="font-size: 0.55rem; color: #e74c3c; font-weight: 700;"><i class="fas fa-heart"></i> ${item.likes}</span>
                                <div style="display: flex; gap: 4px; opacity: 0.6;">
                                    <i class="fab fa-facebook-f" style="font-size: 0.5rem; color: #3b5998;" onclick="event.stopPropagation(); KediCommunity.shareItem('facebook', 'buzz', ${(buzzIndex + i) % allBuzz.length})"></i>
                                    <i class="fab fa-whatsapp" style="font-size: 0.5rem; color: #25D366;" onclick="event.stopPropagation(); KediCommunity.shareItem('whatsapp', 'buzz', ${(buzzIndex + i) % allBuzz.length})"></i>
                                    <i class="fab fa-twitter" style="font-size: 0.5rem; color: #1DA1F2;" onclick="event.stopPropagation(); KediCommunity.shareItem('twitter', 'buzz', ${(buzzIndex + i) % allBuzz.length})"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');

                buzzContainer.style.opacity = 1;
                buzzIndex = (buzzIndex + 4) % allBuzz.length;
            }, 500);
        };

        updateBuzzGrid();
        setInterval(updateBuzzGrid, 8000);
    };

    const injectModalStyles = () => {
        if (document.getElementById('kedi-modal-styles')) return;
        const style = document.createElement('style');
        style.id = 'kedi-modal-styles';
        style.innerHTML = `
            .kedi-modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
                display: flex; align-items: center; justify-content: center;
                z-index: 10000; opacity: 0; visibility: hidden; transition: 0.4s;
            }
            .kedi-modal-overlay.active { opacity: 1; visibility: visible; }
            .kedi-card-modal {
                background: white; width: 360px; border-radius: 30px;
                overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.4);
                transform: scale(0.9) translateY(30px); transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative; border: 1px solid rgba(255,255,255,0.2);
            }
            .kedi-modal-overlay.active .kedi-card-modal { transform: scale(1) translateY(0); }
            .kedi-card-image-wrap { background: #4d231c; padding: 40px; text-align: center; }
            .kedi-card-image { width: 150px; height: 150px; object-fit: contain; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.3)); }
            .kedi-card-content { padding: 30px; text-align: center; }
            .kedi-card-rating { color: #d4a017; margin-bottom: 12px; font-size: 1.3rem; }
            .kedi-card-title { font-weight: 900; color: #4d231c; margin-bottom: 8px; font-size: 1.5rem; }
            .kedi-card-location { font-size: 0.85rem; color: #888; margin-bottom: 20px; font-weight: 500; }
            .kedi-card-review { font-size: 1.05rem; line-height: 1.6; color: #444; font-style: italic; background: #fdf8f6; padding: 15px; border-radius: 15px; }
            .kedi-modal-close {
                position: absolute; top: 20px; right: 20px; width: 35px; height: 35px;
                background: rgba(255,255,255,0.2); backdrop-filter: blur(5px); border-radius: 50%; 
                display: flex; align-items: center; justify-content: center; cursor: pointer; 
                color: white; transition: 0.3s; z-index: 10;
            }
            .kedi-modal-close:hover { background: white; color: #4d231c; }
            .modal-social-actions { display: flex; justify-content: center; gap: 15px; margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee; }
            .modal-action-btn { border: none; background: #f8f8f8; padding: 10px 20px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; color: #4d231c; transition: 0.3s; }
            .modal-action-btn:hover { background: #4d231c; color: white; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `;
        document.head.appendChild(style);
    };

    const injectModalHTML = () => {
        if (document.getElementById('kedi-community-modal')) return;
        const modal = document.createElement('div');
        modal.id = 'kedi-community-modal';
        modal.className = 'kedi-modal-overlay';
        modal.onclick = (e) => { if (e.target === modal) KediCommunity.closeModal(); };
        modal.innerHTML = `
            <div class="kedi-card-modal">
                <div class="kedi-modal-close" onclick="KediCommunity.closeModal()"><i class="fas fa-times"></i></div>
                <div class="kedi-card-image-wrap">
                    <img id="kedi-modal-img" class="kedi-card-image" src="" alt="Proof">
                </div>
                <div class="kedi-card-content">
                    <div id="kedi-modal-stars" class="kedi-card-rating"></div>
                    <h3 id="kedi-modal-user" class="kedi-card-title"></h3>
                    <p id="kedi-modal-loc" class="kedi-card-location"></p>
                    <p id="kedi-modal-text" class="kedi-card-review"></p>
                    
                    <div class="modal-social-actions">
                        <button class="modal-action-btn" onclick="alert('Like added!')"><i class="fas fa-heart" style="color: #e74c3c;"></i> <span id="kedi-modal-likes"></span></button>
                        <div style="display: flex; gap: 12px; align-items: center;">
                            <span style="font-size: 0.7rem; color: #888; font-weight: 700;">SHARE:</span>
                            <i class="fab fa-facebook-f" style="cursor: pointer; color: #3b5998;" id="modal-fb-share"></i>
                            <i class="fab fa-whatsapp" style="cursor: pointer; color: #25D366;" id="modal-wa-share"></i>
                            <i class="fab fa-twitter" style="cursor: pointer; color: #1DA1F2;" id="modal-tw-share"></i>
                        </div>
                    </div>

                    <button class="thm-btn thm-btn__2 mt-25" style="width: 100%; border-radius: 50px; height: 55px;" onclick="KediCommunity.closeModal()">Close Experience</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    };

    let activeItem = null;

    const extractYouTubeID = (url) => {
        if (!url) return '';
        // If it's already just an ID (11 chars), return it
        if (url.length === 11 && !url.includes('/') && !url.includes('?')) return url;
        
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : url;
    };

    // --- YOUTUBE COMMUNITY VIDEOS SECTION ---
    // ADD NEW VIDEO LINKS HERE
    const COMMUNITY_VIDEOS = [
        { id: 'https://youtu.be/fKi-DDjWUU8?si=uqshfKBO_BoL_32D', title: 'Official Guide: Kedi Healthcare Products & TCM', author: '@KEDIHEALTHCARE', duration: '08:30', views: '150K', date: '3 weeks ago' },
        { id: 'https://youtu.be/KRHpDDFD-ew', title: 'Kedi Healthcare: Who We Are & Our Global Vision', author: '@KEDIHEALTHCARE', duration: '12:45', views: '250K', date: '1 month ago' },
        { id: 'https://youtu.be/8B_Uv-Xj-qQ', title: 'Global Leadership & Car Award Ceremony Highlights', author: '@KEDIHEALTHCARE', duration: '15:20', views: '89K', date: '2 months ago' },
        { id: 'https://youtu.be/lM02vNMRRB0', title: 'The Science of TCM: Understanding Your Health', author: '@KEDIHEALTHCARE', duration: '12:30', views: '1.2M', date: '1 year ago' },
        { id: 'https://youtu.be/6q_aK7Yx5vU', title: 'Kedi 15th Anniversary: Celebrating Excellence', author: '@KEDIHEALTHCARE', duration: '20:15', views: '550K', date: '5 days ago' },
        { id: 'https://youtu.be/w7nU0pXvIas', title: 'Golden Six Protocol: Restoring Hormonal Balance', author: '@KEDIHEALTHCARE', duration: '11:20', views: '45K', date: '4 months ago' },
        { id: 'https://youtu.be/L_jWHffIx5E', title: 'Jointeez Relief: Natural Support for Bone & Joint', author: '@KEDIHEALTHCARE', duration: '06:45', views: '32K', date: '1 week ago' },
        { id: 'https://youtu.be/7wtfhZwyrcc', title: 'Immune Guard: Strengthening Your Body Defense', author: '@KEDIHEALTHCARE', duration: '10:10', views: '67K', date: '2 days ago' },
        { id: 'https://youtu.be/RgKAFK5djSk', title: 'Vigor Essential: Male Wellness & Performance', author: '@KEDIHEALTHCARE', duration: '14:30', views: '120K', date: '6 months ago' },
        { id: 'https://youtu.be/v2H4l9B3z4s', title: 'Cordy Active: Boost Energy and Brain Health', author: '@KEDIHEALTHCARE', duration: '18:20', views: '280K', date: '1 year ago' },
        { id: 'https://youtu.be/f02mOEt11OQ', title: '90-Day Clinical Transformation Case Study', author: '@KEDIHEALTHCARE', duration: '09:15', views: '15K', date: '1 month ago' },
        { id: 'https://youtu.be/JGwWNGJdvx8', title: 'Cardibetter Success: Managing Heart Health', author: '@KEDIHEALTHCARE', duration: '07:50', views: '18K', date: '3 weeks ago' }
    ];

    let videoPage = 1;
    const videosPerPage = 8;

    const renderVideos = () => {
        const grid = document.getElementById('buzz-video-grid');
        if (!grid) return;

        const start = (videoPage - 1) * videosPerPage;
        const end = start + videosPerPage;
        const paginatedVideos = COMMUNITY_VIDEOS.slice(start, end);

        grid.innerHTML = paginatedVideos.map(video => {
            const videoID = extractYouTubeID(video.id);
            return `
            <div class="col-lg-3 col-md-6">
                <div class="yt-card" style="position: relative;" onclick="KediCommunity.openVideo('${video.id}', this)">
                    <div class="yt-thumb-wrapper">
                        <img src="https://img.youtube.com/vi/${videoID}/mqdefault.jpg" alt="${video.title}">
                        <span class="yt-duration">${video.duration}</span>
                        <div class="yt-play-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <button class="yt-popup-btn" onclick="event.stopPropagation(); KediCommunity.openPopupVideo('${video.id}')" title="Play in Popup">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </button>
                    <div class="yt-info">
                        <div class="yt-avatar">${video.author.charAt(0)}</div>
                        <div class="yt-text">
                            <h3>${video.title}</h3>
                            <div class="yt-meta">
                                <div>${video.author}</div>
                                <div>${video.views} views â€¢ ${video.date}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}).join('');

        renderVideoPagination();
    };

    const renderVideoPagination = () => {
        const container = document.getElementById('buzz-pagination');
        if (!container) return;

        const totalPages = Math.ceil(COMMUNITY_VIDEOS.length / videosPerPage);
        container.innerHTML = `
            <button class="btn-pagination" ${videoPage === 1 ? 'disabled' : ''} onclick="KediCommunity.changeVideoPage(-1)">
                <i class="fas fa-chevron-left"></i> Previous
            </button>
            <span style="color: #94a3b8; font-size: 0.85rem; align-self: center;">Page ${videoPage} of ${totalPages}</span>
            <button class="btn-pagination" ${videoPage === totalPages ? 'disabled' : ''} onclick="KediCommunity.changeVideoPage(1)">
                Next <i class="fas fa-chevron-right"></i>
            </button>
        `;
    };

    const injectVideoModal = () => {
        if (document.getElementById('video-popup-modal')) return;

        // Styles
        const style = document.createElement('style');
        style.innerHTML = `
            .video-popup-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.9); backdrop-filter: blur(10px);
                display: none; align-items: center; justify-content: center; z-index: 10001;
            }
            .video-popup-content {
                width: 90%; max-width: 1000px; aspect-ratio: 16/9; position: relative;
                box-shadow: 0 0 50px rgba(0,0,0,0.5); border-radius: 15px; overflow: hidden;
            }
            .video-popup-close {
                position: absolute; top: -50px; right: 0; color: white; font-size: 30px; cursor: pointer;
            }
            .yt-popup-btn {
                position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.2); 
                border: none; color: white; width: 32px; height: 32px; border-radius: 8px; 
                cursor: pointer; backdrop-filter: blur(5px); z-index: 5; transition: 0.3s;
                display: flex; align-items: center; justify-content: center;
            }
            .yt-popup-btn:hover { background: #ff0000; transform: scale(1.1); }
            .yt-play-overlay {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;
                opacity: 0; transition: 0.3s; font-size: 40px; color: white;
            }
            .yt-card:hover .yt-play-overlay { opacity: 1; }
        `;
        document.head.appendChild(style);

        // HTML
        const modal = document.createElement('div');
        modal.id = 'video-popup-modal';
        modal.className = 'video-popup-overlay';
        modal.innerHTML = `
            <div class="video-popup-content">
                <span class="video-popup-close" onclick="KediCommunity.closePopupVideo()">&times; Close</span>
                <iframe id="popup-iframe" src="" frameborder="0" allowfullscreen style="width: 100%; height: 100%;"></iframe>
            </div>
        `;
        modal.onclick = (e) => { if (e.target === modal) KediCommunity.closePopupVideo(); };
        document.body.appendChild(modal);
    };

    return {
        init: () => {
            renderFeeds(1);
            initBuzz();
            injectModalStyles();
            injectModalHTML();
            injectVideoModal();
            renderVideos();
        },
        goToPage: (p) => {
            const totalPages = Math.ceil(allFeeds.length / itemsPerPage);
            if (p < 1 || p > totalPages) return;
            currentPage = p;
            renderFeeds(p);
        },
        changeVideoPage: (dir) => {
            videoPage += dir;
            renderVideos();
            document.getElementById('buzz-video-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        openVideo: (id, element) => {
            const videoID = extractYouTubeID(id);
            // Find the thumb wrapper in this specific card
            const thumbWrapper = element.querySelector('.yt-thumb-wrapper');
            if (!thumbWrapper) return;

            // Save original HTML to restore later
            if (!thumbWrapper.dataset.original) {
                thumbWrapper.dataset.original = thumbWrapper.innerHTML;
            }

            // Replace with iframe
            thumbWrapper.innerHTML = `
                <iframe src="https://www.youtube.com/embed/${videoID}?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen 
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px;">
                </iframe>
                <button onclick="event.stopPropagation(); KediCommunity.closeInlineVideo(this)" 
                        style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.8); color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; font-size: 14px;">
                    <i class="fas fa-times"></i>
                </button>
            `;

            // Disable the card's main click while playing
            element.style.pointerEvents = 'none';
            thumbWrapper.style.pointerEvents = 'auto'; // Re-enable for iframe/button
        },
        closeInlineVideo: (btn) => {
            const thumbWrapper = btn.closest('.yt-thumb-wrapper');
            const card = btn.closest('.yt-card');
            if (thumbWrapper && thumbWrapper.dataset.original) {
                thumbWrapper.innerHTML = thumbWrapper.dataset.original;
                card.style.pointerEvents = 'auto';
            }
        },
        openPopupVideo: (id) => {
            const videoID = extractYouTubeID(id);
            const modal = document.getElementById('video-popup-modal');
            const iframe = document.getElementById('popup-iframe');
            if (modal && iframe) {
                iframe.src = `https://www.youtube.com/embed/${videoID}?autoplay=1`;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        },
        closePopupVideo: () => {
            const modal = document.getElementById('video-popup-modal');
            const iframe = document.getElementById('popup-iframe');
            if (modal && iframe) {
                iframe.src = '';
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        },
        openModal: (type, index) => {
            const item = type === 'social' ? allFeeds[index] : allBuzz[index];
            activeItem = { type, index, item };
            const modal = document.getElementById('kedi-community-modal');

            document.getElementById('kedi-modal-img').src = item.image;
            document.getElementById('kedi-modal-stars').innerHTML = Array(item.rating).fill('<i class="fas fa-star"></i>').join('') || '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
            document.getElementById('kedi-modal-user').innerText = type === 'social' ? item.user : item.protocol;
            document.getElementById('kedi-modal-loc').innerText = `Verified in ${item.location}`;
            document.getElementById('kedi-modal-text').innerText = `"${item.review}"`;
            document.getElementById('kedi-modal-likes').innerText = item.likes;

            // Update modal share listeners
            document.getElementById('modal-fb-share').onclick = () => KediCommunity.shareItem('facebook', type, index);
            document.getElementById('modal-wa-share').onclick = () => KediCommunity.shareItem('whatsapp', type, index);
            document.getElementById('modal-tw-share').onclick = () => KediCommunity.shareItem('twitter', type, index);

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        },
        closeModal: () => {
            const modal = document.getElementById('kedi-community-modal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            activeItem = null;
        },
        shareItem: (platform, type, index) => {
            const item = type === 'social' ? allFeeds[index] : allBuzz[index];
            const url = window.location.href;
            const text = type === 'social'
                ? `Check out this clinical proof from ${item.user} on Kedi Healthcare!`
                : `New clinical protocol activation: ${item.protocol} by ${item.user}!`;

            if (platform === 'native' && navigator.share) {
                navigator.share({
                    title: 'Kedi Clinical Proof',
                    text: text,
                    url: url
                }).catch(console.error);
                return;
            }

            let shareUrl = '';
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        },
        getFeeds: () => allFeeds,
        getBuzz: () => allBuzz
    };
})();

document.addEventListener('DOMContentLoaded', KediCommunity.init);

