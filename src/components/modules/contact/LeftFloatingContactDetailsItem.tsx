import {FC} from "react";

type Props = {
  href?: string;
  title: string;
};

export const LeftFloatingContactDetailsItem:FC<Props> = ({href, title}) => {
  return (
      <div className="contact__item" data-aos="fade-right" data-aos-duration="1000">
        <div className="contact__item-inner">
          <div className="contact__item-content">
            <p>
              {href ? <a href={href} className="none">{title}</a> : title}
            </p>
          </div>
        </div>
      </div>
  );
}