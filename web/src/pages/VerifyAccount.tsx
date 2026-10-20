import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import {useVerifyAccount} from "../utils/hooks/useVerifyAccount.ts";

export const VerifyAccount: FC = () => {
    const { t } = useTranslation();
    const {loading, verified} = useVerifyAccount();

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
