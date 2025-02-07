import {useEffect, useRef, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { TrendingSwiperItem } from "./TrendingSwiperItem.tsx";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import {TrendingSwiperSkeleton} from "./TrendingSwiperSkeleton.tsx";
import '../../../styles/css/swiper-bundle.min.css';
import {MostProfitable} from "../../../utils/types/indexPage/IndexDataStructure.ts";
import {getLatestCoinmarketcupCoins} from "../../../api/indexDataService.ts";

export const TrendingSwiper = () => {
    const swiperRef = useRef<SwiperCore | null>(null);
    const [canGoPrev, setCanGoPrev] = useState(false);
    const [canGoNext, setCanGoNext] = useState(true);
    const [last_coinmarketcup_coins, setLastCoinmarketcupCoins] = useState<MostProfitable[]>();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getLatestCoinmarketcupCoins();
                setLastCoinmarketcupCoins(response.data);
            } catch (exception) {
                console.error(exception);
            }
        };
        getData();
    }, []);
    
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
                        <button className="swiper-button" onClick={() => swiperRef.current?.slidePrev()} aria-label="Previous">
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
                        <button className="swiper-button" onClick={() => swiperRef.current?.slideNext()} aria-label="Next">
                            <GrLinkNext style={{color:"black"}} />
                        </button>
                    )}
                </div>
            ) : <TrendingSwiperSkeleton />}
        </>
    );
};
