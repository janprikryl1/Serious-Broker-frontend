import { useEffect, useState, type FC } from "react"
import { useNavigate, useParams, Link } from "react-router"
import { ArrowLeft, Check, Loader2, Sparkles } from "lucide-react"
import { toast } from "sonner"
import {
  createHighlight,
  getHighlightById,
  updateExistingHighlight,
} from "@/utils/api/highlightsService.ts"
import { defaultHighlight } from "@/utils/constants/defaultContent.ts"
import type { HighlightType } from "@/utils/types/highlight.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Label } from "@/components/ui/label.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"

export const HighlightEdit: FC = () => {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<HighlightType>(defaultHighlight)

  useEffect(() => {
    if (!id) return
    const fetchHighlight = async () => {
      setLoading(true)
      try {
        const res = await getHighlightById(id)
        if (res?.data) {
          setData(res.data)
        }
      } catch (err) {
        console.error("Failed to load highlight", err)
        toast.error("Nepodařilo se načíst highlight")
      } finally {
        setLoading(false)
      }
    }
    fetchHighlight()
  }, [id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!data.title_cs.trim() && !data.title.trim()) {
      toast.error("Zadejte alespoň český nebo anglický název")
      return
    }

    setSaving(true)
    try {
      if (id) {
        await updateExistingHighlight(id, data)
        toast.success("Highlight byl úspěšně upraven")
      } else {
        await createHighlight(data)
        toast.success("Highlight byl úspěšně vytvořen")
      }
      navigate("/highlights")
    } catch (err) {
      console.error("Save error", err)
      toast.error("Chyba při ukládání highlightu")
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
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link to="/highlights">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEditing ? "Upravit highlight" : "Nový highlight"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isEditing ? `ID #${id}` : "Vytvoření nového highlightu"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5" />
              Obsah highlightu
            </CardTitle>
            <CardDescription>
              Zadejte českou i anglickou verzi názvu a popisu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title_cs">Název (česky) *</Label>
              <Input
                id="title_cs"
                value={data.title_cs}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, title_cs: e.target.value }))
                }
                placeholder="Český název..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title_en">Název (anglicky)</Label>
              <Input
                id="title_en"
                value={data.title}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="English title..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc_cs">Popis (česky) *</Label>
              <Textarea
                id="desc_cs"
                value={data.description_cs}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    description_cs: e.target.value,
                  }))
                }
                rows={3}
                placeholder="Český popis..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc_en">Popis (anglicky)</Label>
              <Textarea
                id="desc_en"
                value={data.description}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={3}
                placeholder="English description..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button asChild variant="outline">
                <Link to="/highlights">Zrušit</Link>
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4" />
                )}
                {saving ? "Ukládání..." : "Uložit highlight"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
