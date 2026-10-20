import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {setSubmitNewPassword, verifySecureKeys} from "../api/forgottenPasswordService.ts";
import {CustomSwal} from "../functions/customSwal.ts";
import {routes} from "../constants";
import {useTranslation} from "react-i18next";

type RecoverPasswordForm = {
    newPassword: string;
    typeAgainNewPassword: string;
};

export const useRecoverPassword = () => {
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
    
    return {
        loading,
        verified,
        handleSubmit,
        onSubmit,
        register
    }
}