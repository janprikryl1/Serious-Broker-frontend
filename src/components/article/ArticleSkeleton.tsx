import {FC} from 'react';
import Skeleton from 'react-loading-skeleton';
import "../../styles/sass/components/recommendation-details-skeleton.scss";

export const ArticleSkeleton: FC = () => {
    return (
        <div className="container blog-details__item-inner">
            <Skeleton height={40} width="50%" className="recommendation-details-skeleton-mb-big" />
            <Skeleton height={20} width="80%" className="recommendation-details-skeleton-mb-small" />
            <Skeleton height={20} width="75%" className="recommendation-details-skeleton-mb-small" />
            <Skeleton height={20} width="85%" className="recommendation-details-skeleton-mb-small" />
            <br />
            <Skeleton height={30} width="60%" className="recommendation-details-skeleton-mb-big" />
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <Skeleton height={200} width="100%" />
                    </div>
                    <div className="col-sm-8">
                        <Skeleton height={20} width="90%" className="recommendation-details-skeleton-mb-small" />
                        <Skeleton height={20} width="95%" className="recommendation-details-skeleton-mb-small" />
                        <Skeleton height={20} width="80%" className="recommendation-details-skeleton-mb-small" />
                    </div>
                </div>
            </div>
            <Skeleton height={40} width={120} className="recommendation-details-skeleton-mb-small" />
        </div>
    );
};