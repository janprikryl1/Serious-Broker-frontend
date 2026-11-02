import {QueryClient} from "@tanstack/react-query";

/**
 * Sdílený TanStack Query klient.
 *
 * Data z backendu (doporučení, indexy) přepočítává denní cron, takže je zbytečné
 * je stahovat při každém přepnutí okna nebo remountu komponenty. Stejné dotazy
 * z více komponent naráz se navíc sloučí do jednoho requestu.
 *
 * Část odpovědí závisí na přihlášeném uživateli (např. `in_watchlist`), proto se
 * cache maže při přihlášení i odhlášení (`queryClient.clear()`).
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});
