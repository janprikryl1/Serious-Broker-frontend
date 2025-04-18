import {FC} from "react";
import {useTranslation} from "react-i18next";
import personal1 from "../../utils/icons/guides/personal_1.webp";
import personal2 from "../../utils/icons/guides/personal2.webp";
import personal3 from "../../utils/icons/guides/personal_achievment.webp";

export const PersonalStrategyWhyToJoin: FC = () => {
    const {t} = useTranslation();

    return (
        <div className="mt-5">
            <h2 className="mb-4 text-center">{t("Why Join?")}</h2>
            <div className="row align-items-center mb-5 gx-0">
                <div className="col-12 col-md-2 text-center mb-3 mb-md-0 px-2">
                    <img src={personal1} alt={t("Knowledge that counts")} className="img-fluid"
                         style={{maxWidth: '100px'}}/>
                </div>
                <div className="col-12 col-md-10 px-2">
                    <h5><b>{t("Knowledge that counts")}</b></h5>
                    <p>
                        {t("We regularly publish articles and expert analyses to help you understand the complex world of finance and make better investment decisions.")}
                    </p>
                </div>
            </div>
            <div className="row align-items-center mb-5 flex-md-row-reverse gx-0">
                <div className="col-12 col-md-2 text-center mb-3 mb-md-0 px-2">
                    <img src={personal2} alt={t("Education that entertains")} className="img-fluid"
                         style={{maxWidth: '100px'}}/>
                </div>
                <div className="col-12 col-md-10 text-md-end px-2">
                    <h5><b>{t("Education that entertains")}</b></h5>
                    <p>
                        {t("Our unique platform guides you through the world of investments from basics to advanced techniques. Motivate yourself by collecting achievements and develop your skills at your own pace.")}
                    </p>
                </div>
            </div>
            <div className="row align-items-center mb-5 gx-0">
                <div className="col-12 col-md-2 text-center mb-3 mb-md-0 px-2">
                    <img src={personal3} alt={t("Data for your success")} className="img-fluid"
                         style={{maxWidth: '100px'}}/>
                </div>
                <div className="col-12 col-md-10 px-2">
                    <h5><b>{t("Data for your success")}</b></h5>
                    <p>
                        {t("In our analytical section, you will find detailed insights into individual assets, market data, and tools that will make it easier for you to choose the right investments for your portfolio.")}
                    </p>
                </div>
            </div>
        </div>
    );
}