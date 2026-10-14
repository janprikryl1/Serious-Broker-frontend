import { useCallback, useEffect, useState, type FC } from "react"
import { useDropzone } from "react-dropzone"
import { Loader2, Upload, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { getImages, uploadImage } from "@/utils/api/imageService.ts"
import { imageURL } from "@/utils/constants/media.ts"
import type { ImageListItemDto } from "@/utils/types/article.ts"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx"
import { ScrollArea } from "@/components/ui/scroll-area.tsx"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (imageName: string) => void
}

export const ImagePickerModal: FC<Props> = ({
  open,
  onOpenChange,
  onSelect,
}) => {
  const [images, setImages] = useState<ImageListItemDto[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const loadImages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getImages()
      if (res?.data) {
        setImages(res.data)
      }
    } catch (err) {
      console.error("Failed to load images", err)
      toast.error("Nepodařilo se načíst uložené obrázky")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (open) {
      loadImages()
    }
  }, [open, loadImages])

  const handleUpload = useCallback(async (file: File) => {
    const formData = new FormData()
    formData.append("image", file)
    setUploading(true)
    try {
      await uploadImage(formData)
      toast.success(`Obrázek ${file.name} byl úspěšně nahrán`)
      await loadImages()
    } catch (err) {
      console.error("Upload error", err)
      toast.error("Chyba při nahrávání obrázku")
    } finally {
      setUploading(false)
    }
  }, [loadImages])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        handleUpload(file)
      }
    },
    [handleUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"] },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="size-5" />
            Správce obrázků
          </DialogTitle>
        </DialogHeader>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50 bg-muted/40"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="text-muted-foreground mb-2 size-8" />
          <p className="text-sm font-medium">
            {isDragActive
              ? "Přetáhněte sem soubory..."
              : "Přetáhněte obrázky sem nebo klikněte pro výběr"}
          </p>
          <p className="text-muted-foreground text-xs">
            PNG, JPG, WEBP, GIF, SVG
          </p>
          {uploading && (
            <div className="text-primary mt-2 flex items-center gap-2 text-sm">
              <Loader2 className="size-4 animate-spin" />
              Nahrávám obrázek...
            </div>
          )}
        </div>

        {/* Image Grid */}
        <ScrollArea className="h-96 pr-4">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="text-muted-foreground size-8 animate-spin" />
            </div>
          ) : images.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center text-sm">
              Zatím žádné nahrané obrázky.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {images.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    onSelect(item.image)
                    onOpenChange(false)
                  }}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted/50 p-1 text-left transition-all hover:border-primary hover:shadow-md"
                >
                  <img
                    src={`${imageURL}${item.image}`}
                    alt={item.image}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 truncate bg-background/80 p-1 text-[10px] text-foreground backdrop-blur-xs">
                    {item.image}
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
