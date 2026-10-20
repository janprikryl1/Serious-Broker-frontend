import { Tooltip as TooltipPrimitive } from "radix-ui"
import type { FC, ReactNode } from "react"

export const TooltipProvider = TooltipPrimitive.Provider

type Props = {
  content: string
  children: ReactNode
  side?: "top" | "bottom" | "left" | "right"
}

export const Tooltip: FC<Props> = ({ content, children, side = "top" }) => (
  <TooltipPrimitive.Root delayDuration={200}>
    <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        side={side}
        sideOffset={6}
        className="z-50 max-w-[220px] rounded-lg border border-[#3a3530] bg-[#1a1916] px-3 py-2 text-xs leading-snug text-[#d4c9a8] shadow-lg"
      >
        {content}
        <TooltipPrimitive.Arrow className="fill-[#3a3530]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
)
