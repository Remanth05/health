import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/server/node-build.js"),
      name: "Server",
      fileName: () => "node-build.mjs",
      formats: ["es"],
    },
    minify: false,
    emptyOutDir: false,
    outDir: "dist/server",
  },
  resolve: {
    alias: {
      "@server": path.resolve(__dirname, "./src/server"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
