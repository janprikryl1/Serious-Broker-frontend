import {FC, useState} from "react";
import {useParams} from "react-router-dom";
import {BinanceIndexAssetRecomBestPreviousDetails} from "../../utils/types/graphs/BinanceIndexAssetRecomBestPreviousDetails.ts";
import {useTranslation} from "react-i18next";
import {RecommendationDetailsSkeleton} from "../../components/graphs/RecommendationDetailsSkeleton.tsx";
import {CryptoDetailsRecommendationGraph} from "../graphs/CryptoDetailsRecommendationGraph.tsx";
import {CryptoCurrencyDetailType} from "../../utils/types/asset/CryptoCurrencyType.ts";
import {CollapsibleInfoBox} from "../../components/reusable/CollapsibleInfoBox.tsx";

export enum Day {
  Sunday = 1,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

type Props = {
  detailsData: BinanceIndexAssetRecomBestPreviousDetails | undefined,
  cryptoDetails: CryptoCurrencyDetailType | undefined
}

// Recommendations tab
export const CryptoDetailsTab1: FC<Props> = ({ detailsData, cryptoDetails }) => {
  const {t} = useTranslation();
  const {asset_label} = useParams<{ asset_label: string }>();
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>("UTC");

  return (
    <>
      {detailsData ? (
        <>
          <div className="tw-pt-10">

            {asset_label && <CryptoDetailsRecommendationGraph recommendationsDetail={detailsData} asset_label={asset_label} selectedTimeZone={selectedTimeZone} setSelectedTimezone={setSelectedTimeZone}/>}

            <CollapsibleInfoBox
              title={t("infoBoxRecom.rankingTitle")}
              initialText={t("infoBoxRecom.rankingInitialText")}
              className="mb-5"
            >
              <div className="mt-4">
                <h5>{t("infoBoxRecom.rankDefinitionTitle")}</h5>
                <p>
                  {t("infoBoxRecom.rankDefinitionText")}
                </p>
                <ul>
                  <li>
                    <strong>{t("infoBoxRecom.rank1")}</strong> {t("infoBoxRecom.rank1Desc")}
                  </li>
                  <li>
                    <strong>{t("infoBoxRecom.rank168")}</strong> {t("infoBoxRecom.rank168Desc")}
                  </li>
                </ul>

                <hr className="border-light opacity-25 my-4"/>

                <h5>{t("infoBoxRecom.intervalsTitle")}</h5>
                <p>
                  {t("infoBoxRecom.intervalsText")}
                </p>

                <div className="ms-3">
                  <h6 className="fw-bold mb-2">{t("infoBoxRecom.shortPeriodTitle")}</h6>
                  <p className="small">
                    {t("infoBoxRecom.shortPeriodDesc")}
                  </p>

                  <h6 className="fw-bold mb-2">{t("infoBoxRecom.longPeriodTitle")}</h6>
                  <p className="small">
                    {t("infoBoxRecom.longPeriodDesc")}
                  </p>
                </div>

                <div className="mt-4 p-3 pb-3 rounded" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <p className="m-0 italic">
                    <strong>{t("infoBoxRecom.whyImportant")}</strong><br/>
                    {t("infoBoxRecom.whyImportantDesc")}
                  </p>
                </div>
              </div>
            </CollapsibleInfoBox>
          </div>
        </>
      ) : <RecommendationDetailsSkeleton/>}
    </>
  );
};