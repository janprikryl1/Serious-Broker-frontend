import { api } from "@/utils/api/axiosInstance.ts"
import type {
  CoinmarketCupCoinsListType,
  DemoType,
} from "@/utils/types/demo.ts"

export const getAllDemos = async (): Promise<DemoType[]> => {
  const res = await api.get<DemoType[]>("demo/get_all_demos.php")
  return res.data
}

export const getDemoById = async (id: string | number): Promise<DemoType> => {
  const res = await api.get<DemoType>("demo/get_demo_by_id.php", {
    params: { id },
  })
  return res.data
}

export const deleteDemo = async (id: number) => {
  const res = await api.delete("demo/delete_demo_by_id.php", {
    params: { id },
  })
  return res.data
}

export const saveDemo = async (demo: DemoType): Promise<DemoType> => {
  const res = await api.post<DemoType>("demo/save_demo.php", demo)
  return res.data
}

export const getTop10CoinmarketcupCoins = async (): Promise<
  CoinmarketCupCoinsListType[]
> => {
  const res = await api.get<CoinmarketCupCoinsListType[]>(
    "demo/get_top_ten_coins_on_coinmarketcup.php"
  )
  return res.data
}
