document.addEventListener('DOMContentLoaded', function() {
    const data = window.AURA_COMBO_DATA;
    if (!data) return;

    // Inject Search and Filter Styles
    const searchStyles = `
        .combo-search-container {
            margin-bottom: 25px;
            padding: 0 15px;
        }
        .combo-search-box {
            display: flex;
            align-items: center;
            background: #ffffff;
            border: 2px solid #e2e8f0;
            border-radius: 14px;
            padding: 8px 18px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .combo-search-box:focus-within {
            border-color: #10b981;
            box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.1), 0 4px 6px -2px rgba(16, 185, 129, 0.05);
        }
        .combo-search-input {
            flex: 1;
            border: none;
            outline: none;
            background: transparent;
            font-size: 15px;
            color: #1e293b;
            font-weight: 500;
            padding: 5px 0;
            width: 100%;
        }
        .combo-search-input::placeholder {
            color: #94a3b8;
        }
        .combo-search-icon {
            color: #10b981;
            margin-right: 12px;
            font-size: 17px;
            transition: transform 0.3s ease;
        }
        .combo-search-box:focus-within .combo-search-icon {
            transform: scale(1.1);
        }
        .combo-search-clear {
            cursor: pointer;
            color: #94a3b8;
            font-size: 20px;
            margin-left: 10px;
            transition: color 0.2s;
            display: none;
            font-weight: bold;
        }
        .combo-search-clear:hover {
            color: #ef4444;
        }
        .combo-search-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
            padding: 0 5px;
            min-height: 85px; /* Prevent layout shift during tag paging */
        }
        .combo-search-tag {
            font-size: 11.5px;
            background: #f1f5f9;
            color: #475569;
            padding: 4px 12px;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;
            border: 1px solid transparent;
        }
        .combo-search-tag:hover {
            background: #dcfce7;
            color: #166534;
            border-color: #bbf7d0;
        }
        .tag-pagination-btn {
            padding: 5px 14px;
            font-size: 11px;
            font-weight: 700;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            background: #ffffff;
            color: #475569;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }
        .tag-pagination-btn:hover:not(:disabled) {
            background: #10b981;
            color: #ffffff;
            border-color: #10b981;
            box-shadow: 0 4px 10px rgba(16, 185, 129, 0.25);
        }
        .tag-pagination-btn:disabled {
            opacity: 0.45;
            cursor: not-allowed;
        }
        .tag-pagination-info {
            font-size: 11px;
            font-weight: 700;
            color: #64748b;
            background: #f8fafc;
            padding: 4px 12px;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            display: inline-flex;
            align-items: center;
        }
        .combo-empty-state {
            text-align: center;
            padding: 50px 20px;
            color: #64748b;
            font-size: 15px;
        }
        .combo-empty-state i {
            font-size: 40px;
            color: #cbd5e1;
            margin-bottom: 15px;
            display: block;
        }
        .tx-pagination ul li a.active {
            background: #10b981 !important;
            border-color: #10b981 !important;
            color: #fff !important;
        }
        .tx-pagination ul li a.disabled {
            opacity: 0.4;
            cursor: not-allowed;
            pointer-events: none;
        }
    `;
    const styleEl = document.createElement('style');
    styleEl.innerHTML = searchStyles;
    document.head.appendChild(styleEl);



    // Global Dynamic Search & Page State
    window.AURA_COMBO_STATE = {};
    Object.keys(data).forEach(tabId => {
        window.AURA_COMBO_STATE[tabId] = {
            searchQuery: "",
            currentPage: 1
        };
    });

    function getProductDetailsByImage(imgName) {
        if (!imgName) return null;
        const KEDI_PRODUCTS = window.KEDI_PRODUCTS || [];
        
        // Character-level cleaner to discard paths, extensions, spaces, symbols, and numbers
        const cleanString = (str) => {
            if (!str) return '';
            let base = str.split('/').pop().toLowerCase();
            base = base.replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, '');
            return base.replace(/[^a-z]/g, '');
        };
        
        const cleanImg = cleanString(imgName);
        if (!cleanImg) return null;
        
        // Pass 1: Try exact or partial cleaned image filename matching
        let match = KEDI_PRODUCTS.find(p => {
            if (!p.img) return false;
            const cleanPImg = cleanString(p.img);
            return cleanPImg === cleanImg || cleanImg.includes(cleanPImg) || cleanPImg.includes(cleanImg);
        });
        
        if (match) return match;
        
        // Pass 2: Try matching cleaned image against cleaned clinical product name (e.g. "diawell", "colontea")
        match = KEDI_PRODUCTS.find(p => {
            if (!p.name) return false;
            const cleanPName = cleanString(p.name);
            return cleanPName === cleanImg || cleanImg.includes(cleanPName) || cleanPName.includes(cleanImg);
        });
        
        return match;
    }

    function renderComboCard(item) {
        const matchedProds = item.images.map(img => getProductDetailsByImage(img)).filter(Boolean);
        const separateTotal = matchedProds.length > 0 ? matchedProds.reduce((sum, p) => sum + p.price, 0) : item.oldPrice;
        const synergyTotal = matchedProds.length > 0 ? matchedProds.reduce((sum, p) => sum + (p.member || Math.round(p.price * 0.83)), 0) : item.price;

        const newPriceFmt = synergyTotal.toLocaleString();
        const oldPriceFmt = separateTotal.toLocaleString();
        const comboDataAttr = JSON.stringify({
            title: item.title,
            price: synergyTotal,
            oldPrice: separateTotal,
            images: item.images,
            benefits: item.benefits,
            symptoms: item.symptoms,
            efficacy: item.efficacy,
            videos: item.videos,
            sampleImages: item.sampleImages,
            included: item.included,
            blog: item.blog
        }).replace(/"/g, '&quot;');

        return `
            <div class="col-lg-3 col-md-6 mb-30 combo-item" data-page="${item.page}">
                <div class="product__item style-2 wow fadeInUp combo-hover-item" data-combo-info="${comboDataAttr}" style="border: 1px solid #f1f5f9; border-radius: 20px; transition: all 0.3s;">
                    <div class="product__img text-center pos-rel">
                        <a href="shop-single.html">
                            <div class="product-collage-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px; padding: 10px; background: #f1f5f9; border-radius: 10px;">
                                ${item.images.map(img => {
                                    if (!img) return '';
                                    let src = img;
                                    if (!img.startsWith('http://') && !img.startsWith('https://') && !img.startsWith('data:') && !img.startsWith('')) {
                                        src = 'img/product/' + img;
                                    }
                                    return `<img src="${src}" loading="lazy" alt="P" style="width: 100%; height: 60px; object-fit: contain; background: #fff; border-radius: 5px; padding: 2px;">`;
                                }).join('')}
                            </div>
                        </a>
                        <ul class="product__action style-2 ul_li">
                            <li><a href="#!" class="combo-share-btn" style="display: flex; align-items: center; justify-content: center; background: #e0f2fe; color: #0284c7; border-radius: 50%; padding: 8px; transition: all 0.3s;" onmouseover="this.style.background='#0284c7'; this.style.color='#fff';" onmouseout="this.style.background='#e0f2fe'; this.style.color='#0284c7';"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></a></li>
                            <li><a href="#!" class="combo-add-to-cart-btn" onclick="if (window.addToCart) { window.addToCart('${item.title.replace(/'/g, "\\'")}', ${synergyTotal}, '${item.images[0] ? (item.images[0].startsWith('http') ? item.images[0] : 'img/product/' + item.images[0]) : ''}'); } return false;"><i class="far fa-shopping-basket"></i></a></li>
                            <li><a href="#!" class="combo-add-to-wishlist-btn" onclick="if (window.addToWishlist) { window.addToWishlist('${item.title.replace(/'/g, "\\'")}', ${synergyTotal}, '${item.images[0] ? (item.images[0].startsWith('http') ? item.images[0] : 'img/product/' + item.images[0]) : ''}'); } return false;"><i class="far fa-heart"></i></a></li>
                        </ul>
                    </div>
                    <div class="product__content">
                        <div class="product__review ul_li">
                            <ul class="rating-star ul_li mr-10">
                                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#d97706" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></li>
                                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#d97706" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></li>
                                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#d97706" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></li>
                                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#d97706" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></li>
                                <li><svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#d97706" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></li>
                            </ul>
                            <span>(${item.reviews})</span>
                        </div>
                        <h2 class="product__title" style="font-size: 14px; margin-top: 10px;"><a href="shop-single.html">${item.title}</a></h2>
                        <div class="protocol-cta" style="margin-top: 6px; text-align: center;">
                          <a href="${item.blog && item.blog.slug ? 'blog-' + item.blog.slug + '.html' : '#'}" class="btn btn-sm btn-primary" style="background:#0284c7; border:none; border-radius:8px; color:#fff; padding:4px 8px; font-size:12px;">Related Clinical Protocol</a>
                          <button class="share-btn" style="margin-left:8px; background:#e0f2fe; border:none; border-radius:50%; padding:6px; cursor:pointer;" onclick="if (navigator.share) { navigator.share({title: '${item.title}', url: window.location.origin + '/blog-${item.blog && item.blog.slug ? item.blog.slug : ''}.html'}).catch(console.error); } else { const dummy = document.createElement('input'); dummy.value = window.location.origin + '/blog-${item.blog && item.blog.slug ? item.blog.slug : ''}.html'; document.body.appendChild(dummy); dummy.select(); document.execCommand('copy'); document.body.removeChild(dummy); alert('Link copied to clipboard'); }"><svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 1 2-2v-8'></path><polyline points='16 6 12 2 8 6'></polyline><line x1='12' y1='2' x2='12' y2='15'></line></svg></button>
                        </div>

                        <h4 class="product__price"><span class="new" data-base-price="${synergyTotal}">&#8358;${newPriceFmt}</span><span class="old" data-base-price="${separateTotal}">&#8358;${oldPriceFmt}</span></h4>
                        <div class="combo-retail-summary" style="margin-top: 8px; font-size: 11.5px; color: #64748b; font-weight: 500;">
                            Total separate cost (${matchedProds.length} products): <span style="font-weight: 700; color: #1e293b;" data-base-price="${separateTotal}">&#8358;${oldPriceFmt}</span>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    // Dynamic rendering function per tab
    window.renderTab = function(tabId) {
        const pane = document.getElementById(tabId);
        if (!pane) return;
        const container = pane.querySelector('.combo-container');
        if (!container) return;

        const state = window.AURA_COMBO_STATE[tabId];
        const query = state.searchQuery.toLowerCase().trim();

        // 1. Smart Query Mapping for Exact Medical Conditions
        let mappedQuery = query;
        if (query.includes("blood pressure") || query.includes("hypertension")) mappedQuery = "hypertension";
        if (query.includes("heart") || query.includes("cardio")) mappedQuery = "heart coronary arrhythmia";
        if (query.includes("immune") || query.includes("immunity")) mappedQuery = "lupus hiv aids pneumonia tuberculosis asthma";
        if (query.includes("weight") || query.includes("fat") || query.includes("obese")) mappedQuery = "obesity weight";
        if (query.includes("detox") || query.includes("colon") || query.includes("liver")) mappedQuery = "liver cirrhosis hepatitis constipation";
        if (query.includes("male vitality") || query.includes("erect") || query.includes("sperm")) mappedQuery = "erectile ejaculation infertility sperm";
        if (query.includes("fibroid") || query.includes("pcos") || query.includes("ovary")) mappedQuery = "fibroid polycystic ovary endometriosis";
        if (query.includes("hormon") || query.includes("menopause")) mappedQuery = "menopause polycystic thyroid";
        if (query.includes("kidney") || query.includes("renal")) mappedQuery = "kidney failure stones";
        if (query.includes("arthritis") || query.includes("joint") || query.includes("osteo")) mappedQuery = "arthritis osteoporosis gout";
        if (query.includes("hiv") || query.includes("aids") || query.includes("virus")) mappedQuery = "hiv aids";
        
        // Use mappedQuery if we altered it, otherwise use original query
        const searchTerms = (mappedQuery !== query ? mappedQuery : query).split(/\s+/).filter(w => w.length > 0);

        // 2. Perform Filtering (Strictly checking ID and Title to avoid generic boilerplate text)
        const filtered = data[tabId].filter(item => {
            if (searchTerms.length === 0) return true;
            
            const itemId = (item.id || "").toString().toLowerCase();
            const title = item.title.toLowerCase();

            // Match ANY of the search terms (OR logic) because mapped queries have multiple options
            // e.g. "heart coronary arrhythmia" should match if ANY of those words are in the title
            return searchTerms.some(word => 
                itemId.includes(word) ||
                title.includes(word)
            );
        });

        // 3. Dynamic Page Boundaries
        const itemsPerPage = 8;
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        if (state.currentPage > totalPages) {
            state.currentPage = Math.max(1, totalPages);
        }

        // 4. Render HTML Content
        container.style.opacity = '0.5';
        setTimeout(() => {
            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="col-12 combo-empty-state">
                        <i class="fas fa-search-minus"></i>
                        <h5>No Clinical Protocols Found</h5>
                        <p>We couldn't find a matching synergistic therapy bundle for "<strong>${state.searchQuery}</strong>". Try searching for alternative symptoms or health challenges.</p>
                    </div>`;
            } else {
                const startIndex = (state.currentPage - 1) * itemsPerPage;
                const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);
                container.innerHTML = pageItems.map(renderComboCard).join('');
            }
            container.style.opacity = '1';

            // 5. Re-render dynamic pagination
            renderPaginationControls(tabId, filtered.length);

            // Re-init wow animations
            if (window.WOW) new WOW().init();
            
            // Sync with currency manager
            if (window.CurrencyManager) window.CurrencyManager.updateUI();
        }, 150);
    };

    // Render Dynamic Page Number Elements
    function renderPaginationControls(tabId, totalItems) {
        const pane = document.getElementById(tabId);
        if (!pane) return;
        
        let pagContainer = pane.querySelector('.combo-pagination');
        if (!pagContainer) {
            pagContainer = document.createElement('div');
            pagContainer.className = 'combo-pagination tx-pagination text-center mt-30';
            const container = pane.querySelector('.combo-container');
            if (container) {
                container.after(pagContainer);
            }
        }
        
        // Hide existing theme pagination to prevent duplicates
        const legacyPag = pane.querySelector('.tx-pagination:not(.combo-pagination)');
        if (legacyPag) legacyPag.style.display = 'none';

        const itemsPerPage = 8;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        if (totalPages <= 1) {
            pagContainer.innerHTML = '';
            return;
        }

        const state = window.AURA_COMBO_STATE[tabId];
        let html = '<ul class="ul_li_center">';
        
        // Previous page button
        html += `<li><a href="#!" class="pag-btn prev ${state.currentPage === 1 ? 'disabled' : ''}" style="margin: 0 4px; border: 1px solid #e2e8f0; border-radius: 8px; width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; font-weight: 600; color: #475569;"><i class="fas fa-chevron-left"></i></a></li>`;
        
        // Smart Page Range with Ellipses
        const getPageRange = (current, total) => {
            const range = [];
            const delta = 2; // Pages to show on either side of current page
            const left = current - delta;
            const right = current + delta + 1;
            
            for (let i = 1; i <= total; i++) {
                if (i === 1 || i === total || (i >= left && i < right)) {
                    range.push(i);
                }
            }
            
            const withEllipses = [];
            let l;
            for (const i of range) {
                if (l) {
                    if (i - l === 2) {
                        withEllipses.push(l + 1);
                    } else if (i - l > 2) {
                        withEllipses.push('...');
                    }
                }
                withEllipses.push(i);
                l = i;
            }
            return withEllipses;
        };

        const pagesToShow = getPageRange(state.currentPage, totalPages);
        pagesToShow.forEach(p => {
            if (p === '...') {
                html += `<li><span style="margin: 0 4px; color: #94a3b8; display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; font-weight: 600;">...</span></li>`;
            } else {
                html += `<li><a href="#!" class="pag-btn num ${state.currentPage === p ? 'active' : ''}" data-page="${p}" style="margin: 0 4px; border: 1px solid ${state.currentPage === p ? '#10b981' : '#e2e8f0'}; background: ${state.currentPage === p ? '#10b981' : '#fff'}; color: ${state.currentPage === p ? '#fff' : '#475569'}; border-radius: 8px; width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; font-weight: 600;">${p < 10 ? '0' + p : p}</a></li>`;
            }
        });
        
        // Next page button
        html += `<li><a href="#!" class="pag-btn next ${state.currentPage === totalPages ? 'disabled' : ''}" style="margin: 0 4px; border: 1px solid #e2e8f0; border-radius: 8px; width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; font-weight: 600; color: #475569;"><i class="fas fa-chevron-right"></i></a></li>`;
        
        html += '</ul>';
        pagContainer.innerHTML = html;

        const scrollToTop = () => {
            const tabEl = document.querySelector('.treatment-protocols-area') || document.querySelector('.treatment-protocols');
            if (tabEl) tabEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        // Bind events
        pagContainer.querySelectorAll('.pag-btn.num').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                state.currentPage = parseInt(btn.getAttribute('data-page'));
                window.renderTab(tabId);
                scrollToTop();
            };
        });

        pagContainer.querySelector('.pag-btn.prev').onclick = (e) => {
            e.preventDefault();
            if (state.currentPage > 1) {
                state.currentPage--;
                window.renderTab(tabId);
                scrollToTop();
            }
        };

        pagContainer.querySelector('.pag-btn.next').onclick = (e) => {
            e.preventDefault();
            if (state.currentPage < totalPages) {
                state.currentPage++;
                window.renderTab(tabId);
                scrollToTop();
            }
        };
    }

    // Dynamic Search Injector
    window.injectSearchBoxes = function() {
        const allTags = [
            "Prostate", "Diabetes", "Hypertension", "Heart", "Immune", "HIV", "Weight", "Detox", "Male Vitality", "Fibroid", 
            "Hormonal Balance", "Kidney", "Arthritis", "Asthma", "Ulcer", "Glaucoma", "Female Infertility", "Insomnia", "Malaria", 
            "Typhoid", "Obesity", "Liver Cirrhosis", "Hepatitis", "Urinary Tract Infection", "Candida", "Eczema", "Stroke Recovery", 
            "Anemia", "Pneumonia", "Bronchitis", "Tuberculosis", "Chronic Fatigue", "Migraine", "Epilepsy", "Parkinson's", 
            "Alzheimer's", "Dementia", "Schizophrenia", "Bipolar Disorder", "Depression", "Anxiety", "Osteoporosis", "Gout", 
            "Rheumatoid Arthritis", "Lupus", "Psoriasis", "Acne", "Rosacea", "Vitiligo", "Alopecia", "Dandruff", "Endometriosis", 
            "PCOS", "Menopause", "Erectile Dysfunction", "Premature Ejaculation", "Low Sperm Count", "Prostatitis", "Kidney Failure", 
            "Gallstones", "Pancreatitis", "IBS", "Crohn's Disease", "Ulcerative Colitis", "Celiac Disease", "Hemorrhoids", 
            "Constipation", "Diarrhea", "Acid Reflux", "Gastritis", "Appendicitis", "Hernia", "Varicose Veins", "DVT", 
            "Peripheral Artery", "Coronary Artery", "Heart Failure", "Arrhythmia", "High Cholesterol", "Hypothyroidism", 
            "Hyperthyroidism", "Goiter", "Cushing's", "Addison's", "Gingivitis", "Periodontitis", "Tooth Decay", "Halitosis", 
            "Tonsillitis", "Pharyngitis", "Laryngitis", "Sinusitis", "Otitis Media", "Tinnitus", "Vertigo", "Cataracts", 
            "Macular Degeneration", "Diabetic Retinopathy", "Conjunctivitis", "Dry Eye", "Carpal Tunnel", "Sciatica", "Herniated Disc", 
            "Scoliosis", "Kyphosis", "Fibromyalgia", "Chronic Pain", "Lyme Disease", "Syphilis", "Gonorrhea", "Chlamydia", "Herpes", 
            "HPV", "Cervical Dysplasia", "Breast Cysts", "Ovarian Cysts", "Uterine Polyps", "PID", "Vaginitis", "Bacterial Vaginosis", 
            "Yeast Infection", "Trichomoniasis", "Scabies", "Lice", "Ringworm", "Athlete's Foot", "Jock Itch", "Nail Fungus", "Warts", 
            "Cold Sores", "Shingles", "Measles", "Mumps", "Rubella", "Chickenpox", "Whooping Cough", "Diphtheria", "Tetanus", "Polio", 
            "Rabies", "Yellow Fever", "Dengue Fever", "Zika Virus", "Chikungunya", "Ebola", "Lassa Fever", "Cholera", "Dysentery", 
            "Food Poisoning", "Botulism", "Salmonella", "E. Coli", "Listeria", "Campylobacter", "Norovirus", "Rotavirus", "Autism", 
            "ADHD", "Down Syndrome", "Cerebral Palsy", "Spina Bifida", "Muscular Dystrophy", "Cystic Fibrosis", "Sickle Cell", 
            "Thalassemia", "Hemophilia", "Leukemia", "Lymphoma", "Multiple Myeloma", "Breast Cancer", "Prostate Cancer", "Lung Cancer", 
            "Colorectal Cancer", "Melanoma", "Pancreatic Cancer", "Ovarian Cancer", "Liver Cancer", "Brain Tumor", "Thyroid Cancer", 
            "Kidney Cancer", "Bladder Cancer", "Stomach Cancer", "Esophageal Cancer", "Cervical Cancer", "Uterine Cancer", 
            "Testicular Cancer", "Hodgkin's", "Non-Hodgkin's", "Glioblastoma", "Neuroblastoma", "Retinoblastoma", "Osteosarcoma", 
            "Ewing Sarcoma", "Wilms Tumor"
        ];

        Object.keys(data).forEach(tabId => {
            const pane = document.getElementById(tabId);
            if (!pane) return;
            const container = pane.querySelector('.combo-container');
            if (!container) return;

            if (pane.querySelector('.combo-search-container')) return;

            const searchWrap = document.createElement('div');
            searchWrap.className = 'combo-search-container';
            
            const renderTags = (page) => {
                const perPage = 22;
                const start = (page - 1) * perPage;
                const end = start + perPage;
                const pageTags = allTags.slice(start, end);
                const totalPages = Math.ceil(allTags.length / perPage);
                
                let tagsHtml = pageTags.map(tag => `<span class="combo-search-tag" data-tag="${tag}">${tag}</span>`).join('');
                
                let pagHtml = `
                    <div class="tag-pagination" style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 15px; width: 100%;">
                        <button class="tag-prev tag-pagination-btn" ${page === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i> Prev</button>
                        <span class="tag-pagination-info">Page ${page} of ${totalPages}</span>
                        <button class="tag-next tag-pagination-btn" ${page === totalPages ? 'disabled' : ''}>Next <i class="fas fa-chevron-right"></i></button>
                    </div>
                `;
                return tagsHtml + pagHtml;
            };

            searchWrap.innerHTML = `
                <div class="combo-search-box">
                    <span class="combo-search-icon"><i class="fas fa-search"></i></span>
                    <input type="text" class="combo-search-input" placeholder="Search 200+ health issues, symptoms, or protocols (e.g. Prostate, Diabetes, High Blood Pressure)..." data-tab="${tabId}">
                    <span class="combo-search-clear">&times;</span>
                </div>
                <div class="combo-search-tags" data-current-page="1">
                    ${renderTags(1)}
                </div>`;

            container.before(searchWrap);

            const input = searchWrap.querySelector('.combo-search-input');
            const clear = searchWrap.querySelector('.combo-search-clear');
            const tagsContainer = searchWrap.querySelector('.combo-search-tags');
            const state = window.AURA_COMBO_STATE[tabId];

            // Type events
            input.oninput = (e) => {
                state.searchQuery = e.target.value;
                state.currentPage = 1; 
                clear.style.display = state.searchQuery ? 'block' : 'none';
                window.renderTab(tabId);
            };

            // Clear search
            clear.onclick = () => {
                input.value = "";
                state.searchQuery = "";
                state.currentPage = 1;
                clear.style.display = 'none';
                window.renderTab(tabId);
            };

            // Tag Event Delegation
            tagsContainer.onclick = (e) => {
                const target = e.target;
                
                // Handle Tag Click
                if (target.classList.contains('combo-search-tag')) {
                    const tagVal = target.getAttribute('data-tag');
                    input.value = tagVal;
                    state.searchQuery = tagVal;
                    state.currentPage = 1;
                    clear.style.display = 'block';
                    window.renderTab(tabId);
                }
                
                // Handle Pagination
                let currentPage = parseInt(tagsContainer.getAttribute('data-current-page'));
                const totalPages = Math.ceil(allTags.length / 22);
                
                if (target.classList.contains('tag-prev') && currentPage > 1) {
                    currentPage--;
                    tagsContainer.setAttribute('data-current-page', currentPage);
                    tagsContainer.innerHTML = renderTags(currentPage);
                }
                if (target.classList.contains('tag-next') && currentPage < totalPages) {
                    currentPage++;
                    tagsContainer.setAttribute('data-current-page', currentPage);
                    tagsContainer.innerHTML = renderTags(currentPage);
                }
            };
        });
    };

    // Override the legacy changeComboPage for absolute compatibility
    window.changeComboPage = function(tabId, page, el) {
        if (window.AURA_COMBO_STATE[tabId]) {
            window.AURA_COMBO_STATE[tabId].currentPage = parseInt(page);
            window.renderTab(tabId);
        }
    };

    // Bulletproof Tab Click Handler for all Bootstrap Versions
    const tabButtons = document.querySelectorAll('#myTab3 button.nav-link');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 1. Deactivate all buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            // 2. Activate clicked button
            this.classList.add('active');
            
            // 3. Get target pane ID
            const targetSelector = this.getAttribute('data-bs-target') || this.getAttribute('data-target') || this.getAttribute('href');
            if (!targetSelector) return;
            const targetPane = document.querySelector(targetSelector);
            if (!targetPane) return;
            
            // 4. Hide all tab panes
            const allPanes = document.querySelectorAll('.tab-content .tab-pane');
            allPanes.forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            
            // 5. Show target tab pane
            targetPane.classList.add('show', 'active');
            
            // 6. Force render/update of target tab
            const tabId = targetSelector.replace('#', '');
            if (window.renderTab) {
                window.renderTab(tabId);
            }
        });
    });

    // Initialize searches and execute initial renders
    window.injectSearchBoxes();
    Object.keys(data).forEach(tabId => {
        window.renderTab(tabId);
    });
});

