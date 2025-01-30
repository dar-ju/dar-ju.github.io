import { data } from "./data.js"

// START ANIMATION
gsap.to('.hero__image', { transform: 'translateX(0)', delay: 0, ease: "power3.out", duration: 0.5 })
gsap.to('.hero__title', { opacity: 1, delay: 0 })
gsap.to('.hero__description', { opacity: 1, delay: 0 })
gsap.to('.hero__button-group', { transform: 'translateX(0)', delay: 0, ease: "power3.out" })

// TABS
const tabs = document.querySelectorAll('.tab-btn')
const tabImage = document.querySelector('.features__image')
const tabTitle = document.querySelector('.features__tab-block-title')
const tabDescr = document.querySelector('.features__tab-block-description')
const tabBtn = document.querySelector('.features__tab-block-btn')

tabs.forEach(tab => {
  tab.addEventListener('click', (event) => {
    if (tab.classList.contains('tab-active')) return
    tabs.forEach((item, index) => {
      item.classList.remove('tab-active')
      if (event.target === tabs[index]) {
        gsap.fromTo([tabTitle, tabDescr], { opacity: 0, duration: 1 }, { opacity: 1, duration: 1 })
        gsap.fromTo(tabImage, { scale: 0, duration: 0.5 }, { scale: 1, duration: 0.5 })
        tabTitle.textContent = data[0].tab[index].title
        tabDescr.textContent = data[0].tab[index].description
        tabImage.src = data[0].tab[index].image
        tabBtn.href = data[0].tab[index].url
      }
    });
    tab.classList.add('tab-active')
  });
});

// ACCORDION
const accordionItems = document.querySelectorAll('.faq__accordion-item')
let openedItem

accordionItems.forEach(item => {
  item.addEventListener('click', () => {
    function collapse(val) {
      gsap.to(val.children[1], { height: 0, duration: 0 })
      gsap.to(val.children[1], { opacity: 0, duration: 0 })
      gsap.to(val.children[0], { marginBottom: 0, duration: 0 })
      gsap.to(val.children[0].children[1], { stroke: '#5368DF', transform: 'rotateX(0deg)', duration: 0.3 })
    }
    if (openedItem === item) {
      collapse(item)
      openedItem = null
      return
    } else {
      if (openedItem) collapse(openedItem)
      gsap.to(item.children[1], { height: '100%', opacity: 1, duration: 0.3 })
      gsap.to(item.children[0], { marginBottom: '40px', duration: 0 })
      gsap.to(item.children[0].children[1], { stroke: '#FA5757', transform: 'rotateX(180deg)', duration: 0.3 })
    }
    openedItem = item
  })
})

// MOBILE MENU
const mobileMenuBurger = document.querySelector('.header__burger')
const mobileMenuClose = document.querySelector('.header__mobile-menu-close')
const mobileMenuBlock = document.querySelector('.header__mobile-menu')

mobileMenuBurger.addEventListener('click', () => {
  mobileMenuBlock.style.display = 'flex'
  gsap.to(mobileMenuBlock, { left: 0 })
})
mobileMenuClose.addEventListener('click', () => {
  gsap.to(mobileMenuBlock, { left: '110%' })
  setTimeout(() => { mobileMenuBlock.style.display = 'none' }, 300)
})

// EMAIL VERIFY
const emailInput = document.querySelector('.contact__input')
const emailError = document.querySelector('.contact__input-error')
const formBlock = document.querySelector('.contact__input-wrapper')
const contactForm = document.querySelector('.contact__form')

function emailCheck(value) {
  const regular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regular.test(value)
}

function warningToggle(value) {
  if (!value) {
    emailError.style.display = 'flex'
    formBlock.style.marginBottom = '35px'
  } else {
    if (emailError.style.display === 'flex') {
      emailError.style.display = 'none'
      formBlock.style.marginBottom = '17px'
    }
  }
}

emailInput.addEventListener('change', (event) => {
  const isEmailValid = emailCheck(event.target.value)
  isEmailValid ? warningToggle(true) : warningToggle(false)
})

contactForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!emailInput.value) {
    warningToggle(false)
    emailError.textContent = 'Please fill in the email field'
  } else if (!emailCheck(emailInput.value)) emailError.textContent = 'Whoops, make sure it`s an email'
  else {
    warningToggle(true)
    emailError.textContent = 'Whoops, make sure it`s an email'
    emailInput.value = ''
    emailInput.placeholder = '🟢 Thank you for your request!'
    setTimeout(() => {
      emailInput.placeholder = 'Enter your email address'
    }, 4000)
  }
})
