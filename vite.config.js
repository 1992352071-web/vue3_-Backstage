import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'



// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  plugins: [vue(), WindiCSS()],
  server: {
    watch: {
      // Windows 下文件监听偶尔会漏事件，改用轮询
      usePolling: true
    },
    proxy: {

      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }


})
