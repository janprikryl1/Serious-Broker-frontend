import { useState, type FC, type ChangeEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router"
import { toast } from "sonner"
import {
  ChevronDown,
  ChevronUp,
  FileQuestion,
  GripVertical,
  Pencil,
  Plus,
  Settings,
  Trash2,
  Users,
} from "lucide-react"
import {
  deleteQuestion,
  getAllQuestions,
  saveOrder,
  saveQuestion,
} from "@/utils/api/formsService.ts"
import {
  QuestionType,
  type CategorizedQuestions,
  type Question,
  type QuestionOption,
} from "@/utils/types/forms.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Switch } from "@/components/ui/switch.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import { Card } from "@/components/ui/card.tsx"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx"
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { cn } from "@/lib/utils.ts"

const FORMS_QUERY_KEY = ["admin", "formQuestions"]

const CATEGORIES: (keyof CategorizedQuestions)[] = [
  "Jaký jsem investor",
  "Jak znám krypto",
  "Co mám nakupovat",
]

export const FormsOverview: FC = () => {
  const queryClient = useQueryClient()
  const [activeCategory, setActiveCategory] =
    useState<keyof CategorizedQuestions>("Jaký jsem investor")
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [editingCategory, setEditingCategory] = useState<string>("")
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)

  // Stav pro HTML5 drag & drop přeuspořádání
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const {
    data: questions = {
      "Jaký jsem investor": [],
      "Jak znám krypto": [],
      "Co mám nakupovat": [],
    },
    isPending,
    isError,
  } = useQuery({
    queryKey: FORMS_QUERY_KEY,
    queryFn: getAllQuestions,
  })

  const saveOrderMutation = useMutation({
    mutationFn: saveOrder,
    onSuccess: () => toast.success("Pořadí otázek uloženo"),
    onError: () => toast.error("Chyba při ukládání pořadí"),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: FORMS_QUERY_KEY })
      toast.success("Otázka smazána")
      setDeletingId(null)
    },
    onError: () => toast.error("Chyba při mazání otázky"),
  })

  const saveQuestionMutation = useMutation({
    mutationFn: async ({
      question,
      category,
      file,
    }: {
      question: Question
      category: string
      file: File | null
    }) => {
      const formData = new FormData()
      formData.append("id", String(question.id))
      formData.append("question_text", question.question_text)
      formData.append("description", question.description || "")
      formData.append("type", question.type)
      formData.append("required", question.required ? "1" : "0")
      formData.append("order", String(question.order))
      formData.append("category", category)
      formData.append("options", JSON.stringify(question.options || []))
      if (file) {
        formData.append("image", file)
      }
      return await saveQuestion(formData)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: FORMS_QUERY_KEY })
      toast.success("Otázka uložena")
      setEditingQuestion(null)
      setNewImageFile(null)
    },
    onError: () => toast.error("Nepodařilo se uložit otázku"),
  })

  const reorderQuestions = (oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) return
    const currentList = questions[activeCategory] || []
    if (
      oldIndex < 0 ||
      oldIndex >= currentList.length ||
      newIndex < 0 ||
      newIndex >= currentList.length
    ) {
      return
    }

    const copy = [...currentList]
    const [moved] = copy.splice(oldIndex, 1)
    copy.splice(newIndex, 0, moved)

    const updated = copy.map((q, idx) => ({
      ...q,
      order: idx + 1,
    }))

    queryClient.setQueryData(
      FORMS_QUERY_KEY,
      (prev: CategorizedQuestions | undefined) =>
        prev ? { ...prev, [activeCategory]: updated } : prev
    )

    saveOrderMutation.mutate(
      updated.map((q) => ({
        id: q.id,
        order: q.order,
        category: activeCategory,
      }))
    )
  }

  const handleMove = (index: number, direction: -1 | 1) => {
    reorderQuestions(index, index + direction)
  }

  const handleAddNewQuestion = (cat: keyof CategorizedQuestions) => {
    const list = questions[cat] || []
    const newQ: Question = {
      id: Date.now(),
      order: list.length + 1,
      type: QuestionType.text,
      required: true,
      question_text: "",
      description: null,
      image_url: null,
      options: [],
    }
    setEditingCategory(cat)
    setEditingQuestion(newQ)
    setNewImageFile(null)
  }

  const handleAddOption = () => {
    if (!editingQuestion) return
    const opts = editingQuestion.options || []
    setEditingQuestion({
      ...editingQuestion,
      options: [
        ...opts,
        { text: "", points: 0, explanation: "" } as QuestionOption,
      ],
    })
  }

  const handleUpdateOption = (
    idx: number,
    field: keyof QuestionOption,
    val: unknown
  ) => {
    if (!editingQuestion) return
    const opts = [...(editingQuestion.options || [])]
    opts[idx] = { ...opts[idx], [field]: val }
    setEditingQuestion({ ...editingQuestion, options: opts })
  }

  const handleRemoveOption = (idx: number) => {
    if (!editingQuestion) return
    setEditingQuestion({
      ...editingQuestion,
      options: (editingQuestion.options || []).filter((_, i) => i !== idx),
    })
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Správa dotazníků</h1>
          <p className="text-sm text-muted-foreground">
            Tvorba otázek investičního profilu a vyhodnocovacích dotazníků
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline">
            <Link to="/form_responses">
              <Users className="size-4" />
              Odpovědi uživatelů
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/form_evaulation_settings">
              <Settings className="size-4" />
              Nastavení vyhodnocení
            </Link>
          </Button>
        </div>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Otázky se nepodařilo načíst ze serveru.
        </p>
      )}

      <Tabs
        value={activeCategory}
        onValueChange={(val) =>
          setActiveCategory(val as keyof CategorizedQuestions)
        }
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            {CATEGORIES.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat} ({questions[cat]?.length || 0})
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            onClick={() => handleAddNewQuestion(activeCategory)}
            size="sm"
          >
            <Plus className="size-4" />
            Přidat otázku do této kategorie
          </Button>
        </div>

        {CATEGORIES.map((cat) => {
          const list = questions[cat] || []
          return (
            <TabsContent key={cat} value={cat} className="space-y-4 pt-3">
              {isPending ? (
                <div className="space-y-3">
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                </div>
              ) : list.length === 0 ? (
                <Card className="flex min-h-[160px] items-center justify-center border-dashed">
                  <div className="py-6 text-center text-muted-foreground">
                    <FileQuestion className="mx-auto mb-2 size-8 opacity-40" />
                    <p>Žádné otázky v této kategorii.</p>
                  </div>
                </Card>
              ) : (
                <div className="space-y-2">
                  {list.map((question, idx) => (
                    // biome-ignore lint/a11y/noStaticElementInteractions: draggable sortable list item
                    <div
                      key={question.id}
                      draggable
                      onDragStart={(e) => {
                        setDraggedIndex(idx)
                        e.dataTransfer.effectAllowed = "move"
                      }}
                      onDragOver={(e) => {
                        e.preventDefault()
                        e.dataTransfer.dropEffect = "move"
                        if (dragOverIndex !== idx) {
                          setDragOverIndex(idx)
                        }
                      }}
                      onDragEnd={() => {
                        setDraggedIndex(null)
                        setDragOverIndex(null)
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        if (draggedIndex !== null && draggedIndex !== idx) {
                          reorderQuestions(draggedIndex, idx)
                        }
                        setDraggedIndex(null)
                        setDragOverIndex(null)
                      }}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3 shadow-xs transition-all",
                        draggedIndex === idx && "opacity-40",
                        dragOverIndex === idx &&
                          draggedIndex !== idx &&
                          "border-primary ring-2 ring-primary/20"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
                          title="Přetažením změňte pořadí"
                        >
                          <GripVertical className="size-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              #{question.order} {question.question_text}
                            </span>
                            <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-secondary-foreground">
                              {question.type}
                            </span>
                            {question.required && (
                              <span className="text-xs font-semibold text-destructive">
                                *
                              </span>
                            )}
                          </div>
                          {question.description && (
                            <p className="text-xs text-muted-foreground">
                              {question.description}
                            </p>
                          )}
                          {question.options && question.options.length > 0 && (
                            <p className="mt-0.5 text-[11px] text-muted-foreground">
                              Možností: {question.options.length} (
                              {question.options.map((o) => o.text).join(", ")})
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          disabled={idx === 0}
                          onClick={() => handleMove(idx, -1)}
                          title="Posunout nahoru"
                          aria-label="Posunout nahoru"
                        >
                          <ChevronUp className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          disabled={idx === list.length - 1}
                          onClick={() => handleMove(idx, 1)}
                          title="Posunout dolů"
                          aria-label="Posunout dolů"
                        >
                          <ChevronDown className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={() => {
                            setEditingCategory(cat)
                            setEditingQuestion(question)
                            setNewImageFile(null)
                          }}
                          title="Upravit otázku"
                          aria-label="Upravit otázku"
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 text-destructive hover:text-destructive"
                          onClick={() => setDeletingId(question.id)}
                          title="Smazat otázku"
                          aria-label="Smazat otázku"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>

      {/* Edit / Add Question Dialog */}
      <Dialog
        open={editingQuestion !== null}
        onOpenChange={(open) => !open && setEditingQuestion(null)}
      >
        <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingQuestion?.question_text
                ? "Upravit otázku"
                : "Nová otázka"}
            </DialogTitle>
          </DialogHeader>
          {editingQuestion && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="q-text">Znění otázky</Label>
                <Input
                  id="q-text"
                  value={editingQuestion.question_text}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      question_text: e.target.value,
                    })
                  }
                  placeholder="např. Jak dlouho plánujete držet krypto?"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="q-desc">Doplňující vysvětlení</Label>
                <Textarea
                  id="q-desc"
                  value={editingQuestion.description || ""}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      description: e.target.value,
                    })
                  }
                  placeholder="Vysvětlení otázky..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Typ odpovědi</Label>
                  <Select
                    value={editingQuestion.type}
                    onValueChange={(val) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        type: val as QuestionType,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(QuestionType).map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <Switch
                    checked={editingQuestion.required}
                    onCheckedChange={(val) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        required: val,
                      })
                    }
                  />
                  <Label>Povinná odpověď</Label>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="q-img">Obrázek k otázce</Label>
                <Input
                  id="q-img"
                  type="file"
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewImageFile(e.target.files?.[0] || null)
                  }
                />
              </div>

              {/* Options for Select / Radio / Checkbox */}
              {(
                [
                  QuestionType.select,
                  QuestionType.radio,
                  QuestionType.checkbox,
                ] as QuestionType[]
              ).includes(editingQuestion.type) && (
                <div className="space-y-2 border-t pt-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">
                      Možnosti odpovědi
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddOption}
                    >
                      <Plus className="size-3.5" />
                      Přidat možnost
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(editingQuestion.options || []).map((opt, idx) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: option
                        key={idx}
                        className="flex items-center gap-2 rounded border border-border bg-card p-2 text-xs"
                      >
                        <Input
                          placeholder="Text možnosti"
                          value={opt.text}
                          onChange={(e) =>
                            handleUpdateOption(idx, "text", e.target.value)
                          }
                          className="flex-1"
                        />
                        <Input
                          placeholder="Body"
                          type="number"
                          value={opt.points ?? 0}
                          onChange={(e) =>
                            handleUpdateOption(
                              idx,
                              "points",
                              Number(e.target.value)
                            )
                          }
                          className="w-20"
                        />
                        <Input
                          placeholder="Vysvětlení"
                          value={opt.explanation || ""}
                          onChange={(e) =>
                            handleUpdateOption(
                              idx,
                              "explanation",
                              e.target.value
                            )
                          }
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-7 text-destructive"
                          onClick={() => handleRemoveOption(idx)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingQuestion(null)}
                >
                  Zrušit
                </Button>
                <Button
                  onClick={() =>
                    saveQuestionMutation.mutate({
                      question: editingQuestion,
                      category: editingCategory,
                      file: newImageFile,
                    })
                  }
                  disabled={
                    saveQuestionMutation.isPending ||
                    !editingQuestion.question_text.trim()
                  }
                >
                  {saveQuestionMutation.isPending ? "Ukládání..." : "Uložit"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Question Confirmation */}
      <AlertDialog
        open={deletingId !== null}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Smazat otázku?</AlertDialogTitle>
            <AlertDialogDescription>
              Tuto akci nelze vrátit zpět. Otázka bude smazána z dotazníku.
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
