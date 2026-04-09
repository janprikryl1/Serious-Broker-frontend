import {CSSProperties, FC} from "react";
import {SearchBar} from "./SearchBar.tsx";
import {Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";

type Props = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    style?: CSSProperties;
}

export const Checkbox: FC<Props> = ({checked, onChange, label, style}) => {
    const { t } = useTranslation();

    return (
        <>
            <label className="custom-checkbox">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="checkbox-box"></span>
                <span className="ms-2">{t(label)} </span>
            </label>
        </>
    )
}
