import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { bitcoinProfitCalculate } from "../../utils/api/bitcoinCalculatorService.ts";
import { BitcoinCalculatorResponseType } from "../../utils/types/BitcoinCalculatorResponseType.ts";
import {Button} from "../reusable/Button.tsx";
import {formatDateForDisplay} from "../../utils/functions/dateFunctions.ts";
import {BitcoinProfitCalculatorInfoCol} from "./BitcoinProfitCalculatorInfoCol.tsx";
import {InputGroup, Spinner} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../styles/sass/components/bitcoin_profit_calculator.scss";
import {CustomSwal} from "../../utils/functions/customSwal.ts";

export const BitcoinProfitCalculator: FC = () => {
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
    
    return (
        <div className="py-5 bitcoin-profit-calculator-container">
            <div className="container">
                <h2 className="index-section-head-title mb-1">{t("Bitcoin Profit Calculator")}</h2>
                <p style={{ maxWidth: '800px' }}>
                    {t("Curious how much you'd have earned if you invested in Bitcoin earlier? Explore the potential of past investments and discover what your gains could have been.")}
                </p>

                <div className="row bitcoin-profit-calculator-row">
                    <div className="col-sm-5 p-4 bitcoin-profit-calculator-calculate-section">
                        <Form noValidate onSubmit={calculateProfit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="font-bold">{t('Enter the amount')}:</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="number"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder="1"
                                        required
                                        min="0.01"
                                        step={0.1}
                                        className="bitcoin-profit-calculator-amount-input"
                                    />
                                    <Form.Select value={currency} onChange={handleCurrencyChange} className="bitcoin-profit-calculator-currency-select">
                                        <option value="EUR">EUR</option>
                                        <option value="USD">USD</option>
                                    </Form.Select>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="font-bold">{t('Enter the date')}:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={purchaseDate}
                                    onChange={handleDateChange}
                                    required
                                    max={new Date().toISOString().split("T")[0]}
                                    className="bitcoin-profit-calculator-purchase-date-input"
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-center mt-3 mb-3">
                                <Button type="submit" disabled={isLoading} className="bitcoin-profit-calculator-submit-button">
                                    {isLoading ? (
                                        <Spinner as="span" animation="border" size="sm" className="me-2"/>
                                    ) : (
                                        t('Calculate profit')
                                    )}
                                </Button>
                            </div>
                        </Form>

                        {profitResult && (
                            <div className="mt-4 text-center">
                                <p className="bitcoin-profit-calculator-result-text" style={{color: profitResult.profit_loss_amount >= 0 ? '#a6f0a6' : '#ff8a8a'}}>
                                    {t(profitResult.profit_loss_amount >= 0 ? 'Profit' : 'Loss')}: {profitResult.profit_loss_amount} {currency.toUpperCase()}
                                </p>
                                <p className="bitcoin-profit-calculator-amount-description">
                                    {t('If you invested')} {amount} {currency} {t('on ')} {formatDateForDisplay(purchaseDate)}.
                                </p>
                            </div>
                        )}
                    </div>
                    <BitcoinProfitCalculatorInfoCol />
                </div>
            </div>
        </div>
    );
};