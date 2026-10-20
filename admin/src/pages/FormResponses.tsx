import { useState, type FC } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Award, RotateCcw, Users } from "lucide-react"
import {
  getUserLites,
  getUserQuestions,
  resetOldResponses,
  resetUserResponses,
} from "@/utils/api/formsService.ts"
import { Button } from "@/components/ui/button.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"

export const FormResponses: FC = () => {
  const queryClient = useQueryClient()
  const [selectedUserId, setSelectedUserId] = useState<string>("")

  const { data: users = [], isPending: isUsersPending } = useQuery({
    queryKey: ["admin", "usersLite"],
    queryFn: getUserLites,
  })

  const {
    data: evaluation,
    isPending: isEvaluationPending,
    isError,
  } = useQuery({
    queryKey: ["admin", "userResponses", selectedUserId],
    queryFn: () => (selectedUserId ? getUserQuestions(selectedUserId) : null),
    enabled: Boolean(selectedUserId),
  })

  const resetOldMutation = useMutation({
    mutationFn: resetOldResponses,
    onSuccess: () => toast.success("Staré odpovědi byly resetovány"),
    onError: () => toast.error("Chyba při resetování odpovědí"),
  })

  const resetUserMutation = useMutation({
    mutationFn: () => resetUserResponses(selectedUserId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["admin", "userResponses", selectedUserId],
      })
      toast.success("Odpovědi uživatele byly resetovány")
    },
    onError: () => toast.error("Chyba při resetování odpovědí uživatele"),
  })

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Odpovědi na dotazníky</h1>
          <p className="text-sm text-muted-foreground">
            Prohlížení vyplněných investičních dotazníků jednotlivých uživatelů
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => resetOldMutation.mutate()}
          disabled={resetOldMutation.isPending}
        >
          <RotateCcw className="size-4" />
          Resetovat staré odpovědi (&gt; 1 rok)
        </Button>
      </header>

      {/* User selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium">Vyberte uživatele:</span>
          {isUsersPending ? (
            <Skeleton className="h-10 w-72" />
          ) : (
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger className="w-80">
                <SelectValue placeholder="-- Vyberte uživatele --" />
              </SelectTrigger>
              <SelectContent>
                {users.map((u) => (
                  <SelectItem key={u.id} value={String(u.id)}>
                    {u.firstname} {u.surname} ({u.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {selectedUserId && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => resetUserMutation.mutate()}
            disabled={resetUserMutation.isPending}
          >
            <RotateCcw className="size-4" />
            Resetovat odpovědi tohoto uživatele
          </Button>
        )}
      </div>

      {/* Results content */}
      {!selectedUserId ? (
        <Card className="flex min-h-[240px] items-center justify-center border-dashed">
          <div className="py-8 text-center text-muted-foreground">
            <Users className="mx-auto mb-2 size-8 opacity-40" />
            <p>
              Zvolte uživatele výše pro zobrazení jeho vyplněných odpovědí a
              hodnocení.
            </p>
          </div>
        </Card>
      ) : isEvaluationPending ? (
        <div className="space-y-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : isError || !evaluation ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-muted-foreground">
              Tento uživatel zatím nevyplnil žádný dotazník nebo data nejsou
              dostupná.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Summary evaluation card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Award className="size-5 text-amber-500" />
                    Vyhodnocení: {evaluation.evaluation?.name || "Profil"}
                  </CardTitle>
                  <CardDescription className="text-foreground/80">
                    {evaluation.evaluation?.description}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Celkové skóre
                  </span>
                  <div className="text-2xl font-bold text-primary">
                    {evaluation.total_score} b.
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {evaluation.scores_by_category && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {Object.entries(evaluation.scores_by_category).map(
                    ([cat, score]) => (
                      <Badge
                        key={cat}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {cat}: <span className="ml-1 font-bold">{score} b</span>
                      </Badge>
                    )
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detailed answers by category */}
          {evaluation.detailed_answers &&
            Object.entries(evaluation.detailed_answers).map(
              ([category, answers]) => (
                <Card key={category}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/3">Otázka</TableHead>
                          <TableHead>Odpověď</TableHead>
                          <TableHead className="w-20 text-right">
                            Body
                          </TableHead>
                          <TableHead className="w-1/3">Vysvětlení</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {answers.map((ans, idx) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: answer row
                          <TableRow key={idx}>
                            <TableCell className="text-xs font-medium">
                              {ans.question}
                            </TableCell>
                            <TableCell className="text-xs">
                              {ans.answer}
                            </TableCell>
                            <TableCell className="text-right font-mono text-xs font-semibold">
                              {ans.points}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {ans.explanation || "—"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )
            )}
        </div>
      )}
    </div>
  )
}
