import {FC, lazy, Suspense} from "react";
const ReactApexChart = lazy(() => import("react-apexcharts"));
import Skeleton from "react-loading-skeleton";
import {useOverviewTableChartStyles} from "../../../../utils/hooks/useOverviewTableChartStyles.ts";

type Props = {
    name: string;
    data: number[];
    width?: number | string;
    height?: number | string;
};

export const OverviewTableChart: FC<Props> = ({ name, data, width = 100, height = 30 }) => {
    const {options} = useOverviewTableChartStyles();

    return (
        <Suspense fallback={<Skeleton height={30} width={100} style={{ maxWidth: "100%" }} />}>
            <ReactApexChart
                options={options}
                series={[
                    {
                        name,
                        data,
                    },
                ]}
                type="line"
                height={height}
                width={width}
            />
        </Suspense>
    );
};
