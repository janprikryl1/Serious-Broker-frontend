/**
 * Klíč musí zůstat shodný s `web` (`authenticateService.ts`) — na tom celé
 * sdílení přihlášení stojí. localStorage je per-origin, ne per-path, takže
 * dokud admin jede jako subpath stejné domény, čte přesně ten token, který
 * tam zapsal login na webu.
 */
export const TOKEN_STORAGE_KEY = "token"

export const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY)

export const clearToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY)
