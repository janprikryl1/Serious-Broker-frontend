import type { FC } from "react"
import { Input } from "@/components/ui/input.tsx"

type StrFieldProps = {
  label: string
  value: string
  onChange: (v: string) => void
}

export const StrField: FC<StrFieldProps> = ({ label, value, onChange }) => (
  <div>
    <p className="mb-0.5 text-xs text-gray-500">{label}</p>
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-[#3a3530] bg-[#1a1916] text-gray-200 focus-visible:border-[#c9a961] focus-visible:ring-0"
    />
  </div>
)