import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CardContainer } from '../../../components/reusable/CardContainer.tsx';
import { NextStepButton } from '../../../components/reusable/NextStepButton.tsx';
import { InvestmentPlanLayout } from '../../../components/profile/myPortfolio/InvestmentPlanLayout.tsx';
import { routes } from '../../../utils/constants';
import {GlassCard} from "../../../components/reusable/GlassCard.tsx";
import { FiArrowRightCircle } from "react-icons/fi";

export const NewInvestmentPlan = () => {
  const { t } = useTranslation();
  const currentStep = 0;

  return (
    <InvestmentPlanLayout
      title="New Investment Plan"
      currentStep={currentStep}
      currentStepFinished={false}
    >
      <div className="investment-plan-choice">
        <Link
          to={routes.profile.newInvestmentPlanExistingPortfolio}
          className="investment-plan-choice__link"
        >
          <GlassCard
            className="investment-plan-choice__card tw-group tw-cursor-pointer !tw-transition-all !tw-duration-500 tw-ease-[cubic-bezier(0.16,1,0.3,1)] hover:tw-scale-[1.02] hover:-tw-translate-y-1.5 hover:tw-shadow-[0_12px_30px_-8px_rgba(212,175,55,0.3)] active:tw-scale-[0.99] active:tw-translate-y-0"
            bgColor="var(--secondary-color)"
            opacity={0.3}
          >
            <div className="tw-flex tw-items-center tw-justify-center tw-w-full tw-gap-3">
              <span className="tw-text-base sm:tw-text-lg">
                {t('Choose from Existing Portfolios')}
              </span>
              <FiArrowRightCircle className="tw-text-2xl sm:tw-text-3xl tw-shrink-0" />
            </div>
          </GlassCard>
        </Link>

        <p className="investment-plan-choice__separator tw-text-sm sm:tw-text-base">{t('— or —')}</p>

        <Link
          to={routes.profile.newInvestmentPlanNewPortfolio}
          className="investment-plan-choice__link"
        >
          <GlassCard
            className="investment-plan-choice__card tw-group tw-cursor-pointer !tw-transition-all !tw-duration-500 tw-ease-[cubic-bezier(0.16,1,0.3,1)] hover:tw-scale-[1.02] hover:-tw-translate-y-1.5 hover:tw-shadow-[0_12px_30px_-8px_rgba(212,175,55,0.3)] active:tw-scale-[0.99] active:tw-translate-y-0"
            bgColor="var(--secondary-color)"
            opacity={0.3}
          >
            <div className="tw-flex tw-items-center tw-justify-center tw-w-full tw-gap-3">
              <span className="tw-text-base sm:tw-text-lg">
                {t('Create New Portfolio')}
              </span>
              <FiArrowRightCircle className="tw-text-2xl sm:tw-text-3xl tw-shrink-0" />
            </div>
          </GlassCard>
        </Link>
      </div>

      <NextStepButton
        currentStep={0}
        currentStepFinished={true}
        link={routes.profile.newInvestmentPlanName}
        variant="previous"
        buttonLabel={t('Name and description')}
        color="var(--sandy-color)"
      />
    </InvestmentPlanLayout>
  );
};
