import {FC} from "react";
import guided1 from "../../utils/icons/guides/guided_invest.webp";
import guided2 from "../../utils/icons/guides/guided_invest2.webp";
import guided3 from "../../utils/icons/guides/guided_invest3.webp";
import {useTranslation} from "react-i18next";

export const GuideInvestControlWhyToJoin:FC = () => {
    const { t } = useTranslation();
    
    return (
        <div className="col-12 col-sm-11 offset-sm-1 pt-5 pb-5">
            <h2 className="mb-4">{t("Why Join?")}</h2>
            <div className="row align-items-center mb-4 gx-0">
                <div className="col-12 col-md-4 text-center mb-3 mb-md-0 px-2">
                    <img src={guided1} alt={t("Decision delegation")} className="img-fluid"
                         style={{maxWidth: '150px'}}/>
                </div>
                <div className="col-12 col-md-8 px-2">
                    <h5><b>{t("Option to delegate investment decisions")}</b></h5>
                    <p>
                        {t("Entrust the management of your funds to professionals and save your time and energy.")}
                    </p>
                </div>
            </div>
            <div className="row align-items-center mb-4 flex-md-row-reverse gx-0">
                <div className="col-12 col-md-4 text-center mb-3 mb-md-0 px-2">
                    <img src={guided2} alt={t("Worry-free investing")} className="img-fluid"
                         style={{maxWidth: '150px'}}/>
                </div>
                <div className="col-12 col-md-8 text-md-end px-2">
                    <h5><b>{t("Worry-free investing")}</b></h5>
                    <p>
                        {t("You don't have to spend time analyzing markets")}
                    </p>
                </div>
            </div>
            <div className="row align-items-center mb-4 gx-0">
                <div className="col-12 col-md-4 text-center mb-3 mb-md-0 px-2">
                    <img src={guided3} alt={t("Active management")} className="img-fluid" style={{maxWidth: '150px'}}/>
                </div>
                <div className="col-12 col-md-8 px-2">
                    <h5><b>{t("Active portfolio management")}</b></h5>
                    <p>
                        {t("We invest for you based on a defined strategy and current market developments.")}
                    </p>
                </div>
            </div>
        </div>
    );
}