import {createContext, ReactNode, useContext, useState, useEffect, Dispatch, SetStateAction} from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CustomSwal } from "../functions/customSwal.ts";
import {getQueryById, saveQuery} from "../api/genericTableService.ts";
import { AdminGenericTableOptions } from "../options/AdminGenericTableOptions.ts";
import { GenericTableQuery } from "../types/admin/filters.ts";
import { generateSQLQuery } from "../functions/generateSQL.ts";
import {parseSQLToTableQuery} from "../functions/parseSQLToQueryObject.ts";

type Props = {
    children: ReactNode;
};

type GenericTablesProviderProps = {
    query: GenericTableQuery | undefined;
    setQuery: Dispatch<SetStateAction<GenericTableQuery | undefined>>;
    uploadQuery: () => void;
    refreshQuery: () => void;
    step: GenericTablesSteps;
    setStep: (step: GenericTablesSteps) => void;
    table: string;
    setTable: (table: string) => void;
    generatedQuery: string;
    updateQuery: () => void;
};

export enum GenericTablesSteps {
    TABLE_SELECT,
    COLUMNS_SELECT,
    SUMMARY,
}

const GenericTablesContext = createContext<GenericTablesProviderProps | undefined>(undefined);

export const GenericTablesProvider = ({ children }: Props) => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();

    const [table, setTable] = useState<string>(AdminGenericTableOptions[0]);
    const [query, setQuery] = useState<GenericTableQuery | undefined>();
    const [step, setStep] = useState<GenericTablesSteps>(GenericTablesSteps.TABLE_SELECT);
    const [generatedQuery, setGeneratedQuery] = useState<string>("");

    const updateQuery = () => {
        setGeneratedQuery(generateSQLQuery(query, table));
    };

    const refreshQuery = async () => {
        if (!id) return;

        try {
            const response = await getQueryById(id);
            if (response.status === 200) {
                const queryData = parseSQLToTableQuery(response.data.query);console.log(queryData);

                if (queryData?.tableName) {
                    setTable(queryData.tableName);
                } else {
                    console.warn("Název tabulky nebyl nalezen v SQL, nastavuje se výchozí (pokud je).");
                    setTable(AdminGenericTableOptions[0] || "");
                }
                setQuery(queryData?.query as GenericTableQuery);
                setStep(GenericTablesSteps.COLUMNS_SELECT);
            }
        } catch (error) {
            console.error("Failed to load query:", error);
        }
    };

    const uploadQuery = async () => {
        if (!query) return;

        try {
            const dataToSave = {
                ...query,
                table,
                query: generateSQLQuery(query, table),
            };

            await saveQuery(dataToSave, id);
            CustomSwal.fire({
                title: t("Successfully saved"),
                text: t("Query was successfully saved."),
                icon: "success",
            });
        } catch (error) {
            console.error("Failed to save query:", error);
            CustomSwal.fire({
                title: t("Save failed"),
                text: t("There was an error saving the query."),
                icon: "error",
            });
        }
    };

    useEffect(() => {
        refreshQuery();
    }, [id]);

    useEffect(() => {
        updateQuery();
    }, [query, table]);

    const value: GenericTablesProviderProps = {
        query,
        setQuery,
        uploadQuery,
        refreshQuery,
        setStep,
        step,
        table,
        setTable,
        generatedQuery,
        updateQuery,
    };

    return (
        <GenericTablesContext.Provider value={value}>
            {children}
        </GenericTablesContext.Provider>
    );
};

export const useGenericTablesContext = () => {
    const context = useContext(GenericTablesContext);
    if (context === undefined) {
        throw new Error("useGenericTablesContext must be used within a GenericTablesProvider");
    }
    return context;
};
