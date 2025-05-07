import { data } from "./data.js";

let filteredData = data
let stackList = []
let stackListFiltered = []
let allStackItems

const clearStackBtn = document.querySelector('.all__stack-clear')

// lang init
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
  loadFilteredData()
  createLatestCard()
}

// all used tools list create
function stackListCreate() {
  data.forEach(element => {
    const taskName = Object.keys(element)[0]
    const stackArr = element[taskName].stack
    if (stackArr) stackList = Array.from(new Set([...stackList, ...stackArr]))
  });
}
stackListCreate()

// filtered list function width animation
async function loadFilteredData() {
  await filteredData.forEach(async (item) => await createSectionCards(item))
  const cards = document.querySelectorAll('.all__card')
  cards.forEach(element => {
    setTimeout(() => {
      element.classList.add('all__card_show')
    }, 100);
  });
}
loadFilteredData()

// stack list function
function loadStackData() {
  stackList.forEach(async (item) => await createStackItem(item))
  stackListener()
}
loadStackData()

// latest card render
async function createLatestCard() {
  const latestCard = document.querySelector('.latest__card')
  latestCard.innerHTML = ''

  const latestItem = data[0][Object.keys(data[0])]
  const latestName = Object.keys(data[0])

  const latest = {
    "title": latestItem[lang].title,
    "description": latestItem[lang].description,
    "urlLive": `https://dar-ju.github.io/FM_${latestItem.id}_${latestName}/`,
    "urlFm": latestItem.urlFm,
    "urlGit": `https://github.com/dar-ju/dar-ju.github.io/tree/main/FM_${latestItem.id}_${latestName}`,
    "image": `./FM_${latestItem.id}_${latestName}/design/desktop-preview.jpg`
  }
  const cardLatest = `
    <div class="latest__about">
      <h3 class="latest__name">${latest.title}</h3>
      <p>${latest.description}</p>
      <div class="latest__button-group">
        <a class="btn link live-btn" href="${latest.urlLive}">Live site</a>
        <a class="btn link fm-btn" href="${latest.urlFm}">FM page</a>
        <a class="btn link" href="${latest.urlGit}">Github</a>
      </div>
    </div>
    <img class="lazyload latest__img" data-src="${latest.image}" alt="${latestName} challenge image">
  `
  latestCard.insertAdjacentHTML("beforeend", cardLatest)
}
createLatestCard()

// all solutions render
async function createSectionCards(item) {
  loadLang()

  const allGroup = document.querySelector('.all__group')
  allGroup.innerHTML = ''

  const taskName = Object.keys(item)[0]
  if (taskName === 'commonLang') return

  let taskId = filteredData.length - (filteredData.length - item[taskName].id)
  taskId = taskId > 9 ? taskId : '0' + taskId

  function getImagePath() {
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
  allGroup.insertAdjacentHTML("beforeend", cardAll)

  lazyload()
}

// stac list render
async function createStackItem(item) {
  const allStack = document.querySelector('.all__stack')
  const stackItem = `
    <li class="all__stack-item">${item}</li>
  `
  allStack.insertAdjacentHTML("beforeend", stackItem)
}

// stack buttons listener
function stackListener() {
  allStackItems = document.querySelectorAll('.all__stack-item')
  allStackItems.forEach(item => {
    item.addEventListener('click', (event) => {
      const stack = event.target
      if (stack.classList.contains('all__stack-item_selected')) {
        stackListFiltered = stackListFiltered.filter((item) => item !== stack.textContent)
        stack.classList.remove('all__stack-item_selected')
        filteredData = data
      } else {
        stackListFiltered.push(stack.textContent)
        stack.classList.add('all__stack-item_selected')
        clearStackBtn.classList.add('all__stack-clear_visible')
      }
      dataListFilter()
      stackListDisable()
    });
  });
}

// disable buttons if no need to filter
function stackListDisable() {
  const numOfFilteredItems = Object.keys(filteredData).length
  const stackItems = document.querySelectorAll('.all__stack-item')

  stackItems.forEach(element => {
    element.classList.remove('all__stack-item_blocked')
    const numOfStacks = filteredData.filter((item) => item[Object.keys(item)].stack?.includes(element.textContent)).length
    if (!numOfStacks || numOfStacks >= numOfFilteredItems && !element.classList.contains('all__stack-item_selected')) element.classList.add('all__stack-item_blocked')
  });
}

// filter functon
function dataListFilter() {
  const filteredDataTemp = filteredData
  filteredData = []

  stackListFiltered.forEach((element, index, arr) => {
    if (index === arr.length - 1) {
      const filtered = filteredDataTemp.filter((item) => item[Object.keys(item)].stack?.includes(element))
      filteredData = Array.from(new Set([...filteredData, ...filtered]))
    }
  });

  loadFilteredData()
  if (!filteredData.length) stackClear()
}

// reset filter
function stackClear() {
  stackListFiltered = []
  filteredData = data
  clearStackBtn.classList.remove('all__stack-clear_visible')
  allStackItems = document.querySelectorAll('.all__stack-item')
  allStackItems.forEach(item => {
    item.classList.remove('all__stack-item_selected')
  });
  loadFilteredData()
  stackListDisable()
}
clearStackBtn.addEventListener('click', () => {
  stackClear()
})

// lang function
function loadLang() {
  const langItem = data[data.length - 1].commonLang[lang]
  document.getElementById('menuLatest').textContent = langItem.subtitle1
  document.getElementById('menuAll').textContent = langItem.subtitle2
  document.querySelector('.hero__title-background').textContent = langItem.title
  document.querySelector('.latest__subtitle').textContent = langItem.subtitle1
  document.querySelector('.all__subtitle').textContent = langItem.subtitle2
  document.querySelector('.all__stack-title').textContent = langItem.filter
  document.querySelector('.all__stack-clear').textContent = langItem.btnClear
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
