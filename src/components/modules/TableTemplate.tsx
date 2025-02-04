import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

type Props = {
    title: string;
    children: ReactNode;
}

export const TableTemplate:FC<Props> = ({title, children}) => {
    const {t} = useTranslation();
    
    return (
        <div className="padding-bottom" style={{textAlign: "center", maxWidth: 700}}>
            <div
                style={{
                    backgroundColor: "#6e675e",
                    borderRadius: 24,
                    padding: 30,
                    zIndex: 2,
                    position: 'relative',
                }}
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <h2>{t(title)}</h2>
                {children}
            </div>
        </div>
    );
}