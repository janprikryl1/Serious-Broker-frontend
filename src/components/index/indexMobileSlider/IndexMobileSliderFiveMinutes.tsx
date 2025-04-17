import {FC} from "react";
import {Button} from "../../reusable/Button.tsx";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";
import {useTranslation} from "react-i18next";
import HourglassFiveMinutesIcon from "../../../utils/icons/index/hourglass_enhanced_no_bg2_darker.webp";

export const IndexMobileSliderFiveMinutes: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '100vh' }}>
            <img src={HourglassFiveMinutesIcon} alt="5 minutes" loading="lazy" style={{ width: "200px" }} />
            <h1 className="mt-4">{t("5 minutes")}</h1>
            <p>{t("To Make You Understand Crypto")}</p>
            <div className="mt-5">
                <Button>
                    <Link to={routes.articleURL + 24} className="text-decoration-none text-dark">
                        {t("Learn Now")}
                    </Link>
                </Button>
            </div>
        </div>
    );
}
