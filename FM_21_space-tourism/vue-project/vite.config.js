import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(png|jpe?g|gif|svg)$/.test(name || '')) {
            return 'assets/images/[name].[hash][extname]'
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(name || '')) {
            return 'assets/fonts/[name].[hash][extname]'
          }
          return 'assets/[name].[hash][extname]';
        }
      }
    }
  }
})
