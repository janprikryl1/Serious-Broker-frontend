import {ChangeEvent, FC} from "react";
import {useGenericTablesContext} from "../../../utils/providers/GenericTablesProvider.tsx";
import {GenericTableSchema} from "../../../utils/types/admin/GenericTableSchema.ts";
import {useTranslation} from "react-i18next";

type Props = {
    tableDetails: GenericTableSchema[] | undefined;
}

export const GenericTableAdditionalSettings:FC<Props> = ({tableDetails}) => {
    const {t} = useTranslation();
    const { query, setQuery } = useGenericTablesContext();

    const handleOrderByFieldChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newField = e.target.value;
        setQuery(prev => {
            const currentQuery = prev || {};
            if (newField === "") { const { orderBy, ...rest } = currentQuery; return Object.keys(rest).length > 0 ? rest : undefined; }
            return { ...currentQuery, orderBy: { ...(currentQuery.orderBy), field: newField, direction: currentQuery.orderBy?.direction || 'ASC' } };
        });
    };
    const handleOrderByDirectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newDirection = e.target.value as 'ASC' | 'DESC';
        setQuery(prev => {
            const currentQuery = prev || {};
            if (!currentQuery.orderBy?.field) return currentQuery;
            return { ...currentQuery, orderBy: { ...currentQuery.orderBy, field: currentQuery.orderBy.field, direction: newDirection } };
        });
    };
    const handleLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
        const valueStr = e.target.value;
        setQuery(prev => {
            const currentQuery = prev || {};
            if (valueStr === "") { const { limit, offset, ...rest } = currentQuery; return Object.keys(rest).length > 0 ? {...rest, offset: undefined} : undefined; }
            const numValue = parseInt(valueStr, 10);
            if (!isNaN(numValue) && numValue >= 0) { return { ...currentQuery, limit: numValue }; }
            return currentQuery;
        });
    };

    const handleGlobalConditionOperatorChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setQuery(prev => ({ ...(prev || {}), globalConditionOperator: e.target.value as 'AND' | 'OR' }));
    };
    
    return (
        <>
        {tableDetails && tableDetails.length > 0 && (
            <div className="card mb-4">
                <div className="card-header">
                    <h5 className="mb-0">{t("Additional settings for the query")}</h5>
                </div>
                <div className="card-body">
                    <div className="row mb-3 align-items-center">
                        <label htmlFor="orderByField" className="col-sm-3 col-form-label fw-bold">{t("Order by")}:</label>
                        <div className="col-sm-5">
                            <select
                                id="orderByField"
                                value={query?.orderBy?.field || ""}
                                onChange={handleOrderByFieldChange}
                                className="form-select form-select-sm"
                            >
                                <option value="">-- {t("Not specified")} --</option>
                                {tableDetails?.map(col => (
                                    <option key={`order-${col.Field}`} value={col.Field}>{col.Field}</option>
                                ))}
                            </select>
                        </div>
                        {query?.orderBy?.field && (
                            <div className="col-sm-4">
                                <select
                                    value={query?.orderBy?.direction || 'ASC'}
                                    className="form-select form-select-sm"
                                    onChange={handleOrderByDirectionChange}
                                >
                                    <option value="ASC">{t("Ascending")} (ASC)</option>
                                    <option value="DESC">{t("Descending")} (DESC)</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="row mb-3 align-items-center">
                        <label htmlFor="limit" className="col-sm-3 col-form-label fw-bold">{t("Limit results")}:</label>
                        <div className="col-sm-3">
                            <input
                                type="number"
                                id="limit"
                                min="0"
                                value={query?.limit === undefined ? '' : query.limit.toString()}
                                onChange={handleLimitChange}
                                placeholder={t("Count")}
                                className="form-control form-control-sm"
                                style={{ height: "31.6px", fontSize: '0.875rem', padding: '0.25rem 0.5rem' }}
                            />
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <label htmlFor="globalOperator" className="col-sm-3 col-form-label fw-bold">{t("Connecting Conditions")}:</label>
                        <div className="col-sm-3">
                            <select
                                id="globalOperator"
                                value={query?.globalConditionOperator || 'AND'}
                                onChange={handleGlobalConditionOperatorChange}
                                className="form-select form-select-sm"
                            >
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}