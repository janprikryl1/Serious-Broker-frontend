import type { FC } from "react"
import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { logout } from "@/utils/hooks/useAuth.ts"
import { webOrigin } from "@/env.ts"

export const Forbidden: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <ShieldAlert className="size-12 text-destructive" />
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Nedostatečné oprávnění</h1>
        <p className="max-w-prose text-muted-foreground">
          Tvůj účet nemá přístup do administrace. Pokud si myslíš, že to je
          chyba, obrať se na správce.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button asChild variant="outline">
          <a href={`${webOrigin}/`}>Zpět na web</a>
        </Button>
        <Button variant="ghost" onClick={logout}>
          Odhlásit se
        </Button>
      </div>
    </div>
  )
}
