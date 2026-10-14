import { useState, type FC } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router"
import { toast } from "sonner"
import { Code, Database, Eye, Pencil, Plus, Trash2 } from "lucide-react"
import {
  deleteMySelect,
  getMySelects,
} from "@/utils/api/genericTableService.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"
import { Button } from "@/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
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
import { Skeleton } from "@/components/ui/skeleton.tsx"

const GENERIC_SELECTS_KEY = ["admin", "genericSelects"]

export const GenericTableData: FC = () => {
  const queryClient = useQueryClient()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const {
    data: selects = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: GENERIC_SELECTS_KEY,
    queryFn: getMySelects,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteMySelect,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: GENERIC_SELECTS_KEY })
      toast.success("Dotaz byl smazán")
      setDeletingId(null)
    },
    onError: () => toast.error("Nepodařilo se smazat dotaz"),
  })

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Generická data a dotazy</h1>
          <p className="text-sm text-muted-foreground">
            Uložené dynamické SQL dotazy a přehledy nad databází
          </p>
        </div>
        <Button asChild>
          <Link to="/generic_table_data/edit">
            <Plus className="size-4" />
            Nový dotaz
          </Link>
        </Button>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Uložené dotazy se nepodařilo načíst.
        </p>
      )}

      {isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : selects.length === 0 ? (
        <Card className="flex min-h-[200px] items-center justify-center border-dashed">
          <div className="py-8 text-center text-muted-foreground">
            <Database className="mx-auto mb-2 size-8 opacity-40" />
            <p>Zatím nemáte vytvořené žádné dotazy.</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {selects.map((select) => (
            <Card key={select.id} className="flex flex-col justify-between">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="flex items-center gap-1.5 font-mono text-sm">
                    <Code className="size-4 text-primary" />#{select.id}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {select.updated ? toCzechDateFormat(select.updated) : ""}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="rounded-md bg-muted/50 p-2.5 font-mono text-xs">
                  <p className="line-clamp-4 break-all whitespace-pre-wrap">
                    {select.query}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-3">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/generic_table_results/${select.id}`}>
                    <Eye className="size-3.5" />
                    Výsledky
                  </Link>
                </Button>
                <div className="flex items-center gap-1">
                  <Button asChild variant="ghost" size="sm">
                    <Link to={`/generic_table_data/edit/${select.id}`}>
                      <Pencil className="size-3.5" />
                      Upravit
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-destructive hover:text-destructive"
                    onClick={() => setDeletingId(select.id)}
                    aria-label="Smazat dotaz"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={deletingId !== null}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Smazat SQL dotaz?</AlertDialogTitle>
            <AlertDialogDescription>
              Tuto akci nelze vrátit zpět. Uložený dotaz bude trvale odstraněn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušit</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deletingId && deleteMutation.mutate(deletingId)}
            >
              Smazat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
