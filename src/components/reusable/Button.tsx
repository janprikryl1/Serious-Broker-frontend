import { FC, ReactNode, CSSProperties } from "react";
import { Link } from "react-router-dom";

export enum ButtonColor {
    gold = "var(--secondary-color)",
    white = "var(--white-color)",
    cream = "var(--cream-color)",
    sandy = "var(--sandy-color)",
    green = "var(--green-on-primary-color)",
    red = "var(--red-on-tertiary-color)",
    gray = "var(--gray-2-color)",
    lightBrown = "var(--tertiary-color)",
    darkBrown = "var(--primary-color)",
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
    fontColor?: string;
    disabled?: boolean;
    shadow?: boolean;
};

export const Button: FC<ButtonProps> = ({children, onClick, className = "primary", type = "button", to, style, color = ButtonColor.gold, disabled = false, shadow = true, fontColor}) => {
  const fontColorFinal = fontColor ?? [ButtonColor.red, ButtonColor.green, ButtonColor.darkBrown, ButtonColor.lightBrown].includes(color)
    ? "var(--white-color)" : "var(--black-color)";

  if (type === "link" && to) {
        return (
            <Link
                to={to}
                className={`btn trk-btn trk-btn--border trk-btn--${className}`}
                style={{
                    color: fontColorFinal,
                    backgroundColor: color,
                    boxShadow: shadow ? `0 0 15px 5px color-mix(in srgb, ${color}, transparent 90%)` : "none",
                    letterSpacing: 1,
                    fontWeight: 400,
                    ...style
                }}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type as "button" | "submit" | "reset"}
            className={`btn trk-btn trk-btn--border trk-btn--${className}`}
            onClick={onClick}
            style={{
                backgroundColor: color,
                border: "none",
                color: fontColorFinal,
                boxShadow: shadow ? `0 0 15px 5px color-mix(in srgb, ${color}, transparent 90%)` : "none",
                letterSpacing: 1,
                ...style}}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
