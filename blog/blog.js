/* =========================================
   SIMPLE COPY LINK FUNCTIONALITY
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
    initSimpleShare();
});

function initSimpleShare() {
    const shareBtn = document.getElementById('simpleShareBtn');
    const shareWrapper = document.querySelector('.share-wrapper');

    if (shareBtn) {
        shareBtn.addEventListener('click', function(e) {
            // 1. Stop default anchor behavior (Scroll jumping)
            e.preventDefault();

            // 2. Copy current URL to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                
                // 3. Show "Copied" Tooltip
                shareWrapper.classList.add('active');

                // 4. Hide Tooltip after 2 seconds
                setTimeout(() => {
                    shareWrapper.classList.remove('active');
                }, 2000);

            }).catch(err => {
                console.error('Copy failed: ', err);
            });
        });
    }
}



/* =========================================
   STATIC SITE SEARCH FUNCTIONALITY
   ========================================= */

// 1. আপনার সাইটের সব ডাটা এখানে ম্যানুয়ালি দিয়ে দিতে হবে
// আপনি যখনই নতুন ব্লগ বা প্রোডাক্ট যোগ করবেন, এই লিস্টে একটা লাইন বাড়িয়ে দেবেন।
const siteData = [
    // Products
    { title: "সলিড উডেন ওয়াল র‍্যাক (Wall Rack)", url: "../../products/wall-rack/", type: "Product" },
    { title: "ডেকোরেটিভ কর্নার শেলফ (Corner Shelf)", url: "../../products/corner-shelf/", type: "Product" },
    { title: "মাল্টিপারপাস কিচেন র‍্যাক (Kitchen Rack)", url: "../../products/kitchen-rack/", type: "Product" },
    { title: "মডার্ন ওয়াল আর্ট ডেকোর", url: "../../products/wall-art/", type: "Product" },
    
    // Blogs
    { title: "কাঠের আসবাবপত্র দীর্ঘস্থায়ী করার ৫টি উপায়", url: "../furniture-care/", type: "Blog" },
    { title: "ছোট ঘরের জায়গা বাড়ানোর স্মার্ট কৌশল", url: "../small-space-ideas/", type: "Blog" },
    { title: "কিচেন র‍্যাক দিয়ে রান্নাঘর গুছিয়ে রাখুন", url: "../kitchen-decor/", type: "Blog" },
    { title: "ওয়াল র‍্যাক দিয়ে বসার ঘর সাজান", url: "#", type: "Blog" }, // Link na thakle #

    // Pages
    { title: "যোগাযোগ (Contact Us)", url: "../../index.html#contact", type: "Page" },
    { title: "রিটার্ন পলিসি (Return Policy)", url: "../../return-policy.html", type: "Page" }
];

function performSearch() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const resultsBox = document.getElementById('searchResults');
    
    // Clear previous results
    resultsBox.innerHTML = '';

    // যদি ইনপুট খালি থাকে, বক্স লুকিয়ে ফেলুন
    if (filter.length === 0) {
        resultsBox.classList.remove('active');
        return;
    }

    // ফিল্টার লজিক
    const filteredData = siteData.filter(item => {
        return item.title.toLowerCase().includes(filter);
    });

    // রেজাল্ট দেখানো
    if (filteredData.length > 0) {
        resultsBox.classList.add('active');
        
        filteredData.forEach(item => {
            const link = document.createElement('a');
            link.href = item.url;
            link.classList.add('search-item');
            
            // HTML Structure: [Type] Title
            link.innerHTML = `<span class="type">[${item.type}]</span> ${item.title}`;
            
            resultsBox.appendChild(link);
        });
    } else {
        // যদি কিছু না পাওয়া যায়
        resultsBox.classList.add('active');
        resultsBox.innerHTML = '<div style="padding:10px; color:#777; font-size:13px;">দুঃখিত, কিছু পাওয়া যায়নি।</div>';
    }
}

// বাইরে ক্লিক করলে সার্চ বক্স বন্ধ হবে
document.addEventListener('click', function(e) {
    const searchWidget = document.querySelector('.search-widget');
    const resultsBox = document.getElementById('searchResults');
    
    if (searchWidget && !searchWidget.contains(e.target)) {
        if(resultsBox) resultsBox.classList.remove('active');
    }
});