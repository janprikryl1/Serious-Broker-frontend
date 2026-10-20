import {FC} from "react";
import {useTranslation} from "react-i18next";
import {BlurredImage} from "./BlurredImage.tsx";
import dotSphere from "../../utils/icons/about/dot_sphere.svg";
import {TeamMemberCard} from "./TeamMemberCard.tsx";

export const AboutUs: FC = () => {
  const {t} = useTranslation();

  return (
    <div>
      <div className="row gx-5 gy-4 gy-sm-0 align-items-center">
        <div className="col-lg-6 pe-lg-5">
            <BlurredImage imageSrc={dotSphere} altText="Background Image"/>
        </div>

        <div className="col-lg-6">
          <div>
            <h4>{t("About Serious Broker")}</h4>
            <p>
              {t("Serious Broker is a new project developed as part of a bachelor thesis. Its purpose is to guide investors through the world of finance while closely monitoring the evolution of cryptocurrencies.")}
            </p>
            <p>
              {t("Our platform offers extensive historical data, various analytical charts, and valuable insights to help investors make informed decisions in an ever-changing market")}
            </p>
          </div>
        </div>

        <div className="tw-mt-10">
          <h4 className="">{t("Our mission")}</h4>
          <p>{t("Investing can often feel overwhelming, especially for those with little or no experience. Our mission is to make the world of investments more accessible and easier to understand, even for beginners.")}</p>
        </div>

        <h4 className="tw-mt-20">{t("Our team")}</h4>
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-14 tw-mb-14">
          <TeamMemberCard name="Ing. Radoslav Fasuga, Ph.D." position="Coordinator"
                          description="10+ years of experience"/>
          <TeamMemberCard name="Bc. Jan Přikryl" position="Developer"/>
          <TeamMemberCard name="Bc. Adela Fedorová" position="Developer, designer"/>
        </div>
      </div>
    </div>
  );
};