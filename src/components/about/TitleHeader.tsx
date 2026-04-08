import {FC} from 'react';
import {useTranslation} from "react-i18next";
import HeaderImage from "../../utils/icons/cta/sticks_graph.webp";
import {coinURL} from "../../utils/constants";

type Props = {
  title: string;
  title2?: string;
  text?: string;
  img?: string;
};

export const TitleHeader: FC<Props> = ({title, title2 = "", text = "", img = ""}) => {
  const {t} = useTranslation();

  return (
    <div className="container">
      <section className="page-header shadow bg--cover mb-5" style={{backgroundImage: `url(${HeaderImage})`}}>
        <div
          className="page-header__content"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          {img ? <img
            src={img}
            alt={""}
            /*style={{
              width: "70px",
              height: "70px",
              objectFit: "contain",
              marginBottom: "15px"
            }}
            onError={(e) => (e.currentTarget.src = "/fallback-coin.png")}*/
          /> : null }
          <div style={{display: "flex", gap: "20px", alignItems: "baseline"}}>
            <h2>{t(title)}</h2>
            {title2 && <h2 className={"secondary-title"}>{title2}</h2>}
          </div>
          {text ? <small>{t(text)}</small> : null}
        </div>
      </section>
    </div>
  );
};