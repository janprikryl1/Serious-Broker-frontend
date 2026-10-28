import {FC, useEffect, useRef, useState} from "react";
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
import {GrowthPotentialType} from "../../utils/types/growthPotential/GrowthPotentialType.ts";
import {getGrowthPotential} from "../../utils/api/growthPotentialService.ts";
import Skeleton from "react-loading-skeleton";

export const GrowthPotentialSlider: FC = () => {
    const { t, i18n } = useTranslation();
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat(i18n.language).format(num);
    };
    const swiperRef = useRef<SwiperType | null>(null);
    const [data, setData] = useState<GrowthPotentialType | null>(null);
    const [duplicatedData, setDuplicatedData] = useState<GrowthPotentialType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const ensureMinSlides = <T,>(items: T[], minCount = 10): T[] => {
        if (!items || items.length === 0) return [];
        let result = [...items];
        while (result.length < minCount) {
            result = [...result, ...items];
        }
        return result;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getGrowthPotential();
                const resData = response.data;
                setData(resData);

                if (resData && resData.performers) {
                    setDuplicatedData({
                        ...resData,
                        // performers: [...resData.performers, ...resData.performers]
                        performers: ensureMinSlides(resData.performers, 10)
                    });
                }

            } catch (err) {
                console.error("Chyba pri načítavaní growth potential:", err);
                setError("Nepodarilo sa načítať dáta.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="tw-relative tw-w-full tw-overflow-hidden tw-pt-10 sm:tw-pt-14 lg:tw-pt-16">
            <div className="container tw-mb-6 tw-mt-6 tw-px-4 sm:tw-mb-8 sm:tw-mt-8 sm:tw-px-6">
                <p className="tw-mb-2 tw-pb-0 tw-pt-3 tw-text-xs tw-font-normal tw-tracking-normal tw-text-secondary tw-font-['Sora'] sm:tw-text-base">
                    {t("HISTORICAL INSIGHT")}
                </p>
                <h2 className="index-section-head-title tw-text-2xl sm:tw-text-3xl md:tw-text-5xl lg:tw-text-6xl">
                    {t("Growth Potential")}
                </h2>
            </div>

            {/* Carousel wrapper */}
            <div className="tw-relative tw-w-full">
                {/* Left gradient + arrow */}
                <div className="tw-absolute tw-left-0 tw-top-0 tw-bottom-0 tw-z-10 tw-flex tw-items-center tw-justify-start tw-p-0 tw-w-14 sm:tw-w-24 md:tw-w-40 tw-bg-transparent [@media(min-width:390px)]:tw-bg-gradient-to-r [@media(min-width:390px)]:tw-from-primary [@media(min-width:390px)]:tw-via-primary [@media(min-width:390px)]:tw-to-transparent tw-pointer-events-none">
                    <button
                      onClick={() => swiperRef.current?.slidePrev()}
                      className="tw-pointer-events-auto tw-flex tw-h-12 tw-w-12 sm:tw-h-16 sm:tw-w-16 md:tw-h-24 md:tw-w-24 tw-items-center tw-justify-center tw-bg-transparent tw-border-0 tw-text-white hover:tw-text-white transition-all hover:tw-scale-110 active:tw-scale-95"
                      aria-label="Previous slide"
                    >
                        <FiChevronLeft
                          className="tw-w-10 tw-h-10 sm:tw-w-12 sm:tw-h-12 md:tw-w-20 md:tw-h-20"
                          style={{ strokeWidth: "1px" }}
                        />
                    </button>
                </div>

                {/* Right gradient + arrow */}
                <div className="tw-absolute tw-right-0 tw-top-0 tw-bottom-0 tw-z-10 tw-flex tw-items-center tw-justify-end tw-p-0 tw-w-14 sm:tw-w-24 md:tw-w-40 tw-bg-transparent [@media(min-width:390px)]:tw-bg-gradient-to-l [@media(min-width:390px)]:tw-from-primary [@media(min-width:390px)]:tw-via-primary [@media(min-width:390px)]:tw-to-transparent tw-pointer-events-none">
                    <button
                      onClick={() => swiperRef.current?.slideNext()}
                      className="tw-pointer-events-auto tw-flex tw-h-12 tw-w-12 sm:tw-h-16 sm:tw-w-16 md:tw-h-24 md:tw-w-24 tw-items-center tw-justify-center tw-bg-transparent tw-border-0 tw-text-white hover:tw-text-white transition-all hover:tw-scale-110 active:tw-scale-95"
                      aria-label="Next slide"
                    >
                        <FiChevronRight
                          className="tw-w-10 tw-h-10 sm:tw-w-12 sm:tw-h-12 md:tw-w-20 md:tw-h-20"
                          style={{ strokeWidth: "1px" }}
                        />
                    </button>
                </div>

                {duplicatedData?.performers && duplicatedData.performers.length > 0 ? (
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
                    {duplicatedData?.performers?.map((asset, index) => (
                        <SwiperSlide
                            key={`${asset.asset_id}-${index}`}
                            className="!tw-w-[280px] sm:!tw-w-[420px] lg:!tw-w-[550px]"
                        >
                            <GlassCard bgColor="var(--true-black)" opacity={0.2} shrinkPadding={true}>
                                <div className="tw-flex tw-flex-col tw-gap-3 tw-p-4 sm:tw-gap-4 sm:tw-p-6">
                                    <div className="tw-flex tw-items-baseline tw-gap-2">
                                        <span className="tw-text-xl tw-font-bold tw-text-white sm:tw-text-3xl">{asset.name}</span>
                                        <span className="tw-text-sm tw-font-medium tw-text-secondary sm:tw-text-xl">{asset.symbol}</span>
                                    </div>

                                    <p className="tw-m-0 tw-text-sm tw-text-gray-2 sm:tw-text-base lg:tw-text-xl">
                                        <Trans
                                            i18nKey="invested_text"
                                            values={{ amount: formatNumber(asset.investment_eur), when: t(`period.${asset.period}`) }}
                                            components={[<span key="0" className="tw-text-secondary" />]}
                                        />
                                    </p>

                                    <div className="tw-py-2 tw-text-center">
                                        <div className="tw-text-2xl tw-font-bold tw-text-secondary sm:tw-text-4xl lg:tw-text-6xl">
                                            <Trans
                                              i18nKey="invested_profit"
                                              values={{ profit: formatNumber(asset.profit_eur) }}
                                            />
                                        </div>
                                        <div className="tw-mt-1 tw-text-sm tw-text-gray-2 sm:tw-text-base lg:tw-text-xl">
                                            <Trans
                                              i18nKey="invested_text_profit"
                                              values={{ profit: formatNumber(asset.profit_eur + asset.investment_eur) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
                ) : (
                  // TODO: loading skeleton
                  // <div className="tw-h-[260px]" />
                  <GlassCard bgColor="var(--true-black)" opacity={0.2}>
                      <Skeleton height={200} />
                      ahoj
                  </GlassCard>
                )}
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