import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users } from "lucide-react"
import  { type FC, useState } from "react"
import { Badge } from "@/components/ui/badge.tsx"
import { FollowedChannels } from "@/components/aiWrapper/FollowedChannels.tsx"
import { getSentimentColor } from "@/utils/functions/getSentimentColor.ts"
import { getImpactIcon } from "@/utils/functions/getImapctIcon"
import { ManualAnalysisCard } from "@/components/aiWrapper/ManualAnalysisCard.tsx"
import { useGetAIArticles } from "@/utils/hooks/api/useGetAIArticles.ts"

export const AIAnalyze:FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetAIArticles(currentPage);
  const stats = data?.stats || { positive: 0, neutral: 0, negative: 0, total: 0 };
  
  const getPercent = (value: number) =>
    stats.total > 0 ? Math.round((value / stats.total) * 100) : 0;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl text-white mb-2">AI Analýza</h1>
        <p className="text-gray-400">Automatická analýza X postů a sentimentu trhu</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#2a2620] border-[#3a3530]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Celkem analyzováno</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">{stats.total}</div>
            <p className="text-xs text-gray-500 mt-1">V databázi</p>
          </CardContent>
        </Card>

        <Card className="bg-[#2a2620] border-[#3a3530]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Pozitivní</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-green-500">{stats.positive}</div>
            <p className="text-xs text-gray-500 mt-1">{getPercent(stats.positive)}% sentimentu</p>
          </CardContent>
        </Card>

        <Card className="bg-[#2a2620] border-[#3a3530]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Neutrální</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-gray-400">{stats.neutral}</div>
            <p className="text-xs text-gray-500 mt-1">{getPercent(stats.neutral)}% sentimentu</p>
          </CardContent>
        </Card>

        <Card className="bg-[#2a2620] border-[#3a3530]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Negativní</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-red-500">{stats.negative}</div>
            <p className="text-xs text-gray-500 mt-1">{getPercent(stats.negative)}% sentimentu</p>
          </CardContent>
        </Card>
      </div>
      
      <ManualAnalysisCard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-[#2a2620] border-[#3a3530]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                Analyzované články a posty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading && <div className="text-gray-400 p-4">Načítám analýzy...</div>}
                {isError && <div className="text-red-400 p-4">Chyba při načítání dat.</div>}

                {data?.data.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-lg bg-[#1a1916] border border-[#3a3530] hover:border-[#c9a961] transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#c9a961]/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-[#c9a961]" />
                      </div>
                      <div className="text-xs text-gray-500">
                        Analyzováno: {new Date(post.created_at).toLocaleString('cs-CZ')}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-3 text-sm line-clamp-3 italic">
                      "{post.content}"
                    </p>

                    <div className="bg-[#2a2620] p-3 rounded-lg mb-3 border-l-4 border-[#c9a961]">
                      <p className="text-sm text-gray-300">{post.reason}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={getSentimentColor(post.sentiment?.toLowerCase())}>
                        {post.sentiment}
                      </Badge>
                      <Badge variant="outline" className="text-gray-400 border-[#3a3530]">
                        {getImpactIcon(post.impact)}
                        <span className="ml-1">{post.impact}</span>
                      </Badge>
                      <Badge variant="outline" className="text-gray-400 border-[#3a3530]">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.timeframe}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                {data && data.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                      className="px-3 py-1 bg-[#3a3530] text-white disabled:opacity-50"
                    >
                      Předchozí
                    </button>
                    <span className="text-gray-400">Strana {currentPage} z {data.totalPages}</span>
                    <button
                      disabled={currentPage === data.totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      className="px-3 py-1 bg-[#3a3530] text-white disabled:opacity-50"
                    >
                      Další
                    </button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <FollowedChannels />
      </div>
    </div>
  );
}