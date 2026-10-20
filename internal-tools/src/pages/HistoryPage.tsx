import { useState, type FC } from "react"
import {
  TrendingDown,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGetHistoricalArticles } from "@/utils/hooks/api/useGetHistoricalArticles.ts"
import { ITEMS_PER_PAGE } from "@/utils/constants"


export const HistoryPage: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetHistoricalArticles(currentPage);
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <Card className="bg-[#2a2620] border-[#3a3530]">
        <CardContent className="py-12 text-center">
          <p className="text-gray-400">Chyba při načítání událostí</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl text-white mb-2">Historie událostí</h1>
        <p className="text-gray-400">Historická analýza důležitých událostí a jejich dopad na kryptoměny</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#2a2620] border-[#3a3530]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Celkem událostí</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">{data?.totalCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-[#2a2620] border-[#3a3530]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Nízký dopad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-green-500">
              {data?.data.filter(e => e.impact === "low").length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2a2620] border-[#3a3530]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Střední dopad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">
              {data?.data.filter(e => e.impact === "medium").length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#2a2620] border-[#3a3530]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Vysoký dopad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-red-500">
              {data?.data.filter(e => e.impact === "high").length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        {data?.data.map((event) => (
            <Card key={event.id} className="bg-[#2a2620] border-[#3a3530]">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${
                        event.impact === 'high' ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        {event.impact === 'low' ? (
                          <TrendingUp className="w-5 h-5 text-green-500" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-white">{event.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">{event.date} {event.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {event.forecast && (
                    <div className="p-4 rounded-lg bg-[#1a1916] border border-[#3a3530]">
                      <div className="text-xs text-gray-500 mb-1">Předpověď: </div>
                      <div className="text-2xl text-white">{event.forecast}</div>
                    </div>
                  )}

                  {event.actual && (
                    <div className="p-4 rounded-lg bg-[#1a1916] border border-[#3a3530]">
                      <div className="text-xs text-gray-500 mb-1">Aktuální: </div>
                      <div className="text-2xl text-white">{event.actual}</div>
                    </div>
                  )}

                  {event.previous && (
                    <div className="p-4 rounded-lg bg-[#1a1916] border border-[#3a3530]">
                      <div className="text-xs text-gray-500 mb-1">Před událostí: </div>
                      <div className="text-2xl text-white">{event.previous}</div>
                    </div>
                    )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-[#3a3530] bg-[#2a2620] text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Předchozí
          </Button>

          <div className="text-sm text-gray-500">
            Stránka <span className="text-white font-medium">{currentPage}</span> z <span className="text-white font-medium">{totalPages}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-[#3a3530] bg-[#2a2620] text-gray-400 hover:text-white"
          >
            Další
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {data?.data.length === 0 && (
        <Card className="bg-[#2a2620] border-[#3a3530]">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400">Žádné události nenalezeny</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}