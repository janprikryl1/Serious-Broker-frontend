import {FC} from "react";
import {useTranslation} from "react-i18next";
import {TitleHeader} from "../../components/modules/about/TitleHeader.tsx";

export const EditorIndex:FC = () => {
    const {t} = useTranslation();
    
    return (
        <>
            <TitleHeader title={t("Help for editors")} />
            <div className="container padding-top padding-bottom">
                ...
            </div>
        </>
    );
};