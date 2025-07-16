// تفعيل التأثيرات الخاصة بـ AOS
AOS.init();

// Typewriter effect
const typewriterTitle = document.getElementById('typewriter-title');
const typewriterText = "Hassan For Design";
let twIdx = 0;
function typeWriter() {
    if (twIdx < typewriterText.length) {
        typewriterTitle.innerHTML += typewriterText.charAt(twIdx);
        twIdx++;
        setTimeout(typeWriter, 100);
    }
}
typeWriter();

// Dark mode toggle
const toggleBtn = document.getElementById('toggle-dark');
toggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    toggleBtn.innerHTML = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 200 ? 'flex' : 'none';
});
scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Lightbox with navigation and zoom
const galleryImgs = Array.from(document.querySelectorAll('.cover-img, .social-img, .slider-img, .testimonial-img'));
let currentImgIdx = 0;
let currentZoom = 1;
function openImage(idx) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    currentImgIdx = idx;
    modalImg.src = galleryImgs[idx].src;
    modal.classList.add("show");
    modal.focus();
    document.body.style.overflow = 'hidden';
    currentZoom = 1;
    modalImg.style.transform = "scale(1)";
}
galleryImgs.forEach((img, idx) => {
    img.addEventListener('click', () => openImage(idx));
});
function closeImage() {
    document.getElementById("image-modal").classList.remove("show");
    document.body.style.overflow = 'auto';
}
document.getElementById("image-modal").addEventListener('keydown', function (e) {
    if (e.key === "Escape") closeImage();
    if (e.key === "ArrowLeft") showModalImg(currentImgIdx - 1);
    if (e.key === "ArrowRight") showModalImg(currentImgIdx + 1);
});
function showModalImg(idx) {
    if (idx < 0) idx = galleryImgs.length - 1;
    if (idx >= galleryImgs.length) idx = 0;
    currentImgIdx = idx;
    const modalImg = document.getElementById("modal-img");
    modalImg.src = galleryImgs[idx].src;
    currentZoom = 1;
    modalImg.style.transform = "scale(1)";
}
document.getElementById("modal-prev").onclick = () => showModalImg(currentImgIdx - 1);
document.getElementById("modal-next").onclick = () => showModalImg(currentImgIdx + 1);
document.getElementById("zoom-in").onclick = () => {
    currentZoom += 0.2;
    document.getElementById("modal-img").style.transform = `scale(${currentZoom})`;
};
document.getElementById("zoom-out").onclick = () => {
    currentZoom = Math.max(1, currentZoom - 0.2);
    document.getElementById("modal-img").style.transform = `scale(${currentZoom})`;
};

// زر واتساب العائم ومربع الحوار
const floatingWhatsappBtn = document.getElementById('floating-whatsapp-btn');
const whatsappModal = document.getElementById('whatsapp-modal');
const whatsappModalClose = document.getElementById('whatsapp-modal-close');
floatingWhatsappBtn.onclick = () => {
    whatsappModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.getElementById('modal-name').focus();
    }, 200);
};
whatsappModalClose.onclick = () => {
    whatsappModal.classList.remove('show');
    document.body.style.overflow = '';
};
whatsappModal.addEventListener('click', (e) => {
    if (e.target === whatsappModal) {
        whatsappModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});
document.getElementById('whatsapp-modal-form').onsubmit = function (event) {
    event.preventDefault();
    var name = document.getElementById('modal-name').value;
    var message = document.getElementById('modal-message').value;
    var text = "مرحبًا!%0A";
    text += "الاسم: " + encodeURIComponent(name) + "%0A";
    text += "الرسالة: " + encodeURIComponent(message);
    var whatsappURL = "https://wa.me/201099017426?text=" + text;
    window.open(whatsappURL, "_blank");
    whatsappModal.classList.remove('show');
    document.body.style.overflow = '';
};
// إغلاق مربع الحوار عند الضغط على Escape
document.addEventListener('keydown', function (e) {
    if (e.key === "Escape" && whatsappModal.classList.contains('show')) {
        whatsappModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Books slider (infinite, 3 cards) + dots + drag/swipe
let bookIndex = 0;
const booksSlider = document.getElementById("books-slider");
const booksCards = booksSlider.children;
const booksDots = document.getElementById("books-dots");
function getBooksVisibleCount() {
    return window.innerWidth >= 1024 ? 3 : 1;
}
function showBooksSlide(idx) {
    const visibleCount = getBooksVisibleCount();
    const total = booksCards.length;
    if (idx < 0) bookIndex = total - visibleCount;
    else if (idx > total - visibleCount) bookIndex = 0;
    else bookIndex = idx;
    booksSlider.style.transform = `translateX(-${bookIndex * (100 / visibleCount)}%)`;
    // Dots
    booksDots.innerHTML = "";
    for (let i = 0; i <= total - visibleCount; i++) {
        const dot = document.createElement("span");
        dot.className = "slider-dot" + (i === bookIndex ? " active" : "");
        dot.onclick = () => showBooksSlide(i);
        booksDots.appendChild(dot);
    }
}
document.getElementById("books-prev").onclick = () => showBooksSlide(bookIndex - 1);
document.getElementById("books-next").onclick = () => showBooksSlide(bookIndex + 1);
window.addEventListener('resize', () => showBooksSlide(bookIndex));
setInterval(() => showBooksSlide(bookIndex + 1), 4000);
// Drag/swipe
let startX = null;
booksSlider.parentElement.addEventListener('mousedown', e => startX = e.clientX);
booksSlider.parentElement.addEventListener('mouseup', e => {
    if (startX !== null) {
        if (e.clientX - startX > 50) showBooksSlide(bookIndex - 1);
        else if (startX - e.clientX > 50) showBooksSlide(bookIndex + 1);
        startX = null;
    }
});
booksSlider.parentElement.addEventListener('touchstart', e => startX = e.touches[0].clientX);
booksSlider.parentElement.addEventListener('touchend', e => {
    if (startX !== null) {
        const endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) showBooksSlide(bookIndex - 1);
        else if (startX - endX > 50) showBooksSlide(bookIndex + 1);
        startX = null;
    }
});
showBooksSlide(0);

// Testimonials slider (infinite, 3 cards) + dots + drag/swipe
let testimonialIndex = 0;
const testimonialSlider = document.getElementById("testimonial-slider");
const testimonialCards = testimonialSlider.children;
const testimonialDots = document.getElementById("testimonial-dots");
function getTestimonialsVisibleCount() {
    return window.innerWidth >= 1024 ? 3 : 1;
}
function showTestimonialSlide(idx) {
    const visibleCount = getTestimonialsVisibleCount();
    const total = testimonialCards.length;
    if (idx < 0) testimonialIndex = total - visibleCount;
    else if (idx > total - visibleCount) testimonialIndex = 0;
    else testimonialIndex = idx;
    testimonialSlider.style.transform = `translateX(-${testimonialIndex * (100 / visibleCount)}%)`;
    // Dots
    testimonialDots.innerHTML = "";
    for (let i = 0; i <= total - visibleCount; i++) {
        const dot = document.createElement("span");
        dot.className = "slider-dot" + (i === testimonialIndex ? " active" : "");
        dot.onclick = () => showTestimonialSlide(i);
        testimonialDots.appendChild(dot);
    }
}
document.getElementById("testimonial-prev").onclick = () => showTestimonialSlide(testimonialIndex - 1);
document.getElementById("testimonial-next").onclick = () => showTestimonialSlide(testimonialIndex + 1);
window.addEventListener('resize', () => showTestimonialSlide(testimonialIndex));
setInterval(() => showTestimonialSlide(testimonialIndex + 1), 5000);
// Drag/swipe
let tStartX = null;
testimonialSlider.parentElement.addEventListener('mousedown', e => tStartX = e.clientX);
testimonialSlider.parentElement.addEventListener('mouseup', e => {
    if (tStartX !== null) {
        if (e.clientX - tStartX > 50) showTestimonialSlide(testimonialIndex - 1);
        else if (tStartX - e.clientX > 50) showTestimonialSlide(testimonialIndex + 1);
        tStartX = null;
    }
});
testimonialSlider.parentElement.addEventListener('touchstart', e => tStartX = e.touches[0].clientX);
testimonialSlider.parentElement.addEventListener('touchend', e => {
    if (tStartX !== null) {
        const endX = e.changedTouches[0].clientX;
        if (endX - tStartX > 50) showTestimonialSlide(testimonialIndex - 1);
        else if (tStartX - endX > 50) showTestimonialSlide(testimonialIndex + 1);
        tStartX = null;
    }
});
showTestimonialSlide(0);

document.documentElement.classList.add("dark");

const cardWidth = cards[0].offsetWidth + 16; // لا تعدّل هذا


