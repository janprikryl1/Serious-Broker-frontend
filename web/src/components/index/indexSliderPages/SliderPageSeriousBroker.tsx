import { FC } from "react";
import { SharedSlideLayout } from "./SharedSlideLayout";
import Logo from "../../../utils/icons/index/252502-S.B-homepage-typek.png";
import { useTranslation } from "react-i18next";
import {Button} from "../../reusable/Button.tsx";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";

export const SliderPageSeriousBroker: FC = () => {
    const { t } = useTranslation();

    return (
        <SharedSlideLayout imageUrl={Logo} backgroundSize={"contain"} backgroundPosition={"90% bottom"}>
            <div>
                <h3 className="slide-title-your-money-your-rules">{t("Your Money,") + t("Your Rules")}</h3>
                <p className="slide-description-your-money-your-rules">{t("Savings in crypto.")}</p>
                <p className="slide-description-your-money-your-rules">
                    <Button className="mb-5 mt-4" type="link" to={routes.about}>{t("Why to save crypto with Serious.Broker")}</Button>
                </p>
            </div>
        </SharedSlideLayout>
    );
};