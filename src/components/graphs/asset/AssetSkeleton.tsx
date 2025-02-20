import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const AssetSkeleton:FC = () => {
    return (
        <div className="row">
            {Array.from(Array(4).keys()).map((_, index) => (
                <div className="col-sm" key={index}>
                    <Skeleton height={350} width={350} style={{ marginBottom: '10px' }} />
                </div>
            ))}
        </div>
    );
};