import React from "react";
import {useTranslation} from "react-i18next";
import {CardContainer} from "../../../components/reusable/CardContainer.tsx";
import {routes} from "../../../utils/constants";
import {TitleHeader} from "../../../components/about/TitleHeader.tsx";
import {OutlineContainer} from "../../../components/reusable/OutlineContainer.tsx";
import {Button} from "../../../components/reusable/Button.tsx";
import {useMediaQuery} from "@mui/material";
import {GlassCard} from "../../../components/reusable/GlassCard.tsx";

export const NewInvestmentPlanIntro = () => {

  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const content = (
    <div className="tw-w-full">
      <p className={`${isMobile ? "tw-mt-4 tw-text-sm sm:tw-text-base" : "tw-mt-5 tw-text-base"}`}>
        {t("Create your investment plan in 4 simple steps.")}
      </p>

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 2xl:tw-grid-cols-4 tw-gap-4 tw-mt-10 tw-mb-5 tw-items-stretch">
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
          <div className="tw-flex tw-w-full tw-h-full" key={step.id}>
            <GlassCard
              bgColor="var(--true-black)"
              opacity={0.2}
              className="step-card tw-w-full tw-h-full !tw-min-h-[110px] md:!tw-min-h-[170px] xl:!tw-min-h-[200px] !tw-px-3 !tw-py-6 !tw-mx-0 sm:!tw-p-10"
            >
              <div className="step-number-bg">{step.id}</div>
              <div className="glass-layer"></div>

              <div className="step-content tw-h-full tw-flex tw-flex-col tw-justify-center">
                <div className="step-title tw-text-[clamp(1.05rem,0.85rem+0.6vw,1.35rem)] tw-mt-0">
                  {step.title}
                </div>
                <p className="tw-mb-0 tw-text-[var(--gray-2-color)] tw-text-xs sm:tw-text-sm">
                  {step.desc}
                </p>
              </div>
            </GlassCard>
          </div>
        ))}
      </div>

      <div className="tw-flex tw-justify-center tw-mt-10">
        <Button className="tw-mt-4 tw-px-8" type={"link"} to={routes.profile.newInvestmentPlanName}>
          {t('Begin')}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <TitleHeader title={t("New Investment Plan")}/>
      <div className={"container"}>
        {isMobile ? content : <OutlineContainer className="m-0">{content}</OutlineContainer>}
      </div>
    </>
  );
}