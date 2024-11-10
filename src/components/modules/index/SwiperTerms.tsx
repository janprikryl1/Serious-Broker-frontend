import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FC, useEffect, useState, useMemo } from "react";
import SwiperCore from "swiper";
import { randomGlossary } from "../../../api/glossaryService.ts";
import { useTranslation } from "react-i18next";
import { GlossaryType } from "../../../utils/types/GlossaryType.ts";
import { Link } from "react-router-dom";

export const SwiperTerms: FC = () => {
  const [glossary, setGlossary] = useState<GlossaryType[]>([]);
  const { i18n } = useTranslation();
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await randomGlossary();
        if (!result) return;
        setGlossary(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const isCzech = useMemo(() => i18n.resolvedLanguage === "cs", [i18n.resolvedLanguage]);

  return (
      <div className="partner">
        <div className="container">
          <div className="partner__wrapper">
            <Swiper
                className="partner__slider"
                spaceBetween={24}
                slidesPerView={3}
                speed={2000}
                loop={true}
                autoplay={{ delay: 1, disableOnInteraction: true }}
                modules={[Navigation, Pagination, Autoplay]}
            >
              {glossary.map((glossaryItem) => (
                  <SwiperSlide key={glossaryItem.id}>
                    <div className="swiper-slide">
                      <div className="partner__item">
                        <div className="partner__item-inner">
                          <Link to={`/dictionary#${glossaryItem.title}`} className="link-underline-none text-white">
                            {isCzech ? glossaryItem.title_cs : glossaryItem.title} : {(isCzech ? glossaryItem.answer_cs : glossaryItem.answer).substring(0, 30)}...
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
  );
};
