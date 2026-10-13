import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

type Props = {
    title: string;
    children: ReactNode;
}

export const TableTemplate:FC<Props> = ({title, children}) => {
    const {t} = useTranslation();
    
    return (
        <div className="padding-bottom table-template">
            <div className="table-template__wrapper">
                <h2>{t(title)}</h2>
                {children}
            </div>
        </div>
    );
}