const dropdown = document.querySelector('.dropdown-menu')

const handleSort = (e) => {
    const sortBy = e.target.closest('[data-value]').dataset.value
    console.log(sortBy)
}

dropdown.addEventListener('click',handleSort)