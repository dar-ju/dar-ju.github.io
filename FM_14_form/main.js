const form = document.querySelector('.form')
const radios = form.querySelectorAll('input[type="radio"]');
const formElements = ['firstName', 'lastName', 'email', 'queryGeneral', 'querySupport', 'message', 'agree']
let warnings = []

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let radioState = false
  for (let radio of radios) {
    if (radio.checked) {
      radioState = true
    }
  }
  formElements.forEach(item => {
    // console.log(form.elements[item].value);
    // console.log(form.elements[item].id);
    for (let radio of radios) {
      if (radio.checked) {
        selectedRadio = radio;
      }
    }
    // console.log(form.elements[item].value, form.elements[item].checked);

    if (!form.elements[item].value) warnings.push(form.elements[item].id)
    });
if (!radioState) warnings.push('query')
if (!form.elements['agree'].checked) warnings.push('agree')
console.log(warnings);


  warnings.forEach(item => {
    const warningElement = document.getElementById(`${item}Warning`)
    const element = document.getElementById(item)
    console.log(item);

    if (!item) warningElement.style.display = 'inline-block'
    else {
      warningElement.style.display = 'inline-block'
      console.log(element);

      if (element && element.type !== 'checkbox') element.style.outline = '1px solid var(--color-red)'
    }
    console.log(form.elements[item].checked);
  });

})

// email check function
// const emailCheck = () => {
//   const inputText = inputField.value;
//   const regular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   if (!regular.test(inputText)) {
//     inputField.classList.add('newsletter__form-input_error');
//     errorNotice.style.opacity = '1';
//     submitButton.setAttribute('disabled', '');
//   }
//   else {
//     inputField.classList.remove('newsletter__form-input_error');
//     errorNotice.style.opacity = '0';
//     submitButton.removeAttribute('disabled', '');
//   }
// }
