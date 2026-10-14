export type CryptoCurrencyType = {
  id: number
  name: string
  symbol: string
  photo?: string | null
  stylized_image?: string | null
}

export type CryptoCurrencyAdminType = Omit<CryptoCurrencyType, "photo"> & {
  photo: File | null
  stylized_image: string
}

export type CryptoCurrencyNewType = Omit<CryptoCurrencyType, "photo"> & {
  price: number
  marketcap: string
  category: string
  max_supply: number
  circulating_supply: string
  website: string
  whitepaper: string
  reddit: string
  twitter: string
  telegram: string
  cmc_rank: number
  date: string
  photo: File | null
  stylized_image_file: File | null
}
