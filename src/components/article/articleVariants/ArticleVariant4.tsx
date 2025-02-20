import {FC} from "react";
import {imageURL} from "../../../utils/constants";

type Props = {
    image: string;
};

export const ArticleVariant4:FC<Props> = ({image}) => {
    return (
        <>
            {image && <img src={`${imageURL}${image}`} alt="Title image" className="img-fluid"/>}
        </>
    )
}