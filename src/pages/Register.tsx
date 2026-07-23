import {FC, useEffect} from "react";
import { useTranslation } from "react-i18next";
import {Link, useSearchParams} from "react-router-dom";
import { routes } from "../utils/constants";
import { RegisterStepOne } from "../components/register/RegisterStepOne.tsx";
import { RegisterStepTwo } from "../components/register/RegisterStepTwo.tsx";
import { RegisterStepThree } from "../components/register/RegisterStepThree.tsx";
import { RegisterStepFour } from "../components/register/RegisterStepFour.tsx";
import { RegisterStepsPagiation } from "../components/register/RegisterStepsPagiation.tsx";
import { useRegister } from "../utils/hooks/useRegister.ts";
import { GlassCard } from "../components/reusable/GlassCard.tsx";
import SeriousBrokerHandWriting from "../utils/icons/logo/SB-handwritten-white.svg";

export const Register: FC = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const emailFromUrl = searchParams.get("email") || "";
    const {
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
    } = useRegister();

    useEffect(() => {
        if (emailFromUrl) {
            setValue("email", emailFromUrl, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    }, [emailFromUrl, setValue]);

    return (
        <section className="tw-relative tw-flex tw-min-h-screen tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-px-4 tw-py-8">
            <div className="logo tw-mb-6 tw-flex tw-justify-center tw-absolute tw-top-0 sm:tw-mb-0">
                <Link to={routes.home} aria-label="Serious Broker - home">
                    <img
                        className="tw-max-w-[270px]"
                        src={SeriousBrokerHandWriting}
                        alt="Serious.Broker"
                    />
                </Link>
            </div>

            <div
                className="tw-flex tw-w-full tw-max-w-xl tw-flex-col tw-items-center tw-gap-4 tw-mb-0 tw-mt-12 sm:tw-mt-16"
                data-aos="fade-up"
                data-aos-duration="800"
            >
                <GlassCard bgColor="var(--true-black)" opacity={0.1}>
                    <div className="tw-mb-6 tw-text-center sm:tw-mb-8">
                        <h2 className="tw-text-2xl tw-font-bold tw-tracking-tight tw-text-white sm:tw-text-3xl tw-pb-1 sm:tw-pb-3">
                            {t("Create an account")}
                        </h2>
                        <p className="tw-mt-2 tw-text-sm tw-text-gray-2">
                            {t("We just need a few details to set up your profile")}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="tw-flex tw-flex-col tw-gap-4">
                        {currentStep === 1 ? (
                            <RegisterStepOne formRegister={formRegister} errors={errors} watch={watch} />
                        ) : (
                            <RegisterStepTwo formRegister={formRegister} errors={errors} watch={watch} setValue={setValue} />
                        )}

                        <RegisterStepsPagiation
                            currentStep={currentStep}
                            trigger={trigger}
                            setCurrentStep={setCurrentStep}
                            sending={sending}
                        />
                    </form>

                    <div className="tw-mt-6 tw-flex tw-flex-col tw-items-center tw-gap-2 tw-text-sm sm:tw-mt-8">
                        <p className="tw-m-0">
                            {t("Already have an account? ")}
                            <Link
                                to={routes.signIn}
                                className="tw-font-medium tw-text-secondary tw-no-underline hover:tw-underline"
                            >
                                {t("Login")}
                            </Link>
                        </p>
                    </div>
                </GlassCard>
            </div>

            <nav className="tw-flex tw-text-sm tw-gap-5 tw-no-underline tw-text-gray-2">
                <Link className="hover:tw-text-secondary hover:tw-underline" to={routes.gdprInfo}>GDPR</Link>
                <Link className="hover:tw-text-secondary hover:tw-underline" to={routes.cookiesInfo}>Cookies</Link>
                <Link className="hover:tw-text-secondary hover:tw-underline" to={routes.about}>{t("About us")}</Link>
                <Link className="hover:tw-text-secondary hover:tw-underline" to={routes.contact}>{t("Contact")}</Link>
            </nav>
        </section>
    );
};