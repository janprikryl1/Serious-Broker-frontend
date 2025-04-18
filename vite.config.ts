import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from "rollup-plugin-visualizer";
import preload from "vite-plugin-preload";

const excludedPaths = [
    '/admin',
    '/editor',
    '/Admin',
    '/Editor',
    '/EditArticle',
    '/HighlightsEditor'
];

export default defineConfig({
    plugins: [
        react(),
        visualizer(),
        preload({
            shouldPreload: (module) => 
                !excludedPaths.some(path => module.fileName.includes(path))
        }),
    ],
});
