const dropdown = document.querySelector('.dropdown-menu')
const handleSort = (e) => {
    // close light if opened to avoid conflict
    if(document.querySelector('#lightbox_modal').style.display === 'block'){
        closeLightboxModal()
    }

    // set all aria-selected to false
    const liArray = dropdown.querySelectorAll('li')
    liArray.forEach(li => li.setAttribute('aria-selected',false))

    // get sortBy value and and set aria-selected to true
    const sortBy = e.target.closest('[data-value]').dataset.value
    e.target.closest('[data-value]').setAttribute('aria-selected',true)

    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('id')
    getMediaByPhotographerId(userId, sortBy)
        .then(response => displayData(response))
}

dropdown.addEventListener('click', handleSort)


