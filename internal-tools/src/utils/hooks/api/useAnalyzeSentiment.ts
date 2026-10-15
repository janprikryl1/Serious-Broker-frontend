import { useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "@/utils/axiosInstance.ts";
import { ApiRoutes } from "@/utils/constants/apiRoutes.ts";
import type { SentimentAnalysisResponse } from "@/utils/types/SentimentAnalysisResponse.ts"

export const useAnalyzeSentiment = () => {
  const queryClient = useQueryClient();
  
  return useMutation<SentimentAnalysisResponse, Error, string>({
    mutationFn: async (text: string) => {
      const response = await axiosInstance.get(ApiRoutes.EVAULATE_ARTICLE, {
        params: { text },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historicalEvents'] });
    },
  });
};