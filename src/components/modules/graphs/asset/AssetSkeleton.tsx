import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const AssetSkeleton:FC = () => {
    return (
        <div className="container padding-bottom px-5 padding-top">
            <Skeleton count={5} height={20} width={200} style={{ marginBottom: '10px' }} />
        </div>
    );
};