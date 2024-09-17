import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const RecommendationDetailsSkeleton: React.FC = () => {
    return (
        <div className="recommendation-details-skeleton">
            <Skeleton height={40} width={200} style={{ marginBottom: 20 }} />
            <Skeleton count={10} height={20} style={{ marginBottom: 10 }} />
            <Skeleton count={10} height={20} style={{ marginBottom: 10 }} />
            <Skeleton count={10} height={20} style={{ marginBottom: 10 }} />
            <Skeleton count={10} height={20} style={{ marginBottom: 10 }} />
            <Skeleton count={10} height={20} style={{ marginBottom: 10 }} />
            <Skeleton count={10} height={20} style={{ marginBottom: 10 }} />
            <Skeleton count={10} height={20} style={{ marginBottom: 10 }} />
            <Skeleton count={10} height={20} style={{ marginBottom: 10 }} />
        </div>
    );
};
