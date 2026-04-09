import {CSSProperties, FC, ReactNode, MouseEvent} from "react";

type OutlineCointainerProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    bgColor?: string;
    outlineColor?: string;
    fontColor?: string;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    enableHover?: boolean;
};

export const OutlineContainer: FC<OutlineCointainerProps> = ({children, className = "", style, bgColor = "transparent", outlineColor = "var(--secondary-color)", fontColor = "var(--white-color)", onClick, enableHover = false}) => {
    return (
        <div
            className={`${enableHover ? "outline-container-hover" : ""} ${className}`}
            onClick={onClick}
            style={{
                backgroundColor: bgColor,
                borderRadius: "5px",
                padding: "2em",
                color: fontColor,
                margin: "30px",
                marginBottom: "50px",
                outline: `1px solid color-mix(in srgb, ${outlineColor}, transparent 50%)`,
                ...style,
            }}
        >
            {children}
        </div>
    );
};