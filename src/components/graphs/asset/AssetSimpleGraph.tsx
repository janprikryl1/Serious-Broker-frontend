import {QuotedCurrenciesPeriod} from "../../../utils/options/QuotedCurrenciesPeriod.ts";
import {FC} from "react";
import {LineChart} from "@mui/x-charts";
import {GraphDataSkeleton} from "./GraphDataSkeleton.tsx";
import {useTranslation} from "react-i18next";
import {useAssetGraph} from "../../../utils/hooks/useAssetGraph.ts";
import "../../../styles/sass/components/asset-graph-styles.scss"

type Props = {
    assetName: string;
}

export const AssetSimpleGraph: FC<Props> = ({ assetName }) => {
    const {t} = useTranslation();
    const {
        selectedPeriod,
        graphData,
        missingCurrencies,
    } = useAssetGraph(assetName);

    return (
        graphData ? (
            <div style={{height: "100%"}}>
                {graphData.data && Object.keys(graphData.data).length > 0 ? (
                    <LineChart
                        series={[
                            {
                                data: Object.values(graphData.data),
                                color: "var(--secondary-color)",
                                showMark: false,
                                valueFormatter: (value) => value == null ? "" : `${value.toFixed(2)} €`
                            },
                        ]}
                        width={250}
                        height={150}
                        xAxis={[{
                            scaleType: "point",
                            data: Object.keys(graphData.data).map((dateStr) =>
                                (selectedPeriod === QuotedCurrenciesPeriod.day || selectedPeriod === QuotedCurrenciesPeriod.week) ? new Date(dateStr).toLocaleString() : new Date(dateStr).toLocaleDateString()
                            ),
                            position: 'none'
                        }]}
                        yAxis={[{ position: 'none' }]}
                        sx={{
                            backgroundColor: "transparent",
                        }}
                        margin={{ left: 5, right: 5, top: 5, bottom: 5 }}
                    />
                ) : (
                    <div className="no-data-wrapper">
                        <p>{t("No data")}</p>
                        {missingCurrencies ? (
                            <div className={"no-data"}>
                                <p>{t("No longer traded coins")}:</p>
                                <small>
                                    {missingCurrencies.map(m => m.asset_label).join(', ')}
                                </small>
                            </div>
                        ) : <p>{t("No data")}</p>}
                    </div>
                )}
            </div>
        ) : (
            <GraphDataSkeleton baseColor={"var(--cream-color)"} highlightColor={"var(--secondary-color)"} style={{width: "100%", height: "140px"}}/>
        )
    );

}