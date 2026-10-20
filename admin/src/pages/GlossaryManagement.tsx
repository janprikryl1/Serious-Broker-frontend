import { useState, type FC, type ChangeEvent, type FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  ExternalLink,
  Image as ImageIcon,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"
import {
  addGlossary,
  deleteGlossary,
  editGlossary,
  getGlossary,
} from "@/utils/api/glossaryService.ts"
import { glossaryImagesURL } from "@/utils/constants/media.ts"
import type { GlossaryType } from "@/utils/types/glossary.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Label } from "@/components/ui/label.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
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
import { Skeleton } from "@/components/ui/skeleton.tsx"

const GLOSSARY_QUERY_KEY = ["admin", "glossary"]

export const GlossaryManagement: FC = () => {
  const queryClient = useQueryClient()
  const [editingItem, setEditingItem] = useState<GlossaryType | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  // New item form state
  const [newTitle, setNewTitle] = useState("")
  const [newTitleCs, setNewTitleCs] = useState("")
  const [newAnswer, setNewAnswer] = useState("")
  const [newAnswerCs, setNewAnswerCs] = useState("")
  const [newImageFile, setNewImageFile] = useState<File | null>(null)

  // Edit item form state
  const [editImageFile, setEditImageFile] = useState<File | null>(null)

  const {
    data: glossaries = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: GLOSSARY_QUERY_KEY,
    queryFn: getGlossary,
  })

  const addMutation = useMutation({
    mutationFn: addGlossary,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: GLOSSARY_QUERY_KEY })
      toast.success("Pojem přidán do slovníku")
      setIsAddOpen(false)
      setNewTitle("")
      setNewTitleCs("")
      setNewAnswer("")
      setNewAnswerCs("")
      setNewImageFile(null)
    },
    onError: () => toast.error("Nepodařilo se přidat pojem"),
  })

  const editMutation = useMutation({
    mutationFn: ({ item, file }: { item: GlossaryType; file: File | null }) =>
      editGlossary(item, file),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: GLOSSARY_QUERY_KEY })
      toast.success("Pojem upraven")
      setEditingItem(null)
      setEditImageFile(null)
    },
    onError: () => toast.error("Nepodařilo se upravit pojem"),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteGlossary,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: GLOSSARY_QUERY_KEY })
      toast.success("Pojem smazán")
      setDeletingId(null)
    },
    onError: () => toast.error("Nepodařilo se smazat pojem"),
  })

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) {
      toast.error("Vyplňte název pojmu")
      return
    }
    addMutation.mutate({
      title: newTitle,
      title_cs: newTitleCs,
      answer: newAnswer,
      answer_cs: newAnswerCs,
      imageFile: newImageFile,
    })
  }

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    editMutation.mutate({ item: editingItem, file: editImageFile })
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Správa slovníku</h1>
          <p className="text-sm text-muted-foreground">
            Výkladové pojmy a definice zobrazené na webu
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="size-4" />
          Přidat nový pojem
        </Button>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Pojmy slovníku se nepodařilo načíst.
        </p>
      )}

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-48">Název (EN)</TableHead>
              <TableHead className="w-48">Název (CZ)</TableHead>
              <TableHead>Definice</TableHead>
              <TableHead className="w-24">Obrázek</TableHead>
              <TableHead className="w-24 text-right">Akce</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                </TableRow>
              ))
            ) : glossaries.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-muted-foreground"
                >
                  Ve slovníku nejsou žádné záznamy.
                </TableCell>
              </TableRow>
            ) : (
              glossaries.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs">{item.id}</TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.title_cs || "—"}
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="line-clamp-2 text-sm">{item.answer}</p>
                    {item.answer_cs && (
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {item.answer_cs}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.image ? (
                      <a
                        href={`${glossaryImagesURL}${item.image}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <ImageIcon className="size-3.5" />
                        <ExternalLink className="size-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingItem({ ...item })
                          setEditImageFile(null)
                        }}
                        aria-label="Upravit"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeletingId(item.id)}
                        aria-label="Smazat"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Nový pojem do slovníku</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="add-title">Název (EN)</Label>
                <Input
                  id="add-title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Bitcoin"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="add-title-cs">Název (CZ)</Label>
                <Input
                  id="add-title-cs"
                  value={newTitleCs}
                  onChange={(e) => setNewTitleCs(e.target.value)}
                  placeholder="Bitcoin"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-answer">Definice (EN)</Label>
              <Textarea
                id="add-answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Definition of term..."
                rows={3}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-answer-cs">Definice (CZ)</Label>
              <Textarea
                id="add-answer-cs"
                value={newAnswerCs}
                onChange={(e) => setNewAnswerCs(e.target.value)}
                placeholder="Definice pojmu..."
                rows={3}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-image">Obrázek (volitelně)</Label>
              <Input
                id="add-image"
                type="file"
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewImageFile(e.target.files?.[0] || null)
                }
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddOpen(false)}
              >
                Zrušit
              </Button>
              <Button type="submit" disabled={addMutation.isPending}>
                {addMutation.isPending ? "Ukládání..." : "Přidat"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editingItem !== null}
        onOpenChange={(open) => !open && setEditingItem(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Upravit pojem</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-title">Název (EN)</Label>
                  <Input
                    id="edit-title"
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit-title-cs">Název (CZ)</Label>
                  <Input
                    id="edit-title-cs"
                    value={editingItem.title_cs || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        title_cs: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-answer">Definice (EN)</Label>
                <Textarea
                  id="edit-answer"
                  value={editingItem.answer}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, answer: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-answer-cs">Definice (CZ)</Label>
                <Textarea
                  id="edit-answer-cs"
                  value={editingItem.answer_cs || ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      answer_cs: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-image">Změnit obrázek</Label>
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditImageFile(e.target.files?.[0] || null)
                  }
                />
                {editingItem.image && !editImageFile && (
                  <p className="text-xs text-muted-foreground">
                    Aktuální soubor: {editingItem.image}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingItem(null)}
                >
                  Zrušit
                </Button>
                <Button type="submit" disabled={editMutation.isPending}>
                  {editMutation.isPending ? "Ukládání..." : "Uložit"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deletingId !== null}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Opravdu smazat tento pojem?</AlertDialogTitle>
            <AlertDialogDescription>
              Tuto akci nelze vrátit zpět. Pojem bude trvale odstraněn ze
              slovníku.
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
