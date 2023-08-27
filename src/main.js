import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { metaTagPlugin, setTitle } from '@m-media/vue3-meta-tags'

const app = createApp(App)

app.use(router)

app.use(metaTagPlugin, { defaultName: "Gossip.uz", defaultLocale: 'en' }, router)


app.mount('#app')
