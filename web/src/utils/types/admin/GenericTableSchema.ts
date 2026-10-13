export type GenericTableSchema = {
    Field: string;
    Type: string;
    Null: "NO" | "YES";
    Key: "PRI" | "",
    Default: null | string | number;
    Extra: string;
};