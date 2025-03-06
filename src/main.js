import "./assets/main.css";
import "./assets/styles.css";

import { createApp } from "vue";
import App from "./App.vue";
import netlifyIdentity from "netlify-identity-widget";
import router from "./router";
import { createHead } from "@vueuse/head";
import "./assets/main.css";

netlifyIdentity.init();
const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);
app.mount("#app");
