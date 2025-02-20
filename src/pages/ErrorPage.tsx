import {FC} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {routes} from "../utils/constants";
import {TitleHeader} from "../components/about/TitleHeader.tsx";

export const ErrorPage:FC = () => {
  const {t} = useTranslation();
  
  return (
    <>
      <TitleHeader title="404" />
      <div className="error padding-top padding-bottom ">
        <div className="container">
          <div className="error__wrapper">
            <div data-aos="fade-up" data-aos-duration="800">
              <div className="error__content text-center">
                <h2>
                  <span>ooops!</span> {t("page not found")}
                </h2>
                <Link
                  to={routes.home}
                  className="trk-btn trk-btn--border trk-btn--primary"
                >
                  {t("Back to home")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};