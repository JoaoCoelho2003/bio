import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import netlifyIdentity from 'netlify-identity-widget';
import router from './router'
import './assets/main.css'

netlifyIdentity.init();
const app = createApp(App)

app.use(router)

app.mount('#app')   
