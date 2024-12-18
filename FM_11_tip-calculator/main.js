const allFields = document.querySelector('.splitter__data')
const billTotal = document.querySelector('.splitter__input_bill')
const tipVariations = document.querySelectorAll('.splitter__tip-list li button')
const numberOfPeople = document.querySelector('.splitter__input_person')
// Tip fields
const customButton = document.querySelector('.splitter__tip-button-block')
const customLiField = document.querySelector('.splitter__tip-item_custom-field')
const customField = document.querySelector('.splitter__input_tip')
const warningMessage = document.querySelector('.splitter__warning')
let tipValue
// Result fields
const resultAmount = document.getElementById('resultAmount')
const resultTotal = document.getElementById('resultTotal')
// Reset
const resetButton = document.getElementById('reset')

// Setup default focus
billTotal.focus();

// Prevent form submit
allFields.addEventListener('submit', (event) => {
  event.preventDefault()
})

// Fields listener
allFields.addEventListener('change', (event) => {
  if (event.target === customField) tipValue = customField.value
  if (event.target === numberOfPeople && Number(numberOfPeople.value)) {
    warningMessage.style.display = 'none'
    numberOfPeople.classList.remove('splitter__input_outline')
  }
  getResult()
  peopleCheck()
})

// Button color reset
function colorReset() {
  tipVariations.forEach(element => {
    element.classList.remove('splitter__tip-item_pushed')
  })
}

// Tip buttons check
tipVariations.forEach(element => {
  element.addEventListener('click', (event) => {
    const tip = event.target.value
    colorReset()
    if (event.target.textContent === 'Custom') {
      customButton.style.display = 'none'
      customLiField.style.display = 'initial'
      customField.focus()
    } else if (!tip) return
    else {
      customField.value = ''
      customLiField.style.display = 'none'
      customButton.style.display = 'initial'
      event.target.classList.add('splitter__tip-item_pushed')
      tipValue = Number(tip)
    }
    getResult()
  })
});

// Number of people check
function peopleCheck() {
  if (!Number(numberOfPeople.value)) {
    warningMessage.style.display = 'block'
    numberOfPeople.classList.add('splitter__input_outline')
  }
}

// Data format function
function formatData(value) {
  return new Intl.NumberFormat("en", {style: "currency", currency: "USD"}).format(value);
}

// Tip calculations & get result
function getResult() {
  if (!tipValue) tipValue = customField.value
  const amount = (billTotal.value / numberOfPeople.value) * (tipValue / 100)
  const total = (billTotal.value / numberOfPeople.value) + amount
  if (amount && amount !== Infinity) {
    resultAmount.textContent = formatData(amount)
    resultTotal.textContent = formatData(total)
    resetButton.removeAttribute('disabled')
    resetButton.classList.add('splitter__main-button_enabled')
    resetButton.addEventListener('mouseover', addHover)
    resetButton.addEventListener('mouseout', removeHover)
  } else {
    resultAmount.textContent = formatData(0)
    resultTotal.textContent = formatData(0)
  }
}

// Reset button hover listeners
const addHover = () => resetButton.classList.add('splitter__main-button_hovered');
const removeHover = () => resetButton.classList.remove('splitter__main-button_hovered');

// Reset form
resetButton.addEventListener('click', () => {
  colorReset()
  resultAmount.textContent = formatData(0)
  resultTotal.textContent = formatData(0)
  billTotal.value = ''
  numberOfPeople.value = ''
  if (customField.value) {
    customField.value = ''
    customLiField.style.display = 'none'
    customButton.style.display = 'initial'
  }
  resetButton.setAttribute('disabled', '')
  resetButton.classList.remove('splitter__main-button_enabled')
  resetButton.classList.remove('splitter__main-button_hovered')
  resetButton.removeEventListener('mouseover', addHover);
  resetButton.removeEventListener('mouseout', removeHover);
  billTotal.focus();
})
