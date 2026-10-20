export const backendUrl = "https://api.serious.broker/"

/**
 * Origin veřejného webu (projekt `web`). V produkci jede admin jako subpath
 * na stejné doméně, takže stačí relativní cesta — v devu to řeší proxy ve
 * `web/vite.config.ts`, která /admin/ přesměruje na vite dev server adminu.
 *
 * Díky stejnému originu se localStorage (a v něm token) sdílí s webem
 * automaticky a nemusí se nikam předávat.
 */
export const webOrigin = ""
