import { useQuery } from "@tanstack/react-query"
import type { PaginatedResponse } from "@/utils/types/PaginatedResponse.ts"
import { axiosInstance } from "@/utils/axiosInstance.ts"
import { ITEMS_PER_PAGE } from "@/utils/constants"
import { ApiRoutes } from "@/utils/constants/apiRoutes.ts"

export const useGetHistoricalArticles = (currentPage: number) => {
  return useQuery<PaginatedResponse>({
    queryKey: ['historicalEvents', currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get(ApiRoutes.HISTORICAL_EVENTS, {
        params: {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        },
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}