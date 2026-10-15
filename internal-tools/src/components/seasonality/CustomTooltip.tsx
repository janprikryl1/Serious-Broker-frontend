import { dayToMonthLabel } from "@/utils/functions"

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  const month = dayToMonthLabel(label as number)
  return (
    <div className="min-w-[160px] rounded-lg border border-[#3a3530] bg-[#1a1916] p-3 text-sm shadow-lg">
      <p className="mb-2 text-gray-400">
        Den {label} · {month}
      </p>
      {payload.map((entry: { name: string; value: number; color: string }) => (
        <div
          key={entry.name}
          className="flex items-center justify-between gap-4"
        >
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span
            className={entry.value >= 0 ? "text-green-400" : "text-red-400"}
          >
            {entry.value >= 0 ? "+" : ""}
            {entry.value.toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  )
}
