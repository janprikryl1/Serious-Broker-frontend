import type { FC } from "react"
import { Input } from "@/components/ui/input.tsx"

type NumFieldProps = {
  label: string
  value: number
  onChange: (v: number) => void
  step?: number
  min?: number
  max?: number
};

export const NumField: FC<NumFieldProps> = ({
  label,
  value,
  onChange,
  step = 1,
  min,
  max,
}) => (
  <div>
    <p className="mb-0.5 text-xs text-gray-500">{label}</p>
    <Input
      type="number"
      step={step}
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border-[#3a3530] bg-[#1a1916] text-gray-200 focus-visible:border-[#c9a961] focus-visible:ring-0"
    />
  </div>
)