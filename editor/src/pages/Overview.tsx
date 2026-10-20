import type { FC } from "react"
import { Link } from "react-router"
import { navRoutes } from "@/utils/constants/routes.ts"
import { useAuth } from "@/utils/hooks/useAuth.ts"
import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx"

export const Overview: FC = () => {
  const { user } = useAuth()

  /* Přehled je rozcestník — vlastní data si načítá až každá sekce. */
  const sections = navRoutes.filter(({ path }) => path !== "")

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Editor</h1>
        <p className="text-muted-foreground text-sm">
          Přihlášen jako {user?.nickname} ({user?.role})
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ path, label, icon: Icon }) => (
          <Link key={path} to={`/${path}`} className="group">
            <Card className="hover:border-primary/50 h-full transition-colors">
              <CardHeader className="flex flex-row items-center gap-3">
                <Icon className="text-muted-foreground group-hover:text-primary size-5 shrink-0 transition-colors" />
                <CardTitle className="text-base">{label}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
