const billTotal = document.querySelector('.tip-calculator__input_bill')
const tipVariations = document.querySelectorAll('.tip-calculator__tip-list li')
const numberOfPeople = document.querySelector('.tip-calculator__input_person')

// Tip fields
const customButton = document.querySelector('.tip-calculator__tip-item_custom')
const customLiField = document.querySelector('.tip-calculator__tip-item_custom-field')
const customField = document.querySelector('.tip-calculator__input_tip')
let tipValue

// Result fields
const resultAmount = document.getElementById('resultAmount')
const resultTotal = document.getElementById('resultTotal')

// Reset
const resetButton = document.getElementById('reset')

billTotal.addEventListener('change', (event) => {
  getResult()
})


function colorReset() {
  tipVariations.forEach(element => {
    element.style.backgroundColor = 'var(--color-very-dark-cyan)'
    element.style.color = 'var(--color-very-light-grayish-cyan)'
  })
}

tipVariations.forEach(element => {
  element.addEventListener('click', (event) => {
    colorReset()
    const target = event.target.textContent.replace('%', '')
    if (target === 'Custom') {
      customButton.style.display = 'none'
      customLiField.style.display = 'initial'
      customField.focus();
    } else if (!target) return
    else {
      customLiField.style.display = 'none'
      customButton.style.display = 'initial'
      event.target.style.backgroundColor = 'var(--color-light-grayish-cyan)'
      event.target.style.color = 'var(--color-very-dark-cyan)'
      tipValue = Number(target)
      console.log(tipValue);

    }
  })
});

function getResult() {
  if (!tipValue) tipValue = customField.value
  const amount = (billTotal.value / numberOfPeople.value) * (tipValue / 100)
  resultAmount.textContent = `$${Math.floor(amount * 100) / 100}`
  const total = (billTotal.value / numberOfPeople.value) + amount
  resultTotal.textContent = `$${Math.floor(total * 100) / 100}`
}

resetButton.addEventListener('click', () => {
  colorReset()
  resultAmount.textContent = '$0.00'
  resultTotal.textContent = '$0.00'
  billTotal.value = ''
  numberOfPeople.value = ''
  if (customField.value) {
    customField.value = ''
    customLiField.style.display = 'none'
    customButton.style.display = 'initial'
  }
})

