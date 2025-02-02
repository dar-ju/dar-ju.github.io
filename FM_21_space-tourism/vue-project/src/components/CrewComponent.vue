<script setup></script>

<template>
  <div class="crew__wrapper">
    <div class="container crew__container">
      <h1 class="text-1 crew__title"><span class="crew__title-number">02</span>Meet your crew</h1>
      <div class="crew__block">
        <div class="crew__text-block">
          <div class="crew__info">
            <h2 class="title title-4 crew__subtitle">Commander</h2>
            <h3 class="title title-3">Douglas Hurley</h3>
            <p class="paragraph-1 crew__description">
              Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former
              NASA astronaut. He launched into space for the third time as commander of Crew Dragon
              Demo-2.
            </p>
          </div>
          <nav class="crew__nav">
            <ul class="crew__nav-list">
              <li class="crew__nav-item crew__nav-item_active">
                <a class="link" href="#"></a>
              </li>
              <li class="crew__nav-item">
                <a class="link" href="#"></a>
              </li>
              <li class="crew__nav-item">
                <a class="link" href="#"></a>
              </li>
              <li class="crew__nav-item">
                <a class="link" href="#"></a>
              </li>
            </ul>
          </nav>
        </div>
        <img class="crew__image" src="@/assets/images/crew/image-douglas-hurley.webp" alt="" />
      </div>
      <!-- <a class="title title-4 crew__btn" href="#">Explore</a> -->
    </div>
  </div>
</template>

<style scoped>
.crew__wrapper {
  padding-top: 60px;
  padding-bottom: 48px;
}

.crew__container {
  /* display: flex; */
  padding-right: 165px;
  padding-left: 165px;
  /* align-items: center;
  justify-content: space-between; */
}

.crew__title {
  margin-bottom: 24px;
  font-weight: 400;
  color: var(--color-white);
}

.crew__title-number {
  margin-right: 22px;
  font-weight: 600;
  color: var(--color-white25);
}
.crew__subtitle {
  color: var(--color-white50);
}
.crew__block {
  display: flex;
  padding: 45px 0;
  gap: 30px;
  justify-content: space-between;
}
.crew__image {
  width: 494px;
  mask-image: linear-gradient(var(--gray) 77%, transparent);
}
.crew__text-block {
  display: flex;
  max-width: 539px;
  flex-direction: column;
  justify-content: space-between;
}
.crew__info {
  display: flex;
  height: 100%;
  gap: 40px;
  flex-direction: column;
  justify-content: center;
}
.crew__nav {
  padding-top: 57px;
  padding-bottom: 18px;
}
.crew__nav-list {
  display: flex;
  gap: 40px;
  list-style: none;
}

.crew__nav-item {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  cursor: pointer;
  background-color: var(--color-white25);
}
.crew__nav-item_active {
  background-color: var(--color-white);
}

/* .crew__nav-item::after {
  content: '';
  display: block;
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: var(--color-white);
} */
/* .crew__nav-item::after {
  bottom: -23px;
} */
/* .crew__nav-item_active::after {
  opacity: 1;
  background-color: var(--color-white);
} */
/* .crew__sutitle {
  margin-bottom: 20px;
} */
.crew__description {
}
</style>
