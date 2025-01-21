import { data } from "./data.js";

let firstImageNumber = 1

const imagesGroup = document.querySelector('.carousel__images')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const dataLength = Object.keys(data).length
const imagesIdArr = []

// const imageOrder = (number) => {
//   if (number === -1)
//   if (firstImageNumber - number === 0 || firstImageNumber + number > dataLength) return dataLength
//   else return firstImageNumber + number
// }

const imagesToLoad = (item) => {
  imagesIdArr.push(firstImageNumber - 1 === 0 ? dataLength : firstImageNumber - 1)
  imagesIdArr.push(firstImageNumber)
  imagesIdArr.push(firstImageNumber + 1 > dataLength ? 1 : firstImageNumber + 1)
}
imagesToLoad()




function imageAdd(item) {
  const index = data.findIndex(el => el.id === item)
  return `
    <picture class="carousel__image-wrapper" carouselId="${item}">
      <source media="(max-width: 375px)" srcset=${data[index].urlMobile}>
      <img class="carousel__image" src=${data[index].urlDesktop}
        alt="Discover innovative ways to decorate image">
    </picture>
  `
}

function imagesFill() {
  imagesIdArr.forEach(item => {
    imagesGroup.insertAdjacentHTML("beforeend", imageAdd(item))
  });
}
imagesFill()

function animationMovement(className) {
  const images = document.querySelectorAll('.carousel__image-wrapper')
  images.forEach(element => {
    element.classList.add(className)
  });
}

prevBtn.addEventListener('click', (event) => {
  event.preventDefault()
  animationMovement('prevAnimation')
  setTimeout(() => {
    const carouselId = imagesGroup.children[imagesGroup.children.length - 1].getAttribute("carouselId")
    imagesGroup.children[imagesGroup.children.length - 1].remove();
    imagesGroup.insertAdjacentHTML("afterBegin", imageAdd(carouselId - 1))
    // imagesGroup.insertAdjacentHTML("beforeend", imageAdd(carouselId - 1))
  }, 1000);
})
// parent.style.display = 'none';
//     parent.style.display = 'block';

nextBtn.addEventListener('click', (event) => {
  event.preventDefault()
  animationMovement('nextAnimation')
  setTimeout(() => {
    const carouselId = imagesGroup.children[0].getAttribute("carouselId")
    imagesGroup.children[0].remove();
    imagesGroup.insertAdjacentHTML("afterBegin", imageAdd(carouselId + 1))
    // imagesGroup.insertAdjacentHTML("beforeend", imageAdd(carouselId - 1))
  }, 1000);
})
