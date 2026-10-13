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
export const MyPortfolioDetails: FC = () => {
  const {t, i18n} = useTranslation();
  const {id} = useParams();
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
        setCurrencyPrice(formatCurrency(response.data.price, i18n.language, Currencies.EUR));
        setCurrency(Currencies.EUR);
      } catch (e) {
        console.error(e);
      }
    };
    getGraphData();
  }, [selectedPeriod, portfolio]);

  return (
    <>
      <div className="container padding-bottom tw-mt-4 tw-pt-6 sm:tw-mt-6 sm:tw-pt-10 lg:tw-pt-12">
        <div
          data-aos="fade-up"
          data-aos-duration="900"
        >
          {portfolio ? (
            <>
              <div className="color-container--gold tw-inline-block tw-w-fit tw-text-xs">
                {t("Custom portfolio details")}
              </div>
              <div className="tw-mb-3 tw-flex tw-flex-wrap tw-items-center tw-gap-2 sm:tw-gap-3">
                <h3 className="tw-mb-0 tw-p-0 tw-text-xl sm:tw-text-2xl lg:tw-text-3xl">{portfolio.label}</h3>
                <MyPortfolioEditButton/>
              </div>
              {portfolio.description ? (
                <p className="tw-mb-0 tw-max-w-4xl tw-text-sm tw-leading-relaxed tw-text-stone-300 sm:tw-text-base">
                  {portfolio.description}
                </p>
              ) : null}

              <div className="row tw-mt-6 tw-mb-2 sm:tw-mb-4">
                <div className="col-12 col-xl-8">
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
                <div className="col-12 col-xl-4">
                  <AssetGraphDetails asset={portfolio} currencyValue={currencyValue}
                                     selectedPeriod={selectedPeriod} currency={currency}/>
                </div>
              </div>

              <div className="tw-mb-3 tw-mt-2 sm:tw-mb-4">
                <h4 className="tw-mb-0 tw-mt-16 tw-text-lg sm:tw-text-xl lg:tw-text-2xl">{t("Portfolio Composition")}</h4>
              </div>
              <div className="row g-0 gy-4">
                <div className="col-12 col-lg-12 col-xl-8">
                  <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 tw-mb-7">
                    {portfolio.asset.map((singleAsset) => (
                      <AssetGraphCurrencyCard singleAsset={singleAsset as Assets} key={singleAsset.id}/>
                    ))}
                  </div>
                </div>
                <div className="col-12 col-lg-12 col-xl-4 tw-flex tw-justify-center">
                  <AssetGraphPieChart assets={portfolio.asset as Assets[]}/>
                </div>
              </div>
            </>
          ) : (
            <AssetDetailSkeleton/>
          )}
        </div>
      </div>
    </>
  );
}