import './assets/styles/styles.scss'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import App from './App.vue'

const FormPrest = definePreset(Aura, {
  components: {
    inputtext: {
      focusBorderColor: 'var(--marine-blue)',
      invalidBorderColor: 'var(--strawberry-red)',
      invalidPlaceholderColor: 'var(--cool-gray)',
    },
  },
})

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: FormPrest,
  }
});

app.use(createPinia())

app.mount('#app')
