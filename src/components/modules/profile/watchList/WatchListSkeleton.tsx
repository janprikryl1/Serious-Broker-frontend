import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const WatchListSkeleton:FC = () => {
    return (
        <>
            <Skeleton height={50} width={200} style={{ marginBottom: 20 }} />
            <Skeleton count={5} height={20} style={{ marginBottom: 10 }} />
            <Skeleton height={50} width={200} style={{ marginBottom: 20 }} />
            <Skeleton count={5} height={20} style={{ marginBottom: 10 }} />
            <Skeleton height={50} width={200} style={{ marginBottom: 20 }} />
            <Skeleton count={5} height={20} style={{ marginBottom: 10 }} />
        </>
    );
}