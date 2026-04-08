import {CSSProperties, FC, ReactNode} from "react";

type CardCointainerProps = {
    children: ReactNode;
    style?: CSSProperties;
    color?: string;
    animate?: boolean;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const CardContainer: FC<CardCointainerProps> = ({children, style, color = "var(--tertiary-color)", animate = false, className = "", onClick}) => {
    return (
        <div
            style={{
                backgroundColor: color,
                borderRadius: "2px",
                padding: "25px 25px 30px 25px",
                color: "var(--white-color)",
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                margin: "30px",
                marginBottom: "50px",
                transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease",
                ...style,
            }}
            className={className}
            onMouseEnter={(e) => {
                if (animate) {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.25)";
                }
            }}
            onMouseLeave={(e) => {
                if (animate) {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                }
            }}
            onClick={onClick}
        >
            {children}
        </div>
    );
};