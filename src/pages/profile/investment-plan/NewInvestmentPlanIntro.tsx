import React from "react";
import {useTranslation} from "react-i18next";
import {CardContainer} from "../../../components/reusable/CardContainer.tsx";
import {routes} from "../../../utils/constants";
import {TitleHeader} from "../../../components/about/TitleHeader.tsx";
import {OutlineContainer} from "../../../components/reusable/OutlineContainer.tsx";
import {Button} from "../../../components/reusable/Button.tsx";

export const NewInvestmentPlanIntro = () => {

  const {t} = useTranslation();

  return (
    <>
      <TitleHeader title={t("New Investment Plan")}/>
      <div className={"container"}>
        <OutlineContainer>
          <div className="investment-plan-intro">
            <h3 className="mt-5 investment-plan-intro__title">{t("Create Investment Plan in Four steps")}</h3>

            <div className="row g-4 mb-5 investment-plan-intro__grid">
              {[
                {
                  id: 1,
                  title: t("Portfolio"),
                  desc: t("Choose or create a new portfolio for your strategy."),
                },
                {
                  id: 2,
                  title: t("Recurring Investment"),
                  desc: t("Set up how often you want to invest automatically."),
                },
                {
                  id: 3,
                  title: t("Invested Amount"),
                  desc: t("Decide on the sum you want to put into work each time."),
                },
                {
                  id: 4,
                  title: t("Market Traffic Lights"),
                  desc: t("Configure your risk signals and automated exits."),
                }
              ].map((step) => (
                <div className="col-12 col-md-6 col-xxl-3 investment-plan-intro__grid-item" key={step.id}>
                  <CardContainer
                    animate={false}
                    className="step-card p-3 investment-plan-intro__card"
                  >
                    <div className="step-number-bg">{step.id}</div>
                    <div className="glass-layer"></div>

                    <div className="step-content investment-plan-intro__step-content">
                      <div className="step-title investment-plan-intro__step-title">
                        {step.title}
                      </div>
                      <p className="investment-plan-intro__step-description">
                        {step.desc}
                      </p>
                    </div>
                  </CardContainer>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center investment-plan-intro__actions">
              <Button className="mt-4 investment-plan-intro__button" type={"link"} to={routes.profile.newInvestmentPlanName}>
                {t("Begin")}
              </Button>
            </div>
          </div>
        </OutlineContainer>
      </div>
    </>
  );
}