import './assets/styles/styles.scss'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import App from './App.vue'

const MyPrest = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: 'var(--bright-red)',
      600: 'var(--bright-red-light)',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}'
    },
  },
  components: {
    button: {
      primaryHoverBorderColor: 'var(--bright-red-light)',
    },
  },
})

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: MyPrest
  }
});

app.mount('#app')
