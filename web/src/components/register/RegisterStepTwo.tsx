import {FC} from "react";
import {LoginRegisterInput} from "../signIn/LoginRegisterInput.tsx";
import {CountrySelect} from "../signIn/CountrySelect.tsx";
import {FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {RegisterUserSchemaType} from "../../utils/formSchemas/registerUserSchema.ts";
import {LanguageSelect} from "../signIn/LanguageSelect.tsx";

type Props = {
    formRegister: UseFormRegister<RegisterUserSchemaType>;
    errors: FieldErrors<RegisterUserSchemaType>;
    watch: UseFormWatch<RegisterUserSchemaType>;
    setValue: UseFormSetValue<RegisterUserSchemaType>;
}

export const RegisterStepTwo:FC<Props> = ({formRegister, errors, watch, setValue}) => {
    const {t} = useTranslation();
    return (
        <>
            {/*<LoginRegisterInput register={formRegister} name="title_before" label={t("Title")} placeholder={t("title-placeholder")} error={errors.title_before} />*/}
            {/*<LoginRegisterInput register={formRegister} name="title_after" label={t("Suffix")} placeholder={t("suffix-placeholder")} error={errors.title_after} />*/}
            {/*<hr />*/}
            <LoginRegisterInput register={formRegister} name="street" placeholder={t("Street")} required error={errors.street} />
            <LoginRegisterInput register={formRegister} name="street_number" placeholder={t("Street number")} required error={errors.street_number} />
            <LoginRegisterInput register={formRegister} name="town" placeholder={t("Town")} required error={errors.town} />
            <CountrySelect
                value={watch("country") || "cs"}
                setCountry={(country: string) => setValue("country", country)}
                {...formRegister("country")}
            />
            <LanguageSelect
                value={watch("language") || "cs"}
                setLanguage={(language: string) => {
                    setValue("language", language);
                }}
                {...formRegister("language")}
            />
        </>
    )
}