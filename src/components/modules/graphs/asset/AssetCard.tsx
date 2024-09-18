import {FC} from "react";
import {Link} from "react-router-dom";

type Props = {
    id: number;
    label: string;
    details: string;
};

export const AssetCard:FC<Props> = ({id, label, details}) => {
    return (
        <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
            <div className="blog__item-inner blog__item-inner--style2">
                <div className="blog__content">
                    <h5 className="10 style2">
                        <Link to={"/asset_graph/" + id} className="none">{label}</Link>
                    </h5>
                    <p className="mb-15">{details}</p>
                </div>
            </div>
        </div>
    );
};