const dropdown = document.querySelector('.dropdown-menu')

const handleSort = (e) => {
    const sortBy = e.target.closest('[data-value]').dataset.value
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('id')
    getMediaByPhotographerId(userId, sortBy)
        .then(response => displayData(response))
}

dropdown.addEventListener('click', handleSort)


