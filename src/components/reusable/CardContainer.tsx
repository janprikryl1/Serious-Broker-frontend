import {CSSProperties, FC, ReactNode} from "react";

type CardCointainerProps = {
    children: ReactNode;
    style?: CSSProperties;
    color?: string;
};

export const CardContainer: FC<CardCointainerProps> = ({children, style, color = "#B1974E"}) => {
    return (
        <div
            style={{
                backgroundColor: color,
                borderRadius: "2px",
                padding: "16px",
                color: "#FFFFFF",
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                margin: "30px",
                marginBottom: "50px",
                transform: "translateY(0)",
                transition:
                    "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease",
                ...style,
            }}
            onMouseEnter={(e) => {
                //e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.25)";
            }}
            onMouseLeave={(e) => {
                //e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
            }}
        >
            {children}
        </div>
    );
};