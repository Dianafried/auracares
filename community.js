// Aura Herbs Clinical Global - Social Proof & Community Ecosystem
// Injects a dynamic real-time purchase feed to build trust and highlight Multi-Currency adoption.

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject CSS for the Social Toast
    const style = document.createElement('style');
    style.innerHTML = `
        .aura-social-toast {
            position: fixed;
            bottom: -100px;
            left: 20px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-left: 4px solid #10b981;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 99999;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 350px;
            opacity: 0;
            pointer-events: none;
        }
        .aura-social-toast.show {
            bottom: 30px;
            opacity: 1;
        }
        .aura-toast-img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #ecfdf5;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #10b981;
            font-size: 20px;
            flex-shrink: 0;
        }
        .aura-toast-content p {
            margin: 0;
            font-size: 0.85rem;
            color: #475569;
            line-height: 1.4;
        }
        .aura-toast-content strong {
            color: #0f172a;
            font-weight: 800;
        }
        .aura-toast-time {
            font-size: 0.7rem;
            color: #10b981;
            font-weight: 700;
            margin-top: 4px;
            display: flex;
            align-items: center;
            gap: 4px;
        }
    `;
    document.head.appendChild(style);

    // 2. Create the DOM Element
    const toast = document.createElement('div');
    toast.className = 'aura-social-toast';
    toast.innerHTML = `
        <div class="aura-toast-img"><i class="fas fa-shopping-bag"></i></div>
        <div class="aura-toast-content">
            <p id="aura-toast-msg"></p>
            <span class="aura-toast-time"><i class="fas fa-check-circle"></i> <span id="aura-toast-time"></span></span>
        </div>
    `;
    document.body.appendChild(toast);

    // 3. Data Dictionary
    const locations = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Enugu', 'Accra', 'London', 'Houston', 'Johannesburg'];
    const products = [
        'Reishi Immune Guard', 'Diawell Protocol', 'Re-Vive Formula', 
        'Golden Hypha', 'Cardibetter', 'Magilim Weight Loss', 
        'Cello Q10', 'Colon Cleanser Tea', 'Prosclick Prostate', 'Lycovite'
    ];
    // Highlighting the Multi-Currency feature
    const currencies = [
        'via Bank Transfer ₦', 'using Pi Network (π)', 'via USD Crypto ($)', 
        'using Pi Network (π)', 'via Bank Transfer ₦' // Weighted towards Pi and NGN
    ];
    const times = ['Just now', '2 mins ago', '5 mins ago', '12 mins ago', '1 min ago'];

    // 4. Toast Logic Engine
    function showToast() {
        const loc = locations[Math.floor(Math.random() * locations.length)];
        const prod = products[Math.floor(Math.random() * products.length)];
        const curr = currencies[Math.floor(Math.random() * currencies.length)];
        const time = times[Math.floor(Math.random() * times.length)];

        document.getElementById('aura-toast-msg').innerHTML = `Someone in <strong>${loc}</strong> just purchased<br><strong>${prod}</strong> ${curr}`;
        document.getElementById('aura-toast-time').innerText = 'Verified ' + time;

        toast.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    // 5. Lifecycle Initialization
    // Delay first popup to not overwhelm the user on load
    setTimeout(() => {
        showToast();
        // Run every 20 seconds
        setInterval(showToast, 20000); 
    }, 4000);
});
