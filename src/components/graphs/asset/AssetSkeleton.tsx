import {FC} from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
    count?: number;
};

export const AssetSkeleton:FC<Props> = ({count = 4}) => {
    return (
        <div className="row">
            {Array.from(Array(count).keys()).map((_, index) => (
                <div className="col-sm" key={index}>
                    <Skeleton height={350} width={350} style={{ marginBottom: '10px' }} />
                </div>
            ))}
        </div>
    );
};