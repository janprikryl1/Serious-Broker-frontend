import {FC} from "react";
import {TitleHeader} from "../components/about/TitleHeader.tsx";
import {useTranslation} from "react-i18next";
import vsbLogo from "../utils/icons/footer/vsb.png";
import feiLogo from "../utils/icons/footer/fei.png";
import seriousInvestmentLogo from "../utils/icons/footer/serious_investment.jpeg";
import {WarningOfRisks} from "../components/navbar/WarningOfRisks.tsx";

export const CooperationInfo:FC = () => {
    const {t} = useTranslation();
    
    return (
        <>
            <TitleHeader title="Cooperation"/>
            <div className="container">
                <div className="cta-dark">
                    <h1>{t("Our partners")}</h1>
                    <p>{t("Serious Broker is a project that is being developed with cooperation of students of VŠB-FEI. It focuses on assisting in investing and spreading awareness about cryptocurrencies.")}</p>
                    <p>{t("Serious Broker was implemented in cooperation with the Department of Computer Science.")}</p>
                    <br />
                    <a href="https://www.vsb.cz/cs/" className="mb-25"><img src={vsbLogo} width={80} alt="VSB" className="me-2"/> VŠB-TUO</a>
                    <br />
                    <a href="https://www.fei.vsb.cz/cs/index.html" className="mb-25"><img src={feiLogo} width={80} alt="FEI" className="me-2"/> FEI</a>
                    <br />
                    <a href="https://www.serious-investment.cz/"><img src={seriousInvestmentLogo} width={80} alt="Serious Investment" className="me-2"/> Serious investment, s.r.o.</a>
                    <br />
                    <WarningOfRisks />
                </div>
            </div>
        </>
    )
}