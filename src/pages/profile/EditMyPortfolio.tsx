import {FC} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const EditMyPortfolio:FC = () => {
    const {id} = useParams();
    const { t } = useTranslation();
    
    
    return (
        <div>
            
        </div>
    );
}