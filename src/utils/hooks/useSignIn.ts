import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../providers/providerUser.tsx";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {guideURLS, routes} from "../constants";
import {login} from "../api/authenticateService.ts";
import {CustomSwal} from "../functions/customSwal.ts";

type LoginFormInputs = {
    email: string;
    password: string;
};

export const useSignIn = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setUser, user } = useUserContext();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<LoginFormInputs>();

    useEffect(() => {
        if (user) {
            navigate(routes.profile.profileURL);
        }
    }, [user]);

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response = await login(data);
            const resData = response.data;

            if (resData.status === "success") {
                CustomSwal.fire({
                    icon: "success",
                    title: t("Login Successful"),
                    text: t("Welcome back!")
                }).then(() => {
                    setUser(resData.user);
                    navigate(routes.profile.myPortfolio);
                });
            } else if (resData.status === "error") {
                if (resData.message === "invalid") {
                    CustomSwal.fire({
                        icon: "error",
                        title: t("Login Failed"),
                        text: resData.attempts > 0
                            ? `${t("Invalid email or password. Remaining attempts:")} ${resData.attempts}`
                            : t("Too many wrong attempts. Try again after hour")
                    });
                } else if (resData.message === "Too many wrong attempts") {
                    CustomSwal.fire({
                        icon: "error",
                        title: t("Login Failed"),
                        text: `${t("Too many wrong attempts. Remaining time:")} ${60 - resData.time} ${t("minutes")}`
                    });
                } else {
                    CustomSwal.fire({
                        icon: "error",
                        title: t("Login Failed"),
                        text: t("Login Failed")
                    });
                }
            }
        } catch (error) {
            console.error(error);
            CustomSwal.fire({
                icon: "error",
                title: t("Login Failed"),
                text: t("Invalid email or password. Please try again")
            });
        }
    };
    
    return {
        handleSubmit,
        onSubmit,
        register,
        isSubmitting
    }
}