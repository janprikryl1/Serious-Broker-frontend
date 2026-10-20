import type { FC } from "react"
import { Route, Routes } from "react-router"
import { routes } from "@/utils/constants/routes.ts"
import { Index } from "@/pages/Index.tsx"
import { NotFound } from "@/pages/NotFound.tsx"
import { AIAnalyze } from "@/pages/AIAnalyze.tsx"
import { HistoryPage } from "@/pages/HistoryPage.tsx"
import { FearGrid } from "@/pages/FearGrid.tsx"
import { TradingResults } from "@/pages/TradingResults.tsx"
import { SeasonalityPage } from "@/pages/SeasonalityPage.tsx"

export const Router:FC = () => {
  return (
    <Routes>
      <Route path={routes.index.path} element={<Index />} />
      <Route path={routes.aiAnalyze.path} element={<AIAnalyze />} />
      <Route path={routes.history.path} element={<HistoryPage />} />
      <Route path={routes.fearGrid.path} element={<FearGrid />} />
      <Route path={routes.tradingResults.path} element={<TradingResults />} />
      <Route path={routes.seasonality.path} element={<SeasonalityPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}