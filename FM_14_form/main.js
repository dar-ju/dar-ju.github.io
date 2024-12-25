const form = document.querySelector('.form')
const success = document.querySelector('.successful')
const radioButtons = document.querySelectorAll('input[type="radio"]')
let warnings = []

// radio block background change
radioButtons.forEach(radio => {
  radio.addEventListener('change', (event) => {
    backgroundColorRemove()
    const selectedQueryDiv = event.target.closest('.form__query')
    selectedQueryDiv.classList.add('form__query_selected')
  });
});

// radio block background color remove
function backgroundColorRemove() {
  document.querySelectorAll('.form__query').forEach(div => {
    div.classList.remove('form__query_selected')
  })
}

// common form check function
function formCheck() {
  warnings = []
  for (let item of form) {
    if ((item.type === 'text' || item.type === 'textarea') && item.value.trim() === '') {
      warnings.push(item.id)
    }
    if (item.type === 'email') {
      if (!emailCheck(item.value)) warnings.push(item.id)
    }
    if (item.type === 'radio' && !item.checked) {
      const radioGroup = form.querySelectorAll(`input[name="${item.name}"]`)
      const isAnyChecked = Array.from(radioGroup).some(radio => radio.checked)
      if (!isAnyChecked) warnings.push(item.name)
    }
    if (item.type === 'checkbox' && !item.checked) warnings.push(item.id)
  }
}

// email check function
function emailCheck(value) {
  const regular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regular.test(value)
}

// clear form function
function clearForm() {
  for (let item of form) {
    item.value = ''
    if (item.type === 'checkbox' || item.type === 'radio') item.checked = false
  }
}

// submit button listener
form.addEventListener('submit', (event) => {
  event.preventDefault();
  formCheck()
  if (warnings.length) {
    warnings.forEach(item => {
      const warningElement = document.getElementById(`${item}Warning`)
      const element = document.getElementById(item)
      warningElement.style.display = 'inline-block'
      if (item) {
        if (element && element.type !== 'checkbox') element.classList.add('form__input-warning')
      }
    });
    // focus on the first warning field
    if (warnings[0] !== 'query') {
      const focusElement = document.getElementById(warnings[0])
      focusElement.focus()
    }
  } else {
    success.style.display = 'flex'
    setTimeout(() => { success.style.opacity = 1 })
    setTimeout(() => { success.style.display = 'none' }, 4000)
    backgroundColorRemove()
    clearForm()
  }
})

// remove warning if field changed
form.addEventListener('change', (event) => {
  const item = event.target
  const warningElement = document.getElementById(`${item.id}Warning`)
  const warningRadioElement = document.getElementById('queryWarning')
  const element = document.getElementById(item.id)
  if (element.type === 'radio') warningRadioElement.style.display = 'none'
  else {
    warningElement.style.display = 'none'
    element.classList.remove('form__input-warning')
  }
})
