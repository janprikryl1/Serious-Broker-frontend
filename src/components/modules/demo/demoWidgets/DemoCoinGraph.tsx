import {FC, useEffect, useMemo, useState} from "react";
import {CoinGraph} from "./CoinGraph.tsx";
import {Assets} from "../../../../utils/types/asset/AssetDetailType.ts";
import {CandlestickData} from "../../../../utils/types/KlineData.ts";
import {getAssetByIdGraphData} from "../../../../api/binanceIndexAssets.ts";
import Skeleton from "react-loading-skeleton";

type Props = {
    index_label: string;
}

export const DemoCoinGraph:FC<Props> = ({index_label}) => {
    const [asset, setAsset] = useState<Assets>();
    const today = useMemo(() => new Date(), []);
    const oneYearAgo = useMemo(() => new Date(new Date().setFullYear(today.getFullYear() - 1)), [today]);
    const [startDate, setStartDate] = useState<string>(oneYearAgo.toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState<string>(today.toISOString().split("T")[0]);
    const [series, setSeries] = useState<{ data: CandlestickData[] }[]>();

    useEffect(() => {
        const getGraphData = async () => {
            if (index_label === undefined) return;
            const response = await getAssetByIdGraphData(parseInt(index_label));
            if (!response) return;
            setAsset(response.data.asset);
        };
        getGraphData();
    }, [index_label]);
    
    return (
        <>
            {asset ? (
                <>
                    <h2 className="mb-4">{asset.asset_label}</h2>
                    <CoinGraph asset_label={asset.asset_label} setEndDate={setEndDate} setStartDate={setStartDate}
                               series={series} setSeries={setSeries} startDate={startDate} endDate={endDate}/>
                </>
            ) : (
                <>
                    <Skeleton height={30} width={200} className="mb-4"/>
                    <Skeleton height={400}/>
                </>
            )}
        </>
    );
};