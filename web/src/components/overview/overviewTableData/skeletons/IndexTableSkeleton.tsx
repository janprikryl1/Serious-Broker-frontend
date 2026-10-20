import { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const IndexTableSkeleton: FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-stretch flex-wrap mt-5 mb-5">
            <div className="p-3 w-100 mb-5 me-5">
                <Skeleton width="90%" height={50} className="mb-2"/>
                <Skeleton width="90%" height={400}/>
            </div>
        </div>
    );
};
