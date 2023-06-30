import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue(),
        laravel({
            input: [
                'resources/css/app.css', 
                'resources/js/app.js',

                'resources/topic/js/common_scripts.js',
                'resources/topic/js/jquery.mmenu.all.js',
                'resources/topic/js/theia-sticky-sidebar.js',
                //'resources/topic/js/functions.js',
                'resources/topic/assets/validate.js',
                

                'resources/topic/css/bootstrap.min.css',
                'resources/topic/css/style.css',
                'resources/topic/css/vendors.css',
                'resources/topic/css/custom.css',
            ],
            refresh: true,
        }),
    ],
});
