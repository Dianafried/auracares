/**
 * Aura Herbs — Combo Blog Engine v3.0
 * Bridges combo-data.js (250+ treatment protocols) to blog.html
 * Each combo entry's `.blog` object becomes a full blog card and article page
 *
 * Architecture:
 *  - window.AURA_COMBO_DATA  → source of 250+ protocol combos (combo-data.js)
 *  - window.AURA_COMBO_BLOGS → curated dietetic guides (combo-blog.js)
 *  - window.ComboBlogEngine  → this engine: reads both, exposes unified API
 */

(function () {
    'use strict';

    /* ─────────────────────────────────────────────
     * HELPERS
     * ───────────────────────────────────────────── */

    /** Convert markdown-lite to HTML (handles ##, ###, bold, tables, blockquote, bullets) */
    function markdownToHtml(md) {
        if (!md) return '';
        return md
            // headings
            .replace(/^### (.+)$/gm, '<h4 class="text-base font-bold text-slate-800 mt-6 mb-2">$1</h4>')
            .replace(/^## (.+)$/gm, '<h3 class="text-lg font-bold text-emerald-700 mt-8 mb-3 border-l-4 border-emerald-500 pl-3">$1</h3>')
            // bold
            .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
            // italic
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            // blockquotes
            .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-emerald-400 bg-emerald-50 pl-4 py-2 my-4 italic text-emerald-800 text-sm rounded-r-xl">$1</blockquote>')
            // markdown table (crude but functional)
            .replace(/^\|(.+)\|$/gm, function (line) {
                if (/^[\|\-\s]+$/.test(line)) return ''; // separator line
                const cells = line.split('|').filter(c => c.trim() !== '');
                return '<tr>' + cells.map(c => `<td class="px-4 py-2 border border-slate-200 text-sm">${c.trim()}</td>`).join('') + '</tr>';
            })
            // bullet list items
            .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-sm text-slate-700"><span class="text-emerald-500 font-black mt-0.5">•</span><span>$1</span></li>')
            // numbered list items
            .replace(/^\d+\. (.+)$/gm, '<li class="flex items-start gap-2 text-sm text-slate-700"><span class="text-emerald-600 font-bold mt-0.5 min-w-[1rem]">→</span><span>$1</span></li>')
            // line breaks for paragraphs
            .replace(/\n\n/g, '</p><p class="text-sm text-slate-600 leading-relaxed mb-4">')
            // inline line breaks
            .replace(/  \n/g, '<br>');
    }

    /** Deduplicate entries by slug */
    function dedupe(arr) {
        const seen = new Set();
        return arr.filter(item => {
            if (seen.has(item.slug)) return false;
            seen.add(item.slug);
            return true;
        });
    }

    /** Category badge colour map */
    const CAT_COLORS = {
        'DCWA Protocol':         'bg-emerald-600',
        'Immunity':               'bg-sky-600',
        'Endocrine & Metabolic':  'bg-amber-600',
        'Cardiovascular':         'bg-red-600',
        'Urogenital & Male':      'bg-blue-600',
        'Gynaecological & Endocrine': 'bg-pink-600',
        'Musculoskeletal':        'bg-orange-600',
        'Respiratory':            'bg-cyan-600',
        'Digestive & Gastrointestinal': 'bg-lime-700',
        'Ocular & Neurological':  'bg-violet-600',
        'Reproductive & Hormonal':'bg-fuchsia-600',
        'Neurological & Restorative': 'bg-indigo-600',
        'Infectious & Immune':    'bg-teal-600',
        'Infectious & Digestive': 'bg-green-700',
        'Weight Management & Endocrine':'bg-yellow-600',
        'Urological & Renal':     'bg-cyan-700',
        'Hepatobiliary':          'bg-amber-700',
        'Urological':             'bg-blue-700',
        'Microbiome & Immune':    'bg-emerald-700',
        'Digital Health':         'bg-slate-600',
    };
    function catColor(cat) {
        return CAT_COLORS[cat] || 'bg-emerald-600';
    }

    /* ─────────────────────────────────────────────
     * DATA AGGREGATION
     * Extract all blog entries from combo-data.js
     * ───────────────────────────────────────────── */

    function extractComboBlogEntries() {
        const raw = window.AURA_COMBO_DATA;
        if (!raw) return [];
        const entries = [];

        Object.values(raw).forEach(tabArray => {
            if (!Array.isArray(tabArray)) return;
            tabArray.forEach(combo => {
                const b = combo.blog;
                if (!b || !b.slug) return;
                entries.push({
                    slug:        b.slug,
                    title:       b.heading  || combo.title || 'DCWA Protocol',
                    category:    b.category || 'DCWA Protocol',
                    date:        b.publishedDate || '2026-01-01',
                    readTime:    b.readTime || '7 min read',
                    image:       b.coverImage || combo.images?.[0] || 'testimony.jpg',
                    excerpt:     b.excerpt || combo.benefits || '',
                    tags:        b.tags || [],
                    author:      b.author || 'Aura Clinical Research Team',
                    content:     b.content || '',
                    foods:       b.foods || '',
                    fruits:      b.fruits || '',
                    dosDonts:    b.dosDonts || '',
                    price:       combo.price,
                    oldPrice:    combo.oldPrice,
                    comboTitle:  combo.title,
                    images:      combo.images || [],
                    included:    combo.included || [],
                    // for news-engine compat
                    id:          b.slug,
                    quickTake:   b.excerpt || combo.benefits || '',
                    source:      'combo',
                });
            });
        });

        return dedupe(entries);
    }

    /** Convert combo-blog.js (curated dietetic) entries to unified format */
    function extractDieteticBlogEntries() {
        const raw = window.AURA_COMBO_BLOGS;
        if (!raw) return [];
        return Object.entries(raw).map(([key, b]) => ({
            slug:      `dietetic-${key}`,
            title:     b.title,
            category:  b.category || 'Dietetic Protocol',
            date:      b.date || '2026-05-01',
            readTime:  b.readTime || '5 min read',
            image:     b.image || 'testimony.jpg',
            excerpt:   b.excerpt || '',
            tags:      [],
            author:    'Aura Clinical Research Team',
            content:   '',
            foods:     (b.foodsToEat || []).join('\n'),
            fruits:    '',
            dosDonts:  b.guidance || '',
            synergy:   b.synergy || '',
            foodsToEat:   b.foodsToEat || [],
            foodsToAvoid: b.foodsToAvoid || [],
            id:        `dietetic-${key}`,
            quickTake: b.excerpt || '',
            source:    'dietetic',
        }));
    }

    /* ─────────────────────────────────────────────
     * PUBLIC ENGINE API
     * ───────────────────────────────────────────── */

    const ComboBlogEngine = {

        _combo: null,
        _dietetic: null,
        _all: null,

        /** Initialise & cache all blog entries */
        init() {
            this._combo    = extractComboBlogEntries();
            this._dietetic = extractDieteticBlogEntries();
            this._all      = [...this._combo, ...this._dietetic];
            return this;
        },

        /** Get all entries (combo + dietetic) */
        getAll() {
            if (!this._all) this.init();
            return this._all;
        },

        /** Get only DCWA combo protocol blogs */
        getCombos() {
            if (!this._combo) this.init();
            return this._combo;
        },

        /** Get only dietetic guides */
        getDietetic() {
            if (!this._dietetic) this.init();
            return this._dietetic;
        },

        /** Find a single entry by slug */
        getBySlug(slug) {
            if (!slug) return null;
            return this.getAll().find(e => e.slug === slug || e.id === slug) || null;
        },

        /** Get unique categories */
        getCategories() {
            const cats = new Set(this.getAll().map(e => e.category));
            return ['all', ...cats];
        },

        /* ──────────────────────────────────
         * BLOG CARD RENDERER (for blog.html feed)
         * ────────────────────────────────── */
        renderCard(entry, link) {
            const color = catColor(entry.category);
            const imgSrc = entry.image || 'testimony.jpg';
            const dateStr = entry.date ? entry.date.slice(0, 10).replace(/-/g, '/') : '2026';
            return `
                <div class="group cursor-pointer bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between combo-blog-card" onclick="window.location.href='${link}'">
                    <div>
                        <div class="aspect-[16/10] rounded-2xl overflow-hidden mb-6 relative bg-slate-100 border border-slate-100">
                            <img src="${imgSrc}" alt="${entry.title}" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" loading="lazy" onerror="this.src='testimony.jpg'">
                            <span class="absolute top-4 left-4 ${color} text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">${entry.category}</span>
                        </div>
                        <div class="flex items-center space-x-2 text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">
                            <span>${dateStr}</span>
                            <span>&bull;</span>
                            <span>${entry.readTime}</span>
                        </div>
                        <h4 class="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition duration-200 mb-3">${entry.title}</h4>
                        <p class="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-3">${entry.excerpt}</p>
                    </div>
                    <div class="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                        <span class="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all duration-200">Read Clinical Paper <i class="fas fa-arrow-right"></i></span>
                        <span class="text-[9px] font-black text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded uppercase">DCWA</span>
                    </div>
                </div>`;
        },

        /* ──────────────────────────────────
         * SINGLE ARTICLE RENDERER (for blog-single.html)
         * ────────────────────────────────── */
        renderArticlePage(entry) {
            if (!entry) return '<p class="text-red-500 text-center py-20">Article not found.</p>';
            const isCombo = entry.source === 'combo';
            const isDietetic = entry.source === 'dietetic';

            let priceSection = '';
            if (isCombo && entry.price) {
                priceSection = `
                <div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white mt-12 shadow-xl">
                    <p class="text-emerald-200 text-xs font-black uppercase tracking-widest mb-2">Protocol Investment</p>
                    <p class="text-4xl font-black">₦${entry.price.toLocaleString()}</p>
                    ${entry.oldPrice ? `<p class="text-emerald-300 line-through text-sm mt-1">₦${entry.oldPrice.toLocaleString()}</p>` : ''}
                    <a href="combo-packs.html" class="mt-6 inline-block bg-white text-emerald-700 font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-emerald-50 transition">
                        Order This Protocol
                    </a>
                </div>`;
            }

            let includedSection = '';
            if (isCombo && entry.included?.length) {
                includedSection = `
                <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mt-8">
                    <h4 class="text-sm font-black uppercase tracking-widest text-emerald-700 mb-4">What's Included in This Protocol</h4>
                    <ul class="space-y-2">
                        ${entry.included.map(item => `<li class="flex items-center gap-2 text-sm text-emerald-800"><i class="fas fa-check-circle text-emerald-500"></i>${item}</li>`).join('')}
                    </ul>
                </div>`;
            }

            let foodsSection = '';
            if (isDietetic && (entry.foodsToEat?.length || entry.foodsToAvoid?.length)) {
                foodsSection = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    ${entry.foodsToEat?.length ? `
                    <div class="bg-green-50 border border-green-200 rounded-2xl p-6">
                        <h4 class="text-sm font-black uppercase tracking-widest text-green-700 mb-4">✅ Foods to Eat</h4>
                        <ul class="space-y-2">${entry.foodsToEat.map(f => `<li class="text-xs text-green-800 leading-relaxed">• ${f}</li>`).join('')}</ul>
                    </div>` : ''}
                    ${entry.foodsToAvoid?.length ? `
                    <div class="bg-red-50 border border-red-200 rounded-2xl p-6">
                        <h4 class="text-sm font-black uppercase tracking-widest text-red-700 mb-4">❌ Foods to Avoid</h4>
                        <ul class="space-y-2">${entry.foodsToAvoid.map(f => `<li class="text-xs text-red-800 leading-relaxed">• ${f}</li>`).join('')}</ul>
                    </div>` : ''}
                </div>`;
                if (entry.synergy) {
                    foodsSection += `
                    <div class="bg-teal-50 border border-teal-200 rounded-2xl p-6 mt-6">
                        <h4 class="text-sm font-black uppercase tracking-widest text-teal-700 mb-3">🧬 Protocol Synergy</h4>
                        <p class="text-xs text-teal-800 leading-relaxed">${entry.synergy}</p>
                    </div>`;
                }
            } else if (isCombo) {
                let foodArr = (entry.foods || '').split('\n').filter(Boolean);
                let fruitArr = (entry.fruits || '').split('\n').filter(Boolean);
                let dosDontsArr = (entry.dosDonts || '').split('\n').filter(Boolean);
                if (foodArr.length || fruitArr.length || dosDontsArr.length) {
                    foodsSection = `
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                        ${foodArr.length ? `
                        <div class="bg-green-50 border border-green-200 rounded-2xl p-5">
                            <h4 class="text-xs font-black uppercase tracking-widest text-green-700 mb-3">🥗 Recommended Foods</h4>
                            <ul class="space-y-1">${foodArr.map(f => `<li class="text-xs text-green-800">• ${f}</li>`).join('')}</ul>
                        </div>` : ''}
                        ${fruitArr.length ? `
                        <div class="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                            <h4 class="text-xs font-black uppercase tracking-widest text-yellow-700 mb-3">🍎 Beneficial Fruits</h4>
                            <ul class="space-y-1">${fruitArr.map(f => `<li class="text-xs text-yellow-800">• ${f}</li>`).join('')}</ul>
                        </div>` : ''}
                        ${dosDontsArr.length ? `
                        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                            <h4 class="text-xs font-black uppercase tracking-widest text-blue-700 mb-3">📋 Clinical Guidance</h4>
                            <ul class="space-y-1">${dosDontsArr.map(f => `<li class="text-xs text-blue-800">• ${f}</li>`).join('')}</ul>
                        </div>` : ''}
                    </div>`;
                }
            }

            const contentHtml = markdownToHtml(entry.content || entry.excerpt || '');
            const tagsHtml = entry.tags?.length 
                ? `<div class="flex flex-wrap gap-2 mt-4">${entry.tags.map(t => `<span class="text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 px-3 py-1 rounded-full">${t}</span>`).join('')}</div>`
                : '';

            return `
            <article class="max-w-4xl mx-auto px-4 py-12">
                <!-- Breadcrumb -->
                <nav class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                    <a href="blog.html" class="hover:text-emerald-600 transition">Research Hub</a>
                    <span>/</span>
                    <span class="text-slate-600">${entry.category}</span>
                </nav>

                <!-- Hero -->
                <div class="relative rounded-[2rem] overflow-hidden mb-10 aspect-[16/7] bg-slate-100">
                    <img src="${entry.image}" alt="${entry.title}" class="w-full h-full object-cover" onerror="this.src='testimony.jpg'">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-8">
                        <span class="${catColor(entry.category)} text-white text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full mb-4 inline-block">${entry.category}</span>
                        <h1 class="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mt-2">${entry.title}</h1>
                        <div class="flex items-center gap-4 mt-4 text-xs text-white/70 font-semibold">
                            <span><i class="fas fa-user-md mr-1"></i>${entry.author}</span>
                            <span>&bull;</span>
                            <span><i class="fas fa-calendar mr-1"></i>${entry.date}</span>
                            <span>&bull;</span>
                            <span><i class="fas fa-clock mr-1"></i>${entry.readTime}</span>
                        </div>
                    </div>
                </div>

                ${tagsHtml}

                <!-- Excerpt callout -->
                <div class="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-2xl p-6 mb-8 mt-6">
                    <p class="text-sm font-semibold text-emerald-800 leading-relaxed">${entry.excerpt}</p>
                </div>

                <!-- Body content -->
                <div class="prose prose-slate max-w-none">
                    <p class="text-sm text-slate-600 leading-relaxed mb-4">
                        ${contentHtml}
                    </p>
                </div>

                ${foodsSection}
                ${includedSection}
                ${priceSection}

                <!-- CTA -->
                <div class="mt-12 bg-slate-950 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <p class="text-emerald-400 text-xs font-black uppercase tracking-widest mb-1">Aura Clinical Wellness</p>
                        <h3 class="text-xl font-black leading-snug">Begin Your Healing Journey Today</h3>
                        <p class="text-slate-400 text-xs mt-2">📍 1 Adekunle Bus Stop, Ogbaiyo, Ijoko, Sango, Ogun State</p>
                        <p class="text-slate-400 text-xs mt-1">📞 Mr Jude: <a href="tel:+2348162765188" class="text-emerald-400 hover:underline">0816 276 5188</a></p>
                    </div>
                    <div class="flex flex-col gap-3 shrink-0">
                        <a href="combo-packs.html" class="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest px-8 py-3 rounded-xl transition text-center">Shop Protocol</a>
                        <a href="https://wa.me/2348162765188" target="_blank" class="bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-widest px-8 py-3 rounded-xl transition text-center">
                            <i class="fab fa-whatsapp mr-2 text-emerald-400"></i>WhatsApp Mr Jude
                        </a>
                    </div>
                </div>

                <!-- Back nav -->
                <div class="mt-8 text-center">
                    <a href="blog.html" class="text-emerald-600 font-black text-xs uppercase tracking-widest hover:underline">
                        <i class="fas fa-arrow-left mr-2"></i>Back to Research Hub
                    </a>
                </div>
            </article>`;
        },

        /* ──────────────────────────────────
         * INJECT INTO blog.html FEED
         * Appends combo blog cards to existing feed container
         * ────────────────────────────────── */
        injectIntoBlogFeed(containerId, filterCategory) {
            const container = document.getElementById(containerId);
            if (!container) return;
            const all = this.getAll();
            const filtered = filterCategory && filterCategory !== 'all'
                ? all.filter(e => e.category.toLowerCase().includes(filterCategory.toLowerCase()))
                : all;
            
            const html = filtered.map(e => {
                const link = `blog-single.html?slug=${encodeURIComponent(e.slug)}`;
                return this.renderCard(e, link);
            }).join('');
            
            container.innerHTML = html;
        },

        /* ──────────────────────────────────
         * STATS for blog.html hero
         * ────────────────────────────────── */
        getStats() {
            const all = this.getAll();
            const cats = new Set(all.map(e => e.category));
            return {
                total: all.length,
                categories: cats.size,
                comboProtocols: this.getCombos().length,
                dieteticGuides: this.getDietetic().length,
            };
        }
    };

    // Expose globally
    window.ComboBlogEngine = ComboBlogEngine;

    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ComboBlogEngine.init());
    } else {
        ComboBlogEngine.init();
    }

})();
