import { FC, useEffect, useState, useRef, useCallback } from "react";
import { AssetType } from "../../utils/types/asset/AssetType.ts";
import { useTranslation } from "react-i18next";
import { AssetOrder } from "../../utils/enums/AssetOrderEnum.ts";
import { getAllAssets } from "../../utils/api/binanceIndexAssets.ts";
import { TitleHeader } from "../../components/about/TitleHeader.tsx";
import { AssetSkeleton } from "../../components/graphs/asset/AssetSkeleton.tsx";
import { AssetCard } from "../../components/graphs/asset/AssetCard.tsx";
import { pageLimit } from "../../utils/constants";
import { SeasonButton } from "../../components/overview/SeasonButton.tsx";
import {useInfiniteScroll} from "../../utils/hooks/useInfiniteScroll.ts";

export const Assets: FC = () => {
    const { t } = useTranslation();
    const [assets, setAssets] = useState<AssetType[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [orderType, setOrderType] = useState<AssetOrder>(AssetOrder.WeeklyProfit);
    const isFetchingRef = useRef<boolean>(false);
    const { currentPage, loaderRef, resetPage } = useInfiniteScroll({totalPages, loading});

    const getAssets = useCallback(async (reset: boolean = false) => {
        if (isFetchingRef.current || (currentPage > totalPages && !reset)) return;
        isFetchingRef.current = true;
        setLoading(true);
        const response = await getAllAssets(reset ? 1 : currentPage, pageLimit, orderType);
        if (response) {
            setAssets((prev) => (reset ? response.data.data : [...prev, ...response.data.data]));
            setTotalPages(response.data.totalPages);
        }
        setLoading(false);
        isFetchingRef.current = false;
    }, [currentPage, orderType, totalPages]);

    useEffect(() => {
        getAssets(true);
    }, [orderType]);

    useEffect(() => {
        getAssets();
    }, [currentPage]);

    const handleOrderTypeChange = (orderTypeItem: AssetOrder) => {
        setAssets([]);
        resetPage();
        setOrderType(orderTypeItem);
    };

    return (
        <>
            <TitleHeader title="Assets" />
            <div className="blog padding-top padding-bottom">
                <div className="container">
                    <div className="blog__wrapper">
                        <p className="text-white">
                            {t("Crypto indices provide a way to measure a performance of a selection of cryptocurrencies")}
                        </p>
                        <p>{t("Order by")}</p>
                        <div className="col-sm season-button-group chart-type mb-3" style={{ minWidth: 370 }}>
                            {Object.values(AssetOrder).map((orderTypeItem) => (
                                <SeasonButton
                                    key={orderTypeItem}
                                    seasonValue={orderTypeItem}
                                    isActive={orderTypeItem === orderType}
                                    onSelect={() => handleOrderTypeChange(orderTypeItem)}
                                />
                            ))}
                        </div>

                        <div className="row g-8">
                            {assets.map((asset) => (
                                // @ts-ignore
                                <AssetCard index={asset.id} label={asset.name} details={asset.label} key={asset.id} data={asset.profit_list} inWatchList={asset.in_watchlist} setAssets={setAssets} dailyChange={asset.daily_change} />
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