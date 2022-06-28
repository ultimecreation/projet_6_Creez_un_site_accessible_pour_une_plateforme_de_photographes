function mediaFactory(data,type){
    if(type === 'video') return new VideoMedia(data)
    if(type === 'image') return new ImageMedia(data)
    else throw 'Unknown type'
}

function ImageMedia(data){
    const { id, title, image, likes, date, price } = data;

    const mediaPath = `assets/images/${image}`;

    function getMediaCardDOM() {
       

        return (article);
    }

    return { id, title, mediaPath, likes, date, price,getMediaCardDOM }
}
function VideoMedia(data){
    const { id, title, video, likes, date, price } = data;

    const mediaPath = `assets/videos/${video}`;

    function getMediaCardDOM() {
       

        return (article);
    }

    return { id, title, mediaPath, likes, date, price,getMediaCardDOM }
}