import type { FC } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/utils/hooks/useTheme.ts"
import { cn } from "@/lib/utils.ts"

type Props = {
  isCollapsed?: boolean
  className?: string
}

export const ThemeToggle: FC<Props> = ({ isCollapsed = false, className }) => {
  const { theme, setTheme } = useTheme()

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const toggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const label = isDark ? "Světlý režim" : "Tmavý režim"

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className
      )}
      title={isCollapsed ? label : undefined}
      aria-label={label}
    >
      {isDark ? (
        <Sun className="size-4 shrink-0 text-amber-500" />
      ) : (
        <Moon className="size-4 shrink-0 text-slate-700 dark:text-slate-300" />
      )}
      {!isCollapsed && <span className="truncate">{label}</span>}
    </button>
  )
}
