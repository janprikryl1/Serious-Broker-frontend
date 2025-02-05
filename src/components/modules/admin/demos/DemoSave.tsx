import {FC} from "react";
import {useDemoContext} from "../../../../utils/providers/DemoProvider.tsx";
import {useTranslation} from "react-i18next";
import {Button} from "../../../Button.tsx";

export const DemoSave:FC = () => {
    const {t} = useTranslation();
    const {uploadDemo} = useDemoContext();
    
    return (
        <Button className="mb-3" onClick={uploadDemo}>{t("Save")}</Button>
    );
}