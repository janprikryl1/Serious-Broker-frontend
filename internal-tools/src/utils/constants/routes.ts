import {
  BarChart3,
  Brain,
  History,
  TrendingUp,
  CalendarDays,
  type LucideProps,
} from "lucide-react"
import type { Route } from "@/utils/types/Route.ts"
import { BsGraphUpArrow } from "react-icons/bs"
import type { ForwardRefExoticComponent, RefAttributes } from "react"

export const routes: Record<string, Route> = {
  index: { path: "/", label: "Přehled", icon: BarChart3 },
  aiAnalyze: { path: "/ai-analyza", label: "AI Analýza", icon: Brain },
  history: { path: "/historie", label: "Historie", icon: History },
  fearGrid: { path: "/fear-greed", label: "Fear & Greed", icon: TrendingUp },
  tradingResults: {
    path: "/trading-results",
    label: "Výsledky obchodování",
    icon: BsGraphUpArrow as ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >,
  },
  seasonality: { path: "/season-plan", label: "Časový plán", icon: CalendarDays },
}