import type { FC, ReactNode } from "react"

type SectionProps = { title: string; children: ReactNode }

export const Section: FC<SectionProps> = ({ title, children }) => (
  <div className="space-y-3">
    <h4 className="border-b border-[#3a3530] pb-1 text-xs font-semibold tracking-widest text-[#c9a961] uppercase">
      {title}
    </h4>
    <div className="grid grid-cols-2 gap-2">{children}</div>
  </div>
)