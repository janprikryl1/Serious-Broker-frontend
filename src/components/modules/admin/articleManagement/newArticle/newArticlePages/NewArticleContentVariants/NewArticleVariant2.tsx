import {FC} from "react";
import {Variant0Content} from "./variant0Components/Variant0Content.tsx";
import {TitleImage} from "./variant2Components/TitleImage.tsx";
import {Subjects} from "./variant0Components/Subjects.tsx";

export const NewArticleVariant2:FC = () => {
    return (
        <>
            <Subjects />
            <TitleImage />
            <Variant0Content />
        </>
    )
}