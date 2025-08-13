const burgerBtn = document.querySelector('.header__burger-btn')
const closeBtn = document.querySelector('.menu-header__close-btn')
const menu = document.querySelector('.menu-header')
const overlay = document.querySelector('.overlay')

burgerBtn.addEventListener('click', () => {
  menu.style.opacity = '1'
  overlay.style.opacity = '1'
  burgerBtn.style.opacity = '0'
  closeBtn.style.opacity = '1'
  closeBtn.style.pointerEvents = 'initial'
})

closeBtn.addEventListener('click', () => {
  menu.style.opacity = '0'
  overlay.style.opacity = '0'
  burgerBtn.style.opacity = '1'
  closeBtn.style.opacity = '0'
  burgerBtn.style.pointerEvents = 'initial'
  closeBtn.style.pointerEvents = 'none'
})
