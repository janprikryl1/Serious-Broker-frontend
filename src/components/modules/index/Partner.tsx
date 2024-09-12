import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {FC} from "react";
import SwiperCore from "swiper";

const partnerData = [
  { img: "/images/partner/light/1.png", alt: "partner logo" },
  { img: "/images/partner/light/2.png", alt: "partner logo" },
  { img: "/images/partner/light/3.png", alt: "partner logo" },
  { img: "/images/partner/light/4.png", alt: "partner logo" },
  { img: "/images/partner/light/5.png", alt: "partner logo" },
  { img: "/images/partner/light/1.png", alt: "partner logo" },
  { img: "/images/partner/light/2.png", alt: "partner logo" },
  { img: "/images/partner/light/3.png", alt: "partner logo" },
  { img: "/images/partner/light/4.png", alt: "partner logo" },
  { img: "/images/partner/light/5.png", alt: "partner logo" },
  { img: "/images/partner/light/1.png", alt: "partner logo" },
  { img: "/images/partner/light/2.png", alt: "partner logo" },
  { img: "/images/partner/light/3.png", alt: "partner logo" },
  { img: "/images/partner/light/4.png", alt: "partner logo" },
  { img: "/images/partner/light/5.png", alt: "partner logo" },
];

export const Partner:FC = () => {
  SwiperCore.use([Autoplay, Navigation, Pagination]);


  const breakpoints = {
    576: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    992: { slidesPerView: 5, spaceBetween: 15 },
    1200: { slidesPerView: 6, spaceBetween: 25 },
  };

  return (
      <div className="partner partner--gradient">
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
                          <img src={item.img} alt={item.alt} className="dark" />
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