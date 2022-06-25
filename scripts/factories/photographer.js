function photographerFactory(data) {
    const { id, name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // create article tag
        const article = document.createElement('article');

        // create img tag and set attribute
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute('alt',' ')

        // create h2
        const h2 = document.createElement('h2');
        h2.textContent = name;

        // create a tag and set attributes
        const a = document.createElement('a')
        a.setAttribute('href', `photographer.html?id=${id}`)
        a.setAttribute('focusable', true)
        a.setAttribute('aria-label', name)

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
        a.appendChild(img)
        a.appendChild(h2)
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
    return { name, picture, getUserCardDOM }
}