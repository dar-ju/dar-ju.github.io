<script setup lang="ts">
import { ref } from 'vue'
import FormNav from './components/FormNav.vue'
import FormStep1 from './components/FormStep1.vue'
import FormStep2 from './components/FormStep2.vue'
// import FormStep3 from './components/FormStep3.vue'
// import FormStep4 from './components/FormStep4.vue'
// import FormThank from './components/FormThank.vue'

const currentStage = ref(1)
const stageChange = () => {
  currentStage.value += 1
}
</script>

<template>
  <main>
    <section class="form section">
      <div class="form__container">
        <FormNav :active="1" />
        <FormStep1 @formStep1Done="stageChange()" v-show="currentStage === 1" />
        <FormStep2 @formStep2Done="stageChange()" v-show="currentStage === 2" />
        <!-- <h1>TEST</h1> -->
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.form {
  &__container {
    display: flex;
    max-width: 940px;
    margin: 0 auto;
    padding: 16px;
    gap: clamp(1px, 9vw, 100px);
    background-color: var(--white);
    border-radius: 16px;
  }
}
</style>
