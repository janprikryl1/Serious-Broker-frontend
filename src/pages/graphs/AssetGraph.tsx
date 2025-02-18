import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TitleHeader } from "../../components/modules/about/TitleHeader.tsx";
import { AssetDetailSkeleton } from "../../components/modules/graphs/asset/AssetDetailSkeleton.tsx";
import {AssetDetailType, Assets} from "../../utils/types/asset/AssetDetailType.ts";
import { useTranslation } from "react-i18next";
import {AssetGraphCurrencyCard} from "../../components/modules/graphs/asset/AssetGraphCurrencyCard.tsx";
import {AssetGraphPieChart} from "../../components/modules/graphs/asset/AssetGraphPieChart.tsx";
import {AssetGraphDetails} from "../../components/modules/graphs/asset/AssetGraphDetails.tsx";
import {AssetAnalysisGraph} from "../../components/modules/graphs/asset/AssetAnalysisGraph.tsx";
import {Highlight} from "../../components/modules/highlights/Highlight.tsx";
import {getAssetByIndexLabel} from "../../utils/api/binanceIndexAssets.ts";

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
                                                    <AssetAnalysisGraph />
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
