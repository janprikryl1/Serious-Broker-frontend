import {FC, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { registerUserType } from "../utils/types/user/registerUserType.ts";
import { useUserContext } from "../utils/providers/providerUser.tsx";
import { routes } from "../utils/constants";
import { register } from "../utils/api/authenticateService.ts";
import { CustomSwal } from "../utils/functions/customSwal.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerUserSchema, RegisterUserSchemaType} from "../utils/formSchemas/registerUserSchema.ts";
import {RegisterStepOne} from "../components/register/RegisterStepOne.tsx";
import {RegisterStepTwo} from "../components/register/RegisterStepTwo.tsx";
import {RegisterStepThree} from "../components/register/RegisterStepThree.tsx";
import {RegisterStepFour} from "../components/register/RegisterStepFour.tsx";
import {RegisterStepsPagiation} from "../components/register/RegisterStepsPagiation.tsx";


export const Register: FC = () => {
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

    return (
        <section className="account padding-bottom mt-3">
            <div className="container">
                <div className="account__wrapper" data-aos="fade-up" data-aos-duration="800">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="account__content account__content--style1">
                                <div className="account__header">
                                    <h2>{t("Create an account")}</h2>
                                    <p>{t("Create an account to get started. We just need a few details from you to get started.")}</p>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {currentStep === 1 ?
                                        <RegisterStepOne formRegister={formRegister} errors={errors} watch={watch}/>
                                        : currentStep === 2 ?
                                            <RegisterStepTwo formRegister={formRegister} errors={errors} watch={watch}
                                                             setValue={setValue}/>
                                            : currentStep === 3 ?
                                                <RegisterStepThree formRegister={formRegister}/>
                                                : <RegisterStepFour watch={watch} setValue={setValue} formRegister={formRegister}/>}
                                    <RegisterStepsPagiation currentStep={currentStep} trigger={trigger}
                                                            setCurrentStep={setCurrentStep} sending={sending}/>
                                </form>
                                <div className="account__switch">
                                    <p>
                                    {t("Already have account? ")}
                                        <Link to={routes.signIn} className="link-underline-none">
                                            {t("Login")}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
