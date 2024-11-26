import {FC, ReactNode} from "react";

type Props = {
    text: string | ReactNode;
    marginBottom?: string;
    fontSize?: string;
}

export const AssetGraphCurrencyDetailTextItem:FC<Props> = ({text, marginBottom="10px", fontSize="1.2rem"}) => {
    return (
        <h2 style={{fontSize: fontSize, marginBottom: marginBottom}}>
            {text}
        </h2>
    );
};