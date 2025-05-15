import { FC, useEffect, useState, useCallback, ChangeEvent } from "react";
import { useGenericTablesContext } from "../../../utils/providers/GenericTablesProvider";
import { getTableSchema } from "../../../utils/api/genericTableService";
import { GenericTableSchema } from "../../../utils/types/admin/GenericTableSchema";
import { FilterCondition, FilterOperator } from "../../../utils/types/admin/filters";
import { isBooleanType, isDateType, isNumericType, isStringType } from "../../../utils/functions/genericTableFunctions";
import { FaRegTrashAlt } from "react-icons/fa";
import { GenericTableAdditionalSettings } from "./GenericTableAdditionalSettings.tsx";
import {useTranslation} from "react-i18next";

export const GenericsTableColumnsSelect: FC = () => {
    const {t} = useTranslation();
    const { table, query, setQuery } = useGenericTablesContext();
    const [tableDetails, setTableDetails] = useState<GenericTableSchema[] | undefined>();
    const [isLoadingSchema, setIsLoadingSchema] = useState<boolean>(false);

    useEffect(() => {
        if (!table) {
            setTableDetails(undefined);
            return;
        }
        setIsLoadingSchema(true);
        setTableDetails(undefined);

        const fetchTableDetailsLocal = async () => {
            try {
                const response = await getTableSchema(table);
                const fetchedSchema = response.data;
                setTableDetails(fetchedSchema);

                setQuery(prevQuery => {
                    const currentQuery = prevQuery || {};
                    let updatedColumns = currentQuery.columns?.filter(colName =>
                        fetchedSchema.some(td => td.Field === colName)
                    );
                    if (!updatedColumns || updatedColumns.length === 0) {
                        updatedColumns = fetchedSchema.map(td => td.Field);
                    }
                    const updatedConditions = currentQuery.conditions?.filter(cond =>
                        fetchedSchema.some(td => td.Field === cond.field)
                    );
                    return {
                        ...currentQuery,
                        columns: updatedColumns,
                        conditions: (updatedConditions?.length ?? 0) > 0 ? updatedConditions : undefined,
                    };
                });
            } catch (error) {
                console.error("Failed to fetch table schema:", error);
                setTableDetails([]);
                setQuery(prev => ({...prev, columns: undefined, conditions: undefined}));
            } finally {
                setIsLoadingSchema(false);
            }
        };
        fetchTableDetailsLocal();
    }, [table, setQuery]);

    const handleSelectForDisplayChange = useCallback((fieldName: string, checked: boolean) => {
        setQuery(prevQuery => {
            const currentQuery = prevQuery || {};
            let newSelectedColumns = [...(currentQuery.columns || (tableDetails?.map(td => td.Field) || []))];
            if (checked) {
                if (!newSelectedColumns.includes(fieldName)) newSelectedColumns.push(fieldName);
            } else {
                newSelectedColumns = newSelectedColumns.filter(col => col !== fieldName);
                const newConditions = currentQuery.conditions?.filter(cond => cond.field !== fieldName);
                return {
                    ...currentQuery,
                    columns: newSelectedColumns.length > 0 ? newSelectedColumns : undefined,
                    conditions: (newConditions?.length ?? 0) > 0 ? newConditions : undefined,
                };
            }
            return { ...currentQuery, columns: newSelectedColumns.length > 0 ? newSelectedColumns : undefined };
        });
    }, [setQuery, tableDetails]);

    const addFilter = useCallback((fieldName: string) => {
        setQuery(prevQuery => {
            const currentQuery = prevQuery || {};
            const newCondition: FilterCondition = { field: fieldName, operator: undefined as any, value: undefined };
            return { ...currentQuery, conditions: [...(currentQuery.conditions || []), newCondition] };
        });
    }, [setQuery]);

    const removeFilter = useCallback((fieldName: string, filterIndexToRemove: number) => {
        setQuery(prevQuery => {
            if (!prevQuery || !prevQuery.conditions) return prevQuery;
            let actualIndexInQueryConditions = -1;
            let countForField = 0;
            for(let i=0; i < prevQuery.conditions.length; i++){
                if(prevQuery.conditions[i].field === fieldName){
                    if(countForField === filterIndexToRemove){ actualIndexInQueryConditions = i; break; }
                    countForField++;
                }
            }
            if(actualIndexInQueryConditions === -1) return prevQuery;
            const newConditions = prevQuery.conditions.filter((_, index) => index !== actualIndexInQueryConditions);
            return { ...prevQuery, conditions: newConditions.length > 0 ? newConditions : undefined };
        });
    }, [setQuery]);

    const handleFilterChange = useCallback((
        fieldName: string,
        filterIndexToUpdate: number,
        key: 'operator' | 'value',
        value: any
    ) => {
        setQuery(prevQuery => {
            if (!prevQuery || !prevQuery.conditions) return prevQuery;
            let actualIndexInQueryConditions = -1;
            let countForField = 0;
            for (let i=0; i < prevQuery.conditions.length; i++){
                if(prevQuery.conditions[i].field === fieldName){
                    if(countForField === filterIndexToUpdate){ actualIndexInQueryConditions = i; break; }
                    countForField++;
                }
            }
            if(actualIndexInQueryConditions === -1) return prevQuery;

            const newConditions = [...prevQuery.conditions];
            const conditionToUpdate = { ...newConditions[actualIndexInQueryConditions] };
            (conditionToUpdate as any)[key] = value;

            if (key === 'operator') {
                if (value === "IS TRUE") { conditionToUpdate.operator = "="; conditionToUpdate.value = true; }
                else if (value === "IS FALSE") { conditionToUpdate.operator = "="; conditionToUpdate.value = false; }
                else if (["IS NULL", "IS NOT NULL"].includes(value)) { conditionToUpdate.operator = value as FilterOperator; delete conditionToUpdate.value; }
                else { conditionToUpdate.operator = value as FilterOperator; }
            }
            if (key === 'operator' && (conditionToUpdate.operator === "IS NULL" || conditionToUpdate.operator === "IS NOT NULL" )) {
                delete conditionToUpdate.value;
            }
            newConditions[actualIndexInQueryConditions] = conditionToUpdate;
            return { ...prevQuery, conditions: newConditions };
        });
    }, [setQuery]);

    const renderFilterInputsForRow = (colSchema: GenericTableSchema, filterCondition: FilterCondition, filterIndex: number) => {
        const fieldName = colSchema.Field;
        let operatorsForUI: { value: FilterOperator, label: string }[] = [];

        if (isBooleanType(colSchema.Type)) {
            operatorsForUI = [{value: "IS TRUE", label: "IS TRUE"}, {value: "IS FALSE", label: "IS FALSE"}];
        } else if (isNumericType(colSchema.Type)) {
            operatorsForUI = [
                {value: "=", label: "="}, {value: "!=", label: "!="}, {value: ">", label: ">"},
                {value: "<", label: "<"}, {value: ">=", label: ">="}, {value: "<=", label: "<="},
                {value: "IN", label: "IN (seznam)"}
            ];
        } else if (isStringType(colSchema.Type)) {
            operatorsForUI = [
                {value: "=", label: "="}, {value: "!=", label: "!="}, {value: "LIKE", label: "LIKE"},
                {value: "NOT LIKE", label: "NOT LIKE"}, {value: "IN", label: "IN (seznam)"}
            ];
        } else if (isDateType(colSchema.Type)) {
            operatorsForUI = [
                {value: "=", label: "="}, {value: "!=", label: "!="}, {value: ">", label: ">"},
                {value: "<", label: "<"}, {value: ">=", label: ">="}, {value: "<=", label: "<="}
            ];
        }

        if (colSchema.Null === "YES" && !isBooleanType(colSchema.Type)) {
            operatorsForUI.push({value: "IS NULL", label: "IS NULL"}, {value: "IS NOT NULL", label: "IS NOT NULL"});
        }

        const uniqueOperatorValues = new Set<FilterOperator>();
        operatorsForUI = operatorsForUI.filter(op => {
            if (uniqueOperatorValues.has(op.value)) return false;
            uniqueOperatorValues.add(op.value);
            return true;
        });

        let currentUiOperatorValue: FilterOperator | "" = "";
        if (filterCondition.operator === "=" && typeof filterCondition.value === 'boolean' && isBooleanType(colSchema.Type)) {
            currentUiOperatorValue = filterCondition.value ? "IS TRUE" : "IS FALSE";
        } else if (filterCondition.operator) {
            currentUiOperatorValue = filterCondition.operator;
        }

        const showValueInput = currentUiOperatorValue && !["IS NULL", "IS NOT NULL", "IS TRUE", "IS FALSE"].includes(currentUiOperatorValue);
        const inputType = (isNumericType(colSchema.Type) && currentUiOperatorValue !== "IN") ? "number" :
            isDateType(colSchema.Type) ? (colSchema.Type.toLowerCase() === "date" ? "date" : "datetime-local") : "text";
        const placeholderText = currentUiOperatorValue === "IN" ? "Values separated by line" : "Value";

        return (
            <div key={`${fieldName}-${filterIndex}`} className="row g-2 align-items-center mt-2">
                <div className="col-md-4">
                    <select
                        className="form-select form-select-sm"
                        value={currentUiOperatorValue}
                        onChange={(e) => handleFilterChange(fieldName, filterIndex, "operator", e.target.value as FilterOperator)}
                    >
                        <option value="" disabled>Operátor</option>
                        {operatorsForUI.map(opObj => <option key={opObj.value} value={opObj.value}>{opObj.label}</option>)}
                    </select>
                </div>
                {showValueInput && (
                    <div className="col-md-6">
                        <input
                            type={inputType}
                            className="form-control form-control-sm"
                            style={{ height: "31.6px", fontSize: '0.875rem', padding: '0.25rem 0.5rem' }}
                            placeholder={placeholderText}
                            value={filterCondition.value === undefined ? '' : String(filterCondition.value)}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleFilterChange(fieldName, filterIndex, "value", e.target.value)
                            }
                        />
                    </div>
                )}
                <div className={`text-end ${showValueInput ? "col-md-2" : "col-md-8"}`}>
                    <button type="button" className="btn btn-outline-danger btn-sm p-1" onClick={() => removeFilter(fieldName, filterIndex)} title="Odebrat podmínku">
                        <FaRegTrashAlt size="0.85em"/>
                    </button>
                </div>
            </div>
        );
    };

    if (isLoadingSchema && !tableDetails) {
        return <p className="p-3 text-center">{t("Loading table scheme...")}</p>;
    }
    if (tableDetails && tableDetails.length === 0 && !isLoadingSchema) {
        return <p className="p-3 text-danger">{t("Table")} {table} {t("does not contain any columns or the schema could not be loaded")}.</p>;
    }

    return (
        <div className="container-fluid mt-3">
            <div className="card mb-4">
                <div className="card-header"><h5 className="mb-0">{t("Setting columns and filters:")} {table}</h5></div>
                <div className="card-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    {tableDetails?.map((colSchema) => {
                        const isSelectedForDisplay = query?.columns?.includes(colSchema.Field) ?? (query?.columns === undefined && !!tableDetails);
                        const filtersForThisColumn = query?.conditions?.filter(cond => cond.field === colSchema.Field) || [];
                        let filterRenderIndex = 0;

                        return (
                            <div key={colSchema.Field} className="border rounded p-3 mb-3 shadow-sm">
                                <div className="form-check mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`check-${colSchema.Field}`}
                                        checked={isSelectedForDisplay}
                                        onChange={(e) => handleSelectForDisplayChange(colSchema.Field, e.target.checked)}
                                    />
                                    <label className="form-check-label fw-bold" htmlFor={`check-${colSchema.Field}`}>
                                        {colSchema.Field}
                                        <small className="text-muted ms-2">({colSchema.Type}{colSchema.Null === "NO" ? ", NOT NULL" : ", Nullable"})</small>
                                    </label>
                                </div>
                                {isSelectedForDisplay && filtersForThisColumn.map((filterCond) => renderFilterInputsForRow(colSchema, filterCond, filterRenderIndex++))}
                                {isSelectedForDisplay && (
                                    <button type="button" className="btn btn-outline-success btn-sm mt-2 py-1" onClick={() => addFilter(colSchema.Field)}>
                                        + {t("Condition")}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <GenericTableAdditionalSettings tableDetails={tableDetails} />
        </div>
    );
};