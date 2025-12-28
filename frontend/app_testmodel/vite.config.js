import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/yolo": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api/yolo", ""),
      },
      "/api/keras": {
        target: "http://localhost:8001",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api/keras", ""),
      },
    },
  },
})
