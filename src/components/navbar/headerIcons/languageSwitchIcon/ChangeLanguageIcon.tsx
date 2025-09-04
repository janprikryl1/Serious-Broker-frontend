import {FC, useState} from "react";
import {Dropdown, NavDropdown} from "react-bootstrap";
import {LanguageFlagComponent} from "./LanguageFlagComponent";
import {useTranslation} from "react-i18next";
import { GoogleTranslation } from "../../GoogleTranslation";
import {SiGoogletranslate} from "react-icons/si";

export const ChangeLanguageIcon:FC = () => {
    const { t, i18n } = useTranslation();
    const [showGoogleTranslation, setShowGoogleTranslation] = useState(false);
    
    return (
        <div style={{marginRight: "1vw"}}>
            <NavDropdown title={i18n.language === "cs" ? "CZ" : "EN"}>
                <LanguageFlagComponent languageId="cs" languageName="Čeština" setShowGoogleTranslation={setShowGoogleTranslation}/>
                <LanguageFlagComponent languageId="en" languageName="English" setShowGoogleTranslation={setShowGoogleTranslation}/>
                <Dropdown.Divider />
                <NavDropdown.Item key="another" onClick={() => setShowGoogleTranslation(true)}>
                    <SiGoogletranslate /> <span className="ml-2">{t("Another languages")}</span>
                </NavDropdown.Item>
            </NavDropdown>
            {showGoogleTranslation && <GoogleTranslation/>}
        </div>
    )
}
