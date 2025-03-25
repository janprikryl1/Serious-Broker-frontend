import {FC} from "react";
import {LanguageSelect} from "../signIn/LanguageSelect.tsx";
import {Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {UseFormRegister, UseFormSetValue, UseFormWatch} from "react-hook-form";
import {RegisterUserSchemaType} from "../../utils/formSchemas/registerUserSchema.ts";

type Props = {
    formRegister: UseFormRegister<RegisterUserSchemaType>;
    watch: UseFormWatch<RegisterUserSchemaType>;
    setValue: UseFormSetValue<RegisterUserSchemaType>;
}

export const RegisterStepFour:FC<Props> = ({ watch, setValue, formRegister}) => {
    const {t} = useTranslation();
    
    return (
        <>
            <LanguageSelect
                value={watch("language") || "cs"}
                setLanguage={(language: string) => {
                    setValue("language", language);
                }}
                {...formRegister("language")}
            />

            <Form className="padding-bottom">
                <h3>{t("Newsletter")}</h3>
                <Form.Check
                    checked={watch("newsletter_subscription") ?? true}
                    type="switch"
                    label={t("Subscribe to newsletter")}
                    onChange={(e) => setValue("newsletter_subscription", e.target.checked)}
                />
                <Form.Check
                    checked={watch("education_emails") ?? true}
                    type="switch"
                    label={t("Would you like to join a free educational program with information sent usually once a week?")}
                    onChange={(e) => setValue("education_emails", e.target.checked)}
                />
            </Form>
        </>
    );
}