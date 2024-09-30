import {FC} from "react";
import {CryptoCurrencyType} from "../../../../utils/types/CryptoCurrencyType.ts";
import {Link} from "react-router-dom";

type Props = {
    cryptocurrency: CryptoCurrencyType;
};

export const CryptoCurrencyLink:FC<Props> = ({cryptocurrency}) => {
    return (
        <div className="blog__writer" style={{marginTop: 50}}>
            <div className="blog__writer-designation">
                <Link to={`/cryptocurrency_detail/${cryptocurrency.id}`} className="none">
                    {cryptocurrency.name}
                    <span style={{marginLeft: 10}}>{cryptocurrency.symbol}</span>
                </Link>
            </div>
        </div>
    );
};