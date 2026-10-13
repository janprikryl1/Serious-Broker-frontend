import {useNavigate} from "react-router-dom";
import {useUserContext} from "../providers/providerUser.tsx";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {registerUserSchema, RegisterUserSchemaType} from "../formSchemas/registerUserSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {routes} from "../constants";
import {registerUserType} from "../types/user/registerUserType.ts";
import {CustomSwal} from "../functions/customSwal.ts";
import {register} from "../api/authenticateService.ts";
import {useTranslation} from "react-i18next";

export const useRegister = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setUser, user } = useUserContext();
    const [currentStep, setCurrentStep] = useState(1);
    const [sending, setSending] = useState(false);
    const {
        register: formRegister,
        handleSubmit,
        watch,
        setValue,
        setError,
        formState: { errors },
        trigger,
        clearErrors
    } = useForm<RegisterUserSchemaType>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            language: "cs",
            country: "cs",
            newsletter_subscription: true,
            education_emails: true
        }
    });

    useEffect(() => {
        if (user) navigate(routes.profile.profileURL);
    }, [user]);

    useEffect(() => {
        const subscription = watch((_, { name }) => {
            if (name && errors[name as keyof RegisterUserSchemaType]) {
                clearErrors(name as keyof RegisterUserSchemaType);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, clearErrors, errors]);


    const onSubmit = async (data: registerUserType & { passwordAgain: string }) => {
        if (data.password !== data.passwordAgain) {
            CustomSwal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Passwords do not match")
            });
            setError("passwordAgain", { message: t("Passwords do not match") });
            return;
        }
        setSending(true);
        try {
            const { passwordAgain, ...payload } = data;
            const response = await register(payload);

            if (response.status === "success") {
                CustomSwal.fire({
                    icon: "success",
                    title: t("Registration Successful"),
                    text: t("Check your email address to verify your account")
                }).then(() => {
                    setUser(response.user);
                    navigate(routes.home);
                });
            } else {
                setSending(false);
                CustomSwal.fire({
                    icon: "error",
                    title: t("Error"),
                    text: t(response.message || "Registration failed")
                });
            }
        } catch (error) {
            console.error(error);
            CustomSwal.fire({
                icon: "error",
                title: "Error",
                text: t("An error occurred during registration")
            });
        }
    };
    
    return {
        handleSubmit,
        onSubmit,
        currentStep,
        formRegister,
        errors,
        watch,
        setCurrentStep,
        sending,
        setValue,
        trigger
    }
}