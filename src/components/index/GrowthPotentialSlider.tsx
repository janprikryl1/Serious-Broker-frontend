import { FC, useRef } from "react";
import {Trans, useTranslation} from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import {GlassCard} from "../reusable/GlassCard.tsx";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {Button} from "../reusable/Button.tsx";
import {routes} from "../../utils/constants";

export const GrowthPotentialSlider: FC = () => {
    const { t } = useTranslation();
    const swiperRef = useRef<SwiperType | null>(null);

    const cardsData = [
        { id: 1, name: "1", symbol: "BTC", gain: "+ 1 234 €", total: "2 234 €" },
        { id: 2, name: "2", symbol: "ETH", gain: "+ 2 450 €", total: "3 450 €" },
        { id: 3, name: "3", symbol: "SOL", gain: "+ 890 €", total: "1 890 €" },
        { id: 4, name: "4", symbol: "ADA", gain: "+ 420 €", total: "1 420 €" },
        { id: 5, name: "5", symbol: "SHIB", gain: "+ 421 €", total: "1 421 €" },
    ];

    const slides = cardsData.length < 10 ? [...cardsData, ...cardsData] : cardsData;

    return (
        <section className="tw-relative tw-w-full tw-overflow-hidden tw-pt-16">
            <div className="container-xxl tw-mb-8 tw-mt-8">
                <h6 className="tw-text-secondary tw-font-normal tw-text-base tw-tracking-normal tw-pb-0 tw-pt-5">
                    {t("HISTORICAL INSIGHT")}
                </h6>
                <h2 className="index-section-head-title">
                    {t("Growth Potential")}
                </h2>
            </div>

            {/* Carousel wrapper */}
            <div className="tw-relative tw-w-full">
                {/* Left gradient + arrow */}
                <div className="tw-absolute tw-left-0 tw-top-0 tw-bottom-0 tw-z-10 tw-flex tw-items-center tw-justify-start tw-p-0 tw-w-24 sm:tw-w-40 tw-bg-gradient-to-r tw-from-primary tw-via-primary tw-to-transparent tw-pointer-events-none">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="tw-pointer-events-auto tw-flex tw-h-24 tw-w-24 tw-items-center tw-justify-center tw-bg-transparent tw-border-0 tw-text-white hover:tw-text-white transition-all hover:tw-scale-110 active:tw-scale-95"
                        aria-label="Previous slide"
                    >
                        <FiChevronLeft size={80} style={{ strokeWidth: "1px" }} />
                    </button>
                </div>

                {/* Right gradient + arrow */}
                <div className="tw-absolute tw-right-0 tw-top-0 tw-bottom-0 tw-z-10 tw-flex tw-items-center tw-justify-end tw-p-0 tw-w-24 sm:tw-w-40 tw-bg-gradient-to-l tw-from-primary tw-via-primary tw-to-transparent tw-pointer-events-none">
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="tw-pointer-events-auto tw-flex tw-h-24 tw-w-24 tw-items-center tw-justify-center tw-bg-transparent tw-border-0 tw-text-white hover:tw-text-white transition-all hover:tw-scale-110 active:tw-scale-95"
                        aria-label="Next slide"
                    >
                        <FiChevronRight size={80} style={{ strokeWidth: "1px" }} />
                    </button>
                </div>

                <Swiper
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    modules={[Navigation, Autoplay]}
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    centeredSlidesBounds={false}
                    spaceBetween={55}
                    loop={true}
                    speed={800}
                    grabCursor={true}
                    autoplay={{
                        delay: 5500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    className="growth-swiper !tw-overflow-visible"
                >
                    {slides.map((card, index) => (
                        <SwiperSlide
                            key={`${card.id}-${index}`}
                            className="!tw-w-[380px] sm:!tw-w-[550px]"
                        >
                            <GlassCard bgColor="var(--true-black)" opacity={0.2}>
                                <div className="tw-p-6 tw-flex tw-flex-col tw-gap-4">
                                    <div className="tw-flex tw-items-baseline tw-gap-2">
                                        <span className="tw-text-3xl tw-font-bold tw-text-white">{card.name}</span>
                                        <span className="tw-text-xl tw-font-medium tw-text-secondary">{card.symbol}</span>
                                    </div>

                                    <p className="tw-text-base sm:tw-text-xl tw-text-gray-2 tw-m-0">
                                        {/*{t("invested_text", { amount: "1 000 €", when: "před 30 dny" })}*/}
                                        <Trans
                                            i18nKey="invested_text"
                                            values={{ amount: "1 000 €", when: "před 30 dny" }}
                                            components={[<span key="0" className="tw-text-secondary" />]}
                                        />
                                    </p>

                                    <div className="tw-text-center tw-py-2">
                                        <div className="tw-text-4xl sm:tw-text-6xl tw-font-bold tw-text-secondary">
                                            {card.gain}
                                        </div>
                                        <div className="tw-text-base sm:tw-text-xl tw-text-gray-2 tw-mt-1">
                                            {t("Today you would have")}: {card.total}
                                        </div>
                                    </div>

                                    <hr className="tw-border-white tw-m-0" />

                                    <div className="tw-flex tw-justify-between tw-items-center tw-text-xl">
                                        <span className="tw-text-gray-2">{t("Deposit")}</span>
                                        <div className="tw-flex tw-items-center tw-gap-1 tw-text-white tw-font-medium">
                                            <span>1 000 €</span>
                                            <svg className="tw-w-6 tw-h-6 tw-text-gray-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="container tw-text-center tw-pt-14 tw-mt-3">
                <p className="tw-text-xl">{t("Want to see other cryptocurrencies?")}</p>
                <Button type="link" to={routes.cryptoCalculator}>
                    {t("Try calculator")}
                </Button>
            </div>
        </section>
    );
};