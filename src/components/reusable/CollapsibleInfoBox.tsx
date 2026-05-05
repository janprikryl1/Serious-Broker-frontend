import { FC, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {Button, ButtonColor} from "./Button.tsx";

type Props = {
  title: string;
  initialText: string;
  children: ReactNode; // Hidden content
  className?: string;
}

export const CollapsibleInfoBox: FC<Props> = ({title, initialText, children, className = ""}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`info-box ${isExpanded ? "expanded" : "collapsed"} ${className}`}>
      <h5 className="info-box-heading">{title}</h5>

      <p className="info-box-text">
        {initialText}
      </p>

      <div className="expandable-content">
        {children}
      </div>

      <Button color={ButtonColor.lightBrown} onClick={() => setIsExpanded(!isExpanded)} style={{fontWeight: "400px"}}>{isExpanded ? t("Read less") : t("Read more")}</Button>
    </div>
  );
};