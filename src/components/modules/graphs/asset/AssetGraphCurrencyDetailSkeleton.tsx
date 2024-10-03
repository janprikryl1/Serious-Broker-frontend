import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const AssetGraphCurrencyDetailSkeleton:FC = () => {
    return (
        <div className="container padding-bottom px-5 mt-5">
            {Array.from({length: 4}, (_, i) => (
                <Skeleton height={30} width={500} key={i} className="mb-3"/>
            ))}
            <Skeleton height={350} width={800}/>
        </div>
    );
};