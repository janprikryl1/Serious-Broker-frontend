import {FC} from "react";
import {useTranslation} from "react-i18next";
import {InvestmentTopicsLink} from "./InvestmentTopicsLink.tsx";
import {indexLinks} from "../../utils/constants/indexIcons.tsx";

export const NewToInvesting:FC = () => {
    const {t} = useTranslation();
    
    return (
        <div className="cta-dark">
            <h2 className="index-title">{t("New to Investing?")}</h2>
            <p>{t("Start with the basics")}</p>
            <div className="row">
                {indexLinks.map((link) => (
                    <InvestmentTopicsLink key={link.title} link={link.link} title={link.title} icon={link.icon} />
                ))}
            </div>
        </div>
    );
}