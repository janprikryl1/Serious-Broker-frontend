import { useState, type FC, type FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  Award,
  Clock,
  Plus,
  Search,
  Sparkles,
  Trophy,
  User,
} from "lucide-react"
import { getAllUsers } from "@/utils/api/adminService.ts"
import {
  adminAddAchievement,
  adminUserAchievements,
  giveAchievementsForLongPeriod,
} from "@/utils/api/achievementService.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"
import type { UserType } from "@/utils/types/user.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { cn } from "@/lib/utils.ts"

export const AchievementsManagement: FC = () => {
  const queryClient = useQueryClient()
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [achievementText, setAchievementText] = useState("")

  const { data: users = [], isPending: isUsersPending } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: getAllUsers,
  })

  const { data: achievements = [], isPending: isAchievementsPending } =
    useQuery({
      queryKey: ["admin", "achievements", selectedUser?.id],
      queryFn: () =>
        selectedUser ? adminUserAchievements(selectedUser.id) : [],
      enabled: selectedUser !== null,
    })

  const checkActivityMutation = useMutation({
    mutationFn: giveAchievementsForLongPeriod,
    onSuccess: () => {
      toast.success("Aktivita zkontrolována a achievementy uděleny")
      if (selectedUser) {
        void queryClient.invalidateQueries({
          queryKey: ["admin", "achievements", selectedUser.id],
        })
      }
    },
    onError: () => toast.error("Kontrola aktivity selhala"),
  })

  const addMutation = useMutation({
    mutationFn: ({ userId, text }: { userId: number; text: string }) =>
      adminAddAchievement(userId, text),
    onSuccess: () => {
      if (selectedUser) {
        void queryClient.invalidateQueries({
          queryKey: ["admin", "achievements", selectedUser.id],
        })
      }
      toast.success("Achievement přidán")
      setIsAddOpen(false)
      setAchievementText("")
    },
    onError: () => toast.error("Nepodařilo se přidat achievement"),
  })

  const filteredUsers = users.filter((u) => {
    if (!searchTerm.trim()) return true
    const term = searchTerm.toLowerCase()
    return (
      (u.nickname || "").toLowerCase().includes(term) ||
      (u.email || "").toLowerCase().includes(term) ||
      (u.firstname || "").toLowerCase().includes(term) ||
      (u.surname || "").toLowerCase().includes(term)
    )
  })

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!selectedUser || !achievementText.trim()) return
    addMutation.mutate({ userId: selectedUser.id, text: achievementText })
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Správa achievementů</h1>
          <p className="text-sm text-muted-foreground">
            Udělování ocenění za aktivitu a manuální přidávání achievementů
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => checkActivityMutation.mutate()}
          disabled={checkActivityMutation.isPending}
        >
          <Sparkles className="size-4" />
          Zkontrolovat aktivitu a udělit ocenění
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* User Selection List */}
        <div className="space-y-3 lg:col-span-5">
          <div className="relative">
            <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Hledat uživatele podle jména, nicku, emailu..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="max-h-[600px] overflow-y-auto rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Uživatel</TableHead>
                  <TableHead className="text-right">Akce</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isUsersPending ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-36" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="ml-auto h-4 w-12" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="py-6 text-center text-muted-foreground"
                    >
                      Žádní uživatelé neodpovídají hledání.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((u) => {
                    const isSelected = selectedUser?.id === u.id
                    return (
                      <TableRow
                        key={u.id}
                        onClick={() => setSelectedUser(u)}
                        className={cn(
                          "cursor-pointer transition-colors",
                          isSelected
                            ? "bg-primary/10 hover:bg-primary/15"
                            : "hover:bg-muted/50"
                        )}
                      >
                        <TableCell>
                          <div className="font-medium">
                            {u.firstname} {u.surname}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {u.nickname} ({u.email})
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant={isSelected ? "default" : "ghost"}
                          >
                            {isSelected ? "Vybráno" : "Zobrazit"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Selected User Achievements Details */}
        <div className="lg:col-span-7">
          {selectedUser ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="size-5" />
                    {selectedUser.firstname} {selectedUser.surname}
                  </CardTitle>
                  <CardDescription>
                    {selectedUser.nickname} • {selectedUser.email}
                  </CardDescription>
                </div>
                <Button size="sm" onClick={() => setIsAddOpen(true)}>
                  <Plus className="size-4" />
                  Přidat achievement
                </Button>
              </CardHeader>
              <CardContent>
                {isAchievementsPending ? (
                  <div className="space-y-3 py-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ) : achievements.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">
                    <Trophy className="mx-auto mb-2 size-8 opacity-40" />
                    <p>Uživatel zatím nezískal žádné achievementy.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {achievements.map((ach, idx) => (
                      <div
                        key={ach.id}
                        className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3"
                      >
                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          #{idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{ach.text}</p>
                          <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="size-3" />
                            {toCzechDateFormat(ach.created)}
                          </p>
                        </div>
                        <Award className="size-5 shrink-0 text-amber-500" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="flex min-h-[300px] items-center justify-center border-dashed">
              <div className="text-center text-muted-foreground">
                <Trophy className="mx-auto mb-2 size-10 opacity-30" />
                <p>
                  Vyberte uživatele vlevo pro zobrazení a správu achievementů.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Add Achievement Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nový achievement pro uživatele</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Uživatel: {selectedUser?.firstname} {selectedUser?.surname} (
              {selectedUser?.nickname})
            </p>
            <div className="space-y-1.5">
              <Label htmlFor="ach-text">Text ocenění / achievementu</Label>
              <Input
                id="ach-text"
                placeholder="např. Úspěšně dokončen první investiční plán"
                value={achievementText}
                onChange={(e) => setAchievementText(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddOpen(false)}
              >
                Zrušit
              </Button>
              <Button
                type="submit"
                disabled={addMutation.isPending || !achievementText.trim()}
              >
                {addMutation.isPending ? "Přidávání..." : "Udělit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
