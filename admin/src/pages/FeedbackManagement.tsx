import { useState, type FC } from "react"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown, ChevronLeft, ChevronRight, Mail } from "lucide-react"
import { getAllFeedbacks } from "@/utils/api/feedbackService.ts"
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
import { cn } from "@/lib/utils.ts"

const PAGE_SIZE = 10

export const FeedbackManagement: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({})

  const { data, isPending, isError } = useQuery({
    queryKey: ["admin", "feedbacks", currentPage],
    queryFn: () => getAllFeedbacks(currentPage, PAGE_SIZE),
  })

  const feedbacks = data?.data || []
  const totalPages = data?.totalPages || 1

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Zpětná vazba od uživatelů</h1>
        <p className="text-sm text-muted-foreground">
          Zprávy, připomínky a hodnocení zaslané z kontaktního formuláře
        </p>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Zpětnou vazbu se nepodařilo načíst.
        </p>
      )}

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-48">Jméno</TableHead>
              <TableHead className="w-56">Email</TableHead>
              <TableHead>Zpráva</TableHead>
              <TableHead className="w-44">Odesláno</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                </TableRow>
              ))
            ) : feedbacks.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  Žádná zpětná vazba.
                </TableCell>
              </TableRow>
            ) : (
              feedbacks.map((item) => {
                const isExpanded = !!expandedIds[item.id]
                return (
                  <TableRow key={item.id} className="align-top">
                    <TableCell className="font-mono text-xs">
                      {item.id}
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${item.email}`}
                        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                      >
                        <Mail className="size-3.5" />
                        {item.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p
                          className={cn(
                            "text-sm whitespace-pre-wrap",
                            !isExpanded && "line-clamp-2"
                          )}
                        >
                          {item.message}
                        </p>
                        {item.message.length > 100 && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(item.id)}
                            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                          >
                            <span>
                              {isExpanded ? "Zabalit" : "Zobrazit celou zprávu"}
                            </span>
                            <ChevronDown
                              className={cn(
                                "size-3 transition-transform",
                                isExpanded && "rotate-180"
                              )}
                            />
                          </button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {toCzechDateFormat(item.created)}
                    </TableCell>
                  </TableRow>
                )
              })
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
