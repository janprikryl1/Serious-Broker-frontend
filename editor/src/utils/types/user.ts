/**
 * Zrcadlí `web/src/utils/types/user/userTypes.ts`. Oba projekty mluví se
 * stejným backendem, takže když se typ změní tam, musí se změnit i tady.
 */
/*
 * Záměrně const object, ne `enum` — tsconfig má `erasableSyntaxOnly`, takže
 * enum (který generuje runtime kód) neprojde. Použití `UserRole.Admin`
 * zůstává stejné jako ve webu.
 */
export const UserRole = {
  Default: "member",
  Editor: "editor",
  Admin: "admin",
  Manager: "manager",
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export type UserType = {
  id: number
  role: UserRole
  status: string
  superior_id?: number
  nickname: string
  email: string
  firstname?: string
  surname?: string
  midlename?: string
  title_before?: string
  title_after?: string
  firm_name?: string
  firm_id?: string
  firm_vat?: string
  street?: string
  street_number?: string
  town?: string
  country: string
  /* Posílá se jen při změně hesla, backend ho nikdy nevrací. */
  password?: string
  changed: string
  created: string
  newsletter_subscription: boolean
  receive_messages: boolean
  verified: boolean
  language: string
  has_filled_form: boolean
}

export type IsAuthenticatedResponse = {
  status: string
  admin: boolean
  user: UserType
}
