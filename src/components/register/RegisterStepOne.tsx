import {FC, useEffect, useState} from "react";
import {LoginRegisterInput} from "../signIn/LoginRegisterInput.tsx";
import PasswordStrengthBar from "react-password-strength-bar";
import {FieldErrors, UseFormRegister, UseFormWatch} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {RegisterUserSchemaType} from "../../utils/formSchemas/registerUserSchema.ts";
import {verifyEmail} from "../../utils/api/authenticateService.ts";

type Props = {
    formRegister: UseFormRegister<RegisterUserSchemaType>;
    errors: FieldErrors<RegisterUserSchemaType>;
    watch: UseFormWatch<RegisterUserSchemaType>;
}

export const RegisterStepOne:FC<Props> = ({formRegister, errors, watch}) => {
    const {t} = useTranslation();
    const [suggestedDomain, setSuggestedDomain] = useState<string | null>(null);
    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [emailCheckTimeout, setEmailCheckTimeout] = useState<NodeJS.Timeout | null>(null);
    const password = watch("password");
    const email = watch("email");

    useEffect(() => {
        if (!email) {
            setEmailValid(null);
            setSuggestedDomain(null);
            return;
        }
        setEmailValid(null);
        if (emailCheckTimeout) clearTimeout(emailCheckTimeout);
        const timeout = setTimeout(async () => {
            try {
                const res = await verifyEmail(email);
                if (!res.data) return;
                setEmailValid(res.data.result.validation_details.mx_found);
                setSuggestedDomain(res.data.result.domain_details.did_you_mean);
            } catch (error) {
                console.error("Email verification failed", error);
            }
        }, 1000);
        setEmailCheckTimeout(timeout);
        return () => clearTimeout(timeout);
    }, [email]);
    
    return (
        <>
            <LoginRegisterInput register={formRegister} name="nickname" placeholder={t("Nickname")} required error={errors.nickname} />
            <LoginRegisterInput register={formRegister} name="firstname" placeholder={t("Name")} required error={errors.firstname} />
            <LoginRegisterInput register={formRegister} name="midlename" placeholder={t("Middle name")} error={errors.midlename} />
            <LoginRegisterInput register={formRegister} name="surname" placeholder={t("Surname")} required error={errors.surname} />
            <div className="position-relative">
                <LoginRegisterInput
                    register={formRegister}
                    name="email"
                    placeholder={t("Email")}
                    type="email"
                    required
                    className={emailValid === false ? "is-invalid" : ""}
                    error={errors.email}
                />
                {suggestedDomain && (
                    <div style={{ marginBottom: 20 }}>
                        {t("Did you mean")} <strong>{suggestedDomain}</strong>?
                    </div>
                )}
            </div>
            <LoginRegisterInput register={formRegister} name="password" placeholder={t("Password")} type="password" required error={errors.password} />
            <PasswordStrengthBar password={password || ""} minLength={8} scoreWords={[t('very weak'), t('weak'), t('strong'), t('very strong')]} shortScoreWord={t('very weak')} />
            <LoginRegisterInput register={formRegister} name="passwordAgain" placeholder={t("Password again")} type="password" required error={errors.passwordAgain} />
        </>
    );
};