import {FC} from "react";
import {useDemoContext} from "../../../../utils/providers/DemoProvider.tsx";
import {useTranslation} from "react-i18next";

export const DemoSave:FC = () => {
    const {t} = useTranslation();
    const {uploadDemo} = useDemoContext();
    
    return (
        <button className="btn btn-warning" onClick={uploadDemo}>{t("Save")}</button>
    );
}