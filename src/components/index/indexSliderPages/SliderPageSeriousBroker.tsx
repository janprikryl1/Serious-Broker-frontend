import { FC } from "react";
import { SharedSlideLayout } from "./SharedSlideLayout";
import Logo from "../../../utils/icons/index/vectorized_with_yellow_coins.svg";
import { useTranslation } from "react-i18next";
import {Button} from "../../reusable/Button.tsx";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";

export const SliderPageSeriousBroker: FC = () => {
    const { t } = useTranslation();

    return (
        <SharedSlideLayout imageUrl={Logo} backgroundSize={"45% 140%"} backgroundPosition={"100% 40%"}>
            <div>
                <h3 className="slide-title-your-money-your-rules">{t("Your Money,") + t("Your Rules")}</h3>
                <p className="slide-description-your-money-your-rules">{t("Savings in crypto.")}</p>
                <p className="slide-description-your-money-your-rules">
                    <Link to={routes.about}>
                        <Button style={{fontWeight:700, fontSize:"1.2rem"}}>{t("Proč s námi spořit do krypta")}</Button>
                    </Link>
                </p>
            </div>
        </SharedSlideLayout>
    );
};