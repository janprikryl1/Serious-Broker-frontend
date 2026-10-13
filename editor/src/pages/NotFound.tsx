import type { FC } from "react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button.tsx"
import { routes } from "@/utils/constants/routes.ts"

export const NotFound: FC = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-muted-foreground text-6xl font-semibold">404</p>
      <h1 className="text-2xl font-semibold">Stránka nenalezena</h1>
      <Button asChild variant="outline">
        <Link to={`/${routes.index}`}>Zpět na přehled</Link>
      </Button>
    </div>
  )
}
