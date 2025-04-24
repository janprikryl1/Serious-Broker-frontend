import { FC } from "react";
import { LineChart } from "@mui/x-charts";
import {useTranslation} from "react-i18next";
import "../../../styles/sass/components/graph-portfolio-asset.scss";

type Props = {
    title: string;
    data: Record<string, number> | number[];
};

export const GraphPortfolioAsset: FC<Props> = ({ title, data }) => {
    const { t } = useTranslation();
    const isDataArray = Array.isArray(data);
    const chartValues = isDataArray ? data : Object.values(data);
    const hasData = chartValues.length > 0;
    let chartColor = "grey";
    if (hasData) {
        const firstValue = chartValues[0];
        const lastValue = isDataArray ? chartValues[chartValues.length - 1] : 0;
        if (lastValue > firstValue) {
            chartColor = "green";
        } else if (lastValue < firstValue) {
            chartColor = "red";
        }
    }

    return (
        <div className="col-sm">
            {hasData ? (
                <LineChart
                    series={[{data: chartValues, color: chartColor, showMark: false}]}
                    height={200}
                    sx={{"& .MuiChartsAxis-root": {display: "none"}}}
                />
            ) : (
                <div className="graph-portfolio-asset-no-data-container">
                    {t("No data")}
                </div>
            )}
            <p className="graph-portfolio-asset-title">{title}</p>
        </div>
    );
};