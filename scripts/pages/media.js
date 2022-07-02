
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
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('id')
    const data = await getMedia()
    const  media  =  data.media.filter(media =>  media.photographerId == id)
   
    if(sortBy === 'likes') {
        displayTotalLikesCountByPhotographerId(userId)
        return media.sort((a, b) => b.likes - a.likes)
    }
    if(sortBy === 'date') {
        displayTotalLikesCountByPhotographerId(userId)
        return media.sort((a, b) => {return new Date(b.date) - new Date(a.date)})
    }
    if(sortBy === 'title') {
        displayTotalLikesCountByPhotographerId(userId)
        return media.sort((a, b) => {return a.title.toLowerCase().localeCompare(b.title.toLowerCase())})
    }
  
    // et bien retourner le tableau photographers seulement une fois
    return ({
        media: [...media]
    })
}

async function displayTotalLikesCountByPhotographerId(userId){
    const {media} = await getMediaByPhotographerId(userId) 
    const totalLikesCount =  media.reduce((total, currentMedia)=>{
        return total += currentMedia.likes
    },0)

    document.querySelector('#total-likes-count').textContent = totalLikesCount
    
}

async function displayData(media) {
    const mediaSection = document.querySelector(".media_section");
    mediaSection.innerHTML = ''
    let output = ''
    let index = 0
    // initialize the first row
    output += '<div class="row">'
    
    media.forEach((singleMedia) => {
        const mediaType = typeof singleMedia.image != 'undefined' ? 'image' : 'video'
        const mediaModel = mediaFactory(singleMedia,mediaType);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        if( index>0 && index % 3 == 0 ) output+= '</div><div class="row">'
         output += mediaCardDOM;
        index++
    });
    mediaSection.innerHTML = output
};

async function handleClicksOnLikeIcons(){
    const mediaSection = document.querySelector('.media_section')
    mediaSection.addEventListener('click', e => {
        if(e.target.classList.contains('heart-icon')){
            let likesCount = e.target.previousElementSibling 
            let totalLikesCount = document.querySelector('#total-likes-count')
            likesCount.textContent = parseInt(likesCount.textContent) + 1
            totalLikesCount.textContent = parseInt(totalLikesCount.textContent) +1
        }
    })
}
async function init() {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('id')
    const { media } = await getMediaByPhotographerId(userId);
   
    await displayData(media)
    await displayTotalLikesCountByPhotographerId(userId)
    await handleClicksOnLikeIcons()
};
init()
