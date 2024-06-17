import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      mode: 'development',
      base: '/',
      injectRegister: 'auto',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}']
      },
      manifest: {
        name: 'Todo PWA app',
        short_name: 'Todo',
        description:
          "Une application installable et utilisable hors ligne pour gérer les choses que l'on doit faire",
        theme_color: '#ffffff',
        icons: [
          {
            src: 'todo-icon-192x192.png', // <== don't add slash, for testing
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/todo-icon-512x512.png', // <== don't remove slash, for testing
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'todo-icon-512x512.png', // <== don't add slash, for testing
            sizes: '512x512',
            type: 'image/png',
            purpose: ['any', 'maskable'] // testing new type declaration
          }
        ],
        screenshots: [
          {
            src: 'todo-app-screenshot-wide.png',
            sizes: '863x469',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Todo app screenshot'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
