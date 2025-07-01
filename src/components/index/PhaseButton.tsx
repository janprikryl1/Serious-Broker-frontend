import { useTranslation } from "react-i18next";
import { FC } from "react";

type Props = {
    text: string;
    index: number;
    className?: string;
    isSelected: boolean;
    onClick: () => void;
}

export const PhaseButton:FC<Props> = ({ text, index, className, isSelected, onClick }) => {
    const {t} = useTranslation();

    return (
        <button
            key={index}
            className={`gf-option-button ${className} ${isSelected ? 'gf-option-button-active' : ''}`}
            onClick={onClick}
        >
            <span className="gf-option-number">{index + 1}</span>
            <span>{t(text)}</span>
        </button>
    );
}