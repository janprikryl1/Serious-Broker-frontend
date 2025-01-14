import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const CurrentWidgetSkeleton:FC = () => {
    return (
        <Skeleton width={1000} height={1000} />
    );
};