const popupBlock = document.querySelector('.article__contact_popup')
const panelBlock = document.querySelector('.article__contact_panel')
const followButton = document.querySelector('.article__follow-button')
const followArrow = document.querySelector('.article__follow-arrow')
const socialButtons = document.querySelectorAll('.article__social')
const colorDesaturatedDarkBlue = getComputedStyle(document.documentElement).getPropertyValue('--color-desaturated-dark-blue');
const colorLightGrayishBlue = getComputedStyle(document.documentElement).getPropertyValue('--color-light-grayish-blue');

// toggle function of states
function toggle(block, state) {
  block.style.opacity = state;
  state ? popupBlock.style.pointerEvents = 'auto' : popupBlock.style.pointerEvents = 'none'
}

// click on follow button
followButton.addEventListener('click', (event) => {
  event.stopPropagation();
  if (window.innerWidth > 768) toggle(popupBlock, 1);
  else toggle(panelBlock, 1);
  followButton.style.backgroundColor = colorDesaturatedDarkBlue;
  followArrow.style.fill = colorLightGrayishBlue;
})

// click on window to close modal/panel
document.addEventListener('click', (event) => {
  if (Array.from(socialButtons).includes(event.target)) return
  if (!popupBlock.contains(event.target) || !panelBlock.contains(event.target)) {
    if (window.innerWidth > 768) toggle(popupBlock, 0);
    else toggle(panelBlock, 0);
    followButton.style.backgroundColor = colorLightGrayishBlue;
    followArrow.style.fill = colorDesaturatedDarkBlue;
  }
});

// not nessesary, may to delete. Close modal/panel on window resize
window.addEventListener('resize', () => {
  if (panelBlock.style.opacity) toggle(panelBlock, 0);
  if (popupBlock.style.opacity) toggle(popupBlock, 0);
  followButton.style.backgroundColor = colorLightGrayishBlue;
  followArrow.style.fill = colorDesaturatedDarkBlue;
})
