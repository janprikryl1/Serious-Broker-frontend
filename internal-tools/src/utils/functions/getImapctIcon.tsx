import { TrendingDown, TrendingUp } from "lucide-react"
import { Calendar } from "@/components/ui/calendar.tsx"

export const getImpactIcon = (impact: string) => {
  if (impact === "bullish") return <TrendingUp className="w-4 h-4 text-green-500" />;
  if (impact === "bearish") return <TrendingDown className="w-4 h-4 text-red-500" />;
  return <Calendar className="w-4 h-4 text-gray-500" />;
};