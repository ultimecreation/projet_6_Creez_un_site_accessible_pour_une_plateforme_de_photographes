//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById(id) {
    const data = await (await fetch('mydata/photographers.json')).json()
    const photographer = data.photographers.filter(photographer => photographer.id == id)[0]
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographer: photographer
    })
}

async function displayBanner(photographer) {
    const photographHeader = document.querySelector('.photograph-header')
    const contactBtn = document.querySelector('.photograph-header .contact_button')

    const photographerModel = photographerFactory(photographer);
    const userBannerInfosDOM = photographerModel.getUserBannerInfosDOM();
    const userBannerImgDOM = photographerModel.getUserBannerImgDOM();

    photographHeader.insertBefore(userBannerInfosDOM, contactBtn);
    contactBtn.after(userBannerImgDOM);
}

async function init() {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('id')
    const { photographer } = await getPhotographerById(userId)
    displayBanner(photographer)
}

init();
