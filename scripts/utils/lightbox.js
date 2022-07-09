/* eslint-disable no-unused-vars */
// get html elements
const lightbox = document.querySelector('#lightbox_modal');
const closeBtn = document.querySelector('#lightbox_modal  .close-btn');
let slideIndex = 0;

/**
 * open light box modal
 *
 * @return  {void}  
 */
function openLightboxModal() {
	lightbox.style.display = 'block';
	lightbox.focus();
}

/**
 * close lightbox modal
 *
 * @return  {void}  
 */
function closeLightboxModal() {
	lightbox.style.display = 'none';
}

/**
 * display previous or next media
 *
 * @param   {integer}  n  
 *
 * @return  {void}     
 */
function switchSlide(n) {
	showSlides(slideIndex += n);
}

/**
 * display the current media
 *
 * @param   {integer}  n  
 *
 * @return  {void}     
 */
function currentSlide(n) {
	showSlides(slideIndex = n);
}

/**
 * handle routine for displaying media
 *
 * @param   {integer}  n  
 *
 * @return  {void}     
 */
function showSlides(n) {
	const slides = document.querySelectorAll('.lightbox-item');

	// after the last media, show the first one
	if (n > slides.length - 1) { slideIndex = 0; }

	// before the first media, show the last one
	if (n < 0) { slideIndex = slides.length - 1; }

	// hide all media
	for (let i = 0; i < parseInt(slides.length); i++) {
		slides[i].style.display = 'none';
	}

	// then show the selected one
	if (typeof slides[slideIndex] !== 'undefined') {
		slides[slideIndex].style.display = 'block';
	}
}

// INITIALIZATION
showSlides(slideIndex);

// EVENT LISTENERS
closeBtn.addEventListener('click', closeLightboxModal);

