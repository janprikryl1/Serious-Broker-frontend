import {FC} from "react";
import {Link} from "react-router-dom";

type Props = {
  href: string;
  icon: string;
};

export const SocialLinkIcon:FC<Props> = ({href, icon}) => {
  return (
      <li className="social__item">
          <Link to={href} className="social__link social__link--style4 active none"><i className={`fab ${icon}`}></i></Link>
      </li>
  );
}