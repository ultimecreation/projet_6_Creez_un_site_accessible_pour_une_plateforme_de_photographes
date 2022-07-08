// get html elements
const form = document.querySelector('#contactForm')
const formMsgContainer = document.querySelector(`#form-msg-container`)
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * display the contact modal
 *
 * @return  {void}  
 */
function displayModal() {
    resetFormMsgContainer()
    const modal = document.getElementById("contact_modal");
    const photographerNameInHeader = document.querySelector('.photograph-header h1')
    const photographerNameInModal = document.querySelector('#photographer-name')
    modal.style.display = "block";
    console.log(photographerNameInModal.textContent, photographerNameInHeader.textContent)
    photographerNameInModal.textContent = photographerNameInHeader.textContent
}

/**
 * close the contact modal
 *
 * @return  {void}  
 */
function closeModal() {
    resetFormMsgContainer()
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

/**
 * remoe the css classes and html content for message container 
 *
 * @return  {void} 
 */
function resetFormMsgContainer() {
    formMsgContainer.innerHTML = ''
    formMsgContainer.classList = ''
}

/**
 * bind data and return them as an object
 *
 * @return  {object}  
 */
function bindIncominData() {
    const firstname = form.querySelector('#firstname')
    const lastname = form.querySelector('#lastname')
    const email = form.querySelector('#email')
    const message = form.querySelector('#message')
    return {
        firstname: firstname,
        lastname: lastname,
        email: email,
        message: message,
    }
}

/**
 * check for errors and return them if any
 *
 * @param   {object}  incomingData  
 *
 * @return  {array}                
 */
function checkForErrors(incomingData) {
    let errors = []
    if (incomingData.firstname.value == '') errors.push({ msg: "Le prénom est requis." })
    if (incomingData.lastname.value == '') errors.push({ msg: "Le nom est requi." })
    if (incomingData.email.value === '') errors.push({ msg: "L'email est requis" })
    else if (!incomingData.email.value.toLowerCase().match(emailRegex)) errors.push({ msg: "L'email n'est pas valide" })
    if (incomingData.message.value === '') errors.push({ msg: "Un messag est requis." })
    return errors
}

/**
 * insert the html in the dom to display errors to the users
 *
 * @param   {array}  errors  
 *
 * @return  {void}          
 */
function displayFormErrors(errors) {
    let output = ''
    formMsgContainer.classList.add('alert-danger')
    console.log(errors)
    errors.forEach(error => {
        output += `<p>${error.msg}</p>`
    })
    formMsgContainer.innerHTML = output
}

/**
 * add html string and classes for success message
 *
 * @param   {string}  msg  
 *
 * @return  {void}       
 */
function displayFormSuccessMsg(msg) {
    formMsgContainer.classList.add('alert-success')
    formMsgContainer.innerHTML = `
        <p>${msg}</p>
    `
}

/**
 * handle contact form submission
 *
 * @param   {Event}  e  
 *
 * @return  {void}         [return description]
 */
submitBtn.addEventListener('click', e => {
    e.preventDefault()
    resetFormMsgContainer()
    const incomingData = bindIncominData()
    const errors = checkForErrors(incomingData)

    // some errors found, display them to the user
    if (errors.length > 0) {
        displayFormErrors(errors)
        return
    }

    // no errors,reset the form inputs and display the success msg 
    form.reset()
    displayFormSuccessMsg('Votre message a été envoyé')
    setTimeout(() => {
        closeModal()
    }, 3000)
})