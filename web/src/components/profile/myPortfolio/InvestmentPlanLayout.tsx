import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {TitleHeader} from "../../about/TitleHeader.tsx";
import {OutlineContainer} from "../../reusable/OutlineContainer.tsx";
import {Stepper} from "../../reusable/Stepper.tsx";
import {INVESTMENT_PLAN_STEPS} from '../../../utils/constants/investmentPlanStepsConfig.ts';
import {useMediaQuery} from "@mui/material";

type Props = {
  children: ReactNode;
  currentStep: number;
  title: string;
  currentStepFinished: boolean;
};

export const InvestmentPlanLayout: FC<Props> = ({children, currentStep, title, currentStepFinished}) => {

  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <>
      <TitleHeader title={t(title)}/>
      <div className={"container"}>
        {isMobile ? (
          <div className="choose-existing-portfolio__table-wrapper">
            <Stepper steps={INVESTMENT_PLAN_STEPS} currentStep={currentStep}></Stepper>
            {children}
          </div>
        ) : (
          <OutlineContainer style={{margin: 0}} className={"choose-existing-portfolio__table-wrapper"}>
            <Stepper steps={INVESTMENT_PLAN_STEPS} currentStep={currentStep}></Stepper>
            {children}
          </OutlineContainer>
        )}
      </div>
    </>
  );
}