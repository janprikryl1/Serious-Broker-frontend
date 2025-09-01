import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Button, ButtonColor} from "../reusable/Button.tsx";
import {Link} from "react-router-dom";
import {guideURLS} from "../../utils/constants";

export const NoStressClearHeadInfo:FC = () => {
    const {t} = useTranslation();

    return (
        <div style={{ backgroundColor: "#ae9749" }}>
            <div className="container pt-5 pb-5">
                <h2 className="mb-5 text-dark index-section-head-title">{t("Stress-free with a clear head")}</h2>
                <p className="text-dark text-bolder">{t("By investing through Serious.Broker, you can save a lot of time and nerves – from constantly monitoring market developments to worrying about whether to sell an investment or what to do if its value drops.")}</p>
                <p className="text-dark text-bolder">{t("Instead of stress, you can shop with a clear head and benefit from the favorable turn in the cryptocurrency market.")}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to={guideURLS.personalStrategy}>
                        <Button color={ButtonColor.brown} style={{ color:"white" }}>
                            {t("Personal story")}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}