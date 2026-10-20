import { useState, type FC } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router"
import { toast } from "sonner"
import {
  Clock,
  ExternalLink,
  LayoutTemplate,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"
import { deleteDemo, getAllDemos } from "@/utils/api/demosService.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"
import { Button } from "@/components/ui/button.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import {
  Card,
  CardContent,
  CardDescription,
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

const DEMOS_QUERY_KEY = ["admin", "demos"]

export const DemosManagement: FC = () => {
  const queryClient = useQueryClient()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const {
    data: demos = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: DEMOS_QUERY_KEY,
    queryFn: getAllDemos,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteDemo,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: DEMOS_QUERY_KEY })
      toast.success("Demo prezentace byla smazána")
      setDeletingId(null)
    },
    onError: () => toast.error("Nepodařilo se smazat demo"),
  })

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Správa demo prezentací</h1>
          <p className="text-sm text-muted-foreground">
            Interaktivní ukázky a widgety pro návštěvníky webu
          </p>
        </div>
        <Button asChild>
          <Link to="/demos/edit">
            <Plus className="size-4" />
            Nové demo
          </Link>
        </Button>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Demo prezentace se nepodařilo načíst.
        </p>
      )}

      {isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : demos.length === 0 ? (
        <Card className="flex min-h-[200px] items-center justify-center border-dashed">
          <div className="py-8 text-center text-muted-foreground">
            <LayoutTemplate className="mx-auto mb-2 size-8 opacity-40" />
            <p>Zatím nejsou vytvořeny žádné demo prezentace.</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => (
            <Card key={demo.id} className="flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">
                    <a
                      href={`/demo/${demo.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-primary hover:underline"
                      title="Zobrazit demo prezentaci"
                    >
                      {demo.name}
                      <ExternalLink className="size-4 opacity-50" />
                    </a>
                  </CardTitle>
                  <Badge variant="outline" className="gap-1 text-xs">
                    <Clock className="size-3" />
                    {demo.time_of_replace}s
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {demo.description || "Bez popisu"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    Widgety ({demo.widgets?.length || 0}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {demo.widgets?.slice(0, 4).map((w) => (
                      <Badge
                        key={`${demo.id}-${w.type}-${w.propertyId}`}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        {w.type}
                      </Badge>
                    ))}
                    {(demo.widgets?.length || 0) > 4 && (
                      <span className="text-[10px] text-muted-foreground">
                        +{(demo.widgets?.length || 0) - 4} dalších
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-3">
                <span className="text-xs text-muted-foreground">
                  {demo.created ? toCzechDateFormat(String(demo.created)) : ""}
                </span>
                <div className="flex items-center gap-1">
                  <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 px-2.5 text-xs">
                    <a
                      href={`/demo/${demo.id}`}
                      target="_blank"
                      rel="noreferrer"
                      title="Otevřít demo prezentaci"
                    >
                      <ExternalLink className="size-3.5" />
                      Zobrazit
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 px-2.5 text-xs">
                    <Link to={`/demos/edit/${demo.id}`}>
                      <Pencil className="size-3.5" />
                      Upravit
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-destructive hover:text-destructive"
                    onClick={() => demo.id && setDeletingId(demo.id)}
                    aria-label="Smazat demo"
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
            <AlertDialogTitle>Smazat demo prezentaci?</AlertDialogTitle>
            <AlertDialogDescription>
              Tuto akci nelze vrátit zpět. Demo bude trvale odstraněno.
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
