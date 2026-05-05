import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
  BinanceIndexAssetRecomBestPreviousDetails
} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";
import {getBinanceIndexAssetRecomBestPreviousDetail} from "../../utils/api/GraphsService.ts";
import {TitleHeader} from "../../components/about/TitleHeader.tsx";
import {RecommendationDetailsSkeleton} from "../../components/graphs/RecommendationDetailsSkeleton.tsx";
import {RecommendationDetailSeasonEnum} from "../../utils/enums/RecommendationDetailSeasonEnum.ts";
import {RecommendedDetailsPriceGraph1} from "../../components/graphs/RecommendedDetailsPriceGraph_new.tsx";
import {CardContainer} from "../../components/reusable/CardContainer.tsx";
import {BtfdDcaComparison} from "../../components/graphs/BtfdDcaComparison.tsx";
import {OutlineContainer} from "../../components/reusable/OutlineContainer.tsx";
import {getCryptocurrencyById} from "../../utils/api/CryptocurrencyService.ts";
import {coinURL} from "../../utils/constants";
import {CryptoCurrencyDetailType} from "../../utils/types/asset/CryptoCurrencyType.ts";
import {CollapsibleInfoBox} from "../../components/reusable/CollapsibleInfoBox.tsx";

/*
*  URL: https://serious.broker/graphs/recommendation/detail/BTC
*  login -> pairs -> search asset or select from the table
* */

export enum Day {
  Sunday = 1,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}


export const RecommendationDetails: FC = () => {
  const {t} = useTranslation();
  const {asset_label} = useParams<{ asset_label: string }>();
  const [detailsData, setDetailsData] = useState<BinanceIndexAssetRecomBestPreviousDetails | undefined>();
  const [cryptoDetails, setCryptoDetails] = useState<CryptoCurrencyDetailType | undefined>();
  const [selectedPeriod, setSelectedPeriod] = useState<RecommendationDetailSeasonEnum>(RecommendationDetailSeasonEnum.Week);
  const [selectedDropdown, setSelectedDropdown] = useState<string>("buy");
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>("UTC");

  useEffect(() => {
    if (!asset_label) return;
    const getData = async () => {
      try {
        const res = await getBinanceIndexAssetRecomBestPreviousDetail(asset_label);
        setDetailsData(res.data);
        const cryptoRes = await getCryptocurrencyById(asset_label);
        setCryptoDetails(cryptoRes.data);
      } catch (e) {
        console.error("Failed to fetch recommendation details:", e);
        setDetailsData(undefined);
      }
    };
    getData();
  }, [asset_label]);

  return (
    <>
      {detailsData ? (
        <>
          <TitleHeader
            title={`${detailsData.name}`}
            title2={`${detailsData.asset_label}`}
            img={cryptoDetails?.stylized_image ? `${coinURL}/${cryptoDetails.stylized_image}` : ""}
          />
          <div className="container graph-container mt-4">
            {/* Recommendation graph */}
            {asset_label && <RecommendedDetailsPriceGraph1 recommendationsDetail={detailsData} asset_label={asset_label} selectedTimeZone={selectedTimeZone} setSelectedTimezone={setSelectedTimeZone}/>}

            <CollapsibleInfoBox
              title={t("infoBoxRecom.rankingTitle")}
              initialText={t("infoBoxRecom.rankingInitialText")}
              className="mb-5"
            >
              <div className="mt-4">
                <h5 className="info-box-heading">{t("infoBoxRecom.rankDefinitionTitle")}</h5>
                <p className="info-box-text">
                  {t("infoBoxRecom.rankDefinitionText")}
                </p>
                <ul className="info-box-text">
                  <li>
                    <strong>{t("infoBoxRecom.rank1")}</strong> {t("infoBoxRecom.rank1Desc")}
                  </li>
                  <li>
                    <strong>{t("infoBoxRecom.rank168")}</strong> {t("infoBoxRecom.rank168Desc")}
                  </li>
                </ul>

                <hr className="border-light opacity-25 my-4"/>

                <h5 className="info-box-heading">{t("infoBoxRecom.intervalsTitle")}</h5>
                <p className="info-box-text">
                  {t("infoBoxRecom.intervalsText")}
                </p>

                <div className="ms-3">
                  <h6 className="fw-bold mb-2">{t("infoBoxRecom.shortPeriodTitle")}</h6>
                  <p className="info-box-text small">
                    {t("infoBoxRecom.shortPeriodDesc")}
                  </p>

                  <h6 className="fw-bold mb-2">{t("infoBoxRecom.longPeriodTitle")}</h6>
                  <p className="info-box-text small">
                    {t("infoBoxRecom.longPeriodDesc")}
                  </p>
                </div>

                <div className="mt-4 p-3 pb-1 rounded" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <p className="info-box-text m-0 italic">
                    <strong>{t("infoBoxRecom.whyImportant")}</strong><br/>
                    {t("infoBoxRecom.whyImportantDesc")}
                  </p>
                </div>
              </div>
            </CollapsibleInfoBox>

            {asset_label && <BtfdDcaComparison asset_label={asset_label}/>}
          </div>
        </>
      ) : <RecommendationDetailsSkeleton/>}
    </>
  );
};