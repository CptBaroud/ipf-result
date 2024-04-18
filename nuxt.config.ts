// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    dirs: ['types/*.ts', 'store/*.ts', 'types/**/*.ts'],
  },
  tailwindcss: {
    cssPath: "~/tailwind/index.css",
    exposeConfig: false,
  },
  modules: ['@nuxtjs/tailwindcss', "@nuxt/content"]
})