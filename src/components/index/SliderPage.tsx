import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import {SliderPageSeriousBroker} from "./indexSliderPages/SliderPageSeriousBroker.tsx";
import {SliderPageBitcoin} from "./indexSliderPages/SliderPageBitcoin.tsx";
import {SliderPage5Minutes} from "./SliderPage5Minutes.tsx";
import {useMediaQuery} from "@mui/material";
import {IndexMobileSliderPage} from "./indexMobileSlider/IndexMobileSliderPage.tsx";
import {IndexMobileSliderBitcoin} from "./indexMobileSlider/IndexMobileSliderBitcoin.tsx";
import {IndexMobileSliderFiveMinutes} from "./indexMobileSlider/IndexMobileSliderFiveMinutes.tsx";
import {IndexMobileSliderYourMoney} from "./indexMobileSlider/IndexMobileSliderYourMoney.tsx";
import {SliderPageYourMoney} from "./indexSliderPages/SliderPageYourMoney.tsx";


export const SliderPage: FC = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    
    return (
        <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            className="main-slider-container"
        >
            {isMobile ? (
                <>
                    <SwiperSlide>
                        <IndexMobileSliderPage />
                    </SwiperSlide>
                    <SwiperSlide>
                        <IndexMobileSliderBitcoin />
                    </SwiperSlide>
                    <SwiperSlide>
                        <IndexMobileSliderFiveMinutes />
                    </SwiperSlide>
                    <SwiperSlide>
                        <IndexMobileSliderYourMoney />
                    </SwiperSlide>
                </>
            ) : (
                <>
                    <SwiperSlide>
                        <SliderPageSeriousBroker />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderPageBitcoin />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderPage5Minutes />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SliderPageYourMoney />
                    </SwiperSlide>
                </>
            )}
        </Swiper>
    );
};