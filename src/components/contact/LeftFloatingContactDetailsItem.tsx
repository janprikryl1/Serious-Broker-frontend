import {FC} from "react";

type Props = {
  href?: string;
  title: string;
};

export const LeftFloatingContactDetailsItem:FC<Props> = ({href, title}) => {
  return (
      <div className="contact__item-inner mb-2">
        <div className="contact__item-content">
            <p>
              {href ? <a href={href} className="link-underline-none">{title}</a> : title}
            </p>
        </div>
      </div>
  );
}