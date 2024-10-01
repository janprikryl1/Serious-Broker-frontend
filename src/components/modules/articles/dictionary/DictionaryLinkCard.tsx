import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {routes} from "../../../../utils/constants";

export const DictionaryLinkCard:FC = () => {
    const {t} = useTranslation();

    return (
        <div className="col-sm-6 col-lg-4">
            <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
                <div className="blog__item-inner blog__item-inner--style2">
                    <div className="blog__content">
                        <div className="blog__meta">
                            <span className={`blog__meta-tag blog__meta-tag--style1`}>
                              {t("Article")}
                            </span>
                        </div>
                        <h5 className="10 style2">
                            <Link to={routes.dictionary} className="link-underline-none"> {t("Glossary of terms")}</Link>
                        </h5>
                        <p className="mb-15"
                           style={{height: 100}}>{t("Glossary of terms in the cryptocurrency world")}</p>
                        <div className="blog__writer">
                            <div className="blog__writer-designation">
                                <p>System</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};