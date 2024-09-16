import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const ArticlePagiation:FC = () => {
    const { t } = useTranslation();
    
    return (
        <div className="paginations" data-aos="fade-up" data-aos-duration="1200">
            <ul className="lab-ul d-flex flex-wrap justify-content-center mb-1">
                <li>
                    <Link to="" className="none" style={{width: "fit-content"}}>
                        <i className="fa-solid fa-angle-left me-2"></i> {t("Previous")}
                    </Link>
                </li>
                <li>
                    <Link to="" className="active none">1</Link>
                </li>
                <li>
                    <Link to="" className="none">
                        {t("Next")} <i className="fa-solid fa-angle-right ms-2"></i>
                    </Link>
                </li>
            </ul>
        </div>
    );
};