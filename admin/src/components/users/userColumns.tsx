import { createColumnHelper } from "@tanstack/react-table"
import { Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge.tsx"
import type { UserType } from "@/utils/types/user.ts"

const column = createColumnHelper<UserType>()

/**
 * Nahrazuje `GridColDef[]` z `useAdminUserManagement.ts`.
 *
 * Sloupce zůstávají stejné s jednou výjimkou: původní definice měla sloupec
 * `firm`, který v `UserType` neexistuje — DataGrid na něj jen vykresloval
 * prázdno. Tady by to byla typová chyba, takže je vypuštěný; `firm_name`,
 * `firm_id` a `firm_vat` zůstávají.
 */
export const userColumns = [
  column.accessor("id", { header: "Id", size: 60 }),
  column.accessor("nickname", { header: "Přezdívka" }),
  column.accessor("email", { header: "E-mail" }),
  column.accessor("role", {
    header: "Role",
    cell: (info) => <Badge variant="secondary">{info.getValue()}</Badge>,
  }),
  column.accessor("verified", {
    header: "Ověřen",
    cell: (info) =>
      info.getValue() ? (
        <Check className="size-4 text-emerald-500" aria-label="ano" />
      ) : (
        <X className="size-4 text-muted-foreground" aria-label="ne" />
      ),
  }),
  column.accessor("title_before", { header: "Titul před" }),
  column.accessor("firstname", { header: "Jméno" }),
  column.accessor("midlename", { header: "Prostřední jméno" }),
  column.accessor("surname", { header: "Příjmení" }),
  column.accessor("title_after", { header: "Titul za" }),
  column.accessor("firm_id", { header: "Firma IČO" }),
  column.accessor("firm_name", { header: "Firma" }),
  column.accessor("firm_vat", { header: "Firma DIČ" }),
  column.accessor("street", { header: "Ulice" }),
  column.accessor("street_number", { header: "Č. p." }),
  column.accessor("town", { header: "Město" }),
  column.accessor("country", { header: "Země" }),
]

/**
 * Výchozí viditelnost. Sloupců je 17, na obrazovku se nevejdou — podstatné
 * jsou vidět hned, zbytek se zapíná přes přepínač sloupců. V DataGridu se
 * tahle volba neřešila a tabulka se vodorovně rozjezdila.
 */
export const defaultColumnVisibility = {
  title_before: false,
  midlename: false,
  title_after: false,
  firm_id: false,
  firm_vat: false,
  street: false,
  street_number: false,
  town: false,
  country: false,
}
