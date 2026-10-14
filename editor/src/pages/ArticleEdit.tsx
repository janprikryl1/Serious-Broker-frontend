import { useEffect, useState, type FC } from "react"
import { useNavigate, useParams, Link } from "react-router"
import {
  ArrowLeft,
  Calendar,
  Check,
  ImageIcon,
  Loader2,
  Plus,
  Save,
  Trash2,
  Share2,
  Languages,
} from "lucide-react"
import { toast } from "sonner"
import {
  createArticle,
  getArticleByIdAdmin,
  updateArticle,
} from "@/utils/api/articleService.ts"
import {
  defaultContent,
  defaultSubjects,
} from "@/utils/constants/defaultContent.ts"
import {
  articleTypes,
  languages as availableLanguages,
  publicationOptions,
} from "@/utils/options/index.ts"
import { imageURL } from "@/utils/constants/media.ts"
import type {
  ArticleCreateProps,
  ArticleUpdateType,
  ContentType,
  SubjectType,
} from "@/utils/types/article.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Switch } from "@/components/ui/switch.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx"
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
import { ArticleTemplates } from "@/components/articles/ArticleTemplates.tsx"
import { ImagePickerModal } from "@/components/imageUpload/ImagePickerModal.tsx"

export const ArticleEdit: FC = () => {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("settings")

  // Form State
  const [articleId, setArticleId] = useState<number | undefined>(
    id ? parseInt(id, 10) : undefined
  )
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [language, setLanguage] = useState("cs")
  const [articleTypeOption, setArticleTypeOption] = useState<"article" | "new">(
    "article"
  )
  const [publicationType, setPublicationType] = useState<number>(0)
  const [publicateFrom, setPublicateFrom] = useState("")
  const [publicateTo, setPublicateTo] = useState("")
  const [publicateFromDays, setPublicateFromDays] = useState<number | null>(null)
  const [premiumOnly, setPremiumOnly] = useState(false)
  const [allowComments, setAllowComments] = useState(true)
  const [banner, setBanner] = useState("")
  const [titleImage, setTitleImage] = useState("")
  const [template, setTemplate] = useState(0)

  const [subjects, setSubjects] = useState<SubjectType[]>(defaultSubjects)
  const [content, setContent] = useState<ContentType[]>(defaultContent)

  // Image Picker Modal
  const [pickerOpen, setPickerOpen] = useState(false)
  const [imagePickerTarget, setImagePickerTarget] = useState<
    | { type: "banner" }
    | { type: "titleImage" }
    | { type: "task"; contentIndex: number; taskIndex: number }
    | null
  >(null)

  // Load article if editing
  useEffect(() => {
    if (!id) return
    const fetchArticle = async () => {
      setLoading(true)
      try {
        const res = await getArticleByIdAdmin(id)
        if (res?.data) {
          const d = res.data
          setArticleId(d.id)
          setName(d.title || "")
          setDescription(d.description || "")
          setLanguage(d.language || "cs")
          setArticleTypeOption((d.articleTypeOption as "article" | "new") || "article")
          setPublicationType(d.publicationType ?? 0)
          setPublicateFrom(d.publicationFrom || "")
          setPublicateTo(d.publicationTo || "")
          setPublicateFromDays(d.publicationFromDays ?? null)
          setPremiumOnly(Boolean(d.premiumOnly))
          setAllowComments(d.allowComments !== false)
          setBanner(d.banner || "")
          setTitleImage(d.titleImage || "")
          setTemplate(d.templateId ?? 0)

          if (Array.isArray(d.subjects) && d.subjects.length > 0) {
            setSubjects(d.subjects)
          }
          if (Array.isArray(d.content) && d.content.length > 0) {
            setContent(d.content)
          }
        }
      } catch (err) {
        console.error("Failed to load article", err)
        toast.error("Nepodařilo se načíst článek")
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id])

  const handleOpenPicker = (
    target:
      | { type: "banner" }
      | { type: "titleImage" }
      | { type: "task"; contentIndex: number; taskIndex: number }
  ) => {
    setImagePickerTarget(target)
    setPickerOpen(true)
  }

  const handleSelectImage = (imageName: string) => {
    if (!imagePickerTarget) return
    if (imagePickerTarget.type === "banner") {
      setBanner(imageName)
    } else if (imagePickerTarget.type === "titleImage") {
      setTitleImage(imageName)
    } else if (imagePickerTarget.type === "task") {
      const { contentIndex, taskIndex } = imagePickerTarget
      setContent((prev) => {
        const copy = [...prev]
        if (copy[contentIndex]?.tasks[taskIndex]) {
          copy[contentIndex].tasks[taskIndex].image = imageName
        }
        return copy
      })
    }
    setImagePickerTarget(null)
  }

  // Subject management
  const addSubject = () => {
    setSubjects((prev) => [
      ...prev,
      { id: prev.length > 0 ? Math.max(...prev.map((s) => s.id)) + 1 : 0, title: "", text: "" },
    ])
  }

  const removeSubject = (index: number) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index))
  }

  const updateSubject = (index: number, field: "title" | "text", value: string) => {
    setSubjects((prev) => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: value }
      return copy
    })
  }

  // Content management
  const addContentSection = () => {
    setContent((prev) => [
      ...prev,
      {
        id: prev.length > 0 ? Math.max(...prev.map((c) => c.id)) + 1 : 0,
        title: "",
        tasks: [
          {
            id: 0,
            task: "",
            image: "",
            animateTo: { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } },
          },
        ],
      },
    ])
  }

  const removeContentSection = (cIdx: number) => {
    setContent((prev) => prev.filter((_, i) => i !== cIdx))
  }

  const addTask = (cIdx: number) => {
    setContent((prev) => {
      const copy = [...prev]
      const tasks = copy[cIdx].tasks
      copy[cIdx].tasks = [
        ...tasks,
        {
          id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 0,
          task: "",
          image: "",
          animateTo: { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } },
        },
      ]
      return copy
    })
  }

  const removeTask = (cIdx: number, tIdx: number) => {
    setContent((prev) => {
      const copy = [...prev]
      copy[cIdx].tasks = copy[cIdx].tasks.filter((_, i) => i !== tIdx)
      return copy
    })
  }

  // Save article
  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Zadejte prosím název článku")
      setActiveTab("settings")
      return
    }

    setSaving(true)
    const payload: ArticleCreateProps = {
      language,
      title: name,
      description,
      premiumOnly,
      templateId: template,
      publicationType,
      publicationFrom: publicateFrom,
      content: JSON.stringify(content),
      subjects: JSON.stringify(subjects),
      publicationTo: publicateTo,
      publicationFromDays: publicateFromDays,
      allowComments,
      titleImage,
      articleTypeOption,
      banner,
    }

    try {
      if (articleId !== undefined) {
        const updatePayload: ArticleUpdateType = {
          ...payload,
          id: articleId,
        }
        await updateArticle(updatePayload)
        toast.success("Článek byl úspěšně upraven")
      } else {
        const res = await createArticle(payload)
        if (res?.data?.article_id) {
          setArticleId(res.data.article_id)
          toast.success("Článek byl úspěšně vytvořen")
          navigate(`/articles/edit/${res.data.article_id}`, { replace: true })
        } else {
          toast.success("Článek byl vytvořen")
          navigate("/articles")
        }
      }
    } catch (err) {
      console.error("Save error", err)
      toast.error("Chyba při ukládání článku")
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
    <div className="space-y-6 pb-20">
      {/* Top action bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon">
            <Link to="/articles">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isEditing ? `Upravit článek: ${name || "Bez názvu"}` : "Nový článek"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isEditing ? `ID článku: ${articleId}` : "Vytvoření nového článku"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {articleId && (
            <>
              <Button asChild variant="outline" size="sm">
                <Link to={`/article/translate/${articleId}`}>
                  <Languages className="size-4" />
                  Překlady
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to={`/article/share/${articleId}`}>
                  <Share2 className="size-4" />
                  Sdílet
                </Link>
              </Button>
            </>
          )}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {saving ? "Ukládání..." : "Uložit článek"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 sm:w-[400px]">
          <TabsTrigger value="settings">Nastavení a šablona</TabsTrigger>
          <TabsTrigger value="content">Obsah a kapitoly</TabsTrigger>
        </TabsList>

        {/* TAB 1: Settings & Template */}
        <TabsContent value="settings" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Základní údaje</CardTitle>
              <CardDescription>
                Název, perex, jazyk a zařazení článku
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="article-title">Název článku *</Label>
                <Input
                  id="article-title"
                  placeholder="Jak nakoupit Bitcoin krok za krokem..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="article-desc">Perex / Krátký popis</Label>
                <Textarea
                  id="article-desc"
                  placeholder="V tomto článku si ukážeme, jak začít..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Jazyk článku</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Vyberte jazyk" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLanguages.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          {lang.name} ({lang.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Typ článku</Label>
                  <Select
                    value={articleTypeOption}
                    onValueChange={(val) =>
                      setArticleTypeOption(val as "article" | "new")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {articleTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                {/* Banner image */}
                <div className="space-y-2">
                  <Label>Banner / Úvodní obrázek</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOpenPicker({ type: "banner" })}
                      className="flex-1 justify-start gap-2 truncate"
                    >
                      <ImageIcon className="size-4 shrink-0" />
                      <span className="truncate">
                        {banner || "Vybrat obrázek z knihovny"}
                      </span>
                    </Button>
                    {banner && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setBanner("")}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  {banner && (
                    <div className="mt-2 h-24 w-40 overflow-hidden rounded-md border border-border">
                      <img
                        src={`${imageURL}${banner}`}
                        alt="Náhled banneru"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Title image (for template) */}
                <div className="space-y-2">
                  <Label>Titulní obrázek šablony</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOpenPicker({ type: "titleImage" })}
                      className="flex-1 justify-start gap-2 truncate"
                    >
                      <ImageIcon className="size-4 shrink-0" />
                      <span className="truncate">
                        {titleImage || "Vybrat titulní obrázek"}
                      </span>
                    </Button>
                    {titleImage && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setTitleImage("")}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  {titleImage && (
                    <div className="mt-2 h-24 w-40 overflow-hidden rounded-md border border-border">
                      <img
                        src={`${imageURL}${titleImage}`}
                        alt="Náhled titulního motivu"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Premium článek</Label>
                    <p className="text-muted-foreground text-xs">
                      Přístupný pouze pro platící uživatele
                    </p>
                  </div>
                  <Switch
                    checked={premiumOnly}
                    onCheckedChange={setPremiumOnly}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Povolit komentáře</Label>
                    <p className="text-muted-foreground text-xs">
                      Čtenáři mohou přidávat komentáře pod článek
                    </p>
                  </div>
                  <Switch
                    checked={allowComments}
                    onCheckedChange={setAllowComments}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Publication schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" />
                Plánování publikace
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Režim publikace</Label>
                <Select
                  value={String(publicationType)}
                  onValueChange={(val) => setPublicationType(parseInt(val, 10))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {publicationOptions.map((opt) => (
                      <SelectItem key={opt.id} value={String(opt.id)}>
                        {opt.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {(publicationType === 1 || publicationType === 3) && (
                <div className="space-y-2">
                  <Label>Publikovat od data</Label>
                  <Input
                    type="date"
                    value={publicateFrom}
                    onChange={(e) => setPublicateFrom(e.target.value)}
                  />
                </div>
              )}

              {(publicationType === 2 || publicationType === 3) && (
                <div className="space-y-2">
                  <Label>Publikovat do data</Label>
                  <Input
                    type="date"
                    value={publicateTo}
                    onChange={(e) => setPublicateTo(e.target.value)}
                  />
                </div>
              )}

              {publicationType === 4 && (
                <div className="space-y-2">
                  <Label>Počet dní od registrace</Label>
                  <Input
                    type="number"
                    value={publicateFromDays ?? 0}
                    onChange={(e) =>
                      setPublicateFromDays(parseInt(e.target.value, 10))
                    }
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Šablona rozvržení</CardTitle>
              <CardDescription>
                Zvolte vizuální šablonu, podle které bude článek rozvržen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ArticleTemplates
                selected={template}
                setSelected={setTemplate}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: Content & Subjects */}
        <TabsContent value="content" className="space-y-6 pt-4">
          {/* Subjects (Kapitoly / Témata) */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Témata a kapitoly (Subjects)</CardTitle>
                <CardDescription>
                  Hlavní textové bloky článku a jejich odstavce
                </CardDescription>
              </div>
              <Button type="button" size="sm" onClick={addSubject}>
                <Plus className="size-4" />
                Přidat téma
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjects.map((subj, index) => (
                <div
                  key={subj.id || index}
                  className="space-y-3 rounded-lg border border-border p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground text-xs font-semibold uppercase">
                      Kapitola #{index + 1}
                    </span>
                    {subjects.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        className="text-destructive"
                        onClick={() => removeSubject(index)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    )}
                  </div>

                  <Input
                    placeholder="Název kapitoly (např. Úvod do obchodování)"
                    value={subj.title}
                    onChange={(e) => updateSubject(index, "title", e.target.value)}
                  />

                  <Textarea
                    placeholder="Podrobný text kapitoly..."
                    value={subj.text}
                    onChange={(e) => updateSubject(index, "text", e.target.value)}
                    rows={4}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Content sections with tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Bloky úkolů a kroků (Tasks & Animations)</CardTitle>
                <CardDescription>
                  Jednotlivé kroky s obrázky a animačními body pro interaktivní
                  šablony
                </CardDescription>
              </div>
              <Button type="button" size="sm" onClick={addContentSection}>
                <Plus className="size-4" />
                Přidat blok úkolů
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.map((sec, cIdx) => (
                <div
                  key={sec.id || cIdx}
                  className="space-y-4 rounded-lg border bg-muted/20 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Input
                      placeholder="Nadpis bloku úkolů"
                      value={sec.title}
                      onChange={(e) => {
                        const val = e.target.value
                        setContent((prev) => {
                          const copy = [...prev]
                          copy[cIdx].title = val
                          return copy
                        })
                      }}
                      className="max-w-md font-semibold"
                    />

                    {content.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => removeContentSection(cIdx)}
                      >
                        <Trash2 className="size-4" />
                        Odstranit blok
                      </Button>
                    )}
                  </div>

                  {/* Tasks inside this section */}
                  <div className="space-y-3 pl-2">
                    {sec.tasks.map((task, tIdx) => (
                      <div
                        key={task.id || tIdx}
                        className="grid grid-cols-1 items-start gap-3 rounded-md border bg-background p-3 sm:grid-cols-12"
                      >
                        <div className="space-y-1 sm:col-span-6">
                          <Label className="text-xs">Popis kroku #{tIdx + 1}</Label>
                          <Textarea
                            placeholder="Instrukce kroku..."
                            value={task.task}
                            onChange={(e) => {
                              const val = e.target.value
                              setContent((prev) => {
                                const copy = [...prev]
                                copy[cIdx].tasks[tIdx].task = val
                                return copy
                              })
                            }}
                            rows={2}
                          />
                        </div>

                        <div className="space-y-1 sm:col-span-5">
                          <Label className="text-xs">Obrázek kroku</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="w-full justify-start truncate text-xs"
                              onClick={() =>
                                handleOpenPicker({
                                  type: "task",
                                  contentIndex: cIdx,
                                  taskIndex: tIdx,
                                })
                              }
                            >
                              <ImageIcon className="size-3.5 shrink-0" />
                              <span className="truncate">
                                {task.image || "Vybrat obrázek"}
                              </span>
                            </Button>
                            {task.image && (
                              <div className="size-8 shrink-0 overflow-hidden rounded border">
                                <img
                                  src={`${imageURL}${task.image}`}
                                  alt="task"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end sm:col-span-1 sm:pt-6">
                          {sec.tasks.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              className="text-destructive"
                              onClick={() => removeTask(cIdx, tIdx)}
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTask(cIdx)}
                    >
                      <Plus className="size-3.5" />
                      Přidat krok
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating Bottom Bar for Quick Save */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/articles">Zpět na přehled</Link>
          </Button>

          <Button onClick={handleSave} disabled={saving} size="sm">
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Check className="size-4" />
            )}
            {saving ? "Ukládání..." : "Uložit článek"}
          </Button>
        </div>
      </div>

      {/* Image Picker Dialog */}
      <ImagePickerModal
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={handleSelectImage}
      />
    </div>
  )
}
