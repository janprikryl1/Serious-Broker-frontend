import { createContext } from "react"

export type Theme = "dark" | "light" | "system"

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

/*
 * Context i hook `useTheme` jsou v samostatných souborech, aby
 * `theme-provider.tsx` exportoval jen komponentu. Jinak Fast Refresh při
 * editaci provideru shodí stav celého podstromu (biome
 * lint/style/useComponentExportOnlyModules).
 */
export const ThemeProviderContext = createContext<
  ThemeProviderState | undefined
>(undefined)
