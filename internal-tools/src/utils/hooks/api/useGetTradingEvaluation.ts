import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/utils/axiosInstance.ts'
import { ApiRoutes } from '@/utils/constants/apiRoutes.ts'
import type { TradingEvaluationResponse, TradingStrategy } from '@/utils/types/TradingEvaluation.ts'

type Params = {
  strategy: TradingStrategy
  from: string
  to: string
}

export const useGetTradingEvaluation = (params: Params, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['trading_evaluation', params.strategy, params.from, params.to],
    queryFn: async () => {
      const response = await axiosInstance.get<TradingEvaluationResponse>(
        ApiRoutes.TRADING_EVALUATION,
        {
          params: {
            strategy: params.strategy,
            from: params.from,
            to: params.to
          },
        }
      )
      return response.data
    },
    enabled,
    refetchOnWindowFocus: false,
  })
}
