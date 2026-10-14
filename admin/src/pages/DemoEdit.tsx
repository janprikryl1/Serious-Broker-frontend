import { useState, type FC, type FormEvent, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ArrowLeft, Clock, Plus, Save, Trash2 } from "lucide-react"
import { getDemoById, saveDemo } from "@/utils/api/demosService.ts"
import {
  WidgetsType,
  type DemoType,
  type DemoWidget,
} from "@/utils/types/demo.ts"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"

const initialDemo: DemoType = {
  name: "",
  description: "",
  time_of_replace: 5,
  widgets: [
    {
      type: WidgetsType.COINMARKETCUP_TOP_10,
      propertyId: "top10",
      visible: true,
    },
  ],
}

export const DemoEdit: FC = () => {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [demo, setDemo] = useState<DemoType>(initialDemo)

  const isEditing = Boolean(id)

  const { data: fetchedDemo, isPending } = useQuery({
    queryKey: ["admin", "demo", id],
    queryFn: () => (id ? getDemoById(id) : null),
    enabled: isEditing,
  })

  useEffect(() => {
    if (fetchedDemo) {
      setDemo(fetchedDemo)
    }
  }, [fetchedDemo])

  const saveMutation = useMutation({
    mutationFn: saveDemo,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin", "demos"] })
      toast.success("Demo prezentace byla uložena")
      navigate("/demos")
    },
    onError: () => toast.error("Nepodařilo se uložit demo prezentaci"),
  })

  const handleAddWidget = () => {
    setDemo((prev) => ({
      ...prev,
      widgets: [
        ...(prev.widgets || []),
        {
          type: WidgetsType.Image,
          propertyId: "",
          visible: true,
        },
      ],
    }))
  }

  const handleUpdateWidget = (
    index: number,
    field: keyof DemoWidget,
    value: unknown
  ) => {
    setDemo((prev) => {
      const updated = [...prev.widgets]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, widgets: updated }
    })
  }

  const handleRemoveWidget = (index: number) => {
    setDemo((prev) => ({
      ...prev,
      widgets: prev.widgets.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!demo.name.trim()) {
      toast.error("Zadejte název prezentace")
      return
    }
    saveMutation.mutate(demo)
  }

  if (isEditing && isPending) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      <header className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/demos")}
          aria-label="Zpět na přehled"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">
            {isEditing ? `Upravit demo: ${demo.name}` : "Nová demo prezentace"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Nastavení parametrů rotace a widgetů
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Základní informace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="demo-name">Název</Label>
              <Input
                id="demo-name"
                value={demo.name}
                onChange={(e) => setDemo({ ...demo, name: e.target.value })}
                placeholder="např. Hlavní přehled trhu"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="demo-desc">Popis</Label>
              <Textarea
                id="demo-desc"
                value={demo.description}
                onChange={(e) =>
                  setDemo({ ...demo, description: e.target.value })
                }
                placeholder="Stručný popis prezentace..."
                rows={2}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="demo-time" className="flex items-center gap-1.5">
                <Clock className="size-4" />
                Čas výměny widgetu (v sekundách)
              </Label>
              <Input
                id="demo-time"
                type="number"
                min={1}
                max={120}
                value={demo.time_of_replace}
                onChange={(e) =>
                  setDemo({
                    ...demo,
                    time_of_replace: Number(e.target.value) || 5,
                  })
                }
                className="max-w-xs"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Widgets section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-lg">Widgety v prezentaci</CardTitle>
              <CardDescription>
                Pořadí a konfigurace jednotlivých zobrazených karet
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddWidget}
            >
              <Plus className="size-4" />
              Přidat widget
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {demo.widgets.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                Žádné widgety. Klikněte na Přidat widget výše.
              </p>
            ) : (
              demo.widgets.map((widget, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: widget row
                  key={index}
                  className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3"
                >
                  <div className="min-w-40 flex-1">
                    <Label className="text-xs">Typ widgetu</Label>
                    <Select
                      value={widget.type}
                      onValueChange={(val) =>
                        handleUpdateWidget(index, "type", val as WidgetsType)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(WidgetsType).map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="min-w-40 flex-1">
                    <Label className="text-xs">
                      Identifikátor (ID / vlastnost)
                    </Label>
                    <Input
                      value={widget.propertyId}
                      onChange={(e) =>
                        handleUpdateWidget(index, "propertyId", e.target.value)
                      }
                      placeholder="ID článku / mince..."
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-5">
                    <Label className="text-xs">Viditelný</Label>
                    <Switch
                      checked={widget.visible}
                      onCheckedChange={(val) =>
                        handleUpdateWidget(index, "visible", val)
                      }
                    />
                  </div>

                  <div className="pt-5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-9 text-destructive hover:text-destructive"
                      onClick={() => handleRemoveWidget(index)}
                      aria-label="Odstranit widget"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/demos")}
          >
            Zrušit
          </Button>
          <Button type="submit" disabled={saveMutation.isPending}>
            <Save className="size-4" />
            {saveMutation.isPending ? "Ukládání..." : "Uložit prezentaci"}
          </Button>
        </div>
      </form>
    </div>
  )
}
