import { useMemo, useState } from "react"
import { Loader2 } from "lucide-react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetSeasonality } from "@/utils/hooks/api/useGetSeasonality.ts"
import { coins } from "@/utils/constants/coins.ts"
import {
  AVAILABLE_YEARS,
  COIN_COLORS,
  MONTH_STARTS,
  YEAR_DASH,
} from "@/utils/constants/seasonality.ts"
import { dayToMonthLabel } from "@/utils/functions"
import { CustomTooltip } from "@/components/seasonality/CustomTooltip.tsx"

const useAllYears = () => {
  const q2022 = useGetSeasonality(2022)
  const q2023 = useGetSeasonality(2023)
  const q2024 = useGetSeasonality(2024)
  const q2025 = useGetSeasonality(2025)
  const q2026 = useGetSeasonality(2026)
  return [
    { year: 2022, data: q2022.data, isLoading: q2022.isLoading, isError: q2022.isError },
    { year: 2023, data: q2023.data, isLoading: q2023.isLoading, isError: q2023.isError },
    { year: 2024, data: q2024.data, isLoading: q2024.isLoading, isError: q2024.isError },
    { year: 2025, data: q2025.data, isLoading: q2025.isLoading, isError: q2025.isError },
    { year: 2026, data: q2026.data, isLoading: q2026.isLoading, isError: q2026.isError },
  ]
}

export const SeasonalityPage = () => {
  const currentYear = new Date().getFullYear()
  const [selectedYears, setSelectedYears] = useState<number[]>([currentYear])
  const [selectedCoins, setSelectedCoins] = useState<string[]>(["BTC", "ETH"])
  const queries = useAllYears()

  const toggleYear = (year: number) => {
    setSelectedYears(prev =>
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    )
  }

  const toggleCoin = (symbol: string) => {
    setSelectedCoins(prev =>
      prev.includes(symbol) ? prev.filter(c => c !== symbol) : [...prev, symbol]
    )
  }

  const isLoading = queries.some(q => selectedYears.includes(q.year) && q.isLoading)
  const isError   = queries.some(q => selectedYears.includes(q.year) && q.isError)

  // Build unified chart data: array[day 1..365] with keys "BTC 2024" etc.
  const chartData = useMemo(() => {
    const map = new Map<number, Record<string, number>>()

    for (const { year, data } of queries) {
      if (!selectedYears.includes(year) || !data) continue
      for (const coin of selectedCoins) {
        const series = data.coins[coin] ?? []
        for (const pt of series) {
          if (!map.has(pt.day)) map.set(pt.day, { day: pt.day })
          map.get(pt.day)![`${coin} ${year}`] = pt.pct
        }
      }
    }

    return Array.from(map.values()).sort((a, b) => a.day - b.day)
  }, [queries, selectedYears, selectedCoins])

  // All line keys to render
  const lineKeys = useMemo(() => {
    const keys: Array<{ key: string; coin: string; year: number }> = []
    for (const year of [...selectedYears].sort()) {
      for (const coin of selectedCoins) {
        keys.push({ key: `${coin} ${year}`, coin, year })
      }
    }
    return keys
  }, [selectedYears, selectedCoins])

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-[#c9a961]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <Card className="bg-[#2a2620] border-[#3a3530]">
        <CardContent className="py-12 text-center">
          <p className="text-gray-400">Chyba při načítání dat</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl text-white mb-2">Časový plán roku</h1>
      </div>
      
      <Card className="bg-[#2a2620] border-[#3a3530] mb-6">
        <CardContent className="pt-5 pb-5">
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Rok</p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_YEARS.map(year => (
                  <button
                    key={year}
                    onClick={() => toggleYear(year)}
                    className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
                      selectedYears.includes(year)
                        ? "bg-[#c9a961] text-[#1a1916] font-semibold"
                        : "bg-[#1a1916] text-gray-400 border border-[#3a3530] hover:border-[#c9a961]"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Kryptoměna</p>
              <div className="flex flex-wrap gap-2">
                {coins.map(coin => (
                  <button
                    key={coin.symbol}
                    onClick={() => toggleCoin(coin.symbol)}
                    className={`px-4 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
                      selectedCoins.includes(coin.symbol)
                        ? "font-semibold text-[#1a1916]"
                        : "bg-[#1a1916] text-gray-400 border border-[#3a3530] hover:border-[#c9a961]"
                    }`}
                    style={selectedCoins.includes(coin.symbol)
                      ? { backgroundColor: COIN_COLORS[coin.symbol] }
                      : {}}
                  >
                    {coin.symbol}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#2a2620] border-[#3a3530] mb-6">
        <CardHeader>
          <CardTitle className="text-white text-lg">
            Výkonnost v průběhu roku (% od 1. ledna)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <div className="h-96 flex items-center justify-center text-gray-500">
              Vyberte alespoň jeden rok a jednu kryptoměnu
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={440}>
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a3530" />

                <XAxis
                  dataKey="day"
                  type="number"
                  domain={[1, 365]}
                  ticks={MONTH_STARTS}
                  tickFormatter={dayToMonthLabel}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  axisLine={{ stroke: "#3a3530" }}
                  tickLine={false}
                />

                <YAxis
                  tickFormatter={v => `${v > 0 ? "+" : ""}${v}%`}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  axisLine={{ stroke: "#3a3530" }}
                  tickLine={false}
                />

                <ReferenceLine y={0} stroke="#6b6560" strokeDasharray="4 2" />

                <Tooltip content={<CustomTooltip />} />

                <Legend
                  wrapperStyle={{ paddingTop: 12, fontSize: 13, color: "#d4c9a8" }}
                  formatter={(value) => <span style={{ color: "#d4c9a8" }}>{value}</span>}
                />

                {lineKeys.map(({ key, coin, year }) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={COIN_COLORS[coin]}
                    strokeWidth={selectedYears.length > 1 ? 1.8 : 2.2}
                    strokeDasharray={selectedYears.length > 1 ? YEAR_DASH[year] : undefined}
                    dot={false}
                    connectNulls={false}
                    isAnimationActive={false}
                  />
                ))}

              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-[#2a2620] border-[#3a3530]">
        <CardHeader>
          <CardTitle className="text-white text-lg">
            Kryptoměnový časový plán na rok {currentYear}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
