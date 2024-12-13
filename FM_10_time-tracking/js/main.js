const periods = document.querySelectorAll('.dash__user-period-item')
const periodNames = {
  daily: 'Day',
  weekly: 'Week',
  monthly: 'Month',
}

// fetch data function
async function loadPeriods() {
  try {
    const response = await fetch('https://dar-ju.github.io/FM_10_time-tracking/data.json')
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('data read error:', err);
  }
}

// get and set data function
async function getPeriodData(period) {
  const data = await loadPeriods()
  const blockNames = data.map(obj => obj.title.toLowerCase().replaceAll(' ', '-'))
  blockNames.forEach(name => {
    const blockName = document.getElementById(name)
    const dataIndex = data.findIndex(el => el.title.toLowerCase().replaceAll(' ', '-') === name)
    const dataCurrent = data[dataIndex].timeframes[period].current
    const dataPrevious = data[dataIndex].timeframes[period].previous
    const curentBlock = blockName.querySelector('.dash__card-time')
    const previousBlock = blockName.querySelector('.dash__card-previous-data')
    // some aimation
    curentBlock.classList.add('dash__fadeout')
    previousBlock.classList.add('dash__fadeout')
    setTimeout(() =>{
      curentBlock.textContent = `${dataCurrent}hrs`
      previousBlock.textContent = `Last ${periodNames[period]} - ${dataPrevious}hrs`
      curentBlock.classList.remove('dash__fadeout')
      previousBlock.classList.remove('dash__fadeout')
    }, 200)
  })
}

// listener for periods
periods.forEach(period => {
  period.addEventListener('click', async (event) => {
    const selected = document.querySelector('.dash__user-period-item_color')
    if (event.target === selected) return
    if (selected) selected.classList.remove('dash__user-period-item_color')
    const target = event.target.textContent.toLowerCase();
    getPeriodData(target)
    period.classList.add('dash__user-period-item_color')
  });
})

// default selection
getPeriodData('weekly')

