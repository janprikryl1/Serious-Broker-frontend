import {
  useState,
  type FC,
  type ChangeEvent,
  type FormEvent,
  useEffect,
} from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ExternalLink, QrCode, Save } from "lucide-react"
import { getQR, saveQRCode } from "@/utils/api/qrService.ts"
import { qrCodeImagesURL } from "@/utils/constants/media.ts"
import type { QRCodeType } from "@/utils/types/qrCode.ts"
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
import { Skeleton } from "@/components/ui/skeleton.tsx"

const QR_QUERY_KEY = ["admin", "qr"]

export const QRManagement: FC = () => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<Partial<QRCodeType>>({
    network: "",
    description: "",
    address_of_deposit: "",
  })
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const {
    data: qrData,
    isPending,
    isError,
  } = useQuery({
    queryKey: QR_QUERY_KEY,
    queryFn: getQR,
  })

  useEffect(() => {
    if (qrData) {
      setFormData({
        network: qrData.network || "",
        description: qrData.description || "",
        address_of_deposit: qrData.address_of_deposit || "",
      })
    }
  }, [qrData])

  const saveMutation = useMutation({
    mutationFn: () => saveQRCode(formData, newImageFile),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QR_QUERY_KEY })
      toast.success("Platební QR kód byl uložen")
      setNewImageFile(null)
    },
    onError: () => toast.error("Nepodařilo se uložit QR kód"),
  })

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setNewImageFile(file)
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    } else {
      setImagePreview(null)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    saveMutation.mutate()
  }

  const currentImageUrl =
    imagePreview || (qrData?.image ? `${qrCodeImagesURL}${qrData.image}` : null)

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Správa platebního QR kódu</h1>
        <p className="text-sm text-muted-foreground">
          Nastavení adresy peněženky, sítě a QR kódu pro příjem kryptoměnových
          plateb
        </p>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Informace o QR kódu se nepodařilo načíst.
        </p>
      )}

      {isPending ? (
        <Card className="max-w-2xl">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="size-5" />
                Platební údaje
              </CardTitle>
              <CardDescription>
                Tyto informace se zobrazují uživatelům při nákupu členství
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="qr-network">Kryptoměnová síť</Label>
                <Input
                  id="qr-network"
                  placeholder="např. USDT (TRC20) nebo Bitcoin (BTC)"
                  value={formData.network}
                  onChange={(e) =>
                    setFormData({ ...formData, network: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="qr-address">Adresa vkladu (peněženka)</Label>
                <Textarea
                  id="qr-address"
                  placeholder="Zadejte adresu kryptoměnové peněženky"
                  value={formData.address_of_deposit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address_of_deposit: e.target.value,
                    })
                  }
                  rows={2}
                  className="font-mono text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="qr-desc">Popis / Pokyny k platbě</Label>
                <Textarea
                  id="qr-desc"
                  placeholder="Doplňující informace pro plátce..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2 pt-2">
                <Label htmlFor="qr-image">Obrázek QR kódu</Label>
                <div className="flex flex-wrap items-center gap-4">
                  {currentImageUrl ? (
                    <div className="relative size-32 overflow-hidden rounded-lg border border-border bg-muted/40 p-1">
                      <img
                        src={currentImageUrl}
                        alt="QR kód"
                        className="size-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex size-32 items-center justify-center rounded-lg border border-dashed border-border bg-muted/20">
                      <QrCode className="size-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <Input
                      id="qr-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {qrData?.image && !newImageFile && (
                      <a
                        href={`${qrCodeImagesURL}${qrData.image}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <ExternalLink className="size-3" />
                        Zobrazit stávající obrázek v plné velikosti
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" disabled={saveMutation.isPending}>
            <Save className="size-4" />
            {saveMutation.isPending ? "Ukládání..." : "Uložit změny"}
          </Button>
        </form>
      )}
    </div>
  )
}
