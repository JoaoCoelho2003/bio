import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    modules: ["@nuxt/content"],
    nitro: {
      preset: "netlify",
    },
  })
  
  