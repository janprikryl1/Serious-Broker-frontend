import { type FC, useMemo, useState } from "react"
import { X, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs.tsx"
import { useGetAlgoConfig } from "@/utils/hooks/api/useGetAlgoConfig.ts"
import { useSaveAlgoConfig } from "@/utils/hooks/api/useSaveAlgoConfig.ts"
import { SMA_DEFAULT, EMA_DEFAULT } from "@/utils/constants/tradingResults.ts"
import type { AlgoConfig, AlgoConfigType } from "@/utils/types/AlgoConfig.ts"
import { ConfigForm } from "@/components/tradingResults/ConfigForm.tsx"

type Props = {
  open: boolean
  onClose: () => void
}

function deepClone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v))
}

export const ConfigSidebar: FC<Props> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState<AlgoConfigType>("sma")
  const [smaEdits, setSmaEdits] = useState<AlgoConfig | null>(null)
  const [emaEdits, setEmaEdits] = useState<AlgoConfig | null>(null)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  const { data: smaData, isLoading: smaLoading } = useGetAlgoConfig("sma", open)
  const { data: emaData, isLoading: emaLoading } = useGetAlgoConfig("ema", open)
  const { mutate: save, isPending: isSaving } = useSaveAlgoConfig()

  // Derived configs: user edits take priority, fall back to server data, then defaults
  const smaConfig = useMemo(
    () => smaEdits ?? deepClone(smaData?.data ?? SMA_DEFAULT),
    [smaEdits, smaData],
  )
  const emaConfig = useMemo(
    () => emaEdits ?? deepClone(emaData?.data ?? EMA_DEFAULT),
    [emaEdits, emaData],
  )

  const currentConfig = activeTab === "sma" ? smaConfig : emaConfig
  const isLoading = activeTab === "sma" ? smaLoading : emaLoading

  const handleSave = () => {
    setSaveStatus("idle")
    save(
      { type: activeTab, config: currentConfig },
      {
        onSuccess: () => {
          if (activeTab === "sma") setSmaEdits(null)
          else setEmaEdits(null)
          setSaveStatus("success")
          setTimeout(() => setSaveStatus("idle"), 3000)
        },
        onError: () => {
          setSaveStatus("error")
          setTimeout(() => setSaveStatus("idle"), 4000)
        },
      },
    )
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#1e1c18] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-[#3a3530] px-4 py-3">
          <h3 className="text-base font-semibold text-white">Nastavení algoritmů</h3>
          <Button variant="ghost" size="icon-sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X />
          </Button>
        </div>
        
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as AlgoConfigType)}
          className="flex-1 overflow-hidden"
        >
          <TabsList className="w-full rounded-none border-b border-[#3a3530] bg-transparent px-4">
            <TabsTrigger value="sma" className="flex-1 data-[state=active]:text-[#c9a961]">
              SMA-14
            </TabsTrigger>
            <TabsTrigger value="ema" className="flex-1 data-[state=active]:text-[#c9a961]">
              EMA-21
            </TabsTrigger>
          </TabsList>

          {(["sma", "ema"] as AlgoConfigType[]).map((tab) => (
            <TabsContent key={tab} value={tab} className="h-full overflow-y-auto p-4">
              {isLoading && activeTab === tab ? (
                <div className="flex h-40 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-[#c9a961]" />
                </div>
              ) : (
                <ConfigForm
                  config={tab === "sma" ? smaConfig : emaConfig}
                  type={tab}
                  onChange={tab === "sma" ? setSmaEdits : setEmaEdits}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* footer */}
        <div className="space-y-2 border-t border-[#3a3530] px-4 py-3">
          {saveStatus === "success" && (
            <div className="flex items-center gap-2 text-sm text-green-400">
              <CheckCircle className="h-4 w-4" />
              Konfigurace uložena
            </div>
          )}
          {saveStatus === "error" && (
            <div className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" />
              Chyba při ukládání
            </div>
          )}
          <Button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="w-full bg-[#c9a961] text-[#1a1916] hover:bg-[#d4b96c]"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
            Uložit konfiguraci
          </Button>
        </div>
      </div>
    </>
  )
}
