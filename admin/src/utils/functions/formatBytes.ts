/**
 * Velikost souborů v lidsky čitelné podobě.
 *
 * Stejné jednotky i zaokrouhlení jako `serverFormatBytes()` v PHP
 * (`server/log_helpers.php`), aby se čísla ze dvou různých endpointů
 * nerozcházela.
 */
export const formatBytes = (bytes: number | null | undefined): string => {
  if (bytes === null || bytes === undefined || Number.isNaN(bytes)) return "–"

  const units = ["B", "kB", "MB", "GB", "TB"]
  let value = bytes
  let unit = 0

  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit++
  }

  const rounded = unit === 0 ? Math.round(value) : Math.round(value * 10) / 10
  return `${rounded.toLocaleString("cs-CZ")} ${units[unit]}`
}
