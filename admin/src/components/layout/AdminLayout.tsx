import { useState, type FC } from "react"
import { Outlet } from "react-router"
import { Sidebar } from "@/components/layout/Sidebar.tsx"
import { UserNav } from "@/components/layout/UserNav.tsx"
import { ThemeToggle } from "@/components/ThemeToggle.tsx"
import { cn } from "@/lib/utils.ts"

const SIDEBAR_COLLAPSED_KEY = "sidebarCollapsed"

export const AdminLayout: FC = () => {
  // Stav drží layout, ne Sidebar — odsazení `main` se musí hýbat s ním.
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true"
  )

  const toggleCollapsed = () => {
    const next = !isCollapsed
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next))
    setIsCollapsed(next)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={isCollapsed} onToggleCollapsed={toggleCollapsed} />

      <div
        className={cn(
          "flex min-h-screen flex-col transition-[padding]",
          isCollapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
        {/* Horní lišta: vpravo profil s dropdownem a přepínač motivu */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-xs sm:px-6">
          <div className="flex items-center gap-2 pl-10 lg:pl-0">
            {/* Prázdné místo vlevo pro odsazení od mobilního tlačítka menu */}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle
              isCollapsed={true}
              className="w-auto p-2 hover:bg-accent"
            />
            <UserNav />
          </div>
        </header>

        {/* Hlavní obsah stránky */}
        <main className="flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
