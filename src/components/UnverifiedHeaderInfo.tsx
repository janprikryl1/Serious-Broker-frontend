import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useUserContext} from "../utils/providers/providerUser.tsx";
import {useLocation} from "react-router-dom";
import {CiWarning} from "react-icons/ci";
import {sendVerificationEmailAgain} from "../api/verifyAccountService.ts";

export const UnverifiedHeaderInfo:FC = () => {
    const {t} = useTranslation();
    const {user} = useUserContext();
    const location = useLocation();
    const isVerifyAccountPage = /^\/verify_account\/[^/]+\/[^/]+$/.test(location.pathname);

    const handleSendVerificationAgain = async () => {
        const Swal = (await import("sweetalert2")).default;
        try {
            const response = await sendVerificationEmailAgain();
            if (!response) return;
            if (response.data.status === "verification email sent") {
                Swal.fire({
                    icon: "success",
                    title: t("Email sent"),
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: t("Error"),
                });
            }
        } catch (e) {
            console.error(e);
            Swal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Check internet connection"),
            });
        }
    };


    if (user?.verified == false && !isVerifyAccountPage) {
        return (
            <header className="header-section" style={{backgroundColor:"red"}}>
                <div className="header-bottom">
                    <div className="container">
                        <div className="header-wrapper d-flex">
                            <div className="menu-area d-flex">
                                <CiWarning size={40} />
                            </div>
                            <div className="menu-area d-flex">
                                <h3>{t("Your email is not verified yet.")}</h3>
                                <h3 style={{marginLeft:40, cursor: "pointer"}} onClick={handleSendVerificationAgain}>{t("Send again")}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
};
