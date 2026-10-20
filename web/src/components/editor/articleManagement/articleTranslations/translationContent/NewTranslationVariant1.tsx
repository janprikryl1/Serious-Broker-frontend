import {FC} from "react";
import {TranslateSubjects} from "./TranslateSubjects.tsx";
import {TranslationVariant1Content} from "./TranslationVariant1Content.tsx";

export const NewTranslationVariant1:FC = () => {
    return (
        <>
            <TranslateSubjects />
            <TranslationVariant1Content />
        </>
    )
}