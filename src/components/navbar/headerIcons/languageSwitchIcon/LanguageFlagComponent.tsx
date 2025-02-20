import {FC} from "react";
import {NavDropdown} from "react-bootstrap";
import {useTranslation} from "react-i18next";

type Props = {
    languageId: string;
    languageName: string;
};
export const LanguageFlagComponent:FC<Props> = ({languageId, languageName}) => {
    const { i18n} = useTranslation();

    return (
        <NavDropdown.Item key="cs" disabled={i18n.language === languageId} onClick={() => i18n.changeLanguage(languageId)}>
            {languageName}
        </NavDropdown.Item>
    )
};
