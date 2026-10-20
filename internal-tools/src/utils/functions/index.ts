import { MONTH_STARTS, MONTHS_CZ } from "@/utils/constants/seasonality.ts"

export const toCzechDateTime = (dateRaw: string): string => {
  const date = new Date(dateRaw)

  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")

  return `${day}. ${month}. ${year} ${hours}:${minutes}`
}

export const toCzechDate = (dateRaw: string): string => {
  const date = new Date(dateRaw)

  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()

  return `${day}. ${month}. ${year}`
}

export const dayToMonthLabel = (day: number): string => {
  for (let i = MONTH_STARTS.length - 1; i >= 0; i--) {
    if (day >= MONTH_STARTS[i]) return MONTHS_CZ[i]
  }
  return ""
}