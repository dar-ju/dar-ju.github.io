import { data } from "./data.js";

const langEng = document.getElementById('langEng')
const langRus = document.getElementById('langRus')

let lang = 'en'

langEng.addEventListener('click', (event) => {
  event.preventDefault()
  langToggle()
})
langRus.addEventListener('click', (event) => {
  event.preventDefault()
  langToggle()
})

function langToggle() {
  if (lang === 'en') {
    langRus.classList.add('selected')
    langEng.classList.remove('selected')
    lang = 'ru'
  } else {
    langEng.classList.add('selected')
    langRus.classList.remove('selected')
    lang = 'en'
  }
  loadData()
}

function loadData() {
  data.forEach(async (item) => await createSectionCards(item))
}
loadData()

async function checkImage(path1, path2) {
  try {
    const response = await fetch(path1)
    if (response.ok) {
      return path1
    } else {
      return path2
    }
  } catch (error) {
    return path2
  }
}

async function createSectionCards(item) {
  loadLang()

  const allGroup = document.querySelector('.all__group')
  const latestCard = document.querySelector('.latest__card')
  allGroup.innerHTML = ''
  latestCard.innerHTML = ''

  const taskName = Object.keys(item)[0]
  if (taskName === 'commonLang') return

  let taskId = data.length - (data.length - item[taskName].id)
  taskId = taskId > 9 ? taskId : '0' + taskId

  async function getImagePath() {
    return `./FM_${taskId}_${taskName}/design/desktop-preview.jpg`
  }

  const image = await getImagePath()
  const title = item[taskName][lang].title
  const description = item[taskName][lang].description
  const urlLive = `https://dar-ju.github.io/FM_${taskId}_${taskName}/`
  const urlFm = item[taskName].urlFm
  const urlGit = `https://github.com/dar-ju/dar-ju.github.io/tree/main/FM_${taskId}_${taskName}`

  const cardAll = `
    <li class="all__card">
      <img class="lazyload all__image" data-src="${image}" alt="${taskName} challenge image">
      <div class="all__wrapper">
        <div class="all__about">
          <h3 class="all__name">${title}</h3>
          <p class="all__description">${description}</p>
        </div>
        <div class="all__button-group">
          <a class="btn link all__btn live-btn" href="${urlLive}">Live site</a>
          <a class="btn link all__btn fm-btn" href="${urlFm}">FM page</a>
          <a class="btn link all__btn" href="${urlGit}">Github</a>
        </div>
      </div>
    </li>
  `

  const cardLatest = `
    <div class="latest__about">
      <h3 class="latest__name">${title}</h3>
      <p>${description}</p>
      <div class="latest__button-group">
        <a class="btn link live-btn" href="${urlLive}">Live site</a>
        <a class="btn link fm-btn" href="${urlFm}">FM page</a>
        <a class="btn link" href="${urlGit}">Github</a>
      </div>
    </div>
    <img class="lazyload latest__img" data-src="${image}" alt="${taskName} challenge image">
  `

  if (data.length - 1 === item[taskName].id) latestCard.insertAdjacentHTML("beforeend", cardLatest)
  else allGroup.insertAdjacentHTML("beforeend", cardAll)

  lazyload()
}

function loadLang() {
  const langItem = data[data.length - 1].commonLang[lang]
  document.getElementById('menuLatest').textContent = langItem.subtitle1
  document.getElementById('menuAll').textContent = langItem.subtitle2
  document.querySelector('.hero__title-background').textContent = langItem.title
  document.querySelector('.latest__subtitle').textContent = langItem.subtitle1
  document.querySelector('.all__subtitle').textContent = langItem.subtitle2
  document.querySelectorAll('.live-btn').forEach(btn => {
    btn.textContent = langItem.btnLive;
  });
  document.querySelectorAll('.fm-btn').forEach(btn => {
    btn.textContent = langItem.btnFm;
  });
  for (let i = 1; i <= 4; i++) {
    document.querySelector(`.hero__description p:nth-of-type(${i})`).innerHTML = langItem[`heroDescription${i}`]
  }
  document.querySelector('.footer__thank').textContent = langItem.thank
  document.querySelector('.all__technologies-title').textContent = langItem.technologies
}

document.querySelector('.footer__copy').textContent = `darju ${new Date().getFullYear()}`
