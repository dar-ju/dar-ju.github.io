const ratingButtons = document.querySelectorAll('.rating__list li button');
const submitButton = document.querySelector('.rating__submit');
const chooseWindow = document.querySelector('.rating__window_choose');
const modalWindow = document.querySelector('.rating__window_thank');
const resultText = document.querySelector('.rating__thank-result');
let ratingChosen

// Logic of pushed buttons
ratingButtons.forEach(element => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    ratingChosen = event.target.value;
    ratingButtons.forEach(item => {
      item.classList.remove('rating__item_pushed');
    })
    event.target.classList.add('rating__item_pushed');
  })
});

// Submit button
submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (ratingChosen) {
    resultText.textContent = `You selected ${ratingChosen} out of 5`;
    chooseWindow.style.display = 'none';
    modalWindow.style.display = 'block';
    setTimeout(() => { modalWindow.style.opacity = 1 });
  }
})
