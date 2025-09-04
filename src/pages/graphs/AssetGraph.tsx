import { FC } from "react";
import {Assets} from "../../utils/types/asset/AssetDetailType.ts";
import { useTranslation } from "react-i18next";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {AssetAnalysisGraph} from "../../components/graphs/asset/AssetAnalysisGraph.tsx";
import {AssetGraphDetails} from "../../components/graphs/asset/AssetGraphDetails.tsx";
import {AssetGraphCurrencyCard} from "../../components/graphs/asset/AssetGraphCurrencyCard.tsx";
import {AssetGraphPieChart} from "../../components/graphs/asset/AssetGraphPieChart.tsx";
import {AssetDetailSkeleton} from "../../components/graphs/asset/AssetDetailSkeleton.tsx";
import {Highlight} from "../../components/editor/highlights/Highlight.tsx";
import {useAssetGraph} from "../../utils/hooks/useAssetGraph.ts";

export const AssetGraph: FC = () => {
    const { t } = useTranslation();
    const {
        asset,
        handleToggleWatchList,
        selectedPeriod,
        setSelectedPeriod,
        currencyValue,
        setCurrencyValue,
        setCurrency,
        setCurrencyPrice,
        currencyPrice,
        currency,
        graphData
    } = useAssetGraph();

    return (
        asset ? (
            <>
                <TitleHeader title={asset?.name} text={asset?.label}/>
                <div className="container padding-bottom asset-font mt-4">
                    <div className="service-details__wrapper">
                        <div className="service-details__item">
                            <div className="service-details__item-inner">
                                <div className="service-details__item">
                                    <div className="service-details__content" data-aos="fade-up" data-aos-duration="900">
                                        <h2 className="asset-title">{t("Analytics")}</h2>
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <AssetAnalysisGraph
                                                    isInWatchList={asset.in_watchlist}
                                                    handleToggleWatchList={handleToggleWatchList}
                                                    selectedPeriod={selectedPeriod}
                                                    setSelectedPeriod={setSelectedPeriod}
                                                    currencyValue={currencyValue}
                                                    setCurrencyValue={setCurrencyValue}
                                                    setCurrency={setCurrency}
                                                    setCurrencyPrice={setCurrencyPrice}
                                                    currencyPrice={currencyPrice}
                                                    currency={currency}
                                                    graphData={graphData}
                                                />
                                            </div>
                                            <div className="col-sm-4">
                                                <AssetGraphDetails 
                                                    asset={asset}
                                                    selectedPeriod={selectedPeriod}
                                                    currency={currency}
                                                    currencyValue={currencyValue}
                                                    showPriceDetails
                                                />  
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-8">
                                                {asset.about && 
                                                    <>
                                                        <h2 className="asset-title">{t("About")}</h2>
                                                        <p>{asset.about}</p>
                                                    </>
                                                }
                                            </div>
                                            <div className="col-sm-4">
                                                <Highlight/>
                                            </div>
                                        </div>
                                        <h2 className="asset-title">{t("Index composition")}</h2>
                                        {asset.assets !== null && (
                                            <div className="row">
                                                <div className="col-sm-8">
                                                    <div className="row">
                                                        {asset.assets.map((singleAsset: Assets) => (
                                                            <AssetGraphCurrencyCard
                                                                singleAsset={singleAsset}
                                                                key={singleAsset.id}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <AssetGraphPieChart assets={asset.assets} />  
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ) : <AssetDetailSkeleton/>
    );
};
