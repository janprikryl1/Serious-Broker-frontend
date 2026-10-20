import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "@/utils/axiosInstance.ts"
import { ApiRoutes } from "@/utils/constants/apiRoutes.ts"
import type { CoinHistory } from "@/utils/types/CoinHistory.ts"

export const useGetCoinHistory = (coin: string, period: number = 30) => {
return useQuery({
  queryKey: ['coin_history', coin, period],
  queryFn: async () => {
    const response = await axiosInstance.get<CoinHistory>(ApiRoutes.COIN_HISTORY, {
      params: {
        coin,
        period
      },
    });
    return response.data;
  },
  refetchOnWindowFocus: false
});
}