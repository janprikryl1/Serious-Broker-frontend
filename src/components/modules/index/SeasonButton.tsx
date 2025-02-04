import {FC} from "react";
import {useTranslation} from "react-i18next";

type SeasonButtonProps = {
    seasonValue: string;
    isActive: boolean;
    onSelect: () => void;
};

export const SeasonButton: FC<SeasonButtonProps> = ({ seasonValue, isActive, onSelect }) => {
    const { t } = useTranslation();
    return (
        <button
            className={`season-button ${isActive ? "active" : ""}`}
            onClick={onSelect}
        >
            {t(seasonValue)}
        </button>
    );
};