import {Dispatch, FC, SetStateAction} from "react";
import {NavDropdown} from "react-bootstrap";
import {useTranslation} from "react-i18next";

type Props = {
    languageId: string;
    languageName: string;
    setShowGoogleTranslation: Dispatch<SetStateAction<boolean>>;
};
export const LanguageFlagComponent:FC<Props> = ({languageId, languageName, setShowGoogleTranslation}) => {
    const { i18n} = useTranslation();
    
    const handleLanguageChange = () => {
        i18n.changeLanguage(languageId);
        setShowGoogleTranslation(false);
    };

    return (
        <NavDropdown.Item key="cs" disabled={i18n.language === languageId} onClick={handleLanguageChange}>
            {languageName}
        </NavDropdown.Item>
    )
};
