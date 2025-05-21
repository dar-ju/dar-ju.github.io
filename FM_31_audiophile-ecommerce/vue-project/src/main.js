import './assets/styles/styles.scss'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import VueLazyLoad from 'vue3-lazyload'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import { definePreset } from '@primeuix/themes';
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const audiophilePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: 'var(--orange)',
      600: 'var(--orange-lite)',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}'
    },
  },
  components: {
    button: {
      borderRadius: '0',
      label: {
        fontWeight: '700',
      },
      colorScheme: {
        light: {
          root: {
            primary: {
              color: 'var(--white)',
            },
            secondary: {
              color: 'var(--white)',
              background: 'var(--black)',
              borderColor: 'none',
              hoverBackground: 'var(--grey-dark)',
              hoverColor: 'var(--white)',
              hoverBorderColor: 'none',
            },
            contrast: {
              color: 'var(--black)',
              background: 'transparent',
              hoverBackground: 'var(--black)',
            },
          },
        },
        // dark: {
        //   root: {
        //     primary: {
        //       background: '{orange.500}',
        //     },
        //   },
        // },
      }
    },
    skeleton: {
      background: 'var(--grey) !important',
    },
    radiobutton: {
      icon: {
        checkedColor: 'var(--orange)',
        size: '10px',
      },
      borderColor: 'var(--grey-medium)',
      checkedBackground: 'transparent',
      checkedBorderColor: 'var(--grey-medium)',
    }
  },
})

const app = createApp(App);
app.use(VueLazyLoad)
app.use(PrimeVue, {
  theme: {
    preset: audiophilePreset,
  }
});
app.use(ToastService);
app.use(createPinia())
app.use(router)

app.mount('#app')
