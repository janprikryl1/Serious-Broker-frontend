import { FC } from "react";
import { useTranslation } from "react-i18next";
import { LeftFloatingContactDetailsItem } from "./LeftFloatingContactDetailsItem.tsx";
import {addFeedback} from "../../utils/api/feedbackService.ts";
import {contactEmail, phoneNumber} from "../../utils/constants";
import {CustomSwal} from "../../utils/functions/customSwal.ts";
import {WarningOfRisks} from "../navbar/WarningOfRisks.tsx";

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
        CustomSwal.fire({
          icon: "success",
          title: t("Success"),
          text: t("Message sent"),
        });
        if (event.currentTarget) event.currentTarget.reset();
      }
    } catch (error) {
      console.error(error);
      CustomSwal.fire({
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
            <div className="row">
              <div className="col-md-7">
                <h3>Serious Investment s.r.o.</h3>
                <p>Stanislavského 355</p>
                <p>721 00 Ostrava-Svinov</p>
                <p>Czech Republic</p>
                <br/>
                <p>IČ: 29456568</p>
                <p>DIČ: CZ29456568</p>
                <p>Datová schránka: gw2mvge</p>
                <br/>
                <p>Zapsána v obchodním rejstříku vedeném Krajským soudem v Ostravě oddíl C, vložka 54906</p>
                <br/>
              </div>
              <div className="col-md-5">
                <div className="contact__form">
                  <form onSubmit={handleSendMessage} data-aos="fade-left" data-aos-duration="1000">
                    <div className="row g-4">
                      <div className="input-group mb-3">
                        <input className="form-control" type="text" name="name" placeholder={t("Full Name")} required/>
                      </div>
                      <div className="input-group mb-3">
                        <input className="form-control" type="email" name="email" placeholder={t("Email here")}
                               required/>
                      </div>
                      <div className="input-group">
                        <textarea cols={30} rows={5} className="form-control" name="message"
                                  placeholder={t("Enter Your Message")} required></textarea>
                      </div>
                    </div>
                    <button type="submit" className="trk-btn trk-btn--border trk-btn--primary mt-4 d-block">
                      {t("Send")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="contact__details">
              <LeftFloatingContactDetailsItem href={`tel:${phoneNumber}`} title={phoneNumber}/>
              <LeftFloatingContactDetailsItem href={`mailto:${contactEmail}`} title={contactEmail}/>
            </div>
          </div>
          <br />
          <WarningOfRisks />
        </div>
      </div>
  );
};
