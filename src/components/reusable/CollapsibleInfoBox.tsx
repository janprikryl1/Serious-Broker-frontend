import { FC, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {Button, ButtonColor} from "./Button.tsx";
import {GlassCard} from "./GlassCard.tsx";

type Props = {
  title: string;
  initialText: string;
  children: ReactNode; // Hidden content
  className?: string;
  bgColor?: string;
  opacity?: number;
  blur?: number;
  borderRadius?: number;
}
export const CollapsibleInfoBox: FC<Props> = ({ title, initialText, children, className = "", bgColor = "var(--secondary-color)", opacity = 0.6, borderRadius, blur }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <GlassCard className={`info-box ${isExpanded ? "expanded" : "collapsed"} ${className}`} bgColor={bgColor} opacity={opacity} blur={blur} borderRadius={borderRadius}>
      <h5>{title}</h5>

      <p>{initialText}</p>

      <div className="expandable-content">
        {children}
      </div>

      <div className="tw-flex tw-items-center tw-justify-center">
        <Button
          color={ButtonColor.gold}
          onClick={() => setIsExpanded(!isExpanded)}
          className="primary tw-px-10"
        >
          {isExpanded ? t("Read less") : t("Read more")}
        </Button>
      </div>
    </GlassCard>
  );
};