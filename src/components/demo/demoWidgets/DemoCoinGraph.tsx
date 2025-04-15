import {FC, useMemo, useState} from "react";
import {CoinGraph} from "./CoinGraph.tsx";
import {CandlestickData} from "../../../utils/types/asset/KlineData.ts";

type Props = {
    index_label: string;
}

export const DemoCoinGraph:FC<Props> = ({index_label}) => {
    const today = useMemo(() => new Date(), []);
    const oneYearAgo = useMemo(() => new Date(new Date().setFullYear(today.getFullYear() - 1)), [today]);
    const [startDate, setStartDate] = useState<string>(oneYearAgo.toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState<string>(today.toISOString().split("T")[0]);
    const [series, setSeries] = useState<{ data: CandlestickData[] }[]>();
    
    return (
        <>
            <h2 className="mb-4">{index_label}</h2>
            <CoinGraph asset_label={index_label} setEndDate={setEndDate} setStartDate={setStartDate}
                       series={series} setSeries={setSeries} startDate={startDate} endDate={endDate}/>
        </>
    );
};