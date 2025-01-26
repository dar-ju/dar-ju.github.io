const tabs = document.querySelectorAll('.tab-btn')
const tabImage = document.querySelector('.features__image')
const tabTitle = document.querySelector('.features__tab-block-title')
const tabDescr = document.querySelector('.features__tab-block-description')

tabs.forEach(tab => {
  tab.addEventListener('click', (event) => {
    if (tab.classList.contains('tab-active')) return
    tabs.forEach(t => t.classList.remove('tab-active'));
    tab.classList.add('tab-active')
    const tabContent = [tabImage, tabTitle, tabDescr]
    tabContent.forEach(t => t.style.animationName = 'fade')
    if (event.target === tabs[0]) {
      setTimeout(() => {
        tabImage.src = "./images/illustration-features-tab-1.svg"
        tabTitle.textContent = 'Bookmark in one click'
        tabDescr.textContent = 'Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.'
      }, 500)
    }
    if (event.target === tabs[1]) {
      setTimeout(() => {
        tabImage.src = "./images/illustration-features-tab-2.svg"
        tabTitle.textContent = 'Intelligent search'
        tabDescr.textContent = 'Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.'
      }, 500)
    }
    if (event.target === tabs[2]) {
      setTimeout(() => {
        tabImage.src = "./images/illustration-features-tab-3.svg"
        tabTitle.textContent = 'Share your bookmarks'
        tabDescr.textContent = 'Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.'
      }, 500)
    }
  });
});
