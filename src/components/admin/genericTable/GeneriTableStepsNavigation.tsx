import {FC} from "react";
import {GenericTablesSteps, useGenericTablesContext} from "../../../utils/providers/GenericTablesProvider.tsx";
import {useTranslation} from "react-i18next";
import {Button, ButtonColor} from "../../reusable/Button.tsx";

export const GeneriTableStepsNavigation:FC = () => {
    const {t} = useTranslation();
    const {step, setStep, table, updateQuery} = useGenericTablesContext();
    
    const handleGoBack = () => {
        if (step === GenericTablesSteps.COLUMNS_SELECT) {
            setStep(GenericTablesSteps.TABLE_SELECT);
        } else if (step === GenericTablesSteps.SUMMARY) {
            setStep(GenericTablesSteps.COLUMNS_SELECT);
        }
    }
    
    const handleGoNext = () => {
        if (step === GenericTablesSteps.TABLE_SELECT && table) {
            setStep(GenericTablesSteps.COLUMNS_SELECT);
        } else if (step === GenericTablesSteps.COLUMNS_SELECT) {
            updateQuery();
            setStep(GenericTablesSteps.SUMMARY);
        }
    }
    
    return (
        <div className="admin-generic-table-stepper-buttons mt-5">
            {step > 0 && (
                <Button color={ButtonColor.gray} onClick={handleGoBack}>{t("Back")}</Button>
            )}
            {step < GenericTablesSteps.SUMMARY && (
                <Button type="button" style={{marginLeft:5}} onClick={handleGoNext}>{t("Next")}</Button>
            )}
        </div>
    );
}