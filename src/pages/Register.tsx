import {ChangeEventHandler, FC, FormEventHandler, useEffect, useState} from "react";
import {TitleHeader} from "../components/modules/about/TitleHeader.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Swal from "sweetalert2";
import {registerUserType} from "../utils/types/user/registerUserType.ts";
import {LoginRegisterInput} from "../components/modules/signIn/LoginRegisterInput.tsx";
import {Accordion} from "react-bootstrap";
import {CountrySelect} from "../components/modules/signIn/CountrySelect.tsx";
import {register} from "../api/authenticateService.ts";
import {useUserContext} from "../utils/providers/providerUser.tsx";


export const Register:FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {setUser, user} = useUserContext();

    useEffect(() => {
        if (user) navigate("/profile");    
    }, [user]);
    
    const [registerData, setRegisterData] = useState<registerUserType>({
        nickname: "",
        firstname: "",
        midlename: undefined,
        surname: "",
        email: "",
        password: "",
        title_before: undefined,
        title_after: undefined,
        firm_id: "",
        firm_name: "",
        firm_vat: "",
        street: "",
        street_number: "",
        town: "",
        country: "cs"
    });

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value })
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try{
            const response = await register(registerData);
            if (response.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: t("Registration Successful"),
                    text: "",
                }).then(() => {
                    setUser(response.user);
                    navigate("/");
                });
            } else if (response.status === "error") {
                if (response.message === "Email already used") {
                    Swal.fire({
                        icon: "error",
                        title: t("Error"),
                        text: t("Email already used"),
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: t("Error"),
                        text: t("Registration failed"),
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: t("An error occurred during registration"),
            });
        }
    }
    
    return (
        <>
            <TitleHeader title="Login" />
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
                                        <h2>{t("Create an account")}</h2>
                                        <p>{t("Create an account to get started. We just need a few details from you to get started.")}</p>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <LoginRegisterInput handleChange={handleChange} name="nickname"
                                                            placeholder="Nickname" required/>
                                        <LoginRegisterInput handleChange={handleChange} placeholder="Name"
                                                            name="firstname" required/>
                                        <LoginRegisterInput handleChange={handleChange} placeholder="Middle name"
                                                            name="midlename"/>
                                        <LoginRegisterInput handleChange={handleChange} placeholder="Surname"
                                                            name="surname" required/>
                                        <LoginRegisterInput handleChange={handleChange} placeholder="Email" name="email"
                                                            type="email" required/>
                                        <LoginRegisterInput handleChange={handleChange} placeholder="Password"
                                                            name="password" type="password" required/>
                                        <LoginRegisterInput handleChange={handleChange} placeholder="Title before"
                                                            name="title_before"/>
                                        <LoginRegisterInput handleChange={handleChange} placeholder="Title after"
                                                            name="title_after"/>
                                        <Accordion className="mb-4">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Firma</Accordion.Header>
                                                <Accordion.Body>
                                                    <LoginRegisterInput handleChange={handleChange}
                                                                        placeholder="Firm name" name="firm_name"/>
                                                    <LoginRegisterInput handleChange={handleChange}
                                                                        placeholder="Firm id" name="firm_id"/>
                                                    <LoginRegisterInput handleChange={handleChange}
                                                                        placeholder="Firm VAT" name="firm_vat"/>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        <LoginRegisterInput handleChange={handleChange} placeholder="Street"
                                                            name="street" required/>
                                        <LoginRegisterInput handleChange={handleChange} placeholder="Street number"
                                                            name="street_number" required/>
                                        <LoginRegisterInput handleChange={handleChange} placeholder="Town" name="town"
                                                            required/>
                                        <CountrySelect value={registerData.country}
                                                       setCountry={(country: string) => setRegisterData({
                                                           ...registerData,
                                                           country
                                                       })}/>
                                        <div className="d-flex justify-content-center mt-4">
                                            <button
                                                className="btn btn-outline-warning btn-block btn-lg gradient-custom-4 text-body">{t("Register")}</button>
                                        </div>
                                    </form>

                                    <div className="account__switch">
                                        <p>
                                            {t("Already have account? ")}<Link to="/sign_in"
                                                                               className="none">{t("Login")}</Link>
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