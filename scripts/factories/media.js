function mediaFactory(data, type) {
    if (type === 'video') return new VideoMedia(data)
    if (type === 'image') return new ImageMedia(data)
    else throw 'Unknown type'
}

function ImageMedia(data) {
    const { id, photographerId, title, image, likes } = data;
    const mediaPath = `/assets/media/${photographerId}/${image}`;

    function getMediaCardDOM() {
        const content = `
        <figure  >
            <img src="${mediaPath}" alt="${title}" width=350 height=300>
            <figcaption>
                <span>
                    ${title}
                </span>
                <div>
                    <span class="likes" data-media-id="${id}">${likes} </span>
                    <img src="assets/icons/heart.png" alt="heart" class="heart-icon"/>
                </div>
            </figcaption>
        </figure>
        `
        return content;
    }

    return { photographerId, title, mediaPath, likes, getMediaCardDOM }
}
function VideoMedia(data) {
    const { id, photographerId, title, video, likes } = data;
    let image
    const mediaPath = `assets/media/${photographerId}/${video}`;

    function getMediaCardDOM() {
        const content = `
        <div class="video">
            <div class="video-container">
                <video class="videos"  height="100%" controls preload="metadata">
                    <source src="${mediaPath}#t=0.1" type="video/mp4">
                </video>
            </div>
            <div class="infos">
                <span>${title}</span>
                <div>
                    <span class="likes" data-media-id="${id}">${likes} </span>
                    <img src="assets/icons/heart.png" alt="heart" class="heart-icon"/>
                </div>
            </div>
        </div>
        `
        return content;
    }

    return { photographerId, title, mediaPath, likes, getMediaCardDOM }
}