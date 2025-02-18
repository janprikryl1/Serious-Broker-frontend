import { FC, useEffect, useState, useRef, useCallback } from "react";
import { TitleHeader } from "../../components/modules/about/TitleHeader.tsx";
import { AssetSkeleton } from "../../components/modules/graphs/asset/AssetSkeleton.tsx";
import { AssetCard } from "../../components/modules/graphs/asset/AssetCard.tsx";
import { MostProfitableAssetDetailType } from "../../utils/types/graphs/MostProfitableAssetDetailType.ts";
import {getMostProfitableAssets} from "../../utils/api/binanceIndexAssets.ts";

export const MostProfitableAssets: FC = () => {
    const [assets, setAssets] = useState<MostProfitableAssetDetailType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const isFetchingRef = useRef<boolean>(false);

    const getAssets = useCallback(async (reset: boolean = false) => {
        if (isFetchingRef.current || (page > totalPages && !reset)) return;

        isFetchingRef.current = true;
        setLoading(true);

        const response = await getMostProfitableAssets(reset ? 1 : page, 10);
        if (response) {
            setAssets((prev) => (reset ? response.data.data : [...prev, ...response.data.data]));
            setTotalPages(response.data.totalPages);
        }

        setLoading(false);
        isFetchingRef.current = false;
    }, [page]);

    useEffect(() => {
        getAssets(true);
    }, []);

    useEffect(() => {
        getAssets();
    }, [page]);

    useEffect(() => {
        if (!loaderRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && page < totalPages) {
                    setPage((prev) => prev + 1);
                }
            },
            { root: null, rootMargin: "100px", threshold: 1.0 }
        );

        observerRef.current.observe(loaderRef.current);

        return () => observerRef.current?.disconnect();
    }, [loading, totalPages, page]);

    return (
        <div>
            <TitleHeader title="Most Profitable Assets" />
            <div className="blog padding-top padding-bottom section-bg-color">
                <div className="container">
                    <div className="blog__wrapper">
                        <div className="row g-4">
                            {assets.map((asset) => (
                                // @ts-ignore
                                <AssetCard index={asset.id} label={asset.name} details={asset.assets} key={asset.name} data={asset.profit_list} setAssets={setAssets} inWatchList={asset.in_watchlist} />
                            ))}
                        </div>
                        <div ref={loaderRef}>
                            {loading && <AssetSkeleton />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
