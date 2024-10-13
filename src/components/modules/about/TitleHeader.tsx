import {FC} from 'react';
import {useTranslation} from "react-i18next";
import HeaderImage from "../../../utils/icons/cta/1.png";

type Props = {
  title: string;
};

export const TitleHeader: FC<Props> = ({ title }) => {
  const {t} = useTranslation();
  
  return (
      <section
          className="page-header bg--cover"
          style={{ backgroundImage: `url(${HeaderImage})` }}
      >
        <div className="container">
          <div
              className="page-header__content"
              data-aos="fade-right"
              data-aos-duration="1000"
          >
            <h2>{t(title)}</h2>
          </div>
        </div>
      </section>
  );
};
