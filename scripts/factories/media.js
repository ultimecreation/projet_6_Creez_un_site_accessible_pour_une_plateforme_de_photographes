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
        <div>
            <div style="width: 350px; height:300px; overflow: hidden;" class="video">
                <video class="videos"  height="100%" controls preload="metadata">
                    <source src="${mediaPath}#t=0.1" type="video/mp4">
                </video>
            </div>
            <div class="infos">
                <span>${title}</span>
                <span>${likes}</span>
            </div>
        </div>
        `
        return content;
    }

    return { photographerId, title, mediaPath, likes, getMediaCardDOM }
}