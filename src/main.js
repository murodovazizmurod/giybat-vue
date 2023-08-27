import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { metaTagPlugin } from '@m-media/vue3-meta-tags'

const app = createApp(App)

app.use(router)

app.use(metaTagPlugin, 
    {defaultName: "G'iybat"},
    router)



app.mount('#app')
