import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import Swal from "sweetalert2";
import {addNewsletter} from "../../../api/newsletterService.ts";

export const Newsletter: FC = () => {
  const {t} = useTranslation();
  const [email, setEmail] = useState("");
  
  const handleAddNewsletter = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: t("Error"),
        text: t("Invalid email or password. Please try again"),
      });
      return;
    }
    
    const sendNewsletter = async () => {
      try {
        const response = await addNewsletter({email});
        if (response.data.message === "Email successfully added") {
          Swal.fire({
            icon: "success",
            title: t("Success"),
            text: t("Your newsletter has been sent successfully."),
          });
          setEmail("");
        } else if (response.data.message === "Email already exists") {
          Swal.fire({
            icon: "error",
            title: t("Error"),
            text: t("This email is already subscribed."),
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: t("Failed"),
          text: t("Please try again later."),
        });
      }
    };
    sendNewsletter();
  };
  
  return (
      <section className="cta padding-top padding-bottom bg-color">
          <div className="cta__wrapper">
            <div className="cta__newsletter d-flex row">
              <div className="col-sm-6" style={{marginRight:30}}>
                <h2>{t("Investing Made Easy")}</h2>
                <ul className="newsletter-list">
                  <li>{t("We will create a full-step guide on investing just for you.")}</li>
                  <li>{t("Get recommendations on what to buy, when to buy and when to sell.")}</li>
                  <li>{t("You are in control – execute transactions based on our detailed guide.")}</li>
                </ul>
              </div>
              <div
                  className="col-sm cta__newsletter-inner text-center"
                  data-aos="fade-up"
                  data-aos-duration="1000"
              >
                <div className="cta__subscribe">
                  <h2 style={{fontSize: "28px", marginBottom: 20}}>{t("Get a guide just for you!")}</h2>
                  <div>
                    <input
                        type="email"
                        style={{backgroundColor:"white", border:"none", borderRadius:3, maxWidth:"500px", color:"black"}}
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button className="trk-btn trk-btn--secondary2 mt-3" style={{borderRadius:3, fontSize:20}}
                          onClick={handleAddNewsletter}>{t("Register")}</button>
                </div>
              </div>
            </div>
          </div>
      </section>
  );
};
