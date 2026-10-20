import {FC, Dispatch, SetStateAction, lazy, Suspense} from "react";
const ReactApexChart = lazy(() => import("react-apexcharts"));
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { PeriodSelector } from "./PeriodSelector";
import { DateRangeSelector } from "./DateRangeSelector";
import {CandlestickData} from "../../../utils/types/asset/KlineData.ts";
import {useChartComponent} from "../../../utils/hooks/useChartComponent.ts";

type Props = {
    width?: number;
    height?: number;
    coin: string;
    series: { data: CandlestickData[] }[] | undefined;
    setSeries: Dispatch<SetStateAction<{ data: CandlestickData[] }[] | undefined>>;
    startDate: string;
    setStartDate: Dispatch<SetStateAction<string>>;
    endDate: string;
    setEndDate: Dispatch<SetStateAction<string>>;
};

export const ChartComponent: FC<Props> = ({width = 500, height = 300, coin, series, setSeries, setStartDate, setEndDate, endDate, startDate}) => {
    const { t } = useTranslation();
    const {selectedPeriod, setSelectedPeriod, error, options, points} = useChartComponent(width, height, startDate, endDate, coin, setStartDate, setEndDate, setSeries);

    return (
        <>
            <div className="row justify-content-center align-items-center mt-3 w-200">
                <PeriodSelector selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
                <DateRangeSelector
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
            </div>
            {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
            {series ? (
                <>
                    <Suspense fallback={<Skeleton height={height} width={width} style={{ maxWidth: "100%" }} />}>
                        <ReactApexChart options={options} series={series} type="candlestick" />
                    </Suspense>
                    {points[0].y && points[1].y && points[0].y > points[1].y ?
                        <p style={{color: "#FF4500"}}>{t("Loss")}</p> :
                        <p style={{color: "#8bff00"}}>{t("Gain")}</p>
                    }
                </>
            ) : (
                <Skeleton height={height} width={width} style={{ maxWidth: "100%" }} />
            )}
        </>
    );
};
