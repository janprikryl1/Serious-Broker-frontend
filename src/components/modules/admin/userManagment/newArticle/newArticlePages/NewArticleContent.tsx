import {FC} from "react";
import {useArticleCreate} from "../../../../../../utils/providers/ArticleCreateProvider.tsx";
import {NewArticleVariant0} from "./NewArticleContentVariants/NewArticleVariant0.tsx";
import {NewArticleVariant1} from "./NewArticleContentVariants/NewArticleVariant1.tsx";
import {NewArticleVariant2} from "./NewArticleContentVariants/NewArticleVariant2.tsx";
import {NewArticleVariant3} from "./NewArticleContentVariants/NewArticleVariant3.tsx";
import {NewArticleVariant4} from "./NewArticleContentVariants/NewArticleVariant4.tsx";



export const NewArticleContent:FC = () => {
    const {template} = useArticleCreate();
    
    return (
        <div style={{marginBottom: 10}}>
            {template === 0 ? <NewArticleVariant0 />
            : template === 1 ? <NewArticleVariant1 />
            : template === 2 ? <NewArticleVariant2 />    
            : template === 3 ? <NewArticleVariant3 />
            : template === 4 ? <NewArticleVariant4 />
            : null}
        </div>
    )
}
