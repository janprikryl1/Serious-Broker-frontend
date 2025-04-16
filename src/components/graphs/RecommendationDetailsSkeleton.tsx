import React from 'react';
import Skeleton from 'react-loading-skeleton';
import "../../styles/sass/components/recommendation-details-skeleton.scss";

export const RecommendationDetailsSkeleton: React.FC = () => {
    return (
        <div className="container recommendation-details-skeleton">
            <Skeleton height={40} width={200} className="recommendation-details-skeleton-mb-big" />
            <Skeleton count={10} height={20} className="recommendation-details-skeleton-mb-small" />
            <Skeleton count={10} height={20} className="recommendation-details-skeleton-mb-small" />
            <Skeleton count={10} height={20} className="recommendation-details-skeleton-mb-small" />
            <Skeleton count={10} height={20} className="recommendation-details-skeleton-mb-small" />
            <Skeleton count={10} height={20} className="recommendation-details-skeleton-mb-small" />
            <Skeleton count={10} height={20} className="recommendation-details-skeleton-mb-small" />
            <Skeleton count={10} height={20} className="recommendation-details-skeleton-mb-small" />
            <Skeleton count={10} height={20} className="recommendation-details-skeleton-mb-small" />
        </div>
    );
};
