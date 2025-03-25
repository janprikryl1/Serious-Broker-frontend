import {FC} from "react";
import {LoginRegisterInput} from "../signIn/LoginRegisterInput.tsx";
import {CountrySelect} from "../signIn/CountrySelect.tsx";
import {FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch} from "react-hook-form";
import {RegisterUserSchemaType} from "../../utils/formSchemas/registerUserSchema.ts";

type Props = {
    formRegister: UseFormRegister<RegisterUserSchemaType>;
    errors: FieldErrors<RegisterUserSchemaType>;
    watch: UseFormWatch<RegisterUserSchemaType>;
    setValue: UseFormSetValue<RegisterUserSchemaType>;
}

export const RegisterStepTwo:FC<Props> = ({formRegister, errors, watch, setValue}) => {
    return (
        <>
            <LoginRegisterInput register={formRegister} name="title_before" placeholder="Title before" error={errors.title_before} />
            <LoginRegisterInput register={formRegister} name="title_after" placeholder="Title after" error={errors.title_after} />
            <LoginRegisterInput register={formRegister} name="street" placeholder="Street" required error={errors.street} />
            <LoginRegisterInput register={formRegister} name="street_number" placeholder="Street number" required error={errors.street_number} />
            <LoginRegisterInput register={formRegister} name="town" placeholder="Town" required error={errors.town} />
            <CountrySelect
                value={watch("country") || "cs"}
                setCountry={(country: string) => setValue("country", country)}
                {...formRegister("country")}
            />
        </>
    )
}