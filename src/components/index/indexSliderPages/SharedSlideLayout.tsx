import { FC, ReactNode } from "react";

type Props = {
    imageUrl: string;
    children: ReactNode;
    backgroundSize?: string;
    backgroundPosition?: string;
}

export const SharedSlideLayout: FC<Props> = ({imageUrl, children, backgroundSize, backgroundPosition}) => {
    const style = {
        backgroundImage: `url(${imageUrl})`,
        ...(backgroundSize && { backgroundSize }),
        ...(backgroundPosition && { backgroundPosition }),
    };

    return (
        <div className="shared-slide-layout" style={style}>
            <div className="overlay" />
            <div className="content">
                {children}
            </div>
        </div>
    );
};