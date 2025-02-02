import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAssetByIndexLabel } from "../../api/binanceIndexAssets.ts";
import { TitleHeader } from "../../components/modules/about/TitleHeader.tsx";
import { AssetDetailSkeleton } from "../../components/modules/graphs/asset/AssetDetailSkeleton.tsx";
import {AssetDetailType, Assets} from "../../utils/types/asset/AssetDetailType.ts";
import { useTranslation } from "react-i18next";
import {AssetGraphCurrencyCard} from "../../components/modules/graphs/asset/AssetGraphCurrencyCard.tsx";
import {AssetGraphPieChart} from "../../components/modules/graphs/asset/AssetGraphPieChart.tsx";
import {AssetGraphDetails} from "../../components/modules/graphs/asset/AssetGraphDetails.tsx";

export const AssetGraph: FC = () => {
    const { t } = useTranslation();
    const { index_label } = useParams();
    const [asset, setAsset] = useState<AssetDetailType | null>(null);

    useEffect(() => {
        if (index_label === undefined) return;
        const getGraphData = async () => {
            const response = await getAssetByIndexLabel(index_label);
            if (!response) return;
            setAsset(response.data);
        };
        getGraphData();
    }, [index_label]);

    return (
        <div>
            <TitleHeader
                title={asset?.label ?? t("GraphAssetData - details about asset and graph")}
            />
            <div className="padding-bottom padding-top">
                <div className="container padding-bottom">
                    <div className="service-details__wrapper">
                        <div className="service-details__item">
                            <div className="service-details__item-inner">
                                <div
                                    className="service-details__content"
                                    data-aos="fade-up"
                                    data-aos-duration="900"
                                >
                                    <h2 className="mb-4">{t("Title")}: {index_label} ({asset?.name})</h2>
                                    {asset ? (
                                        <>
                                            <AssetGraphDetails asset={asset}/>
                                            <div className="row">
                                                {asset.assets.map((singleAsset: Assets) => (
                                                    <AssetGraphCurrencyCard singleAsset={singleAsset}
                                                                            key={singleAsset.id}/>
                                                ))}

                                            </div>
                                            <AssetGraphPieChart assets={asset.assets}/>
                                        </>
                                    ) : (
                                        <AssetDetailSkeleton/>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
