import {Dispatch, FC, SetStateAction} from "react";
import {ChartComponent} from "../../graphs/asset/ChartComponent.tsx";
import {CandlestickData} from "../../../utils/types/asset/KlineData.ts";

type Props = {
    asset_label: string;
    series?: { data: CandlestickData[] }[];
    setStartDate: Dispatch<SetStateAction<string>>;
    setEndDate: Dispatch<SetStateAction<string>>;
    startDate: string;
    endDate: string;
    setSeries: Dispatch<SetStateAction<{ data: CandlestickData[] }[] | undefined>>;
}

export const CoinGraph:FC<Props> = ({asset_label, setEndDate, setStartDate, series, setSeries, startDate, endDate}) => {
    return (
        <ChartComponent
            width={800}
            height={400}
            coin={asset_label}
            series={series}
            setStartDate={setStartDate}
            startDate={startDate}
            setSeries={setSeries}
            endDate={endDate}
            setEndDate={setEndDate}
        />
    )
}