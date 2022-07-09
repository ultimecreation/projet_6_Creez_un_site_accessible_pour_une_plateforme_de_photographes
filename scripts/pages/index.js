/**
 * get the photographers data 
 *
 * @return  {[object]}  
 */
async function getPhotographers() {
	// fetch and extract chunk of data from json file
	const data = await (await fetch('mydata/photographers.json')).json();
	const { photographers } = data;

	return ({
		photographers: [...photographers]
	});
}

/**
 * display the list of photographers
 *
 * @param   {[object]}  photographers  
 *
 * @return  {void}       
 */
async function displayData(photographers) {
	// get the dom container for photographers
	const photographersSection = document.querySelector('.photographer_section');

	// loop through photographers and generate the html to be added to the dom container for photographers
	photographers.forEach((photographer) => {
		// eslint-disable-next-line no-undef
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

/**
 * initialization|insert html string on page load
 *
 * @return  {void} 
 */
async function init() {
	//get photographers data
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

// async function getMedias() {
//     // fetch and extract chunk of data from json file
//     const data = await (await fetch('mydata/photographers.json')).json()
//     const { media } = data

//     return ({
//         media: [...media]
//     })
// }

init();
