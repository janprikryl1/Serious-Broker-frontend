import { useState, type FC } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Download, FileJson, Trash2 } from "lucide-react"
import {
  deleteCachedData,
  downloadFile,
  getAllCachedData,
} from "@/utils/api/cachedDataService.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"
import { Button } from "@/components/ui/button.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
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

const CACHE_QUERY_KEY = ["admin", "cachedData"]

export const CachedData: FC = () => {
  const queryClient = useQueryClient()
  const [deletingName, setDeletingName] = useState<string | null>(null)

  const {
    data: files = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: CACHE_QUERY_KEY,
    queryFn: getAllCachedData,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCachedData,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CACHE_QUERY_KEY })
      toast.success("Soubor mezipaměti byl smazán")
      setDeletingName(null)
    },
    onError: () => toast.error("Nepodařilo se smazat soubor"),
  })

  const handleDownload = async (name: string) => {
    try {
      const res = await downloadFile(name)
      if (res && res.status === 200) {
        const jsonString = JSON.stringify(res.data, null, 2)
        const blob = new Blob([jsonString], { type: "application/json" })
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
        toast.success(`Staženo: ${name}`)
      }
    } catch {
      toast.error("Chyba při stahování souboru")
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Uložená mezipaměť (Cache)</h1>
        <p className="text-sm text-muted-foreground">
          Vygenerovaná data a snímky Binance indexů uložené na serveru
        </p>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Soubory mezipaměti se nepodařilo načíst.
        </p>
      )}

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Název souboru</TableHead>
              <TableHead className="w-48">Vytvořeno</TableHead>
              <TableHead className="w-24 text-right">Akce</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-4 w-12" />
                  </TableCell>
                </TableRow>
              ))
            ) : files.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="py-8 text-center text-muted-foreground"
                >
                  Žádné soubory mezipaměti.
                </TableCell>
              </TableRow>
            ) : (
              files.map((file) => (
                <TableRow key={file.name}>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => handleDownload(file.name)}
                      className="flex items-center gap-2 font-mono text-xs font-medium text-primary hover:underline"
                    >
                      <FileJson className="size-4 shrink-0" />
                      {file.name}
                    </button>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {toCzechDateFormat(file.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(file.name)}
                        aria-label="Stáhnout"
                      >
                        <Download className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setDeletingName(file.name)}
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

      {/* Delete Confirmation */}
      <AlertDialog
        open={deletingName !== null}
        onOpenChange={(open) => !open && setDeletingName(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Smazat soubor mezipaměti?</AlertDialogTitle>
            <AlertDialogDescription>
              Tuto akci nelze vrátit zpět. Soubor &ldquo;{deletingName}&rdquo;
              bude trvale odstraněn ze serveru.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušit</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() =>
                deletingName && deleteMutation.mutate(deletingName)
              }
            >
              Smazat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
