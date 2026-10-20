import {
  useState,
  useMemo,
  useDeferredValue,
  type FC,
  type ChangeEvent,
  type FormEvent,
} from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
  Image as ImageIcon,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react"
import {
  cryptoCurrencyAdd,
  cryptoCurrencyUpdate,
  deleteCryptocurrency,
  getAllCryptocurrencies,
  stylizedImageUpdate,
} from "@/utils/api/cryptocurrencyService.ts"
import { coinURL, logURL } from "@/utils/constants/media.ts"
import type {
  CryptoCurrencyNewType,
  CryptoCurrencyType,
} from "@/utils/types/cryptocurrency.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
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

const COINS_QUERY_KEY = ["admin", "coins"]

const initialNewCoin: CryptoCurrencyNewType = {
  id: 0,
  name: "",
  symbol: "",
  price: 0,
  marketcap: "",
  category: "",
  max_supply: 0,
  circulating_supply: "",
  website: "",
  whitepaper: "",
  reddit: "",
  twitter: "",
  telegram: "",
  cmc_rank: 0,
  date: new Date().toISOString().split("T")[0],
  photo: null,
  stylized_image_file: null,
}

export const CoinSettings: FC = () => {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState("")
  const [pageSize, setPageSize] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const deferredSearch = useDeferredValue(searchTerm)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingCoin, setEditingCoin] = useState<CryptoCurrencyType | null>(
    null
  )
  const [deletingId, setDeletingId] = useState<number | null>(null)

  // Edit file states
  const [editPhotoFile, setEditPhotoFile] = useState<File | null>(null)
  const [editStylizedFile, setEditStylizedFile] = useState<File | null>(null)

  // New coin state
  const [newCoin, setNewCoin] = useState<CryptoCurrencyNewType>(initialNewCoin)

  const {
    data: coins = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: COINS_QUERY_KEY,
    queryFn: getAllCryptocurrencies,
  })

  const addMutation = useMutation({
    mutationFn: cryptoCurrencyAdd,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: COINS_QUERY_KEY })
      toast.success("Kryptoměna vytvořena")
      setIsAddOpen(false)
      setNewCoin(initialNewCoin)
    },
    onError: () => toast.error("Nepodařilo se vytvořit kryptoměnu"),
  })

  const updateMutation = useMutation({
    mutationFn: async ({
      coin,
      photo,
      stylized,
    }: {
      coin: CryptoCurrencyType
      photo: File | null
      stylized: File | null
    }) => {
      await cryptoCurrencyUpdate({
        ...coin,
        photo,
        stylized_image: coin.stylized_image || "",
      })
      if (stylized) {
        await stylizedImageUpdate(coin.id, coin.name, coin.symbol, stylized)
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: COINS_QUERY_KEY })
      toast.success("Kryptoměna aktualizována")
      setEditingCoin(null)
      setEditPhotoFile(null)
      setEditStylizedFile(null)
    },
    onError: () => toast.error("Nepodařilo se aktualizovat kryptoměnu"),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCryptocurrency,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: COINS_QUERY_KEY })
      toast.success("Kryptoměna smazána")
      setDeletingId(null)
    },
    onError: () => toast.error("Nepodařilo se smazat kryptoměnu"),
  })

  const filteredCoins = useMemo(() => {
    if (!deferredSearch.trim()) return coins
    const term = deferredSearch.toLowerCase()
    return coins.filter((coin) => {
      const name = coin.name || ""
      const symbol = coin.symbol || ""
      const id = String(coin.id)
      return (
        name.toLowerCase().includes(term) ||
        symbol.toLowerCase().includes(term) ||
        id.includes(term)
      )
    })
  }, [coins, deferredSearch])

  const totalPages = Math.max(1, Math.ceil(filteredCoins.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedCoins = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize
    return filteredCoins.slice(start, start + pageSize)
  }, [filteredCoins, safeCurrentPage, pageSize])

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!editingCoin) return
    updateMutation.mutate({
      coin: editingCoin,
      photo: editPhotoFile,
      stylized: editStylizedFile,
    })
  }

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!newCoin.name.trim() || !newCoin.symbol.trim()) {
      toast.error("Vyplňte název i symbol")
      return
    }
    addMutation.mutate(newCoin)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Nastavení kryptoměn</h1>
          <p className="text-sm text-muted-foreground">
            Správa seznamu kryptoměn, ikon a grafických podkladů
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline">
            <a href={logURL} target="_blank" rel="noreferrer">
              <ExternalLink className="size-4" />
              Záznam do logu
            </a>
          </Button>
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="size-4" />
            Přidat novou minci
          </Button>
        </div>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Kryptoměny se nepodařilo načíst.
        </p>
      )}

      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Hledat minci podle názvu, symbolu nebo ID..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Nalezeno: {filteredCoins.length.toLocaleString("cs-CZ")} z{" "}
          {coins.length.toLocaleString("cs-CZ")}
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Název</TableHead>
              <TableHead className="w-28">Symbol</TableHead>
              <TableHead className="w-32">Ikona</TableHead>
              <TableHead className="w-36">Stylizovaný obrázek</TableHead>
              <TableHead className="w-24 text-right">Akce</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredCoins.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-muted-foreground"
                >
                  Žádné kryptoměny nenalezeny.
                </TableCell>
              </TableRow>
            ) : (
              paginatedCoins.map((coin) => (
                <TableRow key={coin.id}>
                  <TableCell className="font-mono text-xs">{coin.id}</TableCell>
                  <TableCell className="font-medium">{coin.name}</TableCell>
                  <TableCell className="font-mono text-xs font-semibold">
                    {coin.symbol}
                  </TableCell>
                  <TableCell>
                    {coin.photo ? (
                      <a
                        href={`${coinURL}${coin.photo}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <ImageIcon className="size-3.5" />
                        Zobrazit
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {coin.stylized_image ? (
                      <a
                        href={`${coinURL}${coin.stylized_image}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <ImageIcon className="size-3.5" />
                        Obrázek
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
                          setEditingCoin({ ...coin })
                          setEditPhotoFile(null)
                          setEditStylizedFile(null)
                        }}
                        aria-label="Upravit"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeletingId(coin.id)}
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

      {/* Pagination Controls */}
      {filteredCoins.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>
              Zobrazeno{" "}
              <strong className="text-foreground">
                {(safeCurrentPage - 1) * pageSize + 1}–
                {Math.min(safeCurrentPage * pageSize, filteredCoins.length)}
              </strong>{" "}
              z{" "}
              <strong className="text-foreground">
                {filteredCoins.length.toLocaleString("cs-CZ")}
              </strong>{" "}
              kryptoměn
            </span>
            <span className="opacity-40">•</span>
            <span>Na stránku:</span>
            <div className="flex items-center gap-1">
              {[25, 50, 100, 200].map((size) => (
                <Button
                  key={size}
                  variant={pageSize === size ? "default" : "outline"}
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => {
                    setPageSize(size)
                    setCurrentPage(1)
                  }}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setCurrentPage(1)}
              disabled={safeCurrentPage <= 1}
              title="První stránka"
              aria-label="První stránka"
            >
              <ChevronsLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage <= 1}
              title="Předchozí stránka"
              aria-label="Předchozí stránka"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="px-3 text-xs font-medium">
              Stránka {safeCurrentPage} z {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage >= totalPages}
              title="Další stránka"
              aria-label="Další stránka"
            >
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setCurrentPage(totalPages)}
              disabled={safeCurrentPage >= totalPages}
              title="Poslední stránka"
              aria-label="Poslední stránka"
            >
              <ChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Edit Coin Dialog */}
      <Dialog
        open={editingCoin !== null}
        onOpenChange={(open) => !open && setEditingCoin(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upravit kryptoměnu #{editingCoin?.id}</DialogTitle>
          </DialogHeader>
          {editingCoin && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="coin-name">Název</Label>
                  <Input
                    id="coin-name"
                    value={editingCoin.name}
                    onChange={(e) =>
                      setEditingCoin({ ...editingCoin, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="coin-sym">Symbol</Label>
                  <Input
                    id="coin-sym"
                    value={editingCoin.symbol}
                    onChange={(e) =>
                      setEditingCoin({ ...editingCoin, symbol: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="coin-photo">Nahrát novou ikonu</Label>
                <Input
                  id="coin-photo"
                  type="file"
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditPhotoFile(e.target.files?.[0] || null)
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="coin-stylized">Stylizovaný obrázek</Label>
                <Input
                  id="coin-stylized"
                  type="file"
                  accept="image/*"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditStylizedFile(e.target.files?.[0] || null)
                  }
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingCoin(null)}
                >
                  Zrušit
                </Button>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Ukládání..." : "Uložit"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Coin Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Přidat novou kryptoměnu</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="new-name">Název</Label>
                <Input
                  id="new-name"
                  value={newCoin.name}
                  onChange={(e) =>
                    setNewCoin({ ...newCoin, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-sym">Symbol</Label>
                <Input
                  id="new-sym"
                  value={newCoin.symbol}
                  onChange={(e) =>
                    setNewCoin({ ...newCoin, symbol: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="new-price">Cena (USD)</Label>
                <Input
                  id="new-price"
                  type="number"
                  step="any"
                  value={newCoin.price}
                  onChange={(e) =>
                    setNewCoin({ ...newCoin, price: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-cat">Kategorie</Label>
                <Input
                  id="new-cat"
                  value={newCoin.category}
                  onChange={(e) =>
                    setNewCoin({ ...newCoin, category: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="new-cap">Tržní kapitalizace</Label>
                <Input
                  id="new-cap"
                  value={newCoin.marketcap}
                  onChange={(e) =>
                    setNewCoin({ ...newCoin, marketcap: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-rank">CMC Rank</Label>
                <Input
                  id="new-rank"
                  type="number"
                  value={newCoin.cmc_rank}
                  onChange={(e) =>
                    setNewCoin({
                      ...newCoin,
                      cmc_rank: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-photo">Ikona mince</Label>
              <Input
                id="new-photo"
                type="file"
                accept="image/*"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewCoin({
                    ...newCoin,
                    photo: e.target.files?.[0] || null,
                  })
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-web">Webové stránky</Label>
              <Input
                id="new-web"
                value={newCoin.website}
                onChange={(e) =>
                  setNewCoin({ ...newCoin, website: e.target.value })
                }
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddOpen(false)}
              >
                Zrušit
              </Button>
              <Button type="submit" disabled={addMutation.isPending}>
                {addMutation.isPending ? "Ukládání..." : "Vytvořit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deletingId !== null}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Smazat kryptoměnu?</AlertDialogTitle>
            <AlertDialogDescription>
              Tuto akci nelze vrátit zpět. Kryptoměna bude trvale odstraněna.
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
