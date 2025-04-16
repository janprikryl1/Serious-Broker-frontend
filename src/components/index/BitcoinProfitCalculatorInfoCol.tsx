import {FC} from "react";
import {useTranslation} from "react-i18next";

export const BitcoinProfitCalculatorInfoCol:FC = () => {
    const {t} = useTranslation();
    
    return (
        <div className="col-sm-7 pt-4 pb-4 bitcoin-profit-calculator-info-section">
            <p>{t('This calculator helps determine potential profit or loss from past Bitcoin investments based on historical data')}.</p>
            <h3>{t('Input')}</h3>
            <ul className="bitcoin-profit-calculator-info-list">
                <li>{t('The')} <strong>{t('amount')}</strong> {" "} {t('of the investment')}</li>
                <li>{t('The')} <strong>{t('currency')}</strong></li>
                <li>{t('The')} <strong>{t('date')}</strong> {" "} {t('of the purchase')}</li>
            </ul>
            <h3>{t('Result')}</h3>
            <p className="p18">{t('Calculated profit or loss based on the input')}.</p>
            <p className="bitcoin-profit-calculator-info-small">
                {t('This calculation is for informational purposes only. Past performance is not a guarantee of future results')}.
            </p>
        </div>
    );
}