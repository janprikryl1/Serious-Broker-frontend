import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const MembershipLoadingSkeleton:FC = () => {
    return (
        <>
            {Array.from({ length: 3 }).map((_, index) => (
                <div className="mb-5 mt-3" key={index}>
                    <Skeleton width={200} height={30} />
                    <Skeleton width={300} height={20} />
                    <Skeleton width={100} height={40} />
                </div>
            ))}
        </>
    );
}