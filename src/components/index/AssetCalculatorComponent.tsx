import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {AssetCalculatorSingleCoin} from "./AssetCalculatorSingleCoin.tsx";
import {AssetCalculatorSetOfCoins} from "./AssetCalculatorSetOfCoins.tsx";

export const AssetCalculatorComponent: FC = () => {
    const {t} = useTranslation();
    const [assetType, setAssetType] = useState<'single' | 'set'>('single');

    return (
        <div className="asset-calculator">
            <h4 className="calculator-title">{t("Asset profitability calculator")}</h4>

            <div className="calculator-section">
                <label className="calculator-label">{t("Choose asset:")}</label>
                <div className="radio-group" onChange={() => setAssetType(assetType === 'single' ? 'set' : 'single')}>
                    <label className="radio-label">
                        <input type="radio" name="asset-type" value="single" defaultChecked/>
                        <span>{t("single coin")}</span>
                    </label>
                    <label className="radio-label">
                        <input type="radio" name="asset-type" value="set"/>
                        <span>{t("set of coins")}</span>
                    </label>
                </div>
            </div>

            {assetType === 'single' ? <AssetCalculatorSingleCoin/> : <AssetCalculatorSetOfCoins />}
        </div>
    );
}