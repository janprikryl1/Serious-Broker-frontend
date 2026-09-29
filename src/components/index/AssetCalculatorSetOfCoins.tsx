import {FC, useEffect, useState} from "react";
import {AssetProfitList} from "../../utils/types/asset/AssetType.ts";
import {getAllAssetsProfitList} from "../../utils/api/binanceIndexAssets.ts";
import {AssetOrder} from "../../utils/enums/AssetOrderEnum.ts";
import {AssetCard} from "../graphs/asset/AssetCard.tsx";
import {AssetSkeleton} from "../graphs/asset/AssetSkeleton.tsx";
import {useTranslation} from "react-i18next";

export const AssetCalculatorSetOfCoins:FC = () => {
    const {t} = useTranslation();
    const [assets, setAssets] = useState<AssetProfitList[]>();
    
    useEffect(() => {
        (async () => {
            try {
                const response = await getAllAssetsProfitList(1, 2,  AssetOrder.MonthlyProfit);
                if (response) {
                    setAssets(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    
    return (
        <div className="row g-8">
            {assets === undefined ? <AssetSkeleton count={2} /> 
                : assets.length === 0 ? <p>{t("No assets")}</p> :
                  assets.map((asset) => (
                    <AssetCard index={asset.id} label={asset.name} details={asset.label} key={asset.id}
                               data={asset.profit_list} inWatchList={asset.in_watchlist}
                               dailyChange={asset.profit_change}/>
                ))}
        </div>
    )
}