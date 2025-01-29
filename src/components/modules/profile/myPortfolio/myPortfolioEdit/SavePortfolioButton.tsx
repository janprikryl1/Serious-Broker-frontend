import {FC} from "react";
import {useMyPortfolioContext} from "../../../../../utils/providers/MyPortfolioProvider.tsx";
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export const SavePortfolioButton:FC = () => {
    const {t} = useTranslation();
    const {saveChanges} = useMyPortfolioContext();
    
    return (
        <Button variant="warning" onClick={saveChanges}>{t("Save")}</Button>
    )
}