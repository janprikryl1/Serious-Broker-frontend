import {FC} from "react";
import HourglassFiveMinutesIcon from "../../utils/icons/index/hourglass_enhanced_no_bg2_darker.webp";
import {SharedSlideLayout} from "./indexSliderPages/SharedSlideLayout.tsx";
import {Link} from "react-router-dom";
import {routes} from "../../utils/constants";
import {Button} from "../reusable/Button.tsx";
import {useTranslation} from "react-i18next";

export const SliderPage5Minutes:FC = () => {
    const { t } = useTranslation();
    
    return (
        <SharedSlideLayout
            imageUrl={HourglassFiveMinutesIcon}
            backgroundSize={"30%"}
            backgroundPosition={"5% 0%"}
        >
            <div className="container">
                <h1 className="slide-title">{t("5 minutes")}</h1>
                <p className="slide-tagline" style={{marginLeft:"10vw"}}>
                    {t("To Make You Understand Crypto")}
                </p>
                <p className="slide-tagline">
                    <Button><Link to={routes.articleURL + 24}>{t("Learn Now")}</Link></Button>
                </p>
            </div>
        </SharedSlideLayout>
);
}