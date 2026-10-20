export const fmtUsd = (n: number) => {
  return (
    n.toLocaleString("cs-CZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " USD"
  )
}