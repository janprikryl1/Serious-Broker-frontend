import {FC} from "react";
import {useTranslation} from "react-i18next";
import Czech from "../../utils/icons/languages/czech.png";
import English from "../../utils/icons/languages/english.png";

export const SelectedLanguageIcon:FC = () => {
    const { i18n} = useTranslation();

    return (
        <>
            {i18n.language === "cs" 
                ? <img src={Czech} alt="Čeština" width={20}/>
                : <img src={English} alt="English" width={20}/>}
        </>
    )
};
