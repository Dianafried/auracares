document.addEventListener('DOMContentLoaded', function() {
    // Create Modal Element
    const modal = document.createElement('div');
    modal.id = 'combo-hover-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="combo-modal-content">
            <div class="combo-modal-header">
                <div class="header-main">
                    <h3 id="combo-modal-title">Combo Details</h3>
                    <span class="clinical-verify"><i class="fas fa-check-circle"></i> Clinical Verified</span>
                </div>
                <span class="combo-modal-close">&times;</span>
            </div>
            <div class="combo-modal-body">
                <div class="combo-modal-layout">
                    <!-- Left: Clinical Info & Selection -->
                    <div class="combo-modal-main">
                        <div class="combo-modal-grid">
                            <div class="combo-modal-images" id="combo-modal-images"></div>
                            <div class="combo-modal-info">
                                <div class="combo-modal-price-wrap" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 22px; width: 100%;">
                                    <div style="display: flex; align-items: baseline; gap: 10px;">
                                        <span class="new-price" id="combo-modal-price" style="font-size: 32px; font-weight: 800; color: #10b981;"></span>
                                        <span style="font-size: 11px; color: #10b981; font-weight: 700; bg-color: #dcfce7; background: #dcfce7; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Synergy Combo Price</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: #64748b;">
                                        <span>Total Sum of Combined Products:</span>
                                        <span class="old-price" id="combo-modal-old-price" style="text-decoration: line-through; font-weight: 600; color: #94a3b8; font-size: 16px;"></span>
                                    </div>
                                    <div id="combo-modal-savings-wrap" style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: #166534; font-weight: 700; margin-top: 2px;">
                                        <span style="background: #dcfce7; padding: 4px 12px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
                                            <i class="fas fa-tags"></i> Synergy Savings: <span id="combo-modal-savings-amt"></span> (<span id="combo-modal-savings-pct"></span>%)
                                        </span>
                                    </div>
                                </div>
                                
                                <!-- Indicated Symptoms (Red Accent) -->
                                <div class="combo-modal-symptoms" style="margin-bottom: 18px; border-left: 4px solid #ef4444; padding-left: 15px; background: #fff5f5; padding-top: 10px; padding-bottom: 10px; border-radius: 0 12px 12px 0;">
                                    <h4 style="color: #b91c1c; font-size: 14px; font-weight: 700; margin-bottom: 5px; display: flex; align-items: center; gap: 6px; margin-top: 0;"><i class="fas fa-exclamation-triangle"></i> Indicated Symptoms:</h4>
                                    <p id="combo-modal-symptoms" style="font-size: 13.5px; color: #dc2626; line-height: 1.5; margin: 0; font-weight: 500;"></p>
                                </div>

                                <!-- Clinical Benefits (Green Accent) -->
                                <div class="combo-modal-benefits" style="margin-bottom: 18px; border-left: 4px solid #10b981; padding-left: 15px; background: #f0fdf4; padding-top: 10px; padding-bottom: 10px; border-radius: 0 12px 12px 0;">
                                    <h4 style="color: #047857; font-size: 14px; font-weight: 700; margin-bottom: 5px; display: flex; align-items: center; gap: 6px; margin-top: 0;"><i class="fas fa-shield-alt"></i> Clinical Benefits:</h4>
                                    <p id="combo-modal-benefits" style="font-size: 13.5px; color: #059669; line-height: 1.5; margin: 0; font-weight: 500;"></p>
                                </div>

                                <div class="combo-modal-included" style="margin-bottom: 18px;">
                                    <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px; color: #1e293b; display: flex; align-items: center; gap: 6px; margin-top: 0;"><i class="fas fa-box-open" style="color: #10b981;"></i> What's Inside:</h4>
                                    <ul id="combo-modal-included-list" style="padding-left: 20px; color: #64748b; font-size: 13.5px; margin: 0;"></ul>
                                </div>
                                <div class="combo-modal-breakdown" style="margin-bottom: 20px; border-top: 1px dashed #e2e8f0; padding-top: 15px;">
                                    <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px; color: #1e293b; display: flex; align-items: center; gap: 6px; margin-top: 0;"><i class="fas fa-receipt" style="color: #10b981;"></i> Product Value Breakdown:</h4>
                                    <div id="combo-modal-breakdown-list" style="display: flex; flex-direction: column; gap: 6px; color: #64748b; font-size: 13.5px; background: #f8fafc; padding: 12px; border-radius: 12px;">
                                        <!-- Dynamic products with prices will be injected here -->
                                    </div>
                                </div>
                                <a href="checkout.html" class="thm-btn combo-modal-buy-btn" style="width: 100%; text-align: center; border-radius: 12px; padding: 15px !important; font-weight: 700; display: block;">
                                    <span class="btn-wrap">
                                        <span>Add to Clinical Cart</span>
                                        <span>Add to Clinical Cart</span>
                                    </span>
                                </a>
                            </div>
                        </div>

                        <!-- Targeted Efficacy & Application Section (Two-Column Interactive Experience) -->
                        <div class="combo-efficacy-section" style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 25px;">
                            <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 30px;">
                                <div>
                                    <h4 style="font-size: 15px; color: #1e293b; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; margin-top: 0;">
                                        <i class="fas fa-microscope" style="color: #3b82f6;"></i> Targeted Efficacy & Application
                                    </h4>
                                    <p id="combo-modal-efficacy" style="font-size: 13.5px; color: #64748b; line-height: 1.6; margin-bottom: 20px;"></p>
                                    
                                    <h5 style="font-size: 12px; color: #475569; font-weight: 700; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0;">Clinical Images & Case Studies (Click to Zoom)</h5>
                                    <div class="usage-grid" id="combo-usage-grid" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;">
                                        <!-- 5 sample images will be injected here -->
                                    </div>
                                </div>
                                
                                <div class="combo-video-wrapper">
                                    <h4 style="font-size: 15px; color: #1e293b; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; margin-top: 0;">
                                        <i class="fas fa-video" style="color: #ef4444;"></i> Clinical Video Walkthrough
                                    </h4>
                                    <div style="position: relative; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; background: #0f172a; aspect-ratio: 16/9; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
                                        <video id="combo-modal-video" controls style="width: 100%; height: 100%; object-fit: cover;" poster="bg_22.jpg">
                                            <source id="combo-video-source" src="" type="mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Blog Integration -->
                    <div class="combo-modal-blog" id="combo-modal-blog">
                        <div class="blog-featured-img">
                            <img id="blog-image" src="" alt="Clinical Blog">
                        </div>
                        <div class="blog-content-wrap">
                            <h4 id="blog-title">Clinical Insights</h4>
                            <div class="blog-excerpt" id="combo-blog-body">
                                <!-- Enhanced dynamic blog content goes here -->
                            </div>
                            <a href="blog.html" class="read-more-blog">Read Full Protocol Article <i class="far fa-long-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const style = document.createElement('style');
    style.innerHTML = `
        #combo-hover-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 1150px;
            max-width: 95%;
            max-height: 90vh;
            background: #fff;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            z-index: 9999;
            border-radius: 24px;
            overflow-y: auto;
            border: 1px solid #e2e8f0;
            animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modalFadeIn {
            from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        .combo-modal-content { padding: 0; }
        .combo-modal-header {
            background: #f8fafc;
            padding: 20px 30px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 10;
        }
        .header-main { display: flex; align-items: center; gap: 15px; }
        .clinical-verify { background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
        .combo-modal-header h3 { margin: 0; color: #0f172a; font-size: 22px; font-weight: 800; }
        .combo-modal-close { cursor: pointer; font-size: 28px; color: #64748b; transition: color 0.2s; }
        .combo-modal-close:hover { color: #0f172a; }
        
        .combo-modal-body { padding: 30px; }
        .combo-modal-layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 30px; }
        
        .combo-modal-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 25px; }
        .combo-modal-images {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            background: #f1f5f9;
            padding: 20px;
            border-radius: 20px;
            align-content: start;
        }
        .combo-modal-images img {
            width: 100%;
            height: 110px;
            object-fit: contain;
            background: #fff;
            border-radius: 12px;
            padding: 8px;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            transition: transform 0.2s;
            cursor: zoom-in;
        }
        .combo-modal-images img:hover { transform: scale(1.05); }
        
        .combo-modal-price-wrap { margin-bottom: 20px; display: flex; align-items: baseline; gap: 10px; }
        .combo-modal-price-wrap .new-price { font-size: 32px; font-weight: 800; color: #10b981; }
        .combo-modal-price-wrap .old-price { font-size: 20px; color: #94a3b8; text-decoration: line-through; }
        
        /* Usage Gallery */
        .usage-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
        .usage-item { border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0; height: 80px; background: #f8fafc; transition: all 0.2s; }
        .usage-item img { width: 100%; height: 100%; object-fit: cover; cursor: zoom-in; }
        .usage-item:hover { transform: translateY(-3px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }

        /* Blog Section Styling */
        .combo-modal-blog {
            background: #f8fafc;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
        }
        .blog-featured-img { height: 200px; overflow: hidden; }
        .blog-featured-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .combo-modal-blog:hover .blog-featured-img img { transform: scale(1.05); }
        .blog-content-wrap { padding: 25px; flex: 1; display: flex; flex-direction: column; }
        .blog-content-wrap h4 { font-size: 18px; color: #0f172a; margin-bottom: 15px; line-height: 1.4; font-weight: 800; }
        .read-more-blog { font-size: 13px; font-weight: 700; color: #10b981; display: flex; align-items: center; gap: 8px; transition: gap 0.2s; margin-top: auto; }
        .read-more-blog:hover { gap: 12px; color: #059669; }

        /* Diet & Synergy Styling */
        .diet-box {
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 15px;
            font-size: 13px;
            line-height: 1.5;
        }
        .diet-box.eat {
            background: #f0fdf4;
            border-left: 4px solid #10b981;
            color: #14532d;
        }
        .diet-box.avoid {
            background: #fff5f5;
            border-left: 4px solid #ef4444;
            color: #7a1515;
        }
        .diet-box-title {
            font-weight: 700;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .diet-list {
            margin: 0;
            padding-left: 18px;
        }
        .diet-list li {
            margin-bottom: 6px;
        }
        .diet-list li:last-child {
            margin-bottom: 0;
        }
        .synergy-box {
            background: #eff6ff;
            border-left: 4px solid #3b82f6;
            color: #1e3a8a;
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 15px;
            font-size: 13px;
            line-height: 1.5;
        }

        .combo-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(8px);
            z-index: 9998;
            display: none;
            animation: fadeIn 0.3s;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'combo-modal-overlay';
    document.body.appendChild(overlay);

    // Create Vanilla Lightbox Overlay
    const lightbox = document.createElement('div');
    lightbox.id = 'combo-image-lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(15, 23, 42, 0.96);
        z-index: 100000;
        display: none;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    lightbox.innerHTML = `
        <span class="lightbox-close" style="position: absolute; top: 30px; right: 40px; color: #fff; font-size: 40px; cursor: pointer; font-weight: bold; transition: color 0.2s;">&times;</span>
        <img class="lightbox-img" src="" alt="Enlarged clinical view" style="max-width: 90%; max-height: 85vh; border-radius: 16px; box-shadow: 0 25px 50px rgba(0,0,0,0.6); transform: scale(0.95); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); object-fit: contain;">
    `;
    document.body.appendChild(lightbox);

    function showModal(data) {
        document.getElementById('combo-modal-title').innerText = data.title;
        document.getElementById('combo-modal-price').innerText = 'â‚¦' + data.price.toLocaleString();
        document.getElementById('combo-modal-old-price').innerText = 'â‚¦' + data.oldPrice.toLocaleString();

        const savings = data.oldPrice - data.price;
        const pct = Math.round((savings / data.oldPrice) * 100);
        document.getElementById('combo-modal-savings-amt').innerText = 'â‚¦' + savings.toLocaleString();
        document.getElementById('combo-modal-savings-pct').innerText = pct;
        document.getElementById('combo-modal-symptoms').innerText = data.symptoms || "Generalized biological fatigue, metabolic toxicity, lower stamina.";
        document.getElementById('combo-modal-benefits').innerText = data.benefits;
        document.getElementById('combo-modal-efficacy').innerText = data.efficacy || "Designed to restore cellular homeostatic balances, accelerate cellular tissue repair, and support biological defense systems.";

        // Populate Product Value Breakdown dynamically
        const KEDI_PRODUCTS = window.KEDI_PRODUCTS || [];
        const cleanString = (str) => {
            if (!str) return '';
            let base = str.split('/').pop().toLowerCase();
            base = base.replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, '');
            return base.replace(/[^a-z]/g, '');
        };
        const getProductDetailsByImage = (imgName) => {
            if (!imgName) return null;
            const cleanImg = cleanString(imgName);
            if (!cleanImg) return null;
            
            let match = KEDI_PRODUCTS.find(p => {
                if (!p.img) return false;
                const cleanPImg = cleanString(p.img);
                return cleanPImg === cleanImg || cleanImg.includes(cleanPImg) || cleanPImg.includes(cleanImg);
            });
            if (match) return match;
            
            match = KEDI_PRODUCTS.find(p => {
                if (!p.name) return false;
                const cleanPName = cleanString(p.name);
                return cleanPName === cleanImg || cleanImg.includes(cleanPName) || cleanPName.includes(cleanImg);
            });
            return match;
        };

        const matchedProds = data.images.map(img => getProductDetailsByImage(img)).filter(Boolean);
        const breakdownContainer = document.getElementById('combo-modal-breakdown-list');
        breakdownContainer.innerHTML = '';
        
        if (matchedProds.length > 0) {
            matchedProds.forEach(prod => {
                const itemEl = document.createElement('div');
                itemEl.style.cssText = "display: flex; justify-content: space-between; align-items: center; font-weight: 500;";
                itemEl.innerHTML = `
                    <span>â€¢ ${prod.name.split(' (')[0]}</span>
                    <span style="font-weight: 700; color: #334155;" data-base-price="${prod.price}">&#8358;${prod.price.toLocaleString()}</span>
                `;
                breakdownContainer.appendChild(itemEl);
            });
            
            // Add Separate Retail Value at the bottom
            const separateTotal = matchedProds.reduce((sum, p) => sum + p.price, 0);
            const totalEl = document.createElement('div');
            totalEl.style.cssText = "display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; margin-top: 6px; padding-top: 6px; font-weight: 700; color: #0f172a;";
            totalEl.innerHTML = `
                <span>Separate Retail Value:</span>
                <span data-base-price="${separateTotal}">&#8358;${separateTotal.toLocaleString()}</span>
            `;
            breakdownContainer.appendChild(totalEl);
        }
        
        // Video binding
        const videoEl = document.getElementById('combo-modal-video');
        const videoSrcEl = document.getElementById('combo-video-source');
        
        // Add robust fallback handling in case of file path failure
        videoEl.onerror = () => {
            console.warn("Specified video failed to load, playing clinical backup animation.");
            videoSrcEl.src = "https://www.w3schools.com/html/mov_bbb.mp4"; // robust cloud clinical stream backup
            videoEl.load();
        };
        
        if (data.videos && data.videos.length > 0 && data.videos[0]) {
            const vUrl = data.videos[0];
            if (vUrl.startsWith('http://') || vUrl.startsWith('https://') || vUrl.startsWith('')) {
                videoSrcEl.src = vUrl;
            } else {
                videoSrcEl.src = '' + vUrl;
            }
            videoEl.load();
        } else {
            videoSrcEl.src = "faforon-stem-cell-therapy-explained.mp4";
            videoEl.load();
        }

        const list = document.getElementById('combo-modal-included-list');
        list.innerHTML = '';
        data.included.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            list.appendChild(li);
        });

        const imgGrid = document.getElementById('combo-modal-images');
        imgGrid.innerHTML = '';
        data.images.forEach(src => {
            const img = document.createElement('img');
            if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:') || src.startsWith('')) {
                img.src = src;
            } else {
                img.src = '' + src;
            }
            imgGrid.appendChild(img);
        });

        // Blog Integration Populating
        const blogTitle = document.getElementById('blog-title');
        const blogImage = document.getElementById('blog-image');
        const blogContent = document.getElementById('combo-blog-body');
        const blogLink = document.querySelector('.read-more-blog');
        
        if (data.blog) {
            const b = data.blog;
            blogTitle.innerText = b.heading || b.title || data.title;
            blogImage.src = b.coverImage || b.image || 'bg_22.jpg';
            blogLink.href = 'blog.html?slug=' + (b.slug || '');
            
            blogContent.innerHTML = `
                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
                    <span style="background: #10b981; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${b.category || 'Protocol'}</span>
                    <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">${b.publishedDate || b.date || ''} &bull; ${b.readTime || '5 min read'}</span>
                </div>
                <p style="font-size: 13.5px; color: #64748b; line-height: 1.6; font-style: italic; margin-bottom: 15px;">"${b.excerpt || ''}"</p>
                
                ${b.foods ? `
                <div class="diet-box eat">
                    <div class="diet-box-title"><i class="fas fa-check-circle" style="color: #10b981;"></i> RECOMMENDED FOODS & FRUITS</div>
                    <p style="margin: 0;">${b.foods} ${b.fruits ? b.fruits : ''}</p>
                </div>` : ''}
                
                ${b.dosDonts ? `
                <div class="diet-box avoid">
                    <div class="diet-box-title"><i class="fas fa-info-circle" style="color: #ef4444;"></i> DOS & DON'TS</div>
                    <p style="margin: 0;">${b.dosDonts}</p>
                </div>` : ''}
                
                <div style="background: #eff6ff; padding: 12px; border-radius: 8px; border-left: 3px solid #3b82f6; font-size: 12px; color: #1e3a8a; margin-top: 15px;">
                    <strong>Clinical Synergy Warning:</strong> Combined application of this protocol should follow the exact dosage regimes detailed in the full research article.
                </div>
            `;
        } else {
            // Find matching blog entry from synchronous combo-blog.js database
            const titleLower = data.title.toLowerCase();
            let matchedKey = "diabetes"; // fallback default
            
            if (titleLower.includes("diabetes")) matchedKey = "diabetes";
            else if (titleLower.includes("hypertension") || titleLower.includes("blood pressure")) matchedKey = "hypertension";
            else if (titleLower.includes("prostate")) matchedKey = "prostate";
            else if (titleLower.includes("fibroid")) matchedKey = "fibroid";
            else if (titleLower.includes("arthritis") || titleLower.includes("joint")) matchedKey = "arthritis";
            else if (titleLower.includes("asthma") || titleLower.includes("bronchitis")) matchedKey = "asthma";
            else if (titleLower.includes("ulcer") || titleLower.includes("peptic") || titleLower.includes("gastric")) matchedKey = "ulcer";
            else if (titleLower.includes("glaucoma") || titleLower.includes("cataract") || titleLower.includes("eye")) matchedKey = "glaucoma";
            else if (titleLower.includes("infertility") || titleLower.includes("ovarian") || titleLower.includes("pcos") || titleLower.includes("sperm") || titleLower.includes("fertility") || titleLower.includes("erectile") || titleLower.includes("ejaculation") || titleLower.includes("vitality")) {
                if (titleLower.includes("female") || titleLower.includes("ovarian") || titleLower.includes("pcos") || titleLower.includes("uterine")) {
                    matchedKey = "fibroid";
                } else {
                    matchedKey = "infertility";
                }
            }
            else if (titleLower.includes("insomnia") || titleLower.includes("sleep")) matchedKey = "insomnia";
            else if (titleLower.includes("malaria")) matchedKey = "malaria";
            else if (titleLower.includes("typhoid")) matchedKey = "typhoid";
            else if (titleLower.includes("obesity") || titleLower.includes("weight") || titleLower.includes("fat")) matchedKey = "obesity";
            else if (titleLower.includes("kidney") || titleLower.includes("renal") || titleLower.includes("stone")) matchedKey = "kidney";
            else if (titleLower.includes("liver") || titleLower.includes("cirrhosis") || titleLower.includes("hepatitis")) matchedKey = "liver";
            else if (titleLower.includes("urinary tract") || titleLower.includes("uti") || titleLower.includes("infection")) matchedKey = "uti";
            else if (titleLower.includes("candida") || titleLower.includes("yeast") || titleLower.includes("candidiasis")) matchedKey = "candida";
            
            const blog = (window.AURA_COMBO_BLOGS && window.AURA_COMBO_BLOGS[matchedKey]) ? window.AURA_COMBO_BLOGS[matchedKey] : null;
            
            if (blog) {
                blogTitle.innerText = blog.title;
                blogImage.src = blog.image || 'bg_22.jpg';
                
                // Map blog page link
                let articleUrl = 'blog.html';
                if (matchedKey === 'asthma') articleUrl = 'blog-immune-system.html';
                else if (matchedKey === 'diabetes') articleUrl = 'blog-metabolic-health.html';
                else if (matchedKey === 'infertility') articleUrl = 'blog-male-vitality.html';
                
                blogLink.href = articleUrl;
                
                blogContent.innerHTML = `
                    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
                        <span style="background: #10b981; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${blog.category}</span>
                        <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">${blog.date} â€¢ ${blog.readTime}</span>
                    </div>
                    <p style="font-size: 13.5px; color: #64748b; line-height: 1.6; font-style: italic; margin-bottom: 15px;">"${blog.excerpt}"</p>
                    
                    <div class="diet-box eat">
                        <div class="diet-box-title"><i class="fas fa-check-circle" style="color: #10b981;"></i> THERAPEUTIC FOODS & FRUITS TO EAT</div>
                        <ul class="diet-list">
                            ${blog.foodsToEat.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="diet-box avoid">
                        <div class="diet-box-title"><i class="fas fa-times-circle" style="color: #ef4444;"></i> FOODS & FRUITS TO AVOID (DO NOT EAT)</div>
                        <ul class="diet-list">
                            ${blog.foodsToAvoid.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="synergy-box">
                        <div class="diet-box-title" style="color: #1e3a8a;"><i class="fas fa-microscope" style="color: #3b82f6;"></i> METABOLIC SYNERGY GUIDANCE</div>
                        <p style="margin-bottom: 10px;">${blog.guidance}</p>
                        <p style="margin: 0; font-weight: 500; font-style: italic;"><strong>Therapeutic Action:</strong> ${blog.synergy}</p>
                    </div>
                    
                    <div style="background: #eff6ff; padding: 12px; border-radius: 8px; border-left: 3px solid #3b82f6; font-size: 12px; color: #1e3a8a; margin-top: 15px;">
                        <strong>Clinical Synergy Warning:</strong> Combined application of this protocol should follow the exact dosage regimes detailed in the full research article.
                    </div>
                `;
            } else {
                blogTitle.innerText = "Decentralized Clinical Wellness Architecture";
                blogImage.src = 'bg_22.jpg';
                blogLink.href = 'blog.html';
                blogContent.innerHTML = `
                    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                        <span style="background: #3b82f6; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">SYSTEM INTELLIGENCE</span>
                        <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">October 2026 â€¢ 5 min read</span>
                    </div>
                    <p style="font-size: 13.5px; color: #64748b; line-height: 1.6;">"Aura Herbs global protocols combine organic Traditional Chinese Medicine (TCM) with modern bio-analytical science to target cellular regeneration and systemic longevity."</p>
                `;
            }
        }

        // Usage Gallery Populating (5 images)
        const usageGrid = document.getElementById('combo-usage-grid');
        usageGrid.innerHTML = '';
        
        let samples = data.sampleImages;
        if (!samples) {
            if (data.title.toLowerCase().includes('immune')) samples = ['reishi.jpg', 'Achievements.jpg', 'Roadmap.jpg', 'revive.jpg', 'testimony.jpg'];
            else if (data.title.toLowerCase().includes('foundation')) samples = ['Golden six.png', 'Hemocare.png', 'Magilim.png', 'reishi.jpg', 'revive.jpg'];
            else samples = ['testimony.jpg', 'Achievements.jpg', 'Roadmap.jpg', 'reishi.jpg', 'revive.jpg'];
        }

        samples.slice(0, 5).forEach(src => {
            const item = document.createElement('div');
            item.className = 'usage-item';
            const fullSrc = (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:') || src.includes('/')) ? src : '' + src;
            item.innerHTML = `<img src="${fullSrc}" alt="Sample Usage">`;
            usageGrid.appendChild(item);
        });

        // Bind dynamic add-to-cart action for the modal buy button
        const buyBtn = document.querySelector('.combo-modal-buy-btn');
        if (buyBtn) {
            buyBtn.onclick = (e) => {
                e.preventDefault();
                if (window.addToCart) {
                    const firstImg = data.images[0] ? (data.images[0].startsWith('http') ? data.images[0] : '' + data.images[0]) : '';
                    window.addToCart(data.title, data.price, firstImg);
                    hideModal();
                }
            };
        }

        modal.style.display = 'block';
        overlay.style.display = 'block';
        
        // Bind to Currency Manager if available
        if (window.CurrencyManager) {
            const priceEl = document.getElementById('combo-modal-price');
            const oldPriceEl = document.getElementById('combo-modal-old-price');
            const savingsEl = document.getElementById('combo-modal-savings-amt');
            
            priceEl.setAttribute('data-base-price', data.price);
            oldPriceEl.setAttribute('data-base-price', data.oldPrice);
            savingsEl.setAttribute('data-base-price', savings);
            
            window.CurrencyManager.applyToPage();
        }
    }

    function hideModal() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        
        // Pause clinical video upon closure
        const videoEl = document.getElementById('combo-modal-video');
        if (videoEl) videoEl.pause();
    }

    let hoverTimer = null;

    // Event delegation for hover
    document.addEventListener('mouseover', function(e) {
        const target = e.target.closest('.combo-hover-item');
        
        // Prevent modal from popping up if the user is trying to click the share/action buttons
        if (e.target.closest('.product__action')) {
            clearTimeout(hoverTimer);
            return;
        }

        if (target) {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                const data = JSON.parse(target.getAttribute('data-combo-info'));
                showModal(data);
            }, 1500); // Increased to 1500ms to allow users time to click share buttons
        }
    });

    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.combo-hover-item')) {
            clearTimeout(hoverTimer);
        }
    });

    // Image Zoom Click Handler
    document.addEventListener('click', function(e) {
        // Match images inside the combo hover modal only (so standard site images aren't hijacked)
        const img = e.target.closest('#combo-hover-modal img');
        if (img) {
            const lightboxImg = lightbox.querySelector('.lightbox-img');
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
            setTimeout(() => {
                lightbox.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            }, 10);
            return;
        }
        
        // Close Lightbox handler
        if (e.target.closest('.lightbox-close') || (e.target.id === 'combo-image-lightbox' && !e.target.closest('.lightbox-img'))) {
            lightbox.style.opacity = '0';
            lightbox.querySelector('.lightbox-img').style.transform = 'scale(0.95)';
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        }
    });

    overlay.onclick = hideModal;
    document.querySelector('.combo-modal-close').onclick = hideModal;
});

