import { useEffect, useState, type FC } from "react"
import { useNavigate, useParams, Link } from "react-router"
import { ArrowLeft, MessageSquare, Loader2, User } from "lucide-react"
import { toast } from "sonner"
import { getArticleComments } from "@/utils/api/commentsService.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"
import type { CommentType } from "@/utils/types/article.ts"
import { Button } from "@/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card.tsx"
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx"

export const ArticleComments: FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [comments, setComments] = useState<CommentType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchComments = async () => {
      setLoading(true)
      try {
        const res = await getArticleComments(parseInt(id, 10))
        if (res?.data) {
          setComments(res.data)
        }
      } catch (err) {
        console.error("Failed to load comments", err)
        toast.error("Nepodařilo se načíst komentáře")
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [id])

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon">
            <Link to={id ? `/articles/edit/${id}` : "/articles"}>
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Komentáře článku</h1>
            <p className="text-muted-foreground text-sm">
              Článek ID #{id} • Celkem {comments.length} komentářů
            </p>
          </div>
        </div>

        <Button variant="outline" onClick={() => navigate(-1)}>
          Zpět
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="text-muted-foreground size-8 animate-spin" />
        </div>
      ) : comments.length === 0 ? (
        <Card className="p-12 text-center">
          <MessageSquare className="text-muted-foreground mx-auto mb-3 size-10" />
          <p className="text-muted-foreground text-sm">
            K tomuto článku zatím nebyly přidány žádné komentáře.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">
                    <User className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-sm font-semibold">
                    {comment.user || "Anonymní uživatel"}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {toCzechDateFormat(comment.created)}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0 text-sm leading-relaxed">
                {comment.text}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
