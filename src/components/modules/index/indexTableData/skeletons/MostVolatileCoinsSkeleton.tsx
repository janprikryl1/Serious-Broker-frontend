import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const MostVolatileCoinsSkeleton:FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-stretch flex-wrap mt-5 mb-5">
            {[...Array(2)].map((_, index) => (
                <div className="p-3 w-100 mb-3" style={{marginLeft: "3vw"}} key={index}>
                    <Skeleton width="80%" height={50} className="mb-1"/>
                    <Skeleton width="80%" height={400}/>
                </div>
            ))}
        </div>
    )
}