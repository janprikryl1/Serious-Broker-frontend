import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserContext } from "../utils/providers/providerUser.tsx";
import {guideURLS, routes} from "../utils/constants";
import { login } from "../utils/api/authenticateService.ts";
import { LoginRegisterInput } from "../components/signIn/LoginRegisterInput.tsx";
import { Button, ButtonColor } from "../components/reusable/Button.tsx";
import { CustomSwal } from "../utils/functions/customSwal.ts";

type LoginFormInputs = {
    email: string;
    password: string;
};

export const SignIn: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setUser, user } = useUserContext();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<LoginFormInputs>();

    useEffect(() => {
        if (user) {
            navigate(routes.profile.profileURL);
        }
    }, [user]);

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await login(data);
            const resData = response.data;

            if (resData.status === "success") {
                CustomSwal.fire({
                    icon: "success",
                    title: t("Login Successful"),
                    text: t("Welcome back!")
                }).then(() => {
                    setUser(resData.user);
                    navigate(guideURLS.personalStrategy);
                });
            } else if (resData.status === "error") {
                if (resData.message === "invalid") {
                    CustomSwal.fire({
                        icon: "error",
                        title: t("Login Failed"),
                        text: resData.attempts > 0
                            ? `${t("Invalid email or password. Remaining attempts:")} ${resData.attempts}`
                            : t("Too many wrong attempts. Try again after hour")
                    });
                } else if (resData.message === "Too many wrong attempts") {
                    CustomSwal.fire({
                        icon: "error",
                        title: t("Login Failed"),
                        text: `${t("Too many wrong attempts. Remaining time:")} ${60 - resData.time} ${t("minutes")}`
                    });
                } else {
                    CustomSwal.fire({
                        icon: "error",
                        title: t("Login Failed"),
                        text: t("Login Failed")
                    });
                }
            }
        } catch (error) {
            console.error(error);
            CustomSwal.fire({
                icon: "error",
                title: t("Login Failed"),
                text: t("Invalid email or password. Please try again")
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
                                    <h2>{t("Welcome back!")}</h2>
                                    <p>{t("Fill in your details to log in")}</p>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <LoginRegisterInput
                                        register={register}
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        required
                                    />
                                    <LoginRegisterInput
                                        register={register}
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        required
                                    />
                                    <div className="d-flex justify-content-center mt-4">
                                        <Button
                                            type="submit"
                                            className="trk-btn trk-btn--large trk-btn--secondary2"
                                            color={ButtonColor.yellow}
                                            disabled={isSubmitting}
                                        >
                                            {t("Submit")}
                                        </Button>
                                    </div>
                                </form>

                                <div className="account__switch mt-4">
                                    <p>
                                        {t("Don’t have an account yet? ")}
                                        <Link to={routes.register} className="link-underline-none">{t("Register")}</Link>
                                    </p>
                                    <p>
                                        {t("Forgotten password? ")}
                                        <Link to={routes.forgottenPassword} className="link-underline-none">{t("Recover")}</Link>
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
