import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// GitHub Actions supplies the repository path; local builds work at the root.
export default defineConfig({
  plugins: [vue()],
  publicDir: ".generated/public",
  base: process.env.BASE_PATH || "/",
  ssgOptions: { dirStyle: "nested", formatting: "minify" },
});
