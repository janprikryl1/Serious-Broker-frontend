import type { FC, ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"
import {
  AlertTriangle,
  Check,
  Database,
  HardDrive,
  RefreshCw,
  ScrollText,
  Server,
  X,
} from "lucide-react"
import { getServerInfo } from "@/utils/api/serverService.ts"
import type { CheckStatus, ServerInfoResponse } from "@/utils/types/server.ts"
import { routes } from "@/utils/constants/routes.ts"
import { Button } from "@/components/ui/button.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import { cn } from "@/lib/utils.ts"

/** Dvojice popisek/hodnota — základní stavební prvek celé stránky. */
const InfoRow: FC<{ label: string; children: ReactNode; mono?: boolean }> = ({
  label,
  children,
  mono,
}) => (
  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 py-2 last:border-b-0">
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd
      className={cn(
        "max-w-full text-sm font-medium break-all",
        mono && "font-mono text-xs"
      )}
    >
      {children}
    </dd>
  </div>
)

const StatusIcon: FC<{ status: CheckStatus }> = ({ status }) => {
  if (status === "ok") {
    return <Check className="size-4 text-emerald-600 dark:text-emerald-400" />
  }
  if (status === "warn") {
    return (
      <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
    )
  }
  return <span className="text-muted-foreground">—</span>
}

/** Sekundy na čitelnou dobu běhu (uptime MySQL). */
const formatUptime = (seconds?: number | null): string => {
  if (seconds === null || seconds === undefined) {
    return "—"
  }

  const days = Math.floor(seconds / 86_400)
  const hours = Math.floor((seconds % 86_400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (days > 0) {
    return `${days} d ${hours} h`
  }
  if (hours > 0) {
    return `${hours} h ${minutes} min`
  }
  return `${minutes} min`
}

const StatTile: FC<{
  label: string
  value: ReactNode
  footer?: ReactNode
  icon: typeof Server
  tone?: string
}> = ({ label, value, footer, icon: Icon, tone }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <div className="flex items-center justify-between gap-2">
      <p className="text-sm text-muted-foreground">{label}</p>
      <Icon className={cn("size-4 shrink-0 text-muted-foreground", tone)} />
    </div>
    <p className="mt-1 truncate text-2xl font-semibold">{value}</p>
    {footer && (
      <p className="mt-0.5 truncate text-xs text-muted-foreground">{footer}</p>
    )}
  </div>
)

const SectionSkeleton: FC = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-5 w-40" />
    </CardHeader>
    <CardContent className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </CardContent>
  </Card>
)

export const ServerInfo: FC = () => {
  const { data, isPending, isError, isFetching, refetch } =
    useQuery<ServerInfoResponse>({
      queryKey: ["admin", "server", "info"],
      queryFn: getServerInfo,
    })

  const warnings =
    (data?.ini.filter((entry) => entry.status === "warn").length ?? 0) +
    (data?.extensions.filter((entry) => entry.required && !entry.loaded)
      .length ?? 0) +
    (data?.paths.filter((entry) => entry.status === "warn").length ?? 0)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Info o serveru</h1>
          <p className="text-sm text-muted-foreground">
            Verze PHP, konfigurace, rozšíření, databáze a stav souborového
            systému
          </p>
        </div>

        <div className="flex items-center gap-2">
          {data && (
            <span className="text-xs text-muted-foreground">
              Zjištěno {data.generatedAt}
            </span>
          )}
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
          Informace o serveru se nepodařilo načíst.
        </p>
      )}

      {/* Rychlý přehled */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isPending || !data ? (
          Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <Skeleton key={i} className="h-[6.5rem] rounded-lg" />
          ))
        ) : (
          <>
            <StatTile
              label="PHP"
              value={data.php.version}
              footer={`${data.php.sapi} · ${data.php.architecture}bit`}
              icon={Server}
            />
            <StatTile
              label="Databáze"
              value={data.database.version ?? "—"}
              footer={`${data.database.tables ?? 0} tabulek · ${
                data.database.size ?? "—"
              }`}
              icon={Database}
            />
            <StatTile
              label="Volné místo na disku"
              value={data.disk.free ?? "—"}
              footer={
                data.disk.usedPercent !== null
                  ? `využito ${data.disk.usedPercent} % z ${data.disk.total}`
                  : "údaj není dostupný"
              }
              icon={HardDrive}
            />
            <StatTile
              label="Nálezy v konfiguraci"
              value={warnings}
              footer={
                warnings === 0
                  ? "vše odpovídá doporučení"
                  : "viz zvýrazněné řádky níže"
              }
              icon={AlertTriangle}
              tone={
                warnings > 0 ? "text-amber-600 dark:text-amber-400" : undefined
              }
            />
          </>
        )}
      </div>

      {/* Stav error logu s odkazem na prohlížeč logu */}
      {data && (
        <Card>
          <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-base">
                <ScrollText className="size-4 text-muted-foreground" />
                Error log
              </CardTitle>
              <CardDescription className="font-mono text-xs break-all">
                {data.errorLog.path}
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to={`/${routes.serverLog}`}>Otevřít log</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {!data.errorLog.exists ? (
              <p className="text-sm text-muted-foreground">
                Soubor zatím nevznikl — na serveru nedošlo k žádné chybě.
              </p>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="ghost"
                    className="bg-destructive/10 text-destructive"
                  >
                    {data.errorLog.counts.fatal} fatal
                  </Badge>
                  <Badge
                    variant="ghost"
                    className="bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400"
                  >
                    {data.errorLog.counts.warning} warning
                  </Badge>
                  <Badge variant="ghost" className="bg-muted">
                    {data.errorLog.counts.notice +
                      data.errorLog.counts.deprecated}{" "}
                    notice / deprecated
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {data.errorLog.size} · poslední zápis{" "}
                    {data.errorLog.modified}
                  </span>
                </div>

                {data.errorLog.lastEntry && (
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {data.errorLog.lastEntry.type}:
                    </span>{" "}
                    {data.errorLog.lastEntry.message}
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* PHP runtime */}
        {isPending || !data ? (
          <SectionSkeleton />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">PHP</CardTitle>
            </CardHeader>
            <CardContent>
              <dl>
                <InfoRow label="Verze">{data.php.version}</InfoRow>
                <InfoRow label="SAPI (režim běhu)">{data.php.sapi}</InfoRow>
                <InfoRow label="Zend Engine">{data.php.zendVersion}</InfoRow>
                <InfoRow label="Architektura">
                  {data.php.architecture} bit
                </InfoRow>
                <InfoRow label="Operační systém" mono>
                  {data.php.os}
                </InfoRow>
                <InfoRow label="Uživatel procesu">
                  {data.php.processUser ?? "—"}
                </InfoRow>
                <InfoRow label="Načtený php.ini" mono>
                  {data.php.iniFile ?? "—"}
                </InfoRow>
                {data.php.scannedIniFiles && (
                  <InfoRow label="Další .ini soubory" mono>
                    {data.php.scannedIniFiles}
                  </InfoRow>
                )}
                <InfoRow label="Počet rozšíření">
                  {data.php.extensionCount}
                </InfoRow>
                <InfoRow label="OPcache">
                  {data.php.opcache
                    ? data.php.opcache.enabled
                      ? `zapnutá · ${data.php.opcache.cachedScripts} skriptů${
                          data.php.opcache.hitRate !== null
                            ? ` · ${data.php.opcache.hitRate} % hit rate`
                            : ""
                        }`
                      : "vypnutá"
                    : "není dostupná"}
                </InfoRow>
              </dl>
            </CardContent>
          </Card>
        )}

        {/* Webserver */}
        {isPending || !data ? (
          <SectionSkeleton />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Webový server</CardTitle>
            </CardHeader>
            <CardContent>
              <dl>
                <InfoRow label="Software">
                  {data.server.software ?? "—"}
                </InfoRow>
                <InfoRow label="Protokol">
                  {data.server.protocol ?? "—"}
                </InfoRow>
                <InfoRow label="Hostname">
                  {data.server.hostname ?? "—"}
                </InfoRow>
                <InfoRow label="HTTPS">
                  {data.server.https ? "ano" : "ne"}
                </InfoRow>
                <InfoRow label="IP a port serveru">
                  {data.server.serverAddress ?? "—"}
                  {data.server.serverPort ? `:${data.server.serverPort}` : ""}
                </InfoRow>
                <InfoRow label="Document root" mono>
                  {data.server.documentRoot ?? "—"}
                </InfoRow>
                <InfoRow label="Kořen API (absolutní cesta)" mono>
                  {data.server.apiRoot}
                </InfoRow>
                <InfoRow label="Čas serveru">{data.server.serverTime}</InfoRow>
                <InfoRow label="Časová zóna">{data.server.timezone}</InfoRow>
                <InfoRow label="Zatížení (1/5/15 min)">
                  {data.server.loadAverage
                    ? data.server.loadAverage.join(" / ")
                    : "—"}
                </InfoRow>
              </dl>
            </CardContent>
          </Card>
        )}

        {/* Databáze */}
        {isPending || !data ? (
          <SectionSkeleton />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Databáze</CardTitle>
            </CardHeader>
            <CardContent>
              <dl>
                <InfoRow label="Verze serveru">
                  {data.database.version ?? "—"}
                </InfoRow>
                <InfoRow label="Připojení" mono>
                  {data.database.host}
                </InfoRow>
                <InfoRow label="Databáze / uživatel" mono>
                  {data.database.name} / {data.database.user}
                </InfoRow>
                <InfoRow label="Odezva dotazu">
                  {data.database.latencyMs !== undefined
                    ? `${data.database.latencyMs} ms`
                    : "—"}
                </InfoRow>
                <InfoRow label="Čas databáze">
                  {data.database.serverTime ?? "—"}
                </InfoRow>
                <InfoRow label="Velikost dat">
                  {data.database.size ?? "—"}
                </InfoRow>
                <InfoRow label="Počet tabulek">
                  {data.database.tables ?? "—"}
                </InfoRow>
                <InfoRow label="Spojení">
                  {data.database.threadsConnected ?? "—"}
                  {data.database.maxConnections
                    ? ` / ${data.database.maxConnections}`
                    : ""}
                </InfoRow>
                <InfoRow label="Uptime">
                  {formatUptime(data.database.uptimeSeconds)}
                </InfoRow>
                <InfoRow label="Poslední záznam v tableLog">
                  {data.dataFreshness.lastTableLog
                    ? `${data.dataFreshness.lastTableLog} (${
                        data.dataFreshness.lastTableLogTable ?? "?"
                      })`
                    : "—"}
                </InfoRow>
                {data.database.error && (
                  <InfoRow label="Chyba diagnostiky">
                    <span className="text-destructive">
                      {data.database.error}
                    </span>
                  </InfoRow>
                )}
              </dl>
            </CardContent>
          </Card>
        )}

        {/* Disk */}
        {isPending || !data ? (
          <SectionSkeleton />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Disk</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <dl>
                <InfoRow label="Celková kapacita">
                  {data.disk.total ?? "—"}
                </InfoRow>
                <InfoRow label="Využito">{data.disk.used ?? "—"}</InfoRow>
                <InfoRow label="Volné místo">
                  {data.disk.free ?? "—"}
                </InfoRow>
              </dl>

              {data.disk.usedPercent !== null && (
                <div className="space-y-1">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        data.disk.usedPercent > 90
                          ? "bg-destructive"
                          : data.disk.usedPercent > 75
                            ? "bg-amber-500"
                            : "bg-primary"
                      )}
                      style={{ width: `${data.disk.usedPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Využito {data.disk.usedPercent} %
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Konfigurace PHP */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Konfigurace PHP</CardTitle>
          <CardDescription>
            Hodnoty z php.ini, které ovlivňují chování API. Sloupec
            &bdquo;doporučeno&ldquo; je minimum, které projekt potřebuje.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Direktiva</TableHead>
                <TableHead>Hodnota</TableHead>
                <TableHead className="w-40">Doporučeno</TableHead>
                <TableHead className="w-16 text-right">Stav</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending || !data
                ? Array.from({ length: 8 }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                    <TableRow key={i}>
                      <TableCell colSpan={4}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                : data.ini.map((entry) => (
                    <TableRow
                      key={entry.key}
                      className={cn(
                        entry.status === "warn" && "bg-amber-500/5"
                      )}
                    >
                      <TableCell>
                        <span className="font-medium">{entry.label}</span>
                        <span className="block font-mono text-xs text-muted-foreground">
                          {entry.key}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs break-all">
                        {entry.value ?? "—"}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {entry.recommended ?? "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex justify-end">
                          <StatusIcon status={entry.status} />
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Rozšíření */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rozšíření PHP</CardTitle>
          <CardDescription>
            Povinná rozšíření jsou nutná pro běh API, ostatní jsou volitelná.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isPending || !data ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            [true, false].map((isRequired) => (
              <div key={String(isRequired)} className="space-y-2">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {isRequired ? "Povinná" : "Volitelná"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.extensions
                    .filter((entry) => entry.required === isRequired)
                    .map((entry) => (
                      <Badge
                        key={entry.name}
                        variant="ghost"
                        className={cn(
                          "h-6 gap-1.5",
                          entry.loaded
                            ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400"
                            : isRequired
                              ? "bg-destructive/10 text-destructive"
                              : "bg-muted text-muted-foreground"
                        )}
                        title={entry.version ? `verze ${entry.version}` : undefined}
                      >
                        {entry.loaded ? (
                          <Check className="size-3" />
                        ) : (
                          <X className="size-3" />
                        )}
                        {entry.name}
                      </Badge>
                    ))}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Cesty a oprávnění */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cesty a oprávnění</CardTitle>
          <CardDescription>
            Složky, do kterých API zapisuje. Když upload nebo generování
            obrázků neprojde, problém je typicky tady.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Složka</TableHead>
                <TableHead>Cesta</TableHead>
                <TableHead className="w-28">Existuje</TableHead>
                <TableHead className="w-28">Zápis</TableHead>
                <TableHead className="w-16 text-right">Stav</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending || !data
                ? Array.from({ length: 6 }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                    <TableRow key={i}>
                      <TableCell colSpan={5}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                : data.paths.map((entry) => (
                    <TableRow
                      key={entry.path}
                      className={cn(
                        entry.status === "warn" && "bg-amber-500/5"
                      )}
                    >
                      <TableCell className="font-medium">
                        {entry.label}
                        {entry.size && (
                          <span className="block text-xs text-muted-foreground">
                            {entry.size}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs break-all">
                        {entry.path}
                      </TableCell>
                      <TableCell className="text-sm">
                        {entry.exists ? "ano" : "ne"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {entry.writable
                          ? "ano"
                          : entry.expectWritable
                            ? "ne"
                            : "ne (správně)"}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex justify-end">
                          <StatusIcon status={entry.status} />
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
