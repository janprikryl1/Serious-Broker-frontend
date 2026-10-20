import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type FC, useState } from "react"
import { ArrowUpRight, Loader2 } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useGetCoinHistory } from "@/utils/hooks/api/useGetCoinHistory.ts"
import { toCzechDate } from "@/utils/functions"
import { coins } from "@/utils/constants/coins.ts"

export const Index: FC = () => {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const { data, isError, isLoading } = useGetCoinHistory(selectedCoin);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-[#2a2620] border-[#3a3530]">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400">Chyba při načítání dat</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (data) {
    return (
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-12 lg:flex-row lg:items-center">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-white md:text-4xl">
              Serious Broker Dashboard
            </h1>
            <p className="text-sm text-gray-400 md:text-base">
              Interní analýzy pro krypto VŠB
            </p>
          </div>

          <div className="scrollbar-hide flex flex-wrap gap-2 overflow-x-auto pb-2 lg:pb-0">
            {coins.map((coin) => (
              <button
                key={coin.symbol}
                onClick={() => setSelectedCoin(coin.symbol)}
                className={`rounded-lg px-4 py-2 text-sm whitespace-nowrap transition-all md:text-base ${
                  selectedCoin === coin.symbol
                    ? "bg-[#c9a961] font-semibold text-[#1a1916]"
                    : "border border-[#3a3530] bg-[#2a2620] text-gray-400 hover:border-[#c9a961]"
                }`}
              >
                {coin.symbol}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {data.data.length ? (
            <Card className="border-[#3a3530] bg-[#2a2620]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs tracking-wider text-gray-400 uppercase md:text-sm">
                  Aktuální cena ({selectedCoin})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-mono text-2xl text-white md:text-3xl">
                    {data.data[0].price.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                    <ArrowUpRight className="h-4 w-4" />
                    {(
                      (data.data[0].price / data.data[1].price - 1) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Posledních 24h</p>
              </CardContent>
            </Card>
          ) : <></>}

          <Card className="border-[#3a3530] bg-[#2a2620]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs tracking-wider text-gray-400 uppercase md:text-sm">
                Analyzované články
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xl text-white md:text-3xl">
                  {data.analyzed_posts}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">V naší databázi</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card className="border-[#3a3530] bg-[#2a2620]">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                Vývoj ceny mince
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-0 md:pl-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data.data}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorPrice"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#c9a961"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#c9a961"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#3a3530"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="date"
                      hide={false}
                      fontSize={10}
                      tickMargin={10}
                    />
                    <YAxis
                      fontSize={10}
                      tickFormatter={(val) => val.toLocaleString()}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1916",
                        border: "1px solid #3a3530",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#c9a961", fontWeight: "bold" }}
                      labelFormatter={(label) => `Datum: ${toCzechDate(label)}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#c9a961"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPrice)"
                      name="Cena"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
};