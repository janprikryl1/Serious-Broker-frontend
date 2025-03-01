import {FC, useEffect, useState} from "react";
import {QuotedCurrency} from "../../../utils/types/graphs/QuotedCurrency.ts";
import {GraphDataSkeleton} from "./GraphDataSkeleton.tsx";
import {getAssetGraphData} from "../../../utils/api/binanceIndexAssets.ts";
import {QuotedCurrenciesPeriod} from "../../../utils/options/QuotedCurrenciesPeriod.ts";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {useTranslation} from "react-i18next";
import {AssetAlaysisGraphData} from "../../../utils/types/graphs/AssetAlaysisGraphData.ts";
import {AssetAnalyticsGraphPeriodSelection} from "./AssetAnalyticsGraphPeriodSelection.tsx";

type Props = {
    currencies: QuotedCurrency[];
    isInWatchList: boolean;
    handleToggleWatchList: () => void;
};

export const AssetAnalysisGraph:FC<Props> = ({currencies, isInWatchList, handleToggleWatchList}) => {console.log(currencies);
    const { t } = useTranslation();
    const [selectedPeriod, setSelectedPeriod] = useState(QuotedCurrenciesPeriod.all);
    const [graphData, setGraphData] = useState<AssetAlaysisGraphData>();
t("");setSelectedPeriod(QuotedCurrenciesPeriod.all);setGraphData(undefined);
    useEffect(() => {
        const getGraphData = async () => {
            try {
                const response = await getAssetGraphData(currencies, selectedPeriod);
                if (!response) return;
                setGraphData(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        getGraphData();
    }, []);
    
    return (
        <div className="service-details__content mb-5" style={{border: "0.5px solid #3e3a32", borderRadius: "16px", padding: "20px", backgroundColor: "#d4c6a9", height:"90%", color:"black"}}>
            {graphData ? (
                <div className="row">
                    <div className="col-sm">
                        Cena
                    </div>
                   <AssetAnalyticsGraphPeriodSelection />
                    <div className="col-sm">
                        {!isInWatchList ? <FaRegBookmark onClick={handleToggleWatchList}/> : <FaBookmark onClick={handleToggleWatchList}/>}
                    </div>
                </div>
            ) : <GraphDataSkeleton/>}
        </div>
    );
}