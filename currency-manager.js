/**
 * Aura Herbs Global Currency Intelligence
 * Handles real-time conversion between NGN, USD, and PI (GCV)
 */

const CurrencyManager = {
    current: localStorage.getItem('aura_currency') || 'NGN',
    
    // Configured Rates per User Specification
    // 1 USD = 1500 NGN
    // 1 PI = 314159 USD
    rates: {
        NGN: 1,
        USD: 1 / 1500,
        PI: 1 / (314159 * 1500)
    },

    // Disclosure Strings for transparency
    disclosures: {
        NGN: "Settlement in Nigerian Naira (₦) at clinical baseline.",
        USD: "Settlement in US Dollars ($) | Rate: $1 = ₦1,500.",
        PI: "Settlement in Pi (π) | GCV Rate: 1π = $314,159 | $1 = ₦1,500 | Calculation: 1π = ₦471,238,500"
    },

    symbols: {
        NGN: '₦',
        USD: '$',
        PI: 'π'
    },

    init() {
        this.applyToPage();
        this.setupSwitchers();
    },

    setCurrency(currency) {
        if (!this.symbols[currency]) return;
        this.current = currency;
        localStorage.setItem('aura_currency', currency);
        this.applyToPage();
        
        // Notify other systems (e.g., Cart)
        window.dispatchEvent(new CustomEvent('auraCurrencyChanged', { detail: { currency } }));
    },

    format(baseNgn) {
        const rate = this.rates[this.current];
        const val = baseNgn * rate;
        
        if (this.current === 'PI') {
            // High precision for GCV Pi values
            return this.symbols[this.current] + val.toFixed(10);
        }
        
        return this.symbols[this.current] + val.toLocaleString(undefined, {
            minimumFractionDigits: this.current === 'USD' ? 2 : 0,
            maximumFractionDigits: 2
        });
    },

    applyToPage() {
        // Update all elements with data-base-price (stored in NGN)
        document.querySelectorAll('[data-base-price]').forEach(el => {
            const basePrice = parseFloat(el.getAttribute('data-base-price'));
            const newText = this.format(basePrice);
            
            // Only animate if the text actually changed
            if (el.textContent !== newText) {
                el.textContent = newText;
                el.classList.remove('price-animate');
                void el.offsetWidth; // Trigger reflow
                el.classList.add('price-animate');
            }
        });

        // Update active states in switchers
        document.querySelectorAll('[data-currency-set]').forEach(btn => {
            if (btn.getAttribute('data-currency-set') === this.current) {
                btn.classList.add('active-currency');
                btn.classList.remove('opacity-40');
            } else {
                btn.classList.remove('active-currency');
                btn.classList.add('opacity-40');
            }
        });
        
        // Update global currency indicators
        document.querySelectorAll('.current-currency-symbol').forEach(el => el.textContent = this.symbols[this.current]);
        
        // Update GCV Disclosure Displays
        document.querySelectorAll('.gcv-disclosure').forEach(el => {
            el.textContent = this.disclosures[this.current];
            if (this.current === 'PI') {
                el.classList.add('text-emerald-500', 'font-black');
            } else {
                el.classList.remove('text-emerald-500', 'font-black');
            }
        });
    },

    setupSwitchers() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-currency-set]');
            if (btn) {
                this.setCurrency(btn.getAttribute('data-currency-set'));
            }
        });
    }
};

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => CurrencyManager.init());
window.CurrencyManager = CurrencyManager;
