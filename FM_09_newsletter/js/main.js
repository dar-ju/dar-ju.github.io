const newsletter = document.querySelector('.newsletter');
const form = document.getElementById('subscribe');
const inputField = document.getElementById('subscribe-email-field');
const submitButton = document.getElementById('subscribe-button');
const errorNotice = document.querySelector('.newsletter__form-notice');
const successModal = document.querySelector('.success__container');
const successDescription = document.querySelector('.success__description');
const successButton = document.getElementById('success-button');

// email check function
const emailCheck = () => {
  const inputText = inputField.value;
  const regular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
  if (inputField.value) emailCheck();
})

// error message hide on focus
inputField.addEventListener('focus', () => {
  inputField.classList.remove('newsletter__form-input_error');
  errorNotice.style.opacity = '0';
})

// submit form
form.addEventListener('submit', (event) => {
  event.preventDefault();
  emailCheck()
  if (inputField.value) {
    successDescription.innerHTML = `A&nbsp;confirmation email has been sent to <span class="success__email">${inputField.value}</span>. Please open it&nbsp;and click the button inside to&nbsp;confirm your subscription.`;
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
