import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {FC} from "react";
import SwiperCore from "swiper";

const partnerData = [
  "Coming soon", // English
  "Již brzy", // Czech
  "Prochainement", // French
  "Demnächst", // German
  "Próximamente", // Spanish
  "Comming Soon", // Portuguese
  "In arrivo", // Italian
  "Netrukus", // Lithuanian
  "Vēlāk", // Latvian
  "Brzy k dispozici", // Slovak
  "Κυκλοφορεί σύντομα", // Greek
  "Ssoon uitgebracht", // Dutch
  "Coming soon", // Danish
  "Tulossa pian", // Finnish
  "Coming soon", // Swedish
  "Yakında geliyor", // Turkish
  "Скоро в продаже", // Russian
  "Hamarosan", // Hungarian
  "فريباً", // Persian (Farsi)
  "곧 출시", // Korean
  "もうすぐ発売", // Japanese
];


export const ComingSoon:FC = () => {
  SwiperCore.use([Autoplay, Navigation, Pagination]);


  const breakpoints = {
    576: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    992: { slidesPerView: 5, spaceBetween: 15 },
    1200: { slidesPerView: 6, spaceBetween: 25 },
  };

  return (
      <div className="partner">
        <div className="container">
          <div className="partner__wrapper">
            <Swiper
                className="partner__slider"
                spaceBetween={24}
                slidesPerView={2}
                breakpoints={breakpoints}
                speed={2000}
                loop={true}
                autoplay={{ delay: 1, disableOnInteraction: true }}
                modules={[Navigation, Pagination, Autoplay]}
            >
              {partnerData.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-slide">
                      <div className="partner__item">
                        <div className="partner__item-inner">
                          {item}
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