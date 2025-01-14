import {FC, useEffect, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { TitleHeader } from "../../components/modules/about/TitleHeader.tsx";
import { getAssetByIdGraphData } from "../../api/binanceIndexAssets.ts";
import { Assets } from "../../utils/types/asset/AssetDetailType.ts";
import { EarningIn } from "./earningIn/EarningIn.tsx";
import { AssetGraphCurrencyDetailSkeleton } from "../../components/modules/graphs/asset/AssetGraphCurrencyDetailSkeleton.tsx";
import { toCzechDateFormat } from "../../utils/constants/functions.ts";
import { useThemeContext } from "../../utils/providers/ThemeProvider.tsx";
import {AssetGraphCurrencyDetailTextItem} from "../../components/modules/graphs/asset/AssetGraphCurrencyDetailTextItem.tsx";
import {CandlestickData} from "../../utils/types/KlineData.ts";
import {CoinGraph} from "../../components/modules/demo/demoWidgets/CoinGraph.tsx";

export const AssetGraphCurrencyDetail: FC = () => {
    const { theme } = useThemeContext();
    const { t } = useTranslation();
    const { index_label } = useParams();
    const [asset, setAsset] = useState<Assets>();
    const today = useMemo(() => new Date(), []);
    const oneYearAgo = useMemo(() => new Date(new Date().setFullYear(today.getFullYear() - 1)), [today]);
    const [startDate, setStartDate] = useState<string>(oneYearAgo.toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState<string>(today.toISOString().split("T")[0]);
    const [series, setSeries] = useState<{ data: CandlestickData[] }[]>();

    useEffect(() => {
        const getGraphData = async () => {
            if (index_label === undefined) return;
            const response = await getAssetByIdGraphData(parseInt(index_label));
            if (!response) return;
            setAsset(response.data.asset);
        };
        getGraphData();
    }, [index_label]);

    return (
        <>
            <TitleHeader title={t("GraphAssetData - details about asset and graph")} />
            {asset ? (
                <>
                    <div className="d-flex justify-content-center  min-vh-100 padding-bottom padding-top">
                        <div
                            style={{
                                backgroundColor: theme === "dark" ? "#343a40" : "#f5f8fb",
                                borderRadius: 24,
                                padding: 40,
                                width: "95%",
                                maxWidth: "1000px",
                                textAlign: "center",
                                boxShadow: "0 4px 16px rgba(0,0,0,0.5)"
                            }}
                            data-aos="fade-up"
                            data-aos-duration="1000"
                        >
                            <AssetGraphCurrencyDetailTextItem text={t("GraphAssetData - details about asset and graph")} marginBottom="20px" fontSize="1.8rem" />
                            <AssetGraphCurrencyDetailTextItem text={<span>{t("Currency: ")} <strong>{asset.asset_label}</strong></span>} />
                            <AssetGraphCurrencyDetailTextItem text={<span>{t("Allocation: ")} <strong>{asset.allocation * 100}%</strong></span>} />
                            <AssetGraphCurrencyDetailTextItem text={<span>{t("Changed")}: <strong>{toCzechDateFormat(asset.changed)}</strong></span>} />
                            <AssetGraphCurrencyDetailTextItem text={<span>{t("Created")}: <strong>{toCzechDateFormat(asset.created)}</strong></span>} marginBottom="40px" />
                            <CoinGraph
                                asset_label={asset.asset_label}
                                series={series}
                                setStartDate={setStartDate}
                                startDate={startDate}
                                setSeries={setSeries}
                                endDate={endDate}
                                setEndDate={setEndDate}
                            />
                        </div>
                    </div>
                    {series !== undefined && <EarningIn series={series} startDate={startDate} endDate={endDate}/>}
                </>
            ) : (
                <AssetGraphCurrencyDetailSkeleton />
            )}
        </>
    );
};
