//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById(id) {
    const data = await (await fetch('../../../data/photographers.json')).json()
    const  photographer = data.photographers.filter(photographer => photographer.id == id )[0]
    console.log(id)
console.log(photographer)
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographer
    })
}

const urlParams = new URLSearchParams(window.location.search)
console.log(parseInt(urlParams.get('id')))

getPhotographerById(urlParams.get('id'))