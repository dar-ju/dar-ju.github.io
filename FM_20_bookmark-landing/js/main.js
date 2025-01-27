import { data } from "./data.js"

// TAB logic
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
        gsap.fromTo(tabImage, { scale: 0.5, duration: 0.5 }, { scale: 1, duration: 0.5 })
        tabTitle.textContent = data[0].tab[index].title
        tabDescr.textContent = data[0].tab[index].description
        tabImage.src = data[0].tab[index].image
        tabBtn.href = data[0].tab[index].url
      }
    });
    tab.classList.add('tab-active')
  });
});

// ACCORDION logic
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
