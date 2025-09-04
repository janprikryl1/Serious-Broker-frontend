// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import preload from 'vite-plugin-preload';

const excludedPaths = [
  'admin',
  'editor',
  'Admin',
  'Editor',
  'EditArticle',
  'HighlightsEditor',
  'Profile',
  'profile',
  'MyPortfolio',
  'membershipService',
  'Highlight',
  'Glossary',
  'feedback',
  'Demo',
  'demo',
  'PostEdit',
  'Recommendation',
  'Register',
  'TranslateEdit'
];

export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    preload({
      shouldPreload: (mod) => {
        if (!mod?.fileName) return false;

        const fileName = mod.fileName.replace(/\\/g, '/');

        if (fileName.match(/\.(css|png|jpe?g|svg|gif|webp|mp4|webm|woff2?|ttf|eot)$/i)) {
          return false;
        }

        return !excludedPaths.some(path => fileName.includes(path));
      }
    })
  ]
});
