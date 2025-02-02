import { defineConfig } from "vite";

export default defineConfig({
  server: {
    cors: true,
  },
  root: ".",
  build: {
    outDir: "dist",
  },
});
