import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "Reflex-Project/",           // если деплоишь в GitHub Pages со slug-репо, укажи base: "/Reflex-Project/"
});
