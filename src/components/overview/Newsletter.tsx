import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Button, ButtonColor} from "../reusable/Button.tsx";
import "../../styles/sass/components/newsletter.scss";
import {useNewsletter} from "../../utils/hooks/useNewsletter.ts";


export const Newsletter: FC = () => {
  const {t} = useTranslation();
  const {handleAddNewsletter, email, setEmail} = useNewsletter();
  
  return (
      <section className="cta padding-top padding-bottom bg-color">
          <div className="cta__wrapper">
            <div className="d-flex row">
              <div className="col-sm-6 newsletter-wrapper">
                <h2 className="bg-color" style={{fontSize: "35px"}}>{t("Investing Made Easy")}</h2>
              <ul className="newsletter-list">
                  <li>{t("We will create a full-step guide on investing just for you.")}</li>
                  <li>{t("Get recommendations on what to buy, when to buy and when to sell.")}</li>
                  <li>{t("You are in control – execute transactions based on our detailed guide.")}</li>
                </ul>
              </div>
              <div className="col-sm cta__newsletter-inner text-center">
                <div className="cta__subscribe">
                  <h2 className="guide-title">{t("Get a guide just for you!")}</h2>
                  <div>
                    <input
                        className="register-input"
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button className="trk-btn trk-btn--secondary2 mt-3 register-button" onClick={handleAddNewsletter} color={ButtonColor.white}>
                    {t("Register")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
      </section>
  );
};
