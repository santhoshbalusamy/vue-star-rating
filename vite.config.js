import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default () => {
    return defineConfig({
        build: {
            lib: {
                entry: resolve(__dirname,'src/index.js'),
                name: 'VueStarRating',
                fileName: (format) => `VueStarRating.${format}.js`
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    globals: {
                        vue: 'Vue'
                    }
                }
            }
        },
        plugins: [vue()],
    });
};
