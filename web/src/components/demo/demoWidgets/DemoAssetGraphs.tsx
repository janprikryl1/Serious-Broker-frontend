import {FC} from "react";
import {AssetGraphCurrencyCard} from "../../graphs/asset/AssetGraphCurrencyCard.tsx";
import {AssetGraphPieChart} from "../../graphs/asset/AssetGraphPieChart.tsx";
import {AssetDetailSkeleton} from "../../graphs/asset/AssetDetailSkeleton.tsx";
import {useTranslation} from "react-i18next";
import {Assets} from "../../../utils/types/asset/AssetDetailType.ts";
import {useAssetByName} from "../../../utils/hooks/queries/useAssetByName.ts";

type Props = {
    index_label: string;
}

export const DemoAssetGraphs:FC<Props> = ({index_label}) => {
    const {t} = useTranslation();
    const {data: asset} = useAssetByName(index_label);
    const details = asset?.assets ?? undefined;
    
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