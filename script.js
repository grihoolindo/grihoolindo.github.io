/* =========================================
   GRIHOOLINDO - MAIN JAVASCRIPT FILE
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. CHAT LABEL AUTOMATION ---
    const chatLabel = document.getElementById('chatLabel');
    
    if (chatLabel) {
        // পেজ লোড হওয়ার ৩ সেকেন্ড পর প্রথমবার লেবেল আসবে
        setTimeout(() => {
            startLabelLoop(chatLabel);
        }, 3000); 
    }

    // --- 2. BANNER SLIDESHOW INIT ---
    initSlideshow();
});


/* =========================================
   FUNCTION: CHAT LABEL LOOP (Updated)
   ========================================= */
function startLabelLoop(label) {
    showLabel(label);
}

function showLabel(label) {
    // ১. লেবেল বের হবে (Show)
    label.classList.add('show-label');
    
    // ২. ৫ সেকেন্ড পর লেবেল বাটনের ভেতর ঢুকে যাবে (Hide)
    // [UPDATE: আগে ২০ সেকেন্ড ছিল, এখন ৫ সেকেন্ড করা হয়েছে]
    setTimeout(() => {
        label.classList.remove('show-label');
        
        // ৩. ৩০ সেকেন্ড অপেক্ষা করে আবার বের হবে (Loop)
        // [UPDATE: আগে ৫ সেকেন্ড ছিল, এখন ৩০ সেকেন্ড করা হয়েছে]
        setTimeout(() => {
            showLabel(label); // আবার ফাংশনটি কল হবে
        }, 30000); 
        
    }, 5000); 
}


/* =========================================
   FUNCTION: CHAT WIDGET TOGGLE
   ========================================= */
function toggleChat() {
    const options = document.getElementById('chatOptions');
    const icon = document.getElementById('chatIcon');
    const btn = document.querySelector('.chat-toggle-btn');
    
    if (!options || !icon || !btn) return;

    options.classList.toggle('open');
    
    if (options.classList.contains('open')) {
        // Open State
        icon.classList.remove('fa-comments');
        icon.classList.add('fa-xmark');
        btn.style.animation = 'none'; 
        btn.style.transform = "rotate(90deg)"; 
    } else {
        // Close State
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-comments');
        btn.style.animation = 'pulse 2s infinite'; 
        btn.style.transform = "rotate(0deg)"; 
    }
}


/* =========================================
   SCROLL EVENTS (HEADER & BACK TO TOP)
   ========================================= */
window.addEventListener('scroll', function() {
    
    // Sticky Header Shrink
    const header = document.getElementById('mainHeader');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('header-shrink');
        } else {
            header.classList.remove('header-shrink');
        }
    }

    // Back To Top Visibility
    const btn = document.querySelector('.back-to-top');
    if (btn) {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }
});


/* =========================================
   FUNCTION: MOBILE MENU TOGGLE
   ========================================= */
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.querySelector('.overlay');
    
    if (menu && overlay) {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// Mobile Submenu Toggle
function toggleMobileSubmenu(icon) {
    const submenu = icon.parentElement.nextElementSibling;
    
    if (submenu) {
        if (submenu.style.display === "block") {
            submenu.style.display = "none";
            icon.classList.remove('active');
        } else {
            submenu.style.display = "block";
            icon.classList.add('active');
        }
    }
}


/* =========================================
   FUNCTION: PRODUCT VIEW SWITCHER
   ========================================= */
function setView(view) {
    const container = document.getElementById('productContainer');
    const btns = document.querySelectorAll('.view-btn');
    
    if (container && btns.length >= 2) {
        if (view === 'list') {
            container.classList.add('list-view');
            btns[0].classList.remove('active');
            btns[1].classList.add('active');
        } else {
            container.classList.remove('list-view');
            btns[0].classList.add('active');
            btns[1].classList.remove('active');
        }
    }
}


/* =========================================
   FUNCTION: BANNER SLIDESHOW
   ========================================= */
function initSlideshow() {
    let slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 7000);
    }
}