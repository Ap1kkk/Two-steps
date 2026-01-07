import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './routes/index.ts'

createApp(App)
    // .use(router)
    .mount('#app')
    // .use(createPinia())