import { useMemo, useState, type FC } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Database,
  Mail,
  MailX,
  RefreshCw,
  XCircle,
} from "lucide-react"
import { getDataValidation } from "@/utils/api/serverService.ts"
import type {
  DataValidationCheck,
  DataValidationCheckType,
  DataValidationResponse,
  DataValidationRun,
} from "@/utils/types/server.ts"
import { Button } from "@/components/ui/button.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { Tooltip } from "@/components/ui/tooltip.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import { cn } from "@/lib/utils.ts"

const QUERY_KEY = ["admin", "server", "dataValidation"]

const DAY_OPTIONS = [7, 14, 30, 90, 365]

const STATUS_OPTIONS = [
  { value: "all", label: "Všechny běhy" },
  { value: "error", label: "Jen s chybou" },
  { value: "ok", label: "Jen v pořádku" },
] as const

type StatusFilter = (typeof STATUS_OPTIONS)[number]["value"]

/** Maximum sloupců v matici — víc se na šířku stránky rozumně nevejde. */
const MATRIX_MAX_RUNS = 45

const TYPE_LABELS: Record<DataValidationCheckType, string> = {
  sync_log: "Migrace",
  freshness: "Aktuálnost",
  daily_coverage: "Úplnost dní",
  min_rows: "Počet řádků",
  connection: "Připojení",
}

/** "2026-11-26 12:00:02" → "26. 11. 12:00" */
const formatDateTime = (value: string) => {
  const [date, time = ""] = value.split(" ")
  const [, month, day] = date.split("-")
  return `${Number(day)}. ${Number(month)}. ${time.slice(0, 5)}`
}

/** "2026-11-26 12:00:02" → "26.11." pro hlavičku sloupce matice */
const formatShortDate = (value: string) => {
  const [, month, day] = value.split(" ")[0].split("-")
  return `${Number(day)}.${Number(month)}.`
}

const formatAge = (hours: number | null) => {
  if (hours === null) return "—"
  if (hours < 1) return "před chvílí"
  if (hours < 48) return `před ${hours} h`
  return `před ${Math.floor(hours / 24)} dny`
}

const StatusBadge: FC<{ status: DataValidationRun["status"] }> = ({
  status,
}) =>
  status === "ok" ? (
    <Badge
      variant="ghost"
      className="h-5 bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400"
    >
      OK
    </Badge>
  ) : (
    <Badge variant="ghost" className="h-5 bg-destructive/10 text-destructive">
      Chyba
    </Badge>
  )

const EmailState: FC<{ run: DataValidationRun }> = ({ run }) => {
  if (run.emailSent === null) return null
  return run.emailSent ? (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <Mail className="size-3.5" />
      {run.testEmail ? "Testovací e-mail" : "E-mail odeslán"}
    </span>
  ) : (
    <span className="flex items-center gap-1 text-xs text-destructive">
      <MailX className="size-3.5" />
      E-mail se nepodařilo odeslat
    </span>
  )
}

const CheckLine: FC<{ check: DataValidationCheck }> = ({ check }) => (
  <div className="flex items-start gap-2 py-1.5">
    {check.ok ? (
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
    ) : (
      <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
    )}
    <div className="min-w-0">
      <p className={cn("text-sm font-medium", !check.ok && "text-destructive")}>
        {check.name}
      </p>
      <p className="text-xs break-words text-muted-foreground">
        {check.message}
      </p>
    </div>
  </div>
)

/** Jeden běh validace — detail kontrol se rozbalí, chyby jsou vždy nahoře. */
const RunRow: FC<{ run: DataValidationRun; defaultOpen?: boolean }> = ({
  run,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const failedChecks = run.checks.filter((check) => !check.ok)
  const passedChecks = run.checks.filter((check) => check.ok)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 text-left hover:bg-muted/40"
      >
        <StatusBadge status={run.status} />
        <span className="font-mono text-sm">{run.checkedAt}</span>
        <span className="text-sm text-muted-foreground">
          {run.failed > 0
            ? `${run.failed} z ${run.total} kontrol selhalo`
            : `${run.total} kontrol v pořádku`}
        </span>
        <EmailState run={run} />
        <span className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
          {run.durationMs !== null && <span>{run.durationMs} ms</span>}
          <span className="uppercase">{run.source}</span>
          <ChevronDown
            className={cn(
              "size-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </span>
      </button>

      {isOpen && (
        <div className="space-y-3 px-4 pb-4">
          {failedChecks.length > 0 && (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-1">
              {failedChecks.map((check) => (
                <CheckLine key={check.name} check={check} />
              ))}
            </div>
          )}
          {passedChecks.length > 0 && (
            <div className="grid gap-x-6 px-3 md:grid-cols-2">
              {passedChecks.map((check) => (
                <CheckLine key={check.name} check={check} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Matice kontrol × běhů: řádek = jedna kontrola, sloupec = jeden den.
 * Na první pohled je vidět, jestli jde o jednorázový výpadek, nebo o
 * kontrolu, která padá opakovaně.
 */
const CheckMatrix: FC<{ data: DataValidationResponse }> = ({ data }) => {
  // Nejstarší vlevo, nejnovější vpravo — čte se jako časová osa.
  const runs = useMemo(
    () => data.runs.slice(0, MATRIX_MAX_RUNS).reverse(),
    [data.runs]
  )

  const lookup = useMemo(() => {
    const map = new Map<string, DataValidationCheck>()
    for (const run of runs) {
      for (const check of run.checks) {
        map.set(`${run.id}|${check.name}`, check)
      }
    }
    return map
  }, [runs])

  if (runs.length === 0) return null

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-max min-w-full border-collapse text-xs">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-card px-3 py-2 text-left font-medium text-muted-foreground">
              Kontrola
            </th>
            {runs.map((run) => (
              <th
                key={run.id}
                className="px-0.5 py-2 text-center font-normal text-muted-foreground"
              >
                <span className="inline-block w-7 rotate-180 [writing-mode:vertical-rl]">
                  {formatShortDate(run.checkedAt)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.checkNames.map((name) => (
            <tr key={name} className="border-t border-border/60">
              <td className="sticky left-0 z-10 max-w-[22rem] truncate bg-card px-3 py-1.5 font-mono">
                {name}
              </td>
              {runs.map((run) => {
                const check = lookup.get(`${run.id}|${name}`)
                const cell = (
                  <div
                    className={cn(
                      "mx-auto size-5 rounded-sm",
                      !check && "bg-muted",
                      check?.ok && "bg-emerald-500/70 dark:bg-emerald-400/60",
                      check && !check.ok && "bg-destructive"
                    )}
                  />
                )
                return (
                  <td key={run.id} className="px-0.5 py-1">
                    {check ? (
                      <Tooltip
                        content={`${formatDateTime(run.checkedAt)} — ${check.message}`}
                      >
                        {cell}
                      </Tooltip>
                    ) : (
                      cell
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const ServerDataValidation: FC = () => {
  const [days, setDays] = useState(30)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  const { data, isPending, isError, isFetching, refetch } =
    useQuery<DataValidationResponse>({
      queryKey: [...QUERY_KEY, { days }],
      // Filtr stavu se dělá až tady, aby matice a souhrn ukazovaly celé okno.
      queryFn: () => getDataValidation({ days, status: "all" }),
      staleTime: 0,
    })

  const visibleRuns = useMemo(
    () =>
      (data?.runs ?? []).filter(
        (run) => statusFilter === "all" || run.status === statusFilter
      ),
    [data?.runs, statusFilter]
  )

  const failingChecks = useMemo(
    () =>
      (data?.checkStats ?? [])
        .filter((stat) => stat.failed > 0)
        .sort((a, b) => b.failed - a.failed),
    [data?.checkStats]
  )

  const latest = data?.latest ?? null
  const summary = data?.summary
  const successRate =
    summary && summary.runs > 0
      ? Math.round((summary.ok / summary.runs) * 100)
      : null

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Kontrola dat</h1>
          <p className="text-sm text-muted-foreground">
            Historie denní validace dat z migrace (server/validate_data.php)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={String(days)}
            onValueChange={(value) => setDays(Number(value))}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DAY_OPTIONS.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  Posledních {option} dní
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            disabled={isFetching}
          >
            <RefreshCw className={cn("size-4", isFetching && "animate-spin")} />
            Obnovit
          </Button>
        </div>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Historii kontrol se nepodařilo načíst.
        </p>
      )}

      {data && !data.tableExists && (
        <div className="flex gap-3 rounded-lg border border-amber-500/40 bg-amber-500/5 p-4 text-sm">
          <Database className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="font-medium">Tabulky pro historii zatím neexistují</p>
            <p className="text-muted-foreground">
              Spusť migraci{" "}
              <code className="font-mono text-xs">
                docs/migrations/2026-11-26_data_validation_history.sql
              </code>
              . Do té doby validace běží a posílá e-maily, jen se nikam
              neukládá.
            </p>
          </div>
        </div>
      )}

      {data?.tableExists && data.stale && (
        <div className="flex gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
          <div>
            <p className="font-medium text-destructive">
              Validace neběžela víc než {data.staleAfterHours} h
            </p>
            <p className="text-muted-foreground">
              {latest
                ? `Poslední běh ${latest.checkedAt}. Zkontroluj cron, který volá validate_data.php.`
                : "Zatím se neuložil žádný běh. Zkontroluj, že cron volá validate_data.php (bez dry_run)."}
            </p>
          </div>
        </div>
      )}

      {/* Souhrn */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">Poslední kontrola</p>
            <Clock className="size-4 text-muted-foreground" />
          </div>
          {isPending ? (
            <Skeleton className="mt-2 h-7 w-24" />
          ) : latest ? (
            <>
              <div className="mt-1 flex items-center gap-2">
                <StatusBadge status={latest.status} />
                <span className="text-lg font-semibold">
                  {formatAge(data?.latestAgeHours ?? null)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {latest.checkedAt}
              </p>
            </>
          ) : (
            <p className="mt-1 text-2xl font-semibold">—</p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">Úspěšnost</p>
            <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          {isPending ? (
            <Skeleton className="mt-2 h-7 w-16" />
          ) : (
            <>
              <p className="mt-1 text-2xl font-semibold">
                {successRate === null ? "—" : `${successRate} %`}
              </p>
              <p className="text-xs text-muted-foreground">
                {summary?.ok ?? 0} z {summary?.runs ?? 0} běhů za {days} dní
              </p>
            </>
          )}
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">Běhy s chybou</p>
            <XCircle className="size-4 text-destructive" />
          </div>
          {isPending ? (
            <Skeleton className="mt-2 h-7 w-16" />
          ) : (
            <p className="mt-1 text-2xl font-semibold">{summary?.error ?? 0}</p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">Odeslané alerty</p>
            <Mail className="size-4 text-muted-foreground" />
          </div>
          {isPending ? (
            <Skeleton className="mt-2 h-7 w-16" />
          ) : (
            <>
              <p className="mt-1 text-2xl font-semibold">
                {summary?.emailsSent ?? 0}
              </p>
              {(summary?.emailsFailed ?? 0) > 0 && (
                <p className="text-xs text-destructive">
                  {summary?.emailsFailed} se nepodařilo odeslat
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Matice kontrol v čase */}
      {data && data.runs.length > 0 && (
        <section className="space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-semibold">Kontroly v čase</h2>
            <p className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="size-3 rounded-sm bg-emerald-500/70 dark:bg-emerald-400/60" />
                OK
              </span>
              <span className="flex items-center gap-1">
                <span className="size-3 rounded-sm bg-destructive" />
                Selhalo
              </span>
              <span className="flex items-center gap-1">
                <span className="size-3 rounded-sm bg-muted" />
                Nekontrolováno
              </span>
            </p>
          </div>
          <CheckMatrix data={data} />
        </section>
      )}

      {/* Nejčastěji selhávající kontroly */}
      {failingChecks.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Nejčastější problémy</h2>
          <div className="rounded-lg border border-border bg-card">
            {failingChecks.map((stat) => (
              <div
                key={stat.name}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-border px-4 py-2.5 last:border-b-0"
              >
                <Badge variant="ghost" className="h-5 bg-muted">
                  {TYPE_LABELS[stat.type] ?? stat.type}
                </Badge>
                <span className="font-mono text-sm">{stat.name}</span>
                <span className="ml-auto text-sm">
                  <span className="font-semibold text-destructive">
                    {stat.failed}×
                  </span>
                  <span className="text-muted-foreground"> z {stat.runs}</span>
                </span>
                {stat.lastFailedAt && (
                  <span className="text-xs text-muted-foreground">
                    naposledy {formatDateTime(stat.lastFailedAt)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Seznam běhů */}
      <section className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Běhy</h2>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as StatusFilter)}
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border border-border bg-card">
          {isPending ? (
            <div className="space-y-3 p-4">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          ) : visibleRuns.length === 0 ? (
            <p className="px-4 py-12 text-center text-sm text-muted-foreground">
              {data?.runs.length
                ? "Žádný běh neodpovídá filtru."
                : `Za posledních ${days} dní není uložený žádný běh.`}
            </p>
          ) : (
            visibleRuns.map((run, index) => (
              <RunRow
                key={run.id}
                run={run}
                // Nejnovější chybný běh rovnou rozbalený — to je to, co admin hledá.
                defaultOpen={index === 0 && run.status === "error"}
              />
            ))
          )}
        </div>
      </section>
    </div>
  )
}
