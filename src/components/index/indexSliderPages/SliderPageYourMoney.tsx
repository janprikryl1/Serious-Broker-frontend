import {FC} from "react";
import {useTranslation} from "react-i18next";
import {SharedSlideLayout} from "./SharedSlideLayout.tsx";
import YourMoneyYourRulesIcon from "../../../utils/icons/index/your_money_your_rules.webp";
import {Button} from "../../reusable/Button.tsx";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";

export const SliderPageYourMoney:FC = () => {
    const { t } = useTranslation();

    return (
        <SharedSlideLayout
            imageUrl={YourMoneyYourRulesIcon}
            backgroundSize={"38%"}
            backgroundPosition={"10% 35%"}
        >
            <div className="container">
                <h1 className="slide-title" style={{marginLeft:"-25vw"}}>{t("Your Money,")}</h1>
                <p className="slide-tagline" style={{marginLeft:"15vw"}}>
                    {t("Your Rules")}
                </p>
                <p className="slide-tagline">
                    <Button><Link to={routes.articles}>{t("Learn Now")}</Link></Button>
                </p>
            </div>
        </SharedSlideLayout>
    );
}