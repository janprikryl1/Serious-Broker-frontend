import { FC } from "react";

type Props = {
    color: string;
    label: string;
};

export const LegendItem: FC<Props> = ({ color, label }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                style={{ marginRight: "5px" }}
            >
                <circle cx="4.5" cy="4.5" r="4" fill={color} />
            </svg>
            <span style={{fontSize: "15px"}}>{label}</span>
        </div>
    );
};
