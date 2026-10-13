import { FC, lazy, Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import {demoHeight, demoWidth, useGetDemoCoinmarketcupTop10} from "../../../utils/hooks/useGetDemoCoinmarketcupTop10.ts";
const ReactApexChart = lazy(() => import("react-apexcharts"));

export const DemoCoinmarektcupTop10: FC = () => {
    const {allSeries, options} = useGetDemoCoinmarketcupTop10();

    return (
        <div className="w-full h-full">
            {allSeries ? (
                <Suspense fallback={<Skeleton height={demoHeight} width={demoWidth} style={{ maxWidth: "100%" }} />}>
                    <ReactApexChart
                        options={options}
                        series={allSeries}
                        type="candlestick"
                        height={demoHeight-50}
                        width={demoWidth-150}
                    />
                </Suspense>
            ) : (
                <Skeleton height={demoHeight} width={demoWidth} style={{ maxWidth: "100%" }} />
            )}
        </div>
    );
};
