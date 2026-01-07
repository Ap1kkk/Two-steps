import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@views': path.resolve(__dirname, './src/components/views'),
            '@images': path.resolve(__dirname, './src/images'),
            '@css': path.resolve(__dirname, './src/css'),
            '@api': path.resolve(__dirname, './src/components/api'),
        }
    }
})