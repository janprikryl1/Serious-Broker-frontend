import { useState, useMemo, type FC } from "react"
import { useNavigate, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { getTableContent } from "@/utils/api/genericTableService.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"

const PAGE_SIZE = 25

export const GenericTableResults: FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [searchColumn1, setSearchColumn1] = useState("")
  const [searchTerm1, setSearchTerm1] = useState("")
  const [searchColumn2, setSearchColumn2] = useState("")
  const [searchTerm2, setSearchTerm2] = useState("")
  const [filterCondition, setFilterCondition] = useState<"AND" | "OR">("AND")
  const [page, setPage] = useState(1)

  const {
    data: rows = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin", "genericResults", id],
    queryFn: () => (id ? getTableContent(id) : []),
    enabled: Boolean(id),
  })

  // Derive columns from the first row
  const columns = useMemo(() => {
    if (!Array.isArray(rows) || rows.length === 0) return []
    return Object.keys(rows[0])
  }, [rows])

  // Filtered rows
  const filteredRows = useMemo(() => {
    if (!Array.isArray(rows)) return []
    return rows.filter((row) => {
      const col1 = searchColumn1 || columns[0]
      const col2 = searchColumn2 || columns[1] || columns[0]

      const val1 =
        row[col1] !== undefined && row[col1] !== null
          ? String(row[col1]).toLowerCase()
          : ""
      const val2 =
        row[col2] !== undefined && row[col2] !== null
          ? String(row[col2]).toLowerCase()
          : ""

      const match1 = !searchTerm1 || val1.includes(searchTerm1.toLowerCase())
      const match2 = !searchTerm2 || val2.includes(searchTerm2.toLowerCase())

      return filterCondition === "AND" ? match1 && match2 : match1 || match2
    })
  }, [
    rows,
    columns,
    searchColumn1,
    searchColumn2,
    searchTerm1,
    searchTerm2,
    filterCondition,
  ])

  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE) || 1
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredRows.slice(start, start + PAGE_SIZE)
  }, [filteredRows, page])

  const handleClearFilters = () => {
    setSearchTerm1("")
    setSearchTerm2("")
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/generic_table_data")}
          aria-label="Zpět na dotazy"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Výsledky SQL dotazu #{id}</h1>
          <p className="text-sm text-muted-foreground">
            Dynamický náhled dat vrácených z databáze
          </p>
        </div>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Výsledky dotazu se nepodařilo načíst.
        </p>
      )}

      {/* Filter toolbar */}
      {columns.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3">
          <div className="flex items-center gap-2">
            <Filter className="size-4 shrink-0 text-muted-foreground" />
            <Select
              value={searchColumn1 || columns[0]}
              onValueChange={setSearchColumn1}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {columns.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Hledat 1..."
              value={searchTerm1}
              onChange={(e) => {
                setSearchTerm1(e.target.value)
                setPage(1)
              }}
              className="w-36"
            />
          </div>

          <Select
            value={filterCondition}
            onValueChange={(v) => setFilterCondition(v as "AND" | "OR")}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">A zároveň</SelectItem>
              <SelectItem value="OR">Nebo</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Select
              value={searchColumn2 || columns[1] || columns[0]}
              onValueChange={setSearchColumn2}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {columns.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Hledat 2..."
              value={searchTerm2}
              onChange={(e) => {
                setSearchTerm2(e.target.value)
                setPage(1)
              }}
              className="w-36"
            />
          </div>

          {(searchTerm1 || searchTerm2) && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Vymazat filtry
            </Button>
          )}

          <p className="ml-auto text-xs text-muted-foreground">
            Nalezeno: {filteredRows.length} řádků
          </p>
        </div>
      )}

      {/* Table */}
      <div className="max-h-[600px] overflow-auto rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col}
                  className="font-mono text-xs whitespace-nowrap"
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              Array.from({ length: 10 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <TableRow key={i}>
                  {Array.from({ length: Math.max(3, columns.length) }).map(
                    (_, j) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))
            ) : paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={Math.max(1, columns.length)}
                  className="py-8 text-center text-muted-foreground"
                >
                  Dotaz nevrátil žádná data.
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: row
                <TableRow key={idx}>
                  {columns.map((col) => (
                    <TableCell
                      key={col}
                      className="font-mono text-xs whitespace-nowrap"
                    >
                      {row[col] !== null && row[col] !== undefined
                        ? String(row[col])
                        : "NULL"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Stránka {page} z {totalPages} ({filteredRows.length} položek)
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            <ChevronLeft className="size-4" />
            Předchozí
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Další
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
