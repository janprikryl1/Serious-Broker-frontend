import { FC } from "react";
import { BsCoin } from "react-icons/bs";
import {MostProfitable} from "../../utils/types/indexPage/IndexDataStructure.ts";
import {coinURL} from "../../utils/constants";
import {toPercentTwoDecimal} from "../../utils/functions/functions.ts";

type Props = {
    item: MostProfitable;
};

export const TrendingSwiperItem: FC<Props> = ({ item }) => {
    return (
        <div className="crypto-card">
            {item.photo ? (
                <img src={`${coinURL}/${item.photo}`} alt={`Coin icon ${item.name}`} className="crypto-logo" />
            ) : (
                <BsCoin />
            )}
            <div className="crypto-info">
                <small className="crypto-name">{item.name}</small>
                <small>{item.asset_label}</small>
                <span className="percentage">{toPercentTwoDecimal(item.week_0_profit)} %</span>
            </div>
        </div>
    );
};
