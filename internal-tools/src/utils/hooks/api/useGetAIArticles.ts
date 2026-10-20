import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance.ts";
import { ITEMS_PER_PAGE } from "@/utils/constants"
import { ApiRoutes } from "@/utils/constants/apiRoutes.ts"
import type { AIArticlesResponse } from "@/utils/types/AIArticlesResponse.ts"

export const useGetAIArticles = (page: number) => {
  return useQuery<AIArticlesResponse>({
    queryKey: ['historicalEvents', page],
    queryFn: async () => {
      const response = await axiosInstance.get(ApiRoutes.ARTICLES, {
        params: {
          page,
          limit: ITEMS_PER_PAGE
        },
      });
      return response.data;
    },
  });
}