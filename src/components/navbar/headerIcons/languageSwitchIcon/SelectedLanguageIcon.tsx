import {FC} from "react";
import {useTranslation} from "react-i18next";

export const SelectedLanguageIcon:FC = () => {
    const { i18n} = useTranslation();

    return (
        <>
            {i18n.language === "cs" 
                ? "Čeština"
                : "English"
            }
        </>
    )
};
