import { useState, type FC } from "react"
import { Link } from "react-router"
import {
  HelpCircle,
  MessageSquare,
  Plus,
  Search,
  Share2,
  Sparkles,
  Trash2,
  Languages,
  Edit,
  Loader2,
} from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  getAllArticlesAdmin,
  deleteArticle,
} from "@/utils/api/articleService.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"
import type { ArticleProps } from "@/utils/types/article.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Badge } from "@/components/ui/badge.tsx"
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

export const ArticlesManagement: FC = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [deleteTarget, setDeleteTarget] = useState<ArticleProps | null>(null)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["editor-articles", page],
    queryFn: async () => {
      const res = await getAllArticlesAdmin(page)
      return res?.data ?? { totalPages: 1, data: [] }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await deleteArticle(id)
    },
    onSuccess: () => {
      toast.success("Článek byl úspěšně smazán")
      queryClient.invalidateQueries({ queryKey: ["editor-articles"] })
      setDeleteTarget(null)
    },
    onError: (err) => {
      console.error(err)
      toast.error("Chyba při mazání článku")
    },
  })

  const articles = data?.data ?? []
  const totalPages = data?.totalPages ?? 1

  const filteredArticles = articles.filter((item) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      item.title?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      `${item.user_firstname} ${item.user_surname}`.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Správa článků</h1>
          <p className="text-muted-foreground text-sm">
            Vytvářejte, upravujte a překládejte články a vzdělávací materiály.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button asChild>
            <Link to="/articles/new">
              <Plus className="size-4" />
              Nový článek
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link to="/highlights">
              <Sparkles className="size-4" />
              Highlighty
            </Link>
          </Button>

          <Button asChild variant="ghost" size="icon" title="Nápověda">
            <Link to="/help">
              <HelpCircle className="size-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
          <Input
            placeholder="Hledat článek podle názvu či autora..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="text-muted-foreground size-8 animate-spin" />
        </div>
      ) : isError ? (
        <Card className="border-destructive/50 bg-destructive/5 p-6 text-center text-sm text-destructive">
          Chyba při načítání článků: {String(error)}
        </Card>
      ) : filteredArticles.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground text-sm">
            {search
              ? "Nebyly nalezeny žádné články odpovídající hledání."
              : "Zatím zde nejsou žádné články."}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="flex flex-col transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <CardHeader className="space-y-2 pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-xs uppercase">
                      {article.language || "cs"}
                    </Badge>
                    {article.premiumOnly && (
                      <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        Premium
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {article.articleTypeOption === "new"
                        ? "Aktualita"
                        : "Článek"}
                    </Badge>
                  </div>

                  <span className="text-muted-foreground shrink-0 text-xs">
                    {toCzechDateFormat(article.changed || article.created)}
                  </span>
                </div>

                <CardTitle className="line-clamp-2 text-base">
                  <Link
                    to={`/articles/edit/${article.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 pb-3">
                <p className="text-muted-foreground line-clamp-3 text-xs leading-relaxed">
                  {article.description || "Bez popisu"}
                </p>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t pt-3">
                <div className="text-muted-foreground truncate text-xs">
                  {article.user_firstname} {article.user_surname}
                </div>

                <div className="flex items-center gap-1">
                  <Button asChild size="icon-xs" variant="ghost" title="Upravit">
                    <Link to={`/articles/edit/${article.id}`}>
                      <Edit className="size-3.5" />
                    </Link>
                  </Button>

                  {article.allowComments && (
                    <Button
                      asChild
                      size="icon-xs"
                      variant="ghost"
                      title="Komentáře"
                    >
                      <Link to={`/article/comments/${article.id}`}>
                        <MessageSquare className="size-3.5" />
                      </Link>
                    </Button>
                  )}

                  <Button asChild size="icon-xs" variant="ghost" title="Sdílet">
                    <Link to={`/article/share/${article.id}`}>
                      <Share2 className="size-3.5" />
                    </Link>
                  </Button>

                  <Button asChild size="icon-xs" variant="ghost" title="Překlady">
                    <Link to={`/article/translate/${article.id}`}>
                      <Languages className="size-3.5" />
                    </Link>
                  </Button>

                  <Button
                    size="icon-xs"
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10"
                    title="Smazat"
                    onClick={() => setDeleteTarget(article)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Předchozí
          </Button>
          <span className="text-muted-foreground text-sm">
            Stránka {page} z {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Další
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Opravdu chcete smazat tento článek?</AlertDialogTitle>
            <AlertDialogDescription>
              Článek „{deleteTarget?.title}“ bude označen jako smazaný.
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
