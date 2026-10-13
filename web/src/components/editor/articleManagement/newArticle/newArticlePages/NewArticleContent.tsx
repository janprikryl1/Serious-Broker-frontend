import {FC} from "react";
import {NewArticleVariant0} from "./NewArticleContent/NewArticleVariant0.tsx";
import {NewArticleVariant1} from "./NewArticleContent/NewArticleVariant1.tsx";
import {NewArticleVariant2} from "./NewArticleContent/NewArticleVariant2.tsx";
import {NewArticleVariant3} from "./NewArticleContent/NewArticleVariant3.tsx";
import {NewArticleVariant4} from "./NewArticleContent/NewArticleVariant4.tsx";
import {useArticleCreate} from "../../../../../utils/providers/ArticleCreateProvider.tsx";

export const NewArticleContent:FC = () => {
    const {template} = useArticleCreate();
    
    return (
        <div className="mt-3">
            {template === 0 ? <NewArticleVariant0 />
            : template === 1 ? <NewArticleVariant1 />
            : template === 2 ? <NewArticleVariant2 />    
            : template === 3 ? <NewArticleVariant3 />
            : template === 4 ? <NewArticleVariant4 />
            : null}
        </div>
    )
}
