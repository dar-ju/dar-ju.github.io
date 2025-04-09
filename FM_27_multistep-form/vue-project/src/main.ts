import './assets/styles/styles.scss'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import App from './App.vue'

const FormPrest = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: 'var(--marine-blue)',
      600: 'var(--marine-blue-light)',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
  },
  components: {
    inputtext: {
      focusBorderColor: 'var(--purple)',
      invalidBorderColor: 'var(--strawberry-red)',
      invalidPlaceholderColor: 'var(--cool-gray)',
    },
    toggleswitch: {
      width: '40px',
      height: '20px',
      handleSize: '12px',
      background: 'var(--strawberry-red)',
      // primaryBackground: 'var(--marine-blue)',
    },
    button: {
      secondaryBorderColor: 'transparent',
      colorScheme: {
        light: {
          root: {
            secondary: {
              background: 'transparent',
              hoverBackground: 'transparent',
              // borderColor: 'none',
              // hoverBorder: 'none',
            },
          },
        },
        dark: {
          root: {
            secondary: {
              background: 'transparent',
            },
          },
        },
      },
    },
  },
})

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: FormPrest,
  },
})

app.use(createPinia())

app.mount('#app')
