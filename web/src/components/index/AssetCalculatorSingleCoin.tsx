import {FC, useEffect, useState} from "react";
import {Button} from "../reusable/Button.tsx";
import {useTranslation} from "react-i18next";
import {getAllAssetCoins, getAssetCoinDetails} from "../../utils/api/assetCalculatorService.ts";
import {CustomSwal} from "../../utils/functions/customSwal.ts";
import {captureEvent} from "../../utils/posthog.ts";
import {formatCurrency} from "../../utils/functions/functions.ts";

type ICalculationResult = {
    final_profit: number;
    chart_data: { datetime: string; profit: number }[];
}

export const AssetCalculatorSingleCoin: FC = () => {
    const {t, i18n} = useTranslation();
    const [assetCoins, setAssetCoins] = useState<{ asset_label: string }[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<string>("");
    const [selectedPeriod, setSelectedPeriod] = useState<string>("Day");
    const [selectedCurrency, setSelectedCurrency] = useState<string>("EUR");
    const [amount, setAmount] = useState<number | string>(1);
    const [calculationResult, setCalculationResult] = useState<ICalculationResult | null>(null);
    const [isProfit, setIsProfit] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [displayMessage, setDisplayMessage] = useState<string | null>(null);
    const AMOUNT_TOO_BIG_MESSAGE = t("Please enter an amount smaller than 100 000.");
    const AMOUNT_TOO_SMALL_MESSAGE = t("Please enter an amount greater than 0.");
    const MIN_AMOUNT = 1;
    const MAX_AMOUNT = 100_000;

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
            handleCalculate();
        }
    }, [assetCoins]);

    const getAmountError = (value: number | string): string | null => {
        if (value === "" || !Number.isFinite(Number(value)) || Number(value) <= 0) {
            return AMOUNT_TOO_SMALL_MESSAGE;
        }

        if (Number(value) >= MAX_AMOUNT) {
            return AMOUNT_TOO_BIG_MESSAGE;
        }

        return null;
    };

    const handleCalculate = async () => {
        const amountError = getAmountError(amount);

        if (!selectedCoin || amountError) {
            setDisplayMessage(amountError);

            CustomSwal.fire({
                title: t("Error"),
                text: amountError ?? t("Please select a coin and enter a valid amount."),
                icon: "warning",
                confirmButtonText: t("Ok"),
            });
            return;
        }

        setDisplayMessage(null);
        setIsLoading(true);
        setCalculationResult(null);

        try {
            const response = await getAssetCoinDetails(selectedCoin, selectedPeriod, Number(amount));
            if (response?.data) {
                setCalculationResult(response.data);
                setIsProfit(response.data.final_profit >= 0);
                captureEvent("calculator_simulation_run", {
                    coin: selectedCoin,
                    period: selectedPeriod,
                    amount: Number(amount),
                    final_profit: response.data.final_profit,
                });
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

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount(value);
        setDisplayMessage(getAmountError(value));
    };

    return (
        <div className="calculator-form-container">
            <div className="tw-mb-7">
                <label className="calculator-label">{t("Choose asset name:")}</label>
                <div className="select-wrapper tw-mb-1">
                    <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}
                            className="select-box-outline">
                        <option value="" disabled>{t("Start typing or select...")}</option>
                        {assetCoins.map((coin) => (
                            <option key={coin.asset_label} value={coin.asset_label}>{coin.asset_label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="tw-mb-7">
                <label className="calculator-label mt-2">{t("Invested amount")}</label>
                <div className="amount-group">
                    <input
                        type="number"
                        placeholder={t("e.g. 500")}
                        value={amount}
                        min={MIN_AMOUNT}
                        max={MAX_AMOUNT}
                        className="outline-input"
                        onChange={handleAmountChange}
                    />
                    <div className="select-wrapper calculator-currency">
                        <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}
                                className="select-box-outline">
                            <option>EUR</option>
                        </select>
                    </div>
                </div>
                {displayMessage && <p className="tw-text-red tw-text-sm">{displayMessage}</p>}

            </div>

            <div className="tw-mb-7">
                <div className="period-group">
                    <label className="calculator-label calculator-label--period">
                        {t("Choose investment holding period")}
                    </label>
                    <div className="select-wrapper calculator-period">
                        <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="select-box-outline">
                            <option value="Day">{t("Day")}</option>
                            <option value="Hour">{t("Hour")}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="tw-mb-5">
                <Button
                    className="primary tw-w-full tw-py-3"
                    onClick={handleCalculate}
                    disabled={isLoading}
                >
                    {isLoading ? t("Calculating...") : t("Calculate")}
                </Button>
            </div>

            {calculationResult && (
                <div
                    className={`tw-mt-4 tw-relative tw-overflow-hidden tw-rounded-xl tw-border tw-border-solid tw-p-4 tw-transition-all tw-duration-300 ${
                        isProfit
                            ? "tw-bg-emerald-950/20 tw-border-emerald-500/30 tw-shadow-[0_4px_20px_rgba(16,185,129,0.1)]"
                            : "tw-bg-rose-950/20 tw-border-rose-500/30 tw-shadow-[0_4px_20px_rgba(244,63,94,0.1)]"
                    }`}
                >
                    <div
                        className={`tw-pointer-events-none tw-absolute -tw-right-6 -tw-top-6 tw-h-20 tw-w-20 tw-rounded-full tw-blur-2xl ${
                            isProfit ? "tw-bg-emerald-500/15" : "tw-bg-rose-500/15"
                        }`}
                    />

                    <div className="tw-relative tw-flex tw-items-center tw-justify-between">
                        <div className="tw-flex tw-flex-col">
                            <span
                                className="tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wider tw-text-stone-400">
                                {t("Estimated P/L")}
                            </span>
                                <span className="tw-text-xs tw-text-stone-500">
                                {isProfit ? t("Profit for the selected period") : t("Loss for the selected period")}
                            </span>
                        </div>

                        <div className="tw-flex tw-items-center tw-gap-2">
                            <span
                                className={`tw-text-2xl sm:tw-text-3xl tw-font-bold tw-tracking-tight ${
                                  isProfit ? "tw-text-emerald-400" : "tw-text-rose-400"
                                }`}
                            >
                                {isProfit ? "+" : ""}
                                {formatCurrency(
                                    calculationResult.final_profit,
                                    i18n.language,
                                    selectedCurrency
                                )}
                            </span>

                            <span
                                className={`tw-inline-flex tw-items-center tw-justify-center tw-w-7 tw-h-7 tw-rounded-full tw-text-sm tw-font-bold ${
                                    isProfit
                                        ? "tw-bg-emerald-500/20 tw-text-emerald-300"
                                        : "tw-bg-rose-500/20 tw-text-rose-300"
                                }`}
                            >
                            {isProfit ? "↑" : "↓"}
                          </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};