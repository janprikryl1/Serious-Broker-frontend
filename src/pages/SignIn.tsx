import {ChangeEventHandler, FC, FormEventHandler, useEffect, useState} from "react";
import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Swal from "sweetalert2";
import {LoginRegisterInput} from "../components/modules/signIn/LoginRegisterInput.tsx";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {login} from "../api/authenticateService.ts";
import {routes} from "../utils/constants";

export const SignIn: FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "", password: ""
    });
    const {setUser, user} = useUserContext();

    useEffect(() => {
        if (user) navigate(routes.profile);
    }, [user]);
    
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            const data = response.data;
            if (data.status === "success") {
                Swal.fire({
                    icon: "success", title: t("Login Successful"), text: t("Welcome back!"),
                }).then(() => {
                    setUser(response.data.user);
                    navigate(routes.profile);
                });
            } else if (data.status === "error") {
                if (data.message === "Invalid email or password") {
                    Swal.fire({
                        icon: "error", title: t("Login Failed"), text: t("Invalid email or password. Please try again"),
                    });
                } else {
                    Swal.fire({
                        icon: "error", title: t("Login Failed"), text: t("Login failed"),
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error", title: t("Login Failed"), text: t("Invalid email or password. Please try again"),
            });
        }
    }

    return (
        <>
            <TitleHeader title="Login"/>
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
                                        <h2>{t("Welcome back!")}</h2>
                                        <p>{t("Fill in your details to log in")}</p>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <LoginRegisterInput handleChange={handleChange} placeholder="Email" name="email"
                                                            type="email"/>
                                        <LoginRegisterInput handleChange={handleChange} placeholder="Password"
                                                            name="password" type="password"/>
                                        <div className="d-flex justify-content-center mt-4">
                                            <button
                                                className="btn btn-outline-warning btn-block btn-lg gradient-custom-4 text-body">{t("Submit")}</button>
                                        </div>
                                    </form>
                                    <div className="account__switch">
                                        <p>
                                            {t("Don’t have an account yet? ")}<Link to={routes.register}
                                                                                    className="link-underline-none">{t("Register")}</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}