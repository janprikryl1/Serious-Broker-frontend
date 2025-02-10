import { FC } from "react";
import { useTranslation } from "react-i18next";
import { LeftFloatingContactDetailsItem } from "./LeftFloatingContactDetailsItem.tsx";
import { SocialLinkIcon } from "./SocialLinkIcon.tsx";
import shibaInu from "../../../utils/icons/cta/shiba_inu.webp";
import { addFeedback } from "../../../api/feedbackService.ts";
import Swal from "sweetalert2";
import {
  contactEmail,
  facebookURL,
  instagramURL,
  linkedinURL,
  phoneNumber,
  twitterURL,
  youtubeURL
} from "../../../utils/constants";

export const ContactCard: FC = () => {
  const { t } = useTranslation();

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") ?? "").toString();
    const email = (formData.get("email") ?? "").toString();
    const message = (formData.get("message") ?? "").toString();

    try {
      const response = await addFeedback({ name, email, message });
      if (response.data.message === "Message created") {
        Swal.fire({
          icon: "success",
          title: t("Success"),
          text: t("Message sent"),
        });
        if (event.currentTarget) event.currentTarget.reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: t("Failed"),
        text: t("Please try again later"),
      });
    }
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
                      <SocialLinkIcon href={facebookURL} icon="fab fa-facebook-f" />
                      <SocialLinkIcon href={instagramURL} icon="fab fa-instagram" />
                      <SocialLinkIcon href={linkedinURL} icon="fa-brands fa-linkedin-in" />
                      <SocialLinkIcon href={youtubeURL} icon="fab fa-youtube" />
                      <SocialLinkIcon href={twitterURL} icon="fab fa-x-twitter" />
                    </ul>
                  </div>
                  <div className="contact__details">
                    <LeftFloatingContactDetailsItem href={`tel:${phoneNumber}`} title={phoneNumber} />
                    <LeftFloatingContactDetailsItem href={`mailto:${contactEmail}`} title={contactEmail} />
                    <LeftFloatingContactDetailsItem title="VŠB - Technická univerzita Ostrava" />
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="contact__form">
                  <form onSubmit={handleSendMessage} data-aos="fade-left" data-aos-duration="1000">
                    <div className="row g-4">
                      <div className="input-group mb-3">
                        <input className="form-control" type="text" name="name" placeholder={t("Full Name")} required />
                      </div>
                      <div className="input-group mb-3">
                        <input className="form-control" type="email" name="email" placeholder={t("Email here")} required />
                      </div>
                      <div className="input-group">
                        <textarea cols={30} rows={5} className="form-control" name="message" placeholder={t("Enter Your Message")} required></textarea>
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
          <img src={shibaInu} alt="shape-icon" />
        </span>
          <span className="contact__shape-item contact__shape-item--2">
          <span></span>
        </span>
        </div>
      </div>
  );
};
