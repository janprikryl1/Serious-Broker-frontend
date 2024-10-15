import {FC} from "react";
import {useTranslation} from "react-i18next";

export const CoinSettings:FC = () => {
    const { t } = useTranslation();
    
    return (
        <div className="padding-bottom">
            <div className="container">
                <div className="service-details__wrapper">
                    <div className="service-details__item">
                        <div className="service-details__item-inner">
                            <div
                                className="service-details__content"
                                data-aos="fade-up"
                                data-aos-duration="900"
                            >
                                <h2>{t("Coins management")}</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};