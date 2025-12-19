import "./assets/main.css";
import "./assets/styles.css";

import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import netlifyIdentity from "netlify-identity-widget";
import { createHead } from "@vueuse/head";
import { routes } from "./router";

export const createApp = ViteSSG(
  App,
  { 
    routes,
  },
  ({ app, router, routes, isClient, initialState }) => {
    const head = createHead();
    app.use(head);
    
    if (isClient) {
      netlifyIdentity.init();
    }
  }
);
