<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import FormNav from './components/FormNav.vue'
import FormStep1 from './components/FormStep1.vue'
import FormStep2 from './components/FormStep2.vue'
import FormStep3 from './components/FormStep3.vue'
// import FormStep4 from './components/FormStep4.vue'
// import FormThank from './components/FormThank.vue'

const formData = ref({
  step1: {
    name: '',
    email: '',
    phone: '',
  },
  step2: {
    plan: '',
    period: '',
  },
  step3: {
    options: [],
  },
  step4: {},
  billing: {
    monthly: {
      arcade: 9,
      advanced: 12,
      pro: 15,
    },
    yearly: {
      arcade: 90,
      advanced: 120,
      pro: 150,
    },
  },
  addOns: {
    monthly: {
      service: 1,
      storage: 2,
      profile: 2,
    },
    yearly: {
      service: 10,
      storage: 20,
      profile: 20,
    },
  },
})

const currentStage = ref(1)
const getData = (data, direction, step) => {
  if (direction === 'next') currentStage.value += 1
  if (direction === 'prev') currentStage.value += -1
  formData.value[step] = data
  localStorage.setItem('multiForm', JSON.stringify(formData.value))
}

// onMounted(() => {
//   console.log(formData.value)
// })

onBeforeMount(() => {
  const local = JSON.parse(localStorage.getItem('multiForm') || '{}')
  formData.value.step1.name = local.step1?.name || ''
  formData.value.step1.email = local.step1?.email || ''
  formData.value.step1.phone = local.step1?.phone || ''
  formData.value.step2.plan = local.step2?.plan || 'arcade'
  formData.value.step2.period = local.step2?.period || 'monthly'
  formData.value.step3.options = local.step3?.options || ''
})
</script>

<template>
  <main>
    <section class="form section">
      <div class="form__container">
        <div class="form__wrapper">
          <FormNav :active="currentStage" />
          <FormStep1 @data="getData" v-show="currentStage === 1" :formData="formData" />
          <FormStep2 @data="getData" v-show="currentStage === 2" :formData="formData" />
          <FormStep3 @data="getData" v-show="currentStage === 3" :formData="formData" />
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
