import { FC, useEffect, useState, useRef, useCallback } from "react";
import { AssetType } from "../../utils/types/asset/AssetType.ts";
import { useTranslation } from "react-i18next";
import { AssetOrder } from "../../utils/enums/AssetOrderEnum.ts";
import {getAllAssets} from "../../utils/api/binanceIndexAssets.ts";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {SeasonButton} from "../../components/index/SeasonButton.tsx";
import {AssetSkeleton} from "../../components/graphs/asset/AssetSkeleton.tsx";
import {AssetCard} from "../../components/graphs/asset/AssetCard.tsx";

export const Assets: FC = () => {
    const { t } = useTranslation();
    const [assets, setAssets] = useState<AssetType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [orderType, setOrderType] = useState<AssetOrder>(AssetOrder.WeeklyProfit);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const isFetchingRef = useRef<boolean>(false);
    
    const getAssets = useCallback(async (reset: boolean = false) => {
        if (isFetchingRef.current || (page > totalPages && !reset)) return;

        isFetchingRef.current = true;
        setLoading(true);

        const response = await getAllAssets(reset ? 1 : page, 10, orderType);
        if (response) {
            setAssets((prev) => (reset ? response.data.data : [...prev, ...response.data.data]));
            setTotalPages(response.data.totalPages);
        }

        setLoading(false);
        isFetchingRef.current = false;
    }, [page, orderType]);

    useEffect(() => {
        getAssets();
    }, [page, orderType]);

    useEffect(() => {
        if (!loaderRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !loading && page < totalPages) {
                    setPage((prev) => prev + 1);
                }
            },
            {
                root: null,
                rootMargin: "100px",
                threshold: 1.0,
            }
        );

        observerRef.current.observe(loaderRef.current);

        return () => observerRef.current?.disconnect();
    }, [loading, totalPages, page]);

    return (
        <>
            <TitleHeader title="Assets" />
            <div className="blog padding-top padding-bottom section-bg-color">
                <div className="container">
                    <div className="blog__wrapper">
                        <p className="text-white">
                            {t("Crypto indices provide a way to measure a performance of a selection of cryptocurrencies")}
                        </p>
                        <p>{t("Order by")}</p>
                        <div className="col-sm season-button-group chart-type mb-3" style={{ minWidth: 430 }}>
                            {Object.values(AssetOrder).map((orderTypeItem) => (
                                <SeasonButton
                                    key={orderTypeItem}
                                    seasonValue={orderTypeItem}
                                    isActive={orderTypeItem === orderType}
                                    onSelect={() => {
                                        setAssets([]);
                                        setPage(1);
                                        setOrderType(orderTypeItem);
                                    }}
                                />
                            ))}
                        </div>

                        <div className="row g-4">
                            {assets.map((asset) => (
                                // @ts-ignore
                                <AssetCard index={asset.id} label={asset.name} details={asset.label} key={asset.id} data={asset.profit_list} inWatchList={asset.in_watchlist} setAssets={setAssets}/>
                            ))}
                        </div>

                        <div ref={loaderRef} style={{marginTop: '20px'}}>
                            {loading && <AssetSkeleton />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
