import { FC } from "react";
import { useTranslation } from "react-i18next";
import { UseFormRegister, FieldError } from "react-hook-form";

type Props = {
    register: UseFormRegister<any>;
    name: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    className?: string;
    error?: FieldError;
};

export const LoginRegisterInput: FC<Props> = ({register, name, placeholder, type = "text", required = false, className, error}) => {
    const { t } = useTranslation();

    return (
        <div className="form-outline mb-4">
            <label htmlFor={name} className="form-label" style={{fontWeight: required ? "bold" : "normal"}}>
                {t(placeholder)}
            </label>
            <input
                {...register(name)}
                id={name}
                type={type}
                placeholder={t(placeholder) + "..."}
                className={`form-control form-control-lg ${className || ""} ${error ? "is-invalid" : ""}`}
                required={required}
                minLength={type === "password" ? 8 : 1}
            />
            {error && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                    {t(error.message || "This field is invalid")}
                </div>
            )}
        </div>
    );
};
