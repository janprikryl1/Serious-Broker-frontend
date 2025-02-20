import {ChangeEventHandler, FC, FormEventHandler, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Swal from "sweetalert2";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {routes} from "../utils/constants";
import {login} from "../utils/api/authenticateService.ts";
import {LoginRegisterInput} from "../components/signIn/LoginRegisterInput.tsx";
import {Button, ButtonColor} from "../components/reusable/Button.tsx";

export const SignIn: FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "", password: ""
    });
    const {setUser, user} = useUserContext();

    useEffect(() => {
        if (user) navigate(routes.profile.profileURL);
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
                    navigate(routes.profile.profileURL);
                });
            } else if (data.status === "error") {
                if (data.message === "invalid") {
                    Swal.fire({
                        icon: "error", title: t("Login Failed"), text: data.attempts > 0 ? `${t("Invalid email or password. Remaining attempts:")} ${data.attempts}` : t("Too many wrong attempts. Try again after hour"),
                    });
                } else if (data.message === "Too many wrong attempts") {
                    Swal.fire({
                        icon: "error", title: t("Login Failed"), text: `${t("Too many wrong attempts. Remaining time:")} ${60 - data.time} ${t("minutes")}`,
                    });
                } else {
                    Swal.fire({
                        icon: "error", title: t("Login Failed"), text: t("Login Failed"),
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
                                    <h2>{t("Welcome back!")}</h2>
                                    <p>{t("Fill in your details to log in")}</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <LoginRegisterInput handleChange={handleChange} placeholder="Email" name="email" type="email"/>
                                    <LoginRegisterInput handleChange={handleChange} placeholder="Password" name="password" type="password"/>
                                    <div className="d-flex justify-content-center mt-4">
                                        <Button type="submit" className="trk-btn trk-btn--large trk-btn--secondary2" color={ButtonColor.yellow}>{t("Submit")}</Button>
                                    </div>
                                </form>
                                <div className="account__switch">
                                    <p>
                                        {t("Don’t have an account yet? ")}<Link to={routes.register} className="link-underline-none">{t("Register")}</Link>
                                    </p>
                                    <p>
                                        {t("Forgotten password?")}<Link to={routes.forgottenPassword} className="link-underline-none">{t("Recover")}</Link>
                                    </p>
                                    <p>
                                        <Link to={routes.forgottenPassword} className="link-underline-none">{t("Forgotten password?")}</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}