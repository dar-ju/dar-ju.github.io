const form = document.querySelector('.contact-form__form')
const wrapper = document.querySelectorAll('.contact-form__input-wrapper');
const success = document.querySelector('.successful')
const tel = document.getElementById('phone')
let warnings = []
let wrongEmail = false

// focus line
wrapper.forEach(wrapper => {
  const input = wrapper.querySelector('.contact-form__form-input');
  input.addEventListener('focus', () => {
    wrapper.classList.add('focused')
  });
  input.addEventListener('blur', () => {
    wrapper.classList.remove('focused')
  });
});

// phone field
tel.addEventListener('input', () => {
  tel.value = tel.value.replace(/\D/g, '');
});

// common form check function
function formCheck() {
  warnings = []
  wrongEmail = false
  for (let item of form) {
    if (item.id === 'email') {
      if (!emailCheck(item.value)) wrongEmail = true
      else wrongEmail = false
    }
    if (item.value.trim() === '') {
      warnings.push(item.id)
    }
  }
}

// email check function
function emailCheck(value) {
  const regular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regular.test(value)
}

// clear form function
function clearForm() {
  form.reset()
}

// submit button listener
form.addEventListener('submit', (event) => {
  const wrongElement = document.getElementById(`emailWrong`)
  event.preventDefault();
  formCheck()
  if (warnings.length > 1) {
    warnings.forEach(item => {
      const warningElement = document.getElementById(`${item}Warning`)
      if (item) warningElement.style.display = 'flex'
    })
    // focus on the first warning field
    const focusElement = document.getElementById(warnings[0])
    focusElement.focus()
  }
  else if (wrongEmail) {
    wrongElement.style.display = 'flex'
  }
  else {
    success.style.display = 'flex'
    setTimeout(() => { success.style.opacity = 1 })
    setTimeout(() => { success.style.display = 'none' }, 4000)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    wrongElement.style.display = 'none'
    wrongEmail = false
    clearForm()
    return
  }
})

// remove warning if field changed
form.addEventListener('change', (event) => {
  const item = event.target
  const warningElement = document.getElementById(`${item.id}Warning`)
  const element = document.getElementById(item.id)
  warningElement.style.display = 'none'
  element.classList.remove('form__input-warning')
})
