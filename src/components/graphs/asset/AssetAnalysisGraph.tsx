import {ChangeEvent, Dispatch, FC, SetStateAction} from "react";
import {GraphDataSkeleton} from "./GraphDataSkeleton.tsx";
import {QuotedCurrenciesPeriod} from "../../../utils/options/QuotedCurrenciesPeriod.ts";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {AssetAnalyticsGraphPeriodSelection} from "./AssetAnalyticsGraphPeriodSelection.tsx";
import Skeleton from "react-loading-skeleton";
import {LineChart} from "@mui/x-charts";
import {formatCurrency} from "../../../utils/functions/functions.ts";
import {useTranslation} from "react-i18next";
import {freecurrencyapi} from "../../../utils/constants";
import {Currencies} from "../../../utils/enums/CurrenciesEnum.ts";
import {AssetAnalysisGraphData} from "../../../utils/types/graphs/AssetAnalysisGraphData.ts";

type Props = {
    isInWatchList?: boolean;
    handleToggleWatchList?: () => void;
    selectedPeriod: QuotedCurrenciesPeriod;
    setSelectedPeriod: Dispatch<SetStateAction<QuotedCurrenciesPeriod>>;
    graphData: AssetAnalysisGraphData | undefined;
    currency: Currencies;
    setCurrency: Dispatch<SetStateAction<Currencies>>;
    currencyPrice: string | undefined;
    setCurrencyPrice: Dispatch<SetStateAction<string | undefined>>;
    currencyValue: number;
    setCurrencyValue: Dispatch<SetStateAction<number>>;
};

export const AssetAnalysisGraph: FC<Props> = ({isInWatchList, handleToggleWatchList, selectedPeriod, setSelectedPeriod, graphData, currencyValue, setCurrencyValue, setCurrency, setCurrencyPrice, currencyPrice, currency}) => {
    const {t} = useTranslation();

    const handleSwitchCurrency = async (e: ChangeEvent<HTMLSelectElement>) => {
        if (!graphData) return;
        
        const newCurrency = e.target.value as Currencies;
        if (newCurrency === Currencies.EUR) {
            setCurrencyPrice(formatCurrency(graphData.price));
            setCurrency(newCurrency);
            return;
        }
        
        try {
            const response = await freecurrencyapi.latest({
                base_currency: 'EUR',
                currencies: newCurrency
            });

            if (graphData && response.data[newCurrency]) {
                setCurrencyPrice(formatCurrency(response.data[newCurrency] * graphData.price));
                setCurrency(newCurrency);
                setCurrencyValue(response.data[newCurrency]);
            }
        } catch (error) {
            console.error("Error fetching currency data:", error);
        }
    };

    return (
        <div className="service-details__content mb-5" style={{border: "0.5px solid #3e3a32", borderRadius: "16px", padding: "20px", backgroundColor: "#d4c6a9", height:"90%", color:"black"}}>
            <div className="row">
                <div className="col-sm-4">
                    {graphData ? `${currencyPrice} ${currency}` : <Skeleton width={100} height={35}/>}
                </div>
                <AssetAnalyticsGraphPeriodSelection season={selectedPeriod} handleSelect={setSelectedPeriod}/>
                <div className="col-sm-2">
                    <select
                        className="form-select season-button-group"
                        style={{paddingLeft: "10px", maxWidth: "80px"}}
                        value={currency}
                        onChange={handleSwitchCurrency}
                    >
                        {Object.values(Currencies).map((cur) => (
                            <option key={cur} value={cur}>{cur}</option>
                        ))}
                    </select>
                </div>
                <div className="col-sm-1">
                    {isInWatchList !== undefined && handleToggleWatchList !== undefined && (!isInWatchList ?
                        <FaRegBookmark onClick={handleToggleWatchList}/> :
                        <FaBookmark onClick={handleToggleWatchList}/>)}
                </div>
            </div>
            {graphData ? (
                <div style={{ width: "100%", overflowX: "auto" }}>
                    {graphData.data && Object.keys(graphData.data).length > 0 ? (
                        <LineChart
                            series={[
                                {
                                    data: Object.values(graphData.data),
                                    color: "green",
                                    showMark: false,
                                    curve: "catmullRom",
                                    valueFormatter: (value) => `${formatCurrency((value ?? 0) * (currencyValue))} ${currency}`,
                                },
                            ]}
                            width={undefined}
                            height={400}
                            xAxis={[{
                                scaleType: "point",
                                data: Object.keys(graphData.data).map((dateStr) =>
                                    (selectedPeriod === QuotedCurrenciesPeriod.day || selectedPeriod === QuotedCurrenciesPeriod.week) ? new Date(dateStr).toLocaleString() : new Date(dateStr).toLocaleDateString()
                                ),
                                valueFormatter: (value) => value,
                            }]}

                            tooltip={{ trigger: "axis" }}
                            sx={{
                                backgroundColor: "transparent",
                                "& .MuiChartsAxis-root": {
                                    display: "inline",
                                },
                                "& .MuiChartsAxis-tickLabel": {
                                    fontSize: "1px",
                                },
                            }}
                            margin={{ left: 50, right: 0, top: 20, bottom: 30 }}
                        />
                    ) : (
                        <div className="no-data">{t("No data")}</div>
                    )}
                </div>
            ) : (
                <GraphDataSkeleton />
            )}
        </div>
    );
};