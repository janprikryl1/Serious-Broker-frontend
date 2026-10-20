import { useState, type FC } from "react"
import type { FallbackProps } from "react-error-boundary"
import { TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"

export const ErrorFallback: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <TriangleAlert className="text-destructive size-12" />
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Nastala chyba</h1>
        <p className="text-muted-foreground">
          Zkus akci zopakovat. Pokud chyba trvá, pošli prosím detail níže.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button onClick={resetErrorBoundary}>Zkusit znovu</Button>
        <Button
          variant="outline"
          onClick={() => setShowDetails((shown) => !shown)}
          aria-expanded={showDetails}
        >
          {showDetails ? "Skrýt detail" : "Zobrazit detail"}
        </Button>
      </div>

      {showDetails && (
        <pre className="bg-muted text-muted-foreground max-w-prose overflow-x-auto rounded-lg p-4 text-left text-xs">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      )}
    </div>
  )
}
