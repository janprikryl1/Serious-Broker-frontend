import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import {verifyAccount} from "../api/verifyAccountService.ts";

export const VerifyAccount:FC = () => {
    const {t} = useTranslation();
    const {user_id} = useParams();
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (!user_id) {
            setLoading(false);
            setVerified(false);
            return;
        }
        const loadVerified = async () => {
            try {
                const response = await verifyAccount(user_id);
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success", title: t("Verification is succesfull")
                    }).then(() => {
                        setLoading(false);
                        setVerified(true); 
                    });
                }
            } catch (e) {
                console.error(e);
                Swal.fire({
                    icon: "error", title: t("Verification failed"), text: t("Link is invalid or user doesn't exist"),
                });
            }
        }
        loadVerified();
    }, [user_id]);
    
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
                    <h2>{t("Verification is succesfull")}</h2>
                    //Animatino with ok icon
                </>
            )}
        </>
    )
}