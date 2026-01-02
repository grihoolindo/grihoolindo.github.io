/* =========================================
   1. DYNAMIC TEXT & SELECTION
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
    updateSelectionText();
});

function updateSelectionText() {
    // Size
    const size = document.querySelector('input[name="size"]:checked');
    if (size) {
        document.getElementById('selectedSizeText').innerText = size.value;
    }
    // Color
    const color = document.querySelector('input[name="color"]:checked');
    if (color) {
        document.getElementById('selectedColorText').innerText = color.value;
    }
}

/* =========================================
   2. GALLERY & VIDEO LOGIC
   ========================================= */
const mainImage = document.getElementById('mainImage');
const mainImgBox = document.getElementById('mainImgBox');
const videoFrame = document.getElementById('videoFrame');
const zoomLens = document.querySelector('.zoom-lens');

function changeImage(thumb, type, videoId = null) {
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    if(thumb.classList.contains('thumb')) {
        thumb.classList.add('active');
    } else {
        thumb.closest('.thumb').classList.add('active');
    }

    if (type === 'video') {
        mainImage.style.display = 'none';
        zoomLens.style.display = 'none';
        videoFrame.style.display = 'block';
        videoFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        mainImgBox.onmousemove = null;
        mainImgBox.onmouseleave = null;
    } else {
        videoFrame.style.display = 'none';
        videoFrame.innerHTML = '';
        mainImage.style.display = 'block';
        zoomLens.style.display = 'block';
        mainImage.src = thumb.src;
        mainImgBox.onmousemove = function(e) { zoomImage(e); };
        mainImgBox.onmouseleave = function() { resetZoom(); };
    }
}

function loadDescVideo(placeholder, videoId) {
    placeholder.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}

function zoomImage(e) {
    const { left, top, width, height } = mainImgBox.getBoundingClientRect();
    const x = (e.clientX - left) / width * 100;
    const y = (e.clientY - top) / height * 100;
    mainImage.style.transformOrigin = `${x}% ${y}%`;
    mainImgBox.classList.add('zoomed');
}
function resetZoom() {
    mainImgBox.classList.remove('zoomed');
    setTimeout(() => { mainImage.style.transformOrigin = 'center center'; }, 100);
}

/* =========================================
   3. QUANTITY & TABS
   ========================================= */
const qtyInput = document.getElementById('qtyInput');
function updateQty(change) {
    let currentQty = parseInt(qtyInput.value);
    let newQty = currentQty + change;
    if (newQty < 1) newQty = 1;
    qtyInput.value = newQty;
}

function openTab(evt, tabName) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

/* =========================================
   4. MODALS & WHATSAPP LOGIC (UPDATED)
   ========================================= */
const orderModal = document.getElementById('orderModal');
const feedbackModal = document.getElementById('feedbackModal');

function openOrderModal() {
    orderModal.classList.add('active');
}
function closeOrderModal() {
    orderModal.classList.remove('active');
}
function openFeedbackModal() {
    feedbackModal.classList.add('active');
}
function closeFeedbackModal() {
    feedbackModal.classList.remove('active');
}
window.onclick = function(e) {
    if(e.target == orderModal) closeOrderModal();
    if(e.target == feedbackModal) closeFeedbackModal();
}

// --- Helper: Convert Price to Number (Handles Bangla & English) ---
function getNumber(str) {
    // বাংলা সংখ্যাকে ইংরেজিতে রূপান্তর
    const banglaToEng = {'০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9'};
    let engStr = str.replace(/[০-৯]/g, m => banglaToEng[m]);
    // শুধু সংখ্যা রাখা
    engStr = engStr.replace(/[^\d]/g, '');
    return parseInt(engStr) || 0;
}

// --- Submit to WhatsApp (Exact Format) ---
function submitToWhatsApp(e) {
    e.preventDefault();
    
    // 1. Data Collection
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    
    const pName = document.getElementById('pName').innerText;
    // Get SKU from text content (removes "SKU: " prefix if present)
    const pSKUText = document.querySelector('.p-sku').innerText;
    const pSKU = pSKUText.replace('SKU:', '').trim();

    // Price Calculation
    const priceText = document.getElementById('pPrice').innerText;
    const unitPrice = getNumber(priceText); // English Number for calculation
    
    const size = document.querySelector('input[name="size"]:checked').value;
    const color = document.querySelector('input[name="color"]:checked').value;
    const qty = parseInt(qtyInput.value);
    const productLink = window.location.href;

    // 2. Total Calculation Logic (Conditional)
    let totalSection = '';
    if (qty > 1) {
        const total = unitPrice * qty;
        totalSection = `*মোট মূল্য:*%0a৳${unitPrice} * ${qty} = ৳${total}%0a%0a`;
    }

    // 3. Message Construct (Bangla Format)
    let message = `*নতুন অর্ডার!*%0a%0a` +
                  
                  `*পণ্যের বিবরণ:*%0a` +
                  `পণ্য: ${pName}%0a` +
                  `SKU: ${pSKU}%0a` +
                  `সাইজ: ${size}%0a` +
                  `কালার: ${color}%0a` +
                  `পরিমাণ: ${qty}%0a` +
                  `দাম: ৳${unitPrice}%0a` +
                  `ডেলিভারি চার্জ: ফ্রি%0a%0a` +
                  
                  `${totalSection}` + // ১টির বেশি হলে দেখাবে
                  
                  `*গ্রাহকের বিবরণ:*%0a` +
                  `নাম: ${name}%0a` +
                  `ফোন: ${phone}%0a` +
                  `ঠিকানা: ${address}%0a%0a` +

                  `*পণ্যের লিঙ্ক:*%0a` +
                  `${productLink}`;

    // 4. Send
    const whatsappNumber = "8801975078858";
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(url, '_blank');
    closeOrderModal();
}