import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    baseURL: "/comment-reply/",
    buildAssetsDir: "assets",
  },

  nitro: {
    preset: "static",
    prerender: {
      ignore: [],
    },
  },
});