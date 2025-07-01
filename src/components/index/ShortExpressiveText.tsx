import {FC} from "react";
import {useTranslation} from "react-i18next";
import Form from 'react-bootstrap/Form';
import { useUserContext } from "../../utils/providers/providerUser";


export const ShortExpressiveText:FC = () => {
    const {t} = useTranslation();
    const {user, setFilledForm} = useUserContext();
    
    const handleSelect = () => {
        if (user?.has_filled_form === true) return;
        setFilledForm(true);
    }
    
    return (
        <div className="index-short-expressive-text">
            <div className="container">
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