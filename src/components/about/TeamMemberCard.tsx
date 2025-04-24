import { FC } from "react";
import userProfile from "../../utils/icons/about/user-profile.svg";
import {useTranslation} from "react-i18next";
import "../../styles/sass/components/team-member-card.scss";

type Props = {
    name: string;
    position: string;
    image?: string;
    description?: string;
};

export const TeamMemberCard: FC<Props> = ({ name, position, image, description }) => {
    const {t} = useTranslation();
    
    return (
        <section className="padding-top padding-bottom bg-color team-member-card-section">
            <img
                src={image ?? userProfile}
                alt={`Team Member ${name}`}
                width={120}
                height={120}
                className="team-member-card-img"
            />
            <p className="team-member-card-name">{name}</p>
            <p className="team-member-card-position">{t(position)}</p>
            {description && <p className="team-member-card-description">{t(description)}</p>}
        </section>
    );
};
