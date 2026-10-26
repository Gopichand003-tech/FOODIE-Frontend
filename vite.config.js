import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,     // 🔥 KEY FIX
      interval: 100,        // faster detection
    },
    hmr: {
      overlay: false,       // avoid UI blocking
    },
  },
});