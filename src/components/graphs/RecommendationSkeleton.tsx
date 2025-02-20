import { FC } from "react";
import Skeleton from "react-loading-skeleton";

export const RecommendationSkeleton: FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex align-items-end" style={{ gap: "2px" }}>
                {Array(60).fill(0).map((_, index) => (
                    <div key={index}>
                        <Skeleton height={Math.random() * 200 + 50} width={10} />
                    </div>
                ))}
            </div>
        </div>
    );
};
