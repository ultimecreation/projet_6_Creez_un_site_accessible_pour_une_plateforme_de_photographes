
async function getMedia() {
    // Penser à remplacer par les données récupérées dans le json
    const data = await (await fetch('mydata/photographers.json')).json()
    const { media } = data

    // et bien retourner le tableau photographers seulement une fois
    return ({
        media: [...media]
    })
}

async function getMediaByPhotographerId(id) {
    // Penser à remplacer par les données récupérées dans le json
    const data = await getMedia()
    const  media  = data.media.filter(media =>  media.photographerId == id)

    // et bien retourner le tableau photographers seulement une fois
    return ({
        media: [...media]
    })
}

async function displayData(media) {
    const mediaSection = document.querySelector(".media_section");
    let output = ''
    let index = 0
    // initialize the first row
    output += '<div class="row">'
    media.forEach((singleMedia) => {

        const mediaType = typeof singleMedia.image !== 'undefined' ? 'image' : 'video'
       
        const mediaModel = mediaFactory(singleMedia,mediaType);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        if(index % 3 === 0 ) output+= '</div><div class="row">'
         output += mediaCardDOM;
        index++
    });
    mediaSection.innerHTML = output
};

async function init() {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('id')
    const { media } = await getMediaByPhotographerId(userId,filter=null);
    displayData(media);
   
    
};
init()
// .then(()=>{ 
//     console.log("dom loaded") 
//     const videos = document.querySelectorAll('video') 
//     videos.forEach(video => {
//         video.addEventListener('DOMContentLoaded',()=> {
            
            
        
//             })
//     })
    
// });

