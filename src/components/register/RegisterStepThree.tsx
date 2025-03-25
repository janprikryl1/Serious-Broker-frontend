import {FC} from "react";
import {LoginRegisterInput} from "../signIn/LoginRegisterInput.tsx";
import {UseFormRegister} from "react-hook-form";
import {RegisterUserSchemaType} from "../../utils/formSchemas/registerUserSchema.ts";

type Props = {
    formRegister: UseFormRegister<RegisterUserSchemaType>;
}

export const RegisterStepThree:FC<Props> = ({formRegister}) => {
    return (
        <>
            <LoginRegisterInput register={formRegister} name="firm_name" placeholder="Firm name" />
            <LoginRegisterInput register={formRegister} name="firm_id" placeholder="Firm id" />
            <LoginRegisterInput register={formRegister} name="firm_vat" placeholder="Firm VAT" />
        </>
    )
}