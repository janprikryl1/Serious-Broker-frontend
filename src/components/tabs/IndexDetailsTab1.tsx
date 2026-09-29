import {Dispatch, FC, SetStateAction, useState} from "react";
import {useParams} from "react-router-dom";
import {
  BinanceIndexAssetRecomBestPreviousDetails
} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";
import {RecommendationDetailsSkeleton} from "../../components/graphs/RecommendationDetailsSkeleton.tsx";
import {CryptoDetailsRecommendationGraph} from "../graphs/CryptoDetailsRecommendationGraph.tsx";
import {CryptoCurrencyDetailType} from "../../utils/types/asset/CryptoCurrencyType.ts";
import {CollapsibleInfoBox} from "../../components/reusable/CollapsibleInfoBox.tsx";
import {AssetAnalysisGraph} from "../graphs/asset/AssetAnalysisGraph.tsx";
import {AssetGraphDetails} from "../graphs/asset/AssetGraphDetails.tsx";
import {AssetDetailType, Assets} from "../../utils/types/asset/AssetDetailType.ts";
import {AssetGraphCurrencyCard} from "../graphs/asset/AssetGraphCurrencyCard.tsx";
import {AssetGraphPieChart} from "../graphs/asset/AssetGraphPieChart.tsx";
import {useMediaQuery} from "@mui/material";
import {useAssetGraph} from "../../utils/hooks/useAssetGraph.ts";
import {AssetDetailSkeleton} from "../graphs/asset/AssetDetailSkeleton.tsx";
import {MissingCurrencyType} from "../../utils/types/graphs/MissingCurrencyType.ts";
import {QuotedCurrenciesPeriod} from "../../utils/options/QuotedCurrenciesPeriod.ts";
import {Currencies} from "../../utils/enums/CurrenciesEnum.ts";
import {AssetAnalysisGraphData} from "../../utils/types/graphs/AssetAnalysisGraphData.ts";

type Props = {
  asset: AssetDetailType | null;
  selectedPeriod: QuotedCurrenciesPeriod;
  setSelectedPeriod: Dispatch<SetStateAction<QuotedCurrenciesPeriod>>;
  currencyValue: number;
  setCurrencyValue: Dispatch<SetStateAction<number>>;
  setCurrency: Dispatch<SetStateAction<Currencies>>;
  setCurrencyPrice: Dispatch<SetStateAction<string | undefined>>;
  currencyPrice: string | undefined;
  currency: Currencies;
  graphData: AssetAnalysisGraphData | undefined;
  missingCurrencies: MissingCurrencyType[] | undefined;
};

export const IndexDetailsTab1: FC<Props> = ({
                                              asset,
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
                                            }) => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {asset ? (
        <>
          <div className="row mt-5 mb-4">
            <div className="col-12 col-xl-8">
              <AssetAnalysisGraph
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
                      <h6>{t("About")}</h6>
                      <p>{asset.about}</p>
                  </>
              }
            </div>
          </div>

          <h4>{t("Index composition")}</h4>
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
        </>
      ) : <AssetDetailSkeleton/>}
    </>
  );
};