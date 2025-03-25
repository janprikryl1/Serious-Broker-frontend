import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import { routes } from "../utils/constants";
import { setSubmitNewPassword, verifySecureKeys } from "../utils/api/forgottenPasswordService.ts";
import { LoginRegisterInput } from "../components/signIn/LoginRegisterInput.tsx";
import { Button } from "../components/reusable/Button.tsx";
import { CustomSwal } from "../utils/functions/customSwal.ts";

type RecoverPasswordForm = {
    newPassword: string;
    typeAgainNewPassword: string;
};

export const RecoverPassword: FC = () => {
    const { t } = useTranslation();
    const { user_id, secret_key_1, secret_key_2 } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
    } = useForm<RecoverPasswordForm>();

    useEffect(() => {
        const verifyTokens = async () => {
            try {
                const response = await verifySecureKeys(secret_key_1!, secret_key_2!, Number(user_id));
                setVerified(response.data.status === "success");
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

    const onSubmit = async (data: RecoverPasswordForm) => {
        if (data.newPassword !== data.typeAgainNewPassword) {
            setError("typeAgainNewPassword", {
                message: t("Passwords do not match")
            });
            CustomSwal.fire({
                icon: "error",
                title: t("Passwords do not match"),
                text: t("Please make sure the passwords match"),
            });
            return;
        }

        try {
            const response = await setSubmitNewPassword(secret_key_1!, secret_key_2!, Number(user_id), data.newPassword);
            if (response.data.status === "success") {
                CustomSwal.fire({
                    icon: "success",
                    title: t("Password updated"),
                    text: t("Your password has been successfully updated."),
                }).then(() => {
                    navigate(routes.profile.profileURL);
                });
            } else {
                CustomSwal.fire({
                    icon: "error",
                    title: t("Error"),
                    text: t("Failed to update the password. Please try again."),
                });
            }
        } catch (error) {
            console.error("Error setting new password:", error);
            CustomSwal.fire({
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
                    <FaExclamationTriangle size={50} color="red" />
                    <h2 className="mt-3">{t("Verification failed")}</h2>
                    <p>{t("Link is invalid or user doesn't exist")}</p>
                </div>
            ) : (
                <div className="text-center mt-5 min-vh-100 container">
                    <h1>{t("Recover password")}</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <LoginRegisterInput
                            register={register}
                            name="newPassword"
                            placeholder={t("New password")}
                            type="password"
                            required
                        />
                        <LoginRegisterInput
                            register={register}
                            name="typeAgainNewPassword"
                            placeholder={t("Enter password again")}
                            type="password"
                            required
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
