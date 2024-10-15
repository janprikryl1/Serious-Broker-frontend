import {FC} from "react";
import {useTranslation} from "react-i18next";
import {AchievmentHelp} from "./AchievmentHelp.tsx";

export const HelpSection:FC = () => {
    const {t} = useTranslation();
    
    return (
        <section className="about about--style1">
            <div className="container">
                <div className="about__wrapper">
                    <div className="row gx-5 gy-4 gy-sm-0 align-items-center">
                        <div className="col-lg-6">
                            <div
                                className="about__thumb pe-lg-5"
                                data-aos="fade-right"
                                data-aos-duration="800"
                            >
                                <h3>{t("Help")}</h3>
                                <AchievmentHelp />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}