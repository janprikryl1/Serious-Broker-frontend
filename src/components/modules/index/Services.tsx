import React from "react";
import { Link } from "react-router-dom";

export const Services: React.FC = () => {
  return (
      <section className="service padding-top padding-bottom">
        <div className="section-header section-header--max50">
          <h2 className="mb-15 mt-minus-5">
            <span>services </span>We offer
          </h2>
          <p>
            We offer the best services around - from installations to repairs, maintenance, and more!
          </p>
        </div>
        <div className="container">
          <div className="service__wrapper">
            <div className="row g-4 align-items-center">
              {[
                {
                  title: "Strategy Consulting",
                  description:
                      "A social assistant that's flexible can accommodate your schedule and needs, making life easier.",
                  img: "/images/service/1.png",
                  animationDuration: 800,
                },
                {
                  title: "Financial Advisory",
                  description:
                      "Modules transform smart trading by automating processes and improving decision-making.",
                  img: "/images/service/2.png",
                  animationDuration: 1000,
                },
                {
                  title: "Management",
                  description:
                      "There, it's me, your friendly neighborhood reporter's news analyst processes and improving.",
                  img: "/images/service/3.png",
                  animationDuration: 1200,
                },
                {
                  title: "Supply Optimization",
                  description:
                      "Hey, have you checked out that new cryptocurrency platform? It's pretty cool and easy to use!",
                  img: "/images/service/4.png",
                  animationDuration: 800,
                },
                {
                  title: "HR Consulting",
                  description:
                      "Hey guys, just a quick update on exchange orders. There have been some changes currency!",
                  img: "/images/service/5.png",
                  animationDuration: 1000,
                },
                {
                  title: "Marketing Consulting",
                  description:
                      "Hey! Just wanted to let you know that the price notification module processes is now live!",
                  img: "/images/service/6.png",
                  animationDuration: 1200,
                },
              ].map((service, index) => (
                  <div className="col-sm-6 col-md-6 col-lg-4" key={index}>
                    <div
                        className="service__item service__item--style1"
                        data-aos="fade-up"
                        data-aos-duration={service.animationDuration}
                    >
                      <div className="service__item-inner text-center">
                        <div className="service__item-thumb mb-30">
                          <img className="dark" src={service.img} alt="service-icon" />
                        </div>
                        <div className="service-content">
                          <h5 className="mb-15">
                            <Link to="/service-details" className="stretched-link">
                              {service.title}
                            </Link>
                          </h5>
                          <p className="mb-0">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};
