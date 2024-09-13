import {FC} from "react";
import {NavDropdown} from "react-bootstrap";
import {useTranslation} from "react-i18next";

type Props = {
    languageId: string;
    languageName: string;
    languageFlag: string;
};
export const LanguageFlagComponent:FC<Props> = ({languageId, languageName, languageFlag}) => {
    const { i18n} = useTranslation();

    return (
        <NavDropdown.Item key="cs" disabled={i18n.language === languageId} onClick={() => i18n.changeLanguage(languageId)}>
            <img src={languageFlag} alt={languageName} width={30}/> {languageName}
        </NavDropdown.Item>
    )
};
