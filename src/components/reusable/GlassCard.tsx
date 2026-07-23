import { CSSProperties, FC, ReactNode } from "react";

type GlassCardProps = {
    children: ReactNode;
    style?: CSSProperties;
    bgColor?: string;
    opacity?: number;
    blur?: number;
    borderRadius?: number;
    className?: string;
};

export const GlassCard: FC<GlassCardProps> = ({
                                                  children,
                                                  style,
                                                  bgColor = "var(--black-color)",
                                                  opacity = 0.1,
                                                  blur = 20,
                                                  borderRadius = 24,
                                                  className = "",
                                              }) => {
    return (
        <div
            style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${bgColor} ${opacity * 100}%, transparent) 0%, color-mix(in srgb, ${bgColor} ${(opacity * 0.5) * 100}%, transparent) 100%)`,
                borderTop: "1px solid rgba(255, 255, 255, 0.25)",
                borderLeft: "1px solid rgba(255, 255, 255, 0.18)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                borderRight: "1px solid rgba(255, 255, 255, 0.05)",
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                borderRadius: `${borderRadius}px`,
                boxShadow: `
                    inset 0 1px 1px rgba(255, 255, 255, 0.15), 
                    inset 0 7px 7px rgba(0, 0, 0, 0.04), 
                    inset -7px -7px 15px rgba(255, 255, 255, 0.02), 
                    0 20px 40px rgba(0, 0, 0, 0.1)
                `,
                ...style,
            }}
            className={`tw-p-8 tw-backdrop-filter ${className}`}
        >
            {children}
        </div>
    );
};