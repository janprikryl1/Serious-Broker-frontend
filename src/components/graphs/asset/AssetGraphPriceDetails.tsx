import {FC, useEffect, useState} from "react";
import {AssetGraphPriceDetailsType} from "../../../utils/types/graphs/AssetGraphPriceDetailsType.ts";
import {getAssetGraphPriceDetails} from "../../../utils/api/binanceIndexAssets.ts";
import {toPercentTwoDecimal} from "../../../utils/functions/functions.ts";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {Currencies} from "../../../utils/enums/CurrenciesEnum.ts";

type Props = {
    currency: Currencies;
    currencyValue: number;
};

export const AssetGraphPriceDetails:FC<Props> = ({currency, currencyValue}) => {
    const {t} = useTranslation();
    const { name } = useParams();
    const [assetGraphPriceDetails, setAssetGraphPriceDetails] = useState<AssetGraphPriceDetailsType>();

    useEffect(() => {
        if (!name) return;
        const getDetails = async () => {
            try {
                const response = await getAssetGraphPriceDetails(name);
                if (!response) return;
                setAssetGraphPriceDetails(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        getDetails();
    }, []);

    const renderRow = (label: string, value: number | null) => {
        if (value !== 0 && value !== null) {
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                    }}
                >
                    <span>{label}</span>
                    <span style={{fontWeight: "bold"}}>{toPercentTwoDecimal(value * currencyValue)} {currency}</span>
                </div>
            );
        }
        return null;
    };
    
    return (
        <>
            <p style={{fontSize: "25px", fontWeight: "bold", marginBottom: "5px", marginTop: "20px"}}>{t("Details")}</p>
            {assetGraphPriceDetails === undefined ? <p>{t("Loading...")}</p> : (
                <div style={{fontSize: "12px"}}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "4px",
                        }}
                    >
                        <span>{t("Market capitalisation: ")}</span>
                        <span
                            style={{fontWeight: "bold"}}>{toPercentTwoDecimal(assetGraphPriceDetails.marketcap)} $</span>
                    </div>
                    {renderRow(t("Current price: "), assetGraphPriceDetails.current_price)}
                    {renderRow(t("Daily high: "), assetGraphPriceDetails.daily_high)}
                    {renderRow(t("Daily low: "), assetGraphPriceDetails.daily_low)}
                </div>
            )}
        </>
    );
}