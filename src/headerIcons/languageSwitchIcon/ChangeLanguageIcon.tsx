import {FC} from "react";
import {NavDropdown} from "react-bootstrap";
import {LanguageFlagComponent} from "./LanguageFlagComponent";
import {useTranslation} from "react-i18next";

export const ChangeLanguageIcon:FC = () => {
    const { t} = useTranslation();
    
    return (
        <div style={{marginRight: "1vw"}}>
            <NavDropdown title={t("Language")}>
                <LanguageFlagComponent languageId="cs" languageName="Čeština"/>
                <LanguageFlagComponent languageId="en" languageName="English"/>
            </NavDropdown>
        </div>
    )
}
