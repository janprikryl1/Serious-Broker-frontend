import {FC, FormEvent, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import {Spinner} from "react-bootstrap";
import {FaExclamationTriangle} from "react-icons/fa";
import {routes} from "../utils/constants";
import {setSubmitNewPassword, verifySecureKeys} from "../utils/api/forgottenPasswordService.ts";
import {LoginRegisterInput} from "../components/signIn/LoginRegisterInput.tsx";
import {Button} from "../components/reusable/Button.tsx";

export const RecoverPassword: FC = () => {
    const { t } = useTranslation();
    const { user_id, secret_key_1, secret_key_2 } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [typeAgainNewPassword, setTypeAgainNewPassword] = useState("");

    useEffect(() => {
        const verifyTokens = async () => {
            try {
                const response = await verifySecureKeys(secret_key_1!, secret_key_2!, Number(user_id));
                if (response.data.status === "success") {
                    setVerified(true);
                } else {
                    setVerified(false);
                }
            } catch (error) {
                console.error("Verification failed:", error);
                setVerified(false);
            } finally {
                setLoading(false);
            }
        };

        if (user_id && secret_key_1 && secret_key_2) {
            verifyTokens();
        } else {
            setLoading(false);
            setVerified(false);
        }
    }, [user_id, secret_key_1, secret_key_2]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (newPassword !== typeAgainNewPassword) {
            Swal.fire({
                icon: "error",
                title: t("Passwords do not match"),
                text: t("Please make sure the passwords match"),
            });
            return;
        }

        try {
            const response = await setSubmitNewPassword(secret_key_1!, secret_key_2!, Number(user_id), newPassword);
            if (response.data.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: t("Password updated"),
                    text: t("Your password has been successfully updated."),
                }).then(() => {
                    navigate(routes.profile.profileURL);
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: t("Error"),
                    text: t("Failed to update the password. Please try again."),
                });
            }
        } catch (error) {
            console.error("Error setting new password:", error);
            Swal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Something went wrong. Please try again."),
            });
        }
    };

    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">{t("Loading...")}</span>
                    </Spinner>
                </div>
            ) : !verified ? (
                <div className="text-center mt-5 min-vh-100">
                    <FaExclamationTriangle size={50} color="red"/>
                    <h2 className="mt-3">{t("Verification failed")}</h2>
                    <p>{t("Link is invalid or user doesn't exist")}</p>
                </div>
            ) : (
                <div className="text-center mt-5 min-vh-100 container">
                    <h1>{t("Recover password")}</h1>
                    <form onSubmit={handleSubmit}>
                        <LoginRegisterInput
                            handleChange={(e) => setNewPassword(e.target.value)}
                            placeholder={t("New password")}
                            name="newPassword"
                            type="password"
                        />
                        <LoginRegisterInput
                            handleChange={(e) => setTypeAgainNewPassword(e.target.value)}
                            placeholder={t("Enter password again")}
                            name="typeAgainNewPassword"
                            type="password"
                        />
                        <div className="d-flex justify-content-center mt-4">
                            <Button
                                className="btn btn-outline-warning btn-block btn-lg gradient-custom-4 text-body"
                                type="submit"
                            >
                                {t("Submit")}
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};
