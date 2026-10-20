import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Info, Loader2, TrendingUp, TrendingDown } from "lucide-react"
import { Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from "recharts";
import { useMemo, useState } from "react"
import { useGetCoinHistory } from "@/utils/hooks/api/useGetCoinHistory.ts"
import { useGetFgiHistory } from "@/utils/hooks/api/useGetFgiHistory.ts"
import { toCzechDate } from "@/utils/functions"
import { coins } from "@/utils/constants/coins.ts"
import { periods } from "@/utils/constants/periods.ts"

export const FearGrid = () => {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [timePeriod, setTimePeriod] = useState(30);
  const { data: btcResponse, isLoading: isBtcLoading, isError: isBtcError } = useGetCoinHistory(selectedCoin, timePeriod);
  const { data: fgiResponse, isLoading: isFgiLoading, isError: isFgiError } = useGetFgiHistory(timePeriod);
  
  const combinedHistory = useMemo(() => {
    if (!btcResponse?.data || !fgiResponse?.data) return [];

    const selectedFgiData = fgiResponse.data.slice(0, timePeriod);
    const reversedFgi = [...selectedFgiData].reverse();

    return reversedFgi.map((fgiItem) => {
      const dateObj = new Date(parseInt(fgiItem.timestamp) * 1000);
      const dateStr = dateObj.toISOString().split('T')[0];

      const btcMatch = btcResponse.data.find(b => b.date.startsWith(dateStr));

      return {
        date: dateStr,
        fgi: parseInt(fgiItem.value),
        label: fgiItem.value_classification,
        btcPrice: btcMatch ? btcMatch.price : null,
      };
    });
  }, [btcResponse, fgiResponse, timePeriod]);

  const stats = useMemo(() => {
    if (!fgiResponse?.data || fgiResponse.data.length === 0) {
      return { currentFGI: 50, avg7d: 0, high30: 0, low30: 0, change24h: 0 };
    }

    const items = fgiResponse.data;

    const currentFGI = parseInt(items[0].value);

    // 24h Change
    const yesterdayFGI = items.length > 1 ? parseInt(items[1].value) : currentFGI;
    const change24h = currentFGI - yesterdayFGI;

    // 7dany average
    const last7Days = items.slice(0, 7).map(item => parseInt(item.value));
    const avg7d = last7Days.length > 0
      ? Math.round(last7Days.reduce((a, b) => a + b, 0) / last7Days.length)
      : currentFGI;

    // monthly High/Low
    const last30Days = items.slice(0, 30).map(item => parseInt(item.value));
    const high30 = last30Days.length > 0 ? Math.max(...last30Days) : currentFGI;
    const low30 = last30Days.length > 0 ? Math.min(...last30Days) : currentFGI;

    return { currentFGI, avg7d, high30, low30, change24h };
  }, [fgiResponse]);

  const isLoading = isBtcLoading || isFgiLoading;
  const isError = isBtcError || isFgiError;

  const getFGIColor = (value: number) => {
    if (value <= 20) return "#ef4444";
    if (value <= 40) return "#f97316";
    if (value <= 60) return "#eab308";
    if (value <= 80) return "#84cc16";
    return "#22c55e";
  };
  
  const currentMonthName = new Date().toLocaleString('cs-CZ', { month: 'long' });
  const capitalizedMonthName = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center text-[#c9a961]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }
  
  if (isError) {
    return (
      <Card className="bg-[#2a2620] border-[#3a3530]">
        <CardContent className="py-12 text-center">
          <p className="text-gray-400">Chyba při načítání dat</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl text-white mb-2">Fear & Greed Index</h1>
          <p className="text-gray-400">Korelace sentimentu trhu s cenou {selectedCoin}</p>
        </div>

        {/* Selectors */}
        <div className="flex flex-col gap-3">
          {/* Coin Selector */}
          <div className="flex flex-wrap gap-2">
            {coins.map((coin) => (
              <button
                key={coin.symbol}
                onClick={() => setSelectedCoin(coin.symbol)}
                className={`px-4 py-2 rounded-lg transition-all text-sm ${
                  selectedCoin === coin.symbol
                    ? 'bg-[#c9a961] text-[#1a1916] font-medium'
                    : 'bg-[#2a2620] text-gray-400 border border-[#3a3530] hover:border-[#c9a961]'
                }`}
              >
                {coin.symbol}
              </button>
            ))}
          </div>

          {/* Time Period Selector */}
          <div className="flex flex-wrap gap-2">
            {periods.map((period) => (
              <button
                key={period.days}
                onClick={() => setTimePeriod(period.days)}
                className={`px-3 py-1 rounded-lg transition-all text-sm ${
                  timePeriod === period.days
                    ? 'bg-[#c9a961] text-[#1a1916] font-medium'
                    : 'bg-[#2a2620] text-gray-400 border border-[#3a3530] hover:border-[#c9a961]'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Card className="bg-[#2a2620] border-[#3a3530] mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Gauge Chart */}
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-gray-400 mb-4">Aktuální Index</h3>
              <div className="relative w-64 h-64">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="128" cy="128" r="100" fill="none" stroke="#3a3530" strokeWidth="20" />
                  <circle
                    cx="128" cy="128" r="100" fill="none"
                    stroke={getFGIColor(stats.currentFGI)} strokeWidth="20"
                    strokeDasharray={`${(stats.currentFGI / 100) * 628} 628`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 1s ease-in-out, stroke 0.5s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-6xl font-bold" style={{ color: getFGIColor(stats.currentFGI) }}>
                    {stats.currentFGI}
                  </div>
                  <div className="text-lg text-gray-400 mt-2">{fgiResponse?.data[0]?.value_classification || "Loading"}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <Info className="w-3 h-3" />
                <span>Aktualizováno: {fgiResponse?.data[0] ? toCzechDate(new Date(parseInt(fgiResponse.data[0].timestamp) * 1000).toISOString()) : 'Neznámé'}</span>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1916] rounded-lg p-5 border border-[#3a3530] flex flex-col justify-between">
                <div className="text-gray-400 text-sm mb-2">7denní Průměr</div>
                <div className="text-3xl text-white font-bold">{stats.avg7d}</div>
                <div className="text-xs text-gray-500 mt-2">
                  Stav: <span style={{ color: getFGIColor(stats.avg7d) }}>
                  {stats.avg7d <= 20 ? "Extreme Fear" : stats.avg7d <= 40 ? "Fear" : stats.avg7d <= 60 ? "Neutral" : stats.avg7d <= 80 ? "Greed" : "Extreme Greed"}
                  </span>
                </div>
              </div>

              <div className="bg-[#1a1916] rounded-lg p-5 border border-[#3a3530] flex flex-col justify-between">
                <div className="text-gray-400 text-sm mb-2">30denní High / Low</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl text-white font-bold" style={{ color: getFGIColor(stats.high30) }}>{stats.high30}</div>
                  <div className="text-xl text-gray-500">/</div>
                  <div className="text-2xl text-white font-bold" style={{ color: getFGIColor(stats.low30) }}>{stats.low30}</div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{capitalizedMonthName}</div>
              </div>

              <div className="bg-[#1a1916] rounded-lg p-5 border border-[#3a3530] flex flex-col justify-between col-span-2 sm:col-span-1">
                <div className="text-gray-400 text-sm mb-2">Změna 24h</div>
                <div className="text-3xl text-white font-bold">
                  {stats.change24h > 0 ? `+${stats.change24h}` : stats.change24h}
                </div>
                <div className={`flex items-center gap-1 text-xs mt-2 ${
                  stats.change24h > 0 ? 'text-green-500' : stats.change24h < 0 ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {stats.change24h > 0 ? <TrendingUp className="w-3 h-3" /> : stats.change24h < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                  <span>
                    {stats.change24h > 0 ? 'Rostoucí tendence' : stats.change24h < 0 ? 'Klesající tendence' : 'Beze změny'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#2a2620] border-[#3a3530]">
        <CardHeader>
          <CardTitle className="text-white">Fear & Greed vs {selectedCoin} Price (Posledních {timePeriod} dní)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={combinedHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3530" />
              <XAxis dataKey="date" fontSize={12} tickFormatter={(val) => val.split('-').slice(1).reverse().join('.')} />
              <YAxis yAxisId="left" domain={[0, 100]} />
              <YAxis yAxisId="right" orientation="right" domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1916', border: '1px solid #3a3530', borderRadius: '8px' }}
                itemStyle={{ padding: '2px 0' }}
                labelFormatter={(label) => `Datum: ${toCzechDate(label)}`}
              />
              <Area yAxisId="left" type="monotone" dataKey="fgi" fill="#c9a961" fillOpacity={0.2} stroke="#c9a961" strokeWidth={2} name="Index FGI" />
              <Line yAxisId="right" type="monotone" dataKey="btcPrice" stroke="#22c55e" strokeWidth={2} name={`Cena ${selectedCoin}`} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}