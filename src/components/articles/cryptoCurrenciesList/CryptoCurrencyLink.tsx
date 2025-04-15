import {FC} from "react";
import {Link} from "react-router-dom";
import {routes} from "../../../utils/constants";
import {CryptoCurrencyType} from "../../../utils/types/asset/CryptoCurrencyType.ts";

type Props = {
    cryptocurrency: CryptoCurrencyType;
};

export const CryptoCurrencyLink:FC<Props> = ({cryptocurrency}) => {
    return (
        <div className="blog__writer" style={{marginTop: 50}}>
            <div className="blog__writer-designation">
                <Link to={`${routes.cryptocurrencyDetailURL}${cryptocurrency.id}`} className="link-underline-none">
                    {cryptocurrency.name}
                    <span style={{marginLeft: 10}}>{cryptocurrency.symbol}</span>
                </Link>
            </div>
        </div>
    );
};