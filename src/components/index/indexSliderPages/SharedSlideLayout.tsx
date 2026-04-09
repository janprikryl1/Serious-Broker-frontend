import { FC, ReactNode } from "react";

type Props = {
    imageUrl: string;
    children: ReactNode;
    backgroundSize?: string;
    backgroundPosition?: string;
    className?: string;
    contentClassName?: string;
}

export const SharedSlideLayout: FC<Props> = ({
    imageUrl,
    children,
    backgroundSize,
    backgroundPosition,
    className,
    contentClassName,
}) => {
    const style = {
        backgroundImage: `url(${imageUrl})`,
        ...(backgroundSize && { backgroundSize }),
        ...(backgroundPosition && { backgroundPosition }),
    };

    return (
        <div className={`shared-slide-layout ${className ?? ""}`.trim()} style={style}>
            <div className="overlay" />
            <div className={`content ${contentClassName ?? ""}`.trim()}>
                {children}
            </div>
        </div>
    );
};