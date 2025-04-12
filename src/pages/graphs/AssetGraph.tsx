import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {AssetDetailType, Assets} from "../../utils/types/asset/AssetDetailType.ts";
import { useTranslation } from "react-i18next";
import {getAssetByIndexLabel, getAssetGraphData} from "../../utils/api/binanceIndexAssets.ts";
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
import {QuotedCurrenciesPeriod} from "../../utils/options/QuotedCurrenciesPeriod.ts";
import {formatCurrency} from "../../utils/functions/functions.ts";
import {Currencies} from "../../utils/enums/CurrenciesEnum.ts";
import {AssetAlaysisGraphData} from "../../utils/types/graphs/AssetAlaysisGraphData.ts";

export const AssetGraph: FC = () => {
    const { t } = useTranslation();
    const { name } = useParams();
    const [asset, setAsset] = useState<AssetDetailType | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState(QuotedCurrenciesPeriod.month);
    const [currency, setCurrency] = useState<Currencies>(Currencies.EUR);
    const [currencyPrice, setCurrencyPrice] = useState<string>();
    const [currencyValue, setCurrencyValue] = useState<number>(1);
    const [graphData, setGraphData] = useState<AssetAlaysisGraphData>();

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

    useEffect(() => {
        if (!asset) return;
        const getGraphData = async () => {
            try {
                setGraphData(undefined);
                const currencies = asset.assets?.map((assetDetail) => ({
                    asset_label: assetDetail.asset_label,
                    allocation: assetDetail.allocation
                })) as QuotedCurrency[];
                const response = await getAssetGraphData(currencies, selectedPeriod);
                if (!response) return;
                setGraphData(response.data);
                setCurrencyPrice(formatCurrency(response.data.price));
                setCurrency(Currencies.EUR);
            } catch (e) {
                console.error(e);
            }
        };
        getGraphData();
    }, [selectedPeriod, asset]);

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
                                                    <AssetGraphDetails asset={asset} selectedPeriod={selectedPeriod} currency={currency} currencyValue={currencyValue} showPriceDetails/>  
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
                                                                <AssetGraphCurrencyCard singleAsset={singleAsset}
                                                                                        key={singleAsset.id}/>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <AssetGraphPieChart assets={asset.assets}/>  
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
            ) : <AssetDetailSkeleton/>}
        </>
    );
};
