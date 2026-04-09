import {toPercentTwoDecimal} from "./functions.ts";

export const renderRow = (label: string, value: number | null) => {
    if (value !== 0 && value !== null) {
        return (
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "4px"}}>
                <span className={"gray-2-color-text"}>{label}</span>
                <span style={{fontWeight: "bold"}}>{toPercentTwoDecimal(1 - value)} %</span>
            </div>
        );
    }
    return null;
};