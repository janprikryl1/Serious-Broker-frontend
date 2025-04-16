import {FC} from "react";
import Skeleton from "react-loading-skeleton";
import "../../../styles/sass/components/recommendation-details-skeleton.scss";

export const HighlightsListSkeleton:FC = () => {
    return (
        <div className="row g-4">
            {Array(6)
                .fill(0)
                .map((_, index) => (
                    <div key={index} className="col-sm-6 col-lg-4">
                        <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
                            <div className="blog__item-inner blog__item-inner--style2">
                                <div className="blog__content">
                                    <Skeleton height={30} width="80%" className="recommendation-details-skeleton-mb-small" />
                                    <Skeleton count={3} height={15} className="recommendation-details-skeleton-mb-small" />
                                    <Skeleton height={20} width="60%"/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}