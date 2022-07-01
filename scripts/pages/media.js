
async function getMedia() {
    // Penser à remplacer par les données récupérées dans le json
    const data = await (await fetch('mydata/photographers.json')).json()
    const { media } = data

    // et bien retourner le tableau photographers seulement une fois
    return ({
        media: [...media]
    })
}

async function getMediaByPhotographerId(id,sortBy=null) {
    // Penser à remplacer par les données récupérées dans le json
    const data = await getMedia()
    const  media  = data.media.filter(media =>  media.photographerId == id)
    
    if(sortBy === 'likes') {
        return media.sort((a, b) => b.likes - a.likes)
    }
    if(sortBy === 'date') {
        return media.sort((a, b) => {return new Date(b.date) - new Date(a.date)})
    }
    if(sortBy === 'title') {
        return media.sort((a, b) => {return a.title.toLowerCase().localeCompare(b.title.toLowerCase())})
    }
  
    // et bien retourner le tableau photographers seulement une fois
    return ({
        media: [...media]
    })
}

async function displayTotalLikesCountByPhotographerId(userId){
    const { media } = await getMediaByPhotographerId(userId);
    const totalLikesCount =  media.reduce((total, currentMedia)=>{
        return total += currentMedia.likes
    },0)

    document.querySelector('#total-likes-count').textContent = totalLikesCount
    
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
        if( index>0 && index % 3 == 0 ) output+= '</div><div class="row">'
         output += mediaCardDOM;
        index++
    });
    mediaSection.innerHTML = output
};

async function init() {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('id')
    const { media } = await getMediaByPhotographerId(userId);
    displayTotalLikesCountByPhotographerId(userId)
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

