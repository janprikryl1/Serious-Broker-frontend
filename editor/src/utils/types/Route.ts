import type { LucideIcon } from "lucide-react"

export type NavItem = {
  path: string
  label: string
  icon: LucideIcon
  /*
   * false = stránka ještě žije ve projektu `web`. Sidebar na ni odkáže přes
   * <a href> (plná navigace), takže ji reverse proxy pustí na web místo do
   * tohoto buildu.
   */
  migrated: boolean
}

export type NavGroup = {
  type: "group"
  id: string
  label: string
  icon: LucideIcon
  children: NavItem[]
}

export type NavigationEntry = (NavItem & { type?: "item" }) | NavGroup

export type NavRoute = NavItem
