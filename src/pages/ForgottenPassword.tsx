import {FC, useState} from "react";
import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";
import {useTranslation} from "react-i18next";
import {LoginRegisterInput} from "../components/modules/signIn/LoginRegisterInput.tsx";
import Swal from "sweetalert2";
import {sendForgottenPassword} from "../api/forgottenPasswordService.ts";

export const ForgottenPassword:FC = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState("");
    
    const handleSubmitForgottenPassword = () => {
        if (!email) return;
        const submitForgottenPassword = async () => {
            try {
                const result = await sendForgottenPassword(email);
                if (result.status === 200) {
                    Swal.fire({
                        icon: "success", title: t("Email sent"), text: t("Check your email address!"),
                    });
                    setEmail("");
                }
            } catch (e) {
                console.error(e);
                Swal.fire({
                    icon: "error", title: t("Submit failed"), text: t("Please try again"),
                });
            }
        }
        submitForgottenPassword();
    }
    
    return (
        <>
            <TitleHeader title="Recover password"/>
            <section className="account padding-top padding-bottom">
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
                                                            placeholder="Email" name="email" type="email"/>
                                        <div className="d-flex justify-content-center mt-4">
                                            <button
                                                className="btn btn-outline-warning btn-block btn-lg gradient-custom-4 text-body">{t("Submit")}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}