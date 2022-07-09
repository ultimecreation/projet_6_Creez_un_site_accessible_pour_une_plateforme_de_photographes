/* eslint-disable no-undef */
// get html element
const dropdown = document.querySelector('.dropdown-menu');

/**
 * handle click on sort dropdown
 *
 * @param   {event}  e  
 *
 * @return  {void}     
 */
const handleSort = (e) => {
	// close light if opened to avoid conflict
	if (document.querySelector('#lightbox_modal').style.display === 'block') {
		closeLightboxModal();
	}

	// set all aria-selected to false
	const liArray = dropdown.querySelectorAll('li');
	liArray.forEach(li => li.setAttribute('aria-selected', false));

	// get sortBy value and and set aria-selected to true
	const sortBy = e.target.closest('[data-value]').dataset.value;
	e.target.closest('[data-value]').setAttribute('aria-selected', true);

	// get id from url params, fetch and display data related to this id
	const urlParams = new URLSearchParams(window.location.search);
	const userId = urlParams.get('id');
	getMediaByPhotographerId(userId, sortBy).then(
		response => {
			displayData(response);
			handleTabOnMediaAfterSortingMedia();
		}
	);

};

// EVENT LISTENERS
dropdown.addEventListener('keyup', e => {
	const lis = dropdown.querySelectorAll('li');

	// keyboard enter tab
	if (e.keyCode === 13) {
		let i = 0;
		lis.forEach(li => {
			li.style.display = 'block';
			if (i === 0) {
				li.style.display = 'flex';
			}
		});
		lis.forEach(li => {
			li.addEventListener('keyup', e => {
				if (e.keyCode === 13) {
					handleSort(e);
				}
			});
		});
	}

	// keyboard escape tab
	if (e.keyCode === 27) {
		const lis = dropdown.querySelectorAll('li:not(:nth-of-type(1))');
		lis.forEach(li => li.style.display = 'none');
	}

});
dropdown.addEventListener('click', handleSort);


