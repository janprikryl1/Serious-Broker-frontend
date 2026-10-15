import type { FC } from "react"

type SelectFieldProps = {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}

export const SelectField: FC<SelectFieldProps> = ({
  label,
  value,
  options,
  onChange,
}) => (
  <div>
    <p className="mb-0.5 text-xs text-gray-500">{label}</p>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 w-full rounded-lg border border-[#3a3530] bg-[#1a1916] px-2.5 py-1 text-sm text-gray-200 focus:border-[#c9a961] focus:outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
)