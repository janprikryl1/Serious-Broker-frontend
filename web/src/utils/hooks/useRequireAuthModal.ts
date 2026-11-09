import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {CustomSwal} from "../functions/customSwal.ts";
import {routes} from "../constants";

export const useRequireAuthModal = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const promptRegistration = (
        event?: MouseEvent<HTMLElement>,
        customMessage?: string
    ) => {
        if (event) {
            event.preventDefault();
        }

        void CustomSwal.fire({
            title: t("Registration required"),
            text: customMessage ?? t("To access this feature, you need to register first."),
            icon: "info",
            showCancelButton: true,
            confirmButtonText: t("Register"),
            cancelButtonText: t("Cancel"),
            reverseButtons: true,
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                navigate(routes.register);
            }
        });
    };

    return { promptRegistration };
};