<script setup lang="ts">
import { ref } from 'vue'
import FormNav from './components/FormNav.vue'
import FormStep1 from './components/FormStep1.vue'
import FormStep2 from './components/FormStep2.vue'
// import FormStep3 from './components/FormStep3.vue'
// import FormStep4 from './components/FormStep4.vue'
// import FormThank from './components/FormThank.vue'

const formData = ref({
  // step1: {},
  // step2: {},
  // step3: {},
  // step4: {},
  billing: {
    monthly: {
      arcade: 9,
      advanced: 12,
      pro: 12,
    },
    yearly: {
      arcade: 90,
      advanced: 120,
      pro: 120,
    },
  },
  addOns: {},
})

const currentStage = ref(1)
const getData = (data, direction, step) => {
  if (direction === 'next') currentStage.value += 1
  if (direction === 'prev') currentStage.value += -1
  formData.value[step] = data
  console.log(data)

  localStorage.setItem('multiForm', JSON.stringify(formData.value))
}
</script>

<template>
  <main>
    <section class="form section">
      <div class="form__container">
        <div class="form__wrapper">
          <FormNav :active="currentStage" />
          <FormStep1 @data="getData" v-show="currentStage === 1" />
          <FormStep2 @data="getData" v-show="currentStage === 2" />
          <!-- <h1>TEST</h1> -->
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.form {
  &__container {
    padding-right: 50px;
    padding-left: 50px;
  }
  &__wrapper {
    display: flex;
    max-width: 940px;
    margin: 0 auto;
    padding: 16px;
    background-color: var(--white);
    border-radius: 16px;
  }
}
</style>
