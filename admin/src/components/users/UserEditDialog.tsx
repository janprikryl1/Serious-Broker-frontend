import { useState, type FC } from "react"
import { useForm, Controller } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Switch } from "@/components/ui/switch.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { MembershipManagement } from "@/components/users/MembershipManagement.tsx"
import { UserRole, type UserType } from "@/utils/types/user.ts"
import { toCzechDateFormat } from "@/utils/functions/dateFunctions.ts"

type Props = {
  user?: UserType
  open: boolean
  onClose: () => void
  onSubmit: (user: UserType) => void
  isSaving: boolean
}

/** Textová pole, která se jen propisují 1:1 — ať nejsou 15× opsaná v JSX. */
const TEXT_FIELDS = [
  { name: "nickname", label: "Přezdívka" },
  { name: "email", label: "E-mail" },
  { name: "title_before", label: "Titul před" },
  { name: "firstname", label: "Jméno" },
  { name: "midlename", label: "Prostřední jméno" },
  { name: "surname", label: "Příjmení" },
  { name: "title_after", label: "Titul za" },
  { name: "firm_id", label: "Firma IČO" },
  { name: "firm_name", label: "Firma" },
  { name: "firm_vat", label: "Firma DIČ" },
  { name: "street", label: "Ulice" },
  { name: "street_number", label: "Č. p." },
  { name: "town", label: "Město" },
  { name: "country", label: "Země" },
  { name: "language", label: "Jazyk" },
] as const satisfies readonly { name: keyof UserType; label: string }[]

const SWITCH_FIELDS = [
  { name: "newsletter_subscription", label: "Odběr newsletteru" },
  { name: "receive_messages", label: "Dostávat zprávy" },
  { name: "verified", label: "Ověřený účet" },
] as const satisfies readonly { name: keyof UserType; label: string }[]

type FormProps = {
  user: UserType
  onClose: () => void
  onSubmit: (user: UserType) => void
  isSaving: boolean
}

/**
 * Formulář je samostatná komponenta a dostává `key={user.id}`, takže se při
 * výběru jiného uživatele přemountuje.
 *
 * Původní `UserEditModal` místo toho v `useEffect` volal `reset()` a
 * `setShowPasswordField(false)` — tedy setState v effectu, což dělá kaskádové
 * rendery. S `key` stačí `defaultValues` a žádný effect není potřeba.
 */
const UserEditForm: FC<FormProps> = ({ user, onClose, onSubmit, isSaving }) => {
  const { control, handleSubmit, register } = useForm<UserType>({
    defaultValues: { ...user, password: undefined },
  })
  const [showPasswordField, setShowPasswordField] = useState(false)

  const submit = (data: UserType) => {
    const { password, ...rest } = data
    const updated: UserType = { ...user, ...rest }

    /*
     * Heslo se přidá jen když ho admin opravdu vyplnil. Původní kód spoléhal
     * na to, že `undefined` vypadne při serializaci, ale prázdný string by
     * prošel — a backend by nastavil prázdné heslo. Tady to projít nemůže.
     */
    if (showPasswordField && password && password.trim() !== "") {
      updated.password = password
    }

    onSubmit(updated)
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-1 flex-col min-h-0 overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
        {TEXT_FIELDS.map(({ name, label }) => (
          <div key={name} className="space-y-1.5">
            <Label htmlFor={name}>{label}</Label>
            <Input id={name} {...register(name)} />
          </div>
        ))}

        <div className="space-y-1.5">
          <Label htmlFor="role">Role</Label>
          {/*
            Ve webu to byl volný text input, takže se dala uložit neexistující
            role a uživatel tím ztratil přístup. Select nabídne jen hodnoty
            z UserRole.
          */}
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Vyber roli" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(UserRole).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        {SWITCH_FIELDS.map(({ name, label }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor={name}>{label}</Label>
                <Switch
                  id={name}
                  checked={Boolean(field.value)}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />
        ))}
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Vytvořen</Label>
          <Input value={toCzechDateFormat(user.created)} readOnly />
        </div>
        <div className="space-y-1.5">
          <Label>Změněn</Label>
          <Input value={toCzechDateFormat(user.changed)} readOnly />
        </div>
      </div>

      <div>
        {showPasswordField ? (
          <div className="space-y-1.5">
            <Label htmlFor="password">Nové heslo</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password")}
            />
            <p className="text-xs text-muted-foreground">
              Prázdné pole se neuloží — heslo zůstane nezměněné.
            </p>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPasswordField(true)}
          >
            Změnit heslo
          </Button>
        )}
      </div>

      <Separator />

      <MembershipManagement userId={user.id} />
      </div>

      <DialogFooter className="m-0 shrink-0 rounded-b-none border-t bg-popover/95 p-4 backdrop-blur-xs sm:px-6">
        <Button type="button" variant="ghost" onClick={onClose}>
          Zrušit
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Ukládání…" : "Uložit"}
        </Button>
      </DialogFooter>
    </form>
  )
}

export const UserEditDialog: FC<Props> = ({
  user,
  open,
  onClose,
  onSubmit,
  isSaving,
}) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 p-0 overflow-hidden sm:max-w-3xl">
        <DialogHeader className="shrink-0 border-b p-4 sm:p-6 pb-4">
          <DialogTitle>Úprava uživatele</DialogTitle>
          <DialogDescription>
            {user ? `#${user.id} — ${user.email}` : "Není vybraný uživatel"}
          </DialogDescription>
        </DialogHeader>

        {user && (
          <UserEditForm
            key={user.id}
            user={user}
            onClose={onClose}
            onSubmit={onSubmit}
            isSaving={isSaving}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
