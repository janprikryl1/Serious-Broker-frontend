import {FC} from "react";

type Props = {
  className?: string;
  href?: string;
  title: string;
};

export const LeftFloatingContactDetailsItem:FC<Props> = ({href, title, className=""}) => {
  return (
    <div className={className}>
      {/*
        inline-flex + min-h/py drží odkaz nad 24 px výšky a oddělí e-mail od
        telefonu. Bez toho je dotyková plocha jen výška řádku a Lighthouse to
        hlásí jako příliš malé místo dotyku.
      */}
      {href
        ? <a href={href} className="link-underline-none tw-inline-flex tw-items-center tw-min-h-[24px] tw-py-1.5">{title}</a>
        : title}
    </div>
  );
}