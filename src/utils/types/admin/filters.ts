export type FilterOperator =
    | "=" | "!=" | ">" | "<" | ">=" | "<=" | "<>"
    | "LIKE" | "NOT LIKE"
    | "IS NULL" | "IS NOT NULL"
    | "IS TRUE" | "IS FALSE"
    | "IN" | "NOT IN";

export type FilterCondition = {
    field: string;
    operator: FilterOperator;
    value?: string | number | boolean | null;
}

export type GenericTableQuery = {
    columns?: string[];
    conditions?: FilterCondition[];
    orderBy?: { field: string; direction: 'ASC' | 'DESC' };
    limit?: number;
    offset?: number;
    globalConditionOperator?: "AND" | "OR";
}

export type IndividualFilterSetting = {
    id: string;
    operator?: FilterOperator;
    value?: string | number | boolean;
}

export type ColumnSettings = {
    selectForDisplay: boolean;
    filters: IndividualFilterSetting[];
}

export type AllColumnSettings = {
    [fieldName: string]: ColumnSettings;
}