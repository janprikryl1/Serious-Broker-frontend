import {FC} from "react";
import Skeleton from "react-loading-skeleton";

export const UserAchievmentSkeleton: FC = () => {
    return (
        <div className="cta__subscribe padding-bottom padding-top">
            <Skeleton width={150} height={40} className="mb-4" />
            <div className="timeline">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-item-content">
                            <Skeleton width={100} height={20} className="mb-2" />
                            <Skeleton width={200} height={24} className="mb-2" />
                            <Skeleton count={2} className="mb-2" />
                        </div>
                        <Skeleton circle width={20} height={20} />
                    </div>
                ))}
            </div>
        </div>
    );
};
