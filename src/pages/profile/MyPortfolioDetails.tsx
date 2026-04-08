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
import {MyPortfolioType} from "../../utils/types/asset/MyPortfolioType.ts";
import {QuotedCurrenciesPeriod} from "../../utils/options/QuotedCurrenciesPeriod.ts";
import {Currencies} from "../../utils/enums/CurrenciesEnum.ts";
import {AssetAnalysisGraphData} from "../../utils/types/graphs/AssetAnalysisGraphData.ts";
import {QuotedCurrency} from "../../utils/types/graphs/QuotedCurrency.ts";
import {getAssetGraphData} from "../../utils/api/binanceIndexAssets.ts";
import {formatCurrency} from "../../utils/functions/functions.ts";
import {useMediaQuery} from "@mui/material";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";

export const MyPortfolioDetails: FC = () => {
  const {t} = useTranslation();
  const {id} = useParams();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [portfolio, setPortfolio] = useState<MyPortfolioType>();
  const [selectedPeriod, setSelectedPeriod] = useState(QuotedCurrenciesPeriod.month);
  const [currency, setCurrency] = useState<Currencies>(Currencies.EUR);
  const [currencyPrice, setCurrencyPrice] = useState<string>();
  const [currencyValue, setCurrencyValue] = useState<number>(1);
  const [graphData, setGraphData] = useState<AssetAnalysisGraphData>();

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

  useEffect(() => {
    if (!portfolio) return;
    const getGraphData = async () => {
      try {
        setGraphData(undefined);
        const currencies = portfolio.asset.filter((assetDetail) => assetDetail.status).map((assetDetail) => ({
          asset_label: assetDetail.asset_label,
          allocation: assetDetail.allocation
        })) as QuotedCurrency[]
        const response = await getAssetGraphData(currencies, selectedPeriod);
        if (!response) return;
        setGraphData(response.data);
        setCurrencyPrice(formatCurrency(response.data.price));
        setCurrency(Currencies.EUR);
      } catch (e) {
        console.error(e);
      }
    };
    getGraphData();
  }, [selectedPeriod, portfolio]);

  return (
    <>
      <TitleHeader title={t("My Portfolio Details")}/>

      <div className="container padding-bottom">
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
                    <div className={"d-flex align-items-center gap-4"}>
                        <h2 style={{marginBottom: 0, paddingBottom: 0}}>{portfolio.label}</h2>
                      <MyPortfolioEditButton/>
                    </div>
                    <p>{portfolio.description ? portfolio.description : t("No description")}</p>

                    {/*<p>{t("Amount of investment:")} {portfolio.invested_amount} €*/}
                    {/*  ({t("Value as of today's date")} ({toCzechDate(new Date())}): {portfolio.current_value} €)</p>*/}
                    {/*<p>{t("Date of investing money in cryptocurrencies:")} {toCzechDate(portfolio.start_invest)}</p>*/}
                    {/*<p>{t("Portfolio created")}: {toCzechDate(portfolio.created)}</p>*/}
                    <div className="row mt-5 mb-4">
                      <div className="col-sm-8">
                        <AssetAnalysisGraph
                          currencyValue={currencyValue}
                          setCurrencyValue={setCurrencyValue}
                          setCurrency={setCurrency}
                          setCurrencyPrice={setCurrencyPrice}
                          currencyPrice={currencyPrice}
                          currency={currency}
                          graphData={graphData}
                          selectedPeriod={selectedPeriod}
                          setSelectedPeriod={setSelectedPeriod}
                        />
                      </div>
                      <div className="col-sm-4">
                        <AssetGraphDetails asset={portfolio} currencyValue={currencyValue}
                                           selectedPeriod={selectedPeriod} currency={currency}/>
                      </div>
                    </div>

                    {/* Portfolio composition */}
                    <h4>{t("Portfolio Composition")}</h4>
                    <div className="row">
                      <div className="col-sm-8">
                        <div className="row">
                          {portfolio.asset.map((singleAsset) => (
                            <AssetGraphCurrencyCard singleAsset={singleAsset as Assets} key={singleAsset.id}/>
                          ))}
                        </div>
                      </div>
                      {!isMobile &&
                          <div className="col-sm-4">
                              <AssetGraphPieChart assets={portfolio.asset as Assets[]}/>
                          </div>
                      }
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
    </>
  );
}