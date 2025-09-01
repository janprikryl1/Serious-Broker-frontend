import {FC} from "react";
import {useTranslation} from "react-i18next";
import Form from 'react-bootstrap/Form';
import { useUserContext } from "../../utils/providers/providerUser";
import {useNavigate} from "react-router-dom";
import {routes} from "../../utils/constants";


export const ShortExpressiveText:FC = () => {
    const {t} = useTranslation();
    const {user} = useUserContext();
    const navigate = useNavigate();
    
    const handleSelect = () => {
        navigate(routes.register);
    }
    
    if (user?.has_filled_form === true) return null;
    return (
        <div className="container">
            <h2 className="mb-5 index-section-head-title">{t("Investiční dotazník")}</h2>
            <p>{t("Fill out a short investment questionnaire so we can prepare better recommendations for you.")}</p>

                <div className="index-short-expressive-text">    
                <p>{t("What experience do you have with investing in cryptocurrencies?")}</p>
                <Form.Select style={{borderRadius:0, backgroundColor:"white", color:"#000", border:"none"}} onChange={handleSelect}>
                    <option>{t("None, I haven't invested yet")}</option>
                    <option>{t("Less than 1 year")}</option>
                    <option>{t("1-3 years")}</option>
                    <option>{t("3-5 years")}</option>
                    <option>{t("5-10 years")}</option>
                    <option>{t("10+ years")}</option>
                </Form.Select>
            </div>
        </div>
    );
};