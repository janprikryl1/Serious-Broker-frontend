import { FC } from "react";
import { useTranslation } from "react-i18next";
import { UseFormRegister, FieldError } from "react-hook-form";

type Props = {
    register: UseFormRegister<any>;
    name: string;
    label?: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    className?: string;
    error?: FieldError;
};

export const LoginRegisterInput: FC<Props> = ({register, name, placeholder, label = placeholder, type = "text", required = false, className, error}) => {
    const { t } = useTranslation();

    return (
        <div className="form-outline">
            <label htmlFor={name} className="form-label tw-mb-3">
                {t(label)}
                {required && <span className="tw-text-red-500 tw-ml-1">*</span>}
            </label>
            <input
                {...register(name)}
                id={name}
                type={type}
                placeholder={t(placeholder)}
                className={`form-control ${className || ""} ${error ? "is-invalid" : ""}`}
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
