import {useParams} from "react-router-dom";
import {useUserContext} from "../providers/providerUser.tsx";
import {useEffect, useState} from "react";
import {verifyAccount} from "../api/verifyAccountService.ts";
import {CustomSwal} from "../functions/customSwal.ts";
import {useTranslation} from "react-i18next";

export const useVerifyAccount = () => {
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
                    CustomSwal.fire({
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
                CustomSwal.fire({
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
    
    return {
        loading,
        verified
    }
}