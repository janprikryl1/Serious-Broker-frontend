import type { FC } from "react"
import { Card, CardContent, CardTitle } from "../ui/card"
import { CardHeader } from "@/components/ui/card.tsx"
import { X } from "lucide-react"

export const FollowedChannels:FC = () => {
  return (
    <div>
      <Card className="bg-[#2a2620] border-[#3a3530]">
        <CardHeader>
          <CardTitle className="text-white">Sledované Kanály</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <X className="w-4 h-4 text-[#c9a961]" />
              <a href="https://x.com/WatcherGuru"><span>@Watcher.Guru</span></a>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <a href="https://news.treeofalpha.com/"><span>treeofalpha.com</span></a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}