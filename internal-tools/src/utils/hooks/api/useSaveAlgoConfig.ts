import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/utils/axiosInstance.ts'
import { ApiRoutes } from '@/utils/constants/apiRoutes.ts'
import type { AlgoConfig, AlgoConfigType } from '@/utils/types/AlgoConfig.ts'

type SavePayload = {
  type: AlgoConfigType
  config: AlgoConfig
}

export const useSaveAlgoConfig = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: SavePayload) => {
      const response = await axiosInstance.post<{ success: boolean }>(
        ApiRoutes.ALGO_CONFIG,
        payload,
      )
      return response.data
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['algo_config', variables.type] })
    },
  })
}
