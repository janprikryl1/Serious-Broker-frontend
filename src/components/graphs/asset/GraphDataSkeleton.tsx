import { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const GraphDataSkeleton: FC = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400 }}>
            <Skeleton width={600} height={400} />
        </div>
    );
};
