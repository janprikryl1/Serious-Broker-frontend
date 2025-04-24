import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { sendForgottenPassword } from "../utils/api/forgottenPasswordService.ts";
import { LoginRegisterInput } from "../components/signIn/LoginRegisterInput.tsx";
import { Button } from "../components/reusable/Button.tsx";
import { CustomSwal } from "../utils/functions/customSwal.ts";

type FormValues = {
    email: string;
};

export const ForgottenPassword: FC = () => {
    const { t } = useTranslation();
    const {register, handleSubmit, reset, formState: { isSubmitting }} = useForm<FormValues>();

    const onSubmit = async ({ email }: FormValues) => {
        try {
            const result = await sendForgottenPassword(email);
            if (result.data.status === "reset password email sent") {
                CustomSwal.fire({
                    icon: "success",
                    title: t("Email sent"),
                    text: t("Check your email address!")
                });
                reset();
            } else if (result.data.status === "user not found") {
                CustomSwal.fire({
                    icon: "error",
                    title: t("Submit failed"),
                    text: t("User not found")
                });
            }
        } catch (e) {
            console.error(e);
            CustomSwal.fire({
                icon: "error",
                title: t("Submit failed"),
                text: t("Please try again")
            });
        }
    };

    return (
        <section className="account padding-bottom mt-3">
            <div className="container">
                <div
                    className="account__wrapper"
                    data-aos="fade-up"
                    data-aos-duration="800"
                >
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="account__content account__content--style1">
                                <div className="account__header">
                                    <h2>{t("We are happy to see you back!")}</h2>
                                    <p>{t("Please enter your email and we will send you link to recover your password")}</p>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <LoginRegisterInput
                                        register={register}
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        required
                                    />
                                    <div className="d-flex justify-content-center mt-4">
                                        <Button
                                            type="submit"
                                            className="btn btn-outline-warning btn-block btn-lg gradient-custom-4 text-body"
                                            disabled={isSubmitting}
                                        >
                                            {t("Submit")}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
