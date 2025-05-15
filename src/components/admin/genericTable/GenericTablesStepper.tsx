import {FC} from "react";
import {GenericTablesSteps, useGenericTablesContext} from "../../../utils/providers/GenericTablesProvider.tsx";
import {useTranslation} from "react-i18next";
import {GenericsTableSelectTable} from "./GenericsTableSelectTable.tsx";
import {GenericsTableColumnsSelect} from "./GenericsTableColumnsSelect.tsx";
import {GenericsTableSummary} from "./GenericsTableSummary.tsx";
import {GeneriTableStepsNavigation} from "./GeneriTableStepsNavigation.tsx";

export const GenericTablesStepper:FC = () => {
    const {t} = useTranslation();
    const {step} = useGenericTablesContext();
    
    return (
        <>
            <p>{t("Step")} {step+1} / {GenericTablesSteps.SUMMARY+1}</p>
            {step === GenericTablesSteps.TABLE_SELECT && <GenericsTableSelectTable />}
            {step === GenericTablesSteps.COLUMNS_SELECT && <GenericsTableColumnsSelect />}
            {step === GenericTablesSteps.SUMMARY && <GenericsTableSummary />}
            <GeneriTableStepsNavigation />
        </>
    );
};