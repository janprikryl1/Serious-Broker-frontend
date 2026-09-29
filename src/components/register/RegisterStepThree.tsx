import {FC} from "react";
import {LoginRegisterInput} from "../signIn/LoginRegisterInput.tsx";
import {UseFormRegister} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {RegisterUserSchemaType} from "../../utils/formSchemas/registerUserSchema.ts";

type Props = {
    formRegister: UseFormRegister<RegisterUserSchemaType>;
}

export const RegisterStepThree:FC<Props> = ({formRegister}) => {
    const {t} = useTranslation();
    return (
        <>
            <LoginRegisterInput register={formRegister} name="firm_name" placeholder={t("Company Name")} />
            <LoginRegisterInput register={formRegister} name="firm_id" placeholder={t("Firm id")} />
            <LoginRegisterInput register={formRegister} name="firm_vat" placeholder={t("Firm VAT")} />
        </>
    )
}