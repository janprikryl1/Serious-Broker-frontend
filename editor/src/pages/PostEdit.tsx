import { useEffect, useState, type FC } from "react"
import { useNavigate, useParams, Link } from "react-router"
import { ArrowLeft, Loader2, Send, Share2 } from "lucide-react"
import { toast } from "sonner"
import {
  createPost,
  getArticlePostDetail,
} from "@/utils/api/articlePostService.ts"
import { domain } from "@/utils/constants/media.ts"
import {
  PostOption,
  type PostOptionType,
  languages,
} from "@/utils/options/index.ts"
import type { ArticlePost } from "@/utils/types/article.ts"
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

export const PostEdit: FC = () => {
  const { articleId, id } = useParams<{ articleId: string; id?: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  const [type, setType] = useState<PostOptionType>("Facebook")
  const [language, setLanguage] = useState("cs")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState(
    articleId ? `Podívejte se na nový článek: ${domain}/article/${articleId}` : ""
  )

  useEffect(() => {
    if (!id) return
    const fetchPost = async () => {
      setLoading(true)
      try {
        const res = await getArticlePostDetail(id)
        if (res?.data) {
          const d = res.data
          setType((d.type as PostOptionType) || "Facebook")
          setLanguage(d.language || "cs")
          setTitle(d.title || "")
          setDescription(d.description || "")
          setContent(d.content || "")
        }
      } catch (err) {
        console.error("Failed to load post", err)
        toast.error("Nepodařilo se načíst příspěvek")
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  const handleSave = async () => {
    if (!articleId) {
      toast.error("Chybí ID článku")
      return
    }

    if (!content.trim()) {
      toast.error("Zadejte text příspěvku")
      return
    }

    setSaving(true)
    const post: ArticlePost = {
      id,
      article_id: articleId,
      type,
      language,
      title,
      description,
      content,
    }

    try {
      await createPost(post)
      toast.success("Příspěvek byl úspěšně publikován")
      navigate(`/article/share/${articleId}`)
    } catch (err) {
      console.error("Failed to save post", err)
      toast.error("Chyba při ukládání příspěvku")
    } finally {
      setSaving(false)
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
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link
            to={articleId ? `/article/share/${articleId}` : "/articles"}
          >
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEditing ? "Upravit příspěvek" : "Příspěvek pro sociální sítě"}
          </h1>
          <p className="text-muted-foreground text-sm">
            Článek #{articleId}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="size-5" />
            Obsah příspěvku
          </CardTitle>
          <CardDescription>
            Nastavte platformu, jazyk a doprovodný text příspěvku
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Sociální síť</Label>
              <Select
                value={type}
                onValueChange={(val) => setType(val as PostOptionType)}
                disabled={isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PostOption.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                      {opt.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Jazyk</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-title">Titulek příspěvku</Label>
            <Input
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Např. Novinka na blogu..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-desc">Popis / anotace</Label>
            <Input
              id="post-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Krátká anotace..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-content">Text a odkaz příspěvku *</Label>
            <Textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="Text příspěvku..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() =>
                navigate(articleId ? `/article/share/${articleId}` : "/articles")
              }
            >
              Zrušit
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              {saving ? "Ukládání..." : "Publikovat příspěvek"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
