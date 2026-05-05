import {FC} from "react";
import {Assets} from "../../utils/types/asset/AssetDetailType.ts";
import {useTranslation} from "react-i18next";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {AssetAnalysisGraph} from "../../components/graphs/asset/AssetAnalysisGraph.tsx";
import {AssetGraphDetails} from "../../components/graphs/asset/AssetGraphDetails.tsx";
import {AssetGraphCurrencyCard} from "../../components/graphs/asset/AssetGraphCurrencyCard.tsx";
import {AssetGraphPieChart} from "../../components/graphs/asset/AssetGraphPieChart.tsx";
import {AssetDetailSkeleton} from "../../components/graphs/asset/AssetDetailSkeleton.tsx";
import {Highlight} from "../../components/editor/highlights/Highlight.tsx";
import {useAssetGraph} from "../../utils/hooks/useAssetGraph.ts";
import {Link, useMediaQuery} from "@mui/material";
import {routes} from "../../utils/constants";

export const AssetGraph: FC = () => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    asset,
    handleToggleWatchList,
    selectedPeriod,
    setSelectedPeriod,
    currencyValue,
    setCurrencyValue,
    setCurrency,
    setCurrencyPrice,
    currencyPrice,
    currency,
    graphData,
    missingCurrencies,
    isInWatchList
  } = useAssetGraph();

  return (
    asset ? (
      <>
        <TitleHeader title={asset?.name} text={asset?.label}/>
        <div className="container padding-bottom asset-font mt-4">
          <div className="service-details__content" data-aos="fade-up" data-aos-duration="900">
            <div className="row mt-5 mb-4">
              <div className="col-12 col-xl-8">
                <AssetAnalysisGraph
                  isInWatchList={isInWatchList}
                  handleToggleWatchList={handleToggleWatchList}
                  selectedPeriod={selectedPeriod}
                  setSelectedPeriod={setSelectedPeriod}
                  currencyValue={currencyValue}
                  setCurrencyValue={setCurrencyValue}
                  setCurrency={setCurrency}
                  setCurrencyPrice={setCurrencyPrice}
                  currencyPrice={currencyPrice}
                  currency={currency}
                  graphData={graphData}
                  missingCurrencies={missingCurrencies}
                />
              </div>
              <div className="col-12 col-xl-4">
                <AssetGraphDetails
                  asset={asset}
                  selectedPeriod={selectedPeriod}
                  currency={currency}
                  currencyValue={currencyValue}
                  showPriceDetails
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-xl-8">
                {asset.about &&
                    <>
                        <h2 className="asset-title">{t("About")}</h2>
                        <p>{asset.about}</p>
                    </>
                }
              </div>
            </div>
            <h2 className="asset-title">{t("Index composition")}</h2>
            {asset.assets && asset.assets.length > 0 && (
              <div className="row">
                <div className="col-12 col-xl-8">
                  <div className="row">
                    {asset.assets.map((singleAsset: Assets) => (
                      <AssetGraphCurrencyCard
                        singleAsset={singleAsset}
                        key={singleAsset.id}
                      />
                    ))}
                  </div>
                </div>
                {!isMobile &&
                    <div className="col-12 col-xl-4">
                        <AssetGraphPieChart assets={asset.assets}/>
                    </div>
                }
              </div>
            )}
          </div>
        </div>
      </>
    ) : <AssetDetailSkeleton/>
  );
};
