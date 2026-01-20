import {FC} from "react";
import {useTranslation} from "react-i18next";

type SeasonButtonProps = {
    seasonValue: string;
    isActive: boolean;
    onSelect: () => void;
    disabled: boolean;
};

export const SeasonButton: FC<SeasonButtonProps> = ({ seasonValue, isActive, onSelect, disabled = false }) => {
    const { t } = useTranslation();
    return (
        <button
            className={`season-button ${isActive ? "active" : ""}`}
            onClick={onSelect}
            disabled={disabled}
        >
            {t(seasonValue)}
        </button>
    );
};