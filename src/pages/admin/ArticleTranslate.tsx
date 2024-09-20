import {FC} from "react";
import {useParams} from "react-router-dom";

export const ArticleTranslate:FC = () => {
    const {id} = useParams();
    return (
        <>
            {id}
        </>
    );
};