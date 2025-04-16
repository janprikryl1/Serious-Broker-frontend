import {FC} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import '../../styles/css/swiper-bundle.min.css';
import "../../styles/sass/components/recommendation-details-skeleton.scss";

export const TrendingSwiperSkeleton:FC = () => {
    return (
        <div className="trending-swiper-wrapper">
            <div className="trending-swiper">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={3}
                    breakpoints={{
                        640: {slidesPerView: 2},
                        768: {slidesPerView: 3},
                        1024: {slidesPerView: 5},
                    }}
                >
                    {Array.from({length: 5}).map((_, index) => (
                        <SwiperSlide key={index}>
                            <div className="crypto-card-skeleton row">
                                <div className="col-md-4">
                                    <Skeleton circle={true} height={50} width={50}/>
                                </div>
                                <div className="col-md-8">
                                    <Skeleton height={20} width={80} className="recommendation-details-skeleton-mb-small"/>
                                    <Skeleton height={15} width={60}/>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};