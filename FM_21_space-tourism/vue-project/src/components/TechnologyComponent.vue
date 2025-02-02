<script setup></script>

<template>
  <div class="technology__wrapper">
    <div class="container technology__container">
      <h1 class="text-1 technology__title">
        <span class="technology__title-number">03</span>Space launch 101
      </h1>
      <div class="technology__block">
        <nav class="technology__nav">
          <ul class="technology__nav-list">
            <li class="title title-4">
              <a class="link technology__nav-item technology__nav-item_active" href="#">1</a>
            </li>
            <li class="title title-4">
              <a class="link technology__nav-item" href="#">2</a>
            </li>
            <li class="title title-4">
              <a class="link technology__nav-item" href="#">3</a>
            </li>
          </ul>
        </nav>
        <div class="technology__text-block">
          <span class="title title-4 technology__sutitle">The terminology...</span>
          <h3 class="title title-3">Launch vehicle</h3>
          <p class="paragraph-1 technology__description">
            A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload
            from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier
            rocket is the most powerful in operation. Standing 150 metres tall, it's quite an
            awe-inspiring sight on the launch pad!
          </p>
        </div>
        <img
          class="technology__image"
          src="@/assets/images/technology/image-launch-vehicle-portrait.jpg"
          alt=""
        />
      </div>
      <!-- <a class="title title-4 technology__btn" href="#">Explore</a> -->
    </div>
  </div>
</template>

<style scoped>
.technology__wrapper {
  padding-top: 60px;
  padding-bottom: 48px;
}

.technology__container {
  /* display: flex; */
  padding-right: 0;
  padding-left: 165px;
  /* align-items: center;
  justify-content: space-between; */
}

.technology__title {
  margin-bottom: 105px;
  font-weight: 400;
  color: var(--color-white);
}

.technology__title-number {
  margin-right: 22px;
  font-weight: 600;
  color: var(--color-white25);
}

.technology__block {
  display: flex;
}
.technology__nav {
  display: flex;
  margin-right: 64px;
  flex-direction: column;
  justify-content: center;
}
.technology__nav-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.text-3 {
}
.nav-item {
}
.technology__nav-item {
  display: flex;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  outline: 1px solid var(--color-white25);
  align-items: center;
  justify-content: center;
}
.technology__nav-item_active {
  color: var(--color-blue900);
  background-color: var(--color-white);
}
.link {
}
.technology__text-block {
  display: flex;
  margin-right: 34px;
  gap: 38px;
  flex-direction: column;
  justify-content: center;
}
.title {
}
.title-4 {
}
.technology__sutitle {
  display: block;
  color: var(--color-white50);
}
.title-3 {
}
.paragraph-1 {
}
.technology__description {
}
.technology__image {
}
</style>
