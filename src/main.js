import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from 'vue-gtag'

const app = createApp(App)

app.use(router)
app.use(VueGtag, {
    appName: 'portfolio',
    pageTrackerScreenviewEnabled: true,
    config: { id: import.meta.env.VUE_APP_GOOGLE_ANALYTICS_ID }
})

app.mount('#app')
