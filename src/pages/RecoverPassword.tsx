import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {LoginRegisterInput} from "../components/modules/signIn/LoginRegisterInput.tsx";

export const RecoverPassword:FC = () => {
    const {t} = useTranslation();
    const {user_id, secret_key_1, secret_key_2} = useParams();
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [typeAgainNewPassword, setTypeAgainNewPassword] = useState("");
console.log(newPassword, typeAgainNewPassword);
    useEffect(() => {
        if (!user_id || !secret_key_1 || !secret_key_2) {
            setLoading(false);
            setVerified(false);
            return;
        }
        //
    }, [user_id, secret_key_1, secret_key_2]);
    
    const handleSubmit = async () => {
        
    }
    
    return (
        <>
            {loading ? (
                <>
                    //Spinner
                </>
            ) : !verified ? (
                <>
                    <h2>{t("Verification failed")}</h2>
                    <p>{t("Link is invalid or user doesn't exist")}</p>
                </>
            ) : (
                <>
                    //Input for new password and type again
                    <form onSubmit={handleSubmit}>
                        <LoginRegisterInput handleChange={(e) => setNewPassword(e.target.value)} placeholder="New password" name="newPassword"
                                            type="password"/>
                        <LoginRegisterInput handleChange={(e) => setTypeAgainNewPassword(e.target.value)} placeholder="Enter password again"
                                            name="typeAgainNewPassword" type="password"/>
                        <div className="d-flex justify-content-center mt-4">
                            <button
                                className="btn btn-outline-warning btn-block btn-lg gradient-custom-4 text-body">{t("Submit")}</button>
                        </div>
                    </form>
                </>
            )}
        </>
    )
}