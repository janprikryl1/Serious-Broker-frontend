import {FC} from "react";
import {NewTranslationVariant0} from "./translationContent/NewTranslationVariant0.tsx";
import {NewTranslationVariant1} from "./translationContent/NewTranslationVariant1.tsx";
import {NewTranslationVariant2} from "./translationContent/NewTranslationVariant2.tsx";
import {NewTranslationVariant3} from "./translationContent/NewTranslationVariant3.tsx";
import {NewTranslationVariant4} from "./translationContent/NewTranslationVariant4.tsx";
import {useArticleTranslate} from "../../../../utils/providers/ArticleTranslateProvider.tsx";

export const NewTranslationContent:FC = () => {
    const {template} = useArticleTranslate();

    return (
        <div style={{marginBottom: 10}}>
            {template === "0" ? <NewTranslationVariant0 />
            : template === "1" ? <NewTranslationVariant1 />
            : template === "2" ? <NewTranslationVariant2 />
            : template === "3" ? <NewTranslationVariant3 />
            : template === "4" ? <NewTranslationVariant4 />
            : null}
        </div>
    )
}
