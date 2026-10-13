import { useState, type FC } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Plus } from "lucide-react"
import {
  addMembership,
  editMembership,
  getMembershipByUserId,
} from "@/utils/api/membershipService.ts"
import { Button } from "@/components/ui/button.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import { MembershipForm } from "@/components/users/MembershipForm.tsx"
import { toCzechDate } from "@/utils/functions/dateFunctions.ts"

type Props = {
  userId: number
}

export const MembershipManagement: FC<Props> = ({ userId }) => {
  const queryClient = useQueryClient()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const membershipsKey = ["memberships", userId]

  const { data: memberships, isPending } = useQuery({
    queryKey: membershipsKey,
    queryFn: () => getMembershipByUserId(userId),
  })

  /*
   * Původní kód si po uložení přepisoval lokální pole ručně. Invalidace
   * dotazu je kratší a nemůže se rozejít se serverem — mimo jiné proto, že
   * `datetime_end` dopočítává backend.
   */
  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: membershipsKey })
  }

  const createMutation = useMutation({
    mutationFn: ({
      price,
      dateTimeEnd,
    }: {
      price: number
      dateTimeEnd: string
    }) => addMembership(userId, price, dateTimeEnd),
    onSuccess: () => {
      invalidate()
      setIsAdding(false)
      toast.success("Členství přidáno")
    },
    onError: () => toast.error("Členství se nepodařilo přidat"),
  })

  const updateMutation = useMutation({
    mutationFn: ({
      membershipId,
      price,
      dateTimeEnd,
    }: {
      membershipId: number
      price: number
      dateTimeEnd: string
    }) => editMembership(userId, membershipId, price, dateTimeEnd),
    onSuccess: () => {
      invalidate()
      setEditingId(null)
      toast.success("Členství upraveno")
    },
    onError: () => toast.error("Členství se nepodařilo upravit"),
  })

  const isMutating = createMutation.isPending || updateMutation.isPending

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold">Členství</h3>

      {isPending ? (
        <div className="space-y-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : (
        <>
          {memberships?.length === 0 && !isAdding && (
            <p className="text-sm text-muted-foreground">Žádné členství.</p>
          )}

          <ul className="space-y-2">
            {memberships?.map((membership) => (
              <li key={membership.id} className="rounded-lg border p-3">
                {editingId === membership.id ? (
                  <MembershipForm
                    price={membership.price}
                    dateTimeEnd={membership.datetime_end}
                    isSaving={isMutating}
                    onCancel={() => setEditingId(null)}
                    onSave={(price, dateTimeEnd) =>
                      updateMutation.mutate({
                        membershipId: membership.id,
                        price,
                        dateTimeEnd,
                      })
                    }
                  />
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm">
                      <p className="font-medium">{membership.price} Kč</p>
                      <p className="text-muted-foreground">
                        {toCzechDate(membership.created)} –{" "}
                        {toCzechDate(membership.datetime_end)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingId(membership.id)}
                    >
                      Upravit
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {isAdding ? (
            <div className="rounded-lg border p-3">
              <MembershipForm
                isSaving={isMutating}
                onCancel={() => setIsAdding(false)}
                onSave={(price, dateTimeEnd) =>
                  createMutation.mutate({ price, dateTimeEnd })
                }
              />
            </div>
          ) : (
            editingId === null && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAdding(true)}
              >
                <Plus className="size-4" />
                Přidat členství
              </Button>
            )
          )}
        </>
      )}
    </section>
  )
}
