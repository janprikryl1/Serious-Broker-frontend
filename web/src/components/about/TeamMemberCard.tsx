import { FC } from "react";
import {useTranslation} from "react-i18next";
import {GlassCard} from "../reusable/GlassCard.tsx";

type Props = {
    name: string;
    position: string;
    image?: string;
    description?: string;
};

export const TeamMemberCard: FC<Props> = ({ name, position, image, description }) => {
    const {t} = useTranslation();
    
    return (
      <GlassCard bgColor={"var(--true-black)"} className="tw-h-full tw-pb-6">
        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-h-full tw-text-white tw-p-4">
          <p className="tw-font-bold tw-text-2xl">{name}</p>
          <span className="tw-text-stone-300">
            <p>{t(position)}</p>
            {description && <p>{t(description)}</p>}
          </span>
        </div>
      </GlassCard>
    );
};
