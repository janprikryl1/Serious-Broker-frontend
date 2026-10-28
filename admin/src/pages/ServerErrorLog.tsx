import { useMemo, useState, type FC } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  AlertTriangle,
  ChevronDown,
  Download,
  FileWarning,
  Info,
  RefreshCw,
  Search,
  ShieldAlert,
  Trash2,
} from "lucide-react"
import { clearErrorLog, getErrorLog } from "@/utils/api/serverService.ts"
import type {
  ErrorLogEntry,
  ErrorLogResponse,
  LogLevel,
} from "@/utils/types/server.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Switch } from "@/components/ui/switch.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx"
import { cn } from "@/lib/utils.ts"

const LEVEL_OPTIONS: { value: LogLevel | "all"; label: string }[] = [
  { value: "all", label: "Všechny úrovně" },
  { value: "fatal", label: "Fatální chyby" },
  { value: "warning", label: "Warningy" },
  { value: "notice", label: "Notice" },
  { value: "deprecated", label: "Deprecated" },
  { value: "info", label: "Ostatní" },
]

const LIMIT_OPTIONS = [50, 100, 200, 500, 1000]

/** Vzhled badge podle severity — fatální chyby musí jít poznat na první pohled. */
const LEVEL_STYLES: Record<
  LogLevel,
  { label: string; className: string; dot: string }
> = {
  fatal: {
    label: "Fatal",
    className: "bg-destructive/10 text-destructive",
    dot: "bg-destructive",
  },
  warning: {
    label: "Warning",
    className:
      "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  deprecated: {
    label: "Deprecated",
    className:
      "bg-violet-500/10 text-violet-700 dark:bg-violet-400/10 dark:text-violet-400",
    dot: "bg-violet-500",
  },
  notice: {
    label: "Notice",
    className:
      "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-400",
    dot: "bg-sky-500",
  },
  info: {
    label: "Info",
    className: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
}

const LOG_QUERY_KEY = ["admin", "server", "errorLog"]

/** Jeden řádek logu — stack trace je schovaný, dokud ho admin nerozklikne. */
const LogRow: FC<{ entry: ErrorLogEntry }> = ({ entry }) => {
  const [isOpen, setIsOpen] = useState(false)
  const style = LEVEL_STYLES[entry.level]
  const hasTrace = entry.trace.length > 0

  return (
    <div className="border-b border-border last:border-b-0">
      <div className="flex items-start gap-3 px-4 py-3">
        <span
          className={cn("mt-1.5 size-2 shrink-0 rounded-full", style.dot)}
          aria-hidden
        />
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="ghost" className={cn("h-5", style.className)}>
              {entry.type || style.label}
            </Badge>
            {entry.time && (
              <span className="font-mono text-xs text-muted-foreground">
                {entry.time}
              </span>
            )}
          </div>

          <p className="text-sm break-words whitespace-pre-wrap">
            {entry.message}
          </p>

          {entry.file && (
            <p className="font-mono text-xs text-muted-foreground break-all">
              {entry.file}
              {entry.line !== null && `:${entry.line}`}
            </p>
          )}

          {hasTrace && (
            <>
              <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
                {isOpen ? "Skrýt detail" : `Detail (${entry.trace.length} ř.)`}
              </button>

              {isOpen && (
                <pre className="mt-1 max-h-80 overflow-auto rounded-md bg-muted/60 p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                  {entry.trace.join("\n")}
                </pre>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export const ServerErrorLog: FC = () => {
  const queryClient = useQueryClient()

  const [level, setLevel] = useState<LogLevel | "all">("all")
  const [limit, setLimit] = useState(200)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [isClearOpen, setIsClearOpen] = useState(false)

  const { data, isPending, isError, isFetching, refetch } =
    useQuery<ErrorLogResponse>({
      queryKey: [...LOG_QUERY_KEY, { level, limit, search }],
      queryFn: () => getErrorLog({ level, limit, search, order: "desc" }),
      // Log se mění každou chvíli, cache z App.tsx (1 min) by tu mátla.
      staleTime: 0,
      refetchInterval: autoRefresh ? 15_000 : false,
    })

  const clearMutation = useMutation({
    mutationFn: clearErrorLog,
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: LOG_QUERY_KEY })
      void queryClient.invalidateQueries({
        queryKey: ["admin", "server", "info"],
      })
      toast.success(res.message || "Error log byl vyprázdněn")
      setIsClearOpen(false)
    },
    onError: () => toast.error("Log se nepodařilo vyprázdnit"),
  })

  const entries = data?.entries ?? []
  const counts = data?.counts

  /** Export do .txt — stejný obsah, jaký by admin našel na FTP. */
  const handleDownload = () => {
    if (entries.length === 0) {
      toast.info("Není co exportovat")
      return
    }

    const text = entries
      .map((entry) =>
        [
          `[${entry.time ?? "?"}] ${entry.type}: ${entry.message}`,
          ...entry.trace,
        ].join("\n")
      )
      .join("\n\n")

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `error-log-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  }

  const summaryCards = useMemo(
    () =>
      [
        {
          label: "Fatální chyby",
          value: counts?.fatal ?? 0,
          icon: ShieldAlert,
          tone: "text-destructive",
        },
        {
          label: "Warningy",
          value: counts?.warning ?? 0,
          icon: AlertTriangle,
          tone: "text-amber-600 dark:text-amber-400",
        },
        {
          label: "Notice / Deprecated",
          value: (counts?.notice ?? 0) + (counts?.deprecated ?? 0),
          icon: Info,
          tone: "text-sky-600 dark:text-sky-400",
        },
        {
          label: "Velikost logu",
          value: data?.size ?? "—",
          icon: FileWarning,
          tone: "text-muted-foreground",
        },
      ] as const,
    [counts, data?.size]
  )

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Error log</h1>
          <p className="text-sm text-muted-foreground">
            PHP chyby zapsané na serveru — bez potřeby FTP přístupu
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 pr-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <Label
              htmlFor="auto-refresh"
              className="text-xs text-muted-foreground"
            >
              Auto-obnova (15 s)
            </Label>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            disabled={isFetching}
          >
            <RefreshCw className={cn("size-4", isFetching && "animate-spin")} />
            Obnovit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={entries.length === 0}
          >
            <Download className="size-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => setIsClearOpen(true)}
            disabled={!data?.exists || data.sizeBytes === 0}
          >
            <Trash2 className="size-4" />
            Vyprázdnit
          </Button>
        </div>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Error log se nepodařilo načíst.
        </p>
      )}

      {/* Souhrn podle severity za načtené okno logu */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <card.icon className={cn("size-4 shrink-0", card.tone)} />
            </div>
            {isPending ? (
              <Skeleton className="mt-2 h-7 w-16" />
            ) : (
              <p className="mt-1 truncate text-2xl font-semibold">
                {card.value}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Metadata souboru — admin potřebuje vědět, odkud se čte */}
      {data && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
          <span className="font-mono break-all">{data.path}</span>
          {data.modified && <span>Poslední zápis: {data.modified}</span>}
          <span>
            Načteno {data.matched} z {data.totalInWindow} záznamů
          </span>
          {!data.writable && (
            <span className="text-amber-600 dark:text-amber-400">
              Soubor není zapisovatelný
            </span>
          )}
          {data.truncated && (
            <span className="text-amber-600 dark:text-amber-400">
              Log je větší než načtené okno (2 MB) — starší záznamy nejsou
              vidět
            </span>
          )}
        </div>
      )}

      {/* Filtry */}
      <div className="flex flex-wrap items-center gap-3">
        <form
          className="relative min-w-[16rem] flex-1"
          onSubmit={(event) => {
            event.preventDefault()
            setSearch(searchInput.trim())
          }}
        >
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            onBlur={() => setSearch(searchInput.trim())}
            placeholder="Hledat ve zprávě, souboru nebo stack trace…"
            className="pl-9"
          />
        </form>

        <Select
          value={level}
          onValueChange={(value) => setLevel(value as LogLevel | "all")}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LEVEL_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={String(limit)}
          onValueChange={(value) => setLimit(Number(value))}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LIMIT_OPTIONS.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option} záznamů
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Výpis záznamů */}
      <div className="rounded-lg border border-border bg-card">
        {isPending ? (
          <div className="space-y-4 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : !data?.exists ? (
          <p className="px-4 py-12 text-center text-sm text-muted-foreground">
            Log soubor zatím nevznikl — na serveru nedošlo k žádné chybě.
          </p>
        ) : entries.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-muted-foreground">
            {search || level !== "all"
              ? "Žádný záznam neodpovídá filtru."
              : "Log je prázdný."}
          </p>
        ) : (
          entries.map((entry) => (
            <LogRow key={`${entry.id}-${entry.time}`} entry={entry} />
          ))
        )}
      </div>

      <AlertDialog open={isClearOpen} onOpenChange={setIsClearOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Vyprázdnit error log?</AlertDialogTitle>
            <AlertDialogDescription>
              Obsah souboru {data?.path} bude trvale smazán. Tuto akci nelze
              vrátit zpět — pokud chceš záznamy zachovat, nejdřív je exportuj.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušit</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => clearMutation.mutate()}
            >
              Vyprázdnit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
