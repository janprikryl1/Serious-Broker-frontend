import {FC} from "react";
import {useTranslation} from "react-i18next";
import YourMoneyYourRulesIcon from "../../../utils/icons/index/your_money_your_rules.webp";
import {Button} from "../../reusable/Button.tsx";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";

export const IndexMobileSliderYourMoney:FC = () => {
    const { t } = useTranslation();

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '100vh' }}>
            <img src={YourMoneyYourRulesIcon} alt="5 minutes" loading="lazy" style={{ width: "300px" }} />
            <h1 className="mt-4">{t("Your Money,")}</h1>
            <p>{t("Your Rules")}</p>
            <div className="mt-5">
                <Button>
                    <Link to={routes.articles} className="text-decoration-none text-dark">
                        {t("Learn Now")}
                    </Link>
                </Button>
            </div>
        </div>
    );
}