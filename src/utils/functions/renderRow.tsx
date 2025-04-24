import {toPercentTwoDecimal} from "./functions.ts";

export const renderRow = (label: string, value: number | null) => {
    if (value !== 0 && value !== null) {
        return (
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "4px"}}>
                <span>{label}</span>
                <span style={{fontWeight: "bold"}}>{toPercentTwoDecimal(value)} %</span>
            </div>
        );
    }
    return null;
};