import React from "react";
import { useTranslation } from "react-i18next";
import { InvestmentPlanLayout } from "../../../components/profile/myPortfolio/InvestmentPlanLayout.tsx";
import { CardContainer } from "../../../components/reusable/CardContainer.tsx";
import { Form } from "react-bootstrap";
import { NextStepButton } from "../../../components/reusable/NextStepButton.tsx";
import { routes } from "../../../utils/constants";
import { useInvestmentPlanContext } from "../../../utils/providers/InvestmentPlanProvider.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";

enum Currency {
  CZK = "CZK",
  EUR = "EUR",
  USD = "USD"
}

export const InvestedAmount = () => {
  const { t } = useTranslation();
  const currentStep = 2;

  const isMobile = useMediaQuery('(max-width: 576px)');

  const {
    investmentAmount: selectedAmount,
    setInvestmentAmount: setSelectedAmount,
    currency: selectedCurrency,
    setCurrency: setSelectedCurrency
  } = useInvestmentPlanContext();

  const renderContent = () => (
    <div className="d-flex flex-column align-items-start gap-3">
            <span className="gray-3-color-text mb-1 mb-sm-3 tw-text-sm sm:tw-text-base">
                {t("How much do you want to invest each time?")}
            </span>

      <div className={`d-flex ${isMobile ? "flex-column" : "flex-row"} align-items-stretch align-items-sm-center gap-3 w-100`}>
        <div style={{ width: isMobile ? "100%" : "150px" }}>
          <input
            type="number"
            min={1}
            className="outline-input w-100"
            value={selectedAmount ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setSelectedAmount(null);
                return;
              }
              const num = parseInt(val, 10);
              if (!isNaN(num) && num >= 0) {
                setSelectedAmount(num);
              }
            }}
            onBlur={() => { if (selectedAmount != null && selectedAmount <= 0) setSelectedAmount(1) }}
            style={{ textAlign: "start" }}
          />
        </div>

        <Form.Select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
          aria-label={t("Select currency")}
          className="select-box-outline"
          style={{ width: isMobile ? "100%" : "90px" }}
        >
          <option value={Currency.EUR}>EUR</option>
          <option value={Currency.CZK}>CZK</option>
          <option value={Currency.USD}>USD</option>
        </Form.Select>
      </div>
    </div>
  );

  return (
    <InvestmentPlanLayout title="New Investment Plan" currentStep={currentStep} currentStepFinished={selectedAmount != null && selectedAmount > 0}>
      <h5 className="tw-text-base sm:tw-text-lg" style={{ marginBottom: isMobile ? "20px" : "-15px" }}>{t("Invested Amount")}</h5>

      <div className="tw-my-10">
        {renderContent()}
      </div>

      <div className={`d-flex ${isMobile ? "flex-column" : "flex-row gap-3"} justify-content-between mt-4`}>
        <NextStepButton
          currentStep={currentStep}
          currentStepFinished={selectedAmount != null && selectedAmount > 0}
          link={routes.profile.newInvestmentPlanRecurringInvestment}
          variant={"previous"}
          color={"var(--sandy-color)"}
        />
        <NextStepButton
          currentStep={currentStep}
          currentStepFinished={selectedAmount != null && selectedAmount > 0}
          link={routes.profile.newInvestmentPlanTrafficLights}
        />
      </div>
    </InvestmentPlanLayout>
  );
};