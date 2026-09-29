import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { RecommendationDetailsSkeleton } from "../graphs/RecommendationDetailsSkeleton.tsx";
import { CollapsibleInfoBox } from "../reusable/CollapsibleInfoBox.tsx";
import { AssetDetailType } from "../../utils/types/asset/AssetDetailType.ts";
import { IndexDetailsRecommendationGraph } from "../graphs/IndexDetailsRecommendationGraph.tsx";

type Props = {
  indexDetails: AssetDetailType | null;
};

export const IndexDetailsTab2: FC<Props> = ({ indexDetails }) => {
  const { t } = useTranslation();
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>("UTC");

  return (
    <>
      {indexDetails ? (
        <div className="tw-pt-10">
          <IndexDetailsRecommendationGraph
            indexDetails={indexDetails}
            asset_label={indexDetails.label}
            selectedTimeZone={selectedTimeZone}
            setSelectedTimezone={setSelectedTimeZone}
          />

          <CollapsibleInfoBox
            title={t("infoBoxRecom.rankingTitle")}
            initialText={t("infoBoxRecom.rankingInitialText")}
            className="mb-5"
          >
            <div className="mt-4">
              <h5>{t("infoBoxRecom.rankDefinitionTitle")}</h5>
              <p>{t("infoBoxRecom.rankDefinitionText")}</p>
              <ul>
                <li>
                  <strong>{t("infoBoxRecom.rank1")}</strong>{" "}
                  {t("infoBoxRecom.rank1Desc")}
                </li>
                <li>
                  <strong>{t("infoBoxRecom.rank168")}</strong>{" "}
                  {t("infoBoxRecom.rank168Desc")}
                </li>
              </ul>

              <hr className="border-light opacity-25 my-4" />

              <h5>{t("infoBoxRecom.intervalsTitle")}</h5>
              <p>{t("infoBoxRecom.intervalsText")}</p>

              <div className="ms-3">
                <h6 className="fw-bold mb-2">
                  {t("infoBoxRecom.shortPeriodTitle")}
                </h6>
                <p className="small">{t("infoBoxRecom.shortPeriodDesc")}</p>

                <h6 className="fw-bold mb-2">
                  {t("infoBoxRecom.longPeriodTitle")}
                </h6>
                <p className="small">{t("infoBoxRecom.longPeriodDesc")}</p>
              </div>

              <div
                className="mt-4 p-3 pb-3 rounded"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <p className="m-0 italic">
                  <strong>{t("infoBoxRecom.whyImportant")}</strong>
                  <br />
                  {t("infoBoxRecom.whyImportantDesc")}
                </p>
              </div>
            </div>
          </CollapsibleInfoBox>
        </div>
      ) : (
        <RecommendationDetailsSkeleton />
      )}
    </>
  );
};