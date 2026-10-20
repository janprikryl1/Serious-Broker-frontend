import type { FC } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"

type Props = {
  title: string
  value: string | number
  footer?: string
  icon?: LucideIcon
}

export const StatCard: FC<Props> = ({ title, value, footer, icon: Icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" />}
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="truncate text-2xl font-semibold">{value}</p>
        {footer && <p className="text-xs text-muted-foreground">{footer}</p>}
      </CardContent>
    </Card>
  )
}

export const StatCardSkeleton: FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-7 w-16 animate-pulse rounded bg-muted" />
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  )
}
