import {FC} from "react";
import {Link} from "react-router-dom";
import {routes} from "../../../../utils/constants";

type Props = {
    label: string;
    details: string;
};

export const AssetCard:FC<Props> = ({label, details}) => {
    return (
        <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
            <div className="blog__item-inner blog__item-inner--style2">
                <div className="blog__content">
                    <h5 className="10 style2">
                        <Link to={`${routes.assetGraphURL}${label}`} className="link-underline-none">{label}</Link>
                    </h5>
                    <p className="mb-15">{details}</p>
                </div>
            </div>
        </div>
    );
};