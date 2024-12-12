const periods = document.querySelectorAll('.dash__user-period-item')

periods.forEach(period => {
  period.addEventListener('click', (event) => {
    const target = event.target.textContent.toLowerCase();
    console.log(target);
  });
})

