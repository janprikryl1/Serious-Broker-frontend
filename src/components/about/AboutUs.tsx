import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "@mui/material";
import {BlurredImage} from "./BlurredImage.tsx";
import dotSphere from "../../utils/icons/about/dot_sphere.svg";
import {TeamMemberCard} from "./TeamMemberCard.tsx";
import radoslavFasuga from "../../utils/icons/about/radoslav_fasuga.webp";

export const AboutUs: FC = () => {
  const {t} = useTranslation();
  const isMobile = useMediaQuery('(max-width:990px)');
  
  return (
        <div className="cta-dark about__wrapper">
        <div className="row gx-5 gy-4 gy-sm-0 align-items-center">
          <div className="col-lg-6 pe-lg-5">
            {!isMobile && (
                <BlurredImage imageSrc={dotSphere} altText="Background Image"/>
            )}
          </div>
          <div className="col-lg-6">
            <div className="about__content-inner">
              <h2 className="index-title">{t("About Serious Broker")}</h2>
              <p className="mb-4">
                {t("Serious Broker is a new project developed as part of a bachelor thesis. Its purpose is to guide investors through the world of finance while closely monitoring the evolution of cryptocurrencies.")}
              </p>
              <p className="mb-0">
                {t("Our platform offers extensive historical data, various analytical charts, and valuable insights to help investors make informed decisions in an ever-changing market")}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="index-title">{t("Our mission")}</h2>
            <p>{t("Investing can often feel overwhelming, especially for those with little or no experience. Our mission is to make the world of investments more accessible and easier to understand, even for beginners.")}</p>
          </div>
          <h2 className="index-title mb-4">{t("Our team")}</h2>
          <div className="about-team-member">
            <TeamMemberCard name="Ing. Radoslav Fasuga, Ph.D." position="Coordinator"
                            description="10+ years of experience" image={radoslavFasuga}/>
            <TeamMemberCard name="Jan Přikryl" position="Developer"/>
            <TeamMemberCard name="Adela Fedorová" position="Designer"/>
          </div>
        </div>
      </div>
  );
};