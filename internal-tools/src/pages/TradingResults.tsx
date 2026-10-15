import { type FC, useState } from "react"
import { Loader2, AlertCircle, Settings } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useGetTradingEvaluation } from '@/utils/hooks/api/useGetTradingEvaluation.ts'
import type { TradingStrategy } from '@/utils/types/TradingEvaluation.ts'
import { StrategyPanel } from "@/components/tradingResults/StrategyPanel.tsx"
import { ConfigSidebar } from "@/components/tradingResults/ConfigSidebar.tsx"
import type { TradingResultsSubmitType } from "@/utils/types/TradingResultsSubmitType.ts"

const strategies: { key: TradingStrategy; label: string }[] = [
  { key: 'sma',  label: 'SMA-14' },
  { key: 'ema',  label: 'EMA-21' },
]

export const TradingResults: FC = () => {
  const [strategy, setStrategy] = useState<TradingStrategy>('sma');
  const [from, setFrom] = useState('2026-04-23');
  const [to, setTo] = useState('2026-05-08');
  const [submitted, setSubmitted] = useState<TradingResultsSubmitType>({ strategy: "sma", from: "2026-04-23", to: "2026-05-08" })
  const [configOpen, setConfigOpen] = useState(false)

  const { data, isLoading, isError } = useGetTradingEvaluation({
    strategy: submitted.strategy,
    from: submitted.from,
    to: submitted.to,
  })

  const handleSubmit = () => {
    setSubmitted({ strategy, from, to })
  }

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white md:text-3xl">
            Výsledky obchodování
          </h1>
          <p className="text-sm text-gray-400">
            Analýza strategií SMA-14 a EMA-21
          </p>
        </div>
        <button
          onClick={() => setConfigOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[#3a3530] bg-[#2a2620] px-3 py-2 text-sm text-gray-400 transition-all hover:border-[#c9a961] hover:text-[#c9a961]"
        >
          <Settings className="h-4 w-4" />
          Nastavení algoritmů
        </button>
      </div>

      <ConfigSidebar open={configOpen} onClose={() => setConfigOpen(false)} />

      <Card className="border-[#3a3530] bg-[#2a2620]">
        <CardContent className="pt-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs tracking-wider text-gray-500 uppercase">
                Strategie
              </label>
              <div className="flex gap-1">
                {strategies.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setStrategy(s.key)}
                    className={
                      strategy === s.key
                        ? "rounded-lg bg-[#c9a961] px-4 py-2 text-sm font-semibold text-[#1a1916] transition-all"
                        : "rounded-lg border border-[#3a3530] bg-[#2a2620] px-4 py-2 text-sm text-gray-400 transition-all hover:border-[#c9a961]"
                    }
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs tracking-wider text-gray-500 uppercase">
                Od
              </label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="rounded-lg border border-[#3a3530] bg-[#1a1916] px-3 py-2 text-sm text-gray-200 focus:border-[#c9a961] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs tracking-wider text-gray-500 uppercase">
                Do
              </label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="rounded-lg border border-[#3a3530] bg-[#1a1916] px-3 py-2 text-sm text-gray-200 focus:border-[#c9a961] focus:outline-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="rounded-lg bg-[#c9a961] px-6 py-2 text-sm font-semibold text-[#1a1916] transition-all hover:bg-[#d4b96c]"
            >
              Načíst
            </button>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#c9a961]" />
        </div>
      )}

      {isError && (
        <Card className="border-[#3a3530] bg-[#2a2620]">
          <CardContent className="py-12 text-center">
            <AlertCircle className="mx-auto mb-2 h-8 w-8 text-red-400" />
            <p className="text-gray-400">
              Chyba při načítání dat. Zkontrolujte připojení.
            </p>
          </CardContent>
        </Card>
      )}

      {data &&
        !isLoading &&
        (() => {
          const entries = Object.entries(data.data) as [
            string,
            typeof data.data.sma,
          ][]
          const valid = entries.filter(([, v]) => v !== undefined) as [
            string,
            NonNullable<typeof data.data.sma>,
          ][]

          if (valid.length === 0) {
            return (
              <Card className="border-[#3a3530] bg-[#2a2620]">
                <CardContent className="py-12 text-center">
                  <p className="text-gray-400">
                    Žádná data pro zvolené období.
                  </p>
                </CardContent>
              </Card>
            )
          }

          if (valid.length === 1) {
            const [key, result] = valid[0]
            return (
              <StrategyPanel
                data={result}
                label={key === "sma" ? "SMA-14" : "EMA-21"}
              />
            )
          }
        })()}
    </div>
  )
}
