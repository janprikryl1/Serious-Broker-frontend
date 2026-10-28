import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import {useMediaQuery} from "@mui/material";
import {SliderTextTools} from "./indexSliderPages/SliderTextTools.tsx";
import {SliderTextAutopilot} from "./indexSliderPages/SliderTextAutopilot.tsx";
import {SliderTextEducation} from "./indexSliderPages/SliderTextEducation.tsx";
import CryptoStreet from "../../utils/icons/index/crypto_street.webp";
import {SharedSlideLayout} from "./indexSliderPages/SharedSlideLayout.tsx";

export const SliderPage: FC = () => {
    const isMobile = useMediaQuery('(max-width:768px)');

    return (
        <SharedSlideLayout
            imageUrl={CryptoStreet}
            backgroundSize="cover"
            backgroundPosition="center center"
            className="shared-slide-layout--crypto-street tw-h-[60vh] sm:tw-h-[72vh] lg:tw-h-[88vh]"
        >
            <div className="container tw-relative tw-mt-[18vh] sm:tw-mt-[22vh] lg:tw-mt-[30vh] tw-h-full tw-px-4 sm:tw-px-6">
                <Swiper
                    modules={[Pagination, Autoplay, EffectFade]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    className="main-slider-container"
                >
                            <SwiperSlide><SliderTextTools /></SwiperSlide>
                            <SwiperSlide><SliderTextAutopilot /></SwiperSlide>
                            <SwiperSlide><SliderTextEducation /></SwiperSlide>
                            {/*<SwiperSlide><SliderPageCryptoStreet /></SwiperSlide>*/}
                            {/*<SwiperSlide><SliderPageCryptoCity /></SwiperSlide>*/}
                            {/*<SwiperSlide><SliderPageSeriousBroker /></SwiperSlide>*/}
                            {/*<SwiperSlide><SliderPageBitcoin /></SwiperSlide>*/}
                            {/*<SwiperSlide><SliderPage5Minutes /></SwiperSlide>*/}
                </Swiper>
            </div>
        </SharedSlideLayout>
    );
};