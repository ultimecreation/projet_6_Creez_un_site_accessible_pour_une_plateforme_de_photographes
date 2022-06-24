async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const data = await (await fetch('https://ultimecreation.github.io/projet_6_Creez_un_site_accessible_pour_une_plateforme_de_photographes/data/photographers.json')).json()
    const { photographers } = data

    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers]
    })
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);

};

window.addEventListener('DOMContentLoaded',()=> init());
