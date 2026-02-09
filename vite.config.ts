import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 🚀 OPTIMIZADO: Configuración de build para producción
  build: {
    // Tamaño máximo de chunks para mejorar caching
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        // Code splitting manual para vendor chunks
        manualChunks: {
          // Separar React y dependencias core
          'react-vendor': ['react', 'react-dom'],
          
          // Separar framer-motion (animaciones)
          'animation-vendor': ['framer-motion'],
        },
        
        // Naming pattern para chunks
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    
    // Minificación
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remueve console.logs en producción
        drop_debugger: true,
      },
    },
    
    // Source maps para debugging (opcional, aumenta tamaño)
    sourcemap: false,
    
    // Optimización CSS
    cssCodeSplit: true,
    cssMinify: true,
  },
  
  // 🚀 OPTIMIZADO: Configuración de optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion'
    ],
  },
  
  // 🚀 OPTIMIZADO: Configuración del servidor de desarrollo
  server: {
    port: 3000,
    open: true,
  },
})
