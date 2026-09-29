import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Assets } from "../../../utils/types/asset/AssetDetailType.ts";
import { getAssetGraphPreviewDate } from "../../../utils/api/assetGraphPreviewService.ts";
import { coinURL, routes } from "../../../utils/constants";
import { OverviewTableChart } from "../../overview/overviewTableData/overviewTableChart/OverviewTableChart.tsx";
import "../../../styles/sass/components/asset_graph.scss";
import { GlassCard } from "../../reusable/GlassCard.tsx";

type Props = {
    singleAsset: Assets;
};

export const AssetGraphCurrencyCard: FC<Props> = ({ singleAsset }) => {
    const { t } = useTranslation();
    const [coinGraphData, setCoinGraphData] = useState<number[] | "">();

    useEffect(() => {
        let isMounted = true;
        const fetchGraphPreviewData = async () => {
            try {
                const response = await getAssetGraphPreviewDate(singleAsset.asset_label);
                if (isMounted) setCoinGraphData(response.data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchGraphPreviewData();
        return () => {
            isMounted = false;
        };
    }, [singleAsset.asset_label]);

    const displayName = singleAsset.name?.trim() ? singleAsset.name : singleAsset.asset_label;

    return (
      <Link
        to={`${routes.graphsRecommendationDetailURL}${encodeURIComponent(singleAsset.asset_label)}`}
        className="link-underline-none asset-graph-currency-card-link tw-block tw-w-full"
      >
          <div className="tw-max-w-[600px]">
          <GlassCard bgColor="var(--secondary-color)" opacity={0.2}>
              <div className="tw-grid tw-grid-cols-[auto_minmax(max-content,1fr)_auto_70px] tw-items-center tw-gap-2 sm:tw-gap-3.5 tw-px-3 tw-py-2.5 sm:tw-px-4 sm:tw-py-3 tw-w-full tw-text-white tw-overflow-hidden">

                  <div className="tw-flex tw-h-10 tw-w-10 sm:tw-h-11 sm:tw-w-11 tw-shrink-0 tw-items-center tw-justify-center tw-overflow-clip tw-rounded-full tw-border tw-border-solid tw-border-primary tw-bg-white">
                      {singleAsset.photo ? (
                        <img
                          src={`${coinURL}${singleAsset.photo}`}
                          alt={singleAsset.asset_label}
                          className="tw-w-full tw-h-full tw-object-contain"
                        />
                      ) : (
                        <div className="tw-w-full tw-h-full tw-bg-secondary tw-rounded-full" />
                      )}
                  </div>

                  <div className="tw-flex tw-min-w-0 tw-flex-col tw-justify-center">
              <span className="tw-font-bold tw-text-xs sm:tw-text-sm md:tw-text-base tw-tracking-wide tw-text-white">
                {displayName}
              </span>
                      {/*<span className="tw-text-[10px] sm:tw-text-xs tw-text-gray-400 tw-uppercase">*/}
                {/*{singleAsset.asset_label}*/}
              {/*</span>*/}
                  </div>

                  <div className="tw-flex tw-flex-col tw-items-end tw-justify-center tw-shrink-0 tw-pl-1">
              <span className="tw-whitespace-nowrap tw-font-bold tw-text-xs sm:tw-text-sm md:tw-text-base">
                {(singleAsset.allocation * 100).toFixed(2)} %
              </span>
                      <span className="tw-text-[10px] sm:tw-text-xs tw-text-gray-400 tw-whitespace-nowrap">
                {t("Contribution")}
              </span>
                      {singleAsset.status === false && (
                        <span className="tw-text-[9px] tw-text-yellow-400 tw-italic">
                  {t("Not counted")}
                </span>
                      )}
                  </div>

                  <div className="tw-flex tw-w-[70px] tw-h-[40px] tw-shrink-0 tw-items-center tw-justify-center tw-overflow-hidden">
                      {coinGraphData === "" ? (
                        <div className="color-container--red">
                  <span className="!tw-text-red tw-text-[9px] sm:tw-text-[10px] tw-text-center tw-leading-tight tw-block">
                    {t("Not traded")}
                  </span>
                        </div>
                      ) : coinGraphData ? (
                        <OverviewTableChart
                          name={singleAsset.asset_label}
                          data={coinGraphData}
                          width={68}
                        />
                      ) : (
                        <Skeleton width={60} height={32}/>
                      )}
                  </div>

              </div>
          </GlassCard>
          </div>
      </Link>
    );
};