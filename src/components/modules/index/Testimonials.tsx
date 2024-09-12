import {FC, useRef} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Testimonial data array
const testimonialData = [
  {
    img: "/images/testimonial/1.png",
    alt: "testimonial image",
    name: "Dillion Megida",
    designation: "Trade Master",
    description:
        "The above testimonial is about Martha Chumo, who taught herself to code in one summer. This testimonial example works because it allows prospective customers to see themselves in Codeacademy’s current customer base.",
  },
  {
    img: "/images/testimonial/2.png",
    alt: "testimonial image",
    name: "Guy Hawkins",
    designation: "Trade Boss",
    description:
        "In the above testimonial, a customer named Jeanine shares her experience with Briogeo’s products. While the post is scattered with too many product mentions, it takes full advantage of its real estate by allowing the writer to tell",
  },
  {
    img: "/images/testimonial/6.png",
    alt: "testimonial image",
    name: "Roger Bentham",
    designation: "Trade Genius",
    description:
        "The above testimonial is about Martha Chumo, who taught herself to code in one summer. This testimonial example works because it allows prospective customers to see themselves in Codeacademy’s current customer base.",
  },
];

// Testimonial component
export const Testimonial: FC = () => {
  const swiperRef = useRef<any>(null);

  const breakpoints = {
    576: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
  };

  return (
      <section className="testimonial padding-top padding-bottom-style2 bg-color">
        <div className="container">
          <div className="section-header d-md-flex align-items-center justify-content-between">
            <div className="section-header__content">
              <h2 className="mb-15">
                Connect with <span>our Clients </span>
              </h2>
              <p className="mb-0">
                We love connecting with our clients to hear about their experiences and how we can improve.
              </p>
            </div>
            <div className="section-header__action">
              <div className="swiper-nav">
                <button
                    className="swiper-nav__btn testimonial__slider-prev"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                  <i className="fa-solid fa-angle-left"></i>
                </button>
                <button
                    className="swiper-nav__btn testimonial__slider-next active"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="testimonial__wrapper" data-aos="fade-up" data-aos-duration="1000">
            <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                spaceBetween={24}
                slidesPerView={1}
                speed={500}
                autoplay={{ delay: 3000 }}
                loop={true}
                grabCursor={true}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, Autoplay, A11y]}
                breakpoints={breakpoints}
            >
              {testimonialData.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="testimonial__item testimonial__item--style1">
                      <div className="testimonial__item-inner">
                        <div className="testimonial__item-content">
                          <p className="mb-0">{item.description}</p>
                          <div className="testimonial__footer">
                            <div className="testimonial__author">
                              <div className="testimonial__author-thumb">
                                <img src={item.img} alt={item.alt} />
                              </div>
                              <div className="testimonial__author-designation">
                                <h6>{item.name}</h6>
                                <span>{item.designation}</span>
                              </div>
                            </div>
                            <div className="testimonial__quote">
                          <span>
                            <i className="fa-solid fa-quote-right"></i>
                          </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
  );
};