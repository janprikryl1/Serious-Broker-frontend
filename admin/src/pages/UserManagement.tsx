import { useState, type FC } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Mail } from "lucide-react"
import { getAllUsers, updateUser } from "@/utils/api/adminService.ts"
import { UsersTable } from "@/components/users/UsersTable.tsx"
import { UserEditDialog } from "@/components/users/UserEditDialog.tsx"
import { Button } from "@/components/ui/button.tsx"
import type { UserType } from "@/utils/types/user.ts"

const USERS_QUERY_KEY = ["admin", "users"]

export const UserManagement: FC = () => {
  const queryClient = useQueryClient()
  const [selectedUser, setSelectedUser] = useState<UserType>()

  const {
    data: users,
    isPending,
    isError,
  } = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: getAllUsers,
  })

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
      setSelectedUser(undefined)
      toast.success("Uživatel uložen")
    },
    onError: () => toast.error("Uživatele se nepodařilo uložit"),
  })

  /*
   * mailto: se všemi adresami. Pozor, u většího počtu uživatelů delší URL
   * mailový klient utne — na opravdovou hromadnou korespondenci je
   * newsletter, tohle je jen zkratka.
   */
  const mailtoAll = users?.length
    ? `mailto:${users.map((user) => user.email).join(",")}`
    : undefined

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Správa uživatelů</h1>
        <Button asChild variant="outline" disabled={!mailtoAll}>
          <a href={mailtoAll ?? "#"}>
            <Mail className="size-4" />
            Napsat všem
          </a>
        </Button>
      </header>

      {isError ? (
        <p className="text-sm text-destructive">
          Uživatele se nepodařilo načíst.
        </p>
      ) : (
        <UsersTable
          users={users ?? []}
          isLoading={isPending}
          onRowClick={setSelectedUser}
        />
      )}

      <UserEditDialog
        user={selectedUser}
        open={selectedUser !== undefined}
        onClose={() => setSelectedUser(undefined)}
        onSubmit={(user) => updateMutation.mutate(user)}
        isSaving={updateMutation.isPending}
      />
    </div>
  )
}
