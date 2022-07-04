const dropdown = document.querySelector('.dropdown-menu')
const handleSort = (e) => {
    // close light if opened to avoid conflict
    if(document.querySelector('#lightbox_modal').style.display === 'block'){
        closeLightboxModal()
    }
    const sortBy = e.target.closest('[data-value]').dataset.value
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('id')
    getMediaByPhotographerId(userId, sortBy)
        .then(response => displayData(response))
}

dropdown.addEventListener('click', handleSort)


