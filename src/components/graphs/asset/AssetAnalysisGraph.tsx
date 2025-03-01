import {FC, useEffect, useState} from "react";
import {QuotedCurrency} from "../../../utils/types/graphs/QuotedCurrency.ts";
import {GraphDataSkeleton} from "./GraphDataSkeleton.tsx";
import {getAssetGraphData} from "../../../utils/api/binanceIndexAssets.ts";
import {QuotedCurrenciesPeriod} from "../../../utils/options/QuotedCurrenciesPeriod.ts";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {AssetAlaysisGraphData} from "../../../utils/types/graphs/AssetAlaysisGraphData.ts";
import {AssetAnalyticsGraphPeriodSelection} from "./AssetAnalyticsGraphPeriodSelection.tsx";
import Skeleton from "react-loading-skeleton";
import {LineChart} from "@mui/x-charts";
import {formatCurrency} from "../../../utils/functions/functions.ts";
import {useTranslation} from "react-i18next";

type Props = {
    currencies: QuotedCurrency[];
    isInWatchList?: boolean;
    handleToggleWatchList?: () => void;
};

export const AssetAnalysisGraph:FC<Props> = ({currencies, isInWatchList, handleToggleWatchList}) => {
    const {t} = useTranslation();
    const [selectedPeriod, setSelectedPeriod] = useState(QuotedCurrenciesPeriod.month);
    const [graphData, setGraphData] = useState<AssetAlaysisGraphData>();

    useEffect(() => {
        const getGraphData = async () => {
            try {
                setGraphData(undefined);
                const response = await getAssetGraphData(currencies, selectedPeriod);
                if (!response) return;
                setGraphData(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        getGraphData();
    }, [selectedPeriod]);
    
    return (
        <div className="service-details__content mb-5" style={{border: "0.5px solid #3e3a32", borderRadius: "16px", padding: "20px", backgroundColor: "#d4c6a9", height:"90%", color:"black"}}>
            <div className="row">
                <div className="col-sm-5">
                    {graphData ? formatCurrency(graphData.price) : <Skeleton width={100} height={35} />}
                </div>
                <AssetAnalyticsGraphPeriodSelection season={selectedPeriod} handleSelect={setSelectedPeriod} />
                <div className="col-sm-1">
                    {isInWatchList !== undefined && handleToggleWatchList !== undefined && (!isInWatchList ? <FaRegBookmark onClick={handleToggleWatchList}/> : <FaBookmark onClick={handleToggleWatchList}/>)}
                </div>
            </div>
                {graphData ? (
                    <div style={{ marginLeft: "-50px" }}>
                        {graphData.data ? (
                            <LineChart
                                series={[
                                    {
                                        data: graphData.data,
                                        color: "green",
                                        showMark: false,
                                        curve: "catmullRom",
                                    },
                                ]}
                                width={undefined}
                                height={400}
                                tooltip={{trigger: "none"}}
                                sx={{
                                    backgroundColor: "transparent",
                                    "& .MuiChartsAxis-root": {
                                        display: "none",
                                    }
                                }}
                            />
                        ) : <div className="no-data">{t("No data")}</div>}
                    </div>
                ) : <GraphDataSkeleton/>}
        </div>
    );
}