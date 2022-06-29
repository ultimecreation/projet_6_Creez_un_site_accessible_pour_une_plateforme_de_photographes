function mediaFactory(data, type) {
    if (type === 'video') return new VideoMedia(data)
    if (type === 'image') return new ImageMedia(data)
    else throw 'Unknown type'
}

function ImageMedia(data) {
    const { photographerId, title, image, likes } = data;
    const mediaPath = `/assets/media/${photographerId}/${image}`;

    function getMediaCardDOM() {


        const content = `
        <figure  >
            <img src="${mediaPath}" alt="${title}" width=350 height=300>
            <figcaption>
                <span>
                    ${title}
                </span>
                <span>
                    ${likes} 
                    <i class="fa fa-heart"></i>
                </span>
            </figcaption>
        </figure>
        `



        return content;
    }

    return { photographerId, title, mediaPath, likes, getMediaCardDOM }
}
function VideoMedia(data) {
    const { photographerId, title, video, likes } = data;
    let image
    const mediaPath = `assets/media/${photographerId}/${video}`;

    function getMediaCardDOM() {
        const content = `
            <video class="videos" width="350" height="300" controls preload="metadata">
                <source src="${mediaPath}#t=0.1" type="video/mp4">
            </video>
        `
        return content;
    }

    return { photographerId, title, mediaPath, likes, getMediaCardDOM }
}