import { useEffect, useState, type FC } from "react"
import { useNavigate, useParams, useSearchParams, Link } from "react-router"
import {
  ArrowLeft,
  Check,
  Languages,
  Loader2,
  Sparkles,
} from "lucide-react"
import { toast } from "sonner"
import {
  createTranslation,
  getArticleTranslateByIdAdmin,
  updateTranslation,
  translateText,
} from "@/utils/api/translationsService.ts"
import { getArticleByIdAdmin } from "@/utils/api/articleService.ts"
import { languages as availableLanguages } from "@/utils/options/index.ts"
import type {
  ArticleNewTranslateEditType,
  ArticleTranslateEditType,
  ContentType,
  SubjectType,
} from "@/utils/types/article.ts"
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

export const TranslateEdit: FC = () => {
  const { id } = useParams<{ id?: string }>()
  const [searchParams] = useSearchParams()
  const articleIdQuery = searchParams.get("articleId")
  const navigate = useNavigate()

  const isEditing = Boolean(id)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [translatingAuto, setTranslatingAuto] = useState(false)

  const [articleId, setArticleId] = useState<number | undefined>(
    articleIdQuery ? parseInt(articleIdQuery, 10) : undefined
  )
  const [translateId, setTranslateId] = useState<number | undefined>(
    id ? parseInt(id, 10) : undefined
  )
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [language, setLanguage] = useState("en")
  const [content, setContent] = useState<ContentType[]>([])
  const [subjects, setSubjects] = useState<SubjectType[]>([])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        if (id) {
          const res = await getArticleTranslateByIdAdmin(id)
          if (res?.data) {
            const d = res.data
            setTranslateId(d.id)
            setArticleId(d.object_id)
            setName(d.title || "")
            setDescription(d.description || "")
            setLanguage(d.language || "en")
            setContent(d.content || [])
            setSubjects(d.subjects || [])
          }
        } else if (articleIdQuery) {
          const res = await getArticleByIdAdmin(articleIdQuery)
          if (res?.data) {
            const d = res.data
            setArticleId(d.id)
            setName(d.title || "")
            setDescription(d.description || "")
            setLanguage("en")
            setContent(d.content || [])
            setSubjects(d.subjects || [])
          }
        }
      } catch (err) {
        console.error("Failed to load translation data", err)
        toast.error("Nepodařilo se načíst data pro překlad")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, articleIdQuery])

  // Automatic translation via AI API
  const handleAutoTranslate = async () => {
    if (!name && !description) return
    setTranslatingAuto(true)
    try {
      if (name) {
        const resTitle = await translateText(name, language)
        if (resTitle?.data?.translatedText) {
          setName(resTitle.data.translatedText)
        }
      }
      if (description) {
        const resDesc = await translateText(description, language)
        if (resDesc?.data?.translatedText) {
          setDescription(resDesc.data.translatedText)
        }
      }
      toast.success("Automatický překlad názvu a perexu dokončen")
    } catch (err) {
      console.error("Auto translate error", err)
      toast.error("Chyba při automatickém překladu")
    } finally {
      setTranslatingAuto(false)
    }
  }

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Zadejte prosím název překladu")
      return
    }

    if (!articleId) {
      toast.error("Chybí ID původního článku")
      return
    }

    setSaving(true)
    try {
      if (translateId !== undefined) {
        const payload: ArticleTranslateEditType = {
          translateId,
          articleId,
          language,
          title: name,
          description,
          content: JSON.stringify(content),
          subjects: JSON.stringify(subjects),
        }
        await updateTranslation(payload)
        toast.success("Překlad byl úspěšně upraven")
      } else {
        const payload: ArticleNewTranslateEditType = {
          articleId,
          language,
          title: name,
          description,
          content: JSON.stringify(content),
          subjects: JSON.stringify(subjects),
        }
        await createTranslation(payload)
        toast.success("Překlad byl úspěšně vytvořen")
      }
      navigate(`/article/translate/${articleId}`)
    } catch (err) {
      console.error("Save translation error", err)
      toast.error("Chyba při ukládání překladu")
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
    <div className="mx-auto max-w-4xl space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon">
            <Link
              to={
                articleId ? `/article/translate/${articleId}` : "/articles"
              }
            >
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isEditing ? `Upravit překlad (${language.toUpperCase()})` : "Nový překlad článku"}
            </h1>
            <p className="text-muted-foreground text-sm">
              Originální článek #{articleId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleAutoTranslate}
            disabled={translatingAuto}
          >
            {translatingAuto ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            Přeložit automaticky
          </Button>

          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Check className="size-4" />
            )}
            Uložit překlad
          </Button>
        </div>
      </div>

      {/* Basic Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="size-5" />
            Základní údaje překladu
          </CardTitle>
          <CardDescription>
            Zvolte cílový jazyk a přeložte název s popisem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Cílový jazyk překladu</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableLanguages.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.name} ({l.id.toUpperCase()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trans-title">Přeložený název článku *</Label>
            <Input
              id="trans-title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Translated title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trans-desc">Přeložený popis / perex</Label>
            <Textarea
              id="trans-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Translated description..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Translated Subjects */}
      {subjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Překlad kapitol (Subjects)</CardTitle>
            <CardDescription>
              Přeložte nadpisy a texty jednotlivých kapitol
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.map((subj, index) => (
              <div
                key={subj.id || index}
                className="space-y-3 rounded-lg border p-4"
              >
                <div className="text-muted-foreground text-xs font-semibold uppercase">
                  Kapitola #{index + 1}
                </div>

                <Input
                  value={subj.title}
                  placeholder="Přeložený název kapitoly..."
                  onChange={(e) => {
                    const val = e.target.value
                    setSubjects((prev) => {
                      const copy = [...prev]
                      copy[index].title = val
                      return copy
                    })
                  }}
                />

                <Textarea
                  value={subj.text}
                  placeholder="Přeložený text kapitoly..."
                  rows={4}
                  onChange={(e) => {
                    const val = e.target.value
                    setSubjects((prev) => {
                      const copy = [...prev]
                      copy[index].text = val
                      return copy
                    })
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Floating Save */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Button asChild variant="outline" size="sm">
            <Link
              to={
                articleId ? `/article/translate/${articleId}` : "/articles"
              }
            >
              Zpět
            </Link>
          </Button>

          <Button onClick={handleSave} disabled={saving} size="sm">
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Check className="size-4" />
            )}
            Uložit překlad
          </Button>
        </div>
      </div>
    </div>
  )
}
