const allFields = document.querySelector('.tip-calculator__data')
const billTotal = document.querySelector('.tip-calculator__input_bill')
const tipVariations = document.querySelectorAll('.tip-calculator__tip-list li button')
const numberOfPeople = document.querySelector('.tip-calculator__input_person')
// Tip fields
const customButton = document.querySelector('.tip-calculator__tip-button-block')
const customLiField = document.querySelector('.tip-calculator__tip-item_custom-field')
const customField = document.querySelector('.tip-calculator__input_tip')
const warningMessage = document.querySelector('.tip-calculator__warning')
let tipValue
// Result fields
const resultAmount = document.getElementById('resultAmount')
const resultTotal = document.getElementById('resultTotal')
// Reset
const resetButton = document.getElementById('reset')
const addResetListener = () => { resetButton.classList.add('tip-calculator__main-button_hovered') }
const removeResetListener = () => { resetButton.classList.remove('tip-calculator__main-button_hovered') }

// Setup default focus
billTotal.focus();

// Prevent form submit
allFields.addEventListener('submit', (event) => {
  event.preventDefault();
})

// Fields listener
allFields.addEventListener('change', (event) => {
  event.preventDefault();
  if (event.target === customField) tipValue = customField.value
  if (event.target === numberOfPeople && Number(numberOfPeople.value)) {
    warningMessage.style.display = 'none'
    numberOfPeople.classList.remove('tip-calculator__input_outline')
  }
  getResult()
  peopleCheck()
})

// Button color reset
function colorReset() {
  tipVariations.forEach(element => {
    element.classList.remove('tip-calculator__tip-item_pushed')
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
      customField.focus();
    } else if (!tip) return
    else {
      customField.value = ''
      customLiField.style.display = 'none'
      customButton.style.display = 'initial'
      event.target.classList.add('tip-calculator__tip-item_pushed')
      tipValue = Number(tip)
    }
    getResult()
  })
});

// Number of people check
function peopleCheck() {
  if (!numberOfPeople.value) {
    warningMessage.style.display = 'block'
    numberOfPeople.classList.add('tip-calculator__input_outline')
  }
}

// Data format function
function formatData(value) {
  return new Intl.NumberFormat("en", {style: "currency", currency: "USD"}).format(value);
}

// Tip calculations
function getResult() {
  if (!tipValue) tipValue = customField.value
  const amount = (billTotal.value / numberOfPeople.value) * (tipValue / 100)
  const total = (billTotal.value / numberOfPeople.value) + amount
  if (amount && amount !== Infinity) {
    resultAmount.textContent = formatData(amount)
    resultTotal.textContent = formatData(total)
    resetButton.removeAttribute('disabled');
    resetButton.classList.add('tip-calculator__main-button_enabled')
    resetButton.addEventListener('mouseover', () => {
      addResetListener()
    });

    resetButton.addEventListener('mouseout', () => {
      removeResetListener()
    });
  }
}

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
  resetButton.classList.remove('tip-calculator__main-button_enabled')
  resetButton.removeEventListener('mouseover', () => {
    addResetListener()
  });
  resetButton.removeEventListener('mouseout', () => {
    removeResetListener()
  });
  billTotal.focus();
})

