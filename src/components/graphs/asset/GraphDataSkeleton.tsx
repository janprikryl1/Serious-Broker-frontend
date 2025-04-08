import { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const GraphDataSkeleton: FC = () => {
    return (
        <div style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400 }}>
            <Skeleton width={"100%"} height={400} />
        </div>
    );
};
