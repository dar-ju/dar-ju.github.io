<script setup></script>

<template>
  <div class="home__wrapper">
    <div class="container home__container">
      <div class="home__block">
        <span class="text-1 home__text">So, you want to travel to</span>
        <h1 class="title title-1 home__title">Space</h1>
        <p class="paragraph-1 home__description">
          Let’s face it; if you want to go to space, you might as well genuinely go to outer space
          and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a
          truly out of this world experience!
        </p>
      </div>
      <router-view :key="$route.fullPath" />

      <router-link class="title title-4 home__btn" to="/destination">Explore</router-link>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.home__wrapper {
  padding-top: 428px;
  padding-bottom: 125px;
}

.home__container {
  display: flex;
  padding-right: 165px;
  padding-left: 165px;
  align-items: center;
  justify-content: space-between;
}

.home__block {
  max-width: 540px;
}

.home__text {
  /* display: block;
  margin-bottom: 11px; */
}
.home__title {
}
.home__description {
}
.home__btn {
  display: flex;
  position: relative;
  width: 272px;
  height: 272px;
  border-radius: 50%;
  background-color: var(--color-white);
  color: var(--color-blue900);
  align-items: center;
  justify-content: center;
  transition: color ease-in-out 0.3s;
}
.home__btn::after {
  content: '';
  position: absolute;
  width: 171%;
  height: 171%;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  background-color: var(--color-white10);
  transition: opacity ease-in-out 0.3s;
}
.home__btn:hover::after {
  opacity: 1;
}
.home__btn:hover {
  opacity: 1;
  color: var(--color-blue90050);
}
</style>
