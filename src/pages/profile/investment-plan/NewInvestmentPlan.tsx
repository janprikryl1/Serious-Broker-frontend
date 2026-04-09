import {FC} from "react";
import {useTranslation} from "react-i18next";
import {CardContainer} from "../../../components/reusable/CardContainer.tsx";
import {routes} from "../../../utils/constants";
import { Link } from "react-router-dom";
import {InvestmentPlanLayout} from "../../../components/profile/myPortfolio/InvestmentPlanLayout.tsx";
import {NextStepButton} from "../../../components/reusable/NextStepButton.tsx";

export const NewInvestmentPlan: FC = () => {

    const { t } = useTranslation();
    const currentStep = 0;

    return (
        <>
            <InvestmentPlanLayout title="New Investment Plan" currentStep={currentStep} currentStepFinished={false}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "4%"}}>
                    <Link to={routes.profile.newInvestmentPlanExistingPortfolio} style={{ width: "35%"}} >
                        <CardContainer
                            color="var(--secondary-color)"
                            style={{ textAlign: "center", color: "var(--black-color)", paddingTop: "15%", borderRadius: "5px"}}>
                            {t("Choose from Existing Portfolios")}
                        </CardContainer>
                    </Link>
                    <p style={{color: "var(--gray-2-color)", margin: "0px"}}>{t("— or —")}</p>
                    <Link to={routes.profile.newInvestmentPlanNewPortfolio} style={{ width: "35%"}}>
                        <CardContainer
                            color="var(--secondary-color)"
                            style={{ textAlign: "center", color: "var(--black-color)", paddingTop: "15%", borderRadius: "5px"}}>
                            {t("Create New Portfolio")}
                        </CardContainer>
                    </Link>
                </div>
                <NextStepButton currentStep={0} currentStepFinished={true}
                                link={routes.profile.newInvestmentPlanName} variant={"previous"} buttonLabel={t("Name and description")} color={"var(--sandy-color)"} />
            </InvestmentPlanLayout>
        </>
    );
}