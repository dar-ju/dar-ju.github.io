
// fetch data
async function loadData() {
  try {
    const response = await fetch('https://dar-ju.github.io/FM_22_summary-component/data.json')
    // const response = await fetch('./data.json')
    const data = await response.json()
    return data;
  } catch (err) {
    console.error('data read error:', err)
  }
}

// fill data
const scoreList = document.querySelector('.summary__list')

async function fillData() {
  const data = await loadData()

  data.forEach(element => {
    const item = `
      <li class="summary__item summary__item_${element.category}">
        <span class="summary__item-name">${element.category}</span>
        <div>
          <span class="summary__item-result">${element.score}</span>
          <span class="summary__item-of">&#47; 100</span>
        </div>
      </li>
    `
    scoreList.insertAdjacentHTML("beforeend", item)
    const itemIcon = document.querySelector(`.summary__item_${element.category} .summary__item-name`)
    itemIcon.style.backgroundImage = `url('${element.icon}')`
  });

  // average score
  const totalScore = data.map((item) => item.score).reduce((acc, val) => acc + val, 0)
  const averageScore = Math.round(totalScore / data.length)
  const resultItem = document.querySelector('.summary__total-count')
  resultItem.textContent = averageScore
}

fillData()
