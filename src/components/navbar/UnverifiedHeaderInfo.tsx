import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import {CiWarning} from "react-icons/ci";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {sendVerificationEmailAgain} from "../../utils/api/verifyAccountService.ts";
import "../../styles/sass/components/unverified_header.scss";

export const UnverifiedHeaderInfo:FC = () => {
    const {t} = useTranslation();
    const {user} = useUserContext();
    const location = useLocation();
    const isVerifyAccountPage = /^\/verify_account\/[^/]+\/[^/]+$/.test(location.pathname);

    const handleSendVerificationAgain = async () => {
        const CustomSwal = (await import("../../utils/functions/customSwal.ts")).CustomSwal;
        try {
            const response = await sendVerificationEmailAgain();
            if (!response) return;
            if (response.data.status === "verification email sent") {
                CustomSwal.fire({
                    icon: "success",
                    title: t("Email sent"),
                });
            } else {
                CustomSwal.fire({
                    icon: "error",
                    title: t("Error"),
                });
            }
        } catch (e) {
            console.error(e);
            CustomSwal.fire({
                icon: "error",
                title: t("Error"),
                text: t("Check internet connection"),
            });
        }
    };

    if (user?.verified == false && !isVerifyAccountPage) {
        return (
            <header className="header-section unverified-header-container">
                <div className="header-bottom">
                    <div className="container">
                        <div className="header-wrapper d-flex">
                            <div className="menu-area d-flex">
                                <CiWarning size={40} />
                            </div>
                            <div className="menu-area d-flex">
                                <h3>{t("Your email is not verified yet.")}</h3>
                                <h3 className="unverified-header-send-again-button" onClick={handleSendVerificationAgain}>{t("Send again")}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
};
