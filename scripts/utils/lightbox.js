const lightbox = document.querySelector('#lightbox_modal')
const closeBtn = document.querySelector('#lightbox_modal  .close-btn')
let slideIndex = 0;

function openLightboxModal() {
    lightbox.style.display = 'block';
}
function closeLightboxModal() {
    lightbox.style.display = 'none';
}

// Next/previous slide
function switchSlide(n) {
    showSlides(slideIndex += n);
}

// display the current slide
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.querySelectorAll(".lightbox-item");
    if (n > slides.length - 1) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }
    for (let i = 0; i < parseInt(slides.length); i++) {
        slides[i].style.display = "none";
    }

    if(typeof slides[slideIndex] !== 'undefined'){
        slides[slideIndex].style.display = "block";
    } 
}
showSlides(slideIndex);
closeBtn.addEventListener('click',closeLightboxModal)
