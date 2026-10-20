import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/utils/axiosInstance.ts'
import { ApiRoutes } from '@/utils/constants/apiRoutes.ts'
import type { AlgoConfigResponse, AlgoConfigType } from '@/utils/types/AlgoConfig.ts'

export const useGetAlgoConfig = (type: AlgoConfigType, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['algo_config', type],
    queryFn: async () => {
      const response = await axiosInstance.get<AlgoConfigResponse>(ApiRoutes.ALGO_CONFIG, {
        params: { type },
      })
      return response.data
    },
    enabled,
    refetchOnWindowFocus: false,
  })
}
