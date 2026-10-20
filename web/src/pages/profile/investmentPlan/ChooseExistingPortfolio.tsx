import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { InvestmentPlanLayout } from "../../../components/profile/myPortfolio/InvestmentPlanLayout.tsx";
import { NextStepButton } from "../../../components/reusable/NextStepButton.tsx";
import { useInvestmentPlanContext } from "../../../utils/providers/InvestmentPlanProvider.tsx";
import { routes } from "../../../utils/constants";
import { AssetType } from "../../../utils/types/asset/AssetType.ts";
import { ExistingPortfoliosTable } from "../../../components/profile/investmentPlan/ExistingPortfoliosTable.tsx";
import "../../../styles/sass/components/assets.scss";
import "../../../styles/sass/components/overview.scss";

export const ChooseExistingPortfolio: FC = () => {
  const { t } = useTranslation();
  const currentStep = 0;
  const isMobile = useMediaQuery("(max-width: 576px)");

  const {
    isCustomPortfolio,
    setIsCustomPortfolio,
    userPortfolioId,
    setUserPortfolioId,
    binanceAssetId,
    setBinanceAssetId
  } = useInvestmentPlanContext();

  const selectedRowId = isCustomPortfolio ? userPortfolioId : binanceAssetId;

  const handleSelectAsset = (asset: AssetType) => {
    if (selectedRowId === asset.id) {
      setIsCustomPortfolio(false);
      setUserPortfolioId(null);
      setBinanceAssetId(null);
    } else {
      setIsCustomPortfolio(false);
      setBinanceAssetId(asset.id);
      setUserPortfolioId(null);
    }
  };

  return (
    <InvestmentPlanLayout
      title="New Investment Plan"
      currentStep={currentStep}
      currentStepFinished={selectedRowId != null}
    >
      <h5 className="tw-mb-0 tw-pb-0 tw-text-base sm:tw-text-lg">
        {t("Choose from Existing Portfolios")}
      </h5>
      <Link
        to={routes.profile.newInvestmentPlanNewPortfolio}
        className="link-underline tw-text-xs sm:tw-text-sm"
      >
        {t("Create new portfolio instead")}
      </Link>

      {/* Znovupoužiteľná tabuľka: vyhľadávanie, filtre, desktop AssetTable aj mobilný Accordion */}
      <ExistingPortfoliosTable
        selectedAssetId={selectedRowId}
        onSelectAsset={handleSelectAsset}
        showDetailGraph={true}
      />

      <div
        className={`tw-mt-4 tw-flex tw-justify-between ${
          isMobile ? "tw-flex-col tw-gap-3" : "tw-flex-row tw-gap-3"
        }`}
      >
        <NextStepButton
          currentStep={currentStep}
          currentStepFinished={selectedRowId != null}
          link={routes.profile.newInvestmentPlan}
          variant="previous"
          buttonLabel={t("Select existing or new")}
          color="transparent"
        />
        <NextStepButton
          currentStep={currentStep}
          currentStepFinished={selectedRowId != null}
          link={routes.profile.newInvestmentPlanRecurringInvestment}
        />
      </div>
    </InvestmentPlanLayout>
  );
};