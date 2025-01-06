const heroBlock = document.querySelector('.hero');
const newBlock = document.querySelector('.new');
const topBlock = document.querySelector('.top');
const navList = document.querySelector('.header__nav-list');
const menuButton = document.querySelector('.header__btn');

// fetch data function
async function loadData() {
  try {
    const response = await fetch('https://dar-ju.github.io/FM_15_news-homepage/data.json')
    // const response = await fetch('./data.json');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('data read error:', err);
  }
}

async function dataFill() {
  const data = await loadData();

  // hero block fill
  heroBlock.querySelector('.hero__image').src = data[0].hero.imageDesktop;
  const source = heroBlock.querySelector('source');
  source.srcset = data[0].hero.imageMobile;
  heroBlock.querySelector('.hero__title').textContent = data[0].hero.title;
  heroBlock.querySelector('.hero__description').textContent = data[0].hero.description;
  heroBlock.querySelector('.main-button').href = data[0].hero.url;

  // new block fill
  const newList = document.createElement('ul');
  newList.classList.add('new__block');
  newBlock.append(newList);
  for (let i = 0; i < data[1].new.length; i++) {
    const newItem = document.createElement('li');
    const newLink = document.createElement('a');
    const newTitle = document.createElement('h3');
    const newDescr = document.createElement('p');
    newItem.classList.add('new__item');
    newTitle.classList.add('new__subtitle');
    newDescr.classList.add('new__about');
    newList.append(newItem);
    newItem.append(newLink);
    newLink.append(newTitle);
    newItem.append(newDescr);
    newTitle.textContent = data[1].new[i].title;
    newDescr.textContent = data[1].new[i].description;
    newLink.href = data[1].new[i].url;
  }

  // top block fill
  const topList = document.createElement('ul');
  topList.classList.add('top__block');
  topBlock.append(topList);
  for (let i = 0; i < data[2].top.length; i++) {
    const topItem = document.createElement('li');
    const topImg = document.createElement('img');
    const topWrap = document.createElement('div');
    const topTitle = document.createElement('h2');
    const topLink = document.createElement('a');
    const topSubTitle = document.createElement('h3');
    const topDescr = document.createElement('p');
    topItem.classList.add('top__item');
    topImg.classList.add('top__image');
    topWrap.classList.add('top__item-wrapper');
    topTitle.classList.add('top__title');
    topSubTitle.classList.add('top__subtitle');
    topDescr.classList.add('top__about');
    topList.append(topItem);
    topItem.append(topImg);
    topItem.append(topWrap);
    topWrap.append(topTitle);
    topWrap.append(topLink);
    topLink.append(topSubTitle);
    topWrap.append(topDescr);
    topImg.src = data[2].top[i].image;
    topImg.alt = data[2].top[i].title;
    i < 9 ? topTitle.textContent = `0${i + 1}` : topTitle.textContent = i + 1;
    topSubTitle.textContent = data[2].top[i].title;
    topDescr.textContent = data[2].top[i].description;
    topLink.href = data[2].top[i].url;
  }
}
dataFill()

// mobile menu
menuButton.addEventListener('click', menuButtonToggle);
function menuButtonToggle() {
  const isOpen = menuButton.classList.contains('header__btn_close');
  if (isOpen) {
    menuButton.classList.remove('header__btn_close');
    navList.classList.add('header__nav-list_mobile-close');
    setTimeout(() => { navList.classList.remove('header__nav-list_mobile'); }, 500)
  } else {
    menuButton.classList.add('header__btn_close');
    navList.classList.remove('header__nav-list_mobile-close');
    navList.classList.add('header__nav-list_mobile');
  }
}

// menu correction on window resize
window.addEventListener('resize', () => {
  navList.classList.remove('header__nav-list_mobile');
  navList.classList.remove('header__nav-list_mobile-close');
  menuButton.classList.remove('header__btn_close');
})

