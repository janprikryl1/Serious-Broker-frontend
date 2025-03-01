import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {AssetDetailType, Assets} from "../../utils/types/asset/AssetDetailType.ts";
import { useTranslation } from "react-i18next";
import {getAssetByIndexLabel} from "../../utils/api/binanceIndexAssets.ts";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {AssetAnalysisGraph} from "../../components/graphs/asset/AssetAnalysisGraph.tsx";
import {AssetGraphDetails} from "../../components/graphs/asset/AssetGraphDetails.tsx";
import {AssetGraphCurrencyCard} from "../../components/graphs/asset/AssetGraphCurrencyCard.tsx";
import {AssetGraphPieChart} from "../../components/graphs/asset/AssetGraphPieChart.tsx";
import {AssetDetailSkeleton} from "../../components/graphs/asset/AssetDetailSkeleton.tsx";
import {Highlight} from "../../components/editor/highlights/Highlight.tsx";
import {QuotedCurrency} from "../../utils/types/graphs/QuotedCurrency.ts";
import {addToWatchList, removeFromWatchList} from "../../utils/api/watchListService.ts";
import {WatchListEnum} from "../../utils/enums/WatchListEnum.ts";

export const AssetGraph: FC = () => {
    const { t } = useTranslation();
    const { name } = useParams();
    const [asset, setAsset] = useState<AssetDetailType | null>(null);

    useEffect(() => {
        if (name === undefined) return;
        const getGraphData = async () => {
            const response = await getAssetByIndexLabel(name);
            if (!response) return;
            setAsset(response.data);
        };
        getGraphData();
    }, [name]);
    
    const handleToggleWatchList = async () => {
        if (!asset) return;
        if (asset.in_watchlist) {
            try {
                const response = await removeFromWatchList(asset.id);
                if (response?.status === 200) {
                    setAsset({...asset, in_watchlist: false});
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            const response = await addToWatchList(asset.id, WatchListEnum.Asset);
            if (response?.status === 200) {
                setAsset({...asset, in_watchlist: true});
            }
        }
    };

    return (
        <>
            {asset ? (
                <>
                    <TitleHeader title={asset?.name} text={asset?.label}/>
                    <div className="container padding-bottom asset-font">
                        <div className="service-details__wrapper">
                            <div className="service-details__item">
                                <div className="service-details__item-inner">
                                    <div className="service-details__item">
                                        <div className="service-details__content" data-aos="fade-up"
                                             data-aos-duration="900">
                                            <h2 className="asset-title">{t("Analytics")}</h2>
                                            <div className="row">
                                                <div className="col-sm-8">
                                                    <AssetAnalysisGraph
                                                        currencies={asset.assets.map((assetDetail) => ({
                                                            asset_label: assetDetail.asset_label,
                                                            allocation: assetDetail.allocation
                                                        })) as QuotedCurrency[]}
                                                        isInWatchList={asset.in_watchlist}
                                                        handleToggleWatchList={handleToggleWatchList}
                                                    />
                                                </div>
                                                <div className="col-sm-4">
                                                    <AssetGraphDetails asset={asset}/>  
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-8">
                                                    <h2 className="asset-title">{t("About")}</h2>
                                                    <p>{asset.about}</p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <Highlight/>
                                                </div>
                                            </div>
                                            <h2 className="asset-title">{t("Index composition")}</h2>
                                            <div className="row">
                                                <div className="col-sm-8">
                                                    <div className="row">
                                                        {asset.assets.map((singleAsset: Assets) => (
                                                            <AssetGraphCurrencyCard singleAsset={singleAsset}
                                                                                    key={singleAsset.id}/>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <AssetGraphPieChart assets={asset.assets}/>  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : <AssetDetailSkeleton/>}
        </>
    );
};
