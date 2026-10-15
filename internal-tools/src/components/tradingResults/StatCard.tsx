import type { FC, ReactNode } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { TradingResultColors } from "@/utils/constants/tradingResults.ts"
import { Tooltip } from "@/components/ui/tooltip.tsx"
import { Info } from "lucide-react"

export type StatCardProps = {
  label: string
  value: string | number
  sub?: string
  color?: string
  icon?: ReactNode
  tooltip?: string
}

export const StatCard: FC<StatCardProps> = ({ label, value, sub, color, icon, tooltip }) => (
  <Card className="border-[#3a3530] bg-[#2a2620]">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-xs tracking-wider text-gray-400 uppercase md:text-sm">
        {icon}
        {label}
        {tooltip && (
          <Tooltip content={tooltip}>
            <Info className="h-3 w-3 cursor-help text-gray-600 hover:text-gray-400" />
          </Tooltip>
        )}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <span
        className="font-mono text-2xl font-bold md:text-3xl"
        style={{ color: color ?? TradingResultColors.text }}
      >
        {value}
      </span>
      {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
    </CardContent>
  </Card>
)