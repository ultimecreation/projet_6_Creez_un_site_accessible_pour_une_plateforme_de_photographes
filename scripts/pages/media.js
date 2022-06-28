
async function getMedias() {
    // Penser à remplacer par les données récupérées dans le json
    const data = await (await fetch('mydata/photographers.json')).json()
    const { media } = data

    // et bien retourner le tableau photographers seulement une fois
    return ({
        media: [...media]
    })
}

async function getMediasByPhotographerId(id) {
    // Penser à remplacer par les données récupérées dans le json
    const data = await getMedias()
    const  media  = data.media.filter(media =>  media.photographerId == id)

    // et bien retourner le tableau photographers seulement une fois
    return ({
        media: [...media]
    })
}

async function displayData(media) {
    const mediaSection = document.querySelector(".media_section");

    media.forEach((singleMedia) => {
        const mediaType = 
        console.log(singleMedia)
        return
        const mediaModel = mediaFactory(singleMedia);
        const mediaCardDOM = mediaModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { media } = await getMediasByPhotographerId(243);
    displayData(media);

};
init();
