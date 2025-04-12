import {FC} from "react";
import {SharedSlideLayout} from "./SharedSlideLayout.tsx";
import BitcoinBg from "../../../utils/icons/index/bitcoin_close_up3_enhanced_no_bg_darker.png"
import {Button} from "../../reusable/Button.tsx";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";
import {useTranslation} from "react-i18next";

export const SliderPageBitcoin:FC = () => {
    const { t } = useTranslation();
    
    return (
        <SharedSlideLayout 
            imageUrl={BitcoinBg}
            backgroundSize={"40%"}
            backgroundPosition={"5% 0%"}
        >
            <div className="container">
                <h1 className="slide-title" style={{marginLeft:"-25vw"}}>{t("Do you know Bitcoin?")}</h1>
                <p className="slide-tagline" style={{marginLeft:"15vw"}}>
                    {t("It Can Earn Money for You")}
                </p>
                <p className="slide-tagline">
                    <Button><Link to={routes.cryptocurrencyDetailURL + 1}>{t("Learn Now")}</Link></Button>
                </p>
            </div>
        </SharedSlideLayout>
    );
}