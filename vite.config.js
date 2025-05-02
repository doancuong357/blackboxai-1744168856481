import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Alias cho thư mục src
    }
  },
  server: {
    port: 8007, // Cổng chạy server
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // URL API của bạn
        changeOrigin: true,
        secure: false, // Hỗ trợ HTTPS nếu cần
        rewrite: (path) => path.replace(/^\/api/, ''), // Xóa tiền tố /api
        logLevel: 'info' // Hiển thị thông tin proxy trong terminal
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000, // Tăng giới hạn cảnh báo kích thước chunk
    minify: 'esbuild' // Tối ưu hóa build với esbuild
  },
  define: {
    'process.env': {} // Hỗ trợ biến môi trường
  }
})