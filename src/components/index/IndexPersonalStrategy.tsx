import {FC} from "react";
import GraphNoBg from "../../utils/icons/index/graph_no_bg2.png";
import {Button} from "../reusable/Button.tsx";
import {useTranslation} from "react-i18next";

export const IndexPersonalStrategy:FC = () => {
    const { t } = useTranslation();
    
    return (
        <div style={{backgroundColor: "#221f1c"}} className="py-5">
            <div className="container">
                <div className="row justify-content-center align-items-center gx-0">
                    <div className="col-sm-5 text-center text-sm-end mb-4 mb-sm-0">
                        <div className="position-relative d-inline-block" style={{ overflow: 'hidden' }}>
                            <img src={GraphNoBg} alt="Graph" className="img-fluid index-section-image" />
                            <div 
                                className="index-section-image-blurred-color-graphh" 
                                style={{ background: "radial-gradient(ellipse at center, white 0%, transparent 50%)"}} 
                            />
                        </div>
                    </div>
                    <div className="col-sm-4 text-center text-sm-start">
                        <h1 className="index-title index-section-title">{t("Personal Strategy")}</h1>
                        <h3 className="index-section-for">{t("For Individuals")}</h3>
                        <p className="index-section-content">{t("Personalized investment recommendations tailored to individual needs and market trends")}.</p>
                        <div className="text-center mt-3">
                            <Button className="index-section-button">{t("Learn More")}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};