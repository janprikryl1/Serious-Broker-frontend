import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
    baseColor?: string;
    highlightColor?: string;
    style?: React.CSSProperties;
}

export const GraphDataSkeleton: FC<Props> = ({baseColor, highlightColor, style}) => {
    return (
        <div className="tw-w-full" style={style}>
            <Skeleton width={"100%"} height={"260px"} baseColor={baseColor} highlightColor={highlightColor} />
        </div>
    );
};
