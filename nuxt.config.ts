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
  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  modules: ['@nuxtjs/tailwindcss', "@nuxt/content", "@nuxtjs/color-mode"]
})