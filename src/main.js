import './assets/main.css'
import 'reset-css'

import Router from './router.js'
import Store from './stores.js'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.use(Router).use(Store).mount('#app')