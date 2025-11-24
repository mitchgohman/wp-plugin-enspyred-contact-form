import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 5137;

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@Core": resolve(__dirname, "src/core"),
        },
    },
    define: {
        "process.env": {}, // Avoids undefined env for styled-components
    },
    server: {
        host: "0.0.0.0",
        port,
        strictPort: true,
        origin: `http://localhost:${port}`,
        cors: true,
        hmr: {
            clientPort: port, // helpful behind proxies/containers
        },
    },
    build: {
        manifest: true,
        outDir: resolve(__dirname, "build"),
        emptyOutDir: false,
        sourcemap: true,
        rollupOptions: {
            input: resolve(__dirname, "src/index.jsx"),
        },
    },
});
