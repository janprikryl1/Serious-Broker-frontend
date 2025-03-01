import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Assets} from "../../utils/types/asset/AssetDetailType.ts";
import {useTranslation} from "react-i18next";
import {getMyPortfolioDetailsGraph} from "../../utils/api/myPortfolioService.ts";
import {MyPortfolioEditButton} from "../../components/profile/myPortfolio/myPortfolioEdit/MyPortfolioEditButton.tsx";
import {AssetGraphDetails} from "../../components/graphs/asset/AssetGraphDetails.tsx";
import {AssetGraphCurrencyCard} from "../../components/graphs/asset/AssetGraphCurrencyCard.tsx";
import {AssetGraphPieChart} from "../../components/graphs/asset/AssetGraphPieChart.tsx";
import {AssetDetailSkeleton} from "../../components/graphs/asset/AssetDetailSkeleton.tsx";
import {toCzechDate} from "../../utils/functions/dateFunctions.ts";
import {AssetAnalysisGraph} from "../../components/graphs/asset/AssetAnalysisGraph.tsx";
import {QuotedCurrency} from "../../utils/types/graphs/QuotedCurrency.ts";
import {MyPortfolioType} from "../../utils/types/asset/MyPortfolioType.ts";

export const MyPortfolioDetails:FC = () => {
    const { t } = useTranslation();
    const {id} = useParams();
    const [portfolio, setPortfolio] = useState<MyPortfolioType>();
    
    useEffect(() => {
        if (!id) return;
        const fetchPortfolio = async () => {
            try {
                const response = await getMyPortfolioDetailsGraph(id);
                setPortfolio(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPortfolio();
    }, []);
    
    return (
        <div className="padding-bottom">
            <div className="service-details__wrapper">
                <div className="service-details__item">
                    <div className="service-details__item-inner">
                        <div
                            className="service-details__content"
                            data-aos="fade-up"
                            data-aos-duration="900"
                        >
                            {portfolio ? (
                                <>
                                    <h2 className="mb-4">{t("Title of portfolio")}: {portfolio.label} <MyPortfolioEditButton /></h2>
                                    <h3>{portfolio.description}</h3>
                                    <p>{t("Created")}: {toCzechDate(portfolio.created)}</p>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <AssetAnalysisGraph
                                                currencies={portfolio.asset.filter((assetDetail) => assetDetail.status).map((assetDetail) => ({
                                                    asset_label: assetDetail.asset_label,
                                                    allocation: assetDetail.allocation
                                                })) as QuotedCurrency[]}
                                            />
                                        </div>
                                        <div className="col-sm-4">
                                            <AssetGraphDetails asset={portfolio}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <div className="row">
                                                {portfolio.asset.map((singleAsset) => (
                                                    <AssetGraphCurrencyCard singleAsset={singleAsset as Assets}
                                                                            key={singleAsset.id}/>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <AssetGraphPieChart assets={portfolio.asset as Assets[]}/>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <AssetDetailSkeleton/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}