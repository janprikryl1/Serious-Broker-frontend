import {useRef, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { TrendingSwiperItem } from "./TrendingSwiperItem.tsx";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import {TrendingSwiperSkeleton} from "./TrendingSwiperSkeleton.tsx";
import {useIndexDataContext} from "../../../utils/providers/IndexDataProvider.tsx";
import '../../../styles/css/swiper-bundle.min.css';

export const TrendingSwiper = () => {
    const swiperRef = useRef<SwiperCore | null>(null);
    const { last_coinmarketcup_coins } = useIndexDataContext();
    const [canGoPrev, setCanGoPrev] = useState(false);
    const [canGoNext, setCanGoNext] = useState(true);

    const handleSlideChange = () => {
        if (swiperRef.current) {
            setCanGoPrev(!swiperRef.current.isBeginning);
            setCanGoNext(!swiperRef.current.isEnd);
        }
    };
    
    return (
        <>
            {last_coinmarketcup_coins ? (  
                <div className="trending-swiper-wrapper">
                    {canGoPrev && (
                        <button className="swiper-button" onClick={() => swiperRef.current?.slidePrev()}>
                            <GrLinkPrevious style={{color:"black"}} />
                        </button>
                    )}
                    <div className="trending-swiper">
                        <Swiper
                            modules={[Navigation]}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            onSlideChange={handleSlideChange}
                            spaceBetween={20}
                            slidesPerView="auto"
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 5 },
                            }}
                        >
                            {last_coinmarketcup_coins.map((item) => (
                                <SwiperSlide key={item.asset_label}>
                                    <TrendingSwiperItem item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    {canGoNext && (
                        <button className="swiper-button" onClick={() => swiperRef.current?.slideNext()}>
                            <GrLinkNext style={{color:"black"}} />
                        </button>
                    )}
                </div>
            ) : <TrendingSwiperSkeleton />}
        </>
    );
};
