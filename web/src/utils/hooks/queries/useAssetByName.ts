import {queryOptions, useQuery} from "@tanstack/react-query";
import {getAssetByIndexLabel} from "../../api/binanceIndexAssets.ts";
import {AssetDetailType} from "../../types/asset/AssetDetailType.ts";

// Backend drží výsledek v cache hodinu, kratší staleTime by jen přidal requesty.
const ASSET_STALE_TIME = 60 * 60 * 1000;

export const assetByNameQueryKey = (name: string) => ["asset-by-name", name] as const;

export const assetByNameQueryOptions = (name: string) => queryOptions({
    queryKey: assetByNameQueryKey(name),
    queryFn: async () => {
        const response = await getAssetByIndexLabel(name);
        return (response?.data ?? null) as AssetDetailType | null;
    },
    staleTime: ASSET_STALE_TIME,
});

/** Detail indexu z `get_asset_by_id.php`. Bez jména se nic nestahuje. */
export const useAssetByName = (name?: string) => useQuery({
    ...assetByNameQueryOptions(name ?? ""),
    enabled: !!name,
});
