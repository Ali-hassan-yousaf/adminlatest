import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server:{
    
//   }
// })
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://voguedeploy.vercel.app',
        changeOrigin: true, // Ensures the origin of the host header is changed to the target URL
        secure: true,       // Ensures SSL is handled
      },
    },
  },
  plugins: [react()],
});
