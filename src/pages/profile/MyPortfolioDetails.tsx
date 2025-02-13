import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getMyPortfolioDetailsGraph} from "../../api/myPortfolioService.ts";
import {Assets} from "../../utils/types/asset/AssetDetailType.ts";
import {AssetGraphCurrencyCard} from "../../components/modules/graphs/asset/AssetGraphCurrencyCard.tsx";
import {AssetGraphPieChart} from "../../components/modules/graphs/asset/AssetGraphPieChart.tsx";
import {AssetDetailSkeleton} from "../../components/modules/graphs/asset/AssetDetailSkeleton.tsx";
import {useTranslation} from "react-i18next";
import {AssetGraphDetails} from "../../components/modules/graphs/asset/AssetGraphDetails.tsx";
import {toCzechDate} from "../../utils/constants/functions.ts";
import {MyPortfolioEditButton} from "../../components/modules/profile/myPortfolio/myPortfolioEdit/MyPortfolioEditButton.tsx";

export const MyPortfolioDetails:FC = () => {
    const { t } = useTranslation();
    const {id} = useParams();
    const [portfolio, setPortfolio] = useState<any>();
    
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
                                    <AssetGraphDetails asset={portfolio}/>
                                    <div className="row">
                                        {portfolio.asset.map((singleAsset: Assets) => (
                                            <AssetGraphCurrencyCard singleAsset={singleAsset}
                                                                    key={singleAsset.id}/>
                                        ))}
                                    </div>
                                    <AssetGraphPieChart assets={portfolio.asset}/>
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