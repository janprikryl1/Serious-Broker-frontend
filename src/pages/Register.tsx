import {ChangeEvent, ChangeEventHandler, FC, FormEventHandler, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Swal from "sweetalert2";
import {registerUserType} from "../utils/types/user/registerUserType.ts";
import {LoginRegisterInput} from "../components/modules/signIn/LoginRegisterInput.tsx";
import {Accordion, Form} from "react-bootstrap";
import {CountrySelect} from "../components/modules/signIn/CountrySelect.tsx";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {routes} from "../utils/constants";
import {LanguageSelect} from "../components/modules/signIn/LanguageSelect.tsx";
import PasswordStrengthBar from "react-password-strength-bar";
import {Button} from "../components/Button.tsx";
import {register} from "../utils/api/authenticateService.ts";


export const Register:FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {setUser, user} = useUserContext();
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (user) navigate(routes.profile.profileURL);    
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
        country: "cs",
        language: "cs",
        newsletter_subscription: true,
        education_emails: true
    });
    const [passwordAgain, setPasswordAgain] = useState("");

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value })
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (registerData.password !== passwordAgain) {
            Swal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Passwords do not match"),
            });
            return;
        }
        setSending(true);
        try{
            const response = await register(registerData);
            if (response.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: t("Registration Successful"),
                    text: t("Check your email address to verify your account"),
                }).then(() => {
                    setUser(response.user);
                    navigate(routes.home);
                });
            } else if (response.status === "error") {
                setSending(false);
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

    const handleNewsletterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        setRegisterData((prevDetails) => ({
            ...prevDetails,
            [name]: checked,
        }));
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
                                        <PasswordStrengthBar password={registerData.password} minLength={8}
                                                             scoreWords={['velmi slabé', 'slabé', 'silné', 'velmi silné']}
                                                             shortScoreWord={'velmi slabé'}/>
                                        <div className="form-outline mb-4">
                                            <label htmlFor="name" className="form-label">{t("Password again")}</label>
                                            <input
                                                type="password"
                                                placeholder={t("Password again") + "..."}
                                                className="form-control form-control-lg"
                                                required
                                                minLength={8}
                                                value={passwordAgain}
                                                onChange={(e) => setPasswordAgain(e.target.value)}
                                            />
                                        </div>
                                        
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
                                        <LanguageSelect value={registerData.language}
                                                        setLanguage={(language: string) => setRegisterData({
                                                            ...registerData,
                                                            language: language
                                                        })}/>
                                        <Form className="padding-bottom">
                                            <h3>{t("Newsletter")}</h3>
                                            <Form.Check
                                                checked={registerData.newsletter_subscription}
                                                type="switch"
                                                label={t("Subscribe to newsletter")}
                                                name="newsletter_subscription"
                                                onChange={handleNewsletterChange}
                                            />
                                            <Form.Check
                                                checked={registerData.education_emails}
                                                type="switch"
                                                label={t("Would you like to join a free educational program with information sent usually once a week?")}
                                                name="education_emails"
                                                onChange={handleNewsletterChange}
                                            />
                                        </Form>
                                        <div className="d-flex justify-content-center">
                                            <Button type="submit"
                                                className="btn  btn-block btn-lg"
                                                disabled={sending}>{t("Register")}</Button>
                                        </div>
                                    </form>

                                    <div className="account__switch">
                                        <p>
                                            {t("Already have account? ")}<Link to={routes.signIn}
                                                                               className="link-underline-none">{t("Login")}</Link>
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