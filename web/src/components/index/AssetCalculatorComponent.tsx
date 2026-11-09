import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AssetCalculatorSingleCoin } from "./AssetCalculatorSingleCoin.tsx";
import "../../styles/sass/components/index-calculator.scss";
import {AssetCalculatorComponentTextColumn} from "./AssetCalculatorComponentTextColumn.tsx";
import {GlassCard} from "../reusable/GlassCard.tsx";
import {SEO} from "../reusable/SEO.tsx";
import {getCalculatorSchema, getBreadcrumbSchema} from "../../utils/functions/seoSchemas.ts";
import {routes} from "../../utils/constants";
import {TitleHeader} from "../about/TitleHeader.tsx";

export const AssetCalculatorComponent: FC = () => {
    const { t } = useTranslation();

    const schemas = [
        getCalculatorSchema(),
        getBreadcrumbSchema([
            { name: "Domů", url: routes.home },
            { name: t("Crypto calculator") || "Kalkulačka", url: routes.cryptoCalculator },
        ]),
    ];

    return (
        <div className="asset-calculator">
            <SEO
                title={t("Crypto calculator") || "Krypto kalkulačka výnosů"}
                description="Spočítejte si, kolik jste mohli vydělat, kdybyste začali investovat do kryptoměn dříve s platformou Serious Broker."
                canonicalPath={routes.cryptoCalculator}
                schema={schemas}
            />
            <TitleHeader title={t("Crypto calculator")} />
            <div className="container">
                <p className="subtitle">
                    {t("Calculate how much you could have earned if you started investing nn crypto earlier with Serious.Broker.")}
                </p>

                <div className="calculator-main-layout">
                    <AssetCalculatorSingleCoin/>
                    <AssetCalculatorComponentTextColumn/>
                </div>
            </div>
        </div>
    );
}