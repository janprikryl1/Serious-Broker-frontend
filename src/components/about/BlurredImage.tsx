import {FC} from "react";
import CountUp from "react-countup";
import {useTranslation} from "react-i18next";

type Props = {
    imageSrc: string;
    altText: string;
};

export const BlurredImage:FC<Props> = ({ imageSrc, altText }) => {
    const {t} = useTranslation();
    
    return (
        <div className="about__thumb-image">
            <img src={imageSrc} alt={altText} className="about__thumb-image__bg" />
            <div className="floating-content__top-left">
                <div className="floating-content__item">
                    <h4>
                        <span className="purecounter">
                          <CountUp end={10} duration={10} />
                        </span>{"+ "}{t("Years")}
                    </h4>
                    <p>{t("Experience")}</p>
                </div>
            </div>
            <div className="floating-content__bottom-right">
                <div className="floating-content__item">
                    <h4>
                        <span className="purecounter">
                          <CountUp end={30} duration={5} />
                        </span>
                        K+
                    </h4>
                    <p>{t("Currencies")}</p>
                </div>
            </div>
        </div>
    );
};