import {FC} from "react";
import {useParams} from "react-router-dom";

export const TranslateEdit:FC = () => {
    const {articleId, id} = useParams();
    console.log(articleId, id);
    return (
        <div>
            
        </div>
    )
};