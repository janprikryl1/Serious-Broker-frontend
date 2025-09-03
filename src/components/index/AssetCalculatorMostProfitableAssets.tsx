import {FC, useEffect, useState} from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useTranslation} from "react-i18next";
import {bestAssetDetails} from "../../utils/api/assetCalculatorService.ts";
import Skeleton from "react-loading-skeleton";
import {OverviewTableChart} from "../overview/overviewTableData/overviewTableChart/OverviewTableChart.tsx";

type IBestAssetData = {
    asset_label: string;
    final_profit: number;
    chart_data: number[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
}

export const AssetCalculatorMostProfitableAssets: FC = () => {
    const {t} = useTranslation();
    const [index, setIndex] = useState(0);
    const [chartData, setChartData] = useState<IBestAssetData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const response = await bestAssetDetails(index);
                if (response?.data) {
                    setChartData(response.data);
                } else {
                    setIndex(prevIndex => prevIndex > 0 ? prevIndex : 0);
                }
            } catch (error) {
                console.error("Failed to load best asset details:", error);
                setIndex(prevIndex => prevIndex > 0 ? prevIndex : 0);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [index]);

    const handlePrev = () => { if (index > 0) setIndex(index - 1); };
    const handleNext = () => { setIndex(index + 1); };


    if (isLoading && !chartData) {
        return <Skeleton height={120} style={{borderRadius: '12px'}} />;
    }

    if (chartData) {
        const isProfit = chartData.final_profit >= 0;
        const profitColor = isProfit ? '#2E7D32' : '#C62828';
        
        return (
            <div className="most-profitable-section">
                <h5 className="most-profitable-title">
                    {t("Most profitable assets")}
                </h5>
                <div className="result-box most-profitable-box">
                    <div className="result-chart-wrapper">
                        <OverviewTableChart
                            name={chartData.asset_label}
                            data={chartData.chart_data}
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <div className="result-text-content">
                        <span className="result-label" style={{fontWeight: '600', fontSize: '1.2rem'}}>{chartData.asset_label}</span>
                        <span className="result-value" style={{color: profitColor}}>
                            {formatCurrency(chartData.final_profit)}
                        </span>
                    </div>
                    <button className="overlay-arrow left" onClick={handlePrev} disabled={index === 0}>
                        <IoIosArrowBack/>
                    </button>
                    <button className="overlay-arrow right" onClick={handleNext}>
                        <IoIosArrowForward/>
                    </button>
                </div>
            </div>
        );
    }
}