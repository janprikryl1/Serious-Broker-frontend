import {FC} from "react";
import {TranslateSubjects} from "./TranslateSubjects.tsx";
import {TranslationTitleImage} from "./translateContentComponents/TranslationTitleImage.tsx";
import {TranslateVariant0Content} from "./TranslateVariant0Content.tsx";

export const NewTranslationVariant2:FC = () => {
    return (
        <>
            <TranslateSubjects />
            <TranslationTitleImage />
            <TranslateVariant0Content />
        </>
    )
}