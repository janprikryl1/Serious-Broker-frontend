import { FC } from "react";
import { useTranslation } from "react-i18next";
import { LeftFloatingContactDetailsItem } from "./LeftFloatingContactDetailsItem.tsx";
import { SocialLinkIcon } from "./SocialLinkIcon.tsx";
import headerImage4 from "../../../utils/icons/contact/4.png";

export const ContactCard: FC = () => {
  const { t } = useTranslation();

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form submission
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    console.log(name, email, message);

    // You can add logic here to send the data to a server or show a success message
  };

  return (
      <div className="contact padding-top padding-bottom">
        <div className="container">
          <div className="contact__wrapper">
            <div className="row g-5">
              <div className="col-md-5">
                <div className="contact__info" data-aos="fade-right" data-aos-duration="1000">
                  <div className="contact__social">
                    <h3>{t("Welcome")}, <span>{t("Send us message")}</span>.</h3>
                    <ul className="social">
                      <SocialLinkIcon href="#" icon="fab fa-facebook-f" />
                      <SocialLinkIcon href="#" icon="fab fa-instagram" />
                      <SocialLinkIcon href="#" icon="fa-brands fa-linkedin-in" />
                      <SocialLinkIcon href="#" icon="fab fa-youtube" />
                      <SocialLinkIcon href="#" icon="fab fa-twitter" />
                    </ul>
                  </div>
                  <div className="contact__details">
                    <LeftFloatingContactDetailsItem href="tel:+440" title="+420........." />
                    <LeftFloatingContactDetailsItem href="mailto:pri0207@vsb.cz" title="pri0207@vsb.cz" />
                    <LeftFloatingContactDetailsItem title="VŠB - Technická univerzita Ostrava" />
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="contact__form">
                  <form onSubmit={handleSendMessage} data-aos="fade-left" data-aos-duration="1000">
                    <div className="row g-4">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="name">{t("Name")}</span>
                        </div>
                        <input className="form-control" type="text" id="name" name="name" placeholder={t("Full Name")} />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="email">Email</span>
                        </div>
                        <input className="form-control" type="email" id="email" name="email" placeholder={t("Email here")} />
                      </div>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" style={{ height: "100%" }}>{t("Message")}</span>
                        </div>
                        <textarea cols={30} rows={5} className="form-control" id="textarea" name="message" placeholder={t("Enter Your Message")}></textarea>
                      </div>
                    </div>
                    <button type="submit" className="trk-btn trk-btn--border trk-btn--primary mt-4 d-block">
                      {t("Send")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact__shape">
        <span className="contact__shape-item contact__shape-item--1">
          <img src={headerImage4} alt="shape-icon" />
        </span>
          <span className="contact__shape-item contact__shape-item--2">
          <span></span>
        </span>
        </div>
      </div>
  );
};
