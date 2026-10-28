import { useEffect, useState } from "react"

/**
 * Zdrží změnu hodnoty, dokud uživatel na chvíli nepřestane psát.
 *
 * Používá se u filtrů, které se vyhodnocují na serveru — bez prodlevy by
 * každé stisknutí klávesy znamenalo vlastní dotaz do databáze.
 */
export const useDebouncedValue = <T>(value: T, delayMs = 350): T => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timeout)
  }, [value, delayMs])

  return debounced
}
