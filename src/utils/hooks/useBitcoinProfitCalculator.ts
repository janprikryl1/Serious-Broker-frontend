import {ChangeEvent, FormEvent, useState} from "react";
import {BitcoinCalculatorResponseType} from "../types/BitcoinCalculatorResponseType.ts";
import {bitcoinProfitCalculate} from "../api/bitcoinCalculatorService.ts";
import {CustomSwal} from "../functions/customSwal.ts";
import {useTranslation} from "react-i18next";

export const useBitcoinProfitCalculator = () => {
    const { t } = useTranslation();
    const [amount, setAmount] = useState<string>('1');
    const [currency, setCurrency] = useState<string>('EUR');
    const [purchaseDate, setPurchaseDate] = useState<string>('2020-01-01');
    const [profitResult, setProfitResult] = useState<BitcoinCalculatorResponseType>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
        setProfitResult(undefined);
    };

    const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCurrency(e.target.value);
        setProfitResult(undefined);
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPurchaseDate(e.target.value);
        setProfitResult(undefined);
    };

    const calculateProfit = async (event: FormEvent) => {
        event.preventDefault();
        const numAmount = parseFloat(amount);
        if (new Date(purchaseDate) > new Date()) return;
        setIsLoading(true);
        try {
            const result = await bitcoinProfitCalculate(numAmount, currency, purchaseDate);
            setProfitResult(result.data);
        } catch (err: any) {
            console.error("Calculation Error:", err);
            CustomSwal.fire({
                title: t('Error'),
                text: t('An error occurred during calculation.'),
                icon: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return {
        calculateProfit,
        amount,
        currency,
        purchaseDate,
        profitResult,
        isLoading,
        handleAmountChange,
        handleCurrencyChange,
        handleDateChange
    }
}