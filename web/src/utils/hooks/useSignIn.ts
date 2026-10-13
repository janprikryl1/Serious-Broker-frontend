import {useTranslation} from "react-i18next";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useUserContext} from "../providers/providerUser.tsx";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {routes} from "../constants";
import {login} from "../api/authenticateService.ts";
import {showToast} from "../../components/toast/toastHelper.tsx";
import {getSafeRedirect} from "../functions/safeRedirect.ts";

type LoginFormInputs = {
    email: string;
    password: string;
};

export const useSignIn = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setUser, user } = useUserContext();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect");

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<LoginFormInputs>();

    /*
     * `?redirect=` posílají samostatné buildy (/admin, /editor), když potkají
     * nepřihlášeného uživatele. Musí se na něj skočit přes window.location —
     * `navigate` by jen přepsal URL v rámci tohohle SPA a cílový build by se
     * vůbec nenačetl. Plná navigace je tu v pořádku, token už je v
     * localStorage (stejný origin) a cílový build si ho přečte sám.
     */
    const goToRedirect = (fallback: string) => {
        if (redirect) {
            window.location.assign(getSafeRedirect(redirect, fallback));
            return;
        }
        navigate(fallback);
    };

    useEffect(() => {
        if (user) {
            goToRedirect(routes.profile.profileURL);
        }
    }, [user]);

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await login(data);
            const resData = response.data;

            if (resData.status === "success") {
                setUser(resData.user);
                goToRedirect(routes.profile.dashboard);
                showToast.success(t("Welcome back!") );

            } else if (resData.status === "error") {
                if (resData.message === "invalid") {
                    setErrorMessage(
                      resData.attempts > 0
                        ? `${t("Incorrect password. Remaining attempts:")} ${resData.attempts}`
                        : t("Too many unsuccessful attempts. Try again after an hour.")
                    );
                } else if (resData.message === "Too many wrong attempts") {
                    setErrorMessage(
                      `${t("Account blocked due to many unsuccessful attempts. Remaining time:")} ${60 - resData.time} ${t("minutes")}`
                    );
                } else {
                    setErrorMessage(t("Login Failed"));
                }
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(t("Account with this e-mail was not found."));
        }
    };
    
    return {
        handleSubmit,
        onSubmit,
        register,
        isSubmitting,
        errorMessage
    }
}