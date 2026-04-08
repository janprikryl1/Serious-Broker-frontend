import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {TitleHeader} from "../../about/TitleHeader.tsx";
import {OutlineContainer} from "../../reusable/OutlineContainer.tsx";
import {Stepper} from "../../reusable/Stepper.tsx";
import {INVESTMENT_PLAN_STEPS} from '../../../utils/constants/investmentPlanStepsConfig.ts';
import {Button} from "../../reusable/Button.tsx";
import {IoIosArrowForward} from "react-icons/io";

type Props = {
  children: ReactNode;
  currentStep: number;
  title: string;
  currentStepFinished: boolean;
};

export const InvestmentPlanLayout: FC<Props> = ({children, currentStep, title, currentStepFinished}) => {

  const {t} = useTranslation();

  return (
    <>
      <TitleHeader title={t(title)}/>
      <div className={"container"}>
        <OutlineContainer style={{margin: 0}}>
          <Stepper steps={INVESTMENT_PLAN_STEPS} currentStep={currentStep}></Stepper>
          {children}
        </OutlineContainer>
      </div>
    </>
  );
}