import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useMyPortfolioContext} from "../../../../utils/providers/MyPortfolioProvider.tsx";
import {Button} from "../../../reusable/Button.tsx";

export const SavePortfolioButton:FC = () => {
    const {t} = useTranslation();
    const {saveChanges} = useMyPortfolioContext();
    
    return (
        <Button style={{fontSize:20, color:"black"}} onClick={saveChanges}>{t("Save")}</Button>
    )
}