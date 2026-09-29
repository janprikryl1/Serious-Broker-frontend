import { CSSProperties, FC, ReactNode } from "react";

type GlassCardProps = {
    children: ReactNode;
    style?: CSSProperties;
    bgColor?: string;
    opacity?: number;
    blur?: number;
    borderRadius?: number;
    className?: string;
    isHoverable?: boolean;
    shrinkPadding?: boolean;
};

export const GlassCard: FC<GlassCardProps> = ({
                                                  children,
                                                  style,
                                                  bgColor = "var(--black-color)",
                                                  opacity = 0.1,
                                                  blur = 20,
                                                  borderRadius = 24,
                                                  className = "",
                                                  isHoverable = false,
                                                  shrinkPadding = false,
                                              }) => {
    const hoverOpacity = Math.min(opacity + 0.05, 1);

  return (
    <div
      style={{
        ["--card-opacity" as string]: `${opacity * 100}%`,
        ["--card-opacity-half" as string]: `${(opacity * 0.5) * 100}%`,
        ["--card-hover-opacity" as string]: `${hoverOpacity * 100}%`,
        ["--card-hover-opacity-half" as string]: `${(hoverOpacity * 0.5) * 100}%`,

        background: `linear-gradient(135deg, color-mix(in srgb, ${bgColor} var(--card-opacity), transparent) 0%, color-mix(in srgb, ${bgColor} var(--card-opacity-half), transparent) 100%)`,
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
        transition: "background 0.5s ease-in-out",
        ...style,
      }}
      className={`
                ${shrinkPadding ? "tw-p-4 sm:tw-p-6 lg:tw-p-8" : "tw-p-8"}
                tw-backdrop-filter 
                ${isHoverable ? "[&:hover]:![background:linear-gradient(135deg,color-mix(in_srgb,var(--bg-color-val,bgColor)_var(--card-hover-opacity),transparent)_0%,color-mix(in_srgb,var(--bg-color-val,bgColor)_var(--card-hover-opacity-half),transparent)_100%)] tw-cursor-pointer" : ""} 
                ${className}
            `.trim()}
      ref={(node) => {
        if (node) {
          node.style.setProperty('--bg-color-val', bgColor);
        }
      }}
    >
      {children}
    </div>
  );
};