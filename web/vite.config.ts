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
  'CryptocurrenciesList',
  'Register',
  'TranslateEdit',

  // Dekorativní pozadí (three.js, ~160 kB gzip). Je záměrně lazy — bez téhle
  // výjimky by ho modulepreload stahoval na každé stránce a lazy by nemělo
  // žádný efekt.
  'VantaFog',

  // Chunky odštěpené z Routeru. Všechny jsou za přihlášením, takže je nemá
  // smysl předstahovat při první návštěvě.
  'Dashboard',
  'BTFDTuningParameters',
  'AssetCalculatorComponent',
  'CryptocurrencyDetails',
  'InvestmentPlan',
  'InvestedAmount',
  'NewPortfolio',
  'ChooseExistingPortfolio',
  'RecurringInvestment',
  'TrafficLight',
  'WatchList'
];

/*
 * Admin, editor a internal-tools jsou samostatné buildy (../admin, ../editor,
 * ../internal-tools), v produkci nasazené jako subpath stejné domény. Díky
 * stejnému originu sdílí localStorage, kde leží token — nemusí se nikam
 * předávat.
 *
 * V devu ale `localhost:5173` a `localhost:5174` stejný origin NEJSOU (origin
 * zahrnuje i port), takže by se token nesdílel a po přihlášení by se do
 * panelů nedalo přejít. Proxy to srovná: všechno jede přes 5173.
 *
/*
 * Admin, editor a internal-tools jsou kompletně v samostatných projektech,
 * takže se na ně přeposílá veškerý provoz pod jejich prefixy (/admin, /editor a /internal).
 */
const panelProxy: Record<string, { target: string; changeOrigin: boolean }> = {
  // Admin panel — kompletně zmigrován do projektu `admin` (port 5174)
  '^/admin': {
    target: 'http://localhost:5174',
    changeOrigin: false,
  },
  // Editor panel — kompletně zmigrován do projektu `editor` (port 5175)
  '^/editor': {
    target: 'http://localhost:5175',
    changeOrigin: false,
  },
  // Internal-tools — samostatný projekt (port 5176)
  '^/internal': {
    target: 'http://localhost:5176',
    changeOrigin: false,
  },
};

export default defineConfig({
  server: {
    /*
     * Port je zafixovaný schválně. Proxy míří na konkrétní porty, takže kdyby
     * si web při obsazeném 5173 tiše vzal jiný, odkazy mezi projekty by
     * přestaly sedět. Se strictPort se to pozná hned při startu.
     */
    port: 5173,
    strictPort: true,
    proxy: panelProxy,
  },
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
