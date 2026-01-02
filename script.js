/* =========================================
   GRIHOOLINDO - MAIN JAVASCRIPT FILE
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. CHAT LABEL AUTOMATION ---
    const chatLabel = document.getElementById('chatLabel');
    if (chatLabel) {
        setTimeout(() => {
            startLabelLoop(chatLabel);
        }, 3000); 
    }

    // --- 2. BANNER SLIDESHOW INIT ---
    initSlideshow();

    // --- 3. SMOOTH SCROLL WITH FIXED OFFSET ---
    initSmoothScroll();
});


/* =========================================
   FUNCTION: SMOOTH SCROLL (ONLY 40PX OFFSET)
   ========================================= */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // 1. General Anchor Links (#about, #contact, etc.)
            if (href.length > 1) {
                const targetElement = document.getElementById(href.substring(1));

                if (targetElement) {
                    e.preventDefault();

                    // বর্তমান পজিশন বের করা
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    
                    // Logic: Element Top + Current Scroll - 40px (Fixed Offset)
                    // হেডারের হাইট বাদ দেওয়া হয়নি, শুধু ৪০ পিক্সেল গ্যাপ রাখা হয়েছে
                    const offsetPosition = elementPosition + window.scrollY - 40;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // মোবাইল মেনু বন্ধ করা
                    closeMobileMenu();
                }
            } 
            // 2. Back To Top / Home Link (#home)
            else if (href === '#home' || href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // মোবাইল মেনু বন্ধ করা
                closeMobileMenu();
            }
        });
    });
}

// Helper function to close menu
function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.querySelector('.overlay');
    if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }
}


/* =========================================
   FUNCTION: CHAT LABEL LOOP
   ========================================= */
function startLabelLoop(label) {
    showLabel(label);
}

function showLabel(label) {
    label.classList.add('show-label');
    setTimeout(() => {
        label.classList.remove('show-label');
        setTimeout(() => {
            showLabel(label); 
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
        icon.classList.remove('fa-comments');
        icon.classList.add('fa-xmark');
        btn.style.animation = 'none'; 
        btn.style.transform = "rotate(90deg)"; 
    } else {
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