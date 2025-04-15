<script setup>
import { onBeforeMount, ref } from 'vue'
import FormNav from './components/FormNav.vue'
import FormStep1 from './components/FormStep1.vue'
import FormStep2 from './components/FormStep2.vue'
import FormStep3 from './components/FormStep3.vue'
import FormStep4 from './components/FormStep4.vue'
import FormThank from './components/FormThank.vue'

const formDataDefault = {
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
      'Online service': 1,
      'Larger storage': 2,
      'Customizable profile': 2,
    },
    yearly: {
      'Online service': 10,
      'Larger storage': 20,
      'Customizable profile': 20,
    },
  },
}
const formData = ref({})

const currentStage = ref(1)
const getData = (data, direction, step) => {
  if (direction === 'next') currentStage.value += 1
  if (direction === 'prev') currentStage.value += -1
  formData.value[step] = data
  localStorage.setItem('multiForm', JSON.stringify(formData.value))
  if (direction === 'next' && step === 'step4') {
    localStorage.removeItem('multiForm')
    formData.value = formDataDefault
  }
}

onBeforeMount(() => {
  formData.value = formDataDefault
  const local = JSON.parse(localStorage.getItem('multiForm') || '{}')
  formData.value.step1.name = local.step1?.name || ''
  formData.value.step1.email = local.step1?.email || ''
  formData.value.step1.phone = local.step1?.phone || ''
  formData.value.step2.plan = local.step2?.plan || 'arcade'
  formData.value.step2.period = local.step2?.period || 'monthly'
  formData.value.step3.options = local.step3?.options || []
})
</script>

<template>
  <main class="main">
    <!-- <div class="overlay"></div> -->
    <section class="form section">
      <div class="form__container">
        <div class="form__wrapper">
          <FormNav :active="currentStage" />
          <FormStep1 v-show="currentStage === 1" @data="getData" :formData="formData" />
          <FormStep2 v-show="currentStage === 2" @data="getData" :formData="formData" />
          <FormStep3 v-show="currentStage === 3" @data="getData" :formData="formData" />
          <FormStep4 v-show="currentStage === 4" @data="getData" :formData="formData" />
          <FormThank v-show="currentStage === 5" />
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

@media (max-width: 768px) {
  .form {
    padding-top: 0;
    &__container {
      padding: 0;
    }
    &__wrapper {
      padding: 0;
      flex-direction: column;
      align-items: center;
      border-radius: initial;
    }
  }
}
</style>
