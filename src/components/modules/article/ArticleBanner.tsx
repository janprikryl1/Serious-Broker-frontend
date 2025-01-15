import {FC} from "react";
import {imageURL} from "../../../utils/constants";

type Props = {
    banner: string;
    title: string;
}

export const ArticleBanner:FC<Props> = ({banner, title}) => {
    return (
        <>
            {banner ? (
                <div className="card bg-dark text-white">
                    <img src={`${imageURL}/${banner}`} className="card-img" alt={title}/>
                    <div className="card-img-overlay">
                        <h1 className="card-title">{title}</h1>
                    </div>
                </div>     
            ) : (
                <h1 className="card-title">{title}</h1>
            )}
        </>
    );
};