import { useState, type FC } from "react"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getAllLogs } from "@/utils/api/tableLogService.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"
import { Button } from "@/components/ui/button.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"

export const TableLog: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isPending, isError } = useQuery({
    queryKey: ["admin", "logs", currentPage],
    queryFn: () => getAllLogs(currentPage),
  })

  const logs = data?.data || []
  const totalPages = data?.totalPages || 1

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Protokol migrace tabulek</h1>
        <p className="text-sm text-muted-foreground">
          Historie a logy změn generovaných databázových tabulek
        </p>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Záznamy protokolu se nepodařilo načíst.
        </p>
      )}

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Tabulka</TableHead>
              <TableHead>Akce</TableHead>
              <TableHead className="w-56">Čas provedení</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              Array.from({ length: 10 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-36" />
                  </TableCell>
                </TableRow>
              ))
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-muted-foreground"
                >
                  Žádné záznamy v protokolu.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">{log.id}</TableCell>
                  <TableCell className="font-mono text-xs font-medium">
                    {log.tableName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {log.action}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {toCzechDateFormat(log.created)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Stránka {currentPage} z {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1 || isPending}
          >
            <ChevronLeft className="size-4" />
            Předchozí
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages || isPending}
          >
            Další
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
