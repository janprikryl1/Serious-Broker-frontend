import {FC} from 'react';
import {useTranslation} from "react-i18next";
import HeaderImage from "../../utils/icons/cta/sticks_graph.webp";

type Props = {
  title: string;
  text?: string;
};

export const TitleHeader: FC<Props> = ({ title, text = "" }) => {
  const {t} = useTranslation();

  return (
      <div className="container">
          <section className="page-header bg--cover" style={{backgroundImage: `url(${HeaderImage})`}}>
            <div
                className="page-header__content"
                data-aos="fade-right"
                data-aos-duration="1000"
            >
              <h2>{t(title)}</h2>
              <small>{t(text)}</small>
            </div>
          </section>
      </div>
  );
};