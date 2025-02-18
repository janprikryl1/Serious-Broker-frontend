import {FC, useEffect, useState} from "react";
import {AssetDetailType, Assets} from "../../../../utils/types/asset/AssetDetailType.ts";
import {AssetGraphCurrencyCard} from "../../graphs/asset/AssetGraphCurrencyCard.tsx";
import {AssetGraphPieChart} from "../../graphs/asset/AssetGraphPieChart.tsx";
import {AssetDetailSkeleton} from "../../graphs/asset/AssetDetailSkeleton.tsx";
import {useTranslation} from "react-i18next";
import {getAssetByIndexLabel} from "../../../../utils/api/binanceIndexAssets.ts";

type Props = {
    index_label: string;
}

export const DemoAssetGraphs:FC<Props> = ({index_label}) => {
    const {t} = useTranslation();
    const [asset, setAsset] = useState<AssetDetailType | null>(null);
    const [details, setDetails] = useState<Assets[]>();

    useEffect(() => {
        if (index_label === undefined) return;

        const getGraphData = async () => {
            const response = await getAssetByIndexLabel(index_label);
            if (!response) return;
            setDetails(response.data.assets);
            setAsset(response.data);
        };

        getGraphData();
    }, [index_label]);
    
    return (
        <>
            <h2 className="mb-4">{t("Title")}: {index_label}</h2>
            {asset && details ? (
                <>
                    <div className="row">
                        {details.map((singleAsset: Assets) => (
                            <AssetGraphCurrencyCard singleAsset={singleAsset} key={singleAsset.id} />
                        ))}

                    </div>
                    <AssetGraphPieChart assets={details} />
                </>
            ) : (
                <AssetDetailSkeleton />
            )}
        </>
    );
};