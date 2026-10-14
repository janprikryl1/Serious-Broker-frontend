import { useCallback, useEffect, useState, type FC } from "react"
import { useParams, Link } from "react-router"
import {
  ArrowLeft,
  Languages,
  Plus,
  Loader2,
  Trash2,
  Edit,
} from "lucide-react"
import { toast } from "sonner"
import {
  getTranslations,
  deleteTranslation,
} from "@/utils/api/translationsService.ts"
import type {
  ArticleDetailProps,
  TranslationsOverview,
} from "@/utils/types/article.ts"
import { Button } from "@/components/ui/button.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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

export const ArticleTranslateList: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<ArticleDetailProps | null>(null)
  const [translations, setTranslations] = useState<TranslationsOverview[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<TranslationsOverview | null>(
    null
  )

  const fetchAll = useCallback(async () => {
    if (!id) return
    setLoading(true)
    try {
      const res = await getTranslations(id)
      if (res?.data) {
        setArticle(res.data.article)
        setTranslations(res.data.translations || [])
      }
    } catch (err) {
      console.error("Failed to load translations", err)
      toast.error("Nepodařilo se načíst překlady článku")
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const handleDelete = async () => {
    if (!deleteTarget?.id) return
    try {
      await deleteTranslation(deleteTarget.id)
      toast.success("Překlad byl smazán")
      setDeleteTarget(null)
      fetchAll()
    } catch (err) {
      console.error(err)
      toast.error("Chyba při mazání překladu")
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon">
            <Link to={id ? `/articles/edit/${id}` : "/articles"}>
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Překlady: {article?.title || `#${id}`}
            </h1>
            <p className="text-muted-foreground text-sm">
              Originální jazyk: {(article?.language || "cs").toUpperCase()}
            </p>
          </div>
        </div>

        <Button asChild>
          <Link to={`/article/translations?articleId=${id}`}>
            <Plus className="size-4" />
            Nový překlad
          </Link>
        </Button>
      </div>

      {/* Translations List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="size-5" />
            Dostupné jazykové mutace
          </CardTitle>
          <CardDescription>
            {translations.length > 0
              ? `Evidováno ${translations.length} překladů`
              : "Zatím žádné překlady"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {translations.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              Pro tento článek zatím neexistují žádné překlady. Klikněte na „Nový
              překlad“ výše.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {translations.map((item) => (
                <Card
                  key={item.id ?? item.language}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-sm font-semibold uppercase">
                      {item.language}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1">
                    {item.id && (
                      <>
                        <Button asChild size="icon-xs" variant="ghost" title="Upravit">
                          <Link to={`/article/translations/${item.id}`}>
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
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Smazat překlad?</AlertDialogTitle>
            <AlertDialogDescription>
              Překlad pro jazyk „{deleteTarget?.language?.toUpperCase()}“ bude
              trvale odstraněn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušit</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Smazat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
