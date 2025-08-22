import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      assets: path.resolve(__dirname, "src/assets"),
      store: path.resolve(__dirname, "src/store"),
      routes: path.resolve(__dirname, "src/routes"),
      themes: path.resolve(__dirname, "src/themes"),
      "ui-component": path.resolve(__dirname, "src/ui-component"),
      layout: path.resolve(__dirname, "src/layout"),
      utils: path.resolve(__dirname, "src/utils"),
      views: path.resolve(__dirname, "src/views"),
      module: path.resolve(__dirname, "src/module"),
      container: path.resolve(__dirname, "src/container"),
      Profile: path.resolve(__dirname, "src/Profile"),
      "menu-items": path.resolve(__dirname, "src/menu-items"),
      config: path.resolve(__dirname, "src/config"),
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/,
  },
  server: {
    port: 3000,
    watch: {
      usePolling: true, // fixes HMR on Windows sometimes
    },
  },
});
