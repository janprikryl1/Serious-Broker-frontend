import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AssetCalculatorSingleCoin } from "./AssetCalculatorSingleCoin.tsx";
import "../../styles/sass/components/index-calculator.scss";
import {useMediaQuery} from "@mui/material";
import {AssetCalculatorComponentTextColumn} from "./AssetCalculatorComponentTextColumn.tsx";

export const AssetCalculatorComponent: FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className="asset-calculator mt-5">
            <div className="container">
                <h2>{t("Crypto calculator")}</h2>
                <p className="subtitle">{t("Calculate How Much You Could Have Earned If You Started Investing In Crypto Earlier With Serious.Broker")}</p>

                <div className={!isMobile ? "calculator-main-layout" : ""}>
                    <AssetCalculatorSingleCoin />
                    <AssetCalculatorComponentTextColumn />
                </div>
            </div>
        </div>
    );
}