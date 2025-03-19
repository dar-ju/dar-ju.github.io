<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { themes } from './composables/themeSet'

const isDarkTheme = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDarkTheme.value = savedTheme === 'dark'
  }
})

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  const theme = isDarkTheme.value ? 'dark' : 'light'
  localStorage.setItem('theme', theme)

  Object.entries(themes[theme]).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value as string)
  })
}

const reloadPage = () => {
  window.location.reload()
}
</script>

<template>
  <header class="section header">
    <div class="container header__container">
      <h1 @click="reloadPage" class="header__title">
        <router-link to="/">Where in the world?</router-link>
      </h1>
      <button @click="toggleTheme()" class="header__mode-toggle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27">
          <g id="Moon">
            <path
              d="M28.7734,21.8105a1.0036,1.0036,0,0,0-1.0888-.3154,11.4777,11.4777,0,0,1-3.625.586A12.1265,12.1265,0,0,1,12.1641,9.7627,12.52,12.52,0,0,1,13.8208,3.5a1,1,0,0,0-1.18-1.4492A14.2355,14.2355,0,0,0,3,15.6816,14.1274,14.1274,0,0,0,16.8955,30,13.8617,13.8617,0,0,0,28.8687,22.94,1,1,0,0,0,28.7734,21.8105ZM16.8955,28A12.1265,12.1265,0,0,1,5,15.6816,12.3568,12.3568,0,0,1,10.95,5.0068a14.7016,14.7016,0,0,0-.7861,4.7559A14.1274,14.1274,0,0,0,24.06,24.0811a13.5134,13.5134,0,0,0,1.6162-.0967A11.7586,11.7586,0,0,1,16.8955,28Z"
            ></path>
          </g>
        </svg>
        <span>Dark Mode</span>
      </button>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
.header {
  padding-top: 26px;
  padding-bottom: 26px;
  background-color: var(--white-darkBlue);
  box-shadow: 0px 1px 7px 0px var(--veryLightGray-veryDarkBlue);
  transition:
    background-color ease-in-out 0.3s,
    box-shadow ease-in-out 0.3s;
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    font-size: 1.49rem;
    font-weight: 800;
  }
  &__mode-toggle {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--darkBlue-white);
    font-weight: 600;
    transition: color ease-in-out 0.3s;
    svg {
      fill: var(--darkBlue-white);
      transition: fill ease-in-out 0.3s;
    }
  }
  &__mode-toggle svg {
    width: 15px;
    height: 20px;
    transform: rotate(-13deg);
  }
}

@media (max-width: 750px) {
  .header {
    padding-top: 64px;
    padding-bottom: 64px;
    &__title {
      font-size: 1.72rem;
    }
    &__mode-toggle {
      gap: 22px;
      span {
        font-size: 1.5rem;
      }
      svg {
        width: 25px;
        height: 30px;
      }
    }
  }
}

@media (max-width: 568px) {
  .header {
    &__container {
      gap: 50px;
      flex-wrap: wrap;
    }
  }
}
</style>
