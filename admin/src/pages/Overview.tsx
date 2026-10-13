import type { FC } from "react"
import { useQuery } from "@tanstack/react-query"
import { FileText, ScrollText, Users } from "lucide-react"
import { getDashboardData } from "@/utils/api/adminService.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"
import { StatCard, StatCardSkeleton } from "@/components/StatCard.tsx"
import { useAuth } from "@/utils/hooks/useAuth.ts"

export const Overview: FC = () => {
  const { user } = useAuth()
  const {
    data: dashboard,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: getDashboardData,
  })

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Přehled</h1>
        <p className="text-sm text-muted-foreground">
          Přihlášen jako {user?.nickname} ({user?.role})
        </p>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Data přehledu se nepodařilo načíst.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isPending ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          dashboard && (
            <>
              <StatCard
                title="Počet článků"
                value={dashboard.article_count}
                icon={FileText}
              />
              <StatCard
                title="Počet uživatelů"
                value={dashboard.user_count}
                icon={Users}
              />
              <StatCard
                title="Poslední log"
                value={`${dashboard.last_log.tableName} ${dashboard.last_log.action}`}
                footer={toCzechDateFormat(dashboard.last_log.created)}
                icon={ScrollText}
              />
            </>
          )
        )}
      </div>
    </div>
  )
}
