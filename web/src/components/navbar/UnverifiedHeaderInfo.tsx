import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import {CiWarning} from "react-icons/ci";
import {useUserContext} from "../../utils/providers/providerUser.tsx";
import {sendVerificationEmailAgain} from "../../utils/api/verifyAccountService.ts";

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
            <header className="tw-w-full tw-bg-zinc-950 tw-text-white">
                <div className="tw-mx-auto tw-flex tw-w-full tw-max-w-screen-xl tw-items-center tw-justify-center tw-gap-3 tw-px-4 tw-py-3 sm:tw-gap-4 sm:tw-px-6 sm:tw-py-4 lg:tw-px-8">
                    <CiWarning className="tw-h-7 tw-w-7 tw-shrink-0 sm:tw-h-8 sm:tw-w-8" />
                    <div className="tw-flex tw-min-w-0 tw-flex-col tw-items-center tw-gap-1 sm:tw-flex-row sm:tw-gap-4">
                        <p className="tw-m-0 tw-text-center tw-text-sm tw-leading-snug sm:tw-text-left sm:tw-text-base">
                            {t("Your email is not verified yet.")}
                        </p>
                        <button
                            type="button"
                            className="tw-cursor-pointer tw-whitespace-nowrap tw-border-0 tw-bg-transparent tw-p-0 tw-text-sm tw-font-semibold tw-text-secondary hover:tw-underline focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-secondary sm:tw-text-base"
                            onClick={handleSendVerificationAgain}
                        >
                            {t("Send again")}
                        </button>
                    </div>
                </div>
            </header>
        );
    }
};
