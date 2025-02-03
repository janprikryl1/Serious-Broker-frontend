import {FC} from "react";
import {Link} from "react-router-dom";

type Props = {
  href: string;
  icon: string;
};

export const SocialLinkIcon:FC<Props> = ({href, icon}) => {
  return (
      <li className="social__item">
          <Link to={href} style={{width: "50px", height:"50px", borderWidth:3}} className="social__link social__link--style4 active link-underline-none"><i className={`fab ${icon}`} style={{fontSize: 30}}></i></Link>
      </li>
  );
}