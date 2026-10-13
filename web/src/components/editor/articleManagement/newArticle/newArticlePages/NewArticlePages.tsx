import {FC} from "react";
import {NewArticleSettings} from "./NewArticleSettings";
import {NewArticleContent} from "./NewArticleContent";
import {useArticleCreate} from "../../../../../utils/providers/ArticleCreateProvider.tsx";

export const NewArticlePages:FC = () => {
    const {page} = useArticleCreate();
    
    return (
        <div>
            {page === 0 ? <NewArticleSettings />
                : <NewArticleContent />}
        </div>
    )
}
