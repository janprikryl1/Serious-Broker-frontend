import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import { LoginRegisterInput } from "../components/signIn/LoginRegisterInput.tsx";
import { Button } from "../components/reusable/Button.tsx";
import {useRecoverPassword} from "../utils/hooks/useRecoverPassword.ts";

export const RecoverPassword: FC = () => {
    const { t } = useTranslation();
    const {loading, verified, handleSubmit, onSubmit, register} = useRecoverPassword();

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
