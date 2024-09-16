import {FC} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ArticlesSkeleton: FC = () => {
    return (
        <div className="row g-4">
            {Array(6)
                .fill(0)
                .map((_, index) => (
                    <div key={index} className="col-sm-6 col-lg-4">
                        <div className="blog__item" data-aos="fade-up" data-aos-duration="1000">
                            <div className="blog__item-inner blog__item-inner--style2">
                                <div className="blog__content">
                                    <Skeleton height={30} width="80%" style={{ marginBottom: '10px' }} />
                                    <Skeleton count={3} height={15} style={{ marginBottom: '10px' }} />
                                    <Skeleton height={20} width="60%" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};
