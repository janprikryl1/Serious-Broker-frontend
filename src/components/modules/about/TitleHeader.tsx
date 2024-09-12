import {FC} from 'react';

type Props = {
  title: string;
};

export const TitleHeader: FC<Props> = ({ title }) => {
  return (
      <section
          className="page-header bg--cover"
          style={{ backgroundImage: 'url(/images/header/1.png)' }}
      >
        <div className="container">
          <div
              className="page-header__content"
              data-aos="fade-right"
              data-aos-duration="1000"
          >
            <h2>{title}</h2>
          </div>
        </div>
      </section>
  );
};
