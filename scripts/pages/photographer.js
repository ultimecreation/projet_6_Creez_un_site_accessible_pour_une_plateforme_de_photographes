/**
 * get data related to 1 photographer
 *
 * @param   {integer}  id  
 *
 * @return  {object}      
 */
async function getPhotographerById(id) {
    // fetch data from json file and extract the requested user data
    const data = await (await fetch('mydata/photographers.json')).json()
    const photographer = data.photographers.filter(photographer => photographer.id == id)[0]
    
    return ({
        photographer: photographer
    })
}

/**
 * insert in the dom the html string for the photographer banner
 *
 * @param   {object}  photographer  
 *
 * @return  {void}                
 */
async function displayBanner(photographer) {
    // get the html elements
    const photographHeader = document.querySelector('.photograph-header')
    const contactBtn = document.querySelector('.photograph-header .contact_button')

    // get the photographer data,banner infos and image
    const photographerModel = photographerFactory(photographer)
    const userBannerInfosDOM = photographerModel.getUserBannerInfosDOM()
    const userBannerImgDOM = photographerModel.getUserBannerImgDOM()

    // insert the content around the contact button
    photographHeader.insertBefore(userBannerInfosDOM, contactBtn)
    contactBtn.after(userBannerImgDOM)
}

/**
 * initialization
 *
 * @return  {void}  
 */
async function init() {
    // get user id from url get fetch related photographer infos
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('id')
    const { photographer } = await getPhotographerById(userId)

    // display the banner
    displayBanner(photographer)
}

init()
