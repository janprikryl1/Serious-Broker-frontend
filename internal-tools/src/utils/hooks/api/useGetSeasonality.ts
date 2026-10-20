import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "@/utils/axiosInstance.ts"
import { ApiRoutes } from "@/utils/constants/apiRoutes.ts"
import type { SeasonalityResponse } from "@/utils/types/SeasonalityResponse.ts"

export const useGetSeasonality = (year: number) => {
  return useQuery({
    queryKey: ['seasonality', year],
    queryFn: async () => {
      const response = await axiosInstance.get<SeasonalityResponse>(ApiRoutes.SEASONALITY, {
        params: { year },
      })
      return response.data
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  })
}
