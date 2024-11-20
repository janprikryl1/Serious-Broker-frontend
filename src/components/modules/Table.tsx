import { FC, ReactNode } from "react";
import {MostProfitable} from "../../utils/types/indexPage/IndexDataStructure.ts";

type TableProps<T> = {
    data: T[];
    columns: Array<{
        label: string;
        accessor: (item: T) => ReactNode;
    }>;
    children?: ReactNode;
    className?: string;
};

export const Table: FC<TableProps<MostProfitable>> = ({ data, columns, children, className }) => (
    <div className={`table-container ${className || ""}`}>
        <table className="table table-dark no-border-row">
            <thead>
            <tr>
                {columns.map((column, index) => (
                    <th key={index}>{column.label}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                        <td key={colIndex}>{column.accessor(item)}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
        {children}
    </div>
);
