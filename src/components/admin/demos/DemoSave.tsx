import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useDemoContext} from "../../../utils/providers/DemoProvider.tsx";
import {Button} from "../../reusable/Button.tsx";

export const DemoSave:FC = () => {
    const {t} = useTranslation();
    const {uploadDemo} = useDemoContext();
    
    return (
        <Button className="mb-3" onClick={uploadDemo}>{t("Save")}</Button>
    );
}