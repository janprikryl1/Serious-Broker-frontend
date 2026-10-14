import { useState, useEffect, type FC } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Plus, Save, Trash2 } from "lucide-react"
import {
  deleteFormSetting,
  getFormSettings,
  saveFormSettings,
} from "@/utils/api/formsService.ts"
import type { EvaluationCategory } from "@/utils/types/forms.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { Label } from "@/components/ui/label.tsx"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"

const FORM_SETTINGS_KEY = ["admin", "formSettings"]

export const FormEvaluationSettings: FC = () => {
  const queryClient = useQueryClient()
  const [categories, setCategories] = useState<EvaluationCategory[]>([])

  const {
    data: fetchedCategories = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: FORM_SETTINGS_KEY,
    queryFn: getFormSettings,
  })

  useEffect(() => {
    if (fetchedCategories.length > 0) {
      setCategories(fetchedCategories)
    }
  }, [fetchedCategories])

  const saveMutation = useMutation({
    mutationFn: saveFormSettings,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: FORM_SETTINGS_KEY })
      toast.success("Nastavení vyhodnocení bylo uloženo")
    },
    onError: () => toast.error("Chyba při ukládání nastavení"),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteFormSetting,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: FORM_SETTINGS_KEY })
      toast.success("Kategorie vyhodnocení byla smazána")
    },
    onError: () => toast.error("Chyba při mazání kategorie"),
  })

  const handleAdd = () => {
    setCategories((prev) => [
      ...prev,
      { name: "", description: "", min_score: 0, max_score: 0 },
    ])
  }

  const handleChange = (
    index: number,
    field: keyof EvaluationCategory,
    value: string | number
  ) => {
    setCategories((prev) => {
      const updated = [...prev]
      updated[index] = {
        ...updated[index],
        [field]:
          field === "min_score" || field === "max_score"
            ? Number(value)
            : value,
      }
      return updated
    })
  }

  const handleDelete = async (index: number) => {
    const item = categories[index]
    if (item?.id) {
      deleteMutation.mutate(item.id)
    }
    setCategories((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    saveMutation.mutate(categories)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">
            Nastavení vyhodnocení dotazníků
          </h1>
          <p className="text-sm text-muted-foreground">
            Definice bodových pásem a výsledných investičních profilů
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleAdd}>
            <Plus className="size-4" />
            Přidat pásmo
          </Button>
          <Button onClick={handleSave} disabled={saveMutation.isPending}>
            <Save className="size-4" />
            {saveMutation.isPending ? "Ukládání..." : "Uložit změny"}
          </Button>
        </div>
      </header>

      {isError && (
        <p className="text-sm text-destructive">
          Nastavení se nepodařilo načíst.
        </p>
      )}

      {isPending ? (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : categories.length === 0 ? (
        <Card className="flex min-h-[200px] items-center justify-center border-dashed">
          <div className="py-6 text-center text-muted-foreground">
            <p>Žádná vyhodnocovací pásma. Klikněte na Přidat pásmo výše.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {categories.map((cat, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: category card
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-base">Pásmo #{index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(index)}
                  aria-label="Smazat pásmo"
                >
                  <Trash2 className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="space-y-1.5 sm:col-span-1">
                    <Label>Název profilu</Label>
                    <Input
                      value={cat.name}
                      onChange={(e) =>
                        handleChange(index, "name", e.target.value)
                      }
                      placeholder="např. Konzervativní investor"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label>Min. bodů</Label>
                    <Input
                      type="number"
                      value={cat.min_score}
                      onChange={(e) =>
                        handleChange(index, "min_score", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label>Max. bodů</Label>
                    <Input
                      type="number"
                      value={cat.max_score}
                      onChange={(e) =>
                        handleChange(index, "max_score", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Popis výsledku pro uživatele</Label>
                  <Textarea
                    value={cat.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    placeholder="Popis investičního stylu a doporučení..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
