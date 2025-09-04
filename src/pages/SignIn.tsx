import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {routes} from "../utils/constants";
import { LoginRegisterInput } from "../components/signIn/LoginRegisterInput.tsx";
import { Button, ButtonColor } from "../components/reusable/Button.tsx";
import {useSignIn} from "../utils/hooks/useSignIn.ts";

export const SignIn: FC = () => {
    const { t } = useTranslation();
    const {handleSubmit, onSubmit, register, isSubmitting} = useSignIn();

    return (
        <section className="padding-bottom container">
            <div className="account__wrapper" data-aos="fade-up" data-aos-duration="800">
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
                            {t("Forgotten password?")}
                            <Link to={routes.forgottenPassword} className="link-underline-none">{t("Recover")}</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
