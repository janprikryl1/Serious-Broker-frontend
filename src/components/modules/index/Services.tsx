import {FC} from "react";
import {useTranslation} from "react-i18next";
import {offeringData} from "../../../utils/constants/offeringData.ts";

export const Services: FC = () => {
    const {t} = useTranslation();
    
    return (
      <section className="service padding-top padding-bottom">
        <div className="section-header section-header--max50">
            <h2 className="mb-15 mt-minus-5">
                {t("What we ")}<span>{t("offer")}</span>
            </h2>
        </div>
        <div className="container">
          <div className="service__wrapper">
            <div className="row g-4 align-items-center">
              {offeringData.map((service, index) => (
                  <div className="col-sm-6 col-md-6 col-lg-4" key={index}>
                    <div
                        className="service__item service__item--style1"
                        data-aos="fade-up"
                        data-aos-duration={service.animationDuration}
                    >
                      <div className="service__item-inner text-center">
                        <div className="service-content">
                          <h5 className="mb-15">{t(service.title)}</h5>
                          <p className="mb-0">{t(service.description)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};
