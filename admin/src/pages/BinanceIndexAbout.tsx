import { useState, type FC, type FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Info, Pencil, Save, Search } from "lucide-react"
import {
  getBinanceIndexAbouts,
  updateBinanceIndexAbout,
} from "@/utils/api/binanceIndexService.ts"
import type { BinanceIndexType } from "@/utils/types/binanceIndex.ts"
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
import { Skeleton } from "@/components/ui/skeleton.tsx"

const BINANCE_INDEX_QUERY_KEY = ["admin", "binanceIndexAbout"]

export const BinanceIndexAbout: FC = () => {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [editingItem, setEditingItem] = useState<BinanceIndexType | null>(null)
  const [editAboutText, setEditAboutText] = useState("")

  const {
    data: indexes = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: BINANCE_INDEX_QUERY_KEY,
    queryFn: getBinanceIndexAbouts,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, about }: { id: number; about: string }) =>
      updateBinanceIndexAbout(id, about),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: BINANCE_INDEX_QUERY_KEY,
      })
      toast.success("Popis indexu byl úspěšně uložen")
      setEditingItem(null)
    },
    onError: () => toast.error("Nepodařilo se uložit popis indexu"),
  })

  const filtered = indexes.filter((item) => {
    if (!searchTerm.trim()) return true
    const term = searchTerm.toLowerCase()
    return (
      item.name.toLowerCase().includes(term) ||
      item.label.toLowerCase().includes(term) ||
      String(item.id).includes(term)
    )
  })

  const handleEditClick = (item: BinanceIndexType) => {
    setEditingItem(item)
    setEditAboutText(item.about || "")
  }

  const handleSaveSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    updateMutation.mutate({ id: editingItem.id, about: editAboutText })
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Správa popisu Binance indexů</h1>
        <p className="text-sm text-muted-foreground">
          Editace textových informací a vysvětlení jednotlivých indexů
        </p>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Informace o indexech se nepodařilo načíst.
        </p>
      )}

      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Hledat index podle názvu nebo štítku..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-48">Název</TableHead>
              <TableHead className="w-40">Štítek (Label)</TableHead>
              <TableHead>Popis (O indexu)</TableHead>
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
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-4 w-12" />
                  </TableCell>
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  Žádné indexy nenalezeny.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs">{item.id}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-mono text-xs font-semibold">
                    {item.label}
                  </TableCell>
                  <TableCell>
                    <p className="line-clamp-2 text-sm">
                      {item.about || (
                        <span className="text-muted-foreground italic">
                          Bez popisu
                        </span>
                      )}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(item)}
                    >
                      <Pencil className="size-3.5" />
                      Upravit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={editingItem !== null}
        onOpenChange={(open) => !open && setEditingItem(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="size-5" />
              Popis indexu: {editingItem?.name} ({editingItem?.label})
            </DialogTitle>
          </DialogHeader>
          {editingItem && (
            <form onSubmit={handleSaveSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="index-about">Text popisu indexu</Label>
                <Textarea
                  id="index-about"
                  value={editAboutText}
                  onChange={(e) => setEditAboutText(e.target.value)}
                  placeholder="Zadejte podrobný popis indexu, strategii, metodiku výpočtu..."
                  rows={6}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingItem(null)}
                >
                  Zrušit
                </Button>
                <Button type="submit" disabled={updateMutation.isPending}>
                  <Save className="size-4" />
                  {updateMutation.isPending ? "Ukládání..." : "Uložit popis"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
