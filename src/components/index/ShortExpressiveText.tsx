import {FC} from "react";
import {useTranslation} from "react-i18next";

export const ShortExpressiveText:FC = () => {
    const {t} = useTranslation();
    
    return (
        <div className="text-center" style={{backgroundColor: "#ae9749", color: "#000", padding: "20px", fontWeight: 700}}>
            <p style={{maxWidth: "75%", marginLeft:"12%", textAlign:"left"}}>{t("Investing can often feel overwhelming, especially for those with little or no experience. Our mission is to make the world of investments more accessible and easier to understand, even for beginners.")}</p>
        </div>
    );
};