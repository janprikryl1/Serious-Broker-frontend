import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {routes} from "../utils/constants";
import { LoginRegisterInput } from "../components/signIn/LoginRegisterInput.tsx";
import { Button, ButtonColor } from "../components/reusable/Button.tsx";
import {useSignIn} from "../utils/hooks/useSignIn.ts";
import {GlassCard} from "../components/reusable/GlassCard.tsx";
import SeriousBrokerHandWriting from "../utils/icons/logo/SB-logo-handwritten-white.svg";

export const SignIn: FC = () => {
    const { t } = useTranslation();
    const {handleSubmit, onSubmit, register, isSubmitting, errorMessage} = useSignIn();

    return (
        <section className="tw-relative tw-flex tw-min-h-screen tw-w-full tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-px-4 tw-py-1">
            {/* LOGO */}
            <div className="logo tw-mb-6 tw-flex tw-justify-center tw-absolute tw-top-0 sm:tw-mb-0">
                <Link to={routes.home} aria-label="Serious Broker - home">
                    <img
                        className="tw-max-w-[180px] sm:tw-max-w-[270px]"
                        src={SeriousBrokerHandWriting}
                        alt="Serious.Broker"
                    />
                </Link>
            </div>

            {/* KARTA S FORMULÁROM */}
            <div
                className="tw-flex tw-w-full tw-max-w-md tw-flex-col tw-items-center tw-gap-4 tw-mb-0"
                data-aos="fade-up"
                data-aos-duration="800"
            >
                <GlassCard bgColor="var(--true-black)" opacity={0.1}>
                    <div className="tw-mb-6 tw-text-center sm:tw-mb-8">
                        <h2 className="tw-pb-1 tw-text-xl tw-font-bold tw-tracking-tight tw-text-white sm:tw-text-3xl sm:tw-pb-3">
                            {t("Welcome back!")}
                        </h2>
                        <p className="tw-mt-2 tw-text-xs tw-text-gray-2 sm:tw-text-sm">
                            {t("Fill in your details to log in")}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="tw-flex tw-flex-col tw-gap-3">
                        <LoginRegisterInput
                            register={register}
                            name="email"
                            label="E-mail"
                            placeholder="Enter your e-mail"
                            type="email"
                            required
                        />

                        <div className="tw-mb-1"></div>

                        <LoginRegisterInput
                            register={register}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            required
                        />

                        <Link
                            to={routes.forgottenPassword}
                            className="tw-m-0 tw-text-end tw-text-xs tw-text-secondary tw-no-underline hover:tw-underline sm:tw-text-sm"
                        >
                            {t("Forgotten password?")}
                        </Link>

                        {errorMessage && (
                            <div className="tw-text-red tw-text-sm tw-font-bold tw-border tw-border-solid tw-border-rose-500 tw-border-opacity-35 tw-rounded-lg tw-px-2 tw-py-3 tw-bg-rose-500 tw-bg-opacity-10 tw-mt-4">
                                {/*{t("Invalid email or password. Please try again.")}*/}
                                {errorMessage}
                            </div>
                        )}

                        <div className="tw-mt-4 tw-flex tw-justify-center">
                            <Button
                                type="submit"
                                className="trk-btn trk-btn--secondary2"
                                color={ButtonColor.gold}
                                disabled={isSubmitting}
                            >
                                {t("Submit")}
                            </Button>
                        </div>
                    </form>

                    <div className="tw-mt-6 tw-flex tw-flex-col tw-items-center tw-gap-2 tw-text-xs sm:tw-mt-8 sm:tw-text-sm">
                        <p className="tw-m-0">
                            {t("Don’t have an account yet? ")}
                            <Link
                                to={routes.register}
                                className="tw-font-medium tw-text-secondary tw-no-underline hover:tw-underline"
                            >
                                {t("Register")}
                            </Link>
                        </p>
                    </div>
                </GlassCard>
            </div>

            <nav className="tw-flex tw-gap-3 tw-text-xs tw-no-underline tw-text-gray-2 sm:tw-gap-5 sm:tw-text-sm">
                <Link className="hover:tw-text-secondary hover:tw-underline" to={routes.gdprInfo}>GDPR</Link>
                <Link className="hover:tw-text-secondary hover:tw-underline" to={routes.cookiesInfo}>Cookies</Link>
                <Link className="hover:tw-text-secondary hover:tw-underline" to={routes.about}>{t("About us")}</Link>
                <Link className="hover:tw-text-secondary hover:tw-underline" to={routes.contact}>{t("Contact")}</Link>
            </nav>
        </section>
    );
};
