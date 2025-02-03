import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";

type Props = {
    link: string;
    title: string;
    icon: ReactNode;
};

export const InvestmentTopicsLink: FC<Props> = ({ link, title, icon }) => {
    const { t } = useTranslation();
    
    return (
        <div className="col-sm-4 text-center">
            <i>{icon}</i>
            <Link className="text-decoration-none" to={link}>{t(title)}</Link>
        </div>
    );
};
