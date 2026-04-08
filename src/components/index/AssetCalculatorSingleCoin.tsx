import { FC, useEffect, useState } from "react";
import { Button } from "../reusable/Button.tsx";
import { useTranslation } from "react-i18next";
import { getAllAssetCoins, getAssetCoinDetails } from "../../utils/api/assetCalculatorService.ts";
import { CustomSwal } from "../../utils/functions/customSwal.ts";
import { OverviewTableChart } from "../overview/overviewTableData/overviewTableChart/OverviewTableChart.tsx";
import {routes} from "../../utils/constants";

type ICalculationResult = {
    final_profit: number;
    chart_data: { datetime: string; profit: number }[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
}

export const AssetCalculatorSingleCoin: FC = () => {
    const { t } = useTranslation();
    const [assetCoins, setAssetCoins] = useState<{ asset_label: string }[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<string>("");
    const [selectedPeriod, setSelectedPeriod] = useState<string>("Day");
    const [selectedCurrency, setSelectedCurrency] = useState<string>("EUR");
    const [amount, setAmount] = useState<number | string>(1);
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

    useEffect(() => {
        if (selectedCoin) {
            /////handleCalculate();
        }
    }, [assetCoins]);

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
    };

    return (
        <div className="calculator-form-container">
            {/* 1) Výběr coinu */}
            <div className="form-step">
                <label className="calculator-label">{t("Choose asset name:")}</label>
                <div className="select-wrapper" style={{marginBottom:2}}>
                    <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}>
                        <option value="" disabled>{t("Start typing or select...")}</option>
                        {assetCoins.map((coin) => (
                            <option key={coin.asset_label} value={coin.asset_label}>{coin.asset_label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* 2) Částka + měna */}
            <div className="form-step">
                <label className="calculator-label mt-2">{t("Invested amount")}</label>
                <div className="amount-group" style={{marginBottom:20}}>
                    <input
                        type="number"
                        placeholder={t("e.g. 500")}
                        value={amount}
                        className="calculator-input"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="select-wrapper calculator-currency">
                        <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                            <option>EUR</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 3) Období držení */}
            <div className="form-step">
                <div style={{ display: "flex" }}>
                    <label className="calculator-label" style={{ width: "60%", marginRight: 60, height:50 }}>
                        {t("Choose investment holding period")}
                    </label>
                    <div className="select-wrapper calculator-period" style={{ width: "25%", marginTop: 5 }}>
                        <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
                            <option value="Day">{t("Day")}</option>
                            <option value="Hour">{t("Hour")}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-step">
                <Button className="calculate-btn" onClick={handleCalculate} disabled={isLoading}>
                    {isLoading ? t("Calculating...") : t("Calculate")}
                </Button>

            </div>

            {calculationResult && (
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
            <span className="result-value" style={{ color: calculationResult.final_profit >= 0 ? 'green' : 'red' }}>
              {formatCurrency(calculationResult.final_profit)}
            </span>
                        <small className="result-label">{t("Profit")}</small>
                    </div>
                </div>
            )}
        </div>
    );
};