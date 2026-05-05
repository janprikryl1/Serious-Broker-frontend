import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CardContainer } from '../../../components/reusable/CardContainer.tsx';
import { NextStepButton } from '../../../components/reusable/NextStepButton.tsx';
import { InvestmentPlanLayout } from '../../../components/profile/myPortfolio/InvestmentPlanLayout.tsx';
import { routes } from '../../../utils/constants';

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
          <CardContainer
            className="investment-plan-choice__card"
            color="var(--secondary-color)"
          >
            {t('Choose from Existing Portfolios')}
          </CardContainer>
        </Link>

        <p className="investment-plan-choice__separator">{t('— or —')}</p>

        <Link
          to={routes.profile.newInvestmentPlanNewPortfolio}
          className="investment-plan-choice__link"
        >
          <CardContainer
            className="investment-plan-choice__card"
            color="var(--secondary-color)"
          >
            {t('Create New Portfolio')}
          </CardContainer>
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
