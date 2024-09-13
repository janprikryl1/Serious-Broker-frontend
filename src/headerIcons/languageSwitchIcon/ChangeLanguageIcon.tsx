import {FC} from "react";
import {NavDropdown} from "react-bootstrap";
import {LanguageFlagComponent} from "./LanguageFlagComponent";
import {SelectedLanguageIcon} from "./SelectedLanguageIcon";
import Czech from "../../utils/icons/languages/czech.png";
import English from "../../utils/icons/languages/english.png";

export const ChangeLanguageIcon:FC = () => {
    return (
        <div style={{marginRight: "1vw"}}>
            <NavDropdown title={<SelectedLanguageIcon />}>
                <LanguageFlagComponent languageId="cs" languageName="Čeština" languageFlag={Czech}/>
                <LanguageFlagComponent languageId="en" languageName="English" languageFlag={English}/>
            </NavDropdown>
        </div>
    )
}
