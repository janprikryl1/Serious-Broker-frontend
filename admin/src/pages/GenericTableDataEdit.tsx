import { useState, useEffect, type FC, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  ArrowLeft,
  Code,
  Database,
  Filter,
  Plus,
  Save,
  Trash2,
} from "lucide-react"
import {
  getQueryById,
  getTableSchema,
  saveQuery,
} from "@/utils/api/genericTableService.ts"
import { AdminGenericTableOptions } from "@/utils/options/AdminGenericTableOptions.ts"
import { generateSQLQuery } from "@/utils/functions/generateSQL.ts"
import { parseSQLToTableQuery } from "@/utils/functions/parseSQLToQueryObject.ts"
import type {
  FilterCondition,
  FilterOperator,
  GenericTableQuery,
} from "@/utils/types/genericTable.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Label } from "@/components/ui/label.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"

const OPERATORS: FilterOperator[] = [
  "=",
  "!=",
  ">",
  "<",
  ">=",
  "<=",
  "LIKE",
  "NOT LIKE",
  "IS NULL",
  "IS NOT NULL",
  "IN",
  "NOT IN",
]

export const GenericTableDataEdit: FC = () => {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEditing = Boolean(id)

  const [table, setTable] = useState<string>(AdminGenericTableOptions[0] || "")
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [conditions, setConditions] = useState<FilterCondition[]>([])
  const [orderByField, setOrderByField] = useState<string>("")
  const [orderByDirection, setOrderByDirection] = useState<"ASC" | "DESC">(
    "ASC"
  )
  const [limit, setLimit] = useState<number | undefined>(100)
  const [rawSql, setRawSql] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("builder")

  // Load existing query if editing
  const { data: existingQuery, isPending: isQueryPending } = useQuery({
    queryKey: ["admin", "genericQuery", id],
    queryFn: () => (id ? getQueryById(id) : null),
    enabled: isEditing,
  })

  // Load table schema
  const { data: schema = [], isPending: isSchemaPending } = useQuery({
    queryKey: ["admin", "tableSchema", table],
    queryFn: () => getTableSchema(table),
    enabled: Boolean(table),
  })

  // Initialize from existing query
  useEffect(() => {
    if (existingQuery?.query) {
      setRawSql(existingQuery.query)
      const parsed = parseSQLToTableQuery(existingQuery.query)
      if (parsed) {
        if (parsed.tableName) setTable(parsed.tableName)
        if (parsed.query.columns) setSelectedColumns(parsed.query.columns)
        if (parsed.query.conditions) setConditions(parsed.query.conditions)
        if (parsed.query.orderBy) {
          setOrderByField(parsed.query.orderBy.field)
          setOrderByDirection(parsed.query.orderBy.direction)
        }
        if (parsed.query.limit !== undefined) setLimit(parsed.query.limit)
      }
    }
  }, [existingQuery])

  // Recalculate generated SQL whenever builder state changes
  useEffect(() => {
    if (activeTab === "builder") {
      const qObj: GenericTableQuery = {
        columns: selectedColumns.length > 0 ? selectedColumns : undefined,
        conditions: conditions.length > 0 ? conditions : undefined,
        orderBy: orderByField
          ? { field: orderByField, direction: orderByDirection }
          : undefined,
        limit,
      }
      setRawSql(generateSQLQuery(qObj, table))
    }
  }, [
    table,
    selectedColumns,
    conditions,
    orderByField,
    orderByDirection,
    limit,
    activeTab,
  ])

  const saveMutation = useMutation({
    mutationFn: () => saveQuery({ query: rawSql }, id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["admin", "genericSelects"],
      })
      toast.success("SQL dotaz byl uložen")
      navigate("/generic_table_data")
    },
    onError: () => toast.error("Nepodařilo se uložit SQL dotaz"),
  })

  const toggleColumn = (col: string) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    )
  }

  const selectAllColumns = () => {
    setSelectedColumns(schema.map((c) => c.Field))
  }

  const clearColumns = () => {
    setSelectedColumns([])
  }

  const addCondition = () => {
    if (schema.length === 0) return
    setConditions((prev) => [
      ...prev,
      { field: schema[0].Field, operator: "=", value: "" },
    ])
  }

  const updateCondition = (
    index: number,
    field: keyof FilterCondition,
    value: unknown
  ) => {
    setConditions((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const removeCondition = (index: number) => {
    setConditions((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!rawSql.trim()) {
      toast.error("Dotaz nesmí být prázdný")
      return
    }
    saveMutation.mutate()
  }

  if (isEditing && isQueryPending) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      <header className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/generic_table_data")}
          aria-label="Zpět na přehled"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">
            {isEditing ? `Upravit dotaz #${id}` : "Nový generický dotaz"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Tvorba a konfigurace dynamického SQL dotazu
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="builder" className="gap-1.5">
              <Filter className="size-4" />
              Vizuální návrhář
            </TabsTrigger>
            <TabsTrigger value="sql" className="gap-1.5">
              <Code className="size-4" />
              Přímý SQL editor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-6 pt-2">
            {/* Table select */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Database className="size-4" />
                  Výběr tabulky
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="max-w-sm space-y-1.5">
                  <Label htmlFor="table-select">Databázová tabulka</Label>
                  <Select value={table} onValueChange={setTable}>
                    <SelectTrigger id="table-select">
                      <SelectValue placeholder="Vyberte tabulku" />
                    </SelectTrigger>
                    <SelectContent>
                      {AdminGenericTableOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Columns select */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-lg">Sloupce k zobrazení</CardTitle>
                  <CardDescription>
                    Ponechte prázdné pro výběr všech sloupců (*)
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={selectAllColumns}
                    disabled={isSchemaPending}
                  >
                    Vybrat všechny
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearColumns}
                  >
                    Zrušit výběr
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isSchemaPending ? (
                  <Skeleton className="h-16 w-full" />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {schema.map((col) => {
                      const isSelected = selectedColumns.includes(col.Field)
                      return (
                        <Button
                          key={col.Field}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleColumn(col.Field)}
                          className="font-mono text-xs"
                        >
                          {col.Field}
                        </Button>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Filter Conditions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-lg">
                    Podmínky filtru (WHERE)
                  </CardTitle>
                  <CardDescription>
                    Filtrování řádků podle hodnot
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCondition}
                >
                  <Plus className="size-4" />
                  Přidat podmínku
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {conditions.length === 0 ? (
                  <p className="py-2 text-sm text-muted-foreground italic">
                    Žádné podmínky filtru (načtou se všechny řádky).
                  </p>
                ) : (
                  conditions.map((cond, index) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: condition item
                      key={index}
                      className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2"
                    >
                      <div className="w-48">
                        <Select
                          value={cond.field}
                          onValueChange={(val) =>
                            updateCondition(index, "field", val)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {schema.map((c) => (
                              <SelectItem key={c.Field} value={c.Field}>
                                {c.Field}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="w-32">
                        <Select
                          value={cond.operator}
                          onValueChange={(val) =>
                            updateCondition(
                              index,
                              "operator",
                              val as FilterOperator
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {OPERATORS.map((op) => (
                              <SelectItem key={op} value={op}>
                                {op}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="min-w-32 flex-1">
                        {!["IS NULL", "IS NOT NULL"].includes(
                          cond.operator
                        ) && (
                          <Input
                            value={String(cond.value ?? "")}
                            onChange={(e) =>
                              updateCondition(index, "value", e.target.value)
                            }
                            placeholder="Hodnota..."
                          />
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-9 text-destructive hover:text-destructive"
                        onClick={() => removeCondition(index)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Sorting & Limit */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Řazení a limit</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label>Řadit podle sloupce</Label>
                  <Select
                    value={orderByField || "__none__"}
                    onValueChange={(val) =>
                      setOrderByField(val === "__none__" ? "" : val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bez řazení" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">-- Bez řazení --</SelectItem>
                      {schema.map((c) => (
                        <SelectItem key={c.Field} value={c.Field}>
                          {c.Field}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Směr řazení</Label>
                  <Select
                    value={orderByDirection}
                    onValueChange={(val) =>
                      setOrderByDirection(val as "ASC" | "DESC")
                    }
                    disabled={!orderByField}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ASC">Vzestupně (ASC)</SelectItem>
                      <SelectItem value="DESC">Sestupně (DESC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Limit řádků</Label>
                  <Input
                    type="number"
                    min={1}
                    max={1000}
                    value={limit ?? ""}
                    onChange={(e) =>
                      setLimit(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="100"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sql" className="space-y-4 pt-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Přímá editace SQL dotazu
                </CardTitle>
                <CardDescription>
                  Můžete libovolně upravit text SQL SELECT dotazu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={rawSql}
                  onChange={(e) => setRawSql(e.target.value)}
                  rows={8}
                  className="font-mono text-sm leading-relaxed"
                  placeholder="SELECT * FROM `table`;"
                  required
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Live SQL Preview (visible on builder tab) */}
        {activeTab === "builder" && (
          <Card className="bg-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Náhled generovaného SQL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="font-mono text-xs break-all whitespace-pre-wrap text-primary/90">
                {rawSql}
              </pre>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/generic_table_data")}
          >
            Zrušit
          </Button>
          <Button type="submit" disabled={saveMutation.isPending}>
            <Save className="size-4" />
            {saveMutation.isPending ? "Ukládání..." : "Uložit dotaz"}
          </Button>
        </div>
      </form>
    </div>
  )
}
