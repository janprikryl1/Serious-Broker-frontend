import {FC, ReactNode} from "react";

type Props = {
    children: ReactNode;
    color?: string;
    variant: "h1" | "p";
}

export const IndexTitleWrapper:FC<Props> = ({children, color = "#fac900", variant}) => {
    return (
        <div style={{textAlign: "center"}}>
            {variant === "h1" ? (
                <h1 className="blur-background" style={{color: color}}>
                    {children}
                </h1>
                ) : (
                <p className="blur-background" style={{color: "#fac900"}}>
                    Pojďte s námi spořit krypto
                </p>
            )}
        </div>
    );
}