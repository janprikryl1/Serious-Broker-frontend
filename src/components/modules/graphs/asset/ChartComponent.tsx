import { FC, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useThemeContext } from "../../../../utils/providers/ThemeProvider";
import { csLocale } from "../../../../utils/constants/csLocale";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { ChartAssetPeriodEnum } from "../../../../utils/enums/ChartAssetPeriodEnum";
import { getBinanceAssetGraphData } from "../../../../api/binanceAPIService";
import { KlineData } from "../../../../utils/types/KlineData.ts";

type Props = {
    width?: number;
    height?: number;
    coin: string;
};

export const ChartComponent: FC<Props> = ({ width = 500, height = 300, coin }) => {
    const { theme } = useThemeContext();
    const { t } = useTranslation();
    const [selectedPeriod, setSelectedPeriod] = useState<keyof typeof ChartAssetPeriodEnum>("1M");

    // Calculate default startDate (one year ago) and endDate (today)
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const [startDate, setStartDate] = useState<string>(oneYearAgo.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    const [endDate, setEndDate] = useState<string>(today.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    const [series, setSeries] = useState<{ data: { x: Date; y: [number, number, number, number] }[] }[]>([]);

    const options: ApexOptions = {
        chart: { type: "candlestick", height: height, width: width, locales: [csLocale], defaultLocale: "cs" },
        xaxis: { type: "datetime", labels: { style: { colors: theme === "dark" ? "#fff" : "#000" } } },
        yaxis: { tooltip: { enabled: true }, labels: { style: { colors: theme === "dark" ? "#fff" : "#000" } } },
        tooltip: {
            theme: theme === "dark" ? "dark" : "light",
            x: { show: true },
            y: { formatter: (val) => val.toFixed(2) },
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Convert startDate and endDate to timestamps
                const startTime = new Date(startDate).getTime(); // Convert to LONG (timestamp in ms)
                const endTime = new Date(endDate).getTime(); // Convert to LONG (timestamp in ms)

                const response: KlineData[] = await getBinanceAssetGraphData(
                    coin + "USDT",
                    selectedPeriod,
                    startTime,
                    endTime
                );

                const transformedData = response.map((kline) => ({
                    x: new Date(kline[0]), // Open time
                    y: [
                        parseFloat(kline[1]), // Open
                        parseFloat(kline[2]), // High
                        parseFloat(kline[3]), // Low
                        parseFloat(kline[4]), // Close
                    ] as [number, number, number, number],
                }));

                setSeries([{ data: transformedData }]);
            } catch (error) {
                console.error("Failed to fetch Binance asset data:", error);
            }
        };
        fetchData();
    }, [coin, selectedPeriod, startDate, endDate]);

    return (
        <>
            <div className="row justify-content-center align-items-center mt-3 w-200">
                <div className="col-auto d-flex align-items-center">
                    <Typography variant="h6" className="me-2" style={{ minWidth: 100 }}>
                        {t("Candles per")}
                    </Typography>
                    <Form.Select
                        aria-label="Candles per"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value as keyof typeof ChartAssetPeriodEnum)}
                    >
                        {Object.keys(ChartAssetPeriodEnum).map((key) => (
                            <option key={key} value={key}>
                                {t(ChartAssetPeriodEnum[key as keyof typeof ChartAssetPeriodEnum])}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                <div className="col-auto d-flex align-items-center">
                    <Typography variant="h6" className="me-2">
                        {t("Season")}
                    </Typography>
                    <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="col-auto d-flex align-items-center">
                    <Typography variant="h6" className="me-3">
                        -
                    </Typography>
                    <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <ReactApexChart options={options} series={series} type="candlestick" />
        </>
    );
};
