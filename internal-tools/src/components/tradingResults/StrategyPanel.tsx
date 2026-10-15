import {
  TOOLTIP_STYLE,
  TradingResultColors,
} from "@/utils/constants/tradingResults"
import type { StrategyResult } from "@/utils/types/TradingEvaluation"
import type { FC } from "react"
import { StatCard } from "@/components/tradingResults/StatCard.tsx"
import { Tooltip } from "@/components/ui/tooltip.tsx"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  BarChart2,
  Activity,
  Info,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as TooltipIcon,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { fmtUsd } from "@/utils/functions/tradingResults.ts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"

type Props = {
  data: StrategyResult;
  label: string;
}

const ChartTitle = ({ title, tooltip }: { title: string; tooltip: string }) => (
  <span className="flex items-center gap-1.5">
    {title}
    <Tooltip content={tooltip}>
      <Info className="h-3.5 w-3.5 cursor-help text-gray-600 hover:text-gray-400" />
    </Tooltip>
  </span>
)

export const StrategyPanel: FC<Props> = ({ data, label }) => {
  const {
    signal_stats: ss,
    signal_daily,
    fear_distribution,
    trade_stats: ts,
    period,
  } = data;

  const pieData = [
    { name: "BUY", value: ss.buy, color: TradingResultColors.buy },
    { name: "SELL", value: ss.sell, color: TradingResultColors.sell },
    { name: "HOLD", value: ss.hold, color: TradingResultColors.hold },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">{label}</h2>
        <p className="text-sm text-gray-400">
          Páry:
          {period.symbols.length > 0 &&
            ` ${period.symbols.filter(Boolean).join(", ")}`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard
          label="Rozhodnutí"
          value={ss.total.toLocaleString()}
          icon={<Activity className="h-3 w-3" />}
          tooltip="Celkový počet rozhodnutí algoritmu za zvolené období — součet signálů BUY + SELL + HOLD."
        />
        <StatCard
          label="BUY"
          value={`${ss.buy_pct}%`}
          sub={`${ss.buy} signálů`}
          color={TradingResultColors.buy}
          icon={<TrendingUp className="h-3 w-3" />}
          tooltip="Podíl nákupních signálů."
        />
        <StatCard
          label="SELL"
          value={`${ss.sell_pct}%`}
          sub={`${ss.sell} signálů`}
          color={TradingResultColors.sell}
          icon={<TrendingDown className="h-3 w-3" />}
          tooltip="Podíl prodejních signálů."
        />
        <StatCard
          label="HOLD"
          value={`${ss.hold_pct}%`}
          sub={`${ss.hold} signálů`}
          color={TradingResultColors.hold}
          icon={<Minus className="h-3 w-3" />}
          tooltip="Podíl signálů k držení."
        />
        <StatCard
          label="Obchody"
          value={ts.total}
          sub={`${ts.buy_count} nákupů / ${ts.sell_count} prodejů`}
          icon={<BarChart2 className="h-3 w-3" />}
          tooltip="Počet skutečně provedených obchodů na burze — BUY a SELL exekuce dohromady."
        />
        <StatCard
          label="Objem"
          value={fmtUsd(ts.total_volume_usd)}
          sub={
            ts.failed_count > 0 ? `${ts.failed_count} selhání` : "vše úspěšně"
          }
          tooltip="Celkový USD objem všech provedených obchodů. (Selhání jsou příkazy, které se nepodařilo vykonat.)"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-[#3a3530] bg-[#2a2620] lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm text-gray-300">
              <ChartTitle
                title="Signály po dnech"
                tooltip="Sloupcový graf zobrazující denní počty signálů BUY, SELL a HOLD. Sloupce jsou naskládány — výška celého sloupce = celkový počet rozhodnutí za daný den."
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={signal_daily}
                margin={{ top: 4, right: 16, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={TradingResultColors.border}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  fontSize={10}
                  tickMargin={6}
                  stroke={TradingResultColors.muted}
                  tickFormatter={(d) => d.slice(5)}
                />
                <YAxis fontSize={10} stroke={TradingResultColors.muted} />
                <TooltipIcon {...TOOLTIP_STYLE} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar
                  dataKey="BUY"
                  stackId="a"
                  fill={TradingResultColors.buy}
                  name="BUY"
                />
                <Bar
                  dataKey="SELL"
                  stackId="a"
                  fill={TradingResultColors.sell}
                  name="SELL"
                />
                <Bar
                  dataKey="HOLD"
                  stackId="a"
                  fill={TradingResultColors.hold}
                  name="HOLD"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-[#3a3530] bg-[#2a2620]">
          <CardHeader>
            <CardTitle className="text-sm text-gray-300">
              <ChartTitle
                title="Rozložení signálů"
                tooltip="Koláčový graf celkového poměru BUY / SELL / HOLD signálů za zvolené období."
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={44}
                  paddingAngle={2}
                  label={({ name, percent }) =>
                    percent ? `${name} ${(percent * 100).toFixed(0)}%` : ""
                  }
                  labelLine={false}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <TooltipIcon {...TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#3a3530] bg-[#2a2620]">
        <CardHeader>
          <CardTitle className="text-sm text-gray-300">
            <ChartTitle
              title="Distribuce Fear & Greed indexu dle signálu"
              tooltip="Ukazuje, při jakých hodnotách Fear & Greed indexu (0 = extrémní strach, 100 = extrémní chamtivost) algoritmus vydával BUY, SELL nebo HOLD signály. Osa X jsou intervaly indexu po 5 bodech."
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={fear_distribution}
              margin={{ top: 4, right: 16, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={TradingResultColors.border}
                vertical={false}
              />
              <XAxis
                dataKey="bin"
                fontSize={10}
                tickMargin={6}
                stroke={TradingResultColors.muted}
                tickFormatter={(b) => `${b}–${b + 4}`}
              />
              <YAxis fontSize={10} stroke={TradingResultColors.muted} />
              <TooltipIcon
                {...TOOLTIP_STYLE}
                labelFormatter={(b) => `Fear ${b}–${+b + 4}`}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar
                dataKey="BUY"
                fill={TradingResultColors.buy}
                name="BUY"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="SELL"
                fill={TradingResultColors.sell}
                name="SELL"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="HOLD"
                fill={TradingResultColors.hold}
                name="HOLD"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {ts.by_symbol.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="border-[#3a3530] bg-[#2a2620]">
            <CardHeader>
              <CardTitle className="text-sm text-gray-300">
                <ChartTitle
                  title="Objem obchodů na pár"
                  tooltip="Porovnání celkového USD objemu nákupů a prodejů pro každý obchodovaný pár (např. BTC, ETH)."
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={ts.by_symbol}
                  margin={{ top: 4, right: 16, left: -10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={TradingResultColors.border}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="symbol"
                    fontSize={10}
                    tickMargin={6}
                    stroke={TradingResultColors.muted}
                    tickFormatter={(s) => s.replace("USDC", "")}
                  />
                  <YAxis fontSize={10} stroke={TradingResultColors.muted} />
                  <TooltipIcon {...TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar
                    dataKey="buy_volume"
                    fill={TradingResultColors.buy}
                    name="BUY"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="sell_volume"
                    fill={TradingResultColors.sell}
                    name="SELL"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-[#3a3530] bg-[#2a2620]">
            <CardHeader>
              <CardTitle className="text-sm text-gray-300">
                <ChartTitle
                  title="Kumulativní objem obchodů"
                  tooltip="Ploškový graf kumulativního součtu USD objemu nákupů a prodejů v čase. Strmější nárůst = více obchodů v daném období."
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-0">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart
                  data={ts.cumulative}
                  margin={{ top: 4, right: 16, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gBuy" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={TradingResultColors.buy}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={TradingResultColors.buy}
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="gSell" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={TradingResultColors.sell}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={TradingResultColors.sell}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={TradingResultColors.border}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    fontSize={10}
                    tickMargin={6}
                    stroke={TradingResultColors.muted}
                    tickFormatter={(d) => d.slice(5)}
                  />
                  <YAxis fontSize={10} stroke={TradingResultColors.muted} />
                  <TooltipIcon {...TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area
                    type="monotone"
                    dataKey="cumBuy"
                    stroke={TradingResultColors.buy}
                    fill="url(#gBuy)"
                    strokeWidth={2}
                    name="BUY"
                  />
                  <Area
                    type="monotone"
                    dataKey="cumSell"
                    stroke={TradingResultColors.sell}
                    fill="url(#gSell)"
                    strokeWidth={2}
                    name="SELL"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-[#3a3530] bg-[#2a2620]">
          <CardContent className="py-8 text-center">
            <AlertCircle className="mx-auto mb-2 h-6 w-6 text-gray-500" />
            <p className="text-sm text-gray-500">
              Žádné vyplněné obchody v daném období.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
