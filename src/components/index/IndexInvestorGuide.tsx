import {FC} from "react";
import LaptopAndBook from "../../utils/icons/index/laptop and book no plant.png";
import {Button} from "../reusable/Button.tsx";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {routes} from "../../utils/constants";

export const IndexInvestorGuide:FC = () => {
    const {t} = useTranslation();
    
    return (
        <div style={{backgroundColor: "#221f1c"}} className="py-5">
            <div className="container">
                <div className="row justify-content-center align-items-center gx-0">
                    <div className="col-sm-5 text-center text-sm-end mb-4 mb-sm-0">
                        <div className="position-relative d-inline-block">
                            <img src={LaptopAndBook} alt="Graph no bg" className="img-fluid index-section-image" />
                            <div 
                                className="index-section-image-blurred-color-graphh" 
                                style={{background: "radial-gradient(ellipse at center, #d5bea5 0%, transparent 50%)"}}
                            />
                        </div>
                    </div>
                    <div className="col-sm-4 text-center text-sm-start ms-sm-4 ms-lg-5"> {/* Adjust values as needed */}
                        <h1 className="index-title index-section-title">{t("Investor's guide")}</h1>
                        <h3 className="index-section-for">{t("For Learners")}</h3>
                        <p className="index-section-content">{t("Clear and concise educational articles covering everything essential for independent investing")}.</p>
                        <div className="text-center mt-3">
                            <Button className="index-section-button"><Link to={routes.articles}>{t("Start Learning")}</Link></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}