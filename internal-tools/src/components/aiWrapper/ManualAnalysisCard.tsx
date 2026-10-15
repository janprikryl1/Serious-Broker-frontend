import { type FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Link as LinkIcon,
  FileText,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react"
import { useAnalyzeSentiment } from "@/utils/hooks/api/useAnalyzeSentiment.ts"
import { toast } from "sonner"

export const ManualAnalysisCard: FC = () => {
  const [inputText, setInputText] = useState("");
  const { mutate, isPending, error, data } = useAnalyzeSentiment();

  const isUrl = inputText.trim().startsWith('http');

  const handleAnalyze = () => {
    if (!inputText.trim()) return;

    mutate(inputText.trim(), {
      onSuccess: () => {
        setInputText("");
      },
      onError: () => {
        toast.error("Nastala chyba při analýze. Zkuste to znovu.");
      }
    });
  };

  return (
    <div className="mb-8">
      <Card className="bg-[#2a2620] border-[#c9a961]/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#c9a961]" />
            Manuální AI vyhodnocení
          </CardTitle>
          <CardDescription className="text-gray-400">
            Vložte odkaz z platformy X nebo text k analýze sentimentu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder="Vložte URL nebo text článku..."
                className="bg-[#1a1916] border-[#3a3530] text-gray-200 min-h-[140px] focus:border-[#c9a961] transition-all resize-none"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="absolute bottom-3 right-3 flex gap-2">
                <Badge variant="outline" className="bg-[#1a1916] text-gray-500 border-[#3a3530] flex gap-1 items-center">
                  {isUrl ? <LinkIcon className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                  <span className="text-[10px] uppercase tracking-wider font-bold">
                    {isUrl ? "Odkaz" : "Text"}
                  </span>
                </Badge>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500 italic max-w-[200px]">
                {error && (
                  <span className="text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Chyba při analýze
                  </span>
                )}
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isPending || !inputText.trim()}
                className="bg-[#c9a961] hover:bg-[#a08749] text-[#1a1916] font-bold px-6 transition-colors shadow-md"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {isPending ? "Analyzuji..." : "Odeslat k analýze"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {data && (
        <Card className="bg-[#1a1916] border-l-4 border-l-[#c9a961] border-[#3a3530] mt-4">
          <CardContent>
            <div className="flex justify-between items-start mb-4">
              <Badge className={
                data.translated_test.sentiment === 'POSITIVE' ? 'bg-green-500/20 text-green-500 border-green-500/50' :
                  data.translated_test.sentiment === 'NEGATIVE' ? 'bg-red-500/20 text-red-500 border-red-500/50' :
                    'bg-gray-500/20 text-gray-400 border-gray-500/50'
              }>
                {data.translated_test.sentiment} ({(data.translated_test.score * 100).toFixed(0)}%)
              </Badge>
              <span className="text-[10px] text-gray-600">Model: {data.translated_test.model}</span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              {data.translated_test.reason}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};