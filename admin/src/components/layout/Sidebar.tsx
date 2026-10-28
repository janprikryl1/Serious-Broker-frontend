import { useState, useEffect, type FC } from "react"
import { Link, useLocation } from "react-router"
import {
  ChevronDown,
  Menu,
  PanelLeftClose,
  X,
} from "lucide-react"
import {
  navigationStructure,
  absoluteAdminPath,
} from "@/utils/constants/routes.ts"
import type { NavGroup, NavItem } from "@/utils/types/Route.ts"
import { Button } from "@/components/ui/button.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { cn } from "@/lib/utils.ts"

type Props = {
  isCollapsed: boolean
  onToggleCollapsed: () => void
}

const isPathActive = (pathname: string, path: string) => {
  if (path === "") {
    return pathname === "/" || pathname === ""
  }
  return pathname === `/${path}` || pathname.startsWith(`/${path}/`)
}

const isNavGroupActive = (pathname: string, group: NavGroup) =>
  group.children.some((child) => isPathActive(pathname, child.path))

export const Sidebar: FC<Props> = ({ isCollapsed, onToggleCollapsed }) => {
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const isActive = (path: string) => isPathActive(location.pathname, path)
  const isGroupActive = (group: NavGroup) =>
    isNavGroupActive(location.pathname, group)

  // Výchozí stav otevření skupin: Uživatelé, Databáze i Server jsou otevřené
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    users: true,
    database: true,
    server: true,
  })

  // Pokud uživatel naviguje na stránku uvnitř skupiny, skupina se automaticky otevře
  useEffect(() => {
    for (const entry of navigationStructure) {
      if (
        entry.type === "group" &&
        isNavGroupActive(location.pathname, entry)
      ) {
        setOpenGroups((prev) =>
          prev[entry.id] ? prev : { ...prev, [entry.id]: true }
        )
      }
    }
  }, [location.pathname])

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const renderSingleItem = (item: NavItem) => {
    const active = isActive(item.path)
    const content = (
      <>
        <item.icon className="size-4 shrink-0" />
        {!isCollapsed && <span className="truncate">{item.label}</span>}
      </>
    )

    if (!item.migrated) {
      return (
        <a
          key={item.path}
          href={absoluteAdminPath(item.path)}
          title={isCollapsed ? `${item.label} (starý web)` : undefined}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
            isCollapsed && "justify-center p-2",
            active
              ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          {content}
        </a>
      )
    }

    return (
      <Link
        key={item.path}
        to={`/${item.path}`}
        onClick={() => setIsMobileOpen(false)}
        title={isCollapsed ? item.label : undefined}
        className={cn(
          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
          isCollapsed && "justify-center p-2",
          active
            ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        {content}
      </Link>
    )
  }

  const renderGroup = (group: NavGroup) => {
    const groupActive = isGroupActive(group)
    const isOpen = Boolean(openGroups[group.id])

    // V zabaleném režimu (isCollapsed = true) se skupina vykreslí jako DropdownMenu
    if (isCollapsed) {
      return (
        <DropdownMenu key={group.id}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              title={group.label}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg text-sm transition-colors",
                groupActive
                  ? "bg-sidebar-primary/20 text-sidebar-primary font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <group.icon className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-56">
            <DropdownMenuLabel className="font-semibold">
              {group.label}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {group.children.map((child) => (
              <DropdownMenuItem key={child.path} asChild>
                <Link
                  to={`/${child.path}`}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2",
                    isActive(child.path) && "font-semibold text-primary"
                  )}
                >
                  <child.icon className="size-4 shrink-0" />
                  <span>{child.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    // V plném rozbaleném režimu je skupina rozklikávací akordeon
    return (
      <div key={group.id} className="space-y-1">
        <button
          type="button"
          onClick={() => toggleGroup(group.id)}
          className={cn(
            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            groupActive
              ? "text-sidebar-foreground font-semibold"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <div className="flex items-center gap-2.5">
            <group.icon
              className={cn(
                "size-4 shrink-0",
                groupActive ? "text-primary" : "text-muted-foreground"
              )}
            />
            <span className="truncate">{group.label}</span>
          </div>
          <ChevronDown
            className={cn(
              "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="ml-4 flex flex-col gap-0.5 border-l border-sidebar-border/70 pl-2">
            {group.children.map((child) => {
              const active = isActive(child.path)
              return (
                <Link
                  key={child.path}
                  to={`/${child.path}`}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs transition-colors",
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <child.icon className="size-3.5 shrink-0" />
                  <span className="truncate">{child.label}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobilní přepínač — sidebar je pod lg schovaný mimo viewport. */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50 lg:hidden"
        onClick={() => setIsMobileOpen((open) => !open)}
        aria-label="Přepnout menu"
      >
        {isMobileOpen ? <X /> : <Menu />}
      </Button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-sidebar-border bg-sidebar transition-[width,transform]",
          isCollapsed ? "w-16" : "w-60",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-14 items-center gap-2 px-3">
          {!isCollapsed && (
            <span className="truncate text-sm font-semibold">Administrace</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto hidden lg:inline-flex"
            onClick={onToggleCollapsed}
            aria-label="Zabalit menu"
          >
            <PanelLeftClose
              className={cn(
                "transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        <Separator />

        <div className="flex-1 overflow-y-auto p-2">
          <nav className="flex flex-col gap-1">
            {navigationStructure.map((entry) =>
              entry.type === "group"
                ? renderGroup(entry)
                : renderSingleItem(entry)
            )}
          </nav>
        </div>
      </aside>

      {isMobileOpen && (
        <button
          type="button"
          aria-label="Zavřít menu"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
