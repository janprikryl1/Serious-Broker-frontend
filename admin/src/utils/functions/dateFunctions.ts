import { format } from "date-fns"

/** Shodný výstup jako `toCzechDateFormat` ve webu, jen přes date-fns. */
export const toCzechDateFormat = (dateRaw: string): string =>
  format(new Date(dateRaw), "dd. MM. yyyy HH:mm")

export const toCzechDate = (dateRaw: string | Date): string =>
  format(new Date(dateRaw), "dd. MM. yyyy")
