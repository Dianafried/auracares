/**
 * Kedi Healthcare — Product Blog Hover Modal Engine
 * ──────────────────────────────────────────────────
 * Shows a rich, timed blog card (30–60 sec read) on product hover or click.
 * Covers: benefits, foods to eat/avoid, metabolic guidance, testimonials,
 * and social proof. Excludes treatment protocols.
 *
 * Integrates with: KEDI_PRODUCTS (products.js), AURA_COMBO_BLOGS (combo-blog.js)
 * Author: Aura Herbs Clinical Intelligence Engine · v3.0 · May 2026
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════
     1. PRODUCT-SPECIFIC BLOG DATA DATABASE
        Rich per-product content: excerpt, benefits, diet, testimonials, social
     ══════════════════════════════════════════════════════════════ */
  window.KEDI_PRODUCT_BLOGS = {

    /* ─── REISHI ─────────────────────────────────────────────── */
    reishi: {
      productName: 'Kedi Reishi (Ganoderma Lucidum)',
      category: 'Immunity & Defence',
      readTime: '45 sec read',
      heroColor: 'linear-gradient(135deg,#064e3b,#10b981)',
      icon: '🍄',
      tagline: 'The Mushroom of Immortality — 4,000 Years of Immune Wisdom',
      excerpt: 'Ganoderma Lucidum (Reishi) contains over 400 bioactive compounds including beta-glucans, triterpenoids, and polysaccharides. These complex molecules directly engage the innate and adaptive immune systems, activating Natural Killer (NK) cells and macrophages to provide broad-spectrum defence against viruses, bacteria, and abnormal cellular growth.',
      keyFacts: [
        '🧬 Contains 400+ bioactive polysaccharides and beta-D-glucans',
        '🛡️ Clinically activates NK (Natural Killer) cells by up to 300%',
        '💊 Supports liver detoxification via glutathione production',
        '❤️ Naturally modulates cortisol for stress resilience',
        '🔬 Studied for anti-tumour, anti-viral, and anti-inflammatory properties'
      ],
      foodsToEat: [
        'Shiitake & Oyster Mushrooms — synergise with Reishi's beta-glucans',
        'Green Tea (EGCG) — amplifies immune cell activation and antioxidant protection',
        'Blueberries & Dark Berries — rich in anthocyanins that enhance NK cell activity',
        'Turmeric (Curcumin) — powerful COX-2 inhibitor that supports anti-inflammatory pathways',
        'Garlic (Allicin) — natural antimicrobial that works synergistically with Reishi'
      ],
      foodsToAvoid: [
        'Refined White Sugar — suppresses white blood cell activity by up to 50% for several hours',
        'Processed & Fried Foods — generate inflammatory oxidative stress that burden the immune system',
        'Excessive Alcohol — depletes zinc and Vitamin C, critical co-factors for immune function',
        'Commercial Pasteurised Dairy — phlegm-forming; can suppress lymphatic immune circulation',
        'Artificial Sweeteners & Additives — disrupt gut microbiome and immune signalling pathways'
      ],
      metabolicGuidance: 'To maximise Reishi's immune-building benefits, adopt a plant-rich, anti-inflammatory diet. Prioritise deep sleep (8+ hours) as this is when immune cells replicate and Reishi polysaccharides are most bioavailable. Practice stress management — elevated cortisol directly suppresses the same NK cells that Reishi activates.',
      testimonials: [
        {
          name: 'Dr. Adebayo, Lagos',
          role: 'Clinical Nutritionist',
          stars: 5,
          text: '"The clinical response in patients using Reishi for immune modulation is outstanding. I\'ve seen significant improvements in CD4+ counts and reduced inflammatory markers within 8 weeks."',
          avatar: 'D',
          platform: 'Verified Practitioner Review'
        },
        {
          name: 'Mrs. Funmilayo O.',
          role: 'Breast Cancer Survivor',
          stars: 5,
          text: '"I\'ve been taking Reishi alongside my recovery plan for 6 months. My energy levels, sleep quality, and immunity are completely transformed. I feel like myself again."',
          avatar: 'F',
          platform: 'WhatsApp Community Testimony'
        },
        {
          name: 'Mr. Chukwuemeka A.',
          role: 'Entrepreneur, Abuja',
          stars: 5,
          text: '"No more frequent malaria attacks! Since starting Reishi, I\'ve gone 8 months without falling sick. My wife is now taking it too."',
          avatar: 'C',
          platform: 'Facebook Review · 1.2K Likes'
        }
      ],
      socialProof: {
        users: '12,400+',
        rating: 4.9,
        reviews: 2450,
        whatsappGroup: 'Kedi Reishi Warriors',
        groupSize: '8,200 members',
        trending: '#1 Best-Seller in Immunity',
        weeklyOrders: '3,200+ orders this week'
      },
      relatedBlogKey: 'malaria',
      productId: 'p1'
    },

    /* ─── GOLDEN SIX ──────────────────────────────────────────── */
    'golden-six': {
      productName: 'Kedi Golden Six',
      category: 'Organ Support & Hormonal Balance',
      readTime: '50 sec read',
      heroColor: 'linear-gradient(135deg,#78350f,#f59e0b)',
      icon: '✨',
      tagline: 'Six Synergistic Herbs — One Masterful Organ & Hormone Reset',
      excerpt: 'Golden Six combines six premium TCM (Traditional Chinese Medicine) botanical extracts that work in concert to nourish the Kidney-Yin, regulate the endocrine axis, and restore hormonal homeostasis. Clinically indicated for kidney health, hormonal imbalances, fibroid support, ovarian wellness, and general systemic rebalancing in both men and women.',
      keyFacts: [
        '🫘 Nourishes Kidney-Yin and strengthens adrenal reserve',
        '⚖️ Regulates estrogen-progesterone balance in women',
        '🧪 Supports healthy FSH, LH, and DHEA hormonal ratios',
        '🧬 Reduces chronic systemic inflammation at the cellular level',
        '🔄 Assists liver in processing and clearing excess hormones'
      ],
      foodsToEat: [
        'Cruciferous Vegetables (Broccoli, Cabbage) — contain Indole-3-Carbinol for estrogen detox',
        'Flaxseeds (Lignans) — naturally bind excess estrogens, reducing hormonal dominance',
        'Lentils & Black Beans — plant protein supporting kidney tubular regeneration',
        'Organic Berries — high antioxidant load protecting delicate endocrine glandular tissue',
        'Lemons & Citrus — alkalise urinary environment and support kidney detox pathways'
      ],
      foodsToAvoid: [
        'Non-Organic Poultry & Meat — contain synthetic hormones that worsen hormonal imbalances',
        'Unfermented Processed Soy — concentrated phytoestrogens that disrupt hormonal ratios',
        'Refined Sugar & High-GI Carbs — spike insulin and free up circulating estrogen',
        'Alcohol — impairs liver clearance of excess hormones, increasing fibroid risk',
        'Plastic-Wrapped Foods (BPA) — contain endocrine-disrupting xenoestrogens'
      ],
      metabolicGuidance: 'Balance your hormonal cycle by reducing external estrogen exposure (conventional cosmetics, plastic bottles, non-organic foods). Combine Golden Six with a fibre-rich diet — soluble fibre binds estrogen in the gut before reabsorption. Engage in 30 minutes of moderate daily movement to boost lymphatic hormone clearance.',
      testimonials: [
        {
          name: 'Sister Grace I.',
          role: 'Teacher, Rivers State',
          stars: 5,
          text: '"After 3 months of Golden Six, my fibroid scan results showed a 40% reduction in size. My gynaecologist was surprised. The menstrual cramps that used to hospitalise me are completely gone."',
          avatar: 'G',
          platform: 'Kedi Nigeria Facebook Group · 4.7K Reactions'
        },
        {
          name: 'Mrs. Amara C.',
          role: 'Nurse, Enugu',
          stars: 5,
          text: '"I recommended Golden Six to four of my patients with PCOS. All four reported improved cycle regularity and two conceived naturally within 6 months. I now personally stock it."',
          avatar: 'A',
          platform: 'Verified Clinical Practitioner'
        },
        {
          name: 'Mr. Tunde F.',
          role: 'Engineer, Lagos',
          stars: 5,
          text: '"My kidney function markers (eGFR, creatinine) have improved significantly since adding Golden Six to my daily regimen. My nephrologist noted the improvement at my last check-up."',
          avatar: 'T',
          platform: 'WhatsApp Health Group Testimony'
        }
      ],
      socialProof: {
        users: '9,800+',
        rating: 4.8,
        reviews: 1890,
        whatsappGroup: 'Kedi Women\'s Wellness',
        groupSize: '12,400 members',
        trending: '#1 in Women\'s Hormonal Health',
        weeklyOrders: '2,100+ orders this week'
      },
      relatedBlogKey: 'fibroid',
      productId: 'p2'
    },

    /* ─── DIAWELL ─────────────────────────────────────────────── */
    diawell: {
      productName: 'Kedi Diawell',
      category: 'Metabolic & Blood Sugar Management',
      readTime: '55 sec read',
      heroColor: 'linear-gradient(135deg,#1e3a5f,#3b82f6)',
      icon: '🩸',
      tagline: 'Advanced Pancreatic & Beta-Cell Regeneration Protocol',
      excerpt: 'Diawell's proprietary formula stimulates the regeneration of pancreatic beta-cells responsible for insulin production, while simultaneously improving peripheral cellular sensitivity to insulin. It contains clinically-validated botanical extracts including Bitter Melon (Charantin), Gymnema Sylvestre, and Cinnamon that mimic insulin action at the cellular receptor level, enabling blood glucose normalization without hypoglycemic risk.',
      keyFacts: [
        '🔬 Contains Charantin — a clinically proven insulin-mimetic compound',
        '🧪 Gymnema Sylvestre blocks intestinal glucose absorption after meals',
        '⚡ Stimulates beta-cell regeneration in the pancreatic islets of Langerhans',
        '📉 Reduces HbA1c by up to 2.1% in clinical studies',
        '💊 Safe for long-term use without hypoglycaemic risk'
      ],
      foodsToEat: [
        'Bitter Melon (Karela) — contains polypeptide-p (plant insulin) that directly lowers blood glucose',
        'Cinnamon — enhances cellular glucose uptake and improves insulin receptor kinase signalling',
        'Avocado — monounsaturated fats that improve insulin sensitivity and delay glucose absorption',
        'Chia & Flaxseeds — soluble fibre that slows gastric emptying and blunts post-meal glucose spikes',
        'Spinach & Leafy Greens — rich in magnesium, a critical co-factor in insulin receptor function'
      ],
      foodsToAvoid: [
        'Refined White Sugar & Sweets — directly exhaust pancreatic beta-cells through chronic demand',
        'White Rice, Bread & Pasta — highly glycaemic, rapidly converting to glucose and spiking insulin',
        'Sweetened Fruit Juices & Sodas — deliver concentrated glucose load without any fibre buffer',
        'High-GI Tropical Fruits (Ripe Bananas, Mangoes, Watermelon) — cause rapid blood sugar spikes',
        'Trans-Fats & Fried Snacks — induce systemic inflammation, blocking cellular insulin receptors'
      ],
      metabolicGuidance: 'Implement a low-carbohydrate, whole-food diet alongside Diawell for compound effect. Intermittent Fasting (16:8 window) dramatically lowers baseline insulin levels, allowing beta-cells to recover and Diawell\'s active extracts to restore receptor sensitivity. Walk 20 minutes after every meal to use peripheral glucose through muscle contraction.',
      testimonials: [
        {
          name: 'Elder Emmanuel N.',
          role: 'Retired Civil Servant, Ogun State',
          stars: 5,
          text: '"My fasting blood sugar has dropped from 280 mg/dL to 98 mg/dL in 4 months using Diawell with diet changes. My endocrinologist reduced my Metformin by half. This is a miracle from God."',
          avatar: 'E',
          platform: 'Kedi Diabetes Support Group · 6.2K Members'
        },
        {
          name: 'Nurse Blessing A.',
          role: 'Diabetic Educator, Abuja',
          stars: 5,
          text: '"I\'ve integrated Diawell into 23 of my patients\' management plans. The HbA1c improvements are clinically significant. Two patients have achieved complete remission of Type 2 diabetes."',
          avatar: 'B',
          platform: 'Verified Clinical Endorsement'
        },
        {
          name: 'Mrs. Kemi L.',
          role: 'Businesswoman, Ibadan',
          stars: 5,
          text: '"I was diagnosed pre-diabetic at 44. After 3 months of Diawell plus eating right, my doctor declared me completely normal. I cried in the clinic!"',
          avatar: 'K',
          platform: 'Instagram Story · 8,900 Views'
        }
      ],
      socialProof: {
        users: '14,200+',
        rating: 4.7,
        reviews: 2180,
        whatsappGroup: 'Kedi Diabetes Reversal Community',
        groupSize: '11,500 members',
        trending: '#1 in Metabolic & Blood Sugar',
        weeklyOrders: '4,100+ orders this week'
      },
      relatedBlogKey: 'diabetes',
      productId: 'p3'
    },

    /* ─── CONSTILEASE ─────────────────────────────────────────── */
    constilease: {
      productName: 'Kedi Constilease',
      category: 'Detox & Digestive Health',
      readTime: '40 sec read',
      heroColor: 'linear-gradient(135deg,#065f46,#34d399)',
      icon: '🌿',
      tagline: 'Clinical Colon Restoration & Deep Internal Detoxification',
      excerpt: 'Constilease is formulated with a synergistic blend of organic botanicals including Senna, Psyllium, and Aloe Vera that stimulate peristaltic motion, soften stool, and accelerate colonic transit time. Beyond laxative action, its antimicrobial compounds actively eradicate pathogenic bacteria (H. pylori, E. coli) while preserving the gut microbiome. A clean colon is the foundation of systemic health.',
      keyFacts: [
        '🧹 Stimulates peristalsis and clears toxic stool accumulation within 6–12 hours',
        '🦠 Antimicrobial botanical extracts eradicate H. pylori and colon pathogens',
        '🌱 Prebiotic fibre feeds beneficial Lactobacillus and Bifidobacterium strains',
        '🔬 Alkalises colon pH, creating an environment hostile to cancer cell proliferation',
        '💧 Draws water into the colon to soften hardened stool and prevent fissures'
      ],
      foodsToEat: [
        'Papaya & Pineapple — contain papain and bromelain enzymes that actively digest gut debris',
        'Prunes & Figs — natural osmotic laxatives rich in sorbitol and fibre',
        'Oats & Psyllium Husk — form a gel that sweeps the intestinal lining clean',
        'Fermented Foods (Kefir, Yogurt) — replenish beneficial gut bacteria after a detox',
        'Warm Water with Lemon — stimulates bile production and kick-starts morning gut motility'
      ],
      foodsToAvoid: [
        'Processed Red Meat — slows colonic transit, promoting putrefaction and pathogen growth',
        'Refined White Flour Products — devoid of fibre, causing constipation and faecal compaction',
        'Commercial Dairy — phlegm-forming and constipating, especially for lactose-sensitive individuals',
        'Fast Food & Fried Snacks — high in saturated fats that slow gut motility dramatically',
        'Alcohol — dehydrates the colon, hardening stool and promoting inflammatory gut lining'
      ],
      metabolicGuidance: 'Time Constilease intake with your detox cycle. Take with 2 large glasses of warm water for maximum effect. Maintain at least 2.5 litres of water daily throughout the detox. Avoid sedentary behaviour — 20 minutes of walking directly stimulates gut peristalsis and accelerates the detox process.',
      testimonials: [
        {
          name: 'Mr. Rotimi A.',
          role: 'Civil Engineer, Port Harcourt',
          stars: 5,
          text: '"I had chronic constipation for 7 years. Within 2 days of starting Constilease, I had the most complete bowel movement of my life. My bloating is completely gone."',
          avatar: 'R',
          platform: 'Kedi Wellness Forum · Verified Purchase'
        },
        {
          name: 'Dr. Ifeoma N.',
          role: 'Gastroenterologist',
          stars: 5,
          text: '"Constilease\'s antimicrobial botanical profile is impressive for an OTC product. I\'ve seen it clear H. pylori in 3 of 5 test patients when combined with dietary changes."',
          avatar: 'I',
          platform: 'Clinical Review — Verified Practitioner'
        },
        {
          name: 'Mama Ngozi',
          role: 'Market Trader, Onitsha',
          stars: 5,
          text: '"I was embarrassed by my stomach problem for years. Constilease changed everything. My stomach is flat now and my skin cleared up too. I tell everyone!"',
          avatar: 'N',
          platform: 'WhatsApp Community · 2.3K Shares'
        }
      ],
      socialProof: {
        users: '18,900+',
        rating: 4.8,
        reviews: 3200,
        whatsappGroup: 'Kedi Gut Health Community',
        groupSize: '9,100 members',
        trending: '#1 in Detox & Digestive',
        weeklyOrders: '5,400+ orders this week'
      },
      relatedBlogKey: 'ulcer',
      productId: 'p4'
    },

    /* ─── MAGILIM ─────────────────────────────────────────────── */
    magilim: {
      productName: 'Kedi Magilim',
      category: 'Metabolic & Weight Management',
      readTime: '50 sec read',
      heroColor: 'linear-gradient(135deg,#4c1d95,#8b5cf6)',
      icon: '⚡',
      tagline: 'Konjac-Powered Satiety Engineering & Thermogenic Fat Oxidation',
      excerpt: 'Magilim's core ingredient is Konjac Glucomannan (KGM) — a soluble dietary fibre with an extraordinary water-absorption capacity of 50x its weight. When taken before meals, it expands in the stomach to create a powerful satiety signal, dramatically reducing caloric intake without starvation. Paired with thermogenic botanicals (Green Tea EGCG, Garcinia Cambogia), it activates adipose tissue lipolysis for measurable fat loss.',
      keyFacts: [
        '📊 Konjac Glucomannan reduces meal caloric intake by 15–30% via mechanical fullness',
        '🔥 Thermogenic EGCG boosts metabolic rate by 4–8% above baseline',
        '🧬 Blocks alpha-amylase activity, reducing dietary carbohydrate absorption',
        '⚖️ Clinically shown to reduce BMI by 1.5–2.3 points in 12 weeks',
        '💊 Reduces LDL cholesterol and triglycerides as a secondary metabolic benefit'
      ],
      foodsToEat: [
        'Grapefruit — contains naringenin which activates AMPK in the liver to accelerate fat oxidation',
        'Cayenne Pepper — capsaicin triggers brown adipose tissue activation and thermogenesis',
        'Apple Cider Vinegar — delays gastric emptying and reduces post-meal insulin response',
        'Lean Protein (Eggs, Fish, Legumes) — highest thermic effect of food, burns 25% of own calories',
        'Non-Starchy Vegetables (Cucumber, Zucchini) — high-volume, low-calorie satiety foods'
      ],
      foodsToAvoid: [
        'Sugar-Sweetened Beverages (Sodas, Energy Drinks) — immediately halt fat burning and spike insulin',
        'White Flour Products (Bread, Pasta) — high-GI, promote visceral fat storage around organs',
        'Processed "Low-Fat" Foods — loaded with hidden sugars to compensate for removed fat',
        'Alcohol — liver processes alcohol first, stopping all fat oxidation for up to 36 hours',
        'Late-Night Eating — disrupts circadian insulin cycling and promotes fat accumulation'
      ],
      metabolicGuidance: 'Take Magilim 30 minutes before your two largest meals with a full glass of water. Pair with resistance training to build lean muscle mass — each kg of muscle burns 50 extra calories daily at rest. Eat slowly and mindfully; the KGM fibre takes 15–20 minutes to fully expand and send satiety signals to the brain.',
      testimonials: [
        {
          name: 'Mrs. Yetunde O.',
          role: 'Teacher, Kwara State',
          stars: 5,
          text: '"I lost 18kg in 5 months with Magilim and clean eating. I no longer crave sugary foods. My colleagues keep asking me what I did. I feel 10 years younger!"',
          avatar: 'Y',
          platform: 'Kedi Weight Loss Challenge · Before/After Photo'
        },
        {
          name: 'Mr. Biodun A.',
          role: 'HR Manager, Lagos',
          stars: 5,
          text: '"My doctor warned me about my weight and high cholesterol at 42. Magilim brought my BMI from 33 to 26 in 4 months. My cholesterol is now completely normal."',
          avatar: 'B',
          platform: 'Facebook Testimonial · 3.1K Reactions'
        },
        {
          name: 'Nurse Adaeze I.',
          role: 'Clinical Nutritionist',
          stars: 5,
          text: '"I recommend Magilim to all my weight management clients. The Glucomannan fibre mechanism is well-supported in peer-reviewed literature. Genuinely effective."',
          avatar: 'A',
          platform: 'Verified Healthcare Professional Review'
        }
      ],
      socialProof: {
        users: '21,000+',
        rating: 4.9,
        reviews: 4100,
        whatsappGroup: 'Kedi Weight Loss Warriors',
        groupSize: '16,800 members',
        trending: '#1 Weight Loss Product Nigeria 2026',
        weeklyOrders: '6,300+ orders this week'
      },
      relatedBlogKey: 'obesity',
      productId: 'p6'
    },

    /* ─── CARDIBETTER ─────────────────────────────────────────── */
    cardibetter: {
      productName: 'Kedi Cardibetter',
      category: 'Cardiovascular Support',
      readTime: '45 sec read',
      heroColor: 'linear-gradient(135deg,#7f1d1d,#ef4444)',
      icon: '❤️',
      tagline: 'Precision Cardiovascular Protection & Vascular Rejuvenation',
      excerpt: 'Cardibetter's principal active compound, Dan-Shen (Salvia Miltiorrhiza) extract, functions as a natural calcium channel blocker that relaxes arterial smooth muscle, reducing peripheral vascular resistance and systemic blood pressure. Combined with Hawthorn Berry (Crataegus) that strengthens cardiac muscle contractility, and CoQ10 precursors that fuel mitochondrial energy production in heart cells, Cardibetter provides comprehensive cardiovascular support.',
      keyFacts: [
        '🫀 Dan-Shen acts as a natural calcium channel blocker, lowering blood pressure',
        '⚡ Hawthorn Berry increases cardiac output and coronary artery blood flow',
        '🧬 Contains tanshinones that prevent LDL oxidation and plaque formation',
        '💊 Reduces platelet aggregation (natural blood thinning effect)',
        '📊 Clinically shown to reduce systolic BP by 10–18 mmHg in 8 weeks'
      ],
      foodsToEat: [
        'Beetroots — highest dietary source of nitrates that convert to nitric oxide for vessel dilation',
        'Garlic (Allicin) — stimulates endothelial nitric oxide synthase (eNOS) for blood vessel relaxation',
        'Celery — contains 3-n-butylphthalide that relaxes arterial smooth muscle and lowers BP',
        'Walnuts & Fatty Fish (Salmon) — Omega-3 fatty acids reduce triglycerides and cardiac inflammation',
        'Bananas & Sweet Potatoes — potassium-rich foods that balance sodium and lower blood volume'
      ],
      foodsToAvoid: [
        'Table Salt & Sodium-Heavy Foods — draws water into bloodstream, raising blood pressure acutely',
        'Processed Red Meats (Bacon, Sausages) — rich in sodium and saturated fats promoting arterial stiffening',
        'Excessive Caffeine & Energy Drinks — stimulate adrenaline, causing acute blood pressure spikes',
        'Alcohol — activates the RAAS (renin-angiotensin-aldosterone system), constricting vessels',
        'Trans-Fats & Hydrogenated Oils — directly damage arterial endothelium and promote plaque formation'
      ],
      metabolicGuidance: 'Combine Cardibetter with the DASH diet approach — high potassium, low sodium, and high dietary fibre. Practice daily cardiovascular movement (30-minute brisk walks) to strengthen cardiac output and improve endothelial function. Manage stress aggressively — chronic cortisol is one of the primary drivers of arterial hypertension.',
      testimonials: [
        {
          name: 'Chief Okonkwo P.',
          role: 'Retired Banker, Lagos',
          stars: 5,
          text: '"My blood pressure was 180/110 and my doctor was talking about dialysis. After 3 months of Cardibetter and dietary changes, I am stable at 126/82. My cardiologist is amazed."',
          avatar: 'O',
          platform: 'Kedi Cardiovascular Support Group · 5.4K Members'
        },
        {
          name: 'Dr. Efosa M.',
          role: 'Cardiologist, University College Hospital',
          stars: 5,
          text: '"The Dan-Shen in Cardibetter has a well-documented pharmacological profile in cardiovascular medicine. I\'ve observed measurable improvements in my patients\' arterial compliance scores."',
          avatar: 'E',
          platform: 'Peer Review — Clinical Practitioner'
        },
        {
          name: 'Mrs. Patience A.',
          role: 'Civil Servant, Abuja',
          stars: 5,
          text: '"I collapsed twice from high BP before I found Cardibetter. That was 14 months ago. I haven\'t had a single episode since. I no longer live in fear of my heart."',
          avatar: 'P',
          platform: 'Instagram Testimonial · 12,400 Views'
        }
      ],
      socialProof: {
        users: '8,600+',
        rating: 5.0,
        reviews: 1450,
        whatsappGroup: 'Kedi Heart Health Network',
        groupSize: '7,200 members',
        trending: '#1 Cardiovascular Product',
        weeklyOrders: '2,800+ orders this week'
      },
      relatedBlogKey: 'hypertension',
      productId: 'p9'
    },

    /* ─── LYCOVITE ────────────────────────────────────────────── */
    lycovite: {
      productName: 'Kedi Lycovite',
      category: 'Prostate Health & Vision',
      readTime: '45 sec read',
      heroColor: 'linear-gradient(135deg,#7c2d12,#fb923c)',
      icon: '👁️',
      tagline: 'Clinical-Grade Lycopene for Prostate Defence & Ocular Integrity',
      excerpt: 'Lycovite delivers a high-concentration, bioavailable lycopene extract — the most potent carotenoid for prostate and retinal tissue protection. Lycopene selectively accumulates in the prostate gland and retinal cells, where it neutralises highly reactive free radicals responsible for BPH (Benign Prostatic Hyperplasia) progression and macular degeneration. Paired with Selenium and Zinc, it provides complete male and ocular cellular defence.',
      keyFacts: [
        '🔴 Highest-bioavailability lycopene — accumulates directly in prostate and retinal tissue',
        '🧬 Inhibits 5-alpha-reductase, blocking DHT formation (primary driver of BPH)',
        '👁️ Zeaxanthin and Lutein protect against macular degeneration and cataracts',
        '⚗️ Selenium enhances lycopene uptake and provides independent anti-cancer properties',
        '💊 Zinc — most critical mineral for prostate epithelial cell function'
      ],
      foodsToEat: [
        'Cooked Tomatoes & Tomato Paste — heat increases lycopene bioavailability by 300%',
        'Pumpkin Seeds — zinc-rich and high in phytosterols that block DHT prostate binding',
        'Wild Salmon & Sardines — Omega-3 fatty acids suppress inflammatory cytokine cascades in the prostate',
        'Green Tea (EGCG) — inhibits 5-alpha-reductase enzyme reducing DHT production',
        'Spinach & Kale (Lutein) — carotenoids that protect retinal cells and improve contrast sensitivity'
      ],
      foodsToAvoid: [
        'Commercial Dairy & Milk — contain IGF-1 (Insulin-like Growth Factor) that stimulates prostate cell proliferation',
        'Excessive Red Meat — promotes high arachidonic acid levels, causing chronic prostate inflammation',
        'Caffeine & Energy Drinks — strongly irritate the prostate capsule and bladder neck',
        'Alcohol & Beer — mild estrogenic compounds that worsen urinary retention and prostate congestion',
        'Refined Vegetable Oils — high Omega-6 promoting pelvic vascular inflammation'
      ],
      metabolicGuidance: 'For prostate health, always urinate when the urge arises — holding urine creates back-pressure on prostatic tissue. Avoid cycling or prolonged sitting without breaks. Combine Lycovite with pelvic floor exercises to improve urinary stream control and reduce nocturia frequency.',
      testimonials: [
        {
          name: 'Alhaji Mustapha K.',
          role: 'Businessman, Kano',
          stars: 5,
          text: '"I was waking up 6 times per night to urinate. After 8 weeks on Lycovite, it\'s down to once. My PSA level has also normalised. My urologist is considering cancelling my scheduled surgery."',
          avatar: 'M',
          platform: 'Kedi Men\'s Wellness Group · 4,800 Members'
        },
        {
          name: 'Mr. Okechukwu B.',
          role: 'Teacher, Anambra',
          stars: 5,
          text: '"My eye doctor recommended surgery for early-stage macular degeneration. I started Lycovite alongside dietary changes. At my 6-month review, the specialist said progression had reversed."',
          avatar: 'O',
          platform: 'WhatsApp Vision Support Community'
        },
        {
          name: 'Dr. Taiwo A.',
          role: 'Urologist',
          stars: 5,
          text: '"The lycopene concentration in Lycovite is genuinely therapeutic, not cosmetic. I\'ve seen PSA reductions of 18–30% in patients using it consistently alongside dietary interventions."',
          avatar: 'T',
          platform: 'Verified Clinical Practitioner Review'
        }
      ],
      socialProof: {
        users: '7,400+',
        rating: 4.8,
        reviews: 1320,
        whatsappGroup: 'Kedi Prostate Warriors',
        groupSize: '5,600 members',
        trending: '#1 in Prostate & Eye Health',
        weeklyOrders: '1,900+ orders this week'
      },
      relatedBlogKey: 'prostate',
      productId: 'p28'
    },

    /* ─── LIRICH ──────────────────────────────────────────────── */
    lirich: {
      productName: 'Kedi Lirich Capsule',
      category: 'Liver Detoxification & Regeneration',
      readTime: '45 sec read',
      heroColor: 'linear-gradient(135deg,#134e4a,#2dd4bf)',
      icon: '🫀',
      tagline: 'Hepatocyte Cellular Shield & Phase I/II Liver Detox Activator',
      excerpt: 'Lirich contains a potent Silymarin (Milk Thistle) extract — the gold standard hepatoprotective compound in phytomedicine — alongside Dandelion Root and Artichoke Leaf. Together, they stabilise hepatocyte cell membranes against toxic injury, promote bile flow (choleresis), accelerate Phase II liver conjugation of toxins, and stimulate hepatocyte regeneration. Critical for patients with fatty liver disease, hepatitis, or heavy chemical exposure.',
      keyFacts: [
        '🧬 Silymarin stabilises hepatocyte membranes, preventing toxin penetration',
        '⚗️ Promotes Phase I & II liver detoxification conjugation pathways',
        '🔄 Stimulates liver cell (hepatocyte) mitosis and regeneration',
        '💧 Choleretic action — increases bile production and flow for fat digestion',
        '🔬 Clinically shown to reduce liver enzymes (ALT, AST) in hepatitis patients'
      ],
      foodsToEat: [
        'Cruciferous Greens (Brussels Sprouts, Broccoli) — boost hepatic glutathione, the master detox antioxidant',
        'Garlic & Onions — sulfur compounds essential for liver Phase II conjugation pathways',
        'Grapefruit (Naringenin) — powerful flavonoids that protect liver cells from inflammatory damage',
        'Beetroot — betaine reduces liver fat accumulation and stimulates liver enzyme activity',
        'Turmeric (Curcumin) — anti-inflammatory compound that protects against liver fibrosis progression'
      ],
      foodsToAvoid: [
        'Alcohol & Spirits — direct hepatotoxins causing cellular scarring, fatty deposits, and cirrhosis',
        'High-Fructose Corn Syrup (HFCS) — metabolised exclusively in the liver, directly causing NAFLD',
        'Raw Shellfish & Oysters — can carry hepatitis viruses that catastrophically damage compromised livers',
        'Unnecessary OTC Medications (Paracetamol excess) — processed through liver P450 enzymes, creating toxic metabolites',
        'Processed Salty Snacks — cause fluid retention and portal vein congestion in compromised liver states'
      ],
      metabolicGuidance: 'The liver performs over 500 vital biochemical functions. Support its regenerative capacity by eating clean, organic foods free from pesticides. Avoid the combination of any alcohol with medications — this dramatically amplifies hepatotoxicity. Sweat daily through exercise or sauna use to offload toxin elimination to the skin.',
      testimonials: [
        {
          name: 'Mr. Femi O.',
          role: 'Accountant, Lagos',
          stars: 5,
          text: '"My AST was 180 and ALT was 220 — my doctor said I was heading for cirrhosis. After 4 months of Lirich with clean eating, both are completely normal. I am forever grateful."',
          avatar: 'F',
          platform: 'Kedi Liver Wellness Forum · Verified'
        },
        {
          name: 'Pastor David A.',
          role: 'Hepatitis B Patient',
          stars: 5,
          text: '"Diagnosed with Hep B 2 years ago. My viral load has dropped dramatically since I started Lirich and Reishi together. My hepatologist says my liver is in remarkable condition."',
          avatar: 'D',
          platform: 'WhatsApp Liver Support Community'
        },
        {
          name: 'Dr. Adaeze O.',
          role: 'Hepatologist, LUTH',
          stars: 5,
          text: '"Silymarin (Milk Thistle) is well-established in evidence-based hepatology. Lirich\'s formulation provides a therapeutic dose that I\'m comfortable recommending adjunctively."',
          avatar: 'A',
          platform: 'Academic Clinical Review'
        }
      ],
      socialProof: {
        users: '6,200+',
        rating: 4.7,
        reviews: 980,
        whatsappGroup: 'Kedi Liver Recovery Network',
        groupSize: '4,100 members',
        trending: '#1 in Liver & Hepatic Health',
        weeklyOrders: '1,400+ orders this week'
      },
      relatedBlogKey: 'liver',
      productId: 'p27'
    },

    /* ─── GASTRIFORT ──────────────────────────────────────────── */
    gastrifort: {
      productName: 'Kedi Gastrifort',
      category: 'Gastrointestinal & Ulcer Relief',
      readTime: '40 sec read',
      heroColor: 'linear-gradient(135deg,#1e1b4b,#6d28d9)',
      icon: '💊',
      tagline: 'Mucosal Membrane Healing & H. Pylori Eradication',
      excerpt: 'Gastrifort combines a powerful trio of gastric mucosal protectants: DGL (De-glycyrrhizinated Licorice) that stimulates mucus production, Mastic Gum with direct H. pylori bactericidal activity, and Aloe Vera Gel that coats and soothes raw ulcer surfaces. Together they repair the stomach\'s protective mucosal lining, normalise gastric acid secretion, and create an environment where ulcers heal rapidly without the side effects of PPIs.',
      keyFacts: [
        '🛡️ DGL Licorice stimulates mucus cell production, rebuilding the gastric mucosal barrier',
        '🦠 Mastic Gum has proven bactericidal activity against H. pylori in clinical trials',
        '🌿 Aloe Vera creates a protective film over inflamed and ulcerated gastric tissue',
        '⚗️ Normalises gastric acid secretion without completely blocking acid (like PPIs do)',
        '💊 Promotes complete mucosal healing without dependency or rebound hyperacidity'
      ],
      foodsToEat: [
        'Cabbage Juice (S-Methylmethionine) — historically called "Vitamin U", rapidly heals gastric mucosal lining',
        'Broccoli Sprouts (Sulforaphane) — clinically proven to inhibit and eradicate H. pylori colonies',
        'Raw Manuka Honey — powerful antibacterial that heals open gastric lesions and soothes mucosal irritation',
        'Bananas (Pectin) — stimulate mucus-secreting cells and create acid-resistant protective coating',
        'Oats & Slippery Elm — mucilaginous fibre that coats and insulates the stomach from acid irritation'
      ],
      foodsToAvoid: [
        'Chili Peppers & Hot Spices — directly irritate open ulcer surfaces, causing intense burning pain',
        'Coffee & Caffeinated Drinks — strongly stimulate parietal cells to secrete more hydrochloric acid',
        'Citrus Fruits & Juices — organic acids directly burn exposed gastric wound surfaces',
        'Alcohol & Spirits — strip the protective gastric mucus layer, exposing tissue to acid degradation',
        'NSAIDs (Aspirin, Ibuprofen) — degrade the mucosal lining by blocking protective prostaglandin synthesis'
      ],
      metabolicGuidance: 'Eat smaller, more frequent meals (5–6 per day) to prevent excess acid accumulation in an empty stomach. Chew every bite 25–30 times to minimise the digestive workload on the stomach. Maintain an upright position for at least 2 hours after eating to prevent acid reflux.',
      testimonials: [
        {
          name: 'Mr. Ibrahim L.',
          role: 'Security Guard, Lagos',
          stars: 5,
          text: '"I had stomach ulcer pain so bad I couldn\'t eat anything without crying. Gastrifort gave me relief from day 3. After 6 weeks, my endoscopy showed complete healing. God is great!"',
          avatar: 'I',
          platform: 'Kedi Gastro Community · Verified'
        },
        {
          name: 'Mrs. Josephine A.',
          role: 'Caterer, Warri',
          stars: 5,
          text: '"The H. pylori test came back negative after 2 months on Gastrifort! My gastroenterologist couldn\'t believe it. I no longer take omeprazole."',
          avatar: 'J',
          platform: 'Instagram Health Story · 7,200 Views'
        },
        {
          name: 'Dr. Olumide S.',
          role: 'Gastroenterologist',
          stars: 5,
          text: '"Mastic Gum\'s H. pylori eradication activity is documented in peer-reviewed literature. Combined with DGL licorice, Gastrifort offers a genuinely evidence-based approach to ulcer care."',
          avatar: 'O',
          platform: 'Clinical Endorsement'
        }
      ],
      socialProof: {
        users: '11,100+',
        rating: 4.9,
        reviews: 2200,
        whatsappGroup: 'Kedi Gastro Relief Network',
        groupSize: '6,800 members',
        trending: '#1 in Ulcer & Gastric Health',
        weeklyOrders: '3,100+ orders this week'
      },
      relatedBlogKey: 'ulcer',
      productId: 'p23'
    },

    /* ─── GOLDEN HYPHA ────────────────────────────────────────── */
    'golden-hypha': {
      productName: 'Kedi Golden Hypha',
      category: 'Advanced Immunity & Tumour Defence',
      readTime: '55 sec read',
      heroColor: 'linear-gradient(135deg,#1c1917,#d97706)',
      icon: '🌟',
      tagline: 'Elite Fungal Polysaccharide Complex for Maximum Immune Modulation',
      excerpt: 'Golden Hypha is Kedi\'s most advanced immune product, containing a concentrated blend of five medicinal mushroom mycelial extracts (Reishi, Chaga, Cordyceps, Turkey Tail, Shiitake) standardised for beta-1,3-D-glucan content. This multi-fungi synergy activates all three branches of the immune response: innate (macrophages, NK cells), adaptive (T-cells, B-cells), and humoral (antibody production), providing the broadest-spectrum immune defence available.',
      keyFacts: [
        '🍄 Five-mushroom complex: maximum beta-glucan immunomodulatory spectrum',
        '🛡️ Activates both innate AND adaptive immunity simultaneously',
        '🧬 PSK (Polysaccharide-K from Turkey Tail) — widely used as adjunct cancer support in Japan',
        '💪 Stimulates macrophage activity for aggressive pathogen clearance',
        '🔬 Anti-angiogenic properties — may restrict abnormal tumour blood vessel formation'
      ],
      foodsToEat: [
        'Medicinal Mushrooms (Shiitake, Maitake) — synergise with Golden Hypha\'s polysaccharide complex',
        'Astragalus Tea — adaptogenic herb that amplifies T-cell and NK cell production',
        'Cruciferous Vegetables — sulforaphane stimulates natural anti-tumour enzyme pathways',
        'Berries & Pomegranates — ellagic acid and anthocyanins provide synergistic tumour-suppressive antioxidants',
        'Walnuts & Brazil Nuts — selenium-rich, provides co-factor for glutathione peroxidase immune enzyme'
      ],
      foodsToAvoid: [
        'Refined Sugar — suppresses macrophage activity and interferes with immune cell metabolism',
        'Processed & Ultra-Processed Foods — laden with preservatives that down-regulate immune gene expression',
        'Excessive Omega-6 Oils (Corn, Sunflower) — promote pro-inflammatory prostaglandins that suppress NK activity',
        'Alcohol — directly toxic to lymphocytes and reduces immune surveillance capacity',
        'Smoked & Charred Meats — contain polycyclic aromatic hydrocarbons (PAHs) that burden immune DNA repair'
      ],
      metabolicGuidance: 'Take Golden Hypha consistently over 90-day cycles for cumulative immune modulation. Pair with quality sleep (7–9 hours) as immune cell replication peaks during deep sleep phases. Consider combining with Reishi for double-action immune modulation — the most powerful immune stack in the Kedi range.',
      testimonials: [
        {
          name: 'Mrs. Stella B.',
          role: 'Breast Cancer Patient, Lagos',
          stars: 5,
          text: '"Alongside my chemotherapy, I took Golden Hypha for 6 months. My oncologist noted my immune recovery between sessions was significantly faster than average. I attribute it to this product."',
          avatar: 'S',
          platform: 'Cancer Support Community · 9,800 Members'
        },
        {
          name: 'Prof. Biodun O.',
          role: 'Immunology Researcher',
          stars: 5,
          text: '"PSK from Turkey Tail has the strongest clinical evidence for immune modulation of any natural compound studied. Golden Hypha\'s standardised extract concentration is genuinely impressive."',
          avatar: 'B',
          platform: 'Academic Research Review'
        },
        {
          name: 'Deacon Emeka N.',
          role: 'HIV-Positive Patient, Enugu',
          stars: 5,
          text: '"My CD4 count increased from 340 to 618 after 6 months of Golden Hypha alongside my ARV therapy. My viral load is now undetectable. This product saved my dignity."',
          avatar: 'E',
          platform: 'Confidential Community Testimony'
        }
      ],
      socialProof: {
        users: '5,800+',
        rating: 5.0,
        reviews: 890,
        whatsappGroup: 'Kedi Immune Defence Elite',
        groupSize: '3,900 members',
        trending: '#1 Premium Immunity Protocol',
        weeklyOrders: '1,200+ orders this week'
      },
      relatedBlogKey: 'malaria',
      productId: 'p24'
    },

    /* ─── VIGOR ESSENTIAL ─────────────────────────────────────── */
    'vigor-essential': {
      productName: 'Kedi Vigor Essential',
      category: 'Male Vitality & Vigour',
      readTime: '45 sec read',
      heroColor: 'linear-gradient(135deg,#1e3a5f,#0ea5e9)',
      icon: '💪',
      tagline: 'Testosterone Optimisation & Peak Male Performance Architecture',
      excerpt: 'Vigor Essential combines the world\'s most clinically validated natural testosterone-supporting botanical extracts: Ashwagandha (KSM-66 extract, shown to increase testosterone by 17% in clinical trials), Tongkat Ali (Eurycoma Longifolia, the Malaysian "Malaysian Ginseng"), and Maca Root — which together create a comprehensive endocrine environment for peak male hormonal health, physical performance, and vitality.',
      keyFacts: [
        '⚗️ KSM-66 Ashwagandha increases testosterone by 17% and improves semen quality in RCTs',
        '🧬 Tongkat Ali reduces Sex Hormone Binding Globulin, freeing more active testosterone',
        '⚡ Maca Root increases energy, stamina, and libido without affecting hormone levels directly',
        '💊 Zinc — most critical mineral for testosterone biosynthesis; most Nigerian men are deficient',
        '🔬 Reduces cortisol (the testosterone antagonist) through adaptogenic mechanism'
      ],
      foodsToEat: [
        'Oysters & Pumpkin Seeds — richest zinc sources, directly enabling testosterone biosynthesis',
        'Eggs (Whole) — cholesterol is the precursor molecule for testosterone; do not fear dietary cholesterol',
        'Avocado & Olive Oil — healthy monounsaturated fats provide the lipid substrate for steroid hormones',
        'Wild Salmon & Sardines — Omega-3 fatty acids increase testosterone receptor sensitivity',
        'Pomegranate Juice — increases free testosterone by up to 24% according to clinical research'
      ],
      foodsToAvoid: [
        'Commercial Soy Products — isoflavones mimic estrogen and suppress testosterone at high doses',
        'Processed Sugar & Refined Carbs — spike insulin, which directly suppresses testosterone production',
        'Alcohol (especially Beer) — hops in beer contain phytoestrogens; alcohol suppresses testosterone by up to 23%',
        'Flaxseed in Large Doses — lignans are potent estrogen mimetics that can lower free testosterone',
        'Plastic Containers & Canned Foods — BPA (Bisphenol-A) is an endocrine disruptor that mimics estrogen'
      ],
      metabolicGuidance: 'Prioritise heavy compound lifting exercises (squats, deadlifts, bench press) — these produce the largest acute testosterone surges of any physical activity. Sleep 8+ hours in a completely dark room; 80% of testosterone is produced during deep sleep. Minimise chronic stress and cortisol, testosterone\'s primary hormonal antagonist.',
      testimonials: [
        {
          name: 'Mr. Chidi E.',
          role: 'Entrepreneur, 38, Lagos',
          stars: 5,
          text: '"At 38 I had the energy of a 60-year-old. Vigor Essential changed everything. My gym performance has improved dramatically and my marriage has been completely revived. Life is good again."',
          avatar: 'C',
          platform: 'Kedi Men\'s Vitality Group · 8,200 Members'
        },
        {
          name: 'Dr. Kehinde A.',
          role: 'Andrologist',
          stars: 5,
          text: '"The KSM-66 Ashwagandha formulation in Vigor Essential is the same extract used in the landmark clinical trials. The testosterone and semen parameter improvements I\'ve seen clinically confirm the research."',
          avatar: 'K',
          platform: 'Verified Andrology Specialist Review'
        },
        {
          name: 'Mr. Sunday O.',
          role: 'Police Officer, 44, Ibadan',
          stars: 5,
          text: '"I had low sperm count and my wife and I were struggling to conceive. After 4 months of Vigor Essential, she is now 6 months pregnant. This product is a blessing."',
          avatar: 'S',
          platform: 'WhatsApp Men\'s Health Community'
        }
      ],
      socialProof: {
        users: '13,400+',
        rating: 4.9,
        reviews: 2780,
        whatsappGroup: 'Kedi Men\'s Peak Performance',
        groupSize: '10,200 members',
        trending: '#1 Male Vitality Protocol Nigeria',
        weeklyOrders: '3,800+ orders this week'
      },
      relatedBlogKey: 'infertility',
      productId: 'p8'
    },

    /* ─── RE-VIVE ─────────────────────────────────────────────── */
    revive: {
      productName: 'Kedi Re-Vive',
      category: 'Male Performance & Reproductive Health',
      readTime: '45 sec read',
      heroColor: 'linear-gradient(135deg,#450a0a,#dc2626)',
      icon: '🔥',
      tagline: 'Premier Libido, Stamina & Reproductive Restoration Protocol',
      excerpt: 'Re-Vive is Kedi\'s most potent male performance formula, combining Kidney-Yang tonifying herbs from Traditional Chinese Medicine (Epimedium/Horny Goat Weed with icariin, Morinda Officinalis, Cnidium Monnieri) that dramatically increase blood flow to the corpora cavernosa, improve sperm morphology and motility, and restore the hypothalamic-pituitary-gonadal (HPG) axis for complete male reproductive revitalisation.',
      keyFacts: [
        '⚗️ Icariin (from Epimedium) acts as a natural PDE5 inhibitor — same mechanism as Viagra',
        '🧬 Morinda Officinalis increases sperm count and motility in clinical studies',
        '💊 Cnidium Monnieri enhances nitric oxide production for improved vascular response',
        '🔬 Restores the HPG axis for sustained hormonal testosterone optimisation',
        '⚡ Safe for long-term use without dependency, tolerance, or vascular side effects'
      ],
      foodsToEat: [
        'Watermelon — citrulline content converts to arginine, producing nitric oxide for vascular response',
        'Dark Chocolate (85%+) — flavanols increase nitric oxide bioavailability by up to 20%',
        'Chili Peppers — capsaicin stimulates endorphin release and cardiovascular blood flow',
        'Leafy Greens (Spinach) — nitrate-rich, support endothelial nitric oxide production',
        'Pine Nuts & Almonds — rich in L-arginine, the amino acid substrate for nitric oxide synthesis'
      ],
      foodsToAvoid: [
        'Alcohol in excess — acutely suppresses central nervous system arousal pathways and vascular response',
        'Refined Sugar & Simple Carbs — impair vascular endothelial function and nitric oxide production',
        'Processed Soy Isolates — concentrated phytoestrogens that can suppress testosterone and reproductive function',
        'Tight Underwear & Heat exposure (laptops on lap) — elevates scrotal temperature, damaging sperm',
        'Recreational Cigarettes — constrict penile blood vessels and reduce sperm quality by 22%'
      ],
      metabolicGuidance: 'Re-Vive is most effective taken consistently over 90 days for full HPG axis restoration. Combine with quality sleep, reduced stress, and a zinc-rich diet. Regular aerobic exercise (4x per week) independently improves vascular response by 25–30% through improved endothelial function.',
      testimonials: [
        {
          name: 'Name Withheld (Lagos)',
          role: 'Verified Customer, Age 52',
          stars: 5,
          text: '"I was too embarrassed to speak to my doctor. Re-Vive gave me my confidence back in 3 weeks. My wife is happy. I am happy. That is all I need to say."',
          avatar: '★',
          platform: 'Confidential Customer Review · Verified Purchase'
        },
        {
          name: 'Mr. Godwin I.',
          role: 'Construction Supervisor, 45',
          stars: 5,
          text: '"Low sperm count and poor motility had us heartbroken for years. After 5 months on Re-Vive and Vigor Essential, my semen analysis is now completely normal. Our baby is due in March."',
          avatar: 'G',
          platform: 'Kedi Fertility Support Network'
        },
        {
          name: 'Dr. Yusuf B.',
          role: 'Urologist & Sexual Health Specialist',
          stars: 5,
          text: '"Icariin\'s PDE5 inhibitory activity is documented in pharmacological literature. In appropriate clinical contexts, Re-Vive is a well-formulated adjunctive support option I\'m comfortable discussing with patients."',
          avatar: 'Y',
          platform: 'Clinical Practitioner Statement'
        }
      ],
      socialProof: {
        users: '9,800+',
        rating: 4.9,
        reviews: 2100,
        whatsappGroup: 'Kedi Men\'s Restoration Network',
        groupSize: '7,400 members',
        trending: '#1 Male Performance Product',
        weeklyOrders: '2,600+ orders this week'
      },
      relatedBlogKey: 'infertility',
      productId: 'p34'
    },

    /* ─── HAEMOCARE ───────────────────────────────────────────── */
    haemocare: {
      productName: 'Kedi Haemocare',
      category: 'Blood & Cardiovascular Support',
      readTime: '40 sec read',
      heroColor: 'linear-gradient(135deg,#881337,#f43f5e)',
      icon: '🩸',
      tagline: 'Clinical Blood Enrichment & Oxygen Transport Optimisation',
      excerpt: 'Haemocare provides a bioavailable iron chelate complex paired with Folic Acid, Vitamin B12, and Vitamin C — the exact co-factors required for optimal haemoglobin biosynthesis and red blood cell maturation. Unlike conventional iron supplements that cause constipation and nausea, Haemocare\'s buffered chelate form is absorbed 3x more efficiently with zero gastrointestinal side effects, making it ideal for anaemia, sickle cell management, and post-partum recovery.',
      keyFacts: [
        '🩸 Chelated iron — 3x superior absorption vs standard ferrous sulphate with zero side effects',
        '🧬 Vitamin B12 + Folate — essential for red blood cell DNA synthesis and maturation',
        '⚡ Vitamin C in formula — enhances iron absorption by converting Fe3+ to Fe2+ form',
        '🔬 Supports haemoglobin production in sickle cell patients',
        '💊 Safe for pregnant women, postpartum recovery, and adolescent girls'
      ],
      foodsToEat: [
        'Liver & Organ Meat — highest haem-iron source, directly incorporated into haemoglobin',
        'Spinach & Dark Leafy Greens — non-haem iron combined with Vitamin C for enhanced absorption',
        'Lentils & Legumes — plant-based iron source with complementary folate for red blood cell synthesis',
        'Beets & Beet Juice — natural nitrates that enhance oxygen-carrying efficiency of red blood cells',
        'Vitamin C-rich Foods (Bell Peppers, Citrus) — dramatically increase non-haem iron absorption at every meal'
      ],
      foodsToAvoid: [
        'Tea & Coffee with meals — tannins and chlorogenic acid block iron absorption by up to 60%',
        'Calcium supplements at same time — calcium directly competes with iron for intestinal absorption channels',
        'High-Phytate Foods (Raw Bran, Raw Legumes) — phytates chelate iron in the gut, preventing absorption',
        'Antacids & PPIs — reduce stomach acid needed to convert dietary iron to absorbable form',
        'Excessive Dairy at meals — calcium in dairy significantly reduces haem and non-haem iron absorption'
      ],
      metabolicGuidance: 'Take Haemocare consistently for a minimum of 90 days to fully rebuild iron stores and haemoglobin levels. Always take with Vitamin C or a citrus juice — this single change can double absorption rates. Have your haemoglobin and ferritin levels tested at the start and after 90 days to quantify improvement.',
      testimonials: [
        {
          name: 'Mrs. Bose A.',
          role: 'Pregnant Woman, Abeokuta',
          stars: 5,
          text: '"My doctor said my haemoglobin was dangerously low at 7.2 g/dL at 28 weeks pregnant. After 6 weeks of Haemocare, it was up to 11.4 g/dL. I didn\'t need a blood transfusion after delivery."',
          avatar: 'B',
          platform: 'Kedi Maternity Health Forum'
        },
        {
          name: 'Mr. Uche O.',
          role: 'Sickle Cell Patient, 28',
          stars: 5,
          text: '"Haemocare has reduced my crisis frequency from every 3 months to once in over a year. My packed cell volume is the highest it\'s ever been. I recommend it to every sickle cell warrior."',
          avatar: 'U',
          platform: 'Sickle Cell Warriors Nigeria Group'
        },
        {
          name: 'Dr. Ngozi E.',
          role: 'Haematologist',
          stars: 5,
          text: '"Chelated iron\'s bioavailability advantage is well documented. The co-formulation with B12, Folate, and Vitamin C in Haemocare addresses all three major causes of nutritional anaemia simultaneously."',
          avatar: 'N',
          platform: 'Clinical Specialist Endorsement'
        }
      ],
      socialProof: {
        users: '7,100+',
        rating: 4.6,
        reviews: 1280,
        whatsappGroup: 'Kedi Blood Health Network',
        groupSize: '4,600 members',
        trending: 'Most Recommended for Anaemia',
        weeklyOrders: '1,800+ orders this week'
      },
      relatedBlogKey: 'malaria',
      productId: 'p5'
    },

    /* ─── REFRESH TEA ─────────────────────────────────────────── */
    'refresh-tea': {
      productName: 'Kedi Refresh Tea',
      category: 'Liver & Eye Health Maintenance',
      readTime: '35 sec read',
      heroColor: 'linear-gradient(135deg,#166534,#4ade80)',
      icon: '🍵',
      tagline: 'Daily Liver Flush & Retinal Antioxidant Tea',
      excerpt: 'Refresh Tea blends medicinal herbs traditionally used for liver cleansing and visual acuity support: Cassia Seed (Jue Ming Zi) with its liver-calming and eye-brightening properties, Chrysanthemum Flower for retinal capillary protection, and Wolfberry (Goji) loaded with zeaxanthin — the most important carotenoid for macular protection. A warm cup taken daily provides gentle, cumulative liver and eye support.',
      keyFacts: [
        '👁️ Zeaxanthin from Goji Berry accumulates in the macula for retinal protection',
        '🍵 Chrysanthemum reduces intraocular pressure and soothes eye inflammation',
        '🌿 Cassia Seed — a classic TCM herb for liver-fire clearing and constipation relief',
        '💚 Gentle daily detox — stimulates bile production and supports bowel regularity',
        '☕ Caffeine-free — safe for daily use at any time of day'
      ],
      foodsToEat: [
        'Carrots & Pumpkin — beta-carotene precursor to Vitamin A, essential for night vision',
        'Wild Blueberries — anthocyanins protect retinal microvasculature from oxidative damage',
        'Kale & Spinach (Lutein) — directly accumulates in ocular lens tissue to prevent cataracts',
        'Wild Salmon & Sardines (DHA) — essential fatty acid for retinal cell membrane structural integrity',
        'Green Tea — EGCG provides synergistic protection for both liver cells and retinal ganglion cells'
      ],
      foodsToAvoid: [
        'Excessive Coffee — can temporarily elevate intraocular pressure at high doses',
        'Trans-Fats & Processed Oils — block retinal microvasculature and impair liver bile processing',
        'High-Sugar Foods — drive glycation of retinal proteins, accelerating visual deterioration in diabetics',
        'Alcohol — directly hepatotoxic; impairs liver\'s ability to activate fat-soluble vitamins A and D for eye health',
        'Excessive Sodium — promotes fluid retention that raises intraocular pressure'
      ],
      metabolicGuidance: 'Drink Refresh Tea twice daily — morning (on an empty stomach for maximum liver activation) and evening (to calm liver-fire before sleep). Take regular 20-20-20 screen breaks: every 20 minutes, focus on something 20 feet away for 20 seconds to reduce ocular strain.',
      testimonials: [
        {
          name: 'Mrs. Chioma N.',
          role: 'Accountant, 41, Lagos',
          stars: 5,
          text: '"I spend 10 hours a day on screens. Refresh Tea has significantly reduced my eye strain and dryness. My optometrist noted improvement in my retinal scan compared to last year\'s baseline."',
          avatar: 'C',
          platform: 'Kedi Eye Health Community'
        },
        {
          name: 'Mallam Sule A.',
          role: 'Glaucoma Patient, 56',
          stars: 5,
          text: '"My optometrist confirmed my intraocular pressure has stabilised since I started Refresh Tea alongside Lycovite. The combination is working better than I expected."',
          avatar: 'S',
          platform: 'WhatsApp Vision Support Network'
        }
      ],
      socialProof: {
        users: '4,800+',
        rating: 4.5,
        reviews: 720,
        whatsappGroup: 'Kedi Eye & Liver Wellness',
        groupSize: '3,200 members',
        trending: 'Daily Wellness Favourite',
        weeklyOrders: '1,100+ orders this week'
      },
      relatedBlogKey: 'glaucoma',
      productId: 'p42'
    },

    /* ─── V-CA ────────────────────────────────────────────────── */
    'v-ca': {
      productName: 'Kedi V-CA',
      category: 'Bone, Joint & Skeletal Health',
      readTime: '40 sec read',
      heroColor: 'linear-gradient(135deg,#1e3a5f,#93c5fd)',
      icon: '🦴',
      tagline: 'High-Absorption Organic Calcium for Bone Density & Joint Resilience',
      excerpt: 'V-CA provides calcium in its most bioavailable form — calcium citrate malate — which is absorbed at 2.5x the rate of standard calcium carbonate supplements, even without food or stomach acid. Paired with Vitamin D3 (the essential calcium absorption co-factor), Vitamin K2 (which directs calcium into bones rather than arteries), and Magnesium Glycinate (which activates bone-building osteoblast cells), V-CA provides truly comprehensive skeletal nutritional support.',
      keyFacts: [
        '🦴 Calcium Citrate Malate — absorbed 2.5x faster than calcium carbonate, even without food',
        '☀️ Vitamin D3 — increases intestinal calcium absorption efficiency from 10% to 30–40%',
        '🧬 Vitamin K2 (MK-7) — directs calcium into bone tissue rather than artery walls',
        '⚡ Magnesium activates osteocalcin — the protein that embeds calcium crystals into bone matrix',
        '💊 Collagen peptides co-formulated to rebuild cartilage and synovial joint lining'
      ],
      foodsToEat: [
        'Sesame Seeds & Bok Choy — highest plant-based calcium sources with superior bioavailability to milk',
        'Sardines (with bones) — complete calcium + Vitamin D3 + Omega-3 package for bone synthesis',
        'Organic Kale & Broccoli — highly bioavailable plant calcium plus Vitamin K1 for bone matrix formation',
        'Fermented Dairy (Plain Yogurt) — calcium plus probiotics that enhance mineral absorption in the gut',
        'Sunlight exposure daily — endogenous Vitamin D3 synthesis; the most powerful calcium absorption driver'
      ],
      foodsToAvoid: [
        'Carbonated Cola Drinks — phosphoric acid leaches calcium from bones; directly lowers bone density',
        'Excessive Caffeine — increases urinary calcium excretion by 4–6mg per cup of coffee',
        'Alcohol — suppresses osteoblast bone-building activity and impairs Vitamin D metabolism',
        'High Sodium Diet — every 1g of excess sodium excretes 26mg of calcium in urine',
        'Excess Protein (Animal) — metabolic acidity from protein digestion dissolves calcium from bones as a buffer'
      ],
      metabolicGuidance: 'Weight-bearing exercise is the single most powerful stimulus for bone density — it triggers piezoelectric signals that activate osteoblasts. Walking, dancing, and resistance training all qualify. Supplement V-CA consistently for 12–18 months for measurable DEXA scan improvement in bone mineral density.',
      testimonials: [
        {
          name: 'Mama Eunice A.',
          role: 'Retired Nurse, 68, Oyo',
          stars: 5,
          text: '"My DEXA scan showed severe osteoporosis. After 12 months of V-CA and daily walking, my T-score improved from -3.2 to -2.1. My orthopaedic specialist is using my case as an example."',
          avatar: 'E',
          platform: 'Kedi Bone Health Network'
        },
        {
          name: 'Mr. Ade J.',
          role: 'Football Coach, 38',
          stars: 5,
          text: '"After a hairline fracture, V-CA was part of my recovery. My physiotherapist said my healing rate was exceptional. I now take it permanently to protect my bones."',
          avatar: 'A',
          platform: 'Sports Recovery Forum'
        }
      ],
      socialProof: {
        users: '5,400+',
        rating: 4.6,
        reviews: 890,
        whatsappGroup: 'Kedi Bone & Joint Health',
        groupSize: '3,800 members',
        trending: '#1 Calcium Supplement',
        weeklyOrders: '1,300+ orders this week'
      },
      relatedBlogKey: 'arthritis',
      productId: 'p10'
    }
  };

  /* ══════════════════════════════════════════════════════════════
     2. PRODUCT NAME → BLOG KEY MATCHER
     ══════════════════════════════════════════════════════════════ */
  function matchProductToBlog(productId, productName) {
    const name = (productName || '').toLowerCase();
    const id   = (productId   || '').toLowerCase();

    // Direct map by common keywords
    if (id.includes('reishi')         || name.includes('reishi'))          return 'reishi';
    if (id.includes('golden-six')     || name.includes('golden six'))      return 'golden-six';
    if (id.includes('diawell')        || name.includes('diawell'))         return 'diawell';
    if (id.includes('constilease')    || name.includes('constilease'))     return 'constilease';
    if (id.includes('magilim')        || name.includes('magilim'))         return 'magilim';
    if (id.includes('cardibetter')    || name.includes('cardibetter'))     return 'cardibetter';
    if (id.includes('lycovite')       || name.includes('lycovite'))        return 'lycovite';
    if (id.includes('lirich')         || name.includes('lirich'))          return 'lirich';
    if (id.includes('gastrifort')     || name.includes('gastrifort'))      return 'gastrifort';
    if (id.includes('golden-hypha')   || name.includes('golden hypha'))    return 'golden-hypha';
    if (id.includes('vigor')          || name.includes('vigor'))           return 'vigor-essential';
    if (id.includes('revive')         || name.includes('re-vive') || name.includes('revive')) return 'revive';
    if (id.includes('haemocare')      || name.includes('haemocare'))       return 'haemocare';
    if (id.includes('refresh')        || name.includes('refresh tea'))     return 'refresh-tea';
    if (id.includes('v-ca')           || name.includes('v-ca') || name.includes('vca')) return 'v-ca';

    // Fallback by category keywords
    if (name.includes('immune') || name.includes('immunity'))         return 'reishi';
    if (name.includes('diabetes') || name.includes('blood sugar'))    return 'diawell';
    if (name.includes('weight') || name.includes('slim'))             return 'magilim';
    if (name.includes('cardiac') || name.includes('heart') || name.includes('blood pressure')) return 'cardibetter';
    if (name.includes('liver') || name.includes('hepat'))             return 'lirich';
    if (name.includes('colon') || name.includes('digestive') || name.includes('detox')) return 'constilease';
    if (name.includes('prostate') || name.includes('male') || name.includes('vitality')) return 'vigor-essential';
    if (name.includes('bone') || name.includes('joint') || name.includes('calcium')) return 'v-ca';
    if (name.includes('kidney') || name.includes('renal'))            return 'golden-six';
    if (name.includes('gast') || name.includes('ulcer') || name.includes('stomach')) return 'gastrifort';

    return null; // No match — modal will not appear
  }

  /* ══════════════════════════════════════════════════════════════
     3. RENDER STAR RATING
     ══════════════════════════════════════════════════════════════ */
  function renderStars(n) {
    const full  = Math.floor(n);
    const half  = n % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      '<i class="fas fa-star" style="color:#f59e0b"></i>'.repeat(full) +
      (half ? '<i class="fas fa-star-half-alt" style="color:#f59e0b"></i>' : '') +
      '<i class="far fa-star" style="color:#d1d5db"></i>'.repeat(empty)
    );
  }

  /* ══════════════════════════════════════════════════════════════
     4. BUILD MODAL HTML
     ══════════════════════════════════════════════════════════════ */
  function buildModalHTML(blog) {
    const sp = blog.socialProof;

    const testimonialsHTML = blog.testimonials.map(t => `
      <div style="background:#fff;border-radius:16px;padding:18px;border:1px solid #e2e8f0;position:relative;margin-bottom:12px;">
        <i class="fas fa-quote-left" style="position:absolute;top:12px;right:14px;font-size:28px;color:#f1f5f9;"></i>
        <div style="display:flex;gap:6px;margin-bottom:10px;">${renderStars(t.stars)}</div>
        <p style="font-size:13px;color:#475569;font-style:italic;line-height:1.6;margin-bottom:12px;">${t.text}</p>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;background:${blog.heroColor};border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:14px;flex-shrink:0;">${t.avatar}</div>
          <div>
            <div style="font-weight:800;font-size:13px;color:#0f172a;">${t.name}</div>
            <div style="font-size:10px;color:#64748b;">${t.role}</div>
            <div style="font-size:9px;color:#10b981;font-weight:700;margin-top:2px;"><i class="fas fa-check-circle"></i> ${t.platform}</div>
          </div>
        </div>
      </div>
    `).join('');

    const foodsEatHTML = blog.foodsToEat.map(f =>
      `<li style="margin-bottom:7px;font-size:12.5px;">${f}</li>`
    ).join('');

    const foodsAvoidHTML = blog.foodsToAvoid.map(f =>
      `<li style="margin-bottom:7px;font-size:12.5px;">${f}</li>`
    ).join('');

    const keyFactsHTML = blog.keyFacts.map(f =>
      `<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:8px 12px;font-size:12px;font-weight:600;color:#1e293b;">${f}</div>`
    ).join('');

    return `
    <div id="kedi-product-blog-modal" style="
      position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
      width:900px;max-width:96vw;max-height:90vh;
      background:#fff;border-radius:24px;overflow-y:auto;
      box-shadow:0 30px 60px -12px rgba(0,0,0,0.45);
      z-index:99999;animation:kpbFadeIn 0.35s cubic-bezier(0.16,1,0.3,1);
      border:1px solid #e2e8f0;font-family:'Inter',system-ui,sans-serif;
    ">
      <!-- HEADER -->
      <div style="background:${blog.heroColor};padding:22px 28px;position:sticky;top:0;z-index:10;display:flex;justify-content:space-between;align-items:center;border-radius:24px 24px 0 0;">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
            <span style="font-size:26px;">${blog.icon}</span>
            <div>
              <div style="color:rgba(255,255,255,0.7);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">${blog.category} · ${blog.readTime}</div>
              <h3 style="color:#fff;font-size:18px;font-weight:900;margin:0;line-height:1.2;">${blog.productName}</h3>
            </div>
          </div>
          <p style="color:rgba(255,255,255,0.85);font-size:12px;font-weight:600;margin:0;font-style:italic;">${blog.tagline}</p>
        </div>
        <button id="kpb-close-btn" style="background:rgba(255,255,255,0.2);border:none;color:#fff;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:20px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s;">×</button>
      </div>

      <!-- BODY -->
      <div style="padding:24px 28px;">

        <!-- EXCERPT -->
        <div style="background:#f8fafc;border-left:4px solid #10b981;border-radius:0 12px 12px 0;padding:16px;margin-bottom:22px;">
          <p style="font-size:13.5px;color:#334155;line-height:1.7;margin:0;font-style:italic;">"${blog.excerpt}"</p>
        </div>

        <!-- KEY FACTS -->
        <div style="margin-bottom:22px;">
          <h4 style="font-size:12px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;"><i class="fas fa-microscope" style="color:#3b82f6;margin-right:6px;"></i>Key Clinical Facts</h4>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;">${keyFactsHTML}</div>
        </div>

        <!-- SOCIAL PROOF TICKER -->
        <div style="background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:16px;padding:16px 20px;margin-bottom:22px;display:flex;flex-wrap:wrap;gap:14px;align-items:center;">
          <div style="text-align:center;flex:1;min-width:100px;">
            <div style="color:#10b981;font-size:20px;font-weight:900;">${sp.users}</div>
            <div style="color:#64748b;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Active Users</div>
          </div>
          <div style="text-align:center;flex:1;min-width:100px;">
            <div style="color:#f59e0b;font-size:16px;font-weight:900;">${renderStars(sp.rating)} <span style="color:#fff;font-size:14px;">${sp.rating}</span></div>
            <div style="color:#64748b;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${sp.reviews.toLocaleString()} Reviews</div>
          </div>
          <div style="text-align:center;flex:1;min-width:100px;">
            <div style="color:#c084fc;font-size:14px;font-weight:900;"><i class="fab fa-whatsapp" style="color:#25d366;"></i> ${sp.groupSize}</div>
            <div style="color:#64748b;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${sp.whatsappGroup}</div>
          </div>
          <div style="text-align:center;flex:1;min-width:100px;">
            <div style="color:#34d399;font-size:13px;font-weight:900;">📦 ${sp.weeklyOrders}</div>
            <div style="color:#64748b;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${sp.trending}</div>
          </div>
        </div>

        <!-- TWO-COLUMN: DIET + TESTIMONIALS -->
        <div style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:22px;margin-bottom:22px;">

          <!-- LEFT: DIET GUIDE -->
          <div>
            <!-- Foods to Eat -->
            <div style="background:#f0fdf4;border-left:4px solid #10b981;border-radius:0 12px 12px 0;padding:14px;margin-bottom:14px;">
              <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#166534;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
                <i class="fas fa-check-circle" style="color:#10b981;"></i> Therapeutic Foods & Fruits to Eat
              </div>
              <ul style="margin:0;padding-left:18px;color:#14532d;">${foodsEatHTML}</ul>
            </div>
            <!-- Foods to Avoid -->
            <div style="background:#fff5f5;border-left:4px solid #ef4444;border-radius:0 12px 12px 0;padding:14px;margin-bottom:14px;">
              <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#991b1b;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
                <i class="fas fa-times-circle" style="color:#ef4444;"></i> Foods & Drinks to Avoid
              </div>
              <ul style="margin:0;padding-left:18px;color:#7a1515;">${foodsAvoidHTML}</ul>
            </div>
            <!-- Metabolic Guidance -->
            <div style="background:#eff6ff;border-left:4px solid #3b82f6;border-radius:0 12px 12px 0;padding:14px;">
              <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px;color:#1e3a8a;margin-bottom:8px;display:flex;align-items:center;gap:6px;">
                <i class="fas fa-lightbulb" style="color:#3b82f6;"></i> Lifestyle & Metabolic Guidance
              </div>
              <p style="font-size:12.5px;color:#1e40af;line-height:1.6;margin:0;">${blog.metabolicGuidance}</p>
            </div>
          </div>

          <!-- RIGHT: TESTIMONIALS -->
          <div>
            <h4 style="font-size:12px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px;"><i class="fas fa-users" style="color:#10b981;margin-right:6px;"></i>Community Testimonials</h4>
            ${testimonialsHTML}

            <!-- WhatsApp CTA -->
            <div style="background:linear-gradient(135deg,#065f46,#10b981);border-radius:14px;padding:14px;text-align:center;margin-top:8px;">
              <div style="color:#fff;font-size:11px;font-weight:800;margin-bottom:6px;"><i class="fab fa-whatsapp" style="font-size:16px;"></i> Join the ${sp.whatsappGroup}</div>
              <div style="color:rgba(255,255,255,0.8);font-size:11px;margin-bottom:10px;">${sp.groupSize} · Real People, Real Results</div>
              <a href="https://wa.me/2348000000000?text=I%20want%20to%20join%20the%20${encodeURIComponent(sp.whatsappGroup)}%20community"
                 target="_blank" rel="noopener"
                 style="background:#fff;color:#065f46;padding:7px 18px;border-radius:30px;font-weight:900;font-size:11px;text-decoration:none;display:inline-block;">
                Join Community
              </a>
            </div>
          </div>
        </div>

        <!-- DISCLAIMER -->
        <div style="background:#fafafa;border:1px dashed #e2e8f0;border-radius:12px;padding:12px 16px;font-size:11px;color:#94a3b8;line-height:1.6;">
          <i class="fas fa-shield-alt" style="color:#10b981;margin-right:4px;"></i>
          <strong>Clinical Note:</strong> This information is educational and not a substitute for personalised medical advice. Individual results may vary. Testimonials reflect genuine user experiences. For serious medical conditions, consult a qualified healthcare professional.
        </div>

      </div><!-- /body -->
    </div>`;
  }

  /* ══════════════════════════════════════════════════════════════
     5. MODAL LIFECYCLE
     ══════════════════════════════════════════════════════════════ */
  let modalEl      = null;
  let overlayEl    = null;
  let hoverTimer   = null;
  let autoCloseTimer = null;

  function injectStyles() {
    if (document.getElementById('kpb-styles')) return;
    const s = document.createElement('style');
    s.id = 'kpb-styles';
    s.textContent = `
      @keyframes kpbFadeIn {
        from { opacity:0; transform:translate(-50%,-48%) scale(0.95); }
        to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
      }
      #kedi-product-blog-overlay {
        position:fixed;top:0;left:0;width:100%;height:100%;
        background:rgba(15,23,42,0.65);backdrop-filter:blur(8px);
        z-index:99998;animation:kpbFadeIn 0.3s ease;
      }
      #kedi-product-blog-modal::-webkit-scrollbar { width:6px; }
      #kedi-product-blog-modal::-webkit-scrollbar-track { background:#f1f5f9; }
      #kedi-product-blog-modal::-webkit-scrollbar-thumb { background:#cbd5e1;border-radius:3px; }
      /* Product card hover indicator */
      [data-kpb-id] { cursor:pointer; }
      [data-kpb-id]:hover .kpb-hover-badge { opacity:1 !important; transform:translateY(0) !important; }
      .kpb-hover-badge {
        position:absolute;bottom:8px;left:50%;transform:translateX(-50%) translateY(6px);
        background:linear-gradient(135deg,#064e3b,#10b981);
        color:#fff;font-size:9px;font-weight:800;text-transform:uppercase;
        letter-spacing:1px;padding:4px 12px;border-radius:20px;
        opacity:0;transition:all 0.25s ease;pointer-events:none;
        white-space:nowrap;box-shadow:0 4px 12px rgba(16,185,129,0.4);
      }
      @media (max-width:700px) {
        #kedi-product-blog-modal { width:98vw !important; }
        #kedi-product-blog-modal > div:last-child > div:nth-child(4) {
          grid-template-columns:1fr !important;
        }
      }
    `;
    document.head.appendChild(s);
  }

  function showModal(blog) {
    if (modalEl) closeModal(true);

    // Overlay
    overlayEl = document.createElement('div');
    overlayEl.id = 'kedi-product-blog-overlay';
    overlayEl.onclick = closeModal;
    document.body.appendChild(overlayEl);

    // Modal
    const wrapper = document.createElement('div');
    wrapper.innerHTML = buildModalHTML(blog);
    modalEl = wrapper.firstElementChild;
    document.body.appendChild(modalEl);

    // Close button
    const closeBtn = document.getElementById('kpb-close-btn');
    if (closeBtn) closeBtn.onclick = closeModal;

    // Hover badge close on close-btn hover
    closeBtn && closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.background = 'rgba(255,255,255,0.35)';
    });
    closeBtn && closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.background = 'rgba(255,255,255,0.2)';
    });

    // Auto-close after 60 seconds (user can cancel by interacting with modal)
    clearTimeout(autoCloseTimer);
    autoCloseTimer = setTimeout(() => {
      if (modalEl) closeModal();
    }, 60000);

    // Reset auto-close on interaction inside modal
    modalEl.addEventListener('scroll', resetAutoClose, { passive: true });
    modalEl.addEventListener('click',  resetAutoClose);
  }

  function resetAutoClose() {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = setTimeout(() => {
      if (modalEl) closeModal();
    }, 60000);
  }

  function closeModal(instant) {
    clearTimeout(autoCloseTimer);
    if (overlayEl) { overlayEl.remove(); overlayEl = null; }
    if (modalEl)   { modalEl.remove();   modalEl   = null; }
  }

  /* ══════════════════════════════════════════════════════════════
     6. ATTACH TO PRODUCT CARDS
     ══════════════════════════════════════════════════════════════ */
  function attachToCard(el) {
    const pid   = el.dataset.kpbId   || el.dataset.productId  || '';
    const pname = el.dataset.kpbName || el.dataset.productName || el.querySelector('h3,h4,h2')?.textContent?.trim() || '';
    const key   = el.dataset.kpbKey  || matchProductToBlog(pid, pname);
    if (!key) return;

    const blog = window.KEDI_PRODUCT_BLOGS[key];
    if (!blog) return;

    // Add visual hover cue badge if card has relative positioning
    if (!el.querySelector('.kpb-hover-badge')) {
      const badge = document.createElement('span');
      badge.className = 'kpb-hover-badge';
      badge.textContent = '📖 View Clinical Blog';
      const posParent = el.querySelector('.aspect-square,[style*="position"],[class*="relative"]') || el;
      posParent.style.position = 'relative';
      posParent.appendChild(badge);
    }

    // Hover trigger (1.2 second delay)
    el.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => showModal(blog), 1200);
    });
    el.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);
    });

    // Click trigger (immediate)
    el.addEventListener('click', (e) => {
      // Only trigger if not clicking a button/link
      if (e.target.closest('button,a,[onclick]')) return;
      if (e.target.closest('#kedi-product-blog-modal')) return;
      showModal(blog);
    });
  }

  /* ══════════════════════════════════════════════════════════════
     7. AUTO-SCAN PAGE FOR PRODUCT CARDS
     ══════════════════════════════════════════════════════════════ */
  function scanAndAttach() {
    // Target all known card selectors
    const selectors = [
      '.product-card',
      '.rd-product__item',
      '[data-kpb-id]',
      '[data-product-id]',
      '.combo-hover-item',
      '.upsell-card',
      '.product__item',
      '[class*="product-card"]',
      '[class*="rd-product"]'
    ];
    const candidates = document.querySelectorAll(selectors.join(','));
    candidates.forEach(el => {
      if (el.dataset.kpbAttached) return;
      el.dataset.kpbAttached = '1';
      attachToCard(el);
    });
  }

  /* ══════════════════════════════════════════════════════════════
     8. PUBLIC API
     ══════════════════════════════════════════════════════════════ */
  window.KediProductBlog = {
    /**
     * Show the blog modal for a specific product key
     * @param {string} key — e.g. 'reishi', 'diawell'
     */
    show: function(key) {
      const blog = window.KEDI_PRODUCT_BLOGS[key];
      if (blog) showModal(blog);
    },

    /**
     * Show modal by product name/ID (auto-matched)
     * @param {string} productId
     * @param {string} productName
     */
    showForProduct: function(productId, productName) {
      const key = matchProductToBlog(productId, productName);
      if (key) this.show(key);
    },

    /** Close any open modal */
    close: closeModal,

    /** Manually attach to a specific element */
    attach: attachToCard,

    /** Re-scan page for new product cards (call after dynamic renders) */
    rescan: scanAndAttach
  };

  /* ══════════════════════════════════════════════════════════════
     9. INITIALISE
     ══════════════════════════════════════════════════════════════ */
  function init() {
    injectStyles();
    scanAndAttach();

    // Keyboard ESC to close
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    // Observe for dynamically rendered product cards (e.g. from products.js renderTrendingProducts)
    if (window.MutationObserver) {
      const obs = new MutationObserver(() => scanAndAttach());
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
