import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance.ts";
import { ApiRoutes } from "@/utils/constants/apiRoutes.ts";
import type { FgiHistory } from "@/utils/types/FgiHistory.ts";

export const useGetFgiHistory = (limit: number = 30) => {
  return useQuery({
    queryKey: ['fgi_history', limit],
    queryFn: async () => {
      const response = await axiosInstance.get<FgiHistory>(ApiRoutes.FGI_HISTORY, {
        params: { limit },
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};