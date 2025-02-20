import {FC} from "react";
import {Subjects} from "./variant0Components/Subjects.tsx";
import {Variant1Content} from "./variant1Components/Variant1Content.tsx";

export const NewArticleVariant1:FC = () => {
    return (
        <>
            <Subjects />
            <Variant1Content />
        </>
    )
}