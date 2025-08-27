import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react()],
    server: {
        headers: {
            "Cross-Origin-Opener-Policy": "unsafe-none",
        },
    },
    build: {
        outDir: "dist",
    },
});
