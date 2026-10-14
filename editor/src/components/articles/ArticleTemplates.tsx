import type { FC } from "react"
import { cn } from "@/lib/utils.ts"
import { Card } from "@/components/ui/card.tsx"

type Props = {
  selected: number
  setSelected: (value: number) => void
}

const templates = [
  {
    id: 0,
    name: "Obrázek vlevo",
    description: "Sloupec s obrázkem vlevo a textem s úkoly vpravo",
    svg: (
      <svg
        viewBox="0 0 100 80"
        className="h-16 w-full"
        fill="none"
        stroke="currentColor"
        role="img"
        aria-label="Šablona Obrázek vlevo"
      >
        <title>Šablona Obrázek vlevo</title>
        <rect
          x="6"
          y="6"
          width="36"
          height="68"
          rx="4"
          className="fill-primary/20 stroke-primary"
          strokeWidth="2"
        />
        <rect
          x="48"
          y="10"
          width="46"
          height="8"
          rx="2"
          className="fill-foreground/40"
        />
        <rect
          x="48"
          y="24"
          width="46"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
        <rect
          x="48"
          y="34"
          width="40"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
        <rect
          x="48"
          y="44"
          width="46"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
        <rect
          x="48"
          y="54"
          width="32"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
      </svg>
    ),
  },
  {
    id: 1,
    name: "Obrázek vpravo",
    description: "Text s úkoly vlevo a sloupec s obrázkem vpravo",
    svg: (
      <svg
        viewBox="0 0 100 80"
        className="h-16 w-full"
        fill="none"
        stroke="currentColor"
        role="img"
        aria-label="Šablona Obrázek vpravo"
      >
        <title>Šablona Obrázek vpravo</title>
        <rect
          x="6"
          y="10"
          width="46"
          height="8"
          rx="2"
          className="fill-foreground/40"
        />
        <rect
          x="6"
          y="24"
          width="46"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
        <rect
          x="6"
          y="34"
          width="40"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
        <rect
          x="6"
          y="44"
          width="46"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
        <rect
          x="6"
          y="54"
          width="32"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
        <rect
          x="58"
          y="6"
          width="36"
          height="68"
          rx="4"
          className="fill-primary/20 stroke-primary"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Scroll šablona",
    description: "Horní titulní obrázek a pod ním postupný průběh",
    svg: (
      <svg
        viewBox="0 0 100 80"
        className="h-16 w-full"
        fill="none"
        stroke="currentColor"
        role="img"
        aria-label="Scroll šablona"
      >
        <title>Scroll šablona</title>
        <rect
          x="8"
          y="6"
          width="84"
          height="28"
          rx="4"
          className="fill-primary/20 stroke-primary"
          strokeWidth="2"
        />
        <rect
          x="8"
          y="40"
          width="84"
          height="8"
          rx="2"
          className="fill-foreground/40"
        />
        <rect
          x="8"
          y="52"
          width="84"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
        <rect
          x="8"
          y="62"
          width="60"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Pouze text",
    description: "Čistě textový článek rozdělený do kapitol bez pevných animací",
    svg: (
      <svg
        viewBox="0 0 100 80"
        className="h-16 w-full"
        fill="none"
        stroke="currentColor"
        role="img"
        aria-label="Textová šablona"
      >
        <title>Textová šablona</title>
        <rect
          x="12"
          y="10"
          width="76"
          height="8"
          rx="2"
          className="fill-foreground/40"
        />
        <rect
          x="12"
          y="24"
          width="76"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
        <rect
          x="12"
          y="34"
          width="70"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
        <rect
          x="12"
          y="46"
          width="50"
          height="8"
          rx="2"
          className="fill-foreground/40"
        />
        <rect
          x="12"
          y="58"
          width="76"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
        <rect
          x="12"
          y="68"
          width="64"
          height="6"
          rx="2"
          className="fill-foreground/20"
        />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Fullscreen obrázek",
    description: "Dominantní celoobrazovkový vizuál",
    svg: (
      <svg
        viewBox="0 0 100 80"
        className="h-16 w-full"
        fill="none"
        stroke="currentColor"
        role="img"
        aria-label="Fullscreen šablona"
      >
        <title>Fullscreen šablona</title>
        <rect
          x="6"
          y="6"
          width="88"
          height="68"
          rx="4"
          className="fill-primary/20 stroke-primary"
          strokeWidth="2"
        />
        <circle cx="30" cy="30" r="10" className="fill-primary/40" />
        <path
          d="M10 65 L40 40 L65 58 L80 48 L94 65 Z"
          className="fill-primary/50"
        />
      </svg>
    ),
  },
]

export const ArticleTemplates: FC<Props> = ({ selected, setSelected }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {templates.map((tpl) => {
        const isSelected = selected === tpl.id
        return (
          <button
            type="button"
            key={tpl.id}
            onClick={() => setSelected(tpl.id)}
            className="text-left"
          >
            <Card
              className={cn(
                "cursor-pointer p-3 transition-all hover:border-primary/50",
                isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "hover:bg-accent/40"
              )}
            >
              <div className="mb-2 flex items-center justify-center rounded bg-muted/40 p-2">
                {tpl.svg}
              </div>
              <h4 className="text-sm font-semibold">{tpl.name}</h4>
              <p className="text-muted-foreground text-xs">{tpl.description}</p>
            </Card>
          </button>
        )
      })}
    </div>
  )
}
