/**
 * create a Video or Image object
 *
 * @param   {object}  data  
 * @param   {string}  type  type of object to create
 *
 * @return  {object|Error}   
 */
function mediaFactory(data, type) {
    if (type === 'video') return new VideoMedia(data)
    if (type === 'image') return new ImageMedia(data)
    else throw 'Unknown type'
}

/**
 * create an Image object containing properties and methods
 *
 * @param   {object}  data  
 *
 * @return  {object}  
 */
function ImageMedia(data) {
    const { id, photographerId, title, image, likes } = data;
    const mediaPath = `/assets/media/${photographerId}/${image}`;

    /**
     * generate the html for 1 image to be inserted in the dom
     *
     * @param   {integer}  index  current image index to be displayed in the lightbox
     *
     * @return  {string}   
     */
    function getMediaCardDOM(index) {
        const content = `
            <figure >
                <img src="${mediaPath}" alt="${title}" width=350 height=300 onclick="openLightboxModal();currentSlide(${index})" role="dialog" aria-label="image closeup view">
                <figcaption>
                    <span>
                        ${title}
                    </span>
                    <div>
                        <span class="likes" data-media-id="${id}">${likes} </span>
                        <img src="assets/icons/heart.png" alt="likes" class="heart-icon"/>
                    </div>
                </figcaption>
            </figure>
        `
        return content;
    }

    /**
     * generate the html string for 1 image to be inserted in the lightbox slideshow
     *
     * @return  {string}  
     */
    function getMediaLightboxCardDOM() {
        const content = `
            <figure class="lightbox-item">
                <img src="${mediaPath}" alt="${title}" width=350 height=300 >
                <figcaption>
                    <span>
                        ${title}
                    </span>
                   
                </figcaption>
            </figure>
        `
        return content;
    }

    return { photographerId, title, mediaPath, likes, getMediaCardDOM, getMediaLightboxCardDOM }
}

/**
 * create a Video object containing properties and methods
 *
 * @param   {object}  data  
 *
 * @return  {object}  
 */
function VideoMedia(data) {
    const { id, photographerId, title, video, likes } = data;
    const mediaPath = `assets/media/${photographerId}/${video}`;

    /**
     * generate the html for 1 video to be inserted in the dom
     *
     * @param   {integer}  index  current video index to be displayed in the lightbox
     *
     * @return  {string}   
     */
    function getMediaCardDOM(index) {
        const content = `
        <div class="video" >
            <div class="video-container">
                <video class="videos"  height="100%" controls preload="metadata" onclick="openLightboxModal();currentSlide(${index})" role="dialog" aria-label="image closeup view">
                    <source src="${mediaPath}#t=0.1" type="video/mp4">
                </video>
            </div>
            <div class="infos">
                <span>${title}</span>
                <div>
                    <span class="likes" data-media-id="${id}">${likes} </span>
                    <img src="assets/icons/heart.png" alt="likes" class="heart-icon"/>
                </div>
            </div>
        </div>
        `
        return content;
    }

    /**
     * generate the html string for 1 video to be inserted in the lightbox slideshow
     *
     * @return  {string}  
     */
    function getMediaLightboxCardDOM() {
        const content = `
        <div class="lightbox-item video">
            <div class="video-container">
                <video class="videos"  height="100%" controls preload="metadata" aria-label="${title}">
                    <source src="${mediaPath}#t=0.1" type="video/mp4">
                </video>
            </div>
            <div class="infos">
                <span>${title}</span>
            </div>
        </div>
        `
        return content;
    }

    return { photographerId, title, mediaPath, likes, getMediaCardDOM, getMediaLightboxCardDOM }
}