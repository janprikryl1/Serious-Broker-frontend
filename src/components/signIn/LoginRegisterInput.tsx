import {useTranslation} from "react-i18next";
import {ChangeEventHandler, FC} from "react";

type Props = {
    handleChange: ChangeEventHandler<HTMLInputElement>;
    name: string;
    placeholder: string;
    type?: string;
    required?: boolean;
}

export const LoginRegisterInput:FC<Props> = ({handleChange, name, placeholder, type = "text", required = false}) => {
    const {t} = useTranslation();

    return (
        <div className="form-outline mb-4">
            <label htmlFor="name" className="form-label">{t(placeholder)}</label>
            <input
                type={type}
                name={name}
                placeholder={t(placeholder) + "..."}
                className="form-control form-control-lg"
                onChange={handleChange}
                required={required}
                minLength={type === "password" ? 8 : 1}
            />
        </div>
    );
};
