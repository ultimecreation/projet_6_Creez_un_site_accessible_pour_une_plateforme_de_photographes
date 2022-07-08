/**
 * create a Photographer object
 *
 * @param   {object}  data  
 *
 * @return  {object}   
 */
function photographerFactory(data) {
    const { id, name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    /**
     * generate the html string to be inserted in the DOM
     *
     * @return  {HTMLElement}  
     */
    function getUserCardDOM() {
        // create article tag
        const article = document.createElement('article');

        // create img tag and set attribute
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute('alt', '')

        // create h2
        const h2 = document.createElement('h2');
        h2.textContent = name;

        // create a tag and set attributes
        const a = document.createElement('a')
        a.setAttribute('href', `photographer.html?id=${id}`)
        a.setAttribute('focusable', true)

        // create p tags,set attributes and text content
        const pLocation = document.createElement('p')
        pLocation.textContent = `${city}, ${country}`
        const pTagline = document.createElement('p')
        pTagline.textContent = tagline
        const pPrice = document.createElement('p')
        pPrice.textContent = `${price}€/jour`

        // create ul tag and set attribute
        const ul = document.createElement('ul')
        // ul.setAttribute('aria-label',`${name} summary`)

        // create li tags
        const liLocation = document.createElement('li')
        const liTagline = document.createElement('li')
        const liPrice = document.createElement('li')

        // create article dom tree
        a.appendChild(h2)
        a.appendChild(img)
        liLocation.appendChild(pLocation);
        liTagline.appendChild(pTagline);
        liPrice.appendChild(pPrice);
        ul.appendChild(liLocation)
        ul.appendChild(liTagline);
        ul.appendChild(liPrice)
        article.appendChild(a);
        article.appendChild(ul);

        return (article);
    }

    /**
     * generate the html string to be inserted n the DOM to display 1 photographer infos
     *
     * @return  {HTMLElement}  
     */
    function getUserBannerInfosDOM() {

        // create h1
        const h1 = document.createElement('h1');
        h1.textContent = name;

        // create p tags,set attributes and text content
        const pLocation = document.createElement('p')
        pLocation.textContent = `${city}, ${country}`
        const pTagline = document.createElement('p')
        pTagline.textContent = tagline

        // create li tags
        const liName = document.createElement('li')
        const liLocation = document.createElement('li')
        const liTagline = document.createElement('li')

        // create ul tag and set attribute
        const ul = document.createElement('ul')

        //create dom tree
        liName.appendChild(h1)
        liLocation.appendChild(pLocation);
        liTagline.appendChild(pTagline);
        ul.appendChild(liName)
        ul.appendChild(liLocation)
        ul.appendChild(liTagline);

        return (ul)
    }

    /**
     * generate the html string to be inserted in the DOM to display 1 photographer image
     *
     * @return  {HTMLElement}  
     */
    function getUserBannerImgDOM() {

        // create figure tag
        const figure = document.createElement('figure');

        // create img tag and set attribute
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute('alt', '')
        img.setAttribute('aria-label', name)

        //create dom tree
        figure.appendChild(img)

        return figure
    }

    return { name, picture, getUserCardDOM, getUserBannerInfosDOM, getUserBannerImgDOM }
}