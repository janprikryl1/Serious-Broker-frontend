import { ReactNode, useEffect, useState } from "react";
import { checkServerHealth } from "../utils/api/serverStatus.ts";
import { useTranslation } from "react-i18next";
import SeriousBrokerHandWriting from "../utils/icons/logo/SB-logo-handwritten-white.svg";

type ServerStatusGateProps = {
  children: ReactNode;
};

export function ServerStatusGate({ children }: ServerStatusGateProps) {
  const { t } = useTranslation();
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let active = true;
    let isChecking = false;
    let consecutiveFailures = 0;
    let retryTimeoutId: number | undefined;

    const checkServer = async () => {
      if (document.hidden || isChecking) return;

      isChecking = true;
      try {
        await checkServerHealth();
        consecutiveFailures = 0;
        if (active) setIsOffline(false);
      } catch {
        consecutiveFailures += 1;

        if (active && consecutiveFailures >= 2) {
          setIsOffline(true);
        } else if (active) {
          retryTimeoutId = window.setTimeout(() => {
            void checkServer();
          }, 5_000);
        }
      } finally {
        isChecking = false;
      }
    };

    void checkServer();

    const intervalId = window.setInterval(() => {
      void checkServer();
    }, 60_000);

    const handleVisibilityChange = () => {
      if (!document.hidden) void checkServer();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      active = false;
      window.clearInterval(intervalId);
      if (retryTimeoutId !== undefined) {
        window.clearTimeout(retryTimeoutId);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!isOffline) return children;

  return (
    <main
      role="status"
      className="tw-fixed tw-inset-0 tw-z-[9999] tw-flex tw-items-center tw-justify-center tw-p-6 tw-text-center"
    >
      <div className="logo tw-absolute tw-top-0 tw-mb-6 tw-flex tw-justify-center sm:tw-mb-0">
        <img
          className="tw-max-w-[180px] sm:tw-max-w-[270px]"
          src={SeriousBrokerHandWriting}
          alt="Serious.Broker"
        />
      </div>

      <div className="tw-max-w-md">
        <div className="tw-mb-4 tw-text-5xl" aria-hidden="true">⚠</div>
        <h1 className="tw-mb-3 tw-text-2xl tw-font-semibold tw-text-white">
          {t("We’re carrying out scheduled maintenance")}
        </h1>
        <p className="tw-text-stone-300">
          {t("The application is temporarily unavailable while we carry out maintenance. Please try again shortly.")}
        </p>
      </div>
    </main>
  );
}