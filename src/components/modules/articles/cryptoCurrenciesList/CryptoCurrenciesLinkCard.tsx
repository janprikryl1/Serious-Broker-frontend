import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const CryptoCurrenciesLinkCard:FC = () => {
    const {t} = useTranslation();
    
    return (
        <div className="col-sm-6 col-lg-4">
            <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
                <div className="blog__item-inner blog__item-inner--style2">
                    <div className="blog__content">
                        <h5 className="10 style2">
                            <Link to="/crypto_currencies_list" className="none"> {t("Crypto currencies list")}</Link>
                        </h5>
                        <p className="mb-15" style={{height: 100}}>{t("Interactive view of currencies with filters and information")}</p>
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