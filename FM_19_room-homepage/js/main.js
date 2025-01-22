import { data } from "./data.js";

let firstImageNumber = 1

// greet animation
gsap.to('.greet__text', { opacity: 1, duration: 2, delay: 0.5 })
gsap.to('.greet__logo', { opacity: 1, duration: 2, delay: 2 })
const lines = document.querySelectorAll('.greet__line');
gsap.to(".greet li", {
  x: '100%',
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
  delay: 3.5,
  onComplete: () => {
    gsap.to(".greet", { display: 'none' });
  }
});

const imagesGroup = document.querySelector('.carousel__images')
const title = document.querySelector('.carousel__title')
const descr = document.querySelector('.carousel__description')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')

function imageAdd(item) {
  const index = data.findIndex(el => el.id === item)
  return `
    <picture class="carousel__image-wrapper" id="${item}">
      <source media="(max-width: 375px)" srcset=${data[index].urlMobile}>
      <img class="carousel__image" src=${data[index].urlDesktop}
        alt="${data[index].title}">
    </picture>
  `
}
imagesGroup.insertAdjacentHTML("beforeend", imageAdd(firstImageNumber))

function imageId(id) {
  const totalImages = Object.keys(data).length
  if (id > totalImages) return 1
  if (id === 0) return totalImages
  return id
}

function handleButtonClick(direction) {
  //image animation
  const currentImage = document.querySelector('.carousel__image-wrapper');
  const newImageId = imageId(Number(currentImage.id) + direction);
  imagesGroup.insertAdjacentHTML("afterbegin", imageAdd(newImageId));
  const images = document.querySelectorAll('.carousel__image-wrapper');
  gsap.to(images[1], { duration: 1, x: getXValue(direction), ease: "power3.inOut" });
  setTimeout(() => { images[1].remove() }, 1000);
  // title and descr animation
  const timeline = gsap.timeline();
  timeline
    .to([title, descr], { duration: 0.5, opacity: 0 })
    .call(() => { title.textContent = data[newImageId - 1].title })
    .call(() => { descr.textContent = data[newImageId - 1].description })
    .to([title, descr], { duration: 0.5, opacity: 1 })
  gsap.to('.carousel__btn svg', { duration: 0.3, x: 10, repeat: 1, yoyo: true, ease: 'power1.inOut' });
}

function getXValue(direction) {
  return direction === 1 ? '100%' : '-100%';
}

prevBtn.addEventListener('click', () => handleButtonClick(-1));
nextBtn.addEventListener('click', () => handleButtonClick(1));
