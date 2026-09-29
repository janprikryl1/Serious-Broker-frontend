import {FC} from "react";
import {useTranslation} from "react-i18next";

type SeasonButtonProps = {
    seasonValue: string;
    isActive: boolean;
    onSelect: () => void;
    disabled?: boolean;
};

export const SeasonButton: FC<SeasonButtonProps> = ({ seasonValue, isActive, onSelect, disabled = false }) => {
    const { t } = useTranslation();

    return (
        <button
            className={`season-button tw-flex tw-items-center tw-justify-center tw-rounded-lg tw-border tw-px-2 tw-py-1.5 tw-text-[10px] tw-font-medium tw-transition-colors tw-duration-200 sm:tw-px-3 sm:tw-py-2 sm:tw-text-xs md:tw-text-sm ${isActive ? "tw-border-yellow-400 tw-bg-yellow-500/10 tw-text-yellow-200 active" : "tw-border-stone-500/40 tw-bg-stone-900/40 tw-text-stone-300 hover:tw-border-stone-400 hover:tw-text-white"} ${disabled ? "tw-cursor-not-allowed tw-opacity-50" : ""}`}
            onClick={onSelect}
            disabled={disabled}
        >
            {t(seasonValue)}
        </button>
    );
};