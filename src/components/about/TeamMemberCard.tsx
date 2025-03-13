import { FC } from "react";
import userProfile from "../../utils/icons/about/user-profile.svg";
import {useTranslation} from "react-i18next";

type Props = {
    name: string;
    position: string;
    image?: string;
    description?: string;
};

export const TeamMemberCard: FC<Props> = ({ name, position, image, description }) => {
    const {t} = useTranslation();
    
    return (
        <section className="padding-top padding-bottom bg-color" style={{ width: 330, height:350, borderRadius: 10, textAlign: "center" }}>
            <img
                src={image ?? userProfile}
                alt={`Team Member ${name}`}
                width={120}
                height={120}
                style={{ borderRadius: "50%", objectFit: "cover", marginBottom:20 }}
            />
            <p style={{ fontSize: 23, fontWeight: 800, marginBottom:5 }}>{name}</p>
            <p style={{ fontSize: 20, fontWeight:500, marginBottom:5 }}>{t(position)}</p>
            {description && <p style={{ fontSize: 18, fontWeight:500 }}>{t(description)}</p>}
        </section>
    );
};
