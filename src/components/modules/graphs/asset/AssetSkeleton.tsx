import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const AssetSkeleton:FC = () => {
    return (
        <Skeleton count={5} height={20} width={350} style={{ marginBottom: '10px' }} />
    );
};