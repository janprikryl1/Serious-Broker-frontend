import {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {DataPointType} from "../../utils/types/asset/DataPointType.ts";
import {TitleHeader} from "../../components/modules/about/TitleHeader.tsx";
import {getAssetByIdGraphData} from "../../api/binanceIndexAssets.ts";
import {Assets} from "../../utils/types/asset/AssetDetailType.ts";
import {ChartComponent} from "../../components/modules/graphs/asset/ChartComponent.tsx";
import {toCzechDateFormat} from "../../utils/constants";
import {EarningIn} from "./earningIn/EarningIn.tsx";
import {
    AssetGraphCurrencyDetailSkeleton
} from "../../components/modules/graphs/asset/AssetGraphCurrencyDetailSkeleton.tsx";

export const AssetGraphCurrencyDetail:FC = () => {
    const { t } = useTranslation();
    const { index_label } = useParams();
    const [asset, setAsset] = useState<Assets>();
    const [graphData, setGraphData] = useState<DataPointType[]>();

    useEffect(() => {
        const getGraphData = async () => {
            if (index_label === undefined) return;
            const response = await getAssetByIdGraphData(parseInt(index_label));
            if (!response) return;
            setAsset(response.data.asset);
            setGraphData(response.data.graph);
        };
        getGraphData();
    }, [index_label]);
    
    return (
        <>
            <TitleHeader
                title={t("GraphAssetData - details about asset and graph")}
            />
            {asset && graphData ? (
                <>
                    <div
                        className="px-30 py-45 p-rel mt-30 mb-30"
                        style={{
                            backgroundColor: "#454a4e",
                            borderRadius: 24,
                            width: "90%",
                            margin: 50,
                            zIndex: 2,
                        }}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                    >
                        <p>{t("Currency: ")} {asset.asset_label}</p>
                        <p>{t("Allocation: ")} {asset.allocation * 100}%</p>
                        <p>{t("Changed")}: {toCzechDateFormat(asset.changed)}</p>
                        <p>{t("Created")}: {toCzechDateFormat(asset.created)}</p>
                        
                        <p>{t("Graph")}</p>
                        <ChartComponent data={graphData} width={1000} height={450} assetId={asset?.id}></ChartComponent>
                    </div>
                    <EarningIn id={asset.id} />
                </>
            ) : (
                <AssetGraphCurrencyDetailSkeleton />
            )}
        </>
    );
};