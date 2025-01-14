import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const MostVolatileCoinsSkeleton:FC = () => {
    return (
        <>
            {[...Array(5)].map((_, index) => (
                <div key={index} className="d-flex mb-2">
                    <Skeleton width={200} height={20} />
                    <Skeleton width={100} height={20} style={{ marginLeft: 'auto' }} />
                </div>
            ))}
        </>
    )
}