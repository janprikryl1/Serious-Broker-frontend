import type { FC } from "react"
import { useQuery } from "@tanstack/react-query"
import { HardDrive, RefreshCw } from "lucide-react"
import {
  getStorageUsage,
  STORAGE_QUERY_KEY,
} from "@/utils/api/cachedDataService.ts"
import { formatBytes } from "@/utils/functions/formatBytes.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"
import type { StorageEntry } from "@/utils/types/cachedData.ts"
import { Button } from "@/components/ui/button.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"

/**
 * Kolik místa na serveru zabírají logy, cache, datové snímky a nahraná média.
 *
 * Velikost složky je součet všech souborů v ní (včetně podsložek), takže
 * čísla odpovídají tomu, co by nahlásil FTP klient. Projití cache je to
 * nejdražší z celé diagnostiky, proto se data drží minutu v cache dotazu
 * a přepočítávají se jen na vyžádání.
 */
export const StorageUsage: FC = () => {
  const { data, isPending, isError, isFetching, refetch } = useQuery({
    queryKey: STORAGE_QUERY_KEY,
    queryFn: getStorageUsage,
    staleTime: 60_000,
  })

  // Prázdné a neexistující složky dolů, ať je největší žrout místa nahoře.
  const entries: StorageEntry[] = [...(data?.entries ?? [])].sort(
    (a, b) => b.sizeBytes - a.sizeBytes
  )

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <HardDrive className="size-4.5" />
            Obsazené místo na serveru
          </h2>
          <p className="text-sm text-muted-foreground">
            Součet všech souborů ve složkách logů, cache, dat a médií
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={isFetching ? "size-4 animate-spin" : "size-4"} />
          Přepočítat
        </Button>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Obsazenost disku se nepodařilo zjistit.
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {isPending
          ? Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <div key={i} className="rounded-lg border border-border bg-card p-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="mt-2 h-6 w-20" />
                <Skeleton className="mt-2 h-3 w-24" />
              </div>
            ))
          : data?.groups.map((group) => (
              <div
                key={group.key}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {group.label}
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {formatBytes(group.sizeBytes)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {group.fileCount.toLocaleString("cs-CZ")} souborů ·{" "}
                  {group.share}&nbsp;% celku
                </p>
              </div>
            ))}
      </div>

      {data && (
        <p className="text-sm text-muted-foreground">
          Celkem{" "}
          <span className="font-semibold text-foreground">
            {formatBytes(data.totalBytes)}
          </span>{" "}
          v {data.totalFiles.toLocaleString("cs-CZ")} souborech
          {data.disk.free && <> · volné místo na disku {data.disk.free}</>} ·
          spočteno {toCzechDateFormat(data.generatedAt)}
        </p>
      )}

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Umístění</TableHead>
              <TableHead className="w-28">Skupina</TableHead>
              <TableHead className="w-28 text-right">Souborů</TableHead>
              <TableHead className="w-28 text-right">Velikost</TableHead>
              <TableHead className="w-44">Poslední změna</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-56" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-4 w-10" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-4 w-14" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                </TableRow>
              ))
            ) : entries.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  Žádná sledovaná složka.
                </TableCell>
              </TableRow>
            ) : (
              entries.map((entry) => (
                <TableRow key={entry.key}>
                  <TableCell>
                    <p className="text-sm font-medium">{entry.label}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {entry.path}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{entry.groupLabel}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {entry.exists ? (
                      entry.fileCount.toLocaleString("cs-CZ")
                    ) : (
                      <span className="text-muted-foreground italic">
                        neexistuje
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {entry.exists ? formatBytes(entry.sizeBytes) : "–"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {entry.modified ? toCzechDateFormat(entry.modified) : "–"}
                    {!entry.complete && entry.exists && (
                      <span
                        className="ml-1 text-destructive"
                        title="Složku se nepodařilo projít celou (oprávnění nebo soubor zmizel během výpočtu)"
                      >
                        *
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
