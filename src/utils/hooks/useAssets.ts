import {useCallback, useRef, useState} from "react";
import {getAllAssets} from "../api/binanceIndexAssets.ts";
import {AssetType} from "../types/asset/AssetType.ts";
import {AssetOrder} from "../enums/AssetOrder.ts";
import {pageLimit} from "../constants";

type FetchAssetsParams = {
    page: number;
    currencyCount?: string;
    includeCurrencies?: string[];
    searchQuery?: string;
    orderType?: AssetOrder;
    sortDirection?: 'asc' | 'desc';
    timeRange?: string;
    isReset?: boolean;
    showAssets?: "mine" | "all";
}

export const useAssets = () => {
    const isFetchingRef = useRef<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [assets, setAssets] = useState<AssetType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getAssets = useCallback(async ({
                                                page,
                                                currencyCount,
                                                includeCurrencies,
                                                searchQuery,
                                                orderType,
                                                sortDirection,
                                                timeRange,
                                                isReset = false,
                                                showAssets = "all"
    }: FetchAssetsParams) => {

        if (isFetchingRef.current) return;
        if (!isReset && page > totalPages && totalPages !== 0) return;

        isFetchingRef.current = true;
        setLoading(true);

        try {
            let response;

            if (showAssets === "mine") {       // Show my assets
                // <MyPortfolio />
                // response = await getMyAssets(page, pageLimit, {
                //     searchQuery,
                //     order: {direction: sortDirection, orderType, timeRange}
                // });
            } else {                                // Show all assets
                response = await getAllAssets(
                    page,
                    pageLimit,
                    {
                        currencyCount: currencyCount ?? "all",
                        includeCurrencies: includeCurrencies ?? [],
                        searchQuery: searchQuery ?? "",
                        order: {
                            direction: sortDirection ?? 'asc',
                            orderType: orderType ?? AssetOrder.Name,
                            timeRange: timeRange ?? "24h"
                        }
                    }
                );
            }

            if (response) {
                setAssets((prev) => (isReset ? response.data.data : [...prev, ...response.data.data]));
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.error("Failed to fetch assets:", error);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, [totalPages]);

    const clearAssets = () => setAssets([]);

    return {
        assets,
        loading,
        totalPages,
        getAssets,
        clearAssets,
        setAssets
    };
}

