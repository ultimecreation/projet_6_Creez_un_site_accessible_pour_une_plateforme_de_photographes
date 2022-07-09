/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * get the media data
 *
 * @return  {[object]}
 */
async function getMedia() {
	// fetch and extract chunk of data from json file
	const data = await (await fetch('mydata/photographers.json')).json();
	const { media } = data;

	return ({
		media: [...media]
	});
}

/**
 * get the media for 1 photographer
 * and conditionaly sort them by multiple criteria
 *
 * @param   {integer}   id      
 * @param   {string}    sortBy  
 *
 * @return  {[object]}          
 */
async function getMediaByPhotographerId(id, sortBy = null) {
	// Pget the id from url and fetch media having this photographerId
	const urlParams = new URLSearchParams(window.location.search);
	const userId = urlParams.get('id');
	const data = await getMedia();
	let media = data.media.filter(media => media.photographerId == id);

	// sort is defined
	if (sortBy === 'likes') {
		media = media.sort((a, b) => b.likes - a.likes);
		populateLightboxModal(media);
		displayTotalLikesCountByPhotographerId(userId);
		return media;
	}
	if (sortBy === 'date') {
		media = media.sort((a, b) => { return new Date(b.date) - new Date(a.date); });
		populateLightboxModal(media);
		displayTotalLikesCountByPhotographerId(userId);
		return media;
	}
	if (sortBy === 'title') {
		media = media.sort((a, b) => { return a.title.toLowerCase().localeCompare(b.title.toLowerCase()); });
		populateLightboxModal(media);
		displayTotalLikesCountByPhotographerId(userId);
		return media;
	}

	// sort is undefined, return unsorted data
	return ({
		media: [...media]
	});
}


/**
 * insert media in the dom
 *
 * @param   {object}  media
 *
 * @return  {void}   
 */
async function displayData(media) {
	// get the html element and initialize variables
	const mediaSection = document.querySelector('.media_section');
	mediaSection.innerHTML = '';
	let output = '';
	let index = 0;

	// initialize the first row
	output += '<div class="row">';

	// loop through media 
	media.forEach((singleMedia) => {
		const mediaType = typeof singleMedia.image != 'undefined' ? 'image' : 'video';
		const mediaModel = mediaFactory(singleMedia, mediaType);
		const mediaCardDOM = mediaModel.getMediaCardDOM(index);

		// close the current row and open a new one
		if (index > 0 && index % 3 == 0) output += '</div><div class="row">';

		// add html string to the output
		output += mediaCardDOM;
		index++;
	});

	// add the html string to the dom
	mediaSection.innerHTML = output;
}

/**
 * handle the routine after a click on likes image
 *
 * @return  {void}  
 */
async function handleClicksOnLikeIcons() {
	// get the dom element and add an event listener onto it
	const mediaSection = document.querySelector('.media_section');
	mediaSection.addEventListener('click', e => {
		if (e.target.classList.contains('heart-icon')) {
			let likesCount = e.target.previousElementSibling;
			let totalLikesCount = document.querySelector('#total-likes-count');

			// increase the likes count on the image/video and on the total likes count
			likesCount.textContent = parseInt(likesCount.textContent) + 1;
			totalLikesCount.textContent = parseInt(totalLikesCount.textContent) + 1;
		}
	});
}

/**
 * compute and display the total number of likes        
 *
 * @param   {integer}  userId
 *
 * @return  {void} 
 */
async function displayTotalLikesCountByPhotographerId(userId) {
	// get all media related to 1 photographer and compute the likes count
	const { media } = await getMediaByPhotographerId(userId);
	const totalLikesCount = media.reduce((total, currentMedia) => {
		return total += currentMedia.likes;
	}, 0);

	// insert the likes count in the dom
	document.querySelector('#total-likes-count').textContent = totalLikesCount;
}

/**
 * add the html content to the lightbow
 *
 * @param   {[object]}  media  
 *
 * @return  {void}       
 */
async function populateLightboxModal(media) {
	// get the html element and initialize variables
	const lightboxModal = document.querySelector('#lightbox_content');
	lightboxModal.innerHTML = '';
	let output = '';
	let index = 0;

	media.forEach((singleMedia) => {
		const mediaType = typeof singleMedia.image != 'undefined' ? 'image' : 'video';
		const mediaModel = mediaFactory(singleMedia, mediaType);
		const mediaCardDOM = mediaModel.getMediaLightboxCardDOM();
		output += mediaCardDOM;
		index++;
	});

	// add the html string to the dom
	lightboxModal.innerHTML = output;
}

/**
 * [async description]
 *
 * @return  {[type]}  [return description]
 */
async function handleTabOnMediaAfterSortingMedia() {
	// get all tabindexes for media section
	const mediaSection = document.querySelector('.media_section');
	const clickableMedia = mediaSection.querySelectorAll('[tabindex="0"]');
    
	clickableMedia.forEach(single => {
        
		single.addEventListener('keyup', e => {

			// keyboard enter tab
			if (e.keyCode === 13) {
				// eslint-disable-next-line no-undef
				openLightboxModal();
				currentSlide(parseInt(e.target.dataset.index));
			}
			// keyboard arrow left
			if (e.keyCode === 37) {
				switchSlide(-1);
			}
			// keyboard arrow right
			if (e.keyCode === 39) {
				switchSlide(1);
			}
			// keyboard escape tab
			if (e.keyCode === 27) {
				closeLightboxModal();
			}
		});
	});
}

/**
 * initialization
 *
 * @return  {void}  
 */
async function init() {
	const urlParams = new URLSearchParams(window.location.search);
	const userId = urlParams.get('id');
	const { media } = await getMediaByPhotographerId(userId);

	await displayData(media);
	await populateLightboxModal(media);
	await displayTotalLikesCountByPhotographerId(userId);
	await handleClicksOnLikeIcons();
	await handleTabOnMediaAfterSortingMedia();
}
init();
