import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Import custom styles
import './style.css'

// Assumes your root component is App.vue
import App from './App.vue'

const myApp = createApp(App)

// Inisialisasi Pinia
const pinia = createPinia()

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

// Gunakan Pinia
myApp.use(pinia)

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
