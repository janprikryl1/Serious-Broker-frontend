import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const AssetDetailSkeleton:FC = () => {
    return (
        <div className="container padding-bottom px-5">
            <Skeleton count={1} height={20}/>
            <Skeleton count={1} height={20}/>
            <Skeleton count={1} height={20}/>
            <Skeleton count={1} height={20}/>
            <Skeleton count={1} height={20} style={{marginBottom: '20px'}}/>
            <Skeleton height={500}/>
        </div>
    );
};