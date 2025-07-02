import {FC, useEffect, useState} from "react";
import {Button} from "../reusable/Button.tsx";
import {useTranslation} from "react-i18next";
import {AssetCalculatorMostProfitableAssets} from "./AssetCalculatorMostProfitableAssets.tsx";
import {getAllAssetCoins, getAssetCoinDetails} from "../../utils/api/assetCalculatorService.ts";
import {CustomSwal} from "../../utils/functions/customSwal.ts";
import {OverviewTableChart} from "../overview/overviewTableData/overviewTableChart/OverviewTableChart.tsx";

interface ICalculationResult {
    final_profit: number;
    chart_data: { datetime: string; profit: number }[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
}

export const AssetCalculatorSingleCoin: FC = () => {
    const {t} = useTranslation();
    const [assetCoins, setAssetCoins] = useState<{ asset_label: string }[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<string>("");
    const [selectedPeriod, setSelectedPeriod] = useState<string>("Day");
    const [selectedCurrency, setSelectedCurrency] = useState<string>("EUR");
    const [amount, setAmount] = useState<number | string>("");
    const [calculationResult, setCalculationResult] = useState<ICalculationResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllAssetCoins();
                if (response?.data) {
                    setAssetCoins(response.data);
                    if (response.data.length > 0) {
                        setSelectedCoin(response.data[0].asset_label);
                    }
                }
            } catch (error) {
                console.error("Failed to load asset coins:", error);
            }
        })();
    }, []);

    const handleCalculate = async () => {
        if (!selectedCoin || !amount || Number(amount) <= 0) {
            CustomSwal.fire({
                title: t("Error"),
                text: t("Please select a coin and enter a valid amount."),
                icon: "warning",
                confirmButtonText: t("Ok"),
            });
            return;
        }

        setIsLoading(true);
        setCalculationResult(null);

        try {
            const response = await getAssetCoinDetails(selectedCoin, selectedPeriod, Number(amount));
            if (response?.data) {
                setCalculationResult(response.data);
            }
        } catch (error) {
            console.error("Calculation error:", error);
            CustomSwal.fire({
                title: t("Error"),
                text: t("Something went wrong during calculation!"),
                icon: "error",
                confirmButtonText: t("Ok"),
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="select-wrapper">
                <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}>
                    <option value="" disabled>{t("Select a coin...")}</option>
                    {assetCoins.map((coin) => (
                        <option key={coin.asset_label} value={coin.asset_label}>{coin.asset_label}</option>
                    ))}
                </select>
            </div>

            <hr className="calculator-divider"/>

            <div className="calculator-section">
                <label className="calculator-label">{t("Amount")}</label>
                <div className="amount-group">
                    <input
                        type="number"
                        placeholder="E.g. 500"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="select-wrapper calculator-select-box">
                        <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                            <option>EUR</option>
                        </select>
                    </div>
                </div>
            </div>

            <hr className="calculator-divider"/>

            <div className="calculator-section-inline">
                <label className="calculator-label">{t("Choose period:")}</label>
                <div className="select-wrapper calculator-select-box">
                    <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
                        <option value="Day">{t("Day")}</option>
                        <option value="Hour">{t("Hour")}</option>
                    </select>
                </div>
            </div>

            <hr className="calculator-divider"/>

            <Button className="calculate-btn" style={{borderRadius: 0}} onClick={handleCalculate} disabled={isLoading}>
                {isLoading ? t("Calculating...") : t("Calculate")}
            </Button>

            {calculationResult && (
                <>
                    <div className="result-box">
                        <div className="result-chart-wrapper">
                            <OverviewTableChart
                                name={selectedCoin}
                                data={calculationResult.chart_data.map((x) => x.profit)}
                                width="100%"
                                height="100%"
                            />
                        </div>
                        <div className="result-text-content">
                            <span className="result-value" style={{color: calculationResult.final_profit >= 0 ? 'green' : 'red'}}>
                                {formatCurrency(calculationResult.final_profit)}
                            </span>
                            <small className="result-label">{t("Profit")}</small>
                        </div>
                    </div>

                    <p className="result-caption">{selectedPeriod === "Day" ? t("Asset profitability in last 7 days") : t("Asset profitability in the selected period (last day)")}</p>
                </>
            )}
            <AssetCalculatorMostProfitableAssets/>
        </>
    )
}