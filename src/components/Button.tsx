import { FC, ReactNode, CSSProperties } from "react";
import { Link } from "react-router-dom";

export enum ButtonColor {
    yellow = "#ae9647",
    white = "#fff",
    green = "#00b300",
    red = "#952b34",
    blue = "#275fda",
    gray = "#5c636a",
    transparent = "transparent"
}

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset" | "link";
    to?: string;
    style?: CSSProperties;
    color?: ButtonColor;
    disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({children, onClick, className = "", type = "button", to, style, color = ButtonColor.yellow, disabled = false}) => {
    if (type === "link" && to) {
        return (
            <Link
                to={to}
                className={`trk-btn--border trk-btn--primary link-underline-none ${className}`}
                style={{ color: "black", backgroundColor: color, borderRadius: "3px", borderColor: "transparent", fontWeight: "bold", ...style }}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type as "button" | "submit" | "reset"}
            className={`btn trk-btn--border trk-btn--primary ${className}`}
            onClick={onClick}
            style={{ backgroundColor: color, border: "none", color: color === ButtonColor.red || color === ButtonColor.transparent ? "white" : "black", borderRadius: 3, ...style}}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
