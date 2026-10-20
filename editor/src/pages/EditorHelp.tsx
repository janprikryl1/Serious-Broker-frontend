import type { FC } from "react"
import { Link } from "react-router"
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Languages,
  Plus,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"

const steps = [
  {
    step: 1,
    title: "Založení článku",
    desc: "V sekci Články klikněte na tlačítko „Nový článek“. Otevře se formulář pro zadání základních údajů.",
  },
  {
    step: 2,
    title: "Zadání údajů a šablony",
    desc: "Zadejte název, úvodní perex, jazyk (výchozí čeština), zvolte typ článku (výukový vs aktualita) a vyberte z 5 vizuálních šablon rozvržení.",
  },
  {
    step: 3,
    title: "Nastavení publikace a médií",
    desc: "Zvolte datum publikace, případně označte článek jako Premium. Přes tlačítko „Vybrat obrázek z knihovny“ můžete nahrát nebo zvolit úvodní banner.",
  },
  {
    step: 4,
    title: "Tvorba kapitol a obsahu",
    desc: "V záložce „Obsah a kapitoly“ přidejte jednotlivé odstavce (Subjects) a bloky interaktivních kroků s doprovodnými obrázky a instrukcemi.",
  },
  {
    step: 5,
    title: "Uložení a distribuce",
    desc: "Klikněte na „Uložit článek“. Jakmile je článek vytvořen, můžete pro něj okamžitě generovat cizojazyčné překlady, sdílet odkaz na sociální sítě nebo rozeslat newsletter.",
  },
]

export const EditorHelp: FC = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link to="/articles">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nápověda pro editory</h1>
          <p className="text-muted-foreground text-sm">
            Průvodce tvorbou a správou článků v redakčním systému
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="size-5" />
            Jak vytvořit a publikovat článek
          </CardTitle>
          <CardDescription>
            Pět jednoduchých kroků od prvního konceptu po publikaci
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {steps.map((s) => (
              <div
                key={s.step}
                className="flex items-start gap-4 rounded-lg border p-4"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                  {s.step}
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold">{s.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button asChild>
              <Link to="/articles/new">
                <Plus className="size-4" />
                Vytvořit nový článek nyní
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="size-4" />
              Správa článků
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-xs">
              Přehled všech publikovaných i rozepsaných článků.
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/articles">Přejít na články</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="size-4" />
              Highlighty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-xs">
              Krátké zprávy a tipy pro čtenáře.
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/highlights">Přejít na highlighty</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Languages className="size-4" />
              Překlady
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-xs">
              Lokalizace do světových jazyků pomocí AI i ručně.
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/articles">Vybrat článek pro překlad</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
