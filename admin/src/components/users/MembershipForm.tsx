import { useState, type FC } from "react"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"

type Props = {
  price?: number
  dateTimeEnd?: string
  isSaving: boolean
  onSave: (price: number, dateTimeEnd: string) => void
  onCancel: () => void
}

export const MembershipForm: FC<Props> = ({
  price: initialPrice = 0,
  dateTimeEnd: initialDateTimeEnd = "",
  isSaving,
  onSave,
  onCancel,
}) => {
  const [price, setPrice] = useState(String(initialPrice))
  // Backend posílá datetime, `<input type="date">` bere jen YYYY-MM-DD.
  const [dateTimeEnd, setDateTimeEnd] = useState(
    initialDateTimeEnd.substring(0, 10)
  )

  const parsedPrice = Number.parseFloat(price)
  /*
   * Původní formulář posílal `parseFloat("")` → NaN, což v JSON skončilo jako
   * `null`. Tady se dá uložit jen platná cena a vyplněné datum.
   */
  const isValid = Number.isFinite(parsedPrice) && dateTimeEnd !== ""

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="membership-price">Cena</Label>
          <Input
            id="membership-price"
            type="number"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="membership-end">Konec členství</Label>
          <Input
            id="membership-end"
            type="date"
            value={dateTimeEnd}
            onChange={(event) => setDateTimeEnd(event.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/*
          type="button" je tu nutné — formulář členství je vnořený v <form>
          úpravy uživatele a submit by jinak uložil celého uživatele.
        */}
        <Button
          type="button"
          size="sm"
          disabled={!isValid || isSaving}
          onClick={() => onSave(parsedPrice, dateTimeEnd)}
        >
          {isSaving ? "Ukládání…" : "Uložit"}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Zrušit
        </Button>
      </div>
    </div>
  )
}
