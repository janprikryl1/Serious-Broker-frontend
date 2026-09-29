import {FC} from 'react';
import Skeleton from 'react-loading-skeleton';
import {GlassCard} from "../reusable/GlassCard.tsx";

export const ArticlesSkeleton: FC = () => {
    return (
        <div className="row g-4">
            {Array(6)
                .fill(0)
                .map((_, index) => (
                    <div key={index} className="col-sm-6">
                        <GlassCard data-aos="fade-up" data-aos-duration="1000" bgColor={"var(--secondary-color)"} opacity={0.1}>
                            <div>
                                <Skeleton height={110} width="100%" className="tw-mb-2" />
                                <Skeleton count={3} height={15} className="tw-mb-2" />
                                <div className="tw-text-left tw-w-full">
                                    <Skeleton height={20} width="40%" />
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                ))}
        </div>
    );
};
