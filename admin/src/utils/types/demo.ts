export const WidgetsType = {
  Image: "Image",
  Article: "Article",
  COIN_GRAPH: "COIN_GRAPH",
  ASSET_GRAPHS: "ASSET_GRAPHS",
  GLOSSARY: "GLOSSARY",
  COINMARKETCUP_TOP_10: "COINMARKETCUP_TOP_10",
} as const

export type WidgetsType = (typeof WidgetsType)[keyof typeof WidgetsType]

export type DemoWidget = {
  type: WidgetsType
  propertyId: string
  visible: boolean
}

export type DemoType = {
  id?: number
  name: string
  description: string
  time_of_replace: number
  created?: string | Date
  widgets: DemoWidget[]
}

export type CoinmarketCupCoinsListType = {
  asset_label: string
  cmc_rank: number
}
