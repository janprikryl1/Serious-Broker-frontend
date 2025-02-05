import {FC, FormEvent, useState} from "react";
import {useTranslation} from "react-i18next";
import {LoginRegisterInput} from "../components/modules/signIn/LoginRegisterInput.tsx";
import Swal from "sweetalert2";
import {sendForgottenPassword} from "../api/forgottenPasswordService.ts";
import {Button} from "../components/Button.tsx";

export const ForgottenPassword:FC = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);
    
    const handleSubmitForgottenPassword = (e: FormEvent) => {
        e.preventDefault();
        setSending(true);
        if (!email) return;
        const submitForgottenPassword = async () => {
            try {
                const result = await sendForgottenPassword(email);
                if (result.data.status === "reset password email sent") {
                    Swal.fire({
                        icon: "success", title: t("Email sent"), text: t("Check your email address!"),
                    });
                    setEmail("");
                } else if (result.data.status === "user not found") {
                    Swal.fire({
                        icon: "error", title: t("Submit failed"), text: t("User not found"),
                    });
                }
                setSending(false);
            } catch (e) {
                console.error(e);
                Swal.fire({
                    icon: "error", title: t("Submit failed"), text: t("Please try again"),
                });
                setSending(false);
            }
        }
        submitForgottenPassword();
    }
    
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
                                <form onSubmit={handleSubmitForgottenPassword}>
                                    <LoginRegisterInput handleChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Email" name="email" type="email" required={true}/>
                                    <div className="d-flex justify-content-center mt-4">
                                        <Button type="submit" className="btn btn-outline-warning btn-block btn-lg gradient-custom-4 text-body" disabled={sending}>{t("Submit")}</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};