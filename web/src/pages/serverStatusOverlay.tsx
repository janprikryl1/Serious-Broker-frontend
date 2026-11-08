import { useEffect, useState } from "react";
import { checkServerHealth } from "../utils/api/serverStatus.ts";
import { useTranslation } from "react-i18next";

export function ServerStatusOverlay() {
    const { t } = useTranslation();
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        let active = true;
        let isChecking = false;

        const checkServer = async () => {
            if (document.hidden || isChecking) return;

            isChecking = true;
            try {
                await checkServerHealth();
                if (active) setIsOffline(false);
            } catch {
                if (active) setIsOffline(true);
            } finally {
                isChecking = false;
            }
        };

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                void checkServer();
            }
        };

        void checkServer();

        const intervalId = window.setInterval(() => {
            void checkServer();
        }, 60_000);

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            active = false;
            window.clearInterval(intervalId);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div
            role="alert"
            className="tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-items-center tw-justify-center tw-bg-stone-950/95 tw-p-6 tw-text-center"
        >
            <div className="tw-max-w-md">
                <div className="tw-mb-4 tw-text-5xl" aria-hidden="true">
                    ⚠
                </div>

                <h1 className="tw-mb-3 tw-text-2xl tw-font-semibold tw-text-white">
                    {t("Server is currently unavailable")}
                </h1>

                <p className="tw-text-stone-300">
                    {t("The application cannot connect to the server right now. We’ll try again automatically in a moment.")}
                </p>
            </div>
        </div>
    );
}