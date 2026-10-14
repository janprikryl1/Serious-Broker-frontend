import { useState, type FC } from "react"
import { Link } from "react-router"
import {
  Sparkles,
  Plus,
  Trash2,
  Edit,
  Loader2,
  Info,
} from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  getHighlights,
  deleteHighlight,
} from "@/utils/api/highlightsService.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"
import type { HighlightType } from "@/utils/types/highlight.ts"
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

export const HighlightsManagement: FC = () => {
  const queryClient = useQueryClient()
  const [deleteTarget, setDeleteTarget] = useState<HighlightType | null>(null)

  const { data: highlights = [], isLoading, isError, error } = useQuery({
    queryKey: ["editor-highlights"],
    queryFn: async () => {
      const res = await getHighlights()
      return res?.data ?? []
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await deleteHighlight(id)
    },
    onSuccess: () => {
      toast.success("Highlight byl úspěšně smazán")
      queryClient.invalidateQueries({ queryKey: ["editor-highlights"] })
      setDeleteTarget(null)
    },
    onError: (err) => {
      console.error(err)
      toast.error("Chyba při mazání highlightu")
    },
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Správa highlightů</h1>
          <p className="text-muted-foreground text-sm">
            Klíčová sdělení a tipy zobrazované napříč webem.
          </p>
        </div>

        <Button asChild>
          <Link to="/highlits/editor">
            <Plus className="size-4" />
            Nový highlight
          </Link>
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="text-muted-foreground size-8 animate-spin" />
        </div>
      ) : isError ? (
        <Card className="border-destructive/50 bg-destructive/5 p-6 text-center text-sm text-destructive">
          Chyba při načítání highlightů: {String(error)}
        </Card>
      ) : highlights.length === 0 ? (
        <Card className="p-12 text-center">
          <Sparkles className="text-muted-foreground mx-auto mb-3 size-10" />
          <p className="text-muted-foreground text-sm">
            Zatím nebyly vytvořeny žádné highlighty. Klikněte na „Nový highlight“.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {highlights.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col justify-between transition-all hover:border-primary/40"
            >
              <CardHeader className="space-y-2 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">
                    {item.title_cs || item.title || "Bez názvu"}
                  </CardTitle>
                  <span className="text-muted-foreground shrink-0 text-xs">
                    {toCzechDateFormat(item.created)}
                  </span>
                </div>
                {item.title && item.title_cs && item.title !== item.title_cs && (
                  <p className="text-muted-foreground text-xs italic">
                    EN: {item.title}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-2 pb-3">
                <div className="flex items-start gap-2">
                  <Info className="text-primary mt-0.5 size-4 shrink-0" />
                  <p className="text-sm leading-relaxed">
                    {item.description_cs || item.description || "Bez popisu"}
                  </p>
                </div>
                {item.description &&
                  item.description_cs &&
                  item.description !== item.description_cs && (
                    <p className="text-muted-foreground pl-6 text-xs italic">
                      EN: {item.description}
                    </p>
                  )}
              </CardContent>

              <CardFooter className="flex items-center justify-end gap-1 border-t pt-3">
                <Button asChild size="icon-xs" variant="ghost" title="Upravit">
                  <Link to={`/highlits/editor/${item.id}`}>
                    <Edit className="size-3.5" />
                  </Link>
                </Button>
                <Button
                  size="icon-xs"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => setDeleteTarget(item)}
                  title="Smazat"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Smazat highlight?</AlertDialogTitle>
            <AlertDialogDescription>
              Highlight „{deleteTarget?.title_cs || deleteTarget?.title}“ bude
              trvale smazán.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušit</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteTarget) {
                  deleteMutation.mutate(deleteTarget.id)
                }
              }}
            >
              {deleteMutation.isPending ? "Mazání..." : "Smazat"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
