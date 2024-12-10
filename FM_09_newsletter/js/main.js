const form = document.getElementById('subscribe');
const newsletter = document.querySelector('.newsletter')
const inputField = document.querySelector('.newsletter__form-input')
const errorNotice = document.querySelector('.newsletter__form-notice')
const successModal = document.querySelector('.success__container')
const submitButton = document.getElementById('subscribe-button');
const successButton = document.getElementById('success-button');

// email check function
const emailCheck = () => {
  const inputText = inputField.value;
  const regular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!regular.test(inputText)) {
    inputField.classList.add('newsletter__form-input_error');
    errorNotice.style.opacity = '1';
    submitButton.setAttribute('disabled', '');
  }
  else {
    inputField.classList.remove('newsletter__form-input_error');
    errorNotice.style.opacity = '0';
    submitButton.removeAttribute('disabled', '');
  }
}

// email check when leave input field
inputField.addEventListener('blur', () => {
  emailCheck()
})

// submit form
form.addEventListener('submit', (event) => {
	event.preventDefault();
  emailCheck()
  if (inputField.value) {
    newsletter.style.display = 'none';
    successModal.style.animation = 'modal-fadeIn 0.3s ease-in';
    successModal.style.display = 'block';
    form.reset();
  }
})

// close success modal window
successButton.addEventListener('click', (event) => {
	event.preventDefault();
  successModal.style.animation = 'modal-fadeOut 0.2s ease-in';
  setTimeout(() => {
    newsletter.style.display = 'block';
    successModal.style.display = 'none';
  }, 200)
})
