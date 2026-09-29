import {FC} from "react";

type Props = {
  className?: string;
  href?: string;
  title: string;
};

export const LeftFloatingContactDetailsItem:FC<Props> = ({href, title, className=""}) => {
  return (
    <div className={className}>
      {href ? <a href={href} className="link-underline-none">{title}</a> : title}
    </div>
  );
}