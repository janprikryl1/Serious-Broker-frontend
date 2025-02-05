import {FC} from "react";
import {useTranslation} from "react-i18next";
import {routes} from "../../../utils/constants";
import {Button, ButtonColor} from "../../Button.tsx";

export const SignUpBanner:FC = () => {
    const {t} = useTranslation();
    
    return (
        <section className="cta-signup padding-top padding-bottom bg-color">
            <div className="cta__wrapper text-center">
                <p className="mb-4">{t("Sign up for free and unlock the full potential")}</p>
                <Button className="trk-btn trk-btn--secondary2 mt-3" type="link" to={routes.register} color={ButtonColor.white}>
                    {t("Register")}
                </Button>
            </div>
        </section>
    )
}