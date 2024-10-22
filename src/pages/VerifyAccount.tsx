import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { verifyAccount } from "../api/verifyAccountService.ts";
import { Spinner } from "react-bootstrap"; // Bootstrap Spinner
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import {useUserContext} from "../utils/providers/providerUser.tsx"; // Ikony z React-icons

export const VerifyAccount: FC = () => {
    const { t } = useTranslation();
    const { user_id, token } = useParams();
    const {setUser} = useUserContext();
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (!user_id || !token) {
            setLoading(false);
            setVerified(false);
            return;
        }
        const loadVerified = async () => {
            try {
                const response = await verifyAccount(user_id, token);
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: t("Verification is successful")
                    }).then(() => {
                        setLoading(false);
                        setVerified(true);
                        setUser(response.data.user);
                        localStorage.setItem("token", response.data.token);
                    });
                }
            } catch (e) {
                console.error(e);
                Swal.fire({
                    icon: "error",
                    title: t("Verification failed"),
                    text: t("Link is invalid or user doesn't exist"),
                });
                setLoading(false);
                setVerified(false);
            }
        }
        loadVerified();
    }, [user_id]);

    return (
        <div style={{ height: "100vh" }}>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">{t("Loading...")}</span>
                    </Spinner>
                </div>
            ) : !verified ? (
                <div className="text-center mt-5">
                    <FaExclamationTriangle size={50} color="red" />
                    <h2 className="mt-3">{t("Verification failed")}</h2>
                    <p>{t("Link is invalid or user doesn't exist")}</p>
                </div>
            ) : (
                <div className="text-center mt-5">
                    <FaCheckCircle size={50} color="green" className="animate__animated animate__bounceIn" />
                    <h2 className="mt-3">{t("Verification is successful")}</h2>
                    <p>{t("Your account has been successfully verified!")}</p>
                </div>
            )}
        </div>
    )
}
